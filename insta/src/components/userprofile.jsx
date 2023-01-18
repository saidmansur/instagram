import React, { useEffect, useState } from "react";
import Dnavbar from "./dnavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "./function";
import { LIST_IGNORE } from "antd/lib/upload/Upload";
const Userprofile = () => {
	const history = useNavigate();
	const param = useParams();
	const userId = param.id;
	const param1 = useParams();
	const follower_id = param1.followerid;
	const dialog_second_user_id = userId;
	const dialog_first_user_id = localStorage.getItem('token');
	if (localStorage.getItem('token') == null) {
		history('/');
	}
	document.body.style.backgroundColor='white';
	var moment = require('moment');
	require("moment/min/locales.min");
	moment.locale('ru');
	moment().zone("+06:00");
	const [login, setLogin] = useState();
	const [firstname, setFirstame] = useState();
	const [avatar, setAvatar] = useState();
	const [items, setItems] = useState(false);
	const [items1, setItems1] = useState();
	const [items2, setItems2] = useState();
	const [follows, setFollows] = useState(null);
	const [followcounter, setFollowcounter] = useState();
	const [counterpublic, setCounterpublic] = useState();
	const [chat, setChat] = useState();
	const [cchat, setCchat] = useState();
	const [dialog_id, setDialogid] = useState();

	const posts = async () => {
		const params = {
			'userid': userId,

		}
		const data = await axios({
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
		if (data != null) {
			console.log(data)
			if (data.status == 200) {
				console.log(data.data.logins)
				setItems(data.data.logins);
				setCounterpublic(data.data.logins)
			} else {
				console.log("Error!");
			}
			console.log("posts", data.data.logins)
		}
	}
	useEffect(() => {
		posts();
		users();
		follower();
		checkFollows();
		countfollowers();
		chats();
		checkchat();
	}, [])
	const users = async () => {
		const param = {
			'id': userId,

		}
		const user = await axios({
			method: "get",
			params: param,
			url: "" + api + "/users/user",
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
				// localStorage.setItem('token', user.data.user.id)
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

	const follower = async () => {
		const param = {
			'users_id': localStorage.getItem('token'),

		}
		const follow = await axios({
			method: "get",
			params: param,
			url: api + "/followers/follower",
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
				setFollows(follow.data.post);
				console.log("follower", follow)
			} else {
				setFollows(null);
			}
		}
	}
	const checkFollows = () => {
		if (follows != null) {
			const check = follows.filter(i => i.follower_id == userId && i.users_id == localStorage.getItem('token'));
			console.log('check', check.length);
			if (check.length > 0) {
				console.log('check follower', check)
				return true;
			} else {
				console.log('check follower', check)
				return false;
			}
		} else {
			return false;
		}

	}
	const removeFollows = async () => {
		const param = {
			'follower_id': userId,
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
			posts();

		}
	}
	const addfollower = async () => {
		const param = {
			'users_id': localStorage.getItem('token'),
			'follower_id': userId,
			'firstname': firstname,
			'avatar': avatar
		}
		console.log('params', param);
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
			posts();
			console.log('added follower', addfollow);
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
	const countfollowers = async () => {
		const param = {
			'users_id': userId
		}
		console.log('params', param);
		const countfollow = await axios({
			method: "get",
			params: param,
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
			const checks = followcounter.filter(i => i.follower_id == userId);
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
	const startchat = async () => {
		const param = {
			'dialog_first_user_id': localStorage.getItem('token'),
			'dialog_second_user_id': userId,
			'dialog_id': dialog_id,
		}
		const start = await axios({
			method: "post",
			params: param,
			url: api + "/chats/chatz",
			config: {
				headers: {
					"Content-type": "multipart/form-data"
				}
			}
		}
		);
		if (start != null) {
			if (start.status == 200) {
				history('/message/' + dialog_id + "/" + userId);
				console.log(start.data);
				console.log('start', start);
			} else {
				console.log("Error!");
			}
			console.log("starts", start);
		}
	}

	const chats = async () => {
		const param = {
			'dialog_first_user_id': localStorage.getItem('token'),
			'dialog_second_user_id': userId,
		}
		const chatz = await axios({
			method: "get",
			params: param,
			url: api + "/chats/chatz",
			config: {
				headers: {
					"Content-type": "multipart/form-data"
				}
			}
		}
		);
		console.log("chats", chatz)
		if (chatz != null) {
			if (chatz.data.status == 200) {
				setChat(chatz.data.post);
				console.log("chats", chatz);
			} else {
				setChat(null);
			}
		}
	}
	const checkChats = (dialog_id) => {
		if (chat != null) {
			const check = chat.filter(i => (i.dialog_second_user_id == dialog_id && i.dialog_first_user_id == localStorage.getItem('token')) || (i.dialog_second_user_id == localStorage.getItem('token') && i.dialog_first_user_id == dialog_id));
			console.log('check chats', check.length > 0);
			if (check.length > 0) {
				console.log('check chats', check)
				return <Link to={"/message/" + check[0].dialog_id + "/" + dialog_id} className='btn bg-info text-light' >
					<i class="fa-light fa-messages"> Перейти в Сообщения</i>
				</Link>
			} else {
				console.log('check chat', check)
				return <button onClick={() => { startchat(dialog_second_user_id) }} className='btn bg-info text-light '>
					<i class="fa-solid fa-envelope-open"> Написать</i>
				</button>
			}
		} else {
			return false;
		}

	}
	const checkchat = async () => {
		const param = {
			'dialog_first_user_id': localStorage.getItem('token'),
			'dialog_second_user_id': userId,
		}
		const cchat = await axios({
			method: "get",
			params: param,
			url: api + "/checkchats/chat",
			config: {
				headers: {
					"Content-type": "multipart/form-data"
				}
			}
		}
		);
		console.log("unknown", cchat)
		if (cchat != null) {
			if (cchat.data.status == 200) {
				setDialogid(cchat.data.post[0].dialog_id);
				console.log(cchat.data.post[0].dialog_id);
			} else {
				alert = 'Error'
			}
		}
	}

	return (
		<div>
			<Dnavbar />
			<div class="row">
				<div class="col-12 mt-3">
					<div className="row">
						<div className="col-8">
							<h2 class="float-left">{firstname}</h2>
						</div>
						<div className="col-2">
						</div>
						<div className="col-2">

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
						<p class="text-center mt-4"><b>226</b><br /><small>Подписчики</small></p>
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
					<div class="col-4 ">
						{checkFollows(follower_id) ?
							<button class="btn bg-light text-dark" onClick={() => { removeFollows(follower_id) }}>
								Отписаться
							</button>
							:
							<button class="btn bg-info text-light" onClick={() => { addfollower(follower_id) }}>
								Подписаться
							</button>
						}
					</div>
					<div class="col-4 d-flex justify-content-start">
						{checkChats(userId)}
					</div>
					<div class="col-4 d-md-flex justify-content-center">

					</div>

					<div class="col-12 mt-3">

					</div>
					<div class="col-12">
						<div class="row">
							<div className="col-3">
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
							{items ?
								<>
									{items.map((item) =>
										<div className="col-4 "
										>
											<div className="row">
												<div className="col-2"></div>
												<div className="col-2"></div>
											</div>
											<div className="row" >
												<Link to={"/showpost/" + item.post_id}>
													<div className="col-10 ml-5"
														style={{
															boxSizing: "border-box",
															backgroundImage: "url(" + api + "/uploads/" + item.photo + ")",
															width: "90%",
															height: "400px",
															backgroundSize: "cover",
															backgroundRepeat: "no-repeat"
														}}
													> </div>
												</Link>
											</div>
											{/* <img src={'https://sstss.ru/login/uploads/' + item.photo} width='100%' height="300px" /> */}
											<p className="text-center">{item.comment}</p>
											<p><b>{item.location}</b></p>
											<p><small>{moment(item.data).calendar()
											}</small></p>
										</div>
									)}
								</> : <></>
							}

						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Userprofile;