import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from 'antd';
import {Link, useNavigate} from "react-router-dom";
import { api } from "./function";
const Change = () => {
  const history=useNavigate();
  if (localStorage.getItem('token') == null) {
    history ( '/');
  }
  document.body.style.backgroundColor='white';
  const [avatar, setAvatar] = useState([]);
  const [login, setLogin] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [cellnumber, setCellnumber] = useState();
  const [items1, setItems1] = useState();
  const [image,setImage] = useState();
  const users = async () => {
    const param = {
      'id': parseInt(localStorage.getItem('token')),

    }
    const user = await axios({
      method: "get",
      params: param,
      url: ""+api+"/users/user",
      config: {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    }
    );
    if (user != null) {
      if (user.status == 200) {
        console.log(user.data);
        localStorage.setItem('token', user.data.user.id)
        setItems1(user.data.user);
        setLogin(user.data.user.login);
        setFirstname(user.data.user.firstname);
        setLastname(user.data.user.lastname);
        setCellnumber(user.data.user.cellnumber);
        setAvatar(user.data.user.avatar);
        setImage(user.data.user.avatar);
      } else {
        console.log("Error!");
      }
      console.log('image', image);
    }

  }
  useEffect(() => {
    users();
  }, [])
  const id = localStorage.getItem('token');
  const check = async () => {
    const form = new FormData();
    form.append('login', login);
    const Login = await axios({
      method: "post",
      data: form,
      url: ""+api+"/check/logincheck",
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
        const form = new FormData();
        form.append('login', login);
        form.append('avatar',avatar);
        form.append('firstname', firstname);
        form.append('lastname', lastname);
        form.append('cellnumber', cellnumber);
        form.append('id',localStorage.getItem('token'));
        form.append('image',image);
        const updates = await axios({
          method: "post",
          data: form ,
          url: api+"/registrations/change",
          config: {
            headers: {
              "Content-type": "multipart/form-data"
            }
          }
        })
        if (updates != null) {
          console.log(updates);
          console.log('image', image);
          if (updates.status == 200) {
            message.success('Данные изменены!');
            history ('/profile');
          } else {
            console.log("Error!");
            message.error('Произошла ошибка!');
          }
          console.log("params", updates.data.id)
        }
      }
    }

  }
  return (
    <div class="row">
      <div class="col-12">
        <div className="row">
          <div className="col-1"><Link class="btn form-control" to="/profile">
            <i class="fas fa-times float-left fa-2x mt-1 d-flex justify-content-start"></i></Link>
          </div>
          <div className="col-10">
            <h3 class="float-left ml-5">Редактировать профиль</h3>
          </div>
        </div>
      </div>
      <div class="col-12 mt-2">
        <div class="d-flex justify-content-center">
          <img class="rounded-circle mr-3" src={api+"/registrations/uploads/"+ avatar} alt="" width="150" height="150" />
          <p><b></b></p>
        </div>
      </div>
      <div className="col-12">
        <h4>Изменить данные пользователя</h4>
      </div>
      <div class="col-12 form-group mt-3">
        <b>Изменить имя пользователя</b>
        <input class="form-control border-top-0 border-right-0 border-left-0" onChange={(e) => { setLogin(e.target.value) }} type="text" name="" placeholder={login} />
      </div>
      <div class="col-12 form-group mt-3">
      <b>Изменить аватар</b>
      <input type="file" name="avatar" class="form-control form-control-lg mt-2" onChange={(e) => { setAvatar(e.target.files[0]) }} aria-describedby="textlHelp"  />
      </div>
      <div class="col-12 form-group mt-3">
      <b>Изменить имя</b>
        <input class="form-control border-top-0 border-right-0 border-left-0" onChange={(e) => { setFirstname(e.target.value) }} type="text" name="" placeholder={firstname} />
      </div>
      <div class="col-12 form-group mt-3">
      <b>Изменить фамилию</b>
        <input class="form-control border-top-0 border-right-0 border-left-0" onChange={(e) => { setLastname(e.target.value) }} type="email" name="" placeholder={lastname} />
      </div>
      <div class="col-12 form-group mt-3">
      <b>Изменить номер телефона</b>
        <input class="form-control border-top-0 border-right-0 border-left-0" onChange={(e) => { setCellnumber(e.target.value) }} type="text" name="" placeholder={cellnumber} />
      </div>
      <div className="col-12">
        <button class="btn form-control" onClick={check}><i class="fas fa-check text-success float-right fa-2x mt-1"></i></button>
      </div>
      <div>
        <h5 class="mt-2 ml-3 font-weight-bold">Информация в профиле</h5>
      </div>
      <div class="col-12 mt-3">
        <p class="font-weight-bold float-left">Страница</p>
        <p><small><Link class="text-secondary float-right mt-2" to="a">Подключить или создать <i class="fas fa-chevron-right ml-2"></i></Link></small></p>
      </div>
      <div class="col-12 mt-2">
        <p class="font-weight-bold float-left">Категория</p>
        <p><small><Link class="text-secondary float-right mt-2" to="a">Блогер<i class="fas fa-chevron-right ml-2"></i></Link></small></p>
      </div>
      <div class="col-12 mt-2">
        <p class="font-weight-bold float-left">Способы связи</p>
        <p><small><Link class="text-secondary float-right mt-2" to="a"><i class="fas fa-chevron-right"></i></Link></small></p>
      </div>
      <div class="col-12 mt-2">
        <p class="font-weight-bold float-left">Показ в профиле</p>
        <p><small><Link class="text-secondary float-right mt-2" to="a">Вся информация скрыта<i class="fas fa-chevron-right ml-2"></i></Link></small></p>
      </div>
      <div class="col-12 mt-5">
        <hr />
        <p class="font-weight-bold"><a class="text-primary" href="a">Настройки личной информации</a></p>
      </div>
    </div>
  );
}
export default Change;