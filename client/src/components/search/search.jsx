import { useState } from 'react';
import './search.css'

function Search(props) {
	const [query, setQuery] = useState("");

	const keyDown = (e) => {
		if (e.key === 'Enter') {
			props.setSearchQuery({ ...props.searchQuery, text: query });
		}
	}

	return (
		<div className="dev-board__body--search">
			<input placeholder="Search Query" type="text" maxLength="512" value={query} onInput={(e) => setQuery(e.target.value)} onKeyDown={(e) => keyDown(e)} />
			<button className="dev-board__body--search-button" onClick={() => props.setSearchQuery(query)}>
				Search
			</button>
		</div>
	)
}

export default Search