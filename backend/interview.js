const fs = require("fs");
let data = JSON.parse(fs.readFileSync("backend/stocks.json", "utf-8"));

//fs.readFileSync is used because reads the file every time and hence useful when the closing price
//is being updated everyday.

const interview = (part, arg) => {
  if (part === "-part1") {
    let total = 0;
    const stockArray = arg.split(",");

    for (let i = 0; i < stockArray.length; i++) {
      const stocks = stockArray[i].split(":");
      const ticker = stocks[0];
      const quantity = Number(stocks[1]);
      if (quantity < 0) {
        throw new Error("Negative Quantity Entered");
      }
      let currentObj = data.find(
        (stock) => stock.ticker.toLowerCase() === ticker.toLowerCase()
      );
      if (currentObj === undefined) {
        throw new Error("Stock Not Found");
      }
      total += currentObj.close * quantity;
    }
    return `Current value of the portfolio is $${parseFloat(total).toFixed(2)}`;
  } else if (part === "-bonus") {
    const priceArray = arg.split(",").map(Number);
    let max = 0;
    min = priceArray[0];

    for (let i = 1; i < priceArray.length; i++) {
      min = Math.min(priceArray[i], min);
      const currentProfit = priceArray[i] - min;
      max = Math.max(currentProfit, max);
    }
    return max;
  } else {
    throw new Error("Invalid Interview Part");
  }
};

console.log(interview("-bonus", "5,3,2,1,0"));
console.log(interview("-part1", "FB:12,PLTR:5000"));

// execution instructions //

// arg 1 is part of the interview, arg 2 is the argument given such as portfolio or prices
