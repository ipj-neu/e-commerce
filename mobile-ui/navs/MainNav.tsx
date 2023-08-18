import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import { Icon } from "@rneui/themed";
import BasketPage from "../screens/Basket";
import SearchScreen from "../screens/Search";
import BasketNav from "./BasketNav";
import OrdersScreen from "../screens/OrdersScreen";

const Tab = createBottomTabNavigator();

export default function Main() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#222",
                    borderTopWidth: 1,
                    borderTopColor: "#444",
                },
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === "Home") {
                        return focused ? (
                            <Icon name="home" type="ionicon" color={color} size={size} />
                        ) : (
                            <Icon name="home-outline" type="ionicon" color={color} size={size} />
                        );
                    } else if (route.name === "Search") {
                        return (
                            <Image
                                source={require("../assets/search.png")}
                                style={{ tintColor: color, width: size, height: size }}
                            />
                        );
                    } else if (route.name === "BasketNav") {
                        return <Icon name="shopping-cart" type="feather" color={color} size={size} />;
                    } else if (route.name === "Orders") {
                        return <Icon name="list" type="feather" color={color} size={size} />;
                    }
                },
                tabBarInactiveTintColor: "#666",
                tabBarActiveTintColor: "white",
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Orders" component={OrdersScreen} options={{ unmountOnBlur: true }} />
            <Tab.Screen name="BasketNav" component={BasketNav} options={{ unmountOnBlur: true, title: "Basket" }} />
        </Tab.Navigator>
    );
}
