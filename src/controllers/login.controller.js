import { saveSession } from "@/utils";
import { navigateTo } from "@/router/router";
import { http } from "@/api/http";

export const loginController = () => {
  const form = document.querySelector("#loginForm");
  const errorDiv = document.querySelector("#loginError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      errorDiv.textContent = "Completa todos los campos.";
      errorDiv.classList.remove("hidden");
      return;
    }

    try {
      const users = await http.get(`/users?email=${email}&password=${password}`);

      if (!users.length) {
        errorDiv.textContent = "Credenciales incorrectas.";
        errorDiv.classList.remove("hidden");
        return;
      }

      saveSession({ id: users[0].id, name: users[0].name, role: users[0].role });
      navigateTo("/home");
    } catch (error) {
      errorDiv.textContent = "Error al conectar con el servidor.";
      errorDiv.classList.remove("hidden");
    }
  });
};
