import {StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import {ChartData, RootTabScreenProps} from '../types';
import PortfolioChart from "../components/PortfolioChart";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {Chip} from "react-native-paper";
import * as cluster from "cluster";

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

    const colorTheme = useColorScheme();

    const portfolioChartData: ChartData[] = [
        {
            label: "10AM",
            value: 120
        },
        {
            label: "11AM",
            value: 140
        },
        {
            label: "12PM",
            value: 80
        },
        {
            label: "1PM",
            value: 160
        },
    ];

    const getChangePercentage = (data: ChartData[]): string => {
        if (data.length > 1) {
            const increase =  data[data.length-1].value - data[0].value;
            const change =  increase / data[data.length-1].value * 100;
            if (change >= 0) {
                return '+' + change + '%';
            }
            return change + '%';
        }
        return '';
    }

    const getChangeColor = () => getChangePercentage(portfolioChartData).startsWith('+') ? '#138108' : 'red';

  return (
      <View>
            <View style={[styles.portfolioValue, {backgroundColor: Colors[colorTheme].portfolioValueBackground}]}>
                <Text style={styles.portfolioValueText}>{portfolioChartData[portfolioChartData.length-1].value}€</Text>
                <Chip
                    style={[
                        styles.portfolioValueChip,
                        {backgroundColor: getChangeColor()}
                    ]}
                >
                    <Text style={{color: 'white'}}>{getChangePercentage(portfolioChartData)}</Text>
                </Chip>
            </View>
            <PortfolioChart data={portfolioChartData} />
      </View>
  );
}

const styles = StyleSheet.create({
    portfolioValue: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 20,
        padding: 1,
        borderRadius: 10
    },
    portfolioValueText: {
        fontSize: 35,
        fontWeight: "bold",
        marginLeft: 20
    },
    portfolioValueChip: {
        padding: 0,
        margin: 10
    }
})
