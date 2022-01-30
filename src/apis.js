
const fetchRiskRate = (cb)=>{
  fetch("https://www.quandl.com/api/v3/datasets/USTREASURY/BILLRATES.json?api_key=Q1XPm6qB1p8FHmFGic7a")
  .then(response => response.json())
  .then(data => cb(data))
  .catch(error=>{ cb({error})})
}


const fetchStockApi = (stockName, cb) => {
                
    const API_KEY = '4qt2gSxfGiZykUV48tq-';
    const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction =[];
    let stockChartYValuesFunction =[];

    fetch(API_Call)
        .then(response => response.json())
        .then(data => {
          
                cb(data)
                
            } 
        ).catch(error=>{
          cb({error})
          
        })              
}


  export {
    fetchStockApi,
    fetchRiskRate
  }