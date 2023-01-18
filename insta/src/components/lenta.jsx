import React, { useEffect, useState } from "react";
import Dnavbar from "./dnavbar";
import { api } from "./function";
import moment from "moment";
import png from "./png-transparent-heart-love-emotion-heart-removebg-preview.png"
import axios from "axios";
import 'antd/dist/antd.css';
import { Image } from 'antd';
import $, { data } from 'jquery';
import { Link, useNavigate } from "react-router-dom";
const Lenta = () => {
  const doLike = (value, post_id) => {
    $("#" + value).animate({
      width: '500px',
      transition: "5s",
      opacity: "0"
    })
    $("#" + value).css("display", "inline");
    $("#" + value).css("margin-top", "350px");
    $("#" + value).css("margin-left", "380px");
    $("#" + value).css("width", "500px");
    $('like').css(" justify-content", "center");
    setTimeout(() => {
      $("#" + value).animate({
        width: '800px',
        transition: "6s",
        opacity: "1"
      })
      $("#" + value).css("display", "none");
      $("#" + value).css("margin-top", "200px");
      $("#" + value).css("margin-left", "350px");
      $("#" + value).css("width", "800px");
      $('like').css(" justify-content", "center");

    }, 3500)
    Addlikes(localStorage.getItem('token'), post_id)
  }
  const history = useNavigate();
  if (localStorage.getItem('token') == null) {
    history("/");
  }
  document.body.style.backgroundColor='white';
  console.log('local', localStorage.getItem('token'));
  const [firstname, setFirstame] = useState();
  const [avatar, setAvatar] = useState();
  const [items1, setItems1] = useState();
  const [login, setLogin] = useState();
  const [state, setState] = useState(false);
  const [likez, setLikez] = useState([]);
  const [likecounter, setLikecounter] = useState();
  const [followerid, setFollowerid] = useState();
  const post = async () => {
    const param = {
      'id': parseInt(localStorage.getItem('token')),

    }
    const products = await axios({
      method: "get",
      params: param,
      url: api + "/login/posts",
    }
    );
    // console.log(products);
    if (products.data.status == 200) {
      if(products.data.status == 200){
      console.log(Object.values(products.data.posts));
      setState(Object.values(products.data.posts));
    }
    console.log('prod',products);
  }
  else {
    const param = {
      'userid': localStorage.getItem('token'),

    }
    const data = await axios({
      method: "put",
      params: param,
      url: api + "/login/posts",
      config: {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    }
    );
    if (data != null) {
      if(data.data.status==200){
      console.log(Object.values(data.data.posts));
      setState(Object.values(data.data.posts));
      console.log("products", data);
    }
    console.log('myposts',data);
  }else{
      console.log('Error');
  }

  }
  }
  const users = async () => {
    const param = {
      'id': parseInt(localStorage.getItem('token')),

    }
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
  const cfollows = async () => {
    const param = {
      'users_id': parseInt(localStorage.getItem('token')),

    }
    const user = await axios({
      method: "get",
      params: param,
      url: api + "/login/folpost",
      config: {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    }
    );
    if (user != null) {
      if (user.status == 200) {
        setFollowerid(user.data.user.follower_id);
        console.log('checks', user);
      } else {
        console.log("Error!");
      }
      console.log("items1", items1);
    }
  }
  useEffect(() => {
    users();
    moment.locale('ru');
    post();
    liker();
    countlikez();
  }, [])
  var moment = require('moment');
  require("moment/min/locales.min");
  moment.locale('ru');
  moment().zone("+06:00");
  const liker = async () => {
    const param = {
      'user_id': localStorage.getItem('token'),

    }
    const like = await axios({
      method: "get",
      params: param,
      url: api + "/likes/like",
      config: {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    }
    );
    console.log("like", like)
    if (like != null) {
      if (like.data.status == 200) {
        setLikez(like.data.post);
        console.log("likez", likez)
      }
    }
  }
  console.log('likes', likez)
  const checkLikes = (user_id, post_id) => {
    if (likez != null) {
      const check = likez.filter(i => i.user_id == user_id && i.postid == post_id);
      if (check.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  const countlikez = async () => {
    const countlike = await axios({
      method: "get",
      url: api + "/likes/likez",
      config: {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    }
    );
    if (countlike.data.status == 200) {
      setLikecounter(countlike.data.likes);
    }
    console.log('clikez', countlike)

  }
  const countlikes = (post_id) => {
    if (likecounter != null) {
      const check = likecounter.filter(i => i.postid == post_id);
      if (check.length > 0) {
        return check.length;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  const Addlikes = async (user_id, post_id) => {
    console.log(likez);
    if (likez.length >= 0) {
      const check = likez.filter(i => i.user_id == user_id && i.postid == post_id);
      if (check.length > 0) {
        return false;
      } else {
        const param = {
          'user_id': user_id,
          'postid': post_id
        }
        const addlike = await axios({
          method: "post",
          params: param,
          url: api + "/likes/like",
          config: {
            headers: {
              "Content-type": "multipart/form-data"
            }
          }
        }
        );
        console.log('added like', addlike);
        if (addlike.data.status == 200) {
          liker();
          post();
          countlikez();
        }
      }

    } else {
      return false;
    }
  }
  const removelikes = async (user_id, postid) => {
    const param = {
      'user_id': parseInt(user_id),
      'postid': parseInt(postid)
    }
    console.log(param);
    const removelike = await axios({
      method: "delete",
      params: param,
      url: api + "/likes/like",
      config: {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    }
    );
    console.log('delete like', removelike);
    if (removelike.data.status == 200) {
      liker();
      post();
      countlikez();
    }
  }

  return (<>
    <Dnavbar />
    <div class="row">
      <div class="col-10 ">
        <Link to="/lenta">
          <img width="150px" alt="" class="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" />
        </Link>
      </div>
      <div className="col-2"><Link class="btn form-control" to="/chat"><i class="far fa-comment fa-2x float-right mt-2"></i></Link></div>
      <div class="col-12">
        <div class="row">
          <div class="col-2">
            <Link to="/profile">
              <img alt="" class="rounded-circle border border-danger" src={api + "/registrations/uploads/" + avatar} width="50" height="50" />
              <p><small>{firstname}</small></p>
            </Link>
          </div>
        </div>
        <hr />
      </div>
      <div class="row">
        {state ?
          <>
            {state.map((i) =>
              <div class="col-12">
                <div className="row">
                  <div className="col-11">
                    <Link to={"/userprofile/" + i.userid} className="btn">
                      <img class="rounded-circle border border-danger float-left" src={api + "/registrations/uploads/" + i.avatar} width="60" height="60" />
                      <b class="float-left mt-3 ml-2 font-weight-bolder">{i.firstname}</b>
                    </Link>
                  </div>
                  <div className="col-1">
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <i class="fas fa-ellipsis-v fa-2x"></i>
                    </button>
                  </div>
                  <div className="col-12 mt-2 photo" id={"photo" + i.post_id}
                    style={{
                      backgroundImage: "url(" + api + "/uploads/" + i.photo + ")"
                    }}
                    onDoubleClick={() => doLike("like" + i.post_id, i.post_id)}
                  >
                  </div>
                  <div className="col-12 mt-2" id="image"
                  >
                    <img class="postlike" id={"like" + i.post_id} src={png}
                      style={{
                        width: '800px',
                        display: 'none',
                        position: 'absolute',
                        backgroundColor: 'rgba(0,0,0,0)',
                        zIndex: 100
                      }} />
                  </div>
                  <div class="col-12 mt-2 mb-4">
                    {countlikes(i.post_id)}
                    {checkLikes(localStorage.getItem('token'), i.post_id) ?
                      <button class="btn" onClick={() => { removelikes(localStorage.getItem('token'), i.post_id) }}>
                        <i class="fa-solid fa-heart text-danger fa-2x ml-2"></i>
                      </button>
                      :
                      <button class="btn" onClick={() => { Addlikes(localStorage.getItem('token'), i.post_id) }}>
                        <i class="far fa-heart fa-2x ml-2 "></i>
                      </button>
                    }
                    <i class="far fa-comment fa-2x ml-2"></i>
                    <i class="far fa-paper-plane fa-2x ml-2"></i>
                    <i class="far fa-bookmark fa-2x float-right d-flex justify-content-end"></i>
                    <p class="my-1"><b>{i.firstname}</b></p>
                    <p class="my-1">{i.comment}</p>
                    <p><small>{moment(i.data).calendar()
                    }</small></p>
                    <input type='text' placeholder="Comments" />
                  </div>
                </div>
              </div>
            )}
          </> : <>
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div></>
        }

        <div className="col-1">
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <button class="form-control text-danger">Пожаловаться</button>
                  <button class="form-control mt-1">Копировать ссылку</button>
                  <button class="form-control mt-1">Поделиться...</button>
                  <button class="form-control mt-1">Включить уведомления о публикациях</button>
                  <button class="form-control mt-1">Скрыть</button>
                  <button class="form-control mt-1">Отменить подписку</button>
                  <Link to="/lenta" class="form-control mt-2 d-flex justify-content-center">Отмена</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );

}
export default Lenta;