Swal.fire({
    title: '<b class="alert">Bienvenido!</b>',
	text: 'Selecciona tu país',
    confirmButtonText:'Seleccionar',
    backdrop:true, 
    allowEscapeKey: true,
    allowOutsideClick: false,

    input:'select',
    inputPlaceHolder:'Pais',
    inputOptions: {
        argentina: 'Argentina',
        chile: 'Chile',
        uruguay: 'Uruguay',
        espana: 'España',
    }

})

//Variables iniciales
let carritoArray = [];
let total = 0;
let productContainer = document.querySelector('.shop-items');
let totalElement = document.querySelector('.cart-total-title');
let inputNumber = document.querySelectorAll('.cart-quantity-value');



//Peticion de productos a la API
let res = await fetch('https://api.escuelajs.co/api/v1/products')
let data = await res.json()

//Limito la cantidad de productos
let productsArray = data.slice(2,14)

//Imprimo productos en pantalla
productsArray.forEach(product =>{
    productContainer.innerHTML += `
        <div class="shop-item" id="${product.id}">
            <span class="shop-item-title">${product.title}</span>
            <img class="shop-item-image" src="${product.images[0]}">
            <div class="shop-item-details">
                <span class="shop-item-price">$${product.price}</span>
                <button class="btn btn-primary shop-item-button" type="button">AGREGAR AL CARRITO<i class="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
    `
});


//Escuchador boton carrito
let agregarBoton = document.querySelectorAll('.shop-item-button');

agregarBoton = [...agregarBoton]; //nodelist 

let containerCarrito = document.querySelector('.cart-items');

agregarBoton.forEach(btn=>{
    btn.addEventListener('click',event=>{

        //AGREGAR PRODUCTOS AL CARRITO

        //Buscar ID del producto

        let actualID = parseInt(event.target.parentNode.parentNode.id);
        console.log(actualID);

        //Con el ID encntrar el objeto actual
       
        let actualProduct = productsArray.find(item => item.id == actualID)
        if(actualProduct.quantity === undefined){
            actualProduct.quantity = 1;
        }

        let existe = false
        //Acumular productos iguales 
        carritoArray.forEach(productos =>{
            if(actualID == productos.id){
                existe = true
            }
        })

           if (existe){
            actualProduct.quantity++
           }else{
            carritoArray.push(actualProduct)
           }

           
        console.log(carritoArray)
        
        drawItems()
        //Actualizar valor total
        getTotal()

        updateNumberOfItems()

        removeItems()

    })
})

function getTotal(){
    let sumaTotal
    let total = carritoArray.reduce( (sum,item)=>{
        sumaTotal = sum + item.quantity*item.price
        return sumaTotal
    } , 0);
    totalElement.innerText = `$${total}`
}


function drawItems(){
    containerCarrito.innerHTML = '';
        // Dibujar en el DOM el array de carrito actualizado
        carritoArray.forEach(item => {
            
            containerCarrito.innerHTML += `
            <div class="cart-row">
                        <div class="cart-item cart-column">
                            <img class="cart-item-image" src="${item.images[0]}" width="100" height="100">
                            <span class="cart-item-title">${item.title}</span>
                        </div>
                        <span class="cart-price cart-column">$${item.price}</span>
                        <div class="cart-quantity cart-column">
                            <input class="cart-quantity-input" min="1" type="number" value="${item.quantity}">
                            <button class="btn btn-danger" type="button">ELIMINAR</button>
                        </div>
                    </div>
            `
        });
}

function updateNumberOfItems(){
    let inputNumber = document.querySelectorAll('.cart-quantity-input');
    inputNumber = [...inputNumber];
    
    inputNumber.forEach(item => {
        item.addEventListener('click', event=>{
            let actualProductTitle = event.target.parentElement.parentElement.childNodes[1].innerText
            let actualProductQuantity = parseInt(event.target.value);

            console.log(actualProductQuantity)
            let actualProductObject = carritoArray.find(item=> item.title == actualProductTitle)

            actualProductObject.quantity = actualProductQuantity;

            getTotal()
        })
    })
}

function removeItems(){
    let removeBtns = document.querySelectorAll('.btn-danger');
    removeBtns = [...removeBtns];

    removeBtns.forEach(btn=>{
        //Consigo el titulo del producto
        btn.addEventListener('click',(event)=>{
            let actualProductTitle = event.target.parentElement.parentElement.childNodes[1].innerText;

            //Busco el objeto con ese titulo
            let actualProductObject = carritoArray.find(item=> item.title == actualProductTitle)

            //Remover el array de productos del carrito
            carritoArray = carritoArray.filter(item => item != actualProductObject)

            Swal.fire({
                title: '<b class="alert"> Producto eliminado </b>',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
            
            drawItems()
            getTotal()
            updateNumberOfItems()
            
        });
    })

    function botonComprar(){
        let botonComprar = document.querySelector('.btn-purchase');

        botonComprar.addEventListener('click',()=>{
            Swal.fire({
                title: 'Producto agregado exitosamente',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        })
    }
}

