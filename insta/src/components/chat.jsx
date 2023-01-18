import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "./function";
const Chat = () => {
  const history = useNavigate();
  const [firstname, setFirstname] = useState();
  const [avatar, setAvatar] = useState();
  const [items1, setItems1] = useState(null);
  const [items2, setItems2] = useState(null);
  const [dialogid, setdialogId] = useState([]);
  const [seconduserid, setDialogid] = useState();
  const [chat, setChat] = useState();
  if (localStorage.getItem('token') == null) {
    history('/');
  }
  document.body.style.backgroundColor='white';
  var moment = require('moment');
  require("moment/min/locales.min");
  moment.locale('ru');
  moment().zone("+06:00");
  console.log(localStorage.getItem('token'));
  const messages = async () => {
    const message = await axios({
      method: "get",
      url: api + "/chatuser/users",
      config: {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    }
    );
    console.log("messages", message)
    if (message != null) {
      if (message.data.status == 200) {
        console.log("messages", message)
      } else {
        alert = 'error'
      }
    }
  }
  const user = async () => {
    const users = await axios({
      method: "get",
      url: api + "/users/userss",
      config: {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    }
    );
    console.log("user", users)
    if (users != null) {
      if (users.data.status == 200) {
        setItems1(users.data.users)
        console.log("user", users)
      } else {
        alert = 'error'
      }
    }
  }
  const chats = async () => {
    const params = {
      'dialog_first_user_id': localStorage.getItem('token'),
    }
    const chatz = await axios({
      method: "get",
      params: params,
      url: api + "/chatuser/users",
      config: {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    }
    );
    console.log("chats", params)
    if (chatz != null) {
      if (chatz.data.status == 200) {
        setChat(chatz.data.post);
        console.log("chats", chatz)
        console.log('id',params);

      } else {
        setChat(null);
      }
    }
  }
  const checkChats =  (id, dialog_id, dialog_time) => {
    console.log('id',id);
    if (items1 != null) {
      const check = items1.filter(i=>i.id == id); 
      console.log('check', check.length);
      if (check.length > 0) {
        console.log('checkchats', chat)
        return (
          <div className="col-10">
            <button onClick={() => messages} className='btn'>
              <Link to={"/message/" + dialog_id + "/" + check[0].id} class="btn">
                <img alt="" class="rounded-circle float-left mr-3" src={api+"/registrations/uploads/"+ check[0].avatar} width="80" height="80" />
                <b>{check[0].firstname}</b><small>{moment(dialog_time).calendar()
                    }</small>
                <i class="fas fa-camera float-right fa-2x pt-3"></i>
              </Link>
            </button>
          </div>
        );
      } else {
        console.log('checkchat', check);
        return false;
      }

    } else {
      return false;
    }
  }
  useEffect(() => {
    // users();
    chats();
    user();
    moment.locale('ru');
  }, [])
  return (
    <div>
      <input class="form-control rounded-pill font-weight-bolder" type="text" name="" placeholder="Поиск" />
      <div>
        <div className="col-12">
          <div className="row">
            <div className="col-3">
              <Link class="btn form-control d-flex justify-content-start" to="/lenta"><i class="fas fa-chevron-left float-left fa-2x mt-1"></i></Link>
            </div>
            <div className="col-3 d-flex justify-content-start">
              <h2 class="">SAS</h2>
            </div>
            <div className="col-3 d-flex justify-content-end">
              <i class="fas fa-video fa-2x"></i>
            </div>
            <div className="col-3 justify-content-end">
              <i class="far fa-edit fa-2x"></i>
            </div>
          </div>
        </div>
        <div>
        </div>
        <div class="row mt-2">
          <div class="col-6 text-center"><Link to="/chat" class="btn "><h3>Чаты</h3></Link></div>
          <div class="col-6 text-center"><Link to="/call" class="btn "><h3>Вызовы</h3></Link></div>
        </div>
        <hr />
        <div className="col-12 ">
          <div className="row">
            {chat ?
              <>
                {chat.map((item) =>
                  // <div className="col-10">
                  //   <button onClick={()=>messages} className='btn'>
                  //     <Link to={"/message/" + item.dialog_id + "/"+item.id} class="btn">
                  //       <img alt="" class="rounded-circle float-left mr-3" src={item.avatar} width="80" height="80" />
                  //       <b>{item.firstname}</b><small>1 ч назад</small>
                  //       <i class="fas fa-camera float-right fa-2x pt-3"></i>
                  //     </Link>
                  //   </button>
                  // </div>
                  <>
                    {checkChats(item.dialog_first_user_id == localStorage.getItem('token') ? item.dialog_second_user_id : item.dialog_first_user_id, item.dialog_id, item.dialog_time)}
                  </>
                )}
              </> : <></>
            }
            <div className="col-2 ">

            </div>
          </div>
        </div>
      </div>
    </div>);
}

export default Chat;