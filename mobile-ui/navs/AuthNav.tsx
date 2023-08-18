import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Login";
import SignUp from "../screens/SignUp";

const Stack = createStackNavigator();

const AuthNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#222" }, headerTintColor: "white" }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Sign Up" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNav;
