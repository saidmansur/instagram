import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { api } from "./function";
const Message = () => {
    const history = useNavigate();
    if (localStorage.getItem('token') == null) {
        history("/");
    }
    const [login, setLogin] = useState();
    const [firstname, setFirstame] = useState();
    const [avatar, setAvatar] = useState();
    const [items2, setItems2] = useState();
    const [items1, setItems1] = useState();
    const [items, setItems] = useState();
    const [messages, setMessages] = useState();
    const [dialogid, setdialogId] = useState([]);
    const param = useParams();
    const id = param.id;
    const params = useParams();
    const messagesid = params.dialog_id;
    const users = async () => {
        const param = {
            'id': id,
        }
        console.log('param', param);
        const user = await axios({
            method: "get",
            params: param,
            url: api + "/users/user",
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
                setItems1(user.data.user.name);
                setFirstame(user.data.user.firstname);
                setLogin(user.data.user.login);
                setAvatar(user.data.user.avatar);
            } else {
                console.log("Error!");
            }
            console.log("items1", items1);
        }
    }

    const sendmessages = async () => {
        const param = {
            'messages_fk_dialog_id': messagesid,
        }
        console.log('params id', param)
        const mesage = await axios({
            method: "get",
            params: param,
            url: api + "/chats/chatto",
            config: {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        }
        );
        console.log("smessages", mesage)
        if (mesage != null) {
            if (mesage.data.status == 200) {
                setItems(mesage.data.post)
                setMessages(mesage.data.post.messages_text)
                console.log("smessages", mesage)
            } else {

            }
        }
    }
    const send = async () => {
        const param = {
            'messages_text': messages,
            'messages_fk_send_user_id': localStorage.getItem('token'),
            'messages_fk_recevied_user_id': id,
            'messages_fk_dialog_id': messagesid,

        }
        console.log('params', param)
        const send = await axios({
            method: "post",
            params: param,
            url: api + "/chats/chatto",
            config: {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        })
        console.log('params', param);
        if (send != null) {
            console.log(send);
            if (send.status == 200) {
                sendmessages();
                console.log('sended', send);
            } else {
                console.log("Error!");

            }
            console.log("params", send.messages_id)
        }
    }
    const checkchat = async () => {
        const param = {
            'dialog_first_user_id': localStorage.getItem('token'),
            'dialog_second_user_id': id,
        }
        const cchat = await axios({
            method: "get",
            params: param,
            url: api + "/checkchats/chat",
            config: {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        }
        );
        console.log("checkchats", cchat)
        if (cchat != null) {
            if (cchat.data.status == 200) {
                setdialogId(cchat.data.post[0].dialog_id);
                console.log("checkchats", cchat.data.post.dialog_id)

            } else {
                alert = 'Error'
            }
        }
    }
    var moment = require('moment');
    require("moment/min/locales.min");
    moment.locale('ru');
    moment().zone("+06:00");

    useEffect(() => {
        users();
        sendmessages();
    }, [])
    return (
        <div>
            <div className="col-12">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-2">
                                <Link to="/chat" class="btn form-control"><i class="fas fa-arrow-left fa-2x"></i></Link>
                            </div>
                            <div className="col-2  d-flex justify-content-start">
                                <img src={api+"/registrations/uploads/"+ avatar} width="60" height="60" alt="" class="rounded-circle border border-danger float-left" />
                            </div>
                            <div className="col-6">
                                <b>{firstname}</b>
                            </div>
                            <div className="col-1"><i class="fas fa-phone fa-2x"></i></div>
                            <div className="col-1"><i class="fas fa-video fa-2x"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-6 mt-5" id="sended">
                        {/* <p>{message}</p> */}
                        {items ?
                            <>
                                {items.map((item) =>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                {/* {checkMessages(item.messages_fk_recevied_user_id == id ? item.messages_fk_recevied_user_id : id)} */}
                                                {item.messages_fk_send_user_id == localStorage.getItem('token') ?
                                                    <div className="col-6 text-end bg-danger" id="rmessage">
                                                        {item.messages_text}
                                                    </div>
                                                    :
                                                    <div className="col-6 text-start bg-info" id="smessage">
                                                        {item.messages_text}
                                                    </div>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </> : <></>
                        }
                    </div>

                </div>
            </div>
            <div className="col-12">
                <div className="row fixed-bottom">
                    <div className="col-10">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" onChange={(e) => { setMessages(e.target.value) }} ></textarea>
                            <label for="floatingTextarea2"></label>
                        </div>
                    </div>
                    <div className="col-1" >
                        <i class="far fa-paper-plane fa-2x" onClick={send}></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Message;