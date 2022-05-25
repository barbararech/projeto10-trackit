import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";

export default function HistoryScreen() {
   
    return (
        <Container>
            <Header />
            <MyHabitsTop>
                <h2>Histórico</h2>
                <span>Em breve você poderá ver o histórico dos seus hábitos aqui!</span>
            </MyHabitsTop>
            <Menu />
        </Container>
    )
}

const Container = styled.div`
    background-color: #f2f2f2; 
    height: 100vh;
    padding: 0 18px;

    span{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 18px;
        color: #666666;
        line-height: 22px;
    }
`
const MyHabitsTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 28px;
    
    h2{
        margin-top:112px;
        margin-bottom: 17px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 23px;
        color: #126BA5;
    }
`

