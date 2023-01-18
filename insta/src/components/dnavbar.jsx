import React from "react";
import { Link } from "react-router-dom";
const Dnavbar = () => {
  return (
    <div class="row fixed-bottom bg-light">
      <div class="col-12">
        <div class="row d-flex justify-content-center">

          <div class="col-2 ml-3"><Link class="btn btn-light  form-control" to="/lenta">
            <i class="fas fa-home fa-2x"></i>
          </Link></div>


          <div class="col-2 ml-3"><Link class="btn btn-light  form-control" to="/search">
            <i class="fas fa-search fa-2x" id="slide3" ></i>
          </Link> </div>


          <div class="col-2 ml-3"><Link class="btn btn-light  form-control" to="/newpublic">
            <i class="far fa-plus-square fa-2x" ></i>
          </Link> </div>

          <div class="col-2 ml-3"><Link class="btn btn-light  form-control" to="/hearts">
            <i class="far fa-heart fa-2x" ></i></Link>
          </div>

          <div class="col-2 ml-3"><Link class="btn btn-light  form-control" to="/profile">
            <i class="far fa-user-circle fa-2x" ></i></Link>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Dnavbar;