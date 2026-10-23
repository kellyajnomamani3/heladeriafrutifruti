# [HELADERÍA FRUTI FRUTI]

**Estudiante:** Kelly Lilian Ajno Mamani  
**Cliente:** Heladería Fruti Fruti  
**URL publicada:** [DESPUÉS, PRÓXIMA SEMANA]

## Qué resuelve

Este sitio web permite a los clientes conocer los productos que ofrece la Heladería Fruti Fruti, como helados de diferentes sabores y otros productos. También facilita la consulta de precios, la visualización de los productos y el acceso a información del negocio. De esta manera, los clientes pueden conocer mejor la heladería de una forma sencilla y ordenada.

## Cómo está construido

- **Semántica:** [qué elementos usaste y dónde]

En mi proyecto web **HELADERÍA FRUTI FRUTI** utilicé HTML para organizar la información de la página de manera ordenada y sencilla.

`<header>`: se encuentra en la parte superior y contiene el nombre de la heladería, el eslogan y el menú de navegación.

`<nav>`: contiene los enlaces para acceder a las diferentes secciones de la página, como productos, precios y pedidos.

`<section>`: divide la página en diferentes partes, como la presentación de la heladería, los productos, los precios y el formulario de pedidos.

`<main>`: contiene el contenido principal de la página, donde se muestran los productos, precios y la información para realizar pedidos.

`<article>`: se utiliza para organizar las tarjetas de los productos, como los diferentes sabores y tipos de helados.

`<figure>` y `<figcaption>`: sirven para mostrar las imágenes de los productos y agregarles una descripción.

`<table>`: se utiliza para presentar los precios de los productos de manera organizada.

`<form>`: permite ingresar los datos del cliente, seleccionar el producto, indicar la cantidad y escribir la información necesaria para el pedido.

`<footer>`: se encuentra al final de la página y contiene información de la heladería y los derechos reservados.

También utilicé etiquetas como `<h1>`, `<h2>`, `<h3>`, `<p>`, `<img>` y `<a>` para organizar los títulos, textos, imágenes y enlaces.

## Layout

Para organizar los elementos de mi página utilicé principalmente **Flexbox y CSS Grid**, porque permiten distribuir el contenido de manera ordenada y adaptable a diferentes tamaños de pantalla.

### Flexbox

Utilicé Flexbox en los siguientes lugares:

**Encabezado (header):** para colocar el nombre de la heladería y el menú de navegación de manera ordenada.

**Menú de navegación (nav ul):** para organizar los enlaces de las diferentes secciones de la página.

**Tarjetas de productos:** para organizar el contenido de cada producto de manera vertical.

**Botones:** para alinear y distribuir correctamente los botones de la página.

### CSS Grid

Utilicé CSS Grid en estos lugares:

**Sección de productos:** para distribuir las tarjetas de los helados en varias columnas y adaptarlas al espacio disponible.

**Sección de precios:** para organizar la información de los productos de manera clara.

También utilicé reglas `@media` en CSS para adaptar el diseño a celulares y tabletas. En pantallas pequeñas, los elementos se organizan de forma vertical para facilitar la navegación.

De esta manera, **Flexbox** me permite alinear los elementos y **CSS Grid** me ayuda a organizar el contenido en filas y columnas.

## Diseño

Para el diseño de mi página elegí colores relacionados con una **heladería**, buscando transmitir una imagen alegre, agradable y llamativa.

### Paleta de colores

**Celeste:** se utiliza en algunos elementos principales de la página. Representa frescura y tranquilidad.

**Rosa:** se utiliza como color de acento para destacar botones y algunos elementos importantes.

**Blanco:** se utiliza como fondo de algunas secciones y tarjetas para mantener una apariencia limpia.

**Amarillo:** se utiliza para destacar algunos elementos y dar una apariencia alegre.

**Gris:** se utiliza en textos secundarios y algunos detalles de la página.

Además, los colores ayudan a que la página tenga una apariencia relacionada con los helados y sea agradable para los clientes.

### Tipografía

Utilicé una familia tipográfica sencilla y fácil de leer para que los títulos, precios y descripciones de los productos puedan verse claramente.

También establecí diferentes tamaños para los títulos y el texto normal, con el objetivo de que la información esté bien organizada y sea fácil de leer.

## Personalización

Una característica de mi proyecto es que los elementos de la página pueden tener diferentes estilos y colores para hacer que la heladería tenga una presentación más llamativa.

Los botones y otros elementos interactivos tienen efectos visuales cuando el usuario pasa el cursor sobre ellos.

## En conclusión

El diseño de **Heladería Fruti Fruti** combina una estructura semántica en HTML, una distribución adaptable con **Flexbox y CSS Grid**, y una presentación colorida relacionada con una heladería.

El objetivo es ofrecer una página web sencilla, ordenada y agradable, donde los clientes puedan conocer los productos, consultar sus precios y realizar pedidos de manera fácil.

## Capturas

![Escritorio](ruta/a/captura-escritorio.png)

![Móvil 375px](ruta/a/captura-movil.png)

## Lo más difícil

El problema que tuve fue en el colocado de las imágenes, porque al principio no aparecían correctamente en el proyecto.

Lo resolví revisando el código y guardando nuevamente el proyecto. Después de volver a abrirlo, las imágenes ya aparecieron correctamente.

## Resultado final

Mi proyecto final es una página web para la **Heladería Fruti Fruti**, donde se muestran los productos, precios e información de la heladería de una manera ordenada y atractiva.

## LABORATORIO 2

En esta etapa del Laboratorio 2, implementamos la modularización del código JavaScript para la gestión integral de la Heladería Fruti Fruti a través de los archivos "datos.js" y "funciones.js". Modelamos el catálogo de productos mediante objetos y arreglos que incluyen nombres, precios actualizados, categorías y control de stock, aplicando métodos avanzados como "map", "filter", "find" y "reduce" para calcular el valor del inventario y clasificar las variedades. Asimismo, ejercitamos conceptos fundamentales como coerción de tipos, desestructuración, funciones flecha, closures para contadores de ventas y programación orientada a objetos con clases y herencia.

Posteriormente, conectamos la lógica de datos con la interfaz de usuario a través de "render.js", "app.js" y el módulo interactivo "eventos.js". Logramos renderizar de forma dinámica las tarjetas de helados dentro de la cuadrícula responsiva de CSS Grid, actualizar la información de la cabecera
