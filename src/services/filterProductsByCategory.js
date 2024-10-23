import { getProductLocalStorage } from "./localStorage"
import { renderProducts } from "./products";

export const filterProductsByCategory = (categoria) => {

    const productos = getProductLocalStorage();

    let filteredProducts;

    switch (categoria) {
        case 'Todo':
            filteredProducts = productos;
            break;
        case 'Hamburguesas':
            filteredProducts = productos.filter(producto => producto.categoria == 'Hamburguesas')
            break;
        case 'Papas':
            filteredProducts = productos.filter(producto => producto.categoria == "Papas")
            break;
        case 'Gaseosas':
            filteredProducts = productos.filter(producto => producto.categoria == "Gaseosas")
            break;

        case 'menorPrecio':
            filteredProducts = productos.slice().sort((a,b) => a.precio - b.precio)
            break;
        case 'mayorPrecio':
            filteredProducts = productos.slice().sort((a,b) => b.precio - a.precio)
            break;

            
    }

renderProducts(filteredProducts);
}