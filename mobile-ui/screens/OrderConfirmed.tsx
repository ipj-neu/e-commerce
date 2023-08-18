import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { RouteParams } from "../navs/BasketNav";
import { RouteProp } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

type OrderConfirmedScreenProps = {
    navigation: StackNavigationProp<RouteParams, "OrderConfirmed">;
    route: RouteProp<RouteParams, "OrderConfirmed">;
};

const OrderConfirmedScreen = ({ navigation }: OrderConfirmedScreenProps) => {
    useEffect(() => {
        setTimeout(() => navigation.navigate("Basket"), 2000);
    }, []);

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#222",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Icon name="check" type="entypo" color="mediumspringgreen" size={30} />
            <Text style={{ color: "white", fontSize: 30, fontWeight: "600" }}>Order Confirmed</Text>
        </View>
    );
};

export default OrderConfirmedScreen;
