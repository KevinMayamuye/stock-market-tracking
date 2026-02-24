// Mock data for the stock app

export const marketIndexes = [
  { name: "S&P 500", symbol: "SPX", price: 4567.89, change: 1.23, changePercent: 0.027 },
  { name: "NASDAQ", symbol: "IXIC", price: 14234.56, change: -23.45, changePercent: -0.164 },
  { name: "DOW JONES", symbol: "DJI", price: 35678.90, change: 145.67, changePercent: 0.41 },
];

export const featuredStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 178.45, change: 2.34, changePercent: 1.33, marketCap: "2.8T" },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 368.25, change: -1.45, changePercent: -0.39, marketCap: "2.7T" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 139.67, change: 0.89, changePercent: 0.64, marketCap: "1.7T" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 145.23, change: 3.21, changePercent: 2.26, marketCap: "1.5T" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 242.84, change: -5.67, changePercent: -2.28, marketCap: "771B" },
  { symbol: "META", name: "Meta Platforms Inc.", price: 328.56, change: 4.23, changePercent: 1.30, marketCap: "847B" },
];

export const trendingStocks = [
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 487.23, change: 12.45, changePercent: 2.62 },
  { symbol: "AMD", name: "Advanced Micro Devices", price: 123.45, change: -2.34, changePercent: -1.86 },
  { symbol: "NFLX", name: "Netflix Inc.", price: 445.67, change: 8.90, changePercent: 2.04 },
  { symbol: "DIS", name: "The Walt Disney Company", price: 92.34, change: 1.23, changePercent: 1.35 },
];

export const stockCategories = [
  { id: "tech", name: "Technology", icon: "Cpu" },
  { id: "finance", name: "Finance", icon: "DollarSign" },
  { id: "energy", name: "Energy", icon: "Zap" },
  { id: "healthcare", name: "Healthcare", icon: "Heart" },
  { id: "crypto", name: "Cryptocurrency", icon: "Bitcoin" },
  { id: "retail", name: "Retail", icon: "ShoppingBag" },
];

export const generateChartData = (days: number) => {
  const data = [];
  const basePrice = 150;
  let currentPrice = basePrice;

  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * 10;
    currentPrice += change;
    
    const high = currentPrice + Math.random() * 5;
    const low = currentPrice - Math.random() * 5;
    const open = currentPrice + (Math.random() - 0.5) * 3;
    const close = currentPrice;

    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000),
    });
  }

  return data;
};

export const newsArticles = [
  {
    id: 1,
    title: "Tech Stocks Rally as Market Shows Strong Recovery",
    source: "Financial Times",
    time: "2 hours ago",
    category: "Markets",
    image: "tech stocks",
    excerpt: "Major technology stocks led gains today as investors showed renewed confidence in the sector...",
  },
  {
    id: 2,
    title: "Federal Reserve Hints at Potential Rate Cuts in 2025",
    source: "Reuters",
    time: "4 hours ago",
    category: "Economy",
    image: "federal reserve",
    excerpt: "The Federal Reserve suggested that interest rate cuts could be on the horizon as inflation continues to moderate...",
  },
  {
    id: 3,
    title: "Apple Announces Breakthrough in AI Technology",
    source: "Bloomberg",
    time: "6 hours ago",
    category: "Technology",
    image: "apple technology",
    excerpt: "Apple Inc. unveiled new artificial intelligence capabilities that could revolutionize how users interact with devices...",
  },
  {
    id: 4,
    title: "Energy Sector Sees Massive Investment Surge",
    source: "Wall Street Journal",
    time: "1 day ago",
    category: "Energy",
    image: "renewable energy",
    excerpt: "Renewable energy companies attracted record investments as the transition to clean energy accelerates...",
  },
  {
    id: 5,
    title: "Cryptocurrency Markets Experience High Volatility",
    source: "CoinDesk",
    time: "1 day ago",
    category: "Crypto",
    image: "cryptocurrency trading",
    excerpt: "Bitcoin and Ethereum saw significant price swings amid regulatory uncertainty and market speculation...",
  },
];

export const companyFundamentals = {
  marketCap: "$2.8T",
  pe: 28.5,
  eps: 6.25,
  dividend: 0.95,
  yield: 0.53,
  week52High: 198.23,
  week52Low: 124.17,
  avgVolume: "57.8M",
  beta: 1.29,
};

export const analystRatings = {
  buy: 28,
  hold: 8,
  sell: 2,
  targetPrice: 195.0,
  consensus: "Strong Buy",
};

export const portfolioHoldings = [
  { symbol: "AAPL", name: "Apple Inc.", shares: 50, avgCost: 165.00, currentPrice: 178.45, value: 8922.50, gain: 672.50, gainPercent: 8.15 },
  { symbol: "MSFT", name: "Microsoft", shares: 30, avgCost: 350.00, currentPrice: 368.25, value: 11047.50, gain: 547.50, gainPercent: 5.21 },
  { symbol: "GOOGL", name: "Alphabet", shares: 75, avgCost: 130.00, currentPrice: 139.67, value: 10475.25, gain: 725.25, gainPercent: 7.44 },
  { symbol: "TSLA", name: "Tesla", shares: 40, avgCost: 250.00, currentPrice: 242.84, value: 9713.60, gain: -286.40, gainPercent: -2.86 },
];
