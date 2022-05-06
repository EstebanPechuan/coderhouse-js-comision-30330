// === REVISO QUE NO HAYA NADA EN EL LOCALSTORAGE ===
// Siempre trabajo con la misma variable (productosEnFavoritos) que viene desde './js/main.js' porque si no se sobreescribe el localstorage al sacar corazoncitos en la página de favoritos

if(localStorage.getItem('productosFavoritos') !== null) {
    productosEnFavoritos = JSON.parse(localStorage.getItem('productosFavoritos'))
}

if (productosEnFavoritos !== ' ') {
    productosEnFavoritos.forEach(item => {
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
                            <img src="img/heart-border.svg" alt="" class="d-none">
                            <img src="img/heart-fill.svg" alt="">
                        </button>
                    </div>

                    <button class="comprar">
                        <p>Comprar</p>
                    </button>
                </div>
            </div>`

        let catalogoFavoritos = document.querySelector('.catalogo__favoritos')
        catalogoFavoritos.innerHTML += elemento
    });
} else {
    let catalogoFavoritos = document.querySelector('.catalogo__favoritos')
    catalogoFavoritos.innerHTML = 'Todavía no tienes productos favoritos :('
}