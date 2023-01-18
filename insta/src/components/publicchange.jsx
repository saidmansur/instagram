import React, { useEffect, useState } from "react";
import axios from 'axios';
import { api } from "./function";
import { message } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import Dnavbar from "./dnavbar";
import { data } from "jquery";
const Publicchange = () => {
  const history = useNavigate();
  if (localStorage.getItem('token') == null) {
    history("/");
  }
  document.body.style.backgroundColor='white';
  const [photo, setPhoto] = useState();
  const [comment, setComment] = useState();
  const [location, setLocation] = useState();
  const params = useParams();
  const post_id = params.id;
  const postData = async () => {
    // const form = new FormData();
    // form.append('photo',photo);
    // form.append('comment',comment);
    // form.append('location',location);
    const param = {
      'post_id': post_id,
      'photo': photo,
      'comment': comment,
      'location': location
    }
    console.log(param)
    const update = await axios({
      method: "update",
      params: param,
      url: api + "/login/post",
      config: {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    })
    if (update != null) {
      console.log(update);
      if (update.status == 200) {
        message.success('Публикация изменена!');
        setPhoto(update.data.photo);
        // window.location.href = '/profile';
      } else {
        console.log("Error!");
        message.error('Произошла ошибка!');
      }
      console.log("params", update.data.id)
    }
  }
  const pdelete = async (post_id) => {
    const param = {
      'post_id': parseInt(post_id),
      'image': photo,

    }
    const deletes = await axios({
      method: "delete",
      params: param,
      url: api + "/login/post",
      config: {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    }
    );
    if (deletes != null) {
      console.log(deletes);
      if (deletes.status == 200) {
        message.success('Пост удален!');
        history('/profile');
        console.log('delete', param);
      } else {
        message.error('Неудалось удулить пост');

      }
      console.log("posts", deletes.data.post_id)
    }
  }
  return (
    <div>
      <Dnavbar />
      <div class="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" width="100%" />
          <h1 class="font-weight-bold my-5 text-center fst-italic">Изменить Публикацию</h1>
          <div class="form-group">
            <input type="file" class="form-control form-control-lg mt-2" onChange={(e) => { setPhoto(e.target.files[0]) }} aria-describedby="textlHelp" placeholder={photo} />
            <input type="text" class="form-control form-control-lg mt-2" onChange={(e) => { setComment(e.target.value) }} placeholder={comment} />
            <input type="text" class="form-control form-control-lg mt-2" onChange={(e) => { setLocation(e.target.value) }} placeholder={location} />
            <button class="btn btn-primary form-control form-control-lg font-weight-bold mt-2" onClick={postData}><label class="text-center">Изменить</label></button>
          </div>
          <button type="button" class="btn btn-white form-control form-control-lg font-weight-bold" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        <div className="col-md-3"></div>
        <div className="col-12">
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Удалить пост</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Вы действительно хотите удалить данную публикацию?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => pdelete(post_id, photo)}>Удалить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Publicchange;