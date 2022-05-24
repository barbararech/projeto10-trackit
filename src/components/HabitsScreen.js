import { useContext } from "react";
import UserContext from "../context/UserContext";

import Header from "./Header";
// import Footer from "./Footer";

export default function HabitsScreen(){
    const { user, setUser } = useContext(UserContext);
    
    return(
        <Header/>
    )
}