import Sidebar from "@/components/Sidebar";
import { reservationFormController } from "@/controllers/reservationForm.controller";

export default function reservationFormView(id = null) {
    setTimeout(() => {
        reservationFormController(id);
    });

    return `
    <div class="flex">
      ${Sidebar()}
      <main class="flex-1 p-6 bg-slate-100 min-h-screen">

        <div class="max-w-lg bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-bold mb-4">
            ${id ? "Editar reserva" : "Nueva reserva"}
          </h2>

          <div id="formError" class="hidden bg-red-100 text-red-700 p-2 rounded mb-3 text-sm"></div>

          <form id="reservationForm" class="flex flex-col gap-3">

            <div>
              <label class="block text-sm font-medium mb-1">Espacio</label>
              <select name="workspace" id="workspace" class="border w-full p-2 rounded" required>
                <option value="">-- Seleccionar --</option>
                <option value="Sala A">Sala A</option>
                <option value="Sala B">Sala B</option>
                <option value="Oficina 1">Oficina 1</option>
                <option value="Coworking">Coworking</option>
                <option value="Auditorio">Auditorio</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Fecha</label>
              <input type="date" name="date" id="date" class="border w-full p-2 rounded" required />
            </div>

            <div class="flex gap-3">
              <div class="flex-1">
                <label class="block text-sm font-medium mb-1">Hora inicio</label>
                <input type="time" name="startHour" id="startHour" class="border w-full p-2 rounded" required />
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium mb-1">Hora fin</label>
                <input type="time" name="endHour" id="endHour" class="border w-full p-2 rounded" required />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Motivo</label>
              <textarea name="reason" id="reason" rows="3" class="border w-full p-2 rounded" required></textarea>
            </div>

            <div id="statusField" class="hidden">
              <label class="block text-sm font-medium mb-1">Estado</label>
              <select name="status" id="status" class="border w-full p-2 rounded">
                <option value="pending">Pendiente</option>
                <option value="approved">Aprobada</option>
                <option value="rejected">Rechazada</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>

            <div class="flex gap-3 mt-2">
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded flex-1">
                ${id ? "Guardar cambios" : "Crear reserva"}
              </button>
              <button type="button" id="btnCancel" class="border px-4 py-2 rounded flex-1">
                Cancelar
              </button>
            </div>

          </form>
        </div>

      </main>
    </div>
  `;
}
