import { useState, useEffect } from 'react'
import './sort.css'

// function SortSelect(e) {
// 	console.log(e.target.value);
// }

function FilterSelect(e) {

}


function Sort(props) {
	const [tags, setTags] = useState([]);
	
	useEffect(() => {
		async function getTags() {
			fetch(`/api/tags`).then((res) => res.json()).then((data) => { setTags(data) })
			.catch((err) => {
				console.log("Error in retreiving tags: " + err);
			});
		};
	
		getTags();
	}, []);

	return (
		<div className="dev-board__body--sort-bar">
			<b>Sort By:</b>
			<div className="dev-board__body--sort-dropdown">
				<select onChange={(e) => {props.setSortType(e.target.value)}} className="dev-board__body--sort-dropdown-select">
					<option value="0">Most Votes</option>
					<option value="1">Newest</option>
				</select>
			</div>

			<b>Filter By Tag(s):</b>
			<div className="dev-board__body--sort-dropdown">
				<select onClick={FilterSelect} className="dev-board__body--sort-dropdown-select">
					<option value=""></option>
					{tags.map((tag) => (
						<option value={tag._id} key={tag._id}>{tag.name}</option>
					))};
				</select>
			</div>
		</div>
	)
}

export default Sort