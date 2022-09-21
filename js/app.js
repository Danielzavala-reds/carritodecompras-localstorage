// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector ('#lista-carrito  tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
// Variable que va a ser el carrito de compras
let articulosCarrito = [];

// Crear una funcion donde se registran todos los eventlisteners

cargarEventListeners();
function cargarEventListeners(){
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Muestra los cursos de LocalStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse (localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; //reseteamos el arreglo

        limpiarHTML(); // Eliminamos todo el HTML
    })

   


}




// Funciones
function agregarCurso(evt){
    evt.preventDefault();
    if(evt.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = evt.target.parentElement.parentElement;
        

        leerDatosCurso(cursoSeleccionado);
    }
    
}

// Elimina un curso del carrito

function eliminarCurso(evt){
    if(evt.target.classList.contains('borrar-curso')){
        const cursoId = evt.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

// Leer el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso (curso){
    console.log(curso);


    // Crear un objeto con el contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        // Seleccionar el id que tiene cada carrito con .getAttribute
        id: curso.querySelector('a').getAttribute('data-id'), 
        cantidad: 1,
    }
        console.log(infoCurso);

    // Revisa si un elemento ya xiste en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else{
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];

    } else {
        // Agregamos el curso al carrito
        articulosCarrito= [...articulosCarrito, infoCurso];
    }

    // console.log(infoCurso);
    // Agrega elementos al arreglo de carrito
    // articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);
    carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML(){

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( (curso) => {
        
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${curso.imagen}" width="100"></td>
        <td> ${curso.titulo}</td>
        <td> ${curso.precio}</td>
        <td> ${curso.cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `;
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
    // Agregar los articulos al LocalStorage
    sincronizarStorage();
}


function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del tbody
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }


    // Forma lenta
    // contenedorCarrito.innerHTML = '';
}