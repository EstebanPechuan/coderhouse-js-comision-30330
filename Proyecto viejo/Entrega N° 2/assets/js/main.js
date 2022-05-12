// Elementos de HTML a usar en JS
const carrito = document.querySelector('.carrito')
const secCompra = document.querySelector('.seccion-compra')
const divCompra = document.querySelector('.div-compra')
const close = document.querySelector('.close')
const numberBox = document.querySelector('.number-box')
const divPrecioTotal = document.querySelector('.precio-total')

// Contadores
let contCarrito = 0
let precioTotal = 0

// Boton para abrir zona de la derecha
carrito.addEventListener('click', () => {
    secCompra.classList.add('seccion-compra-click')
    divCompra.classList.add('div-compra-click')
    divPrecioTotal.classList.add('precio-total-click')
})

// Boton para cerrar zona de la derecha
function closeCompra() {
    secCompra.classList.remove('seccion-compra-click')
    divCompra.classList.remove('div-compra-click')
    divPrecioTotal.classList.remove('precio-total-click')
}

// Acá elimino los elementos del carrito, a través del botón 
function eliminar(boton_eliminar) {
    if(confirm('Desea eliminar este elemnto del carrito?')) {
        divCompra.removeChild(boton_eliminar.parentElement)

        contCarrito--
        if (contCarrito != 0) {
            numberBox.classList.remove('d-none')
            numberBox.innerText = contCarrito
        } else {
            numberBox.classList.add('d-none')
        }

        let cardPadre = boton_eliminar.parentElement
        let precio = cardPadre.children[1].children[1].children[0].textContent
        let impTotal = document.querySelector('#totalPrice span')
        
        precioTotal -= parseInt(precio)
        console.log(precio);
        impTotal.innerText = precioTotal        
    }
}

// Acá genero el componente que se agregará en la sección del carrito
function agregar(boton_agregar) {
    contCarrito++
    if (contCarrito != 0) {
        numberBox.classList.remove('d-none')
        numberBox.innerText = contCarrito
    } else {
        numberBox.classList.add('d-none')
    }
    
    let cardPadre = boton_agregar.parentElement
    let titulo = cardPadre.children[0].textContent
    let srcImg = cardPadre.children[1].children[0].getAttribute('src')
    let precio = cardPadre.children[2].children[0].textContent
    let impTotal = document.querySelector('#totalPrice span')

    precioTotal += parseInt(precio)
    console.log(precioTotal);
    impTotal.innerText = precioTotal

    let addCard =
        `<div class="card-compra">
            <div class="compra-img">
            <img src="${srcImg}" alt="">
            </div>
            <div class="compra-info">
            <h3>${titulo}</h3>
            <p>Precio: $<span>${precio}</span></p>
            </div>
            
            <button class="eliminar-compra" onclick="eliminar(this)">
            <box-icon name='trash-alt'></box-icon>
            </button>
        </div>`
    
    divCompra.innerHTML += addCard
}

// Cerrar zona de la derecha, sólo si se clickea en la parte negra de la pantalla
secCompra.addEventListener('click', (e) => {
    console.log(e.target);

    if (e.target == secCompra) {
        secCompra.classList.remove('seccion-compra-click')
        divCompra.classList.remove('div-compra-click')
        divPrecioTotal.classList.remove('precio-total-click')
    }
})