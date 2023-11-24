var numCom = new URLSearchParams(document.location.search).get("commande")
console.log(numCom)

// function display of the order number and empty storage when on the confirmation page

// value of the order number
document.querySelector("#orderId").innerHTML = `<br>${numCom}<br>Merci pour votre achat`;
console.log("valeur de l'orderId venant de l'url: " + numCom);

sessionStorage.clear();
localStorage.clear();