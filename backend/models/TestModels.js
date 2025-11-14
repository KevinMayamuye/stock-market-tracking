'use strict';

import Stock from '../models/API.js'

const API = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=SE72K7OKP164LHN4';

fetch(API, { headers: { 'User-Agent': 'request' } })
  .then(res => {
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return res.json();
  })
  .then(async data => {
    console.log(data);
    
    // Extract values from API response
    const symbol = data['Global Quote']['01. symbol'];
    const new_open = data['Global Quote']['02. open'];
    const high = data['Global Quote']['03. high'];
    const low = data['Global Quote']['04. low'];
    const price = data['Global Quote']['05. price'];
    const volume = data['Global Quote']['06. volume'];
    const date = data['Global Quote']['07. latest trading day'];
    const last_close = data['Global Quote']['08. previous close'];
    const change = data['Global Quote']['09. change'];
    
    console.log(symbol)
    console.log(price)
    console.log(date)

    // Create Stock instance with API data
    const stock = new Stock({
      symbol,
      new_open,
      high,
      low,
      price,
      volume,
      date,
      last_close,
      change
    });
    
    await stock.save()

    console.log(stock);
  })
  .catch(err => {
    console.log('Error:', err);
  });