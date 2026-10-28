// ── 1. COMPROBAR QUE CARGÓ ──────────────────────────────────────────────
if (typeof $ !== "undefined" && $.fn) {
  console.log("jQuery versión:", $.fn.jquery);
}

// ── 2. ESPERAR AL DOM ───────────────────────────────────────────────────

// ── 3. SELECCIONAR ──────────────────────────────────────────────────────
const vanillaP = document.querySelector("#salida-vanilla");
const jqueryP = typeof $ !== "undefined" ? $("#salida-jquery") : [];

console.log("vanilla es un elemento:", vanillaP instanceof HTMLElement);
console.log("jQuery es una colección de", typeof jqueryP.length !== "undefined" ? jqueryP.length : 0);

if (vanillaP && typeof $ !== "undefined" && $(vanillaP).length) {
  console.log("mismo elemento:", $(vanillaP)[0] === vanillaP);
}

// ── 4. LEER Y ESCRIBIR CONTENIDO ────────────────────────────────────────
if (vanillaP) {
  vanillaP.textContent = "Cambiado con vanilla: document.querySelector + textContent";
}
if (typeof $ !== "undefined" && jqueryP.length) {
  jqueryP.text("Cambiado con jQuery: $() + .text()");
}

// ── 5. CLASES ───────────────────────────────────────────────────────────

// ── 6. EVENTOS ──────────────────────────────────────────────────────────
const botonVanilla = document.querySelector("#boton-vanilla");
if (botonVanilla && vanillaP) {
  botonVanilla.addEventListener("click", () => {
    vanillaP.classList.toggle("resaltado");
  });
}

if (typeof $ !== "undefined") {
  $("#boton-jquery").on("click", function () {
    $(this).closest("section").find("#salida-jquery").toggleClass("resaltado");
  });
}

// ── 7. CHAINING ─────────────────────────────────────────────────────────
if (typeof $ !== "undefined" && jqueryP.length) {
  $("#salida-jquery")
    .addClass("destacado")
    .attr("data-origen", "jquery")
    .css("cursor", "pointer");
}

if (vanillaP) {
  vanillaP.classList.add("destacado");
  vanillaP.setAttribute("data-origen", "vanilla");
  vanillaP.style.cursor = "pointer";
}

// ── 8. LA COMPARACIÓN QUE IMPORTA ───────────────────────────────────────
if (typeof $ !== "undefined") {
  console.log("Tarjetas que ve jQuery:", $(".tarjeta").length);
}
console.log("Tarjetas que ve vanilla:", document.querySelectorAll(".tarjeta").length);
