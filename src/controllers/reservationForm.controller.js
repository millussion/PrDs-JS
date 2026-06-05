import { createReservation, updateReservation, getReservationById, getReservations } from "@/services/reservation.service";
import { getSession, isAdmin } from "@/utils";
import { navigateTo } from "@/router/router";

export const reservationFormController = async (id = null) => {
    const form = document.querySelector("#reservationForm");
    const errorDiv = document.querySelector("#formError");
    const btnCancel = document.querySelector("#btnCancel");
    const statusField = document.querySelector("#statusField");

    const user = getSession();

    btnCancel?.addEventListener("click", () => navigateTo("/home"));

    if (isAdmin()) {
        statusField?.classList.remove("hidden");
    }

    if (id) {
        try {
            const reservation = await getReservationById(id);

            if (!isAdmin() && reservation.userId !== user.id) {
                navigateTo("/home");
                return;
            }

            if (!isAdmin() && reservation.status !== "pending") {
                errorDiv.textContent = "Solo puedes editar reservas pendientes.";
                errorDiv.classList.remove("hidden");
                form.querySelector("[type=submit]").disabled = true;
                return;
            }

            document.querySelector("#workspace").value = reservation.workspace;
            document.querySelector("#date").value = reservation.date;
            document.querySelector("#startHour").value = reservation.startHour;
            document.querySelector("#endHour").value = reservation.endHour;
            document.querySelector("#reason").value = reservation.reason;
            if (isAdmin()) {
                document.querySelector("#status").value = reservation.status;
            }
        } catch {
            errorDiv.textContent = "No se pudo cargar la reserva.";
            errorDiv.classList.remove("hidden");
        }
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const workspace = form.workspace.value;
        const date = form.date.value;
        const startHour = form.startHour.value;
        const endHour = form.endHour.value;
        const reason = form.reason.value.trim();

        if (startHour >= endHour) {
            errorDiv.textContent = "La hora de inicio debe ser anterior a la hora de fin.";
            errorDiv.classList.remove("hidden");
            return;
        }

        if (!id) {
            const all = await getReservations();
            const conflict = all.find(
                (r) =>
                    r.workspace === workspace &&
                    r.date === date &&
                    r.status !== "cancelled" &&
                    r.status !== "rejected" &&
                    r.startHour < endHour &&
                    r.endHour > startHour
            );

            if (conflict) {
                errorDiv.textContent = "Ya existe una reserva para ese espacio en ese horario.";
                errorDiv.classList.remove("hidden");
                return;
            }
        }

        const data = { workspace, date, startHour, endHour, reason };

        if (!id) {
            data.userId = user.id;
            data.status = "pending";
        } else if (isAdmin()) {
            data.status = form.status.value;
        }

        try {
            if (id) {
                await updateReservation(id, data);
            } else {
                await createReservation(data);
            }
            navigateTo("/home");
        } catch {
            errorDiv.textContent = "Error al guardar la reserva.";
            errorDiv.classList.remove("hidden");
        }
    });
};
