//* @param {URL} searchURL for current page
const params = new URLSearchParams(document.location.search);
//* @param {id} IdName selection's of params
const id = params.get("_id");
localStorage.id = JSON.stringify(id);

// get products of API
fetch("http://localhost:3000/api/products/" + id)
  // data of API in json
  .then((res) => res.json())
  //* @param {function} API
  .then((product) => { getProductsData(product)})


// api product display function
function getProductsData(product) {
  console.log(product)
  // déclaration des variables pointage des éléments
  let imageAlt = document.querySelector("article div.item__img");
  let title = document.querySelector("#title");
  let price = document.querySelector("#price");
  let description = document.querySelector("#description");
  let colorOption = document.querySelector("#colors");

  imageAlt.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  title.textContent = `${product.name}`;
  price.textContent = `${product.price}`;
  description.textContent = `${product.description}`;
  for (let color of product.colors) {
    // loop to find the colors for each product based on its value
    colorOption.innerHTML += `<option value="${color}">${color}</option>`;
  }
  console.log("affichage effectué");
}
 
// Create itemCustomer object
let itemCustomer = {};
itemCustomer._id = id;
//-------------------------------------------------------------------------------------------------------------------------
// dynamic color choice
let choiceColor = document.querySelector("#colors");
// We listen to what is happening in #colors
choiceColor.addEventListener("input", colorChoice ) 

function colorChoice (ec){
  let colorProduit;
  // retrieve the value of the event target in productColor
  colorProduit = ec.target.value;
  // we add the color to the customerbasket object
  itemCustomer.color = colorProduit;
};
// choice quantity dynamique
// definition of variables
let choicequantity = document.querySelector("#quantity");
let quantityProduct;
// We listen to what is happening in #quantity
choicequantity.addEventListener("input", choiceQ)

function choiceQ (eq) {
  // retrieve the value of the event target in quantityProduct
  quantityProduct = eq.target.value;
  // we add the color to the customerbasket object
  itemCustomer.quantity = quantityProduct;}
//-------------------------------------------------------------------------------------------------------------------------
// conditions for validating the click via the add to cart button
// definition of variables
let productChoice = document.querySelector("#addToCart");
// We listen to what is happening in #addToCart 
productChoice.addEventListener("click", productCh ) 

function productCh () {
  //terms
  if (
    itemCustomer.quantity < 1 ||
    itemCustomer.quantity > 100 ||
    itemCustomer.quantity === undefined ||
    itemCustomer.color === "" ||
    itemCustomer.color === undefined
  ) {
    alert("Pour valider le produit de cet article, veuillez renseigner une color, et/ou une quantity valide entre 1 et 100");
    // if terms is true we play alert
  } else {
    basket();
  }
};
// create new aray when one commande is valided 
let productChoiceClient = [];
// array declaration for item/color choice not made therefore not present in the Stored basket
let temporaryProducts = [];
// basket function adjust the quantity if the product is already in the table, 
// otherwise add product in table
// or create the table
function basket() {
  // what we get from local storage and convert to JSon
  const registredProducts = JSON.parse(localStorage.getItem("basketStocked"));
  // if Registered products exists
  console.log(registredProducts);
  if (registredProducts) {
    for (let choice of registredProducts) {
      console.log(choice);
      // equality comparator of the currently chosen items and those already chosen
      if (choice._id === id && choice.color === itemCustomer.color) {
        alert("RAPPEL: Vous aviez déja choisit cet article.");
        //additionQuantity = old parsed quantity + the new parsed for the same product
        let additionquantity = parseInt(choice.quantity) + parseInt(quantityProduct);
        choice.quantity = JSON.stringify(additionquantity);
        //returns a new cartStored in localStorage
        return (localStorage.basketStocked = JSON.stringify(registredProducts));
      }
    }
  }
  //registeredproducts null means it has not been created
  if (registredProducts === null) {
    // push the chosed product in productChoiceClient
    productChoiceClient.push(itemCustomer);
    //returns a choiceProduitClient in localStorage 
    (localStorage.basketStocked = JSON.stringify(productChoiceClient));
  } else {
    // call function addOtherProduct if the loop above returns nothing
    pushProducts = [];
    // pushes the chosen product into temporaryProducts
    temporaryProducts.push(itemCustomer);
    // combine TemporaryProducts in RegisteredProducts
    pushProducts = [...registredProducts, ...temporaryProducts];
    // empty temporaryProducts now that it has been used
    temporaryProducts = [];
    (localStorage.basketStocked = JSON.stringify(pushProducts));
  }
}