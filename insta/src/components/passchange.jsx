import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from 'antd';
import { api } from "./function";
import {Link, useNavigate} from "react-router-dom";
const Passchange = () => {
  const history=useNavigate();
  if (localStorage.getItem('token') == null) {
    history ('/');
  }
  const [login, setLogin] = useState();
  const [newpass, setNewpass] = useState();
  const [pass, setPass] = useState();
  const [confirm, setConfirm] = useState();
  const id = localStorage.getItem('token');
  const changePass = async () => {
    const param = {
      // 'login':login,
      'id': id,
      'pass': pass
    }
    console.log(param)
    const update = await axios({
      method: "post",
      params: param,
      url: ""+api+"/passchange/pchange",
      config: {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    })
    if (update != null) {
      console.log(update);
      if (update.data.status == 200) {
        if (newpass.length < 8) {
          message.error('Пароль должен состоять из болле чем 8 символов!');
        }
        else if (newpass != confirm) {
          message.error('Введенн не правильный пароль!');
        }
        else if (newpass == confirm || newpass == null) {
          const parama = {
            'newpass': newpass,
            'id': id
          }

          const pchange = await axios({
            method: "update",
            params: parama,
            url: ""+api+"/passchange/pchange",
            config: {
              headers: {
                "Content-type": "multipart/form-data"
              }
            }
          })
          if (update.status == 200) {
            console.log(pchange);
            message.success('Пароль изменен');
            localStorage.removeItem('token');
            history ("/");
          }

          else {
            console.log("Error!");
          }
          console.log(parama)
        }


      }
      console.log("params", update.data.id)
    }

  }


  return (
    <div class="row">
      <div className="col-md-1"><Link class="btn form-control" to="/profile">
        <i class="fas fa-times float-left fa-2x mt-1 d-flex justify-content-start"></i></Link>
      </div>
      <div className="col-md-12">
        <h4>Изменить пароль аккаунта</h4>
      </div>
      {/* <div class="col-md-12 form-group mt-3">
      <input class="form-control border-top-0 border-right-0 border-left-0" onChange={(e)=>{setLogin(e.target.value)}} type="text" name="" placeholder="Имя пользователя"/>
    </div> */}
      <div class="col-md-12 form-group mt-3">
        <input class="form-control border-top-0 border-right-0 border-left-0" onChange={(e) => { setPass(e.target.value) }} type="password" name="" placeholder="Введите пароль" />
      </div>
      <div class="col-md-12 form-group mt-3">
        <input class="form-control border-top-0 border-right-0 border-left-0" onChange={(e) => { setNewpass(e.target.value) }} type="password" name="" placeholder="Изменить пароль" />
      </div>
      <div class="col-md-12 form-group mt-3">
        <input class="form-control border-top-0 border-right-0 border-left-0" onChange={(e) => { setConfirm(e.target.value) }} type="password" name="" placeholder="Потвердить пароль" />
      </div>
      <div className="col-md-12">
        <button class="btn form-control" onClick={changePass}><i class="fas fa-check text-success float-right fa-2x mt-1"></i></button>
      </div>
    </div>
  );
}
export default Passchange;