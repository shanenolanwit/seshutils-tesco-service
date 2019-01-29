'use strict';
const axios = require('axios');

const tescoPrimary = process.env.TESCO_PRIMARY_API_KEY
axios.defaults.headers.common['Ocp-Apim-Subscription-Key'] = tescoPrimary;

function getData(id){
  return axios.get('https://dev.tescolabs.com/product', {
    params: { tpnc: id  }
  })
  .then(function (res) {
    return res.data.products[0];
  })
  .catch(function (error) {
    console.log(error)
    return error;
  });
}

function getListData(query,offset,limit){ 
  return axios.get('https://dev.tescolabs.com/grocery/products', {
    params: { query: query, offset: offset, limit: limit  }
  })
  .then(function (res) {
    return res.data.uk.ghs.products.results;
  })
  .catch(function (error) {
    console.log(error)
    return error;
  });
}

module.exports.list = async (event, context) => {
  var query = "Alcohol";
  var offset = '0';
  var limit = '10';
  if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {    
    if (event.queryStringParameters.offset !== undefined &&  event.queryStringParameters.offset !== null && event.queryStringParameters.offset !== "") {        
      offset = event.queryStringParameters.offset;
    }
    if (event.queryStringParameters.limit !== undefined &&  event.queryStringParameters.limit !== null && event.queryStringParameters.limit !== "") {        
      limit = event.queryStringParameters.limit;
    }
  }
  var data = await getListData(query,offset,limit)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Listing products',
      products: data,
      input: event,
    }),
  };

};

module.exports.select = async (event, context) => {
  var selectedId = event.pathParameters.id
  var data = await getData(selectedId);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Product data',
      product: data,
      input: event,
    }),
  };

};

