import {StockApiInterface} from "../data/StockApiInterface";
import FrankfurtAPI from "../data/FrankfurtAPI";

const useStockAPI = (): StockApiInterface => {

    return new FrankfurtAPI();
}

export default useStockAPI;
