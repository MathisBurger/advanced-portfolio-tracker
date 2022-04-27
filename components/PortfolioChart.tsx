import {Dimensions} from "react-native";
import {LineChart} from "react-native-chart-kit";
import useColorScheme from "../hooks/useColorScheme";
import {ChartData, ChartInterval} from "../types";
import {Text} from "./Themed";



interface PortfolioChartProps {
    data: ChartData[];
}

const PortfolioChart = ({data}: PortfolioChartProps) => {

    const colorScheme = useColorScheme();

    const config = {
        backgroundColor: colorScheme === 'light' ? "#e26a00" : "#016d94",
        backgroundGradientFrom: colorScheme === 'light' ? "#fb8c00" : "#0085b6",
        backgroundGradientTo: colorScheme === 'light' ? "#ffa726" : "#00abee",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: colorScheme === 'light' ? "#ffa726" : "#00abee"
        }
    };

    const generateChartLabels = () => {
        return data.map(entry => entry.label);
    }

    const generateChartData = () => {
        return data.map(entry => entry.value);
    }

    return (
        <LineChart
            data={{
                labels: generateChartLabels(),
                datasets: [
                    {
                        data: generateChartData()
                    }
                ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="€"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={config}
            bezier
            withShadow
            withDots
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
            onDataPointClick={({value}) => console.log(value)}
        />
    )
}

export default PortfolioChart;
