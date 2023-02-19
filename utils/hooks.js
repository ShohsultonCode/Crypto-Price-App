import { useState, useEffect, useCallback } from "react";

import { getSymbols, findByValue } from "../utils";
import { CRYPTOCURRENCIES } from "../configs";

const useTicker = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState(CRYPTOCURRENCIES);

  const fetchCryto = useCallback(async ()=>{
    try{
      const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${JSON.stringify(getSymbols())}`)
      const data = await response.json()


      setCryptocurrencies(
        cryptocurrencies.map((item)=>{
          const {lastPrice, lowPrice, highPrice} = findByValue(data, item.symbol) || []
        
          return{
            ...item,
            highPrice, 
            lowPrice, 
            price:lastPrice,
            prevPrice:item?.price || 0,

          }
        })
      )
    }catch(err){
      console.log(err);
    }
  }, [cryptocurrencies])

  useEffect(()=>{
    const interval = setInterval(fetchCryto, 5000)
    return ()=>clearInterval(interval)
  })

  return cryptocurrencies;  
};



export { useTicker }; 