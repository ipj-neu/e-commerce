import { View, Text, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { SecurityContext } from "../navs/SecurityContext";
import { IOrder } from "../types/types";
import ip from "../ip";
import { ScrollView, Swipeable } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";

const OrdersScreen = () => {
    const { user } = useContext(SecurityContext);
    const [orders, setOrders] = useState<IOrder[]>();

    useEffect(() => {
        refreshOrders();
    }, []);

    const cancelOrder = (id: string) => {
        fetch(`${ip}/order/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        }).then(() => refreshOrders());
    };

    const renderCancelButton = (id: string) => (
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
            <TouchableOpacity onPress={() => cancelOrder(id)}>
                <Icon name="cancel" type="material" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );

    const refreshOrders = () => {
        fetch(`${ip}/order`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setOrders(data));
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#222" }}>
            {orders ? (
                orders.length !== 0 ? (
                    <>
                        <ScrollView>
                            {orders.map((order, i) => (
                                <Swipeable key={i} renderRightActions={() => renderCancelButton(order.orderId)}>
                                    <View style={{ backgroundColor: "#444", margin: 5, padding: 5, borderRadius: 10 }}>
                                        <Text style={{ color: "white" }}>
                                            <Text style={{ fontWeight: "600" }}>Number of Items:</Text>{" "}
                                            {order.basket.totalItems}
                                        </Text>
                                        <Text style={{ color: "white" }}>${order.basket.basketTotal}</Text>
                                        <Text style={{ color: "white", fontWeight: "600" }}>Card</Text>
                                        <View style={{ flexDirection: "row", marginLeft: 2 }}>
                                            <Text style={{ color: "white", marginRight: 5 }}>{order.card.name}</Text>
                                            <Text style={{ color: "white" }}>{order.card.number.slice(-4)}</Text>
                                        </View>
                                    </View>
                                </Swipeable>
                            ))}
                        </ScrollView>
                    </>
                ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "#666", fontSize: 20 }}>No Orders</Text>
                    </View>
                )
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#666", fontSize: 20 }}>Loading...</Text>
                </View>
            )}
        </View>
    );
};

export default OrdersScreen;
