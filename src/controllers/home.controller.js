import ReservationCard from "@/components/ReservationCard";
import { getReservations, deleteReservation, updateReservation } from "@/services/reservation.service";
import { getSession, isAdmin } from "@/utils";
import { navigateTo } from "@/router/router";

export const homeController = async () => {
  const container = document.querySelector("#reservationsContainer");
  const btnNew = document.querySelector("#btnNewReservation");
  const user = getSession();

  btnNew?.addEventListener("click", () => navigateTo("/reservations/new"));

  await loadReservations(container, user);
};

async function loadReservations(container, user) {
  try {
    const all = await getReservations();

    const list = isAdmin()
      ? all
      : all.filter((r) => r.userId === user.id);

    if (isAdmin()) {
      const statTotal = document.querySelector("#statTotal");
      const statPending = document.querySelector("#statPending");
      const statApproved = document.querySelector("#statApproved");
      if (statTotal) statTotal.textContent = all.length;
      if (statPending) statPending.textContent = all.filter((r) => r.status === "pending").length;
      if (statApproved) statApproved.textContent = all.filter((r) => r.status === "approved").length;
    }

    if (!list.length) {
      container.innerHTML = `<p class="text-slate-400 text-center py-8">No hay reservas.</p>`;
      return;
    }

    container.innerHTML = `<div class="grid gap-4 md:grid-cols-2">${list.map((r) => ReservationCard(r)).join("")}</div>`;

    setupCardEvents(container);
  } catch (err) {
    container.innerHTML = `<p class="text-red-500 text-center py-8">Error al cargar reservas.</p>`;
  }
}

function setupCardEvents(container) {
  container.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const action = btn.dataset.action;
      const id = btn.dataset.id;

      console.log("sirve");
      console.log(action);
      console.log(id);

      if (action === "edit") {
        navigateTo(`/reservations/edit?id=${id}`);
        return;
      }

      if (action === "delete") {
        if (!confirm("¿Eliminar esta reserva?")) return;
        await deleteReservation(id);
      }

      if (action === "approve") {
        await updateReservation(id, { status: "approved" });
      }

      if (action === "reject") {
        await updateReservation(id, { status: "rejected" });
      }

      if (action === "cancel") {
        await updateReservation(id, { status: "cancelled" });
      }

      const user = getSession();
      const container = document.querySelector("#reservationsContainer");
      await loadReservations(container, user);
    });
  });
}
