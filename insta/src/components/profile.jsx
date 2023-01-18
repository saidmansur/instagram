import React, { useEffect, useState } from "react";
import Dnavbar from "./dnavbar";
import { Sub } from "./function";
import axios from "axios";
import { api } from "./function";
import { message } from 'antd';
import { Link, useNavigate, useParams } from "react-router-dom";
const Profile = () => {
	const history = useNavigate();
	if (localStorage.getItem('token') == null) {
		history('/');
	}
	document.body.style.backgroundColor = 'white';
	var moment = require('moment');
	require("moment/min/locales.min");
	moment.locale('ru');
	moment().zone("+06:00");
	const param = useParams();
	const follower_id = param.id;
	const [login, setLogin] = useState();
	const [firstname, setFirstame] = useState();
	const [avatar, setAvatar] = useState();
	const [items, setItems] = useState(null);
	const [items1, setItems1] = useState();
	const [items2, setItems2] = useState(null);
	const [followcounter, setFollowcounter] = useState();
	const [counterpublic, setCounterpublic] = useState();
	const [photo, setPhoto] = useState();

	const posts = async () => {
		const params = {
			'userid': parseInt(localStorage.getItem('token')),

		}
		const post = await axios({
			method: "get",
			params: params,
			url: api + "/enter/login",
			config: {
				headers: {
					"Content-type": "multipart/form-data"
				}
			}
		}
		);
		if (post != null) {
			console.log('posts', post)
			if (post.data.status == 200) {
				console.log('posts', post.data.logins);
				setItems(post.data.logins);
				setCounterpublic(post.data.logins);
				setPhoto(post.data.logins.photo);
			} else {
				setItems(null);
			}
			console.log("posts", post.data.logins)
		}
	}
	const countpublic = () => {
		if (counterpublic != null) {
			const check = counterpublic.filter(i => i.post_id);
			console.log('public count', check.length);
			if (check.length > 0) {
				return check.length;
			} else {
				return 0;
			}
		} else {
			return 0;
		}
	}
	useEffect(() => {
		posts();
	}, [])
	const users = async () => {
		const param = {
			'id': parseInt(localStorage.getItem('token')),

		}
		console.log('param', param);
		const user = await axios({
			method: "get",
			params: param,
			url: api + "/users/user",
			config: {
				headers: {
					"Content-type": "multipart/form-data"
				}
			}
		}
		);
		if (user != null) {
			if (user.status == 200) {
				console.log(user.data);
				// localStorage.setItem('token', user.data.id)
				setItems1(user.data.user.name);
				setFirstame(user.data.user.firstname);
				setLogin(user.data.user.login);
				setAvatar(user.data.user.avatar);
			} else {
				console.log("Error!");
			}
			console.log("items1", items1);
		}
	}
	useEffect(() => {
		users();
		countfollowers();
	}, [])
	// const pdelete = async (post_id, photo) => {
	// 	const param = {
	// 		'post_id': parseInt(post_id),
	// 		'image': photo,

	// 	}
	// 	const deletes = await axios({
	// 		method: "delete",
	// 		params: param,
	// 		url: api + "/login/post",
	// 		config: {
	// 			headers: {
	// 				"Content-type": "multipart/form-data"
	// 			}
	// 		}
	// 	}
	// 	);
	// 	if (deletes != null) {
	// 		console.log(deletes);
	// 		if (deletes.status == 200) {
	// 			message.success('Пост удален!');
	// 			posts();
	// 			console.log('delete', param);
	// 		} else {
	// 			message.error('Неудалось удулить пост');

	// 		}
	// 		console.log("posts", deletes.data.post_id)
	// 	}
	// }
	const countfollowers = async () => {
		const countfollow = await axios({
			method: "get",
			url: api + "/followers/follow",
			config: {
				headers: {
					"Content-type": "multipart/form-data"
				}
			}
		}
		);
		if (countfollow.data.status == 200) {
			setItems2(countfollow.data.followers);
			setFollowcounter(countfollow.data.followers);
		}
		console.log('cfollow', countfollow)

	}

	const countfollows = () => {
		if (followcounter != null) {
			const checks = followcounter.filter(i => i.follower_id == 1 && i.users_id == localStorage.getItem('token'));
			console.log('followers count', checks.length);
			if (checks.length > 0) {
				return checks.length;
			} else {
				return 0;
			}
		} else {
			return 0;
		}
	}
	return (
		<div>
			<Dnavbar />
			<div class="row">
				<div class="col-12 mt-3">
					<div className="row">
						<div className="col-10">
							<h2 class="float-left">{firstname}</h2>
						</div>
						<div className="col-2">
							<Link to="/smain" class="mt-1 btn float-right dropdown-toggle" role="button" data-toggle="dropdown"><i class="fas fa-list-ul"></i>
							</Link>
						</div>
					</div>
				</div>
				<hr />
				<div class="row">
					<div class="col-4">
						<img alt="" class="rounded-circle border border-danger" src={api + "/registrations/uploads/" + avatar} width="100" height="100" />
					</div>
					<div class="col-2 ml-3">
						<p class="text-center mt-4"><b>
							{items != null || items?.length > 0 ?
								<>
									{items.length}
								</> : <>0</>
							}
						</b><br /><small>Публикации</small></p>
					</div>
					<div class="col-4">
						<p class="text-center mt-4"><b></b><br /><small>Подписчики</small></p>
					</div>
					<div class="col-2 ml-3">
						<p class="text-center mt-4"><b>
							{items2 != null || items2?.length > 0 ?
								<>
									{items2.length}
								</> : <>0</>
							}
						</b><br /><small>Подписки</small></p>
					</div>
					<div class="col-12">
						<h3 class="mt-3 ml-2">{login}</h3>
					</div>
					<div class="col-4 d-flex justify-content-center">
						<Link class="btn  form-control" to="/change"><b>Изменить</b></Link>
					</div>
					<div class="col-4 d-md-flex justify-content-center">
						<Link class="btn  form-control" to="/promotion"><b>Продвижение</b></Link>
					</div>
					<div class="col-4 d-md-flex justify-content-center">
						<Link to="/statistica" class="btn  form-control"><b>Статистика</b></Link>
					</div>

					<div class="col-12 mt-3">
						<p><b>Актуальное из историй</b><br />Сохраняйте свои лучшее истории в профиле</p>
					</div>
					<div class="col-12">
						<div class="row">
							<div className="col-3">
								<button class="rounded-circle btn btn-light border border-secondary ">
									<i class="fas fa-plus m-4"></i>
								</button>
								<p class="a">Добавить</p>
							</div>
						</div>
					</div>
					<div class="col-12">
						<div class="row">
							<div class="col-6 d-flex justify-content-center">
								<i class="fas fa-table fa-2x"></i>
							</div>
							<div class="col-6 d-md-flex justify-content-center border-left">
								<i class="fas fa-user-plus fa-2x"></i>
							</div>
						</div>
						<hr />
					</div>
					<div class="col-12 mt-5">
						<div className="row ml-5">
							{items!= null ?
								<>
									{items.map((item) =>
										<div className="col-4 "
										>
											<div className="row">
												<div className="col-2">
													{/* <button type="button" class="btn btn-white form-control form-control-lg font-weight-bold" data-bs-toggle="modal" data-bs-target="#exampleModal">
														<i class="fa-solid fa-trash"></i>
													</button> */}
												</div>
												<div className="col-2"><Link to={"/publicchange/" + item.post_id + "/" + item.photo} className="btn btn-white form-control form-control-lg font-weight-bold"><i class="fa-solid fa-pencil"></i></Link></div>
											</div>
											<div className="row ml-4" >
												<Link to={"/showpost/" + item.post_id} class="btn">
													<div className="col-12 " id="profilephoto"
														style={{
															backgroundImage: "url(" + api + "/uploads/" + item.photo + ")",
														}}
													> </div>
												</Link>
											</div>
											<p className="text-center">{item.comment}</p>
											<p><b>{item.location}</b></p>
											<p><small>{moment(item.data).calendar()
											}</small></p>
										</div>
									)}
								</> : <>
								<div class="spinner1"></div>
								</>
							}

						</div>
					</div>

				</div>
			</div>
		</div>
	);
}
export default Profile;