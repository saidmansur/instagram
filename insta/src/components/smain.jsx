import React from "react";
import {Link, useNavigate} from "react-router-dom";
// function signOut() {
//   localStorage.removeItem('token');
//   history.push ('/');
// }
const Smain = () => {
  const history=useNavigate();
  if (localStorage.getItem('token') == null) {
    history({ pathname: '/' })
  }
  function signOut() {
    localStorage.removeItem('token');
    history({ pathname: '/' })
  }
  return (
    <div class="row">
      <div class="col-12">
        <Link class="btn form-control d-flex justify-content-start" to="/profile">
          <i class="fas fa-chevron-left fa-2x"></i></Link>
      </div>
      <div class="col-12 ml-5 mt-3">
        <Link class="btn form-control d-flex justify-content-start" to="/insidesmain">
          <i class="fas fa-cog fa-2x float-left mr-3"></i>
          <h4 class="font-weight-bold">Настройки</h4></Link>
        <hr />
      </div>
      <div class="col-12 ml-5 mt-1">
        <Link class="btn form-control d-flex justify-content-start" to="/in">
          <i class="fas fa-history fa-2x float-left mr-3"></i>
          <h4 class="font-weight-bold">Архив</h4></Link>
        <hr />
      </div>
      <div class="col-12 ml-5 mt-1">
        <Link class="btn form-control d-flex justify-content-start" to="/i">
          <i class="fas fa-clock fa-2x float-left mr-3"></i>
          <h4 class="font-weight-bold">Ваши действия</h4></Link>
        <hr />
      </div>
      <div class="col-12 ml-5 mt-1">
        <Link class="btn form-control d-flex justify-content-start" to="/i">
          <i class="fas fa-stream fa-2x float-left mr-3"></i>
          <h4 class="font-weight-bold">Статистика</h4></Link>
        <hr />
      </div>
      <div class="col-12 ml-5 mt-1">
        <Link class="btn form-control d-flex justify-content-start" to="/i">
          <i class="fas fa-qrcode fa-2x float-left mr-3"></i>
          <h4 class="font-weight-bold">QR-код</h4></Link>
        <hr />
      </div>
      <div class="col-12 ml-5 mt-1">
        <Link class="btn form-control d-flex justify-content-start" to="/in">
          <i class="fas fa-bookmark fa-2x float-left mr-3"></i>
          <h4 class="font-weight-bold">Сохраненное</h4></Link>
        <hr />
      </div>
      <div class="col-12 ml-5 mt-1">
        <Link class="btn form-control d-flex justify-content-start" to="/in">
          <i class="fas fa-tasks fa-2x float-left mr-3"></i>
          <h4 class="font-weight-bold">Близкие друзья</h4></Link>
        <hr />
      </div>
      <div class="col-12 ml-5 mt-1">
        <Link class="btn form-control d-flex justify-content-start" to="/in">
          <i class="fas fa-user-plus fa-2x float-left mr-3"></i>
          <h4 class="font-weight-bold">Интересные люди</h4></Link>
        <hr />
      </div>
      <div class="col-12 ml-5 mt-1">
        <Link class="btn form-control d-flex justify-content-start" to="/in">
          <i class="fas fa-hand-holding-medical fa-2x float-left mr-3"></i>
          <h4 class="font-weight-bold">Центр информации о COVID-19</h4></Link>
        <hr />
      </div>
      <div class="col-12 ml-5 mt-1">
        <Link class="btn form-control d-flex justify-content-start" onClick={signOut} to="/">
          <i class="fas fa-sign-out-alt fa-2x float-left mr-3"></i>
          <h4 class="font-weight-bold">Выход</h4></Link>
        <hr />
      </div>
    </div>

  );
}

export default Smain;