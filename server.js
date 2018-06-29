//gives network access - enables ability to handle all http methods
const http = require('http');
//file access
const fs = require('fs')
//url access
const url = require('url');
//access to pull something from url
let querystring = require('querystring');
//weird writing
const figlet = require('figlet')

//server creation
const server = http.createServer(function(req, res) {
  //parsing url and storing it as a variable
  const page = url.parse(req.url).pathname;
  //checking for API query parameters that were sent with the url
  let params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  //conditionals checking what the request url was homepage
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });//conditionals checking what the request url was "otherpage.html"
  }else if (page == '/api') {
    //check if restaurant query string was a parameter
    if('restaurant' in params){
      let restaurant = decodeURI(params['restaurant'])
      //check what the restaurant query string equaled
      if(restaurant == 'Banyan'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        var objToJson = {
          name: "Banyan",
          location: "Location: 553 TREMONT ST. BOSTON, MA",
          price: "Price: $25.00",
          dish: "Dish: SHAKING BEEF",
          ingredients: "beef tenderloin | radicchio | lime | black pepper"
        }
        res.end(JSON.stringify(objToJson));
      }
      else if(restaurant == 'Mezzana'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        var objToJson = {
          name: "Bar Mezzana",
          location: "Location: 360 Harrison Ave. Boston MA 02118",
          price: "Price: $32.00",
          dish: "Dish: Paccheri",
          ingredients: "lobster | green onion | tomato"

        }
        res.end(JSON.stringify(objToJson));
      }
      else if(restaurant == 'BG Oysters'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        var objToJson = {
          name: "B&G Oysters",
          location: "Location: 550 Tremont Street Boston, MA 02116",
          price: "Price: $32.00",
          dish: "Dish: Crispy Whole Branzino",
          ingredients: "Fennel | Citrus salad | Sauce caramello"
        }
        res.end(JSON.stringify(objToJson));
      }
      else if(restaurant == 'AH'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        var objToJson = {
          name: "Alden & Harlow",
          location: "Location: 40 Brattle St, Cambridge, MA 02138",
          price: "Price: $44.00",
          dish: "Dish: Creekstone Farms New York Strip",
          ingredients: "Smoked Cherry Salsina | Turnip Butter | Grilled Carrots"
        }
        res.end(JSON.stringify(objToJson));
      }
      else if(restaurant == 'Bancroft'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        var objToJson = {
          name: "The Bancroft",
          location: "Location: 15 Third Ave. Burlington, MA 01803",
          price: "Price: $26.00",
          dish: "Dish: Giannone Farm Brick Chicken",
          ingredients: "Coconut Carrot Flan | French Lentils"
        }
        res.end(JSON.stringify(objToJson));
      }
    }//makes it so the server knows where to fetch css
  }else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });//makes it so the server knows where to fetch js
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      //res.writeHead isn't mandatory but nice to include
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });

  }else{
    figlet('404!', function(err, data) {
      if (err) {
        console.log('Not a place');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
