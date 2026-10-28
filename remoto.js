// Referencias al DOM (evaluadas dinámicamente o al cargar)
let $estado = document.querySelector("#estado");
let listaRemota = document.querySelector("#lista-remota");

// ── 1. JSON ─────────────────────────────────────────────────────────────
const textoJson = '{"nombre":"Helado artesanal","precio":15.0,"disponible":true}';
const objeto = JSON.parse(textoJson);
console.log(objeto.precio, typeof objeto.precio);
console.log(JSON.stringify(objeto));

// ── 2. LOS TRES ESTADOS ─────────────────────────────────────────────────
function mostrarEstado(texto, tipo = "info") {
  if (!$estado) $estado = document.querySelector("#estado");
  if ($estado) {
    $estado.textContent = texto;
    $estado.className = tipo;
  }
}

function pintarRemoto(productos) {
  if (!listaRemota) listaRemota = document.querySelector("#lista-remota");
  if (!listaRemota) return;

  listaRemota.innerHTML = "";
  productos.forEach(p => {
    const art = document.createElement("article");
    art.classList.add("tarjeta");
    if (!p.disponible) art.classList.add("agotado");
    art.innerHTML = `
      <h3>${p.nombre}</h3>
      <p class="precio">Bs ${p.precio.toFixed(2)} / ${p.unidad}</p>
      <p class="stock">${p.disponible ? `${p.stock} en stock` : "Agotado"}</p>
    `;
    listaRemota.append(art);
  });
}

// ── 3. fetch Y async/await ──────────────────────────────────────────────
async function cargarConFetch(url = "datos.json") {
  mostrarEstado("Cargando...", "cargando");

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(`El servidor respondió ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    pintarRemoto(datos.productos);

    mostrarEstado(`${datos.productos.length} productos de ${datos.negocio.nombre}`, "ok");

  } catch (error) {

    mostrarEstado(`No se pudieron cargar los datos. ${error.message}`, "error");
    if (!listaRemota) listaRemota = document.querySelector("#lista-remota");
    if (listaRemota) listaRemota.innerHTML = "";
  }
}

function inicializarRemoto() {
  $estado = document.querySelector("#estado");
  listaRemota = document.querySelector("#lista-remota");

  const btnFetch = document.querySelector("#cargar-fetch");
  if (btnFetch) {
    btnFetch.addEventListener("click", () => cargarConFetch());
  }

  const btnRoto = document.querySelector("#cargar-roto");
  if (btnRoto) {
    btnRoto.addEventListener("click", () => cargarConFetch("no-existe.json"));
  }

  // ── 4. LO MISMO CON jQUERY ──────────────────────────────────────────────
  if (typeof $ !== "undefined") {
    $("#cargar-jquery").on("click", function () {
      mostrarEstado("Cargando con jQuery...", "cargando");

      $.getJSON("datos.json")
        .done(function (datos) {
          pintarRemoto(datos.productos);
          mostrarEstado(`${datos.productos.length} productos (vía jQuery)`, "ok");
        })
        .fail(function (jqXHR) {
          mostrarEstado(`Falló la carga: ${jqXHR.status}`, "error");
        })
        .always(function () {
          console.log("La petición terminó, con éxito o sin él.");
        });
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarRemoto);
} else {
  inicializarRemoto();
}

// ── 5. QUÉ ES UNA PROMESA ───────────────────────────────────────────────

// ── 6. LA PESTAÑA NETWORK ───────────────────────────────────────────────
