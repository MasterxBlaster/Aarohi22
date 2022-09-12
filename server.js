const express = require('express')
const app = express();
const path = require('path')

app.set('view engine', 'ejs')
app.use('static', express.static(path.join(__dirname, 'views')))
app.use(express.static('public'))

app.use('/',require('./routes/home/home.js'))

try {
    app.listen(3000,()=>{
        console.log("Aarohi Server Fired ✨");
    })
} catch (error) {
    console.log(error.message)
}
