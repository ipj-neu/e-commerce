import { useEffect, useState, useContext, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { RouteParams } from "../navs/BasketNav";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { IProfile } from "../types/types";
import { SecurityContext } from "../navs/SecurityContext";
import ip from "../ip";
import EditButton from "../components/EditButton";
import { Button, Icon } from "@rneui/themed";
import { BasketId } from "../navs/BasketIdContext";

type OrderScreenProps = {
    navigation: StackNavigationProp<RouteParams, "Order">;
    route: RouteProp<RouteParams, "Order">;
};

const StartOrderScreen = ({ navigation, route }: OrderScreenProps) => {
    const { basket } = route.params;
    const { user } = useContext(SecurityContext);
    const { setBasketId } = useContext(BasketId);
    const [profile, setProfile] = useState<IProfile>();
    const [selectedCard, setSelectedCard] = useState(-1);
    const [addressInput, setAddressInput] = useState("");
    const addressRef = useRef<TextInput>(null);

    useEffect(() => {
        fetch(`${ip}/profile`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setProfile(data);
                setAddressInput(data.address);
            });
    }, []);

    const handleCheckOut = () => {
        // TODO add way to indicated that the card needs to be selected
        if (selectedCard !== -1 && profile) {
            const order = {
                username: user.username,
                basketId: basket.basketId,
                card: Object.values(profile.cards)[selectedCard],
                address: addressInput,
            };
            fetch(`${ip}/order`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });
            setBasketId("new");
            navigation.navigate("OrderConfirmed");
        }
    };

    const handleCardPress = (index: number) => {
        if (selectedCard === index) {
            setSelectedCard(-1);
        } else {
            setSelectedCard(index);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#222" }}>
            <View style={styles.titleContainer}>
                <Icon name="home-outline" type="ionicon" color="white" style={{ marginLeft: 5 }} />
                <Text style={styles.title}>Address</Text>
            </View>
            <EditButton handlePress={() => addressRef.current?.focus()}>
                <TextInput style={styles.inputs} value={addressInput} onChangeText={setAddressInput} ref={addressRef} />
            </EditButton>
            {/* Credit card selector */}
            <View>
                <View style={styles.titleContainer}>
                    <Icon name="creditcard" type="antdesign" color="white" style={{ marginLeft: 5 }} />
                    <Text style={styles.title}>
                        Select Card <Text style={{ color: "red" }}>*</Text>
                    </Text>
                </View>
                {profile && (
                    <ScrollView
                        style={{
                            height: 200,
                            borderWidth: 1,
                            borderColor: "#444",
                            marginHorizontal: 5,
                            borderRadius: 10,
                        }}
                    >
                        {Object.values(profile.cards).map((card, i) => (
                            <TouchableOpacity key={i} onPress={() => handleCardPress(i)} activeOpacity={0.9}>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        backgroundColor: "#444",
                                        margin: 5,
                                        padding: 10,
                                        borderRadius: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            marginHorizontal: 5,
                                            borderColor: "white",
                                            borderWidth: 1,
                                            height: 15,
                                            width: 15,
                                            borderRadius: 15,
                                        }}
                                    >
                                        {selectedCard === i && (
                                            <Icon
                                                name="check"
                                                type="antdesign"
                                                backgroundColor="mediumspringgreen"
                                                size={10}
                                                borderRadius={15}
                                                style={{ padding: 2 }}
                                            />
                                        )}
                                    </View>
                                    <Text style={{ color: "white" }}>{card.name}</Text>
                                    <Text style={{ color: "white", marginHorizontal: 10 }}>
                                        #: •••• {card.number.toString().slice(-4)}
                                    </Text>
                                    <Text style={{ color: "white" }}>Exp: {card.exp}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>
            {/* Items in the cart */}
            <View style={styles.titleContainer}>
                <Icon name="list" type="feather" color="white" style={{ marginLeft: 5 }} />
                <Text style={styles.title}>Items</Text>
            </View>
            <ScrollView
                style={{ borderWidth: 1, borderColor: "#444", marginHorizontal: 5, borderRadius: 10 }}
                showsVerticalScrollIndicator={false}
            >
                {Object.values(basket.items).map((basketItem, i) => (
                    <View
                        key={i}
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            backgroundColor: "#444",
                            margin: 5,
                            padding: 10,
                            borderRadius: 10,
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "bold" }}>{basketItem.item.name}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: "white", marginRight: 10 }}>x{basketItem.count}</Text>
                            <Text style={{ color: "white" }}>${basketItem.total}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={[{ flexDirection: "row", marginTop: 5, padding: 5 }, styles.divider]}>
                <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>Total: </Text>
                <Text style={{ color: "white", fontSize: 20 }}>${basket.basketTotal}</Text>
            </View>
            <Button
                title="Check Out"
                icon={{ name: "check", type: "antdesign", color: "white" }}
                onPress={handleCheckOut}
            />
        </View>
    );
};

export default StartOrderScreen;

const styles = StyleSheet.create({
    title: {
        color: "white",
        marginLeft: 5,
        fontSize: 20,
        fontWeight: "600",
    },
    inputs: {
        color: "white",
        fontSize: 20,
        padding: 5,
    },
    divider: {
        borderTopWidth: 1,
        borderTopColor: "#444",
    },
    titleContainer: {
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
    },
});
