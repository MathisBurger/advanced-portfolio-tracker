import {StockApiInterface} from "./StockApiInterface";
import AlphaVantage from "alphavantage-wrapper-ts";

export default class FrankfurtAPI implements StockApiInterface {

    async getStockData(isin: string, from: number, to: number): Promise<any> {
        const response = await fetch(`https://api.boerse-frankfurt.de/v1/tradingview/lightweight/history/single?resolution=D&isKeepResolutionForLatestWeeksIfPossible=false&from=${from}&to=${to}&isBidAskPrice=false&symbols=XETR%3A${isin}`)
        return await response.json();
    }

    getCompanyData(): Promise<any> {
        const symbolResponse = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${}&apikey=1`)
        new AlphaVantage({apikey: '1'}).fundamentalData.companyOverview({symbol: })
    }

    getBaseCompanyInfo(isin: string): Promise<any> {
        return Promise.resolve(undefined);
    }

}
