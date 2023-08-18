import { useContext } from "react";
import { SecurityContext } from "../navs/SecurityContext";
import AuthNav from "../navs/AuthNav";
import ProfileNav from "../navs/ProfileNav";

const MainScreen = () => {
    const { user } = useContext(SecurityContext);

    return user.username === "" ? <AuthNav></AuthNav> : <ProfileNav></ProfileNav>;
};

export default MainScreen;
