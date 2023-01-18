import axios from "axios";
import React, { useEffect, useState } from "react";
import { message } from 'antd';
import { api } from "./function";
import { Link, useNavigate } from "react-router-dom";

const Registrade = () => {
    const history = useNavigate();
    if (localStorage.getItem('token') != null) {
        history('/lenta');
    }
    const [login, setLogin] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [cellnumber, setCellumber] = useState();
    const [pass, setPass] = useState();
    const [avatar, setAvatar] = useState([]);
    const [confirm, setConfirm] = useState();
    const check = async () => {
        const form = new FormData();
        form.append('login', login);
        const Login = await axios({
            method: "post",
            data: form,
            url: "" + api + "/check/logincheck",
            config: {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        }
        );
        console.log(Login);
        if (Login != null) {
            console.log(Login.data.status);
            if (Login.data.status === 200) {
                message.error('Данная имя пользователя занята выбирите другой!');
            } else if (Login.data.status === 407) {
                if (login == '' || login == null) {
                    message.error('Заполните поле логин');
                }
                else if (firstname == '' || firstname == null) {
                    message.error('Заполните поле имя');
                }
                else if (lastname == '' || lastname == null) {
                    message.error('Заполните поле фамилия');
                }
                else if (cellnumber == '' || cellnumber == null) {
                    message.error('Заполните поле номера');
                }
                else if (pass == '' || pass == null) {
                    message.error('Заполните поле пароль');
                }
                else if (pass.length < 8) {
                    message.error('Пароль должен состоять не менне чем из 8 символов');
                }
                else if (pass == confirm) {
                    const form = new FormData();
                    form.append('login', login);
                    form.append('firstname', firstname);
                    form.append('lastname', lastname);
                    form.append('cellnumber', cellnumber);
                    form.append('pass',pass);
                    form.append('avatar',avatar);
                    const Regis = await axios({
                        method: "post",
                        data: form,
                        url:api+"/registrations/registrade",
                        config: {
                            headers: {
                              "Content-type": "multipart/form-data"
                            }
                          }
                    }
                    );
                    console.log(Regis);

                    if (Regis != null) {
                        if (Regis.status == 200) {
                            message.success('Созданна новая учетная запись');
                            history('/');
                        } else {
                            alert("Error!");
                        }
                    }

                } else {
                    message.error('Пароль не совпадает');
                }

            }
        }

    }

    return (
        <div class="row bg-light" >
            <div className="col-3"></div>
            <div class="col-6 border bg-white">
                <div class="d-md-flex justify-content-center mb-2">
                    <img width="250" alt="" class="pt-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" />
                </div>
                <h1 class="font-weight-bold my-5 text-center">INSTAGRAM</h1>
                <div class="form-group">
                    <input type="text" class="form-control form-control-lg mb-2" onChange={(e) => { setLogin(e.target.value) }} aria-describedby="textlHelp" placeholder="Имя пользователя или эл.адрес" />
                    <input type="text" class="form-control form-control-lg mb-2" onChange={(e) => { setFirstname(e.target.value) }} aria-describedby="textlHelp" placeholder="Имя" />
                    <input type="text" class="form-control form-control-lg mb-2" onChange={(e) => { setLastname(e.target.value) }} aria-describedby="textlHelp" placeholder="Фамилия" />
                    <input type="text" class="form-control form-control-lg mb-2" onChange={(e) => { setCellumber(e.target.value) }} aria-describedby="textlHelp" placeholder="Номер телефона" />
                    <input type="password" class="form-control form-control-lg mb-2" onChange={(e) => { setPass(e.target.value) }} aria-describedby="passwordlHelp" placeholder="Пароль" />
                    <input type="password" class="form-control form-control-lg mb-2" onChange={(e) => { setConfirm(e.target.value) }} aria-describedby="passwordHelp" placeholder="Потвердите пароль" />
                    <input type="file" name="avatar" class="form-control form-control-lg mt-2" onChange={(e) => { setAvatar(e.target.files[0]) }} aria-describedby="textlHelp" placeholder="Фото профиля" />
                </div>
                <button class="btn btn-primary form-control form-control-lg font-weight-bold" onClick={check}><label class="text-center">Регистрация</label></button>
            </div>
            <div className="col-3"></div>
            <div className="col-4 "></div>
            <div className="col-4  mt-5 border"><p class="text-center ml-4 mt-5"><span>Есть аккаунт?</span><Link to="/" >Войти.</Link></p></div>
        </div>

    );
}
export default Registrade;
