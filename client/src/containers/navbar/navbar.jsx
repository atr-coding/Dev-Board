import { useState, useEffect } from 'react'
import './navbar.css'
import { Categorie } from '../../components'

function Navbar(props) {
	const [categories, setCategories] = useState([]);
	const [default_id, setDefaultBoardId] = useState(0);

	function setBoard(id) {
		setDefaultBoardId(id);
		props.set_board_callback(id);
	}

	async function getCategories() {
		await fetch("/api/categories").then((res) => res.json()).then((data) => {
			setCategories(data)
			if (data.length >= 1) {
				if (data[0].boards.length >= 1) {
					setDefaultBoardId(data[0].boards[0]._id);
					props.set_board_callback(data[0].boards[0]._id);
				}
			}
		});
	};

	useEffect(() => { getCategories() }, []);

	return (
		<div className="dev-board__nav">
			{categories.map((cat) => <Categorie data={cat} set_board_callback={setBoard} key={cat._id} default={default_id} />)}
		</div>
	)
}

export default Navbar