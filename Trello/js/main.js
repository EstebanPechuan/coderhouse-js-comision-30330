const json = [
    {
        'id': 1,
        'titulo': 'Tarea de muestra 1',
        'descripcion': 'Texto de tarea',
        'estado': 'pendiente'
    },
    {
        'id': 2,
        'titulo': 'Tarea de muestra 2',
        'descripcion': 'Texto de tarea',
        'estado': 'pendiente'
    },
    {
        'id': 3,
        'titulo': 'Tarea en curso 1',
        'descripcion': 'Texto de tarea en curso',
        'estado': 'curso'
    }
]


let contenidoLocalStorage = JSON.parse(localStorage.getItem('json'))
let idDeTareas = contenidoLocalStorage[contenidoLocalStorage.length-1].id
console.log(idDeTareas)

if (contenidoLocalStorage !== null) {
    console.log(contenidoLocalStorage);
    let tareasfromLocalStorage
    contenidoLocalStorage.forEach(item => {
        let tarea = `
            <div class="tarea" ondragstart="dragTarea(this)" ondrop="dropTarea(this)">
                <input class="titulo__tarea" type="text" placeholder="${item.titulo}" onchange="alert(this.value)">
                <textarea class="descripcion__tarea" type="text" placeholder="${item.descripcion}" col="0"></textarea>
            </div>`
    
        if (item.estado === 'pendiente') {
            tareasfromLocalStorage = document.querySelector('#tareas1').innerHTML += tarea
            console.log('pendiente');

        } else if (item.estado === 'curso') {
            tareasfromLocalStorage = document.querySelector('#tareas2').innerHTML += tarea
            console.log('curso');
        } else if (item.estado === 'revisar') {
            tareasfromLocalStorage = document.querySelector('#tareas3').innerHTML += tarea
            console.log('revisar');

        } else {
            tareasfromLocalStorage = document.querySelector('#tareas4').innerHTML += tarea

        }
    })
}

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

const agregarTarjeta = (e) => {
    let contenedorTareas = e.previousElementSibling
    let tarea = `
    <div class="tarea">
        <input id="input1" class="titulo__tarea" type="text" placeholder="Titulo tarea" onchange="actualizarInput(this.value)">
        <textarea id="input2" class="descripcion__tarea" type="text" placeholder="Descripción tarea" col="0" onchange="actualizarText(this.value)"></textarea>
        <input type="submit" class="btn-guardar" value="Guardar" onclick="guardarInfo(input1.value, input2.value, this)">
    </div>`
    contenedorTareas.innerHTML += tarea
}

const guardarInfo = (i1, i2, e) => {
    let boton = e
    let listaDeTareas = boton.parentElement.parentElement.id
    let tablero
    idDeTareas++
    

    if (listaDeTareas === 'tareas1') {
        tablero = 'pendiente'
    } else if (listaDeTareas === 'tareas2') {
        tablero = 'curso'
    } else if (listaDeTareas === 'tareas3') {
        tablero = 'revisar'
    } else {
        tablero = 'finalizado'
    }

    
    let pushObjeto = {
        'id': idDeTareas,
        'titulo': i1,
        'descripcion': i2,
        'estado': tablero
    }
    
    contenidoLocalStorage.push(pushObjeto)
    pushToLocalStorage(contenidoLocalStorage)

    // Saco los id de los inputs hermanos al botón
    boton.parentElement.children[0].removeAttribute('id')
    boton.parentElement.children[1].removeAttribute('id')
    
    boton.remove()
}

const actualizarInput = (inputValue) => {
    // console.log(inputValue);
}

const actualizarText = (textValue) => {
    // console.log(textValue);
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
    // console.log(e);

    let tituloTarea = e.children[0].placeholder

    // console.log(json.includes(tituloTarea));
    // console.log(typeof(tituloTarea));

    localStorage.setItem(listaDeTareas, JSON.stringify(itemsEnContenedor))
    localStorage.setItem(fromLista, JSON.stringify(itemsFromLista))
}

const pushToLocalStorage = (contenidoLocalStorage) => {
    localStorage.setItem('json', JSON.stringify(contenidoLocalStorage))
}