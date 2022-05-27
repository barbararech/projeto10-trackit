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

    const [idChecked, setIdChecked] = useState([]);

    const percentage = (idChecked.length / todayHabits.length)*100;


    function MountHabitsTop() {

        const subtitle = () => {
            if(idChecked.length === 0){
                return(<span>Nenhum hábito concluído ainda</span>)
            } else{
                return(<span>{percentage.toFixed()}% dos hábitos concluídos </span>)
            }
        }

        return (
            <>
                <MyHabitsTop idChecked={idChecked}>
                    <h2>{nowWeekday.charAt(0).toUpperCase() + nowWeekday.slice(1)}, {now}</h2>
                    {subtitle()}
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
            });

            promise.catch(err => {
                const message = err.response.statusText;
                alert(message);
            });
        }, []);

    }

    function MountTodayHabits() {
        const todayHabit = todayHabits.map((item, index) => {
            if(item.done === true && idChecked.includes(item.id) === false){
                setIdChecked([...idChecked, item.id])
            }
            return (
                <>
                    <HabitContainer>
                        <InfoTodayHabits id={item.id} idChecked={idChecked} highestSequence={item.highestSequence} currentSequence={item.currentSequence}  >
                            <h5>{item.name}</h5>
                            <span>Sequência atual: <span className="progress">{item.currentSequence} dia(s) </span></span>
                            <span>Seu recorde: <span className="record">{item.highestSequence} dia(s) </span></span>
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
        }
    }

    function CheckHabit(id, event) {
        const body = {
            id,
        };
        const checked = idChecked.some(e => e === id);

        if (!checked) {
            setIdChecked([...idChecked, id])
            CheckHabitAPI(id, event, body);
        } else {
            const newChecked = idChecked.filter(e => e !== id);
            setIdChecked(newChecked);
            UncheckHabitAPI(id, event, body);
        }
    }
    console.log(idChecked)

    function CheckHabitAPI(id, event, body) {
        event.preventDefault();
        
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, body, config);
        
        promise.then((response) => {
            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)

            promise.then((response) => {
                const { data } = response;
                setTodayHabits(data);
            });
        });

        promise.catch(err => {
            const message = err.response.statusText;
            alert(message);
        })
    }

    function UncheckHabitAPI(id, event, body){
        event.preventDefault();

        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, body, config);

        promise.then((response) => {
            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)

            promise.then((response) => {
                const { data } = response;
                setTodayHabits(data);
                const newChecked = idChecked.filter(e => e !== id);
                setIdChecked(newChecked);
            });
        });

        promise.catch(err => {
            const message = err.response.statusText;
            alert(message);
        })
    }


    return (
        <Container>
            <Header />
            {MountHabitsTop()}
            {GetListTodayHabits()}
            {MountTodayHabits()}
            <Menu percentage={percentage}/>
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
        margin-bottom: 5px;
    }

    span{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 18px;
        color: #${props => (props.idChecked.length === 0) ? "BABABA" : "8FC549"};
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

    .progress{
        color: #${props => ((props.idChecked.find((e) => e === props.id)) === undefined) ? "666666" : "8FC549 "};
    }

    .record{
        color: #${props => (props.highestSequence === props.currentSequence && props.highestSequence !== 0) ? "8FC549" : "666666"};
    }
`

