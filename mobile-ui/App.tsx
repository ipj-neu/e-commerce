import BasketIdProvider from "./navs/BasketIdContext";
import SecurityProvider from "./navs/SecurityContext";
import MainScreen from "./screens/MainScreen";

export default function App() {
    return (
        <BasketIdProvider>
            <SecurityProvider>
                <MainScreen></MainScreen>
            </SecurityProvider>
        </BasketIdProvider>
    );
}
