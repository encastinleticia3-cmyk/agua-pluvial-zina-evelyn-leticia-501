document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.querySelector(".hamburger");
  const nav = document.getElementById("main-nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
      hamburger.classList.toggle("open");
    });
  }

  const calcForm = document.getElementById("calc-form");
  if (calcForm) {
    const area = document.getElementById("area");
    const precip = document.getElementById("precipitacion");
    const coef = document.getElementById("coeficiente");
    const precio = document.getElementById("precio");
    const costo = document.getElementById("costoSistema");
    const res = document.getElementById("resultado");
    const chartCanvas = document.getElementById("calcChart");
    const btnCalc = document.getElementById("btnCalcular");

    btnCalc.addEventListener("click", () => {
      const a = parseFloat(area.value);
      const p = parseFloat(precip.value);
      const c = parseFloat(coef.value);
      if (isNaN(a) || isNaN(p) || isNaN(c) || a <= 0 || p <= 0) {
        res.style.display = "block";
        res.innerHTML = "<span class='error'>Ingresa valores válidos.</span>";
        return;
      }
      const m3 = a * (p / 1000) * c;
      const litros = m3 * 1000;
      const ahorro = (m3 * parseFloat(precio.value)).toFixed(2);
      const roi = (parseFloat(costo.value) / ahorro).toFixed(1);

      res.style.display = "block";
      res.innerHTML = `
        Captación: <strong>${litros.toLocaleString()} L/año</strong><br>
        Ahorro: <strong>$${ahorro} MXN/año</strong><br>
        Retorno: <strong>${roi} años</strong>
      `;

      if (window.Chart) {
        const ctx = chartCanvas.getContext("2d");
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Captación (m³)", "Ahorro (MXN)"],
            datasets: [{
              data: [m3, ahorro],
              backgroundColor: ["#03A9F4", "#0288D1"]
            }]
          }
        });
      }
    });
  }

  /* ===== CONTACTO ===== */
  const contactForm = document.getElementById("form-contacto");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();
      const result = document.getElementById("contacto-result");

      if (!nombre || !correo || !mensaje) {
        result.style.display = "block";
        result.className = "form-result error";
        result.textContent = "Por favor llena todos los campos.";
        return;
      }

      result.style.display = "block";
      result.className = "form-result success";
      result.textContent = "Mensaje enviado correctamente (simulado).";
      contactForm.reset();
    });
  }
});