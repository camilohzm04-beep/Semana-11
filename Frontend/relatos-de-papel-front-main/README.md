# 📖 Paper Tales – Frontend Web Store

Este repositorio contiene el desarrollo del frontend de una tienda virtual de libros, creada como parte del máster en Desarrollo Web Full Stack.
La aplicación simula un e-commerce completo implementado como Single Page Application (SPA) usando React, sin conexión a un backend real.

1. 🧭 Visión General del Proyecto

El proyecto tiene como finalidad construir una interfaz moderna, intuitiva y escalable para una librería online, aplicando buenas prácticas de desarrollo frontend y una correcta separación de responsabilidades.

2. 🔑 Funcionalidades Implementadas

- Pantalla de Bienvenida
  Vista inicial con mensaje introductorio y redirección automática al catálogo.

- Página Principal (Catálogo)
  Listado de libros en formato grid con sistema de búsqueda por título.

- Vista de Detalle
  Página individual para cada libro con información ampliada (autor, ISBN, descripción y precio).

- Gestión de Compras

- Icono de carrito siempre visible.

- Panel lateral (drawer) para administrar productos.

- Persistencia del carrito tras recargar la página.

- Proceso de Checkout
  Simulación de compra con resumen del pedido y confirmación final.

3. 🧪 Tecnologías y Herramientas Utilizadas
   🔹 Stack Principal

- React + Vite: Entorno moderno para desarrollo rápido y eficiente.

- JavaScript ES6+: Uso de funciones flecha, módulos, destructuración y hooks.

- HTML5: Estructura semántica para mejorar accesibilidad y claridad.

4. 🎨 Estilos y Diseño

- CSS puro: No se utilizan frameworks externos.

- Metodología BEM: Organización clara de clases CSS para mejorar mantenibilidad.

- Variables CSS: Definición de paleta de colores, tipografías y espaciados desde :root.

5. 🧭 Navegación

- React Router DOM (v6)
  Implementación de rutas dinámicas mediante:

<Routes> y <Route>

- Link

- useNavigate

6. 🧩 Componentización

La aplicación está compuesta por múltiples componentes funcionales reutilizables, organizados de la siguiente manera:

Componentes UI: tarjetas de producto, buscador, carrito, layout general.

Vistas: landing, catálogo, detalle de libro y checkout.

Contexto Global: gestión del estado del carrito.

Hooks Personalizados: lógica reutilizable separada de la vista.

6. 🪝 Hooks

Hooks de React:

useState

useEffect

useContext

useMemo

Hook Personalizado:

useAutoRedirect: encargado de gestionar la redirección automática en la pantalla inicial.

7. 📦Datos Simulados

Se emplean datos mock almacenados en un archivo JavaScript (books.js) que representa el inventario de la tienda.

No se realizan peticiones HTTP ni se consume un backend real.

8. 🗂️ Organización del Proyecto
   src/
   ├── components/ # Componentes reutilizables de interfaz
   ├── context/ # Contexto global del carrito
   ├── data/ # Datos simulados
   ├── hooks/ # Hooks personalizados
   ├── pages/ # Vistas principales de la aplicación
   ├── styles/ # Estilos globales (BEM)
   ├── App.jsx # Definición de rutas
   └── main.jsx # Punto de entrada

9. ▶️ Cómo Ejecutar el Proyecto

Descargar o clonar el repositorio.

- Instalar dependencias:

npm install

- Ejecutar el servidor de desarrollo:

npm run dev

- Abrir el navegador en:

http://localhost:5173

10. Comprobaciones de Funcionamiento

La aplicación redirige automáticamente desde la vista inicial al catálogo.

El buscador filtra libros en tiempo real.

El carrito mantiene su estado tras recargar la página.

El checkout confirma la compra y vacía el carrito.
# Relatos-de-papel-
