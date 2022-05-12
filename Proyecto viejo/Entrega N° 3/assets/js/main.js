// Elementos de HTML a usar en JS
const carrito = document.querySelector('.carrito')
const secCompra = document.querySelector('.seccion-compra')
const divCompra = document.querySelector('.div-compra')
const close = document.querySelector('.close')
const numberBox = document.querySelector('.number-box')
const divPrecioTotal = document.querySelector('.precio-total')
const catalogo = document.querySelector('.cards-catalogo')

// Arreglos con la información para mapear los productos del catálogo
const tituloProductos = [
    'Producto 1',
    'Producto 2',
    'Producto 3'
]

const imgProductos = [
    'https://d368r8jqz0fwvm.cloudfront.net/6743-product_lg/gorra-df-009.jpg',
    'https://www.ogdistinciones.com.ar/fotos_productos/14265_3.jpg',
    'https://d22fxaf9t8d39k.cloudfront.net/192a25d4c3df7071cd405471507313350ff3bc275bdc4a8996a7b1eb5de1b5f983402.jpeg'
]

const precioProductos = [
    500, 
    1500, 
    700
]

// Imprimir los productos en en pantalla
for (let i = 0; i < tituloProductos.length; i++) {
    const element = `
    <div class="card">
        <h3> ${tituloProductos[i]} </h3>
        <div class="card-img">
            <img src=" ${imgProductos[i]} " alt="">
        </div>
        <div class="card-precio">
            Precio: $<span> ${precioProductos[i]} </span>
        </div>
        <button onclick="agregar(this)">Agregar al carrito</button>
    </div>
    `;
    
    catalogo.innerHTML += element
}


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
    if(confirm('Desea eliminar este elemento del carrito?')) {
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