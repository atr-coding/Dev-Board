import { useState, useEffect } from 'react'
import './post.css'
import Upvote from '../../assets/upvote-solid.svg';

function Post(props) {
	const [postData, setPostData] = useState({});
	const [comments, setComments] = useState([{}]);
	const [username, setUserName] = useState("");
	const [message, setMessage] = useState("");
	const [votes, setVotes] = useState(postData.votes);

	const backButton = () => {
		setPostData({});
		setComments([{}]);
		props.back();
	};

	useEffect(() => {
		const load_data = () => {
			if (props.id !== undefined) {
				fetch(`/api/posts/${props.id}`).then((data) => data.json()).then((data) => {
					setPostData(data);
					setVotes(data.votes);
				}).catch((err) => {
					console.log("Couldn't load post. Error: " + err);
				});
			}
		};

		const load_comments = () => {
			if (props.id !== undefined) {
				fetch(`/api/comments/${props.id}`).then((data) => data.json()).then((data) => {
					setComments(data);
				}).catch((err) => {
					console.log("Couldn't load post comments. Error: " + err);
				});
			}
		};

		load_data();
		load_comments();
	}, [props.id]);

	const submitComment = async () => {
		const comment = {
			post_id: props.id,
			user: username,
			message: message,
			date: new Date()
		};

		fetch('/api/comments/', {
			method: 'POST',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify(comment)
		}).catch((err) => {
			console.log("Couldn't submit comment. Error: " + err);
		});

		setComments([...comments, comment]);

		setUserName("");
		setMessage("");
	};

	const render_comment = (info) => {
		const date = (new Date(info.date)).toLocaleDateString('en-us', {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "numeric"
		});

		return (
			<div className="dev-board__body--comment" key={info._id + "-container"}>
				<div className="dev-board__body--comment-title" key={info._id + "-title"}>
					<div className="dev-board__body--comment-user" key={info._id + "-user"}>{info.user}</div>
					<div className="dev-board__body--comment-date" key={info._id + "-date"}>{date}</div>
				</div>
				<div className="dev-board__body--comment-message" key={info._id + "-message"}> {info.message} </div>
			</div>
		);
	};

	const increaseVote = async (id) => {
		setVotes(votes + 1);
		fetch(`/api/posts/vote/${id}`, {method: 'PUT'}).catch((err) => {
			console.log("Error in increasevote: ", err);
		});
	};

	return (
		<div>
			<div className="dev-board__body--post">
				<div className="dev-board__body--post-back-button" onClick={() => backButton()}><img src={Upvote} alt="upvote" /></div>
				<div className="dev-board__body--post-title">{postData.title}</div>
				<div className="dev-board__body--post-tag">{postData.status}</div>
				<div className="dev-board__body--post-votes">{votes}</div>
				<div className="dev-board__body--post-upvote">
					<img src={Upvote} alt="upvote" onClick={() => increaseVote(postData._id)} />
				</div>
			</div>

			{comments.map((comment) => render_comment(comment))}

			<div className="dev-board__body--submit-comment-form">
				<div className="dev-board__body--submit-comment-form-username">Name: <input type="text" name="name" maxLength={50} value={username} onChange={(e) => setUserName(e.target.value)}/></div>
				<div className="dev-board__body--submit-comment-form-message">Message: <textarea name="message" maxLength={2048} value={message} onChange={(e) => setMessage(e.target.value)}/></div>
				<input className="dev-board__body--submit-comment-form-submit" type="submit" value="Submit" onClick={() => submitComment()}/>
			</div>
		</div>
	)
}

export default Post