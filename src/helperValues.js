const valuesFormat = (num) => {
  // 5000
  if(num){
   return parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return 0
}

const reverseCurrencyFormat = (num = 0) => {
  
   return parseInt(num.replace(/\$|,/g, ''))
}


export {
  valuesFormat,
  reverseCurrencyFormat
}