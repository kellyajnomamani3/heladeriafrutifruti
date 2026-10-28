// ── 1. OBJETO LITERAL ───────────────────────────────────────────────────
const heladodeldia = {
  nombre: "Helado artesanal del día",
  precio: 15.0,
  categoria: "especiales",
  stock: 40,
  disponible: true,
};

console.log(heladodeldia.nombre);

const propiedad = "precio";
console.log(heladodeldia[propiedad]);

heladodeldia.stock = 35;
heladodeldia.artesanal = true;
delete heladodeldia.artesanal;

// ── 2. DESTRUCTURING ────────────────────────────────────────────────────
const { nombre, precio } = heladodeldia;
console.log(`${nombre} cuesta Bs ${precio}`);

const heladoDeAyer = { ...heladodeldia, precio: 10.0, nombre: "Helado del día anterior" };
console.log(heladoDeAyer);

// ── 3. ARREGLO DE OBJETOS ───────────────────────────────────────────────
const productos = [
  {
    id: 1,
    nombre: "Helado de Chocolate",
    precio: 25.0,
    categoria: "cremosos",
    stock: 25,
    disponible: true,
    imagen: "chocolate.jpg",
    descripcion: "Cremoso chocolate artesanal con trozos de cacao.",
  },
  {
    id: 2,
    nombre: "Helado de Açaí",
    precio: 35.0,
    categoria: "especiales",
    stock: 30,
    disponible: true,
    imagen: "acai.jpg",
    descripcion: "Puro açaí del trópico con frutas y mucha frescura.",
  },
  {
    id: 3,
    nombre: "Helado de Frutilla",
    precio: 25.0,
    categoria: "frutales",
    stock: 12,
    disponible: true,
    imagen: "frutilla.jpg",
    descripcion: "Deliciosa crema de frutillas frescas seleccionadas.",
  },
  {
    id: 4,
    nombre: "Helado de Coco",
    precio: 20.0,
    categoria: "frutales",
    stock: 0,
    disponible: false,
    imagen: "coco.jpg",
    descripcion: "Frescura tropical con coco rallado natural.",
  },
  {
    id: 5,
    nombre: "Helado de Vainilla",
    precio: 10.0,
    categoria: "cremosos",
    stock: 20,
    disponible: true,
    imagen: "vainilla.jpg",
    descripcion: "Clásico y aromático helado elaborado con extracto de vainilla natural.",
  },
  {
    id: 6,
    nombre: "Helado de Mango",
    precio: 15.0,
    categoria: "frutales",
    stock: 18,
    disponible: true,
    imagen: "mango.jpg",
    descripcion: "Refrescante helado artesanal elaborado con pulpa de mangos maduros.",
  },
  {
    id: 7,
    nombre: "Helado de Leche Condensada",
    precio: 25.0,
    categoria: "cremosos",
    stock: 15,
    disponible: true,
    imagen: "leche condensada.jpg",
    descripcion: "Suave, dulce y cremoso helado con auténtica leche condensada.",
  },
  {
    id: 8,
    nombre: "Helado de Maracuyá",
    precio: 28.0,
    categoria: "frutales",
    stock: 14,
    disponible: true,
    imagen: "maracuya.jpg",
    descripcion: "Intenso y exótico sabor tropical con pulpa fresca de maracuyá.",
  },
];

// ── 4. LOS MÉTODOS QUE IMPORTAN ─────────────────────────────────────────
productos.forEach(p => console.log(p.nombre));

const nombres = productos.map(p => p.nombre);
console.log(nombres);

const disponibles = productos.filter(p => p.disponible);
console.log(disponibles.length, "de", productos.length, "disponibles");

const caro = productos.find(p => p.precio > 30);
console.log(caro);

console.log(nombres.includes("Helado de Chocolate"));
console.log(productos.some(p => p.stock === 0));
console.log(productos.every(p => p.precio > 0));

const porPrecio = [...productos].sort((a, b) => a.precio - b.precio);
console.log(porPrecio.map(p => p.nombre));

const valorInventario = productos.reduce((acumulador, p) => acumulador + p.precio * p.stock, 0);
console.log("Valor del inventario: Bs", valorInventario.toFixed(2));

// ── 5. ENCADENAR ────────────────────────────────────────────────────────
const nombresDisponibles = productos
  .filter(p => p.disponible)
  .map(p => p.nombre);
console.log(nombresDisponibles);

const totalCremososEnStock = productos
  .filter(p => p.categoria === "cremosos" && p.disponible)
  .reduce((total, p) => total + p.precio * p.stock, 0);
console.log("Cremosos en stock: Bs", totalCremososEnStock.toFixed(2));

const porCategoria = productos.reduce((grupos, p) => {
  if (!grupos[p.categoria]) grupos[p.categoria] = [];
  grupos[p.categoria].push(p.nombre);
  return grupos;
}, {});
console.log(porCategoria);

// ── 6. CLASES ───────────────────────────────────────────────────────────
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  estaDisponible() {
    return this.stock > 0;
  }

  valorEnStock() {
    return this.precio * this.stock;
  }
}

const sundae = new Producto("Sundae Especial", 18.0, 50);
console.log(sundae.nombre, sundae.estaDisponible(), sundae.valorEnStock());

class ProductoConDescuento extends Producto {
  constructor(nombre, precio, stock, descuento) {
    super(nombre, precio, stock);
    this.descuento = descuento;
  }

  precioFinal() {
    return this.precio * (1 - this.descuento / 100);
  }
}

const paleta = new ProductoConDescuento("Paleta Frutal", 8.0, 20, 25);
console.log(paleta.precioFinal(), paleta.estaDisponible());
