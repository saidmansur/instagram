import React, { useEffect, useState } from "react";
import Dnavbar from "./dnavbar";
import { Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { api } from "./function";
const Hearts = () => {
	const history = useNavigate();
	if (localStorage.getItem('token') == null) {
		history('/');
	}
	document.body.style.backgroundColor='white';
	const [firstname, setFollowername] = useState();
	const [avatar, setAvatar] = useState();
	const [items1, setItems1] = useState();
	const [follows, setFollows] = useState(null);
	const [followcounter, setFollowcounter] = useState();
	const param = useParams();
    const id = param.id;
    const local = localStorage.getItem('token');
	const follower = async () => {
		const param = {
			'users_id': local
		}
		console.log('params',param);
		const follow = await axios({
			method: "get",
			params:param,
			url: api + "/userfollowers/fol",
			config: {
				headers: {
					"Content-type": "multipart/form-data"
				}
			}
		}
		);
		console.log("followers", follow)
		if (follow != null) {
			if (follow.data.status == 200) {
				setFollows(follow.data.follower);
				setFollowername(follow.data.follower.followername);
				setAvatar(follow.data.follower.avatar);
				console.log("follower", follow)
			}else{
				setFollows(null);
			}
		}
	}

	// const user = async () => {
	// 	const param = {
	// 		'id': parseInt(localStorage.getItem('token')),

	// 	}
	// 	const userss = await axios({
	// 		method: "get",
	// 		params: param,
	// 		url: api + "/users/userss",
	// 		config: {
	// 			headers: {
	// 				"Content-type": "multipart/form-data"
	// 			}
	// 		}
	// 	}
	// 	);
	// 	if (userss != null) {
	// 		if (userss.status == 200) {
	// 			console.log(userss.data);
	// 			setItems1(userss.data.users);
	// 			setFirstname(userss.data.users.firstname);
	// 			setAvatar(userss.data.users.avatar);
	// 		} else {
	// 			console.log("Error!");
	// 		}
	// 		console.log("items1", userss.data);
	// 	}
	// }

	const addfollower = async (follower_id) => {
		const param = {
			'users_id': localStorage.getItem('token'),
			'follower_id':follower_id
		}
		const addfollow = await axios({
			method: "post",
			params: param,
			url: api + "/followers/follower",
			config: {
				headers: {
					"Content-type": "multipart/form-data"
				}
			}
		}
		);
		console.log('added follower', addfollow);
		if (addfollow.data.status == 200) {
			follower();
			// user();
			console.log('added follower', addfollow);
		}
	}
	const checkFollows = (follower_id) => {
		if (follows != null) {
			const check = follows.filter(item => item.follower_id ==follower_id && item.users_id == localStorage.getItem('token'));
			console.log('check', check.length);
			if (check.length > 0) {
				console.log('check',check)
				return true;
			} else {
				console.log('check',check)
				return false;
			}
		} else {
			return false;
		}
		
	}
	const removeFollows = async (follower_id, users_id) => {
		const param = {
			'follower_id': parseInt(follower_id),
			'users_id': localStorage.getItem('token')
		}
		console.log(param);
		const removefollows = await axios({
			method: "delete",
			params: param,
			url: api + "/followers/follower",
			config: {
				headers: {
					"Content-type": "multipart/form-data"
				}
			}
		}
		);
		console.log('delete follow', removefollows);
		if (removefollows.data.status == 200) {
			follower();
			// user();
		}
	}

	useEffect(() => {
		// user();
		follower();
	}, [])

	return (
		<div>
			<Dnavbar />
			<div class="row">
				{follows!= null ?
					<>
						{follows.map((item) =>
							<div class="col-12">
								<div className="row">
									<div className="col-10">
										<img alt="" class="rounded-circle border border-danger float-left" src={item.avatar} width="60" height="60" />
										<b class="float-left mt-3 ml-2 font-weight-bolder">{item.followername}</b>
									</div>
									<div className="col-2">
									{checkFollows( item.follower_id) ?
											<button class="btn bg-light text-dark" onClick={() => { removeFollows( item.follower_id) }}>
												Отписаться
											</button>
											:
											<button class="btn bg-info text-light" onClick={() => { addfollower( item.follower_id) }}>
												Подписаться
											</button>
                                       }
									</div>
								</div>
								<hr />
							</div>

						)}
					</> : <>
						<div class="spinner-border" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</>
				}
			</div>
		</div>
	);
}

export default Hearts;