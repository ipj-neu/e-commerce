import { StackHeaderProps, createStackNavigator } from "@react-navigation/stack";
import Main from "./MainNav";
import ProfileScreen from "../screens/ProfileScreen";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { ICard } from "../types/types";
import AddCardScreen from "../screens/AddCardScreen";

const MainHeader = ({ navigation, route, options, layout }: StackHeaderProps) => {
    // const navigation = useNavigation<RouteProps>();

    return (
        <View style={{ flexDirection: "row", height: 90, borderBottomWidth: 1, borderBottomColor: "#444" }}>
            <View style={{ flex: 1, backgroundColor: "#222", justifyContent: "flex-end" }}>
                <Text style={{ color: "white", margin: 10, fontSize: 25, fontWeight: "600" }}>Amazon 2.0</Text>
            </View>
            <View
                style={{
                    backgroundColor: "#222",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                }}
            >
                <View
                    style={{
                        height: 40,
                        width: 40,
                        // backgroundColor: "blue",
                        backgroundColor: "#222",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        margin: 5,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Icon name="person-circle-outline" type="ionicon" color="white" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export type RouteParams = {
    main: undefined;
    Profile: { card?: ICard };
    Card: undefined;
};

const Stack = createStackNavigator<RouteParams>();

const ProfileNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: "#222" },
                    headerTintColor: "white",
                }}
            >
                <Stack.Screen name="main" component={Main} options={{ header: MainHeader, title: "Home" }} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerBackTitleVisible: false }} />
                <Stack.Screen name="Card" component={AddCardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default ProfileNav;
