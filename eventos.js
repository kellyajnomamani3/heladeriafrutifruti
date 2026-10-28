// ── 1. LOS ELEMENTOS QUE SE VAN A ESCUCHAR ──────────────────────────────
const buscador = document.querySelector("#buscador");
const filtros = document.querySelector("#filtros");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("form");
const listaProductos = document.querySelector("#lista-productos");
const selectProducto = document.querySelector("#producto");
const inputCantidad = document.querySelector("#cantidad");
const totalEstimado = document.querySelector("#total-estimado");
const mensajePedido = document.querySelector("#mensaje-pedido");
const inputFecha = document.querySelector("#fecha");

let categoriaActiva = "todos";
let textoBuscado = "";

// ── 2. UNA SOLA FUNCIÓN QUE DECIDE QUÉ MOSTRAR ──────────────────────────
function normalizarTexto(texto) {
  return (texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Quita tildes para búsqueda flexible
}

function actualizar() {
  if (typeof productos === "undefined" || !resultado) return;

  const termino = normalizarTexto(textoBuscado);

  const visibles = productos
    .filter(p => categoriaActiva === "todos" || p.categoria === categoriaActiva)
    .filter(p => {
      const nombreNorm = normalizarTexto(p.nombre);
      const descNorm = normalizarTexto(p.descripcion);
      return nombreNorm.includes(termino) || descNorm.includes(termino);
    });

  render(visibles);

  const cantDisponibles = visibles.filter(p => p.disponible).length;
  if (visibles.length === 0) {
    resultado.textContent = "0 helados encontrados con ese criterio";
  } else if (visibles.length === productos.length) {
    resultado.textContent = `${visibles.length} de ${productos.length} helados en catálogo (${cantDisponibles} disponibles)`;
  } else {
    resultado.textContent = `${visibles.length} helados encontrados (${cantDisponibles} disponibles)`;
  }
}

// Pintar catálogo inicial
actualizar();

// ── 3. EL EVENTO input Y ACCESIBILIDAD CON TECLADO ───────────────────────
if (buscador) {
  // Filtro en tiempo real al escribir
  buscador.addEventListener("input", (event) => {
    textoBuscado = event.target.value.trim();
    actualizar();
  });

  // Limpiar búsqueda al pulsar Escape
  buscador.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      buscador.value = "";
      textoBuscado = "";
      actualizar();
    }
  });
}

// ── 4. DELEGACIÓN DE EVENTOS EN FILTROS ──────────────────────────────────
if (filtros) {
  filtros.addEventListener("click", (event) => {
    const boton = event.target.closest("button");
    if (!boton) return;

    categoriaActiva = boton.dataset.categoria;

    filtros.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");

    actualizar();
  });
}

// ── 5. DELEGACIÓN DE EVENTOS EN TARJETAS (PEDIDO RÁPIDO) ────────────────
if (listaProductos) {
  listaProductos.addEventListener("click", (event) => {
    const botonPedir = event.target.closest(".btn-pedir");
    if (!botonPedir || botonPedir.disabled) return;

    const nombreHelado = botonPedir.dataset.nombre;

    if (selectProducto) {
      selectProducto.value = nombreHelado;
      calcularPrecioEstimado();
    }

    // Desplazamiento suave al formulario
    const seccionPedido = document.querySelector("#pedido");
    if (seccionPedido) {
      seccionPedido.scrollIntoView({ behavior: "smooth" });
    }

    if (inputCantidad) {
      inputCantidad.focus();
    }
  });
}

// ── 6. CÁLCULO EN TIEMPO REAL DEL PRECIO ESTIMADO ───────────────────────
function calcularPrecioEstimado() {
  if (!selectProducto || !inputCantidad || !totalEstimado) return;

  const nombreSeleccionado = selectProducto.value;
  const cantidad = parseInt(inputCantidad.value, 10) || 0;

  const producto = (typeof productos !== "undefined")
    ? productos.find(p => p.nombre === nombreSeleccionado)
    : null;

  if (producto && !producto.disponible) {
    totalEstimado.textContent = "Agotado";
    return;
  }

  if (producto && cantidad > 0) {
    const total = (typeof calcularTotal === "function")
      ? calcularTotal(producto.precio, cantidad)
      : producto.precio * cantidad;

    totalEstimado.textContent = `Bs ${total.toFixed(2)}`;
  } else {
    totalEstimado.textContent = "Bs 0.00";
  }
}

if (selectProducto) {
  selectProducto.addEventListener("change", calcularPrecioEstimado);
}

if (inputCantidad) {
  inputCantidad.addEventListener("input", calcularPrecioEstimado);
}

// ── 7. EXPRESIONES REGULARES Y VALIDACIÓN EN VIVO ────────────────────────
const PATRONES = {
  telefono: /^[0-9]{7,8}$/,
  correo: /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i,
  ci: /^[0-9]{5,10}(-[0-9A-Za-z]{1,3})?$/,
};

console.log("70123456 válido:", PATRONES.telefono.test("70123456"));
console.log("7012 válido:", PATRONES.telefono.test("7012"));
console.log("ana@correo.bo válido:", PATRONES.correo.test("ana@correo.bo"));

