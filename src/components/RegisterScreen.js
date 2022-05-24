import React from 'react';
import { ThreeDots } from  'react-loader-spinner'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Logo from '../assets/images/logo.png'

export default function LoginScreen(){

    const [enable, setEnable] = useState(true);

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
      });

    const navigate = useNavigate();

    function Register(event){
        event.preventDefault(); 
        setEnable(false);

        const body = {
            email: form.email,
            name: form.name,
            image: form.image,
            password: form.password,
          };

          console.log(form.email)
          console.log(form.password)
          console.log(form.name)
          console.log(form.image)
          console.log(body)
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body);
          
        promise.then((response) => {
            const {data} = response;
            navigate("/");
            console.log(data);
        });
        
        promise.catch(err => {
            const message = err.response.statusText;
            alert(message);
            setEnable(true);
        })
    }

    function handleForm (e) {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        }) 
      }

    function RegisterForm() {
        return (
          <>
            <input type="email" id="email" name="email" value={form.email} placeholder="email" required onChange={handleForm}/>
            <input type="password" id="password" name="password" value={form.password} placeholder="password" required onChange={handleForm}/>
            <input type="text" id="name" name="name" value={form.name} placeholder="name" required onChange={handleForm}/>
            <input type="url" id="image"  name="image" value={form.image} placeholder="image" required onChange={handleForm}/>

            {enable ? <button type="submit">Cadastrar</button> : <button type="submit"><ThreeDots width={303} height={15}  color={"#FFFFFF"}/></button>
            }
          </>
        )
      }

    return(
        <Container>
            <img src={Logo} alt="logo" />
            <LoginForms enable={enable} onSubmit={Register}>
                {RegisterForm()}
            </LoginForms>
            <Link to="/">Já tem uma conta? Faça login!</Link>
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
