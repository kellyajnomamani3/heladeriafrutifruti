// ── 1. SELECCIONAR ──────────────────────────────────────────────────────
const contenedor = document.querySelector("#lista-productos");
const titulos = document.querySelectorAll("h2");

console.log("El contenedor existe:", contenedor !== null);
console.log("Hay", titulos.length, "encabezados h2 en la página");

const textosDeTitulos = [...titulos].map(t => t.textContent);
console.log(textosDeTitulos);

// ── 2. LEER Y MODIFICAR CONTENIDO ───────────────────────────────────────

// ── 3. ATRIBUTOS Y CLASES ───────────────────────────────────────────────

// ── 4. CREAR ELEMENTOS ──────────────────────────────────────────────────
function crearTarjeta(producto) {
  const articulo = document.createElement("article");

  articulo.classList.add("tarjeta");
  if (!producto.disponible) {
    articulo.classList.add("agotado");
  }

  articulo.dataset.nombre = producto.nombre;
  articulo.dataset.categoria = producto.categoria;

  const imagenHTML = producto.imagen
    ? `<img src="${producto.imagen}" alt="${producto.nombre}" class="tarjeta-img" loading="lazy">`
    : "";

  articulo.innerHTML = `
    ${imagenHTML}
    <div class="tarjeta-cuerpo">
      <span class="categoria-badge">${producto.categoria.toUpperCase()}</span>
      <h3>${producto.nombre}</h3>
      <p class="descripcion">${producto.descripcion || ""}</p>
      <div class="tarjeta-pie">
        <p class="precio">Bs ${producto.precio.toFixed(2)}</p>
        <p class="stock ${producto.disponible ? '' : 'sin-stock'}">
          ${producto.disponible ? `${producto.stock} disponibles` : "Agotado"}
        </p>
      </div>
      <button type="button" 
              class="btn-pedir" 
              data-nombre="${producto.nombre}" 
              data-precio="${producto.precio}"
              ${producto.disponible ? "" : "disabled"}>
        ${producto.disponible ? "Pedir este helado" : "Agotado"}
      </button>
    </div>
  `;

  return articulo;
}

// ── 5. RENDER: EL PATRÓN DEL MÓDULO ─────────────────────────────────────
function render(lista) {
  if (!contenedor) return;
  contenedor.innerHTML = "";

  lista.forEach(producto => {
    contenedor.append(crearTarjeta(producto));
  });

  if (lista.length === 0) {
    contenedor.innerHTML = '<p class="sin-resultados">🍦 No se encontraron helados con ese criterio de búsqueda.</p>';
  }
}

// ── 6. PINTAR INICIAL ───────────────────────────────────────────────────
if (typeof productos !== "undefined") {
  render(productos);
}

// ── 7. RECORRER EL ÁRBOL ────────────────────────────────────────────────
const primeraTarjeta = document.querySelector(".tarjeta");
if (primeraTarjeta && primeraTarjeta.parentElement) {
  console.log("Padre de la primera tarjeta:", primeraTarjeta.parentElement.id);
  console.log("Su producto es:", primeraTarjeta.dataset.nombre);
}

