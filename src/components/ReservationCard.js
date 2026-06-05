import { isAdmin, getSession } from "@/utils";

const statusLabel = {
  pending: "Pendiente",
  approved: "Aprobada",
  rejected: "Rechazada",
  cancelled: "Cancelada",
};

const statusColor = {
  pending: "text-yellow-600 bg-yellow-50",
  approved: "text-green-700 bg-green-50",
  rejected: "text-red-600 bg-red-50",
  cancelled: "text-slate-500 bg-slate-100",
};

export default function ReservationCard(reservation) {
  const { id, workspace, date, startHour, endHour, reason, status, userId } = reservation;
  const user = getSession();
  const admin = isAdmin();
  const isOwner = user?.id === userId;

  const canEdit = admin || (isOwner && status === "pending");
  const canDelete = admin;
  const canCancel = isOwner && status === "approved";
  const canApproveReject = admin && status === "pending";

  return `
    <article class="bg-white border rounded-lg p-4 shadow-sm">
      <div class="flex justify-between items-start mb-2">
        <h3 class="font-bold text-lg">Espacio: ${workspace}</h3>
        <span class="text-xs px-2 py-1 rounded font-medium ${statusColor[status] || ""}">
          ${statusLabel[status] || status}
        </span>
      </div>

      <p class="text-sm text-slate-600 font-bold">Usuario: ${userId}</p>
      <p class="text-sm text-slate-600">Fecha: ${date}</p>
      <p class="text-sm text-slate-600">Horario: ${startHour} - ${endHour}</p>
      <p class="text-sm text-slate-600">Motivo: ${reason}</p>

      <div class="flex flex-wrap gap-2 mt-3">
        ${canEdit ? `<button data-action="edit" data-id="${id}" class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded">Editar</button>` : ""}
        ${canCancel ? `<button data-action="cancel" data-id="${id}" class="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded">Cancelar</button>` : ""}
        ${canApproveReject ? `
          <button data-action="approve" data-id="${id}" class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded">Aprobar</button>
          <button data-action="reject" data-id="${id}" class="text-xs bg-red-100 text-red-700 px-3 py-1 rounded">Rechazar</button>
        ` : ""}
        ${canDelete ? `<button data-action="delete" data-id="${id}" class="text-xs bg-red-100 text-red-800 px-3 py-1 rounded">Eliminar</button>` : ""}
      </div>
    </article>
  `;
}
