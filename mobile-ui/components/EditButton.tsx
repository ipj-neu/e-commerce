import { Icon } from "@rneui/themed";
import { View, TouchableOpacity } from "react-native";

const t;
const EditButton = ({ handlePress, children }: { handlePress: () => void; children?: JSX.Element }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            {children}
            <TouchableOpacity onPress={handlePress}>
                <Icon name="edit-2" type="feather" color="white" style={{ padding: 5 }} />
            </TouchableOpacity>
        </View>
    );
};

export default EditButton;
