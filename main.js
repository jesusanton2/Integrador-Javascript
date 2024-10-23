import { renderCategories } from "./src/services/categories";
import { deleteProductLocalStorage, getProductLocalStorage, saveProductosLocalStorage } from "./src/services/localStorage";
import { renderProducts } from "./src/services/products";
import './style.css';

renderCategories();
renderProducts(); 

const containerPopup = document.getElementById("container-popUp");

window.addEventListener('click', (event) => {
  if (event.target === containerPopup) {
      containerPopUp.style.display = 'none';
  }
});


const btnDelete = document.getElementById('delete-btn');
 
btnDelete.addEventListener('click', () => {
  deleteProductLocalStorage();
})

const btnSave = document.getElementById('submit-btn');

  btnSave.addEventListener('click', () => {
    
    handleSaveOrModifyProducts();  
  
  });


export let productoActivo = null;

export const setProductoActivo = (productoIn) =>{
   productoActivo = productoIn;
}


const handleSaveOrModifyProducts = () =>{
  const nombre = document.getElementById('input-nombre').value ;
  const precio = document.getElementById('input-precio').value ;
  const imgURL = document.getElementById('file').value ;
  const categoria = document.getElementById('categories').value ;
 let producto = null;

 if(productoActivo){
   producto = {
    ...productoActivo,
   
      nombre: nombre,
      precio: parseFloat(precio), 
      imgURL: imgURL,
      categoria: categoria
    
   }
 }else {
   producto = {
    id: new Date().toISOString(),
    nombre: nombre,
    precio: parseFloat(precio), 
    imgURL: imgURL,
    categoria: categoria
  }
 }


if(nombre && precio && imgURL && categoria){ 
 saveProductosLocalStorage(producto);
 const popup = document.getElementById('popup-save');
  popup.classList.remove('popup-hidden');
  popup.classList.add('popup-visible');

 renderProducts(); 
 console.log("Producto Guardado", producto)
}else{
  console.error("Todos los campos deben estar llenos")
}  
 
}


/* PopUp */

  const btnOpenPopup = document.getElementById("btn-open-popup");
  btnOpenPopup.addEventListener('click', () => {
    containerPopup.style.display = 'flex';
  })


  const btnClosePopup = document.getElementById("btn-close-popup");
  btnClosePopup.addEventListener('click', (e) =>{
    e.preventDefault();
    containerPopup.style.display ='none';
    resetPopUp();
  })


 const resetPopUp = () =>{
  
const nombre = document.getElementById('input-nombre')  ;
const precio = document.getElementById('input-precio') ;
const imgURL = document.getElementById('file') ;
const categoria = document.getElementById('categories') ;
    
  nombre.value = "";
  precio.value = 0;
  imgURL.value = "";
  categoria.value = "Seleccione una categoria";
}  



const btnSearch = document.getElementById('btn-search');

btnSearch.addEventListener('click', () => {
  const searchTerm = document.getElementById('input-header').value.toLowerCase(); // Obtener el valor del input y convertir a minúsculas
  const productos = getProductLocalStorage(); // Obtener todos los productos
  const filteredProducts = productos.filter(producto => 
    producto.nombre.toLowerCase().includes(searchTerm) // Filtrar por nombre
  );

  renderProducts(filteredProducts); // Renderizar los productos filtrados
});


const inputHeader = document.getElementById('input-header');

inputHeader.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    btnSearch.click(); // Simula un clic en el botón de búsqueda
  }
});