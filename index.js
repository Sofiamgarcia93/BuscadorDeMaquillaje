
/*
fetch("http://makeup-api.herokuapp.com/api/v1/products.json")
  .then((res) => {

    return res.json()
  })
  .then((data) => {
    console.log(data)

  crearTarjetaSerie(data)

    
  }) 

 PARTE DE LA TARJETA QUE INCLUIRIA EL PRECIO Y DESCRIPCION
  <p class="price">${curr.price}</p>
       <p class="description">${curr.description}</p>
*/
  

const endpointMakeUpPaginaPrincipal = "https://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=4";
const tarjeta = document.querySelector(".container-main");
const botonPrimeraPagina = document.querySelector("#boton-primera-pagina");
const botonPaginaAnterior = document.querySelector("#boton-pagina-anterior");
const botonProximaPagina = document.querySelector("#boton-proxima-pagina");
const botonUltimaPagina = document.querySelector ("#boton-ultima-pagina");
let indiceDePagina = 0;
let indiceMaxPagina = 0;
let arrayResultados = [];
let tamanoPagina = 12;

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

const dibujarPagina =(array) => {
  const html = array.reduce((acc, curr) => {
    return acc + `
    <div class="tarjeta">
    <div class="images">
            <img src="${curr.image_link}" />
          </div>
     <h1 class="product-title">${curr.name}</h2>
     </div>
     `
  }, "")
  tarjeta.innerHTML = html
}
botonPaginaAnterior.disabled = true;
botonProximaPagina.onclick = paginaSiguiente;
botonPaginaAnterior.onclick = paginaAnterior;
pedirInfo();

