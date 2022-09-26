import './categorie.css'

function Categorie(props) {//cat, set_board_callback) {
	function Tab(board) {
		return (<div className={"dev-board__nav--category-tab" + (props.default === board._id ? " selected-tab" : "")} key={board._id} onClick={() => props.set_board_callback(board._id)}>{board.name}</div>)
	};

	return (
		<div className="dev-board__nav--category" key={props.data._id}>
			<div className="dev-board__nav--category-title" key={props.data._id + "-title"}>{props.data.name}</div>
			<div className="dev-board__nav--category-list" key={props.data._id + "-list"}>
				{props.data.boards.map((board) => Tab(board))}
			</div>
		</div>
	)
}

export default Categorie