//variables
const carrito = document.querySelector('#carrito');
const listacarrito = document.querySelector('#lista-carrito tbody');
const limpiarbtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#contenido');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //agregar al carrito
  listaCursos.addEventListener('click', agregarCurso);
  //elimina curso de carrito
  // carrito.addEventListener("click", eliminarCurso);
  //vaciar carrito
  limpiarbtn.addEventListener("click",() =>{
    articulosCarrito = [] //resetear
    limpiarHTML();
  });
}

//funciones
function agregarCurso(event) {
  event.preventDefault();
  if (event.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = event.target.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}
//eliminar curso carrito
// function eliminarCurso(event) {
//   if (event.target.classList.contains('borrar-curso')) {
//     const cursoId = event.target.getAttribute('data-id');
    //elimina del arreglo articulosCarrito
//     articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
//     carritoHTML();//iterar en carrito y mostrar html
// }
// }
//leer contenido
function leerDatosCurso(curso) {
  //objeto del curso
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    nombre: curso.querySelector('h2').textContent,
    precio: curso.querySelector('.precio').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  };
  //revisar si elemento esta repetido
  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
  if (existe) {
    //Actualizamos cantidad
    const curso = articulosCarrito.map(curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;//retorna objeto actualizado
      }else{
        return curso;//retorna objeto no duplicados
      }
    });
    articulosCarrito = [...curso];
  }else{
    //llenar arreglo
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  // console.log(articulosCarrito);
  carritoHTML();
}
//Muestra el carrito de compras en el html
function carritoHTML() {
  //limpiar el html
  limpiarHTML();
  articulosCarrito.forEach(curso => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
      <img src="${curso.imagen}" width="50">
    </td>
    <td>
      ${curso.nombre}
    </td>
    <td>
      ${curso.precio}
    </td>
    <td>
      ${curso.cantidad}
    </td>
    `;
  //   <td>
  //    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
  //  </td>
    //Agrega el HTML del carrito en el tbody
    listacarrito.appendChild(row);
  });
}
//Elimina los cursos del tbody
function limpiarHTML() {
  listacarrito.innerHTML = "";
}