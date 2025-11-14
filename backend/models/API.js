import mongoose from 'mongoose'

const API = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=SE72K7OKP164LHN4';

const stockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: [true, 'Symbol is required'],
        trim: true
    },
    new_open: {
        type: Number,
        required: [true, 'Opening value is required'],
    },
    high: {
        type: Number,
        required: [true, 'High value is required'],
    },
    low: {
        type: Number,
        required: [true, 'Low value is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    volume: {
        type: Number,
        required: [true, 'Volume amount is required'],
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
        minlength: [10, 'Wrong date format']
    },
    last_close: {
        type: Number,
        required: [true, 'Close value is required'],
    },
    change: {
        type: Number,
        required: [true, 'Change value is required'],
    },
}, {
    timestamps: true
})

const Stock = mongoose.model('Stock', stockSchema)

export default Stock