
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

  

  const crearTarjetaPaginaPrincipal = (array) => {
    const html = array.slice(0,12).reduce((acc, curr) => {
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
  
  const pedirInfo = () =>{
    fetch(endpointMakeUpPaginaPrincipal)
    .then((res)=> res.json())
    .then((data) =>{
        crearTarjetaPaginaPrincipal(data);
    })
  
}
pedirInfo();

