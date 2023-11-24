// get products of API
fetch("http://localhost:3000/api/products")
  // data of API in json
  .then((res) => res.json())
  //* @param {API} make a function white API data
  .then((allproduct) => {
    productsVisualisation(allproduct);
  })
//* @param {HTML Element} get html target on #items 
let articleArea = document.getElementById("items");

//* @param {HTML Element} add API data in article text 
function productsVisualisation(allproduct) {
  for (let productElm of allproduct) {
    articleArea.innerHTML += `<a href="./product.html?_id=${productElm._id}">
    <article>
      <img src="${productElm.imageUrl}" alt="${productElm.altTxt}">
      <h3 class="productName">${productElm.name}</h3>
      <p class="productDescription">${productElm.description}</p>
    </article>
  </a>`;
  }
}