import {Dimensions, View} from "react-native";
import {LineChart} from "react-native-chart-kit";
import useColorScheme from "../hooks/useColorScheme";
import {ChartData} from "../types";
import {useState} from "react";
import Svg, {Rect, Text as TextSVG} from "react-native-svg";



interface PortfolioChartProps {
    data: ChartData[];
}

const PortfolioChart = ({data}: PortfolioChartProps) => {

    const colorScheme = useColorScheme();
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 });

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
            width={Dimensions.get("window").width - 20} // from react-native
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
            decorator={() => {
                return tooltipPos.visible ? <View>
                    <Svg>
                        <Rect x={tooltipPos.x - 15}
                              y={tooltipPos.y + 10}
                              width="40"
                              height="30"
                              fill="black" />
                        <TextSVG
                            x={tooltipPos.x + 5}
                            y={tooltipPos.y + 30}
                            fill="white"
                            fontSize="16"
                            fontWeight="bold"
                            textAnchor="middle">
                            {tooltipPos.value}
                        </TextSVG>
                    </Svg>
                </View> : null
            }}
            onDataPointClick={(data) => {

                let isSamePoint = (tooltipPos.x === data.x
                    && tooltipPos.y === data.y)

                isSamePoint ? setTooltipPos((previousState) => {
                        return {
                            ...previousState,
                            value: data.value,
                            visible: !previousState.visible
                        }
                    })
                    :
                    setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });

            }}
        />
    )
}

export default PortfolioChart;
