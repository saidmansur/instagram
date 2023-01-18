import React, { useEffect, useState } from "react";
import Dnavbar from "./dnavbar";
import axios from "axios";
import { api } from "./function";
import { Link, useNavigate } from "react-router-dom";
import $ from 'jquery';
const Search = () => {
  const history = useNavigate();
  if (localStorage.getItem('token') == null) {
    history('/');
  }
  const [login, setLogin] = useState();
  const [firstname, setFirstame] = useState();
  const [avatar, setAvatar] = useState();
  const [lastname, setLastname] = useState();
  const [items, setItems] = useState();
  const search = async () => {
    const param = {
      'login': login,
    }
    const user = await axios({
      method: "get",
      params: param,
      url: api + "/enter/logins",
      config: {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    }
    );
    if (user != null) {
      if (user.data.status == 200) {
        setItems(user.data.logins);
        setFirstame(user.data.logins.firstname);
        setAvatar(user.data.logins.avatar);
        setLastname(user.data.logins.lastname);
        console.log('checks', user);
      } else {
        console.log("Error!");
      }
      console.log("items1");
    }
  }
  useEffect(() => {
    search();
  }, [])
  return (
    <div className="">
      <Dnavbar />
      <div class=" row d-flex justify-content-center">
        <div class="form-group col-12">
          <input class="input fixed-top ml-5" required type="text" placeholder="Поиск" onChange={(e) => { setLogin(e.target.value) }} onInput={search} />
        </div>
        <div class="row" id="main">
          {items ?
            <>
              {items.map((i) =>
                <div class="col-12">
                  <div className="row">
                    <div className="col-11">
                      <Link to={"/userprofile/" + i.id} className="btn fixed-top mt-3">
                        <img class="rounded-circle border border-danger float-left" src={api + "/registrations/uploads/" + i.avatar} width="60" height="60" />
                        <b class="float-left mt-3 ml-2 font-weight-bolder">{i.firstname}</b>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </> : <>
            <div class="spinner"></div>
            </>
          }
        </div>
      </div>
    </div>
  );
}
export default Search;