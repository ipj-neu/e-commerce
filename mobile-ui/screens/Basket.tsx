import { useContext, useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { BasketId } from "../navs/BasketIdContext";
import Item from "../components/Item";
import { IBasket } from "../types/types";
import ip from "../ip";
import { Icon } from "@rneui/themed";
import { RouteParams } from "../navs/BasketNav";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type BasketScreenProps = {
    navigation: StackNavigationProp<RouteParams, "Basket">;
    route: RouteProp<RouteParams, "Basket">;
};

const NoItems = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
        <Text style={{ color: "#666", fontSize: 20 }}>No Items</Text>
    </View>
);

const BasketPage = ({ navigation }: BasketScreenProps) => {
    const { basketId } = useContext(BasketId);
    const [basket, setBasket] = useState<IBasket>();

    useEffect(() => {
        basketId !== "new" && updateBasket();
    }, []);

    const updateBasket = () => {
        fetch(`${ip}/basket/${basketId}`)
            .then((res) => res.json())
            .then((data) => setBasket(data));
    };

    const deleteItem = (itemId: string) => {
        fetch(`${ip}/basket/${basketId}/${itemId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => setBasket(data));
    };

    const renderDeleteButton = (id: string) => (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "red",
                marginVertical: 5,
                marginRight: 5,
                borderRadius: 15,
                width: 75,
            }}
        >
            <TouchableOpacity onPress={() => deleteItem(id)}>
                <Icon name="delete" type="feather" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#222" }}>
            {basketId !== "new" ? (
                basket ? (
                    Object.values(basket.items).length !== 0 ? (
                        <>
                            <ScrollView>
                                {Object.values(basket.items).map((basketItem, i) => {
                                    const { item } = basketItem;
                                    return (
                                        <View key={item.itemId}>
                                            <Item
                                                key={i}
                                                itemId={item.itemId}
                                                name={item.name}
                                                description={item.description}
                                                price={item.price}
                                                button={() => renderDeleteButton(item.itemId)}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={{ color: "white", fontWeight: "600" }}>
                                                            Number:{" "}
                                                        </Text>
                                                        <Text style={{ color: "white" }}>{basketItem.count}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={{ color: "white", fontWeight: "600" }}>
                                                            Total:{" "}
                                                        </Text>
                                                        <Text style={{ color: "white" }}>${basketItem.total}</Text>
                                                    </View>
                                                </View>
                                            </Item>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                            <View
                                style={{
                                    flexDirection: "row",
                                    padding: 10,
                                    borderTopWidth: 1,
                                    borderTopColor: "#444",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "600", color: "white", fontSize: 20 }}>
                                        Order Total:{" "}
                                    </Text>
                                    <Text style={{ color: "white", fontSize: 20 }}>${basket.basketTotal}</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate("Order", { basket: basket })}>
                                    <Icon name="cart-arrow-right" type="material-community" color="white" size={30} />
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <NoItems />
                    )
                ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                        <Text style={{ color: "#666", fontSize: 20 }}>Loading...</Text>
                    </View>
                )
            ) : (
                <NoItems />
            )}
        </View>
    );
};

export default BasketPage;
