const tarjetasDeMuestra = () => {    
    fetch('./js/tarjetasDeMuestra.json')
        .then((data) => data.json())
        .then((data) => {
            localStorage.setItem('json', JSON.stringify(data))

            data.forEach(item => {

                let tarea = `
                    <div class="tarea" ondragstart="dragTarea(${item.id}, this)" ondrop="dropTarea(${item.id}, this)">
                        <button class="close" onclick="eliminarTarjeta(${item.id}, this)">X</button>
                        <input class="titulo__tarea" type="text" placeholder="${item.titulo}" onchange="actualizarInput(${item.id}, this.value)">
                        <textarea class="descripcion__tarea" type="text" placeholder="${item.descripcion}" onchange="actualizarDescripcion(${item.id}, this.value)" col="0"></textarea>
                    </div>`
            
                if (item.estado === 'pendiente') {
                    tareasfromLocalStorage = document.querySelector('#pendiente').innerHTML += tarea
                } else if (item.estado === 'curso') {
                    tareasfromLocalStorage = document.querySelector('#curso').innerHTML += tarea
                } else if (item.estado === 'revisar') {
                    tareasfromLocalStorage = document.querySelector('#revisar').innerHTML += tarea
                } else {
                    tareasfromLocalStorage = document.querySelector('#terminada').innerHTML += tarea
                }
            })
        })
}

let idDeTareas = 3

let contenidoLocalStorage = JSON.parse(localStorage.getItem('json'))

let tareasfromLocalStorage

if (contenidoLocalStorage !== null && contenidoLocalStorage.length > 0) {
    idDeTareas = contenidoLocalStorage[contenidoLocalStorage.length-1].id

    contenidoLocalStorage.forEach(item => {
        let tarea = `
            <div class="tarea" ondragstart="dragTarea(${item.id}, this)" ondrop="dropTarea(${item.id}, this)">
                <button class="close" onclick="eliminarTarjeta(${item.id}, this)">X</button>
                <input class="titulo__tarea" type="text" placeholder="${item.titulo}" onchange="actualizarInput(${item.id}, this.value)">
                <textarea class="descripcion__tarea" type="text" placeholder="${item.descripcion}" onchange="actualizarDescripcion(${item.id}, this.value)" col="0"></textarea>
            </div>
        `
    
        if (item.estado === 'pendiente') {
            tareasfromLocalStorage = document.querySelector('#pendiente').innerHTML += tarea
        } else if (item.estado === 'curso') {
            tareasfromLocalStorage = document.querySelector('#curso').innerHTML += tarea
        } else if (item.estado === 'revisar') {
            tareasfromLocalStorage = document.querySelector('#revisar').innerHTML += tarea
        } else {
            tareasfromLocalStorage = document.querySelector('#terminada').innerHTML += tarea
        }
    })
} else {
    tarjetasDeMuestra()
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
    idDeTareas++
    let contenedorTareas = e.previousElementSibling
    let tarea = `
        <div class="tarea">
            <button class="close" onclick="eliminarTarjeta(${idDeTareas}, this)">X</button>
            <input id="input1" class="titulo__tarea" type="text" placeholder="Titulo tarea" onchange="actualizarInput(${idDeTareas}, this.value)">
            <textarea id="input2" class="descripcion__tarea" type="text" placeholder="Descripción tarea" col="0" onchange="actualizarText(${idDeTareas}, this.value)"></textarea>
            <input type="submit" class="btn-guardar" value="Guardar" onclick="guardarInfo(input1.value, input2.value, this)">
        </div>
    `
    
    contenedorTareas.innerHTML += tarea

    const inputFocus = document.querySelector(`#input1`)
    inputFocus.focus()
}

const guardarInfo = (i1, i2, e) => {
    contenidoLocalStorage = JSON.parse(localStorage.getItem('json'))
    let boton = e
    let listaDeTareas = boton.parentElement.parentElement.id
    
    let pushObjeto = {
        id: idDeTareas,
        titulo: i1,
        descripcion: i2,
        estado: listaDeTareas
    }
    
    contenidoLocalStorage.push(pushObjeto)
    pushToLocalStorage(contenidoLocalStorage)

    // Saco los id de los inputs de la tarjeta recién creada
    boton.parentElement.children[0].removeAttribute('id')
    boton.parentElement.children[1].removeAttribute('id')
    
    boton.remove()
}

const actualizarInput = (id, value) => {
    let itemEnJson = contenidoLocalStorage.filter(item => item.id == id)
    
    itemEnJson[0].titulo = value
    pushToLocalStorage(contenidoLocalStorage)
}

const actualizarDescripcion = (id, value) => {
    let itemEnJson = contenidoLocalStorage.filter(item => item.id == id)
    
    itemEnJson[0].descripcion = value
    pushToLocalStorage(contenidoLocalStorage)
}

// Guardar elementos en localstorage una vez que se dropea una tarea en alguna lista
const dropTarea = (id, element) => {
    let listaDeTareas = element.parentElement.getAttribute('id')
    let itemEnJson = contenidoLocalStorage.filter(item => item.id == id)

    itemEnJson[0].estado = listaDeTareas
    pushToLocalStorage(contenidoLocalStorage)
}

const pushToLocalStorage = (contenidoLocalStorage) => {
    localStorage.setItem('json', JSON.stringify(contenidoLocalStorage))
}

const eliminarTarjeta = (id, e) => {
    e.parentElement.remove()
    
    contenidoLocalStorage = contenidoLocalStorage.filter((item) => item.id !== id);
    localStorage.setItem('json', JSON.stringify(contenidoLocalStorage))
}

