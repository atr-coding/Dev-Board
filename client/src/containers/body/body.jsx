import { React, useState, useEffect } from 'react'
import './body.css'
import { Search, Sort, Post } from '../../components'
import Posts from '../posts/posts'

function Body(props) {
	const [sortType, setSortType] = useState(0);
	const [searchQuery, setSearchQuery] = useState({ text: '' });
	const [postId, setPostId] = useState(0);

	const back = () => {
		setPostId(0);
	};

	const board = () => {
		return (
			<>
				<Search setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
				<Sort setSortType={setSortType} />
				<Posts sortType={sortType} board_id={props.board_id} searchQuery={searchQuery} setPostId={setPostId} />
			</>
		);
	};

	useEffect(() => {
		if(props.board_id !== 0) {
			setPostId(0);
		}
	}, [props.board_id]);

	return (
		<div className="dev-board__body">
			{postId === 0 ? board() : <Post back={back} id={postId} /> }
		</div>
	)
}

export default Body