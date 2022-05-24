import { useContext } from "react";
import UserContext from "../context/UserContext";
import styled from "styled-components";

import Header from "./Header";
import Menu from "./Menu";

export default function HistoryScreen(){
    const { user, setUser } = useContext(UserContext);
    
    return(
        <Container>
            <Header/>
            <Menu/>
        </Container>
    )
}

const Container = styled.div`
    background-color: #f2f2f2; 
    height: 100vh;
`