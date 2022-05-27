import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Header(){

    const { user } = useContext(UserContext);

    return(
        <Container>
            <h1>TrackIt</h1>
            <img src={user.image} alt="User" />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 10px 0px;
    width: 100%;
    height: 70px; 
    position:fixed;
    top:0;
    right:0;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index:1;    

    *{
        box-sizing: border-box;
    }

    h1{
        font-family: 'Playball', cursive;
        font-size: 40px;
        color:#ffffff;
        margin-left:18px
    }

    img{
        width: 51px;
        height: 51px;
        border-radius: 98px;
        margin-right:18px;
    }
`
