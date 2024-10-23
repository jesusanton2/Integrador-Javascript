import { getProductLocalStorage } from "./localStorage"
import { showProductsPopUp } from "./showProductsOnPopUp";

export const renderProducts = (productos = getProductLocalStorage()) =>{
   
   const productGrid = document.getElementById('product-grid');

   productGrid.innerHTML = "";

   productos.forEach(producto => {
      const productElement = document.createElement('div')
      productElement.classList.add("product-item")

      productElement.innerHTML = `
         <img src="${producto.imgURL}" alt="${producto.nombre}" />
         <h3>${producto.nombre}</h3>
         <p>Precio: $${producto.precio.toFixed(2)}</p>
      `;
      productGrid.appendChild(productElement);

      productElement.addEventListener('click',() =>{
         showProductsPopUp(producto);
      })
   });
  
   
}