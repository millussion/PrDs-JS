import loginView from "@/views/loginView";
import homeView from "@/views/homeView";
import reservationFormView from "@/views/reservationFormView";
import notFoundView from "@/views/notFound";
import { isAuthenticated, isAdmin } from "@/utils";

const routes = {
  "/": loginView,
  "/home": homeView,
  "/reservations/new": reservationFormView,
  "/reservations/edit": reservationFormView,
};

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");
  const path = window.location.pathname;

  if (!isAuthenticated() && path !== "/") {
    history.replaceState({}, "", "/");
    app.innerHTML = loginView();
    return;
  }


  if (path === "/admin" && !isAdmin()) {
    app.innerHTML = `
      <div style="padding:2rem; text-align:center;">
        <h1>Acceso denegado</h1>
        <p>No tienes permisos para acceder a esta sección.</p>
        <button onclick="history.back()">Volver</button>
      </div>
    `;
    return;
  }

  const view = routes[path];

  if (!view) {
    app.innerHTML = notFoundView();
    return;
  }

  const editMatch = path === "/reservations/edit";
  const id = editMatch ? new URLSearchParams(window.location.search).get("id") : null;

  app.innerHTML = view(id);
};

window.addEventListener("popstate", router);
