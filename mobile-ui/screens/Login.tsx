import { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView } from "react-native";
import ip from "../ip";
import { SecurityContext } from "../navs/SecurityContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RouteProps = StackNavigationProp<{ SignUp: undefined }>;

const LoginScreen = () => {
    const navigation = useNavigation<RouteProps>();
    const { user, setUser } = useContext(SecurityContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        fetch(`${ip}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.text().then((token) => {
                    const newUser = {
                        username: username,
                        token: token,
                    };
                    if (setUser) {
                        setUser(newUser);
                    }
                });
            }
        });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#222" }}
            behavior="padding"
        >
            <Text style={{ color: "white", fontSize: 30, fontWeight: "600" }}>Login</Text>
            <View>
                <TextInput
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#222"
                    autoCapitalize="none"
                    textContentType="username"
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#222"
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
            </View>
            <Button title="Login" onPress={login} />
            <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#444",
        padding: 8,
        width: 200,
        margin: 5,
        borderRadius: 5,
    },
});
