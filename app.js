var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require("axios");
const { returnDataApi, returnDataApiProduct } = require('./Logic');
var cors = require('cors')

var app = express();

app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/findResults', async function(req, res, next) {
  const getDataApi = await axios.get("https://api.mercadolibre.com/sites/MLA/search?q="+ req.query.search);
  const dataSlice = getDataApi.data.results.slice(0 ,4)
  const formatData = await returnDataApi(dataSlice)
  res.send(formatData)
});


app.get('/findProduct', async function(req, res, next) {
  try{
    const getDataApi = await axios.get("https://api.mercadolibre.com/items/"+ req.query.id);
    const getDataApiDescription = await axios.get("https://api.mercadolibre.com/items/"+ req.query.id+"/description");
    const formatData = await returnDataApiProduct(getDataApi.data, getDataApiDescription.data)
  
    res.send(formatData)
  }catch{
    res.status(400).send({
      mensage: 'No hemos encontrado información para el producto '
    });

  }
 
});
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
