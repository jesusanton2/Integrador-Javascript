export const renderCategories = () => {
    let ulList = document.getElementById("listNav");
    
    const categories = [
        { id: "Todo", text: "Todos los productos" },
        { id: "Hamburguesas", text: "Hamburguesas" },
        { id: "Papas", text: "Papas" },
        { id: "Gaseosas", text: "Gaseosas" },
        { id: "mayorPrecio", text: "Mayor Precio" },
        { id: "menorPrecio", text: "Menor Precio" }
    ];

    // Función que determina si debe mostrar un select o una lista
    const updateMenu = () => {
        const isMobile = window.innerWidth < 768;
        
        const existingSelect = document.getElementById("categoria-select");
        const existingUl = document.getElementById("listNav");

        if (isMobile && !existingSelect) {
            // Ocultar el `ul` antes de reemplazarlo
            if (existingUl) {
                existingUl.style.display = "none";
            }
            
            // Crear y agregar el `select`
            const select = document.createElement('select');
            select.id = "categoria-select";

            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.text;
                select.appendChild(option);
            });

            existingUl?.replaceWith(select);  // Reemplazar la lista por el select

            select.addEventListener('change', (event) => {
                const selectedCategory = event.target.value;
                filterProductsByCategory(selectedCategory);
            });
        } else if (!isMobile && !existingUl) {
            // Ocultar el `select` antes de reemplazarlo
            if (existingSelect) {
                existingSelect.style.display = "none";
            }

            // Crear y agregar el `ul`
            const newUlList = document.createElement('ul');
            newUlList.id = 'listNav';
            newUlList.classList.add("nav-menu");

            categories.forEach(category => {
                const li = document.createElement('li');
                li.id = category.id;
                li.textContent = category.text;
                newUlList.appendChild(li);
            });

            existingSelect?.replaceWith(newUlList);  // Reemplazar el select por la lista

            newUlList.addEventListener('click', (event) => {
                if (event.target.tagName === 'LI') {
                    if (event.target.classList.contains('liActive')) {
                        event.target.classList.remove('liActive');
                    } else {
                        document.querySelectorAll('.nav-menu li').forEach(li => li.classList.remove('liActive'));
                        event.target.classList.add('liActive');
                    }
                    filterProductsByCategory(event.target.id);
                }
            });
        }
    };

    // Ejecutar la función al cargar
    updateMenu();

    // Añadir un listener para manejar el redimensionamiento
    window.addEventListener('resize', updateMenu);
};
