const fetch = require("node-fetch") //for quokka inline evaluation
fetch('https://api.bring.com/shippingguide/api/postalCode.json?clientUrl=www.google.com&pnr=5200')
  // promise returned from fetch OBS response er en HTTP objekt
  .then(function (response) {
    console.log(response.status)
    return response.json(); // The json() method returns a promise that resolves with the result of parsing the body of HTTP response  as JSON
  })
  //promise returned from json()
  .then((myJson) => {
    console.log(myJson)
  });

  