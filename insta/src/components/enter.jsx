import axios from "axios";
import { api } from "./function";
import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Enter = () => {
    const history = useNavigate();
    if (localStorage.getItem('token') != null) {
        history('/lenta');
    }
    document.body.style.backgroundColor='white';
    console.log('local', localStorage.getItem('token'))
    const [login, setLogin] = useState();
    const [pass, setPass] = useState();
    const postData = async () => {
        const form = new FormData();
        form.append('login', login);
        form.append('pass', pass);
        console.log(form)
        const Login = await axios({
            method: "post",
            data: form,
            url: "https://sstss.ru/enter/login",
            config: {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        }
        );
        console.log(Login);
        if (Login != null) {
            if (Login.status == 200) {
                console.log(Login.data.user.id);
                localStorage.setItem('token', Login.data.user.id)
                console.log('local', localStorage.getItem('token'))
                history('/lenta');

            } else {
                alert("Error!");
            }
        }

    }
    return (
        <div class="d-md-flex justify-content-center ">
            <div class="col-md-4 col-sm-12 ">
                <div class="d-md-flex justify-content-center mb-2">
                    <img width="250" alt="" class="pt-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" />
                </div>
                <h1 class="font-weight-bold my-5 text-center">INSTAGRAM</h1>
                <div class="form-group">
                    {/* <input type="text" class="form-control form-control-lg mb-2 field" onChange={(e) => { setLogin(e.target.value) }} placeholder="Телефон, имя пользователя или эл.адрес"
                        style={{
                            Width: '100 %',
                            Height: '56px',
                            borderRadius: '4px',
                            Position: 'relative',
                            backgroundColor: '#EFEFEF',
                            Transition: '0.3s all',
                        }}
                    />
                    <input type="password" class="form-control form-control-lg" onChange={(e) => { setPass(e.target.value) }} aria-describedby="passwordlHelp" placeholder="Пароль"
                        style={{
                            Width: '100 %',
                            Height: '56px',
                            borderRadius: '4px',
                            Position: 'relative',
                            backgroundColor: '#EFEFEF',
                            Transition: '0.3s all',
                        }}
                    /> */}
                    <label for="inp" class="inp">
                        <input type="text" id="inp" placeholder="&nbsp;" onChange={(e) => { setLogin(e.target.value) }}/>
                        <span class="label">Имя пользователя</span>
                        <span class="focus-bg"></span>
                    </label>
                    <label for="inp" class="inp">
                        <input type="password" id="inp" placeholder="&nbsp;" onChange={(e) => { setPass(e.target.value) }} />
                        <span class="label">Пароль</span>
                        <span class="focus-bg"></span>
                    </label>
                </div>
                <p class="text-right forgot"><a href="a">Забыли пароль?</a></p>
                <button class="button-82-pushable" onClick={postData} role="button">
                    <span class="button-82-shadow"></span>
                    <span class="button-82-edge"></span>
                    <span class="button-82-front text text-center">
                        Войти
                    </span>
                </button>
                <p class="text-center my-3 font-weight-bold ">Или</p>
                <div class="text-center font-weight-bold ml-4" ><i class="fab fa-facebook-square text-primary"></i><Link class="ml-1" to="https://www.facebook.com">Войти через Facebook</Link></div>
                <small><p class="text-center ml-4 mt-5"><span>У вас нет аккаунта?</span><Link to="/registrade" >Зарегистрируйтесь.</Link></p></small>
            </div>
        </div>

    );
}
export default Enter;
