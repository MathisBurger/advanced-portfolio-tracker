export interface StockApiInterface {
    getStockData(isin: string, from: number, to: number): Promise<any>;
    getBaseCompanyInfo(isin: string): Promise<any>;
    getCompanyData(isin: string): Promise<any>;
}
