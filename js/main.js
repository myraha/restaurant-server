document.querySelector('select[name="restaurantSelector"]').onchange = makeReq;

function makeReq(){
  let reqName = document.getElementsByClassName("rest")[0].value;

  let request = new XMLHttpRequest();
  request.open('GET', '/api?restaurant='+ reqName, true);

  request.onload = function() {
      console.log("works")
      if (request.status >= 200 && request.status < 400) {
        // Success!
        //parse the object that came back ad store it in data
        var data = JSON.parse(request.responseText);
        console.log(data)
        document.getElementById("restaurant").innerHTML = data.name
        document.getElementById("local").innerHTML = data.location
        document.getElementById("dish").innerHTML = data.dish
        document.getElementById("price").innerHTML = data.price
        document.getElementById("ing").innerHTML = data.ingredients
        // We reached our target server, but it returned an error
      }else{


      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.log('er')
    };

    request.send();
}
