import React, { useEffect, useState } from "react";
import Dnavbar from "./dnavbar";
import { api } from "./function";
import axios from 'axios';
import { message, Button } from 'antd';
import { Link, useNavigate } from "react-router-dom";
const Newpublic = () => {
  const history = useNavigate();
  if (localStorage.getItem('token') == null) {
    history("/");
  }
  document.body.style.backgroundColor='white';
  const [photo, setPhoto] = useState([]);
  const [comment, setComment] = useState();
  const [location, setLocation] = useState();
  const [loadings, setLoadings] = useState(false);
  const postData = async () => {
    if (photo != null) {
      const form = new FormData();
      form.append('photo', photo);
      form.append('comment', comment);
      form.append('location', location);
      form.append('userid', localStorage.getItem('token'));
      const Public = await axios({
        method: "post",
        data: form,
        url: api + "/login/post",
        config: {
          headers: {
            "Content-type": "multipart/form-data"
          }
        }
      })
      setLoadings(true);
      if (Public != null) {

        if (Public.status == 200) {
          message.success('Пост опубликован!');
          history('/lenta');
          setLoadings(false);
          console.log(Public);
        } else {
          message.error('Неудалось опубликовать пост!');
          setLoadings(false);
        }
      }
    } else {
      message.error('Произошла ошибка!');
    }
  }
  return (
    <div>
      <Dnavbar />
      <div class="row">
        <div className="col-2"></div>
        <div className="col-8">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" width="80%" />
          <h1 class="font-weight-bold my-5 text-center fst-italic">Новая Публикация</h1>
          {/* <div class="form-group">
            <input type="file" name="photo" class="form-control form-control-lg mt-2" onChange={(e) => { setPhoto(e.target.files[0]) }} aria-describedby="textlHelp" placeholder="Фото" />
            <input type="text" class="form-control form-control-lg mt-2" onChange={(e) => { setComment(e.target.value) }} placeholder="Комментарий" />
            <input type="text" class="form-control form-control-lg mt-2" onChange={(e) => { setLocation(e.target.value) }} placeholder="Местоположения" />
            <Button class="btn form-control bg-primary mt-3 text-white" loading={loadings} onClick={postData}>
              Опубликовать
            </Button>
          </div> */}
           <input type="file" name="photo" class="form-control form-control-lg mt-2" onChange={(e) => { setPhoto(e.target.files[0]) }} aria-describedby="textlHelp" placeholder="Фото" />
          <label for="inp1" class="inp1">
            <input type="text" id="inp1" placeholder="&nbsp;" onChange={(e) => { setComment(e.target.value) }}  />
            <span class="label1">Комментарий</span>
            <span class="focus1-bg1"></span>
          </label>
          <br/>
          <label for="inp1" class="inp1">
            <input type="text" id="inp1" placeholder="&nbsp;"onChange={(e) => { setLocation(e.target.value) }}  />
            <span class="label1">Местоположения</span>
            <span class="focus1-bg1"></span>
          </label>
          <button class="button-81-pushable mt-3" onClick={postData} role="button">
                    <span class="button-81-shadow"></span>
                    <span class="button-81-edge"></span>
                    <span class="button-81-front text text-center">
                        Опубликовать
                    </span>
                </button>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}
export default Newpublic;