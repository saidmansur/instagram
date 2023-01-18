import React from "react";
import {Link, useNavigate} from "react-router-dom";
const Promotion = () => {
    const history=useNavigate();
    if (localStorage.getItem('token') == null) {
        history ('/');
    }
    document.body.style.backgroundColor='white';
    return (
        <div class="row">
            <div class="col-12 mt-2">
                <div className="row">
                    <div className="col-1">
                        <Link class="btn btn-white form-control" to="/profile">
                            <i class="fas fa-chevron-left fa-2x float-left mt-1 d-flex justify-content-start"></i></Link>
                    </div>
                    <div className="col-11">
                        <h3 class="text-center font-weight-bold m-0">Продвижение</h3>
                    </div>
                </div>
                <hr />
            </div>
            <div class="col-12 mt-3">
                <h4 class="font-weight-bold">Создать</h4>
            </div>
            <div class="col-12 mt-4">
                <div className="row">
                    <div className="col-11">
                        <h4 class="float-left">Выбрать публикацию</h4>
                    </div>
                    <div className="col-1">
                        <i class="fas fa-chevron-right float-right text-secondary mt-2"></i>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <h4 class="font-weight-bold">Управление</h4>
            </div>
            <div class="col-12 mt-4">
                <hr />
                <h4 class="text-secondary">У вас нет продвигаемых публикаций</h4>
            </div>
        </div>

    );
}

export default Promotion;