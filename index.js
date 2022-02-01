

  

const endpointMakeUpPaginaPrincipal = "https://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=4";
const seccionDeTarjetas = document.querySelector(".container-main");
const botonPrimeraPagina = document.querySelector("#boton-primera-pagina");
const botonPaginaAnterior = document.querySelector("#boton-pagina-anterior");
const botonProximaPagina = document.querySelector("#boton-proxima-pagina");
const botonUltimaPagina = document.querySelector ("#boton-ultima-pagina");
const botonCategoriaHeader = document.querySelector(".categoria-header");
const categoriasDelHeader = document.querySelector("#categorias-header-container");
const botonMarcaHeader = document.querySelector(".marca-header");
const detalleDeTarjeta = document.querySelector("#seccion-detalle-tarjeta");
const categoriaBlush = document.querySelector("#blush");
const categoriaEyebrow = document.querySelector("#eyebrow");
const categoriaEyeliner = document.querySelector("#eyeliner");
const categoriaEyeshadow = document.querySelector("#eyeshadow");
const categoriaLipLiner = document.querySelector("#lip-liner");
const categoriaLipstick = document.querySelector("#lipstick");
const categoriaMascara = document.querySelector("#mascara");

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
     <p class="product-type">${curr.product_type}</p>
       <p class="brand">${curr.brand}</p>
     
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
 
}

crearVistaDetalleTarjeta = (objeto) =>{
seccionDeTarjetas.style.display = "none";
detalleDeTarjeta.style.display = "flex";

detalleDeTarjeta.innerHTML = 
`
${objeto}
`

}

/*

ASIGNAR CLICK A CADA TARJETA


*/


const asignacionDeClickaCadaTj = () =>{
  
  const tarjetas = document.querySelectorAll(".tarjeta")
  for (let i = 0; i < tarjetas.length; i++) {
    
    tarjetas[i].onclick = () =>{
  
      const id = tarjetas[i].dataset.id
      console.log(tarjetas[i])
      buscarProductoPorId(id)
      crearVistaDetalleTarjeta(tarjetas[i])
      
    }
    
  }
}






// OCULTAR Y MOSTRAR CATEGORIAS Y MARCAS DEL HEADER




const sacarPonerClaseOcultarACategorias = () => {

  categoriasDelHeader.classList.toggle("ocultar");
  

}

const volverAPagPrincipal = () => {

  mostrarPagina();
  pedirInfo();
  dibujarPagina();
  
 
}


botonCategoriaHeader.onclick = sacarPonerClaseOcultarACategorias;
botonMarcaHeader.onclick = volverAPagPrincipal;


//CATGORIAS DEL HEADER


categoriaBlush.onclick = () =>{
  fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )

}

categoriaEyebrow.onclick = () =>{
  fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyebrow`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )

}

categoriaEyeliner.onclick = () =>{
  fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )

}


categoriaEyeshadow.onclick = () =>{
  fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeshadow`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )

}


categoriaLipLiner.onclick = () =>{
  fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lip_liner`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )

}

categoriaLipstick.onclick = () =>{
  fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )

}

categoriaMascara.onclick = () =>{
  fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=mascara`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )

}