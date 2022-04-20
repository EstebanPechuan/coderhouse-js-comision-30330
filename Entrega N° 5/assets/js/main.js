// Elementos de HTML a usar en JS
const carrito = document.querySelector('.carrito')
const secCompra = document.querySelector('.seccion-compra')
const divCompra = document.querySelector('.div-compra')
const close = document.querySelector('.close')
const numberBox = document.querySelector('.number-box')
const divPrecioTotal = document.querySelector('.precio-total')
const catalogo = document.querySelector('.cards-catalogo')

// Genero un arreglo vacío donde se ingresarán los objetos generados a través de clases
const productos = []

// Arreglo para generar el carrito
const productosCarrito = []


// Clase 'Producto' para instanciar cada elemento
class Producto {
    constructor(id, name, image, price) {
        this.id = id
        this.name = name
        this.image = image
        this.price = price
        this.cantidad = 1
    }
}

// Instanciación de productos y pusheo al arreglo vacío
let prod1 = new Producto(1, 'Producto 1', 'https://d368r8jqz0fwvm.cloudfront.net/6743-product_lg/gorra-df-009.jpg', 500)
let prod2 = new Producto(2, 'Producto 2', 'https://www.ogdistinciones.com.ar/fotos_productos/14265_3.jpg', 1500)
let prod3 = new Producto(3, 'Producto 3', 'https://d22fxaf9t8d39k.cloudfront.net/192a25d4c3df7071cd405471507313350ff3bc275bdc4a8996a7b1eb5de1b5f983402.jpeg', 700)

productos.push(prod1)
productos.push(prod2)
productos.push(prod3)

// NOTA:
// En próximas entregas la instanción y el pusheo estarán en una función.
// Esto me permitirá poner un botón para agregar un producto nuevo cuando usuario lo necesite.

// Imprimir los productos en en pantalla
for (let i = 0; i < productos.length; i++) {
    const element = `
    <div class="card">
        <h3> ${productos[i].name} </h3>
        <div class="card-img">
            <img src=" ${productos[i].image} " alt="">
        </div>
        <div class="card-precio">
            Precio: $<span> ${productos[i].price} </span>
        </div>
        <button onclick="agregar(${productos[i].id})">Agregar al carrito</button>
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
function agregar(id) {    
    if (!productosCarrito.includes(productos[id-1])) {
        productosCarrito.push(productos[id-1])
        contCarrito++


        divCompra.innerHTML = `
            <div class="close" onclick="closeCompra()">&#10006;</div>
        `


        divCompra.innerHTML = ''
        for (let i = 0; i < productosCarrito.length; i++) {
            let addCard =
                `<div class="card-compra">
                    <div class="compra-img">
                        <img src="${productosCarrito[i].image}" alt="">
                    </div>
        
                    <div class="compra-info">
                        <h3>${productosCarrito[i].name}</h3>
                        <p>Precio: $<span>${productosCarrito[i].price}</span></p>
                    </div>
        
                    <div class="cantidad-compra">
                        <h3>Cantidad</h3>
                        <span>${productosCarrito[i].cantidad}</span>
                    </div>
        
                    <button class="eliminar-compra" onclick="eliminar(this)">
                        <box-icon name='trash-alt'></box-icon>
                    </button>
                </div>`
            
            divCompra.innerHTML += addCard
        }
    } else {
        let posicionEnCarrito = productosCarrito.indexOf(productos[id-1])
        let nuevaCantidad = productosCarrito[posicionEnCarrito].cantidad += 1
        let nuevoPrecio = productosCarrito[posicionEnCarrito].price * nuevaCantidad

        posicionEnCarrito++

        let cantidadEnDOM = document.querySelector(`.card-compra:nth-child(${posicionEnCarrito})`)
        cantidadEnDOM = cantidadEnDOM.children[2].children[1].innerText = nuevaCantidad

        // productosCarrito[posicionEnCarrito].cantidad.innerHTML = nuevaCantidad;
    }
    
    precioTotal = 0
    for (let j = 0; j < productosCarrito.length; j++) {
        precioTotal += (productosCarrito[j].price * productosCarrito[j].cantidad)
        divPrecioTotal.children[1].children[0].innerText = precioTotal
    }
    
    if (contCarrito != 0) {
        numberBox.classList.remove('d-none')
        numberBox.innerText = contCarrito
    } else {
        numberBox.classList.add('d-none')
    }


    // precioTotal += parseInt(precio)
    // impTotal.innerText = precioTotal

    
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