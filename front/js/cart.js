// to differentiate the confirmation and basket page
const page = document.location.href;

  fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((index) => {
      console.log(index);
      displayBasket(index);
    })

let basket = JSON.parse(localStorage.getItem("basketStocked"));

// Function determines the conditions for displaying the products in the basket
function displayBasket(index) {
  // we get the converted basket
  // if there is a basket
  if (basket && basket.length > 0) {
    // value correspondence zone of the api and the basket thanks to the product id chosen in the localStorage
    for (let choice of basket) {
      console.log(basket);
      for (let i = 0, j = index.length; i < j; i++) {
        if (choice._id === index[i]._id) {
          // create and add values ​​to basket that will be used for dataset values
          choice.name = index[i].name;
          choice.image = index[i].imageUrl;
          choice.description = index[i].description;
          choice.alt = index[i].altTxt;
          var price = index[i].price;
        }
      }
    }
    console.log(price)
  } else {
    // information if there is no basket
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }

  let basketArea = document.querySelector("#cart__items");
  for (let choice of basket) {
    basketArea.innerHTML += `<article class="cart__item" data-id="${choice._id}" data-color="${choice.color}" data-quantity="${choice.quantity}" data-prix="${price}"> 
    <div class="cart__item__img">
      <img src="${choice.image}" alt="${choice.alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${choice.name}</h2>
        <span>color : ${choice.color}</span>
        <p data-prix="${price}">${price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choice.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${choice._id}" data-color="${choice.color}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
    // stay tuned with the following functions to change the display
    changeQuantity();
    delet();
    totalProduct()
  }
}
function changeQuantity() {
  //cible la carte de l'élement de chaque carte
  const cart = document.querySelectorAll(".cart__item");
  // pour chaque carte applique la fonction qui suit 
  cart.forEach(
    function (cart) {
      cart.addEventListener("change", test);
      function test(event) {
        // loop to modify the quantity of the product in the hamper thanks to the new value
        for (article of basket){
        console.log(article);
        console.log(cart);
        console.log(basket);
        if (article._id === cart.dataset.id && article.color === cart.dataset.color) {
          article.quantity = event.target.value;
          // we update the quantity dataset
          cart.dataset.quantity = event.target.value;
          localStorage.basketStocked = JSON.stringify(basket);
          // update data
          totalProduct();

          // ajouter dans local storage le snouvelles valeurs !! //
        }}
      };
    });
}
function delet() {
  const cartdelete = document.querySelectorAll(".cart__item .deleteItem");
  // for each cartdelete element
  cartdelete.forEach(
    function (cartdelete) {
      // We listen if there is a click in the article concerned
      cartdelete.addEventListener("click", del)
      function del() {
        // call the local storage resource
        let basket = JSON.parse(localStorage.basketStocked);
        console.log(basket);
        for (let i = 0, j = basket.length; i < j; i++)
          if (
            basket[i]._id === cartdelete.dataset.id && basket[i].color === cartdelete.dataset.color
          ) {
            // useful variable declaration for deletion
            const num = [i];
            let newbasket = JSON.parse(localStorage.basketStocked);
            //removal of 1 element at index num
            newbasket.splice(num, 1);
            // informative display
            if (newbasket && newbasket.length == 0) {
              document.querySelector("#totalQuantity").innerHTML = "0";
              document.querySelector("#totalPrice").innerHTML = "0";
              document.querySelector("h1").innerHTML =
                "Vous n'avez pas d'article dans votre basket";
            }
            // we return the new converted basket to the local storage and we play the function
            localStorage.basketStocked = JSON.stringify(newbasket);
            totalProduct();
            // we reload the page that is displayed without the product thanks to the new basket
            location.reload();
          }
      }
    })
}
function totalProduct() {
  let totalArticle = 0;
  let totalPrix = 0;
  const cart = document.querySelectorAll(".cart__item");
  // for each cart element
  cart.forEach(
    function (cart) {
      // we retrieve the quantities of the products thanks to the dataset
      totalArticle += JSON.parse(cart.dataset.quantity);
      // we created an operator for the total produced using the dataset
      totalPrix += cart.dataset.quantity * cart.dataset.prix;
    });
  // I point to the item number display location
  document.getElementById("totalQuantity").textContent = totalArticle;
  // I point to where the total price is displayed
  document.getElementById("totalPrice").textContent = totalPrix;
}
/////////////////////////////////////////////////// parte 2 Form //////////////////////////////////////////////////////////////////
// the customer's data will be stored in this table for the order on the cart page
var contactClient = {};
localStorage.contactClient = JSON.stringify(contactClient);
var firstName = document.querySelector("#firstName");
firstName.classList.add("regexLettre");
var lastName = document.querySelector("#lastName");
lastName.classList.add("regexLettre");
var city = document.querySelector("#city");
city.classList.add("regexLettre");
var adresse = document.querySelector("#address");
adresse.classList.add("regex_adresse");
var email = document.querySelector("#email");
email.classList.add("regex_email");

// modification of the type of the input type email to text because it does not comply with the regex
document.querySelector("#email").setAttribute("type", "text");

//regex 
let regexLettre = /^[a-z A-Z]+$/
let regexChiffreLettre = /^[a-z A-Z 0-9]+$/
let regValideEmail = /^[a-z A-Z @ . -_]+$/

// Listen and assign point (for click security) if these fields are ok according to the regex

// give a variable for all elements target whit regexLettre and name it regexTexte
var regexTexte = document.querySelectorAll(".regexLettre");

regexTexte.forEach(
  function regexTexte(regexTexte) {
    regexTexte.addEventListener("input", regexT)
    function regexT(e) {
      valeur = e.target.value;
      // regLettre will be the value of the regex response, 0 or -1
      var regNormal = valeur.search(regexLettre);
      if (regNormal === 0) {
        contactClient.firstName = firstName.value;
        contactClient.lastName = lastName.value;
        contactClient.city = city.value;
      }
      if (
        contactClient.city !== "" &&
        contactClient.lastName !== "" &&
        contactClient.firstName !== "" &&
        regNormal === 0
      ) {
        contactClient.regexNormal = 3;
      } else {
        contactClient.regexNormal = 0;
      }

      localStorage.contactClient = JSON.stringify(contactClient);
      colorRegex(regNormal, valeur, regexTexte);
      valideClic();
      console.log(contactClient.regexNormal);
    }
  })

// Listen and assign point (for click security) if these fields are ok according to the regex
var regexAdresse = document.querySelector(".regex_adresse");
regexAdresse.addEventListener("input", regexA)
function regexA(e) {
  valeur = e.target.value;
  // regLettre will be the value of the regex response, 0 or -1
  var regAdresse = valeur.search(regexChiffreLettre);
  if (regAdresse == 0) {
    contactClient.address = adresse.value;
  }
  if (contactClient.address !== "" && regAdresse === 0) {
    contactClient.regexAdresse = 1;
  } else {
    contactClient.regexAdresse = 0;
  }
  localStorage.contactClient = JSON.stringify(contactClient);
  colorRegex(regAdresse, valeur, regexAdresse);
  valideClic();
  console.log(contactClient.regAdresse);
};
var regexEmail = document.querySelector(".regex_email");

regexEmail.addEventListener("input", regexE)
function regexE(e) {
  valeur = e.target.value;
  //we see if text  in the input we write is conforme to regex law's we puted befor my address must have this form so that I can validate it
  // when the result is correct, the console log will display an answer other than null, regValide = 0 or -1
  let regValide = valeur.search(regValideEmail);
  if (regValide === 0 && regValide !== null) {
    contactClient.email = email.value;
    contactClient.regexEmail = 1;
  } else {
    contactClient.regexEmail = 0;
  }
  localStorage.contactClient = JSON.stringify(contactClient);
  colorRegex(regValide, valeur, regexEmail);
  valideClic();
  console.log(contactClient.regexEmail);
}
// colorRegex function that will modify the color of the input by typed padding, visual aid and accessibility
let listenValue = "";
// reusable 3-argument functions we use it's whit different name for differents html targets //
// colorRegex is a function we use for every input for the form //
function colorRegex(regSearch, listenValue, inputAction) {
  // if value is still an empty string and the regex differs from 0 (regex at -1 and the field is empty but no error)

  let commande = document.querySelector("#order");
    // if value is no longer an empty string and the regex differs from 0 (regex at -1 and the field is not 
    //empty so there is an error)
  if (listenValue !== "" && regSearch != 0) {
    inputAction.style.backgroundColor = "rgb(220, 50, 50)";
    inputAction.style.color = "white";
    commande.setAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Erreur de syntaxe !");
    // for the rest of the cases (when the regex detects no error and is 0 regardless of the field since it is validated by the regex)
  } else {
    inputAction.style.backgroundColor = "rgb(0, 138, 0)";
    inputAction.style.color = "white";
  }
}

////////////////////////////////////////Fonction of validation when push the form buton /////////////////////////////////////////////
let commande = document.querySelector("#order");
// la fonction sert à valider le clic de commande de manière interactive
function valideClic() {
  let contactRef = JSON.parse(localStorage.getItem("contactClient"));
  let somme =
    contactRef.regexNormal + contactRef.regexAdresse + contactRef.regexEmail;
  console.log(somme);
    if (somme === 5) {
    commande.removeAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Commander !");
  } else {
    commande.setAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Remplir le formulaire");
  }
}

// send basket
  commande.addEventListener("click",send );
    function send(e){
    // prevent reload of the page 
    e.preventDefault();
    valideClic();
    sendHamper();
  }

let id= localStorage.id 
console.log(id);
localStorage.id = JSON.stringify(id);

function sendHamper() {
  tableId();
  pack();
  console.log(lastOrder);
    // send to api resource
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lastOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        // sent to the confirmation page
        window.location.href = `/front/html/confirmation.html?commande=${id}`;
      })
  }
// function retrieves ids then put in an array
// definition of the hamper which will only include the ids of the products chosen from the local storage
let basketId = [];
function tableId() {
  // retrieve product ids from basketId
  if (basket && basket.length > 0) {
      basketId.push(basket._id);
  } else {
    console.log("le panier est vide");
  }
}
// function retrieving customer and hamper data before transformation
let lastOrder;
function pack() {
  contactRef = JSON.parse(localStorage.getItem("contactClient"));
  // definition of the command object
  lastOrder = {
    contact: {
      firstName: contactRef.firstName,
      lastName: contactRef.lastName,
      address: contactRef.address,
      city: contactRef.city,
      email: contactRef.email,
    },
    products: basketId,
  };
}