import React from 'react';
import { ThreeDots } from  'react-loader-spinner'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Logo from '../assets/images/logo.png'

export default function LoginScreen(){

    const [token, setToken] = useState("");
    const [enable, setEnable] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function Login(event){
        event.preventDefault(); 
        setEnable(false);

        const body = {
            email,
            password
          };

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body);
    
        promise.then((response) => {
            const {data} = response;
            setToken(data.token);
            navigate("/hoje", {state: {token}});
            console.log(data)
        });
        
        promise.catch(err => {
            const message = err.response.statusText;
            alert(message);
            setEnable(true);
        })
    }

    function LoginForm() {
        return (
          <>
            <input type="email" id="email" value={email} placeholder="email" required
                onChange={e => setEmail(e.target.value)}
            />
            <input type="password" id="password" value={password} placeholder="password" required
                onChange={e => setPassword(e.target.value)}
            />
            {enable ? <button type="submit">Entrar</button> : <button type="submit"><ThreeDots width={303} height={15}  color={"#FFFFFF"}/></button>
            }
          </>
        )
      }

    return(
        <Container>
            <img src={Logo} alt="logo" />
            <LoginForms enable={enable} onSubmit={Login}>
                {LoginForm()}
            </LoginForms>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%; 
  margin-top: 68px;
  font-family: 'Lexend Deca', sans-serif;
    
  *{
    box-sizing: border-box;
    }

  img{
      width: 180px;
      height:179px;
  };

  a{
      color:#52B6FF;
      margin-top: 25px;
  };

`

const LoginForms = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top:32px;

  input{
      width: 303px;
      height: 45px;
      font-family: 'Lexend Deca', sans-serif;
      font-size: 20px;
      color:#666666;
      padding: 10px;
      outline: none;
      background: ${props => props.enable ? '#FFFFFF' : '#F2F2F2'};
      border: 1px solid #D4D4D4;
      border-radius: 5px;
      margin-bottom:6px;
      pointer-events: ${props => props.enable ? 'auto' : 'none'};

      ::placeholder{
        color: ${props => props.enable ? '#DBDBDB' : '#AFAFAF'};
        opacity: 1;
      };
  };

  button{
    width: 303px;
    height: 45px;
    color: #FFFFFF;
    background: #52B6FF;
    border:none;
    border-radius: 5px;
    text-decoration: none;
    font-size:20px;
    font-family: 'Lexend Deca', sans-serif;
    pointer-events: ${props => props.enable ? 'auto' : 'none'};
  };
`
