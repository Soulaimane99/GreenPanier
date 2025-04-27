window.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    // Masquer le lien vers la gestion des utilisateurs si pas admin
    const adminLink = document.getElementById("admin-link");
    if (adminLink && (!user || user.role !== "admin")) {
      adminLink.style.display = "none";
    }
  
    // Afficher le bouton Déconnexion si l'utilisateur est connecté
    const nav = document.querySelector("nav ul");
    if (user && nav) {
      const logoutBtn = document.createElement("li");
      logoutBtn.innerHTML = `<button id="logout-btn" style="padding: 5px 10px; background-color: #c62828; color: white; border: none; cursor: pointer;">Déconnexion</button>`;
      nav.appendChild(logoutBtn);
  
      document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "login.html";
      });
    }
  });
  