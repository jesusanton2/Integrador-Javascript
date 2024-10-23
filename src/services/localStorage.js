import { productoActivo } from "../../main";
import { renderProducts } from "./products";


export const getProductLocalStorage = () => {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    return productos;
  }

export const saveProductosLocalStorage = (productIn) => {
   
    let productsInLocal = getProductLocalStorage();

    const existingIndex = productsInLocal.findIndex((productsLocal) =>{
     return productsLocal.id === productIn.id;
    })

    if(existingIndex !== -1){

      productsInLocal[existingIndex] = productIn;
       
    }else{
        productsInLocal.push(productIn);
    }


  localStorage.setItem('productos', JSON.stringify(productsInLocal));
   
  
}

export const deleteProductLocalStorage = () => {

  if (!productoActivo) {
    console.error("No hay producto activo para eliminar");
    return; // Si no hay producto activo, salimos de la función
}
  let productsInLocal = getProductLocalStorage();


  const filterProducts = productsInLocal.filter(product => product.id !== productoActivo.id);

  // Actualizar el localStorage con la nueva lista de productos
  localStorage.setItem('productos', JSON.stringify(filterProducts));

   renderProducts();
}