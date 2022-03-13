const { SassColor } = require("sass");


  

const endpointMakeUpPaginaPrincipal = "https://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=4";
const seccionDeTarjetas = document.querySelector(".container-main");
// nunca usas esta variable
const botonPrimeraPagina = document.querySelector("#boton-primera-pagina");
const botonPaginaAnterior = document.querySelector("#boton-pagina-anterior");
const botonProximaPagina = document.querySelector("#boton-proxima-pagina");
// nunca usas esta variable
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
// todos los elementos del dom deben ir agrupados juntos
const formularioBusqueda = document.querySelector("#form-busqueda");
const inputBusqueda = document.querySelector("#busqueda");



/* FUNCIONES QUE CREAN EL PAGINADO */


const mostrarPagina = () => {    
  // bien!
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
  // mejor escribir indiceDePagina++
  indiceDePagina += 1;
  mostrarPagina();
}

const paginaAnterior = () =>{
  // mejor escribir indiceDePagina--
  indiceDePagina -= 1;
  mostrarPagina();
}

/* CREAR CADA CARD CON REDUCE */

const dibujarPagina = array => {
  seccionDeTarjetas.innerHTML = array.reduce((acc, curr) => {
    // A veces la api nos devuelve algunos resultados, como brand y product type, en null, y vemos ese null en tus tarjetas
    // Podemos hacer un ternario para evitarlo:
    // <p class="brand">${curr.brand ? curr.brand : "No disponible"}</p>
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

// todo este codigo se ejecuta apenas carga la pagina: es mejor ponerlo abajo de todo,
// luego de la declaracion de las funciones, asi el flujo de ejecucion es mas 
// facil de entender
botonPaginaAnterior.disabled = true;
botonProximaPagina.onclick = paginaSiguiente;
botonPaginaAnterior.onclick = paginaAnterior;
pedirInfo();


//SECCION BUSQUEDA

const buscarProductos = (busqueda) =>{
  fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${busqueda}`)
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


// falta un const aca 
crearVistaDetalleTarjeta = (objeto) =>{
  // esta mal el tabulado aca, dentro de la funcion hay que dejar dos espacios
  // el codigo deberia estar a la altura de mi comentario. 
seccionDeTarjetas.style.display = "none";
detalleDeTarjeta.style.display = "flex";

detalleDeTarjeta.innerHTML = 
`
${objeto}
`

}

/*

ASIGNAR CLICK A CADA TARJETA NO FUNCIONO ****falta arreglar*****

*/

const asignacionDeClickaCadaTj = () =>{
  
  const tarjetas = document.querySelectorAll(".tarjeta")
  
  for (let i = 0; i < tarjetas.length; i++) {
     
    tarjetas[i].onclick = () =>{
  
      const id = tarjetas[i].dataset.id
      // no dejes console log en una entrega
      console.log(id)

    
      const tarjetaClickeada = tarjetas.find((elemento) =>{
        return elemento.id === id
      })

      console.log(tarjetaClickeada)
      /*crearVistaDetalleTarjeta(tarjetaClickeada)*/

    }
    }
    
  }

  // no dejes estos saltos de linea al azar, dificultan la lectura de tu codigo








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

// muy repetitivo este codigo, podrias hacer una funcion que reciba el tipo de producto como parametro:

//  buscarPorCategoria = categoria => {
//   fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${categoria}`)
//   .then(res => res.json()
//   .then( data =>{
//     dibujarPagina(data)
//   })
//   )

//   sacarPonerClaseOcultarACategorias();
// }

// y despues llamarla en cada click de los botones:
// categoriaBlush.onclick = () => buscarPorCategoria("blush")
// categoriaEyebrow.onclick = () => buscarPorCategoria("eyebrow")
// etc...

categoriaBlush.onclick = () =>{
  fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )

  sacarPonerClaseOcultarACategorias();
}

categoriaEyebrow.onclick = () =>{
  fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyebrow`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )
  sacarPonerClaseOcultarACategorias();
}

categoriaEyeliner.onclick = () =>{
  fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )
  sacarPonerClaseOcultarACategorias();
}


categoriaEyeshadow.onclick = () =>{
  fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeshadow`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )
  sacarPonerClaseOcultarACategorias();
}


categoriaLipLiner.onclick = () =>{
  fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=lip_liner`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )
  sacarPonerClaseOcultarACategorias();
}

categoriaLipstick.onclick = () =>{
  fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )
  sacarPonerClaseOcultarACategorias();
}

categoriaMascara.onclick = () =>{
  fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=mascara`)
  .then(res => res.json()
  .then( data =>{
    dibujarPagina(data)
  })
  )
  sacarPonerClaseOcultarACategorias();
}