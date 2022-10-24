class Producto{
    constructor(nombre, imagen, marca, estado, almacenamiento, color, link){
        this.nombre = nombre;
        this.imagen = imagen;
        this.marca = marca;
        this.estado = estado;
        this.almacenamiento = almacenamiento; 
        this.color = color;
        this.link = link;
    }
}

const producto1 = new Producto("iPhone 13", "./img/iphone-13.jpg", "Apple", "Nuevo","64GB","Blanco", "https://www.youtube.com/watch?v=I0mdHOEXcuU");
const producto2 = new Producto("AirPods Pro", "./img/airpods-pro.jpg", "Apple", "Usado","N/A","Blanco", "https://www.youtube.com/watch?v=U-Hy38n6Jj4");
const producto3 = new Producto("MacBook Pro", "./img/macbook-pro.jpg", "Apple", "Reacondicionada","128GB","Gris", "https://www.youtube.com/watch?v=2fPC-58LK4A");

const productos = []

productos.push(producto1);
productos.push(producto2);
productos.push(producto3);


function mostrarDetalle(producto){

    const contenedorProductos = document.getElementById("contenedor-productos");

    contenedorProductos.innerHTML = "";

    contenedorProductos.innerHTML = `
        <img src= "${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>Marca: ${producto.marca}</p>
        <p>Estado: ${producto.estado}</p>
        <p>Almacenamiento: ${producto.almacenamiento}</p>
        <p>Color: ${producto.color}</p>
        <a href= "${producto.link}">Ver Review</a>
        `;        
}

function crearBotonVerDetalle(producto){
    const button = document.createElement("button");
    button.innerText = "Ver detalle";
    button.addEventListener("click",() => {
        mostrarDetalle(producto);
        crearBotonVolver();
    })
    return button;
}

function crearBotonVolver(){
    const botonVolver = document.createElement("button");
    botonVolver.classList.add("boton-volver");
    botonVolver.innerText = "Atras";
    botonVolver.addEventListener("click",()=>{
        mostrarProductos(productos);
    })

    document.getElementById("contenedor-productos").prepend(botonVolver);
}

function mostrarProductos(productos){
    const contenedorProductos = document.getElementById("contenedor-productos");
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("producto");
        divProducto.innerHTML = `
        <img src= "${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>Marca: ${producto.marca}</p>
        <p>Estado: ${producto.estado}</p>
        <p>Almacenamiento: ${producto.almacenamiento}</p>
        <p>Color: ${producto.color}</p>
        <a href= "${producto.link}">Ver Review</a>
        `;  

        const botonVerDetalle = crearBotonVerDetalle(producto)
        divProducto.appendChild(botonVerDetalle);

        contenedorProductos.appendChild(divProducto);
    })
}

 mostrarProductos(productos);
