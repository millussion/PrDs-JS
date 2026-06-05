import Sidebar from "@/components/Sidebar";
import { getSession } from "@/utils";
import { homeController } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession();

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex">
      ${Sidebar()}
      <main class="flex-1 p-6 bg-slate-100 min-h-screen">

        <div class="mb-6">
          <h1 class="text-2xl font-bold">Bienvenido, ${user?.name}</h1>
          <p class="text-slate-500">Rol: ${user?.role}</p>
        </div>

        ${user?.role === "admin"
      ? `
          <div class="grid grid-cols-3 gap-4 mb-6" id="statsContainer">
            <div class="bg-white p-4 rounded shadow text-center">
              <p class="text-2xl font-bold" id="statTotal">-</p>
              <p class="text-sm text-slate-500">Total reservas</p>
            </div>
            <div class="bg-white p-4 rounded shadow text-center">
              <p class="text-2xl font-bold text-yellow-500" id="statPending">-</p>
              <p class="text-sm text-slate-500">Pendientes</p>
            </div>
            <div class="bg-white p-4 rounded shadow text-center">
              <p class="text-2xl font-bold text-green-600" id="statApproved">-</p>
              <p class="text-sm text-slate-500">Aprobadas</p>
            </div>
          </div>
          `
      : ""
    }

        <div class="bg-white p-5 rounded-lg shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-bold text-xl">Reservas</h2>
            <button
              id="btnNewReservation"
              class="bg-blue-600 text-white px-4 py-2 rounded text-sm"
            >
              + Nueva reserva
            </button>
          </div>

          <div id="reservationsContainer">
            <p class="text-slate-400 text-center py-8">Cargando reservas...</p>
          </div>
        </div>

      </main>
    </div>
  `;
}