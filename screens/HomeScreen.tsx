import {ScrollView, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import {ChartData, RootTabScreenProps} from '../types';
import PortfolioChart from "../components/PortfolioChart";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {Chip} from "react-native-paper";
import PositionsList, {Position} from "../components/PositionsList";
import {useEffect} from "react";

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

    const colorTheme = useColorScheme();

    useEffect(() => {
        //new FrankfurtAPI().getCurrentInfo('IE00B4L5Y983');
    }, []);

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
    const positions: Position[] = [
        {
            buyValue: 80,
            currentValue: 120,
            sumValue: 2000,
            name: 'Coca Cola',
            logoUrl: 'https://www.brandslex.de/img/logos/xl/c/logo-coca-cola-04.png'
        },
        {
            buyValue: 35,
            currentValue: 20,
            sumValue: 4500,
            name: 'Tencent',
            logoUrl: 'https://brandlogos.net/wp-content/uploads/2021/10/tencent-logo.png'
        },
        {
            buyValue: 60,
            currentValue: 80,
            sumValue: 10000,
            name: 'Mercedes Benz',
            logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Mercedes-Benz_Star_2022.svg/800px-Mercedes-Benz_Star_2022.svg.png'
        },
        {
            buyValue: 30,
            currentValue: 22,
            sumValue: 100,
            name: 'Cisco Systems',
            logoUrl: 'https://www.logolynx.com/images/logolynx/65/652a96fe3cb809736d423a75ebb8de74.jpeg'
        }
    ]

    const getChangePercentage = (data: ChartData[]): string => {
        if (data.length > 1) {
            const increase =  data[data.length-1].value - data[0].value;
            const change =  increase / data[data.length-1].value * 100;
            if (change >= 0) {
                return '+' + change.toFixed(2) + '%';
            }
            return change.toFixed(2) + '%';
        }
        return '';
    }

    const getChangeColor = () => getChangePercentage(portfolioChartData).startsWith('+') ? '#138108' : 'red';

  return (
      <ScrollView style={{margin: 10}}>
            <View style={[styles.portfolioValue, {backgroundColor: Colors[colorTheme].portfolioValueBackground}]}>
                <Text style={styles.portfolioValueText}>{portfolioChartData[portfolioChartData.length-1].value}€</Text>
                {/** @ts-ignore */}
                <Chip
                    style={[
                        styles.portfolioValueChip,
                        {backgroundColor: getChangeColor()}
                    ]}
                >
                    <Text style={{color: 'white'}}>{getChangePercentage(portfolioChartData)}</Text>
                </Chip>
            </View>
            <View style={{marginTop: 20}}>
                <PortfolioChart data={portfolioChartData} />
            </View>
          <View style={{marginTop: 20}}>
              <PositionsList positions={positions} />
          </View>
      </ScrollView>
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
