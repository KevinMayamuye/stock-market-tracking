'use strict';

import Stock from './Stock.js';
import mongoose from 'mongoose';
import cron from "node-cron";

async function GetAPI(URL){
  fetch(URL, { headers: { 'User-Agent': 'request' } })
  .then(res => {
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return res.json();
  })
  .then(async data => {
    console.log("data");
    await PostStockDB(data);
    return data;
    })
  .catch(err => {
    console.log('Error connecting to API:', err);
    return;
  });
 
}
 
async function PostStockDB(data){
  try {
    const symbol = data['Global Quote']['01. symbol'];
    const new_open = data['Global Quote']['02. open'];
    const high = data['Global Quote']['03. high'];
    const low = data['Global Quote']['04. low'];
    const price = data['Global Quote']['05. price'];
    const volume = data['Global Quote']['06. volume'];
    const date = data['Global Quote']['07. latest trading day'];
    const last_close = data['Global Quote']['08. previous close'];
    const change = data['Global Quote']['09. change'];
 
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
    
    stock.save();

    const struct = [symbol, new_open, high, low, price, volume, date, last_close, change]
    return struct
 
  } catch (error) {
    console.log('Error posting data:', error);
    return;
  }
   
}
 
function GetStockDB(symbol, date){
  Stock.find({ symbol: symbol, date: date })
    .then(results => {
      console.log('Stock Data:', results);
    })
    .catch(err => {
      console.log('Error retrieving data:', err);
    });
}
 
// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
 
const options = {
      serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
      socketTimeoutMS: 45000 // Increase to 45 seconds
  };
 
mongoose.connect(MONGODB_URI, options)
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));
 
// List of stock to track
const Stock_symbols = ['IBM', 'AMD', 'GOOGL', 'INTC', 'AMZN', 'NVDA', 'MSFT', 'AAPL', 'TSLA', 'META'];

// 1 minute: * * * * *, 5 minutes: */5 * * * *, 1 hour: 0 * * * *, everyday at 3am: 0 3 * * *
cron.schedule("0 9 * * *", () => {
  console.log("Running Scheduled API Fetch...");
  for (const Stock of Stock_symbols) {
    const API = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${Stock}&apikey=GGSFEOOQ2EXKQEY6`;
    try{
        GetAPI(API)
      } catch (error){
        console.log('Error posting data:', error);
        console.log('API URL:', API);
      }
    }
});
 
export { GetAPI, PostStockDB, GetStockDB };

