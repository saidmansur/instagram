import React from "react";
import {Link, useNavigate} from "react-router-dom";
const Insidesmain = () => {
  const history=useNavigate();
  if (localStorage.getItem('token') == null) {
    history ('/');
  }
  return (
    <div class="row">
      <div class="col-12 mt-2 ">
        <Link class="btn form-control d-flex justify-content-start" to="/smain">
          <i class="fas fa-chevron-left fa-2x float-left mt-1"></i></Link>
        <h3 class="text-center font-weight-bold m-0 d-flex justify-content-center">Настройки</h3>
        <hr />
      </div>
      <div class="col-12 form-group">
        <input class="form-control rounded-pill" type="text" name="" placeholder="Поиск" />
      </div>
      <div class="col-12 mt-3">
        <i class="fas fa-user-plus float-left mt-1 mr-4"></i>
           Подписки и приглашения
        <i class="text-secondary fas fa-chevron-right float-right mt-1"></i>
      </div>
      <div class="col-12 mt-2">
        <i class="far fa-bell float-left mt-1 mr-4"></i>
        Уведомления
        <i class="text-secondary fas fa-chevron-right float-right mt-1"></i>
      </div>
      <div class="col-12 mt-2">
        <i class="fas fa-user-tag float-left mt-1 mr-4"></i>
        Автор
        <i class="text-secondary fas fa-chevron-right float-right mt-1"></i>
      </div>
      <div class="col-12 mt-2">
        <i class="fas fa-lock float-left mt-1 mr-4"></i>
        Конфидециальность
        <i class="text-secondary fas fa-chevron-right float-right mt-1"></i>
      </div>
      <div class="col-12 mt-2">
        <a class="btn form-control d-flex justify-content-start" href="/passchange">
          <i class="fas fa-user-shield float-left mt-1 mr-4"></i>
        Безопасность
        <i class="text-secondary fas fa-chevron-right float-right mt-1"></i>
        </a>
      </div>
      <div class="col-12 mt-2">
        <i class="fas fa-user-plus float-left mt-1 mr-4"></i>
        Реклама
        <i class="text-secondary far fa-chevron-right float-right mt-1"></i>
      </div>
      <div class="col-12 mt-2">
        <i class="far fa-user-circle float-left mt-1 mr-4"></i>
        Аккаунт
        <i class="text-secondary fas fa-chevron-right float-right mt-1"></i>
      </div>
      <div class="col-12 mt-2">
        <i class="far fa-life-ring float-left mt-1 mr-4"></i>
        Помощь
        <i class="text-secondary fas fa-chevron-right float-right mt-1"></i>
      </div>
      <div class="col-12 mt-2">
        <i class="fas fa-info-circle float-left mt-1 mr-4"></i>
        Информаци
        <i class="text-secondary fas fa-chevron-right float-right mt-1"></i>
      </div>
      <hr />

      <div class="row mt-2">
        <div class="col-12">
          <h4 class="float-left">FACEBOOK</h4>
          <i class="fab fa-facebook mt-2 ml-3"></i>
          <i class="fab fa-facebook-messenger ml-1"></i>
          <i class="fab fa-instagram ml-1"></i>
          <i class="fab fa-whatsapp ml-1"></i>
        </div>
        <div class="col-12 mt-2">
          <p><Link to="a" class="text-primary font-weight-bold">Центр аккаунтов</Link></p>
        </div>
        <div class="col-12 mt-4">
          <p class="text-secondary">
            Управляйте кросс-сервисными функциями в приложениях Instagram, Facebook и Messenger, например входом в аккаунт или размещением публикаций и историй.
        </p>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-12">
          <h4 class="font-weight-bold">Выходы</h4>
        </div>
        <div class="col-12 mt-3">
          <h4><Link class="text-primary font-weight-bold" to="a">Добавить аккаунт</Link></h4>
        </div>
        <div class="col-12 mt-3">
          <h4><Link class="text-primary font-weight-bold" to="a">Выйти</Link></h4>
        </div>
      </div>
    </div>
  )
}
export default Insidesmain;