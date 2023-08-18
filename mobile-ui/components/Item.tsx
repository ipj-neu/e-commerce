import { Text, View, Animated, ViewStyle, StyleSheetProperties } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { IItem } from "../types/types";

export default function Item({
    itemId,
    name,
    description,
    button,
    height,
    children,
}: IItem & {
    button: (
        progress: Animated.AnimatedInterpolation<string | number>,
        dragX: Animated.AnimatedInterpolation<string | number>
    ) => React.ReactNode;
    height?: number | string;
    children?: JSX.Element;
}) {
    return (
        <Swipeable renderRightActions={button}>
            <View
                style={{
                    // width: ScreenWidth.valueOf() / 2 - 10,
                    marginVertical: 5,
                    backgroundColor: "#444",
                    padding: 10,
                    borderRadius: 15,
                    marginHorizontal: 5,
                    height: height,
                }}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>{name}</Text>
                <Text style={{ color: "white" }}>{description}</Text>
                {children}
            </View>
        </Swipeable>
    );
}
