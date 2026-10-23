// ── 1. CONSTANTES ───────────────────────────────────────────────────────
const negocio = "Heladería Fruti Fruti";
const anioFundacion = 1998;

// ── 2. VARIABLES ────────────────────────────────────────────────────────
let heladosEnVitrina = 40;
heladosEnVitrina = 35;

// ── 3. TIPOS ────────────────────────────────────────────────────────────
const precioHeladoBase = 20.0;
const abiertoHoy = true;
const promocionDelDia = null;
let telefonoContacto;

console.log("tipos:", typeof negocio, typeof precioHeladoBase, typeof abiertoHoy);
console.log("null es", promocionDelDia, "| sin asignar es", telefonoContacto);

// ── 4. TEMPLATE LITERAL ─────────────────────────────────────────────────
const resumen = `${negocio} abrió en ${anioFundacion} y hoy disponemos de ${heladosEnVitrina} helados preparados.`;
console.log(resumen);

// ── 5. COMPARACIÓN ──────────────────────────────────────────────────────
console.log("20" == precioHeladoBase);
console.log("20" === precioHeladoBase);

// ── 6. PRIMER CAMBIO EN LA PÁGINA ───────────────────────────────────────
const subtitulo = document.querySelector("header p");
if (subtitulo) {
  subtitulo.textContent = `Helado artesanal del barrio desde ${anioFundacion} · ¡Hoy ${heladosEnVitrina} porciones listas!`;
}

// ── LA PREGUNTA DEL DÍA ─────────────────────────────────────────────────

