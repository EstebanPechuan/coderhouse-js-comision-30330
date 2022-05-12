const tablero = document.querySelector('#tablero')
Sortable.create(tablero, {
    group: {
        name: 'listas'
    },
    animation: 150
})

const areaDeTareas = document.querySelectorAll('.tareas')
areaDeTareas.forEach(item => {
    Sortable.create(item, {
        group: {
            name: 'tareas'
        },
        animation: 150
    })
})

if(localStorage.tareas1 !== null) {
    let productosEnFavoritos = JSON.parse(localStorage.getItem('productosFavoritos'))
    console.log(productosEnFavoritos);
}


const agregarTarjeta = (e) => {
    let contenedorTareas = e.previousElementSibling
    let tarea = `
        <div class="tarea">
            <input class="titulo__tarea" type="text" placeholder="Titulo tarea">
            <textarea class="descripcion__tarea" type="text" placeholder="Descripción tarea" col="0"></textarea>
        </div>`
    contenedorTareas.innerHTML += tarea
}

// Guardar elementos en localstorage una vez que se dropea una tarea en alguna lista
let fromLista

const dragTarea = (e) => {
    fromLista = e.parentElement.getAttribute('id')
}

let arrContenedor = []
let arrLista = []

const dropTarea = (e) => {
    let listaDeTareas = e.parentElement.getAttribute('id')
    let itemsEnContenedor = document.querySelectorAll(`#${listaDeTareas} .tarea`)
    let itemsFromLista = document.querySelectorAll(`#${fromLista} .tarea`)

    localStorage.setItem(listaDeTareas, JSON.stringify(itemsEnContenedor))
    localStorage.setItem(fromLista, JSON.stringify(itemsFromLista))
}