import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useState, useEffect } from 'react';
import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import Header from "./Header";
import Menu from "./Menu";

export default function HabitsScreen() {
    const { user } = useContext(UserContext);
    const token = user.token;

    const [enable, setEnable] = useState(true);
    const [clicked, setClicked] = useState(false);

    const [name, setName] = useState("");
    const [days, setDays] = useState([]);
    const [myHabits, setMyHabits] = useState([]);

    const weekdays = [{ day: "D" }, { day: "S" }, { day: "T" }, { day: "Q" }, { day: "Q" }, { day: "S" }, { day: "S" }];

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    function MountHabitsTop() {
        return (
            <>
                <MyHabitsTop>
                    <h2>Meus Hábitos</h2>
                    <button onClick={() => setClicked(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                        </svg>
                    </button>
                </MyHabitsTop>
                {MountAddHabits()}
            </>
        )
    }

    function MountAddHabits() {
        const buttonsWeekday = weekdays.map((weekday, index) => {
            return (
                <ButtonWeekday type="button" enable={enable} key={index} id={index} days={days} onClick={() => SetWeekdays(index)}>{weekday.day}</ButtonWeekday >
            );
        });

        if (clicked) {
            return (
                <HabitContainer enable={enable} onSubmit={AddHabits}>
                    <input type="text" id="name" value={name} placeholder="nome do hábito" required
                        onChange={e => setName(e.target.value)}
                    />
                    <Grid>
                        {buttonsWeekday}
                    </Grid>
                    <ActionButtons enable={enable}>
                        <button className="cancel" onClick={() => setClicked(false)}>Cancelar</button>
                        {enable ? <button type="submit">Salvar</button> : <button type="submit"><ThreeDots width={303} height={15} color={"#FFFFFF"} /></button>}
                    </ActionButtons>
                </HabitContainer>
            )
        }
    }

    function SetWeekdays(index) {
        const selected = days.some(day => day === index);
        if (!selected) {
            setDays([...days, index]);
        } else {
            const newSelected = days.filter(day => day !== index);
            setDays(newSelected);
        }
    }

    function AddHabits(event) {
        event.preventDefault();
        setEnable(false);

        const body = {
            name,
            days
        };

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);

        promise.then((response) => {
            const { data } = response;
            setName("");
            setDays([]);
            setClicked(false);
            setEnable(true);
            setMyHabits([...myHabits, data])
        });

        promise.catch(err => {
            const message = err.response.statusText;
            alert(message);
            setEnable(true);
        })
    }

    function GetListHabits() {
        useEffect(() => {
            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

            promise.then((response) => {
                const { data } = response;
                setMyHabits(data);
            });

            promise.catch(err => {
                const message = err.response.statusText;
                alert(message);
            });
        }, []);

    }

    function MountListHabits() {

        const habits = myHabits.map((item, index) => {
            const buttonsWeekday = weekdays.map((weekday, index) => {
                return (
                    <ButtonWeekday type="button" enable={enable} key={index} id={index} days={item.days.map((e) => e)}>{weekday.day}</ButtonWeekday >
                );
            });

            return (
                <>
                    <HabitContainer>
                        <HabitHeader>
                            <span>{item.name}</span>
                            <ion-icon name="trash-outline"></ion-icon>
                        </HabitHeader>
                        <Grid>
                            {buttonsWeekday}
                        </Grid>
                    </HabitContainer>
                </>
            );
        });

        if (myHabits.length > 0) {
            return (
                habits
            )
        } else {
            return (
                <span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span>
            )
        }
    }


    return (
        <Container>
            <Header />
            {MountHabitsTop()}
            {GetListHabits()}
            {MountListHabits()}
            <Menu />
        </Container>
    )
}

const Container = styled.div`
    background-color: #f2f2f2; 
    min-height: 100vh;
    padding: 0 18px;
    margin-bottom: 75px; 


    :-moz-last-node{
        padding-bottom:20px;
    }

    span{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 18px;
        color: #666666;
        line-height: 22px;
    }


`
const MyHabitsTop = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    
    h2{
        margin-top:112px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 23px;
        color: #126BA5;
    }

    svg{
        margin-top:112px;
        width:40px;
        height:35px;
        color:#52B6FF;
        cursor: pointer;
    }

    button{
        border:none;
        background-color: #f2f2f2;
    }
`

const HabitContainer = styled.form`
    display: flex;
    flex-direction: column;
    padding:18px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-bottom:29px;
    font-family: 'Lexend Deca', sans-serif;

    *{
        box-sizing: border-box;
    }

    input{
        width: 100%;
        height: 45px;
        background: ${props => props.enable ? '#FFFFFF' : '#F2F2F2'};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        color:#666666;
        padding: 10px;
        outline: none;
        pointer-events: ${props => props.enable ? 'auto' : 'none'};
        align-items: flex-start;
    }
   

    ::placeholder{
        color: ${props => props.enable ? '#DBDBDB' : '#AFAFAF'};
        opacity: 1;
};
`
const Grid = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-top: 8px;
    align-items: flex-start;
`
const ButtonWeekday = styled.button`
        width: 30px;
        height: 30px;
        background: #${props => ((props.days.find((e) => e === props.id)) === undefined) ? "FFFFFF" : "CFCFCF"};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        color: #${props => ((props.days.find((e) => e === props.id)) === undefined) ? "DBDBDB" : "FFFFFF"};
        margin-right: 4px;
        cursor:pointer;
        pointer-events: ${props => props.enable ? 'auto' : 'none'};
`

const ActionButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:flex-end;
    margin-top: 29px;

    button{
        width: 84px;
        height: 35px;
        border:none;
        background-color: #52B6FF;
        border-radius: 5px;
        color:#FFFFFF;
        font-size: 16px;
        opacity: ${props => props.enable ? '1' : '0.7'};
        margin-left:15px;
        pointer-events: ${props => props.enable ? 'auto' : 'none'};
        cursor:pointer;
    }

    .cancel{
        background: #FFFFFF;
        color: #52B6FF;
    }
`
const HabitHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-between;

    ion-icon{
        font-size:20px;
        color: #666666;
        cursor:pointer;
    }
`