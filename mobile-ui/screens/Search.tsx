import { useContext, useState } from "react";
import { Animated, Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { SearchBar } from "@rneui/themed";
import Item from "../components/Item2";
import { IBasket, IItem } from "../types/types";
import { BasketId } from "../navs/BasketIdContext";
import ip from "../ip";

///////////////////////////////////////////

const BasketButton = (item: IItem, handlePress: (item: IItem) => void) => {
    return (
        <Animated.View
            style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "blue",
                marginTop: 10,
                marginRight: 5,
                borderRadius: 15,
                width: 75,
                height: 40,
            }}
        >
            <TouchableOpacity onPress={() => handlePress(item)}>
                {/* image from https://www.flaticon.com/free-icon/add-to-cart_3405663?related_id=3405663 */}
                <Image
                    source={require("../assets/add-to-chart.png")}
                    style={{ height: 30, width: 30, tintColor: "white" }}
                />
            </TouchableOpacity>
        </Animated.View>
    );
};

// Search Main Screen
export default function SearchScreen() {
    const [search, setSearch] = useState("");
    const { basketId, setBasketId } = useContext(BasketId);
    const [result, setResult] = useState<IItem[]>();

    const addItemToBasket = (item: IItem) => {
        fetch(`${ip}/basket/${basketId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        })
            .then((res) => res.json())
            .then((data: IBasket) => basketId === "new" && setBasketId(data.basketId));
    };

    const getResults = () => {
        if (search !== "") {
            console.log(`Searching for "${search}"...`);
            fetch(`${ip}/item/search/${search}`)
                .then((res) => res.json())
                .then((data) => setResult(data));
        }
    };

    const handleClear = () => {
        setResult(undefined);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#222" }}>
            <SearchBar
                onChangeText={(text) => setSearch(text)}
                value={search}
                round={true}
                onSubmitEditing={getResults}
                keyboardAppearance="dark"
                onClear={handleClear}
                placeholder="Search"
            />
            {result && (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {result.length !== 0 ? (
                        result.map((item) => (
                            <TouchableOpacity key={item.itemId} activeOpacity={1}>
                                <Item
                                    itemId={item.itemId}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    button={() => BasketButton(item, addItemToBasket)}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: "white", fontWeight: "600" }}>Price: </Text>
                                        <Text style={{ color: "white" }}>${item.price}</Text>
                                    </View>
                                </Item>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                            <Text style={{ color: "#666", fontSize: 20 }}>No Results</Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
}
