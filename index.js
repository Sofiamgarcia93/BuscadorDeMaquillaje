
/*
 PARTE DE LA TARJETA QUE INCLUIRIA EL PRECIO Y DESCRIPCION
  <p class="price">${curr.price}</p>
       <p class="description">${curr.description}</p>
*/
  

const endpointMakeUpPaginaPrincipal = "https://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=4";
const seccionDeTarjetas = document.querySelector(".container-main");
const botonPrimeraPagina = document.querySelector("#boton-primera-pagina");
const botonPaginaAnterior = document.querySelector("#boton-pagina-anterior");
const botonProximaPagina = document.querySelector("#boton-proxima-pagina");
const botonUltimaPagina = document.querySelector ("#boton-ultima-pagina");
const botonCategoriaHeader = document.querySelector(".categoria-header");
const categoriasDelHeader = document.querySelector("#categorias-header-container");
const botonMarcaHeader = document.querySelector(".marca-header");
const marcasDelHeader = document.querySelector("#marcas-header-container");
let indiceDePagina = 0;
let indiceMaxPagina = 0;
let arrayResultados = [];
let tamanoPagina = 12;
const formularioBusqueda = document.querySelector("#form-busqueda");
const inputBusqueda = document.querySelector("#busqueda");



/* FUNCIONES QUE CREAN EL PAGINADO */


const mostrarPagina = () => {    
  botonPaginaAnterior.disabled = (indiceDePagina == 0);
  botonProximaPagina.disabled = (indiceDePagina == Math.trunc(indiceMaxPagina));
  let limiteInferior = indiceDePagina * tamanoPagina;
  let limiteSuperior = limiteInferior + tamanoPagina;
  dibujarPagina(arrayResultados.slice(limiteInferior, limiteSuperior));
}

const pedirInfo = () =>{
  fetch(endpointMakeUpPaginaPrincipal)
  .then((res)=> res.json())
  .then((data) =>{
    arrayResultados = data;
    indiceMaxPagina = (data.length / tamanoPagina) - 1;
    mostrarPagina();
  })
}

const paginaSiguiente = () =>{
  indiceDePagina += 1;
  mostrarPagina();
}

const paginaAnterior = () =>{
  indiceDePagina -= 1;
  mostrarPagina();
}

/* CREAR CADA CARD CON REDUCE */

const dibujarPagina = array => {
  seccionDeTarjetas.innerHTML = array.reduce((acc, curr) => {
    return acc + `
    <article class="tarjeta" data-id="${curr.id}">
    <div class="images">
            <img src="${curr.image_link}" />
          </div>
     <h1 class="product-title">${curr.name}</h2>
     
     </article>
     `
  }, "")
  asignacionDeClickaCadaTj();
}
botonPaginaAnterior.disabled = true;
botonProximaPagina.onclick = paginaSiguiente;
botonPaginaAnterior.onclick = paginaAnterior;
pedirInfo();


//SECCION BUSQUEDA

const buscarProductos = (busqueda) =>{
  fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${busqueda}`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )
}



formularioBusqueda.onsubmit = (e) =>{
  e.preventDefault();
  buscarProductos(inputBusqueda.value);
}

/*********
 * BUSCAR PRODUCTOS POR ID
 */
 const buscarProductoPorId = (id) => {
   console.log(id)
  fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=4&id=${id}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
}

/*

ASIGNAR CLICK A CADA TARJETA


*/
const asignacionDeClickaCadaTj = () =>{
  const tarjetas = document.querySelectorAll(".tarjeta")

  for (let i = 0; i < tarjetas.length; i++) {
    tarjetas[i].onclick = () =>{
      console.log("me hicieron click")
      const id = tarjetas[i].dataset.id
      buscarProductoPorId(id)
      
    }
    
  }
}






// OCULTAR Y MOSTRAR CATEGORIAS Y MARCAS DEL HEADER


const sacarPonerClaseOcultarACategorias = () => {

  categoriasDelHeader.classList.toggle("ocultar");
  

}

const sacarPonerClaseOcultarAMarcas = () => {

  
  marcasDelHeader.classList.toggle("ocultar");
}


botonCategoriaHeader.onclick = sacarPonerClaseOcultarACategorias;
botonMarcaHeader.onclick = sacarPonerClaseOcultarAMarcas
