import { useState } from 'react'
import './App.css';
import { Header } from './components'
import { Navbar, Body } from './containers'

function App() {

  const [boardId, setBoardId] = useState(0);

  return (
    <div className="App">
      <Header />
      <Navbar set_board_callback={(board_id) => setBoardId(board_id)} />
      <Body board_id={boardId}/>
    </div>
  );
}

export default App;
