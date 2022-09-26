import { useState, useEffect } from 'react'
import './posts.css'
import Upvote from '../../assets/upvote-solid.svg';

function Post(props) {
	const [votes, setVotes] = useState(props.data.votes);

	const increaseVote = async (id) => {
		setVotes(votes + 1);
		fetch(`/api/posts/vote/${id}`, {method: 'PUT'}).catch((err) => {
			console.log("Error in increasevote: ", err);
		});
	};

	return (
		<div className="dev-board__body--board-post" key={props.data._id + "-container"}>
			<div className="dev-board__body--board-post-title" key={props.data._id + "-title"} onClick={() => props.setPostId(props.data._id)}>{props.data.title}</div>
			<div className="dev-board__body--board-post-tag" key={props.data._id + "-status"}>{props.data.status}</div>
			<div className="dev-board__body--board-post-votes" key={props.data._id + "-votes"}>{votes}</div>
			<div className="dev-board__body--board-post-upvote" key={props.data._id + "-upvote"}>
				<img src={Upvote} alt="upvote" onClick={() => increaseVote(props.data._id)} />
			</div>
		</div>
	)
}

function Posts (props) {
	const [posts, setPosts] = useState([]);

	function sortPosts (data, type) {
		if(Number(type) === 0) { // sort by votes
			data.sort((a, b) => {
				return (a.votes > b.votes ? -1 : 1);
			});
		} else if(Number(type) === 1) { // sort by newest
			data.sort((a, b) => {
				let d1 = new Date(a.date);
				let d2 = new Date(b.date);
				return d1 < d2;
			});
		}
		setPosts(data);
	}

	async function getPosts() {
		if (props.board_id === 0 || props.board_id === undefined) { return; }
		fetch(`/api/posts/cat/${props.board_id}`).then((res) => res.json()).then((data) => {
			sortPosts(data, props.sortType);
		}).catch((err) => {
			console.log("Error in fetching posts: ", err);
		});
	};

	useEffect(() => {
		getPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.board_id]);

	useEffect(() => {
		const postsCopy = [].concat(posts);
		sortPosts(postsCopy, props.sortType);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.sortType]);

	useEffect(() => {
		if(props.searchQuery.text.length > 0) {
			fetch('/api/search/?' + new URLSearchParams({
				query: props.searchQuery.text
			})).then((res) => res.json()).then((data) => {
				// console.log(data);
				sortPosts(data, props.sortType);
			}).catch((err) => {console.log(err)});
		} else {
			getPosts();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.searchQuery]);

	return (
		<div>
		{ posts.map((post) => <Post data={post} key={post._id } setPostId={props.setPostId} />) }
		</div>
	)
}

export default Posts