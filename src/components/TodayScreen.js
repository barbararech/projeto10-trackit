import { useContext } from "react";
import UserContext from "../context/UserContext";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import locale from "dayjs/locale/pt-br";

import Header from "./Header";
import Menu from "./Menu";

export default function TodayScreen() {
    const { user } = useContext(UserContext);
    const token = user.token;
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const now = dayjs().format("DD/MM");
    const nowWeekday = dayjs().locale("pt-br").format("dddd");

    const [todayHabits, setTodayHabits] = useState([]);

    const [isChecked, setIsChecked] = useState(false);
    const [idChecked, setIdChecked] = useState([]);

    function MountHabitsTop() {
        return (
            <>
                <MyHabitsTop>
                    <h2>{nowWeekday.charAt(0).toUpperCase() + nowWeekday.slice(1)}, {now}</h2>
                    <span>Nenhum hábito concluído ainda</span>
                </MyHabitsTop>
            </>
        )
    }

    function GetListTodayHabits() {
        useEffect(() => {
            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

            promise.then((response) => {
                const { data } = response;
                setTodayHabits(data);
                console.log("oiiiiiii")
            });

            promise.catch(err => {
                const message = err.response.statusText;
                alert(message);
            });
        }, []);

    }

    function MountTodayHabits() {
        const todayHabit = todayHabits.map((item, index) => {
            return (
                <>
                    <HabitContainer>
                        <InfoTodayHabits>
                            <h5>{item.name}</h5>
                            <span>Sequência atual: {item.currentSequence}</span>
                            <span>Seu recorde: {item.highestSequence}</span>
                        </InfoTodayHabits>
                        <ButtonCheck type="button" key={item.id} id={item.id} idChecked={idChecked} onClick={(event) => CheckHabit(item.id, event)}>
                            <ion-icon name="checkbox"></ion-icon>
                        </ButtonCheck >
                    </HabitContainer>
                </>
            )
        });

        if (todayHabits.length > 0) {
            return (
                todayHabit
            );
        } else {
            return (
                <span>Carregando...</span>
            );
        }
    }

    function CheckHabit(id, event) {
        const checked = idChecked.some(e => e === id);
        if (!checked) {
            console.log(isChecked)
            setIsChecked(true);
            setIdChecked([...idChecked, id])
            CheckHabitAPI(id, event);
        } else {
            // console.log("ta coisado ja")
            setIsChecked(false);
            const newChecked = idChecked.filter(e => e !== id);
            setIdChecked(newChecked);
            // UncheckHabitAPI(id, event);
        }
    }
    console.log(idChecked)

    function CheckHabitAPI(id, event) {
        event.preventDefault();
        console.log(config)
        console.log(id)
        console.log(todayHabits)
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, config);

        promise.then(() => {
            console.log("marcouuuu")
        })

        promise.catch(err => {
            const message = err.response.statusText;
            alert(message);
            console.log("NAOOOOO marcouuuu")
        })
    }

    // function UncheckHabitAPI(id, event){
    //     event.preventDefault();

    //     const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, config);

    //     promise.catch(err => {
    //         const message = err.response.statusText;
    //         alert(message);
    //     })
    // }


    return (
        <Container>
            <Header />
            {MountHabitsTop()}
            {GetListTodayHabits()}
            {MountTodayHabits()}
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
`

const MyHabitsTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 28px;
    
    h2{
        margin-top:112px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 23px;
        color: #126BA5;
    }

    span{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 18px;
        color: #BABABA;
        line-height: 22px;
    }
`

const HabitContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding:13px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-bottom:29px;
    font-family: 'Lexend Deca', sans-serif;

    *{
        box-sizing: border-box;
    }
`

const ButtonCheck = styled.button`

    border:none;
    cursor:pointer;
    background-color: #FFFFFF;
        
    ion-icon{
        font-size:75px;
        color: #${props => ((props.idChecked.find((e) => e === props.id)) === undefined) ? "E7E7E7" : "8FC549 "};
        margin: -8px;
    }
`

const InfoTodayHabits = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Lexend Deca', sans-serif;

    *{
        box-sizing: border-box;
    }

    h5{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 20px;
        color: #666666;
        line-height: 25px;
        margin-bottom:7px;
    }

    span{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 13px;
        color: #666666;
        line-height: 16px;
    }
`

