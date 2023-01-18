import React, { useEffect, useState } from "react";
import moment from 'moment';
import axios from 'axios';
export function Posts({ items }) {
  var moment = require('moment');
  require("moment/min/locales.min");
  moment.locale('ru');
  moment().zone("+06:00");
  const [posts, setPosts] = useState();
  setPosts(items);

  return (
    <div>

    </div>

  );
}
export function Chat1({ chats }) {
  const chatlist = chats;
  return (
    <div>
      <input class="form-control rounded-pill font-weight-bolder" type="text" name="" placeholder="Поиск" />
      {chatlist.map((user) => {
        return (
          <div>
            <div className="col-12">
              <div className="row">
                <div className="col-3">
                  <a class="btn form-control d-flex justify-content-start" href="/lenta"><i class={user.back}></i></a>
                </div>
                <div className="col-3 d-flex justify-content-start">
                  <h2 class="">{user.name}</h2>
                </div>
                <div className="col-3 d-flex justify-content-end">
                  <i class={user.cvideo}></i>
                </div>
                <div className="col-3 justify-content-end">
                  <i class={user.edit}></i>
                </div>
              </div>
            </div>
            <div>
            </div>
            <div class="row mt-2">
              <div class="col-6 text-center"><a href="/chat" class="btn "><h3>{user.chat}</h3></a></div>
              <div class="col-6 text-center"><a href="/call" class="btn "><h3>{user.call}</h3></a></div>
            </div>
            <hr />
            <div className="col-12 ">
              <div className="row">
                <div className="col-10">
                  <a href="/message" class="btn">
                    <img alt="" class="rounded-circle float-left mr-3" src={user.img} width="80" height="80" />
                    <b>{user.name1}</b><small>{user.time}</small>
                  </a>
                </div>
                <div className="col-2 ">
                  <i class={user.camera}></i>
                </div>
              </div>
            </div>
          </div>

        );
      })}
    </div>);
}
export const Chats = [{
  chat: "Чаты",
  call: "Вызовы",
  back: "fas fa-chevron-left float-left fa-2x mt-1",
  name: "SAS",
  cvideo: "fas fa-video fa-2x",
  edit: "far fa-edit fa-2x",
  img: "https://ae01.alicdn.com/kf/HTB18_pebyYrK1Rjy0Fdq6ACvVXaA/DIY.jpg_q50.jpg",
  name1: "SAS",
  time: "1 ч назад",
  camera: "fas fa-camera float-right fa-2x pt-3"
}, {
  img: "https://ae01.alicdn.com/kf/HTB18_pebyYrK1Rjy0Fdq6ACvVXaA/DIY.jpg_q50.jpg",
  name1: "SAS",
  time: "1 ч назад",
  camera: "fas fa-camera float-right fa-2x pt-3"
},
  , {
  img: "https://ae01.alicdn.com/kf/HTB18_pebyYrK1Rjy0Fdq6ACvVXaA/DIY.jpg_q50.jpg",
  name1: "SAS",
  time: "1 ч назад",
  camera: "fas fa-camera float-right fa-2x pt-3"
},
  , {
  img: "https://ae01.alicdn.com/kf/HTB18_pebyYrK1Rjy0Fdq6ACvVXaA/DIY.jpg_q50.jpg",
  name1: "SAS",
  time: "1 ч назад",
  camera: "fas fa-camera float-right fa-2x pt-3"
}
];
export function Hearts1({ nicks }) {
  const nicklist = nicks;
  return (
    <div>
      {nicklist.map((nick) => {
        return (
          <div>
            <div className="col-12">
              <h2>{nick.text}</h2>
              <p><b>{nick.text1}</b></p>
              <img alt="" class="rounded-circle border border-danger float-left mr-1" src={nick.img} width="50" height="50" />
              <label onclick="person1();" class="m-0 p-0"><b>{nick.nicks}</b><br />{nick.subs}<small>{nick.time}</small></label>
              <button id="subscribe" onclick="subscribe1();" value="0" class="btn btn-light border float-right m-0">{nick.butt}</button>
              <hr class="mb-1" />
            </div>
          </div>
        );
      }
      )}
    </div>
  );
}
export const nicks = [{
  text: "Действия",
  text1: "Cегодня",
  img: "https://ae01.alicdn.com/kf/HTB18_pebyYrK1Rjy0Fdq6ACvVXaA/DIY.jpg_q50.jpg",
  nicks: "auuu",
  subs: "подписался(-ась) на ваши обновления.",
  time: "16ч.",
  butt: "Вы подписаны"

},
{
  text1: "Вчера",
  img: "https://a.d-cd.net/448a45s-1920.jpg",
  nicks: "elec",
  subs: "подписался(-ась) на ваши обновления.",
  time: "24ч.",
  butt: "Вы подписаны"

},
{
  text1: "Неделя",
  img: "https://a.d-cd.net/448a45s-1920.jpg",
  nicks: "west",
  subs: "подписался(-ась) на ваши обновления.",
  time: "3дня.",
  butt: "Вы подписаны"

}
]
export const fans = [{
  img: 'https://ae01.alicdn.com/kf/HTB18_pebyYrK1Rjy0Fdq6ACvVXaA/DIY.jpg_q50.jpg',
  name: 'das'
}];
export function Sub() {
  const fanlist = fans;
  return (
    <>
      {fanlist.map((fans) => {
        return (

          <div className="col-2  ">
            <img alt="" class="rounded-circle border border-danger ml-1 d-md-flex justify-content-start" width="80" height="80" src={fans.img} />
            <p class="">{fans.name}</p>
          </div>
        );
      }
      )}
    </>
  );
}
export const api = "https://sstss.ru";
