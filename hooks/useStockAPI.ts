import AlphaVantage from "alphavantage-wrapper-ts";



const useStockAPI = () => {

    return new AlphaVantage({apikey: "1"});
}

export default useStockAPI;
