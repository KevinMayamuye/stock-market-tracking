'use strict';

import Stock from './API.js';
import mongoose from 'mongoose';
import cron from "node-cron";

const API = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=SE72K7OKP164LHN4';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
 
const options = {
      serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
      socketTimeoutMS: 45000 // Increase to 45 seconds
  };
 
  mongoose.connect("mongodb+srv://cubotx220_db_user:r10ev82am8zR92bU@stockmarkettrackinglogi.1bzsxs2.mongodb.net/", options)
      .then(() => console.log("Database Connected"))
      .catch(err => console.log(err));

// 1 minute: * * * * *, 5 minutes: */5 * * * *, 1 hour: 0 * * * *, everyday at 3am: 0 3 * * *
cron.schedule("*/5 * * * *", () => {
  console.log("Running Scheduled API Fetch...");

  fetch(API, { headers: { 'User-Agent': 'request' } })
  .then(res => {
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return res.json();
  })
  .then(async data => {
    console.log(data);
  
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
    
    console.log(stock);

    await stock.save();

    console.log("done");

  })
  .catch(err => {
    console.log('Error:', err);
  });
});
// fetch(API, { headers: { 'User-Agent': 'request' } })
//   .then(res => {
//     if (!res.ok) throw new Error(`Status: ${res.status}`);
//     return res.json();
//   })
//   .then(async data => {
//     console.log(data);
    
    // Extract values from API response
  //   const symbol = data['Global Quote']['01. symbol'];
  //   const new_open = data['Global Quote']['02. open'];
  //   const high = data['Global Quote']['03. high'];
  //   const low = data['Global Quote']['04. low'];
  //   const price = data['Global Quote']['05. price'];
  //   const volume = data['Global Quote']['06. volume'];
  //   const date = data['Global Quote']['07. latest trading day'];
  //   const last_close = data['Global Quote']['08. previous close'];
  //   const change = data['Global Quote']['09. change'];
    
  //   console.log(symbol)
  //   console.log(price)
  //   console.log(date)

  //   // Create Stock instance with API data
  //   const stock = new Stock({
  //     symbol,
  //     new_open,
  //     high,
  //     low,
  //     price,
  //     volume,
  //     date,
  //     last_close,
  //     change
  //   });
    
  //   console.log(stock);

  //   await stock.save();

  //   console.log("done");

  // })
  // .catch(err => {
  //   console.log('Error:', err);
  // });

const sym = "IBM"
const id = "691c3c3f33cabeb67096db7c"
const stockdb = await Stock.findOne({
          $or: [
              { _id: id},
              { symbol: sym }
          ]
      });
 
console.log(stockdb);
