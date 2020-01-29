const express = require('express')
const app = express()
const port = 3000
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))







