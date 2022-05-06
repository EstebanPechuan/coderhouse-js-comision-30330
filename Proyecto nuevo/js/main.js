class Gorra {
    constructor(id, img, titulo, precio) {
        this.id = id
        this.img = img
        this.titulo = titulo
        this.precio = precio
        this.cantidad = 1
        this.favorito = false
    }
}

let productosEnPagina = []
let productosEnFavoritos = []

let productosArray = [
    {
        img: 'https://http2.mlstatic.com/D_NQ_NP_842761-MLA45601779395_042021-W.jpg',
        titulo: 'Gorra New York Negra',
        precio: 1500
    },
    {
        img: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/564/890/products/go-jean-celeste-rosa1-c392b2f1599dc261b816220341426579-640-0.jpg',
        titulo: 'Gorras trucker, de gabardina',
        precio: 3000
    },
    {
        img: 'https://cdn.shopify.com/s/files/1/0443/2039/1332/products/28756_LFBE.jpg?v=1619731693',
        titulo: 'Gorra Duckbill Trucker',
        precio: 2500
    },
    {
        img: 'https://vasari.vteximg.com.br/arquivos/ids/202135-500-500/VGP173785-GR.jpg?v=637757788072900000',
        titulo: 'Gorra Plana Vasari',
        precio: 2500
    },
    {
        img: 'https://essential.vteximg.com.br/arquivos/ids/542333-454-423/964-0200_1.jpg?v=637847789642070000',
        titulo: 'Gorra Puma',
        precio: 3500
    },
    {
        img: 'https://cf.shopee.com.ar/file/fb0199d3d25a8773362e4a084e6ebd8f',
        titulo: 'Gorra Baseball Sandwich Hebilla',
        precio: 2000
    }
]

productosArray.forEach((producto, i) => {
    let prod = new Gorra(i, producto.img, producto.titulo, producto.precio)
    productosEnPagina.push(prod)
});

productosEnPagina.forEach(item => {
    // COMPROBAR SI ESTÁ EN FAVORITOS O NO    
    let elemento = `
    <div class="producto">
        <div class="prod__img">
            <img src="${item.img}" alt="">
        </div>

        <div class="prod__info">
            <h4>${item.titulo}</h4>
            <p>$<span>${item.precio}</span></p>
        </div>

        <div class="prod__footer">
            <div>
                <button onclick="favActivo(this, ${item.id})" class="fav">
                    <img src="img/heart-border.svg" alt="">
                    <img src="img/heart-fill.svg" alt="" class="d-none">
                </button>
            </div>

            <button class="comprar">
                <p>Comprar</p>
            </button>
        </div>
    </div>`

    let espacioEnDOM = document.querySelector('.catalogo__productos')
    espacioEnDOM.innerHTML += elemento
});



// === FAVORITO ACTIVADO / DESACTIVADO ===
let corazon = document.querySelectorAll('.fav')

function favActivo(e, id) {
    let favoritoActivo
    e.children[0].classList.toggle('d-none')
    favoritoActivo = e.children[1].classList.toggle('d-none');

    agregarFavorito(favoritoActivo, id)
}

// === ACÁ AGREGO LOS ELEMENTOS CON CORAZÓN A UN ARRAY PARA FAVORITOS
function agregarFavorito(favoritoActivo, id) {

    if (!favoritoActivo) {
        productosEnFavoritos.push(productosEnPagina[id])
        productosEnPagina[id].favorito = true
        
        // Agrego a localstorage los favoritos
        localStorage.setItem('productosFavoritos', JSON.stringify(productosEnFavoritos))

        console.log(productosEnFavoritos);
    } else {
        let posicionEnArray = productosEnFavoritos.indexOf(productosEnPagina[id])
        productosEnFavoritos.splice(posicionEnArray, 1)
        console.log(productosEnFavoritos);
        productosEnPagina[id].favorito = false        
        // Agrego a localstorage los favoritos sin los productos eliminados
        localStorage.setItem('productosFavoritos', JSON.stringify(productosEnFavoritos))
    }
}