// Configurar fecha mínima de entrega a hoy (en hora local para evitar desfases UTC)
const ahora = new Date();
const anio = ahora.getFullYear();
const mes = String(ahora.getMonth() + 1).padStart(2, "0");
const dia = String(ahora.getDate()).padStart(2, "0");
const hoy = `${anio}-${mes}-${dia}`;

if (inputFecha) {
  inputFecha.min = hoy;
  inputFecha.value = hoy;
  const limpiarErrorFecha = () => inputFecha.setCustomValidity("");
  inputFecha.addEventListener("input", limpiarErrorFecha);
  inputFecha.addEventListener("change", limpiarErrorFecha);
}

// Validación reactiva de teléfono
const inputTelefono = document.querySelector("#telefono");
if (inputTelefono) {
  inputTelefono.addEventListener("input", () => {
    const valor = inputTelefono.value.trim();
    if (valor && !PATRONES.telefono.test(valor)) {
      inputTelefono.setCustomValidity("Ingresa un número de teléfono válido de 7 u 8 dígitos (ej. 70123456).");
    } else {
      inputTelefono.setCustomValidity("");
    }
  });
}

// Validación reactiva de correo
const inputEmail = document.querySelector("#email");
if (inputEmail) {
  inputEmail.addEventListener("input", () => {
    const valor = inputEmail.value.trim();
    if (valor && !PATRONES.correo.test(valor)) {
      inputEmail.setCustomValidity("Ingresa una dirección de correo válida (ej. cliente@correo.com).");
    } else {
      inputEmail.setCustomValidity("");
    }
  });
}

// ── 8. EL EVENTO submit, preventDefault Y PROCESAMIENTO DEL PEDIDO ──────
if (formulario) {
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    // Verificación de validez HTML5
    if (!formulario.reportValidity()) {
      return;
    }

    // Validación de fecha no anterior a hoy
    const fecha = formulario.querySelector("#fecha");
    if (fecha) {
      if (fecha.value < hoy) {
        fecha.setCustomValidity("La fecha de entrega no puede ser anterior al día de hoy.");
        fecha.reportValidity();
        return;
      } else {
        fecha.setCustomValidity("");
      }
    }

    const datos = Object.fromEntries(new FormData(formulario));
    const cantidadSolicitada = parseInt(datos.cantidad, 10);

    if (isNaN(cantidadSolicitada) || cantidadSolicitada <= 0) {
      alert("Por favor ingresa una cantidad válida de porciones (al menos 1).");
      if (inputCantidad) inputCantidad.focus();
      return;
    }

    // Actualización de stock del producto en el catálogo
    const productoComprado = (typeof productos !== "undefined")
      ? productos.find(p => p.nombre === datos.producto)
      : null;

    if (!productoComprado) {
      alert("Por favor elige un producto válido de la lista.");
      if (selectProducto) selectProducto.focus();
      return;
    }

    if (!productoComprado.disponible || productoComprado.stock <= 0) {
      alert(`Lo sentimos, ${productoComprado.nombre} está actualmente agotado.`);
      return;
    }

    if (productoComprado.stock < cantidadSolicitada) {
      alert(`Lo sentimos, solo quedan ${productoComprado.stock} unidades de ${productoComprado.nombre}.`);
      return;
    }

    productoComprado.stock -= cantidadSolicitada;
    if (productoComprado.stock <= 0) {
      productoComprado.stock = 0;
      productoComprado.disponible = false;

      // Sincronizar select si el producto se agota
      if (selectProducto) {
        const opcionAgotada = [...selectProducto.options].find(opt => opt.value === productoComprado.nombre);
        if (opcionAgotada) {
          opcionAgotada.disabled = true;
          opcionAgotada.textContent = `${productoComprado.nombre} (Bs ${productoComprado.precio.toFixed(2)} - Agotado)`;
        }
      }
    }

    // Re-renderizamos para reflejar el nuevo stock y disponibilidad
    actualizar();

    const totalCalculado = (productoComprado.precio * cantidadSolicitada).toFixed(2);

    console.log("Pedido recibido con éxito:", datos);

    // Mensaje en el contador y mensaje detallado en el formulario
    resultado.textContent = `✅ Pedido de ${datos.nombre} procesado con éxito.`;

    if (mensajePedido) {
      mensajePedido.innerHTML = `
        <div class="confirmacion-tarjeta">
          <h3>🎉 ¡Gracias por tu pedido, ${datos.nombre}!</h3>
          <p>Hemos registrado tu solicitud para <strong>${cantidadSolicitada}x ${datos.producto}</strong>.</p>
          <p><strong>Total a pagar:</strong> Bs ${totalCalculado}</p>
          <p><strong>Fecha programada:</strong> ${datos.fecha}</p>
          <p class="aviso-contacto">Nos comunicaremos al <strong>${datos.telefono}</strong> para confirmar la entrega.</p>
        </div>
      `;
      mensajePedido.style.display = "block";
      mensajePedido.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Reiniciar formulario y restablecer valores por defecto
    formulario.reset();
    if (inputFecha) inputFecha.value = hoy;
    calcularPrecioEstimado();
  });
}

