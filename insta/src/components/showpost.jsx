import React, { useEffect, useState } from "react";
import { api} from "./function";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";
const Showpost=()=>{
    const history=useNavigate();
    if (localStorage.getItem('token') == null) {
      history ("/");
    }
	document.body.style.backgroundColor='white';
    // const [items1, setItems1] = useState();
    const [photo, setPhoto] = useState();
    const param = useParams();
    const id = param.post_id;
    const users = async () => {
		const params= {
            'post_id': id,

		}
		const post = await axios({
			method: "get",
			params: params,
			url: api+"/login/post",
			config: {
				headers: {
					"Content-type": "multipart/form-data"
				}
			}
		}
		);
		if (post != null) {
			if (post.status == 200) {
				console.log(post.data);
                // localStorage.setItem('token', user.data.id);
				setPhoto(post.data.post.photo);
				console.log('post',post)
			} else {
				console.log("Error!");
			}
			console.log("params", params);
		}
	}
	useEffect(() => {
		users();
	}, [])
	
	
return(
    <>
	<div className="row">
		<div className="col-12 mt-3" >
			<img src={api+"/uploads/"+photo} alt="" width="100%" height="800px" />
		</div>
	</div>
    </>
)
}
export default Showpost;