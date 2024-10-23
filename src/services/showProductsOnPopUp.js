import { setProductoActivo } from "../../main";


export const showProductsPopUp = (producto) =>{
    setProductoActivo(producto); // Asegúrate de que esto esté aquí
    const containerPopUp = document.getElementById("container-popUp")

    document.getElementById('input-nombre').value = producto.nombre;
    document.getElementById('input-precio').value = producto.precio;
    document.getElementById('file').value = producto.imgURL;
    document.getElementById('categories').value = producto.categoria;


    containerPopUp.style.display = 'flex';

}