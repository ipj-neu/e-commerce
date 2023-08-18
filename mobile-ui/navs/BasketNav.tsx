import { createStackNavigator } from "@react-navigation/stack";
import BasketPage from "../screens/Basket";
import StartOrderScreen from "../screens/StartOrderScreen";
import { IBasket } from "../types/types";
import OrderConfirmedScreen from "../screens/OrderConfirmed";

export type RouteParams = {
    Basket: undefined;
    Order: { basket: IBasket };
    OrderConfirmed: undefined;
};

const Stack = createStackNavigator<RouteParams>();

const BasketNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Basket" component={BasketPage} options={{ headerShown: false }} />
            <Stack.Screen name="Order" component={StartOrderScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderConfirmed" component={OrderConfirmedScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default BasketNav;
