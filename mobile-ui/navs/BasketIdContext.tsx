import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch, SetStateAction, createContext, useEffect } from "react";
import { useState } from "react";

interface BasketIdContextType {
    basketId: string;
    setBasketId: Dispatch<SetStateAction<string>>;
}

export const BasketId = createContext<BasketIdContextType>({ basketId: "new", setBasketId: () => {} });

const BasketIdProvider = ({ children }: { children: JSX.Element }) => {
    const [basketId, setBasketId] = useState("new");

    useEffect(() => {
        AsyncStorage.setItem("FINAL::BASKET_ID", `${basketId}`);
    }, [basketId]);

    useEffect(() => {
        AsyncStorage.getItem("FINAL::BASKET_ID").then((value) => {
            if (value) {
                setBasketId(value);
            }
        });
    }, []);

    return <BasketId.Provider value={{ basketId, setBasketId }}>{children}</BasketId.Provider>;
};

export default BasketIdProvider;
