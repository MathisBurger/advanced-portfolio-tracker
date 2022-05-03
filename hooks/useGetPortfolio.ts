import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStockAPI from "./useStockAPI";

interface PortfolioPosition {
    name: string;
    isin: string;
    amount: number;
    logo: string;
    currentPrice?: number;
    lastPrice?: number;
    increase?: number;
}

interface PortfolioData {
    positions: PortfolioPosition[];
}

export type PortfolioInterval = "intraday" | "weekly" | "monthly";

const useGetPortfolio = (interval: PortfolioInterval) => {

    const [portfolio, setPortfolio] = useState<PortfolioData|null>(null);
    const api = useStockAPI();

    const fetcher = async (interval: PortfolioInterval): Promise<PortfolioData> => {
        const data = await AsyncStorage.getItem("@portfolio");
        if (data === null) {
            const defaultData = {positions: []} as PortfolioData;
            await AsyncStorage.setItem('@portfolio', JSON.stringify(defaultData));
            return defaultData;
        }
        const pf = JSON.parse(data ?? "") as PortfolioData;
        pf.positions = [
            {
                name: "Mercedes Benz",
                isin: "DE0007100000",
                amount: 15,
                logo: ""
            }
        ];
        const positions: PortfolioPosition[] = [];
        for (const position of pf.positions) {
            let data = Object.assign({}, position);
            const today = +(Date.now() / 1000).toFixed(0);
            const timedData = await api.getStockData(data.isin, today-86400, today);

        }
        pf.positions = positions;
        return pf;
    }

    useEffect(() => {
        fetcher(interval).then(fetched => setPortfolio(fetched));
    }, []);
    return {portfolio: portfolio, isLoading: portfolio === null, refetch: fetcher}
}

export default useGetPortfolio;
