import {Dimensions, Image, SectionList, StyleSheet, View} from "react-native";
import {Text} from "./Themed";
import {ChartData} from "../types";
import {Chip} from "react-native-paper";
import {useMemo} from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export interface Position {
    buyValue: number;
    currentValue: number;
    name: string;
    logoUrl: string;
    sumValue: number;
}

interface PositionsListProps {
    positions: Position[];
}


const PositionsList = ({positions}: PositionsListProps) => {

    const theme = useColorScheme();

    const getChangePercentage = (data: Position): string => {
            const increase =  data.currentValue - data.buyValue;
            const change =  increase / data.currentValue * 100;
            if (change >= 0) {
                return '+' + change.toFixed(2) + '%';
            }
            return change.toFixed(2) + '%';
    }

    const getChangeColor = (position: Position) => getChangePercentage(position).startsWith('+') ? '#138108' : 'red';

    return (
        <View style={[styles.container, {backgroundColor: Colors[theme].portfolioValueBackground}]}>
            <Text style={styles.headingText}>Positions</Text>
            {positions.map((position, index) => (
                <View style={styles.positionFlex} key={index}>
                    <Image source={{uri: position.logoUrl}} style={styles.smallLogo} />
                    <Text style={styles.largerText}>{position.name}</Text>
                    <Text style={styles.largerText}>{position.sumValue}€</Text>
                    <Chip
                        style={[
                            styles.portfolioValueChip,
                            {backgroundColor: getChangeColor(position)}
                        ]}
                    >
                        <Text style={{color: 'white'}}>{getChangePercentage(position)}</Text>
                    </Chip>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    portfolioValueChip: {
        padding: 0,
        margin: 10
    },
    container: {
        width: Dimensions.get('window').width - 20,
        borderRadius: 10,
        justifyContent: "center"
    },
    headingText: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10
    },
    positionFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    largerText: {
        fontSize: 18
    },
    smallLogo: {
        width: 50,
        height: 50,
        borderRadius: 50
    }
})

export default PositionsList;
