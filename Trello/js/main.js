const tablero = document.querySelector('#tablero')

Sortable.create(tablero, {
    group: {
        name: 'listas'
    },
    animation: 150
})

const tareas1 = document.querySelector('#tareas1')
const tareas2 = document.querySelector('#tareas2')

Sortable.create(tareas1, {
    group: {
        name: 'tareas'
    },
    animation: 150
})

Sortable.create(tareas2, {
    group: {
        name: 'tareas'
    },
    animation: 150
})