import { useContext, useRef, useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { SecurityContext } from "../navs/SecurityContext";
import ip from "../ip";
import { IProfile } from "../types/types";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { Button, Icon } from "@rneui/themed";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteParams } from "../navs/ProfileNav";
import EditButton from "../components/EditButton";

type ProfileScreenProps = {
    navigation: StackNavigationProp<RouteParams, "Profile">;
    route: RouteProp<RouteParams, "Profile">;
};

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
    const { user, setUser } = useContext(SecurityContext);
    const [profile, setProfile] = useState<IProfile>();
    const [emailInput, setEmailInput] = useState("");
    const emailRef = useRef<TextInput>(null);
    const [addressInput, setAddressInput] = useState("");
    const addressRef = useRef<TextInput>(null);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        refreshProfile();
    }, []);

    useEffect(() => {
        setChanged(true);
    }, [emailInput, addressInput]);

    useEffect(() => {
        if (route.params) {
            refreshProfile();
        }
    }, [route.params]);

    const renderDeleteButton = (id: string) => (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "red",
                marginTop: 10,
                marginRight: 5,
                borderRadius: 10,
                width: 75,
            }}
        >
            <TouchableOpacity onPress={() => deleteCard(id)}>
                <Icon name="delete" type="feather" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );

    const deleteCard = (id: string) => {
        fetch(`${ip}/profile/card/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setProfile(data));
    };

    const refreshProfile = () => {
        fetch(`${ip}/profile`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            // TODO: Check response status for errors
            .then((res) => res.json())
            .then((data) => {
                setProfile(data);
                setEmailInput(data.email);
                setAddressInput(data.address);
                setChanged(false);
            });
    };

    const updateProfile = () => {
        setChanged(false);
        fetch(`${ip}/profile`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: emailInput, address: addressInput }),
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#222" }}>
            <Text style={{ color: "white", fontSize: 40, fontWeight: "600", paddingLeft: 5 }}>{user.username}</Text>
            {profile ? (
                <>
                    <EditButton handlePress={() => emailRef.current?.focus()}>
                        <TextInput
                            value={emailInput}
                            onChangeText={setEmailInput}
                            style={styles.inputs}
                            ref={emailRef}
                        />
                    </EditButton>
                    <EditButton handlePress={() => addressRef.current?.focus()}>
                        <TextInput
                            value={addressInput}
                            onChangeText={setAddressInput}
                            style={styles.inputs}
                            ref={addressRef}
                        />
                    </EditButton>
                    {changed && (
                        <Button
                            title="Save"
                            onPress={updateProfile}
                            disabled={!changed}
                            icon={{ name: "save", type: "feather", color: "white" }}
                        />
                    )}
                    <View
                        style={{
                            flexDirection: "row",
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: "#444",
                            height: 50,
                            alignItems: "center",
                            marginTop: 5,
                        }}
                    >
                        <Icon name="creditcard" type="antdesign" color="white" style={{ paddingLeft: 5 }} />
                        <Text style={{ color: "white", fontSize: 20, paddingLeft: 5 }}>Cards</Text>
                    </View>
                    <ScrollView>
                        {Object.keys(profile.cards).map((key, i) => {
                            const card = profile.cards[key];
                            return (
                                <Swipeable key={i} renderRightActions={() => renderDeleteButton(key)}>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            backgroundColor: "#444",
                                            marginTop: 10,
                                            marginHorizontal: 5,
                                            padding: 10,
                                            borderRadius: 10,
                                        }}
                                    >
                                        <Text style={{ color: "white" }}>{card.name}</Text>
                                        <Text style={{ color: "white", marginHorizontal: 10 }}>
                                            #: •••• {card.number.toString().slice(-4)}
                                        </Text>
                                        <Text style={{ color: "white" }}>Exp: {card.exp}</Text>
                                    </View>
                                </Swipeable>
                            );
                        })}
                    </ScrollView>
                    <Button
                        title="Add Card"
                        onPress={() => navigation.navigate("Card")}
                        icon={{ name: "creditcard", type: "antdesign", color: "white" }}
                    />
                    <Button
                        title="Sign Out"
                        onPress={() => setUser({ username: "", token: "" })}
                        buttonStyle={{ paddingBottom: 40, marginTop: 10 }}
                        icon={{ name: "logout", type: "simple-line-icon", color: "white" }}
                    />
                </>
            ) : (
                <Text style={{ color: "white", fontSize: 20 }}>Loading...</Text>
            )}
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    inputs: {
        color: "white",
        fontSize: 20,
        padding: 5,
    },
});
