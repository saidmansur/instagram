import React from "react";
import {Link, useNavigate} from "react-router-dom";
const Statistica = () => {
  const history=useNavigate();
  if (localStorage.getItem('token') == null) {
    history('/');
  }
  document.body.style.backgroundColor='white';
  return (

    <div class="row">
      <div class="col-12 mt-2">
        <div className="row">
          <div className="col-4">
            <Link class="btn form-control" to="/profile">
              <i class="fas fa-chevron-left fa-2x float-left mt-1 d-flex justify-content-start" ></i>
            </Link>
          </div>
          <div className="col-4">
            <h3 class="text-center font-weight-bold m-0 ">Статистика</h3>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <i class="fas fa-info-circle fa-2x float-right mt-1"></i>
          </div>
        </div>
        <hr />
      </div>
      <div class="col-12">
        <div class="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" class="btn px-3 border font-weight-bold  dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Последние 7 дней
                        </button>
          <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <Link class="dropdown-item" to="s">Последние 30 дней</Link>
          </div>
        </div>
        <hr />
      </div>
      <div class="row">
        <div class="col-12 mt-3">
          <div class="row">
            <div class="col-12 d-md-flex justify-content-center">
              <i class="p-3 rounded-circle border border-secondary fa-3x far fa-chart-bar"></i>
            </div>
            <div class="col-12 mt-2">
              <p class="font-weight-bold text-center">Добро пожалыать в статистику!</p>
              <p class="text-center text-secondary">Изучите подробнее результативность вашего аккаунта и контента в Instagram за последние 7 дней.</p>
              <br />
              <hr />
            </div>
          </div>
        </div>
        <div class="col-12 mt-2">
          <h4 class="font-weight-bold">Обзор</h4>
        </div>
        <div class="col-12 mt-2">
          <p class="font-weight-bold m-0 float-left">58<br /><label class="text-secondary font-weight-normal">Охваченные аккаунты</label></p>
          <i class="fas fa-chevron-right float-right fa-2x text-secondary"></i>
          <p class="text-secondary float-right mt-1 mr-3">-23,7%</p>
        </div>
        <div class="col-12 mt-2">
          <p class="font-weight-bold m-0 float-left">5<br /><label class="text-secondary font-weight-normal">Взаимодействия с контентом</label></p>
          <i class="fas fa-chevron-right float-right fa-2x text-secondary"></i>
          <p class="text-secondary float-right mt-1 mr-3">-28,6%</p>
        </div>
        <hr />
      </div>
      <hr />
      <div class="row">
        <div class="col-12 mt-2">
          <h4 class="font-weight-bold float-left">Обзор</h4>
          <p class="font-weight-bold float-right mt-1" ><a class="text-primary" href="a">Все данные</a></p>
        </div>
        <div class="col-12 mt-2">
          <p class="font-weight-bold m-0 float-left">226<br /><label class="text-secondary font-weight-normal">Всеего подписчиков</label></p>
          <p class="text-secondary float-right mt-1">-0,9%</p>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-12">
          <p class="text-secondary float-left">Опубликуйте фото или видео, чтобы посмотреть новую статистику.</p>
          <i class="fas fa-chevron-right float-right text-secondary"></i>
        </div>
        <div class="col-12">
          <p><Link class="text-primary font-weight-bold " to="a">Создать публикацию</Link></p>
          <hr />
        </div>
        <div class="col-12">
          '<p class="text-secondary float-left">Добавьте видео IGTV, чтобы посмотреть новую статистику.</p>
          <i class="fas fa-chevron-right float-right text-secondary"></i>
        </div>
        <div class="col-12">
          <p><a class="text-primary font-weight-bold " href="a">Создать видео</a></p>
          <hr />
        </div>
        <div class="col-12">
          <p class="text-secondary float-left">Продвигайте публикацию или историю, чтобы посмотреть новую статистику.</p>
          <i class="fas fa-chevron-right float-right text-secondary"></i>
        </div>
        <div class="col-12">
          <p><Link class="text-primary font-weight-bold " to="a">Продвигать публикацию</Link></p>
        </div>
      </div>
    </div>

  );
}
export default Statistica;