import { Text, View, TouchableOpacity, LayoutAnimation, Animated, Easing } from "react-native";
import { IItem } from "../types/types";
import { useRef, useState } from "react";

export default function Item({
    itemId,
    name,
    description,
    button,
    children,
}: IItem & {
    button: () => React.ReactNode;
    children?: JSX.Element;
}) {
    const [expanded, setExpanded] = useState(false);

    const handlePress = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <TouchableOpacity activeOpacity={1} onPress={handlePress}>
            <View
                style={{
                    marginVertical: 5,
                    backgroundColor: "#444",
                    padding: expanded ? 20 : 10,
                    borderRadius: 15,
                    marginHorizontal: 5,
                }}
            >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: expanded ? 30 : 15 }}>{name}</Text>
                {expanded && <Text style={{ color: "white", marginVertical: 15 }}>{description}</Text>}
                {children}
                {expanded && button()}
            </View>
        </TouchableOpacity>
    );
}
