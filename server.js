// ------------------------APP PACAKAGES-----------------------------------//
const express = require('express')
const app = express();
const path = require('path');
const connectDB = require('./services/db');
require('dotenv').config()
// ------------------------ END APP PAKAGES -----------------------------------//

////-----------------
connectDB()
//-----------------

// ------------------------APP SET UPS-----------------------------------//
app.set('view engine', 'ejs')
// -------------------------END APP SET UPS-----------------------------------------//

// ------------------------APP USE UPS-----------------------------------//
app.use(express.urlencoded({
    extended: true
  })) // Parse URL-encoded html

app.use(express.json()) //Alternate To Body Parser

app.use('static', express.static(path.join(__dirname, 'views')))
app.use(express.static('public'))
// ------------------------END APP USE UPS-----------------------------------//


// ------------------------APP ROUTES-----------------------------------//

app.use('/signup',require('./routes/auth'))

// ------------------------END APP ROUTES -----------------------------------//




// ------------------------SERVER CONFIGURATION-----------------------------------//
const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
      `Successfully running server in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('Hello unhandled promise here!')
  console.log(`Error: ${err.message}`)
  // Close server & exit process
  server.close(() => process.exit(1))
})
// ------------------------END SERVER CONFIGURATION-----------------------------------//