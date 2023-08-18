import { Dispatch, SetStateAction, createContext, useContext, useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../types/types";

interface SecurityContextType {
    user: IUser;
    setUser: Dispatch<SetStateAction<IUser>>;
}

const defaultState: IUser = {
    username: "",
    token: "",
};

export const SecurityContext = createContext<SecurityContextType>({ user: defaultState, setUser: () => {} });

const SecurityProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<IUser>(defaultState);

    useEffect(() => {
        AsyncStorage.setItem("FINAL::SECURITY", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        AsyncStorage.getItem("FINAL::SECURITY").then((value) => {
            if (value) {
                setUser(JSON.parse(value));
            }
        });
    }, []);

    return <SecurityContext.Provider value={{ user, setUser }}>{children}</SecurityContext.Provider>;
};

export default SecurityProvider;
