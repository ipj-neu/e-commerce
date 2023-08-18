import { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Button, KeyboardAvoidingView } from "react-native";
import * as Crypto from "expo-crypto";
import ip from "../ip";
import { SecurityContext } from "../navs/SecurityContext";

const SignUp = () => {
    const { user, setUser } = useContext(SecurityContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [msg, setMsg] = useState("");

    const submit = async () => {
        if (password === confPassword) {
            setMsg("");

            // const safePassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512, password);
            const safePassword = password;

            const newUser = {
                username: username,
                email: email,
                address: address,
                password: safePassword,
            };

            fetch(`${ip}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            }).then((res) => {
                if (res.ok) {
                    res.text().then((data) => setUser({ username: username, token: data }));
                } else if (res.status === 409) {
                    setMsg("Username already taken");
                }
            });
        } else {
            setMsg("Passwords do not match");
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#222" }}
            behavior="padding"
        >
            <Text style={{ color: "white", fontSize: 30, fontWeight: "600" }}>Sign Up</Text>
            <TextInput
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                textContentType="username"
            />
            <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                inputMode="email"
                textContentType="emailAddress"
            />
            <TextInput
                value={address}
                onChangeText={(text) => setAddress(text)}
                style={styles.input}
                placeholder="Address"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                textContentType="fullStreetAddress"
            />
            <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry={true}
            />
            <TextInput
                value={confPassword}
                onChangeText={(text) => setConfPassword(text)}
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry={true}
            />
            <Button title="Submit" onPress={submit} />
            <Text style={{ color: "white" }}>{msg}</Text>
        </KeyboardAvoidingView>
    );
};

export default SignUp;

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
