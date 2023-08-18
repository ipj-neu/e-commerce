import { View, Button, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { RouteParams } from "../navs/ProfileNav";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { useState, useContext } from "react";
import { ICard } from "../types/types";
import ip from "../ip";
import { SecurityContext } from "../navs/SecurityContext";

type AddCardScreenProps = {
    navigation: StackNavigationProp<RouteParams, "Card">;
    route: RouteProp<RouteParams, "Card">;
};

const AddCardScreen = ({ navigation }: AddCardScreenProps) => {
    const { user } = useContext(SecurityContext);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [ccv, setCcv] = useState("");
    const [exp, setExp] = useState("");
    const [msg, setMsg] = useState("");

    const handleSave = () => {
        // TODO: maybe write some kind of credit card validation
        if (name != "" && number != "" && ccv != "" && exp != "") {
            const card: ICard = {
                name: name,
                number: number,
                ccv: Number(ccv),
                exp: exp,
            };

            fetch(`${ip}/profile/card`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(card),
            });

            navigation.navigate("Profile", {
                card: card,
            });
        } else {
            setMsg("Please enter all fields");
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#222" }}>
            <Text style={{ color: "white", fontSize: 30, fontWeight: "600", margin: 10 }}>Add Card</Text>
            {/* TODO: make sure that the inputs for ccv and exp are correct, maybe somehow add a date selector */}
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Name"
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                value={number}
                onChangeText={setNumber}
                textContentType="creditCardNumber"
                placeholder="Number"
                placeholderTextColor="#aaa"
                autoComplete="cc-number"
            />
            <TextInput
                style={styles.input}
                value={ccv}
                onChangeText={setCcv}
                placeholder="CCV"
                placeholderTextColor="#aaa"
                inputMode="numeric"
            />
            <TextInput
                style={styles.input}
                value={exp}
                onChangeText={setExp}
                placeholder="Expiration Date"
                placeholderTextColor="#aaa"
            />
            <Button title="Save" onPress={handleSave} />
            <Text style={{ color: "white", margin: 5 }}>{msg}</Text>
        </View>
    );
};

export default AddCardScreen;

const styles = StyleSheet.create({
    input: {
        color: "#aaa",
        backgroundColor: "#444",
        padding: 8,
        width: 200,
        margin: 5,
        borderRadius: 5,
    },
});
