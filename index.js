// Load .env file
require('dotenv').config();

// Load required libraries from node_modules
const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')

// Configure the environment
const PORT = parseInt(process.env.PORT) || 3000

// Create an instance of the express application
const app = express()

// Configure handlebars to manage views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

// Configure the static files
app.use(express.static(__dirname + '/static'))


// Prefix match
app.get(['/', '/index.html'], (req, res) => {
  const cart = []
  // cart.push(localStorage.getItem('currentCart'))
  res.status(200)
  res.type('text/html')
  res.render('index', { cartState: JSON.stringify(cart) })
})


app.post(['/', '/index.html'],
    express.urlencoded({ extended: true }),
    (req, res) => {
    const cart = JSON.parse(req.body.cartState)
    // const cart = JSON.parse(req.body.shoppingList)
    cart.push({
      item: req.body.item.toLowerCase(),
      quantity: parseInt(req.body.quantity, 10),
      unitPrice: parseFloat(req.body.unitprice)
    })
    console.log(cart)

    res.status(201)
    res.type('text/html')
    res.render('index', {
      cart: cart,
      cartState: JSON.stringify(cart)
    })
})

// Start express
app.listen(PORT, () => { // first parameter = port number
  console.log(`Application started on port ${PORT} at ${new Date()}`)
})
