import React, {useState, useEffect} from 'react';
import './App.css';
import Transactions from './Transactions';

function App() {
  const [username, setUsername] = useState('');
  const [allUserNames, setAllUserNames] = useState([])
  const [changeName, setChangeName] = useState('');

  const handleChange = (e) => {
    setChangeName(e.target.value);
  }

  const handleChangeSubmit = (e) => {
    e.preventDefault()
    setUsername(changeName)
    setChangeName('')
    setAllUserNames(oldData => [...oldData, changeName])
  }

  return (
    <div className="App">
      <div id="username">
        <h1>
          {username}
        </h1>
        {!username ? <p>Please set your sender username</p> : null}
      </div>
      <div id="changeNameForm">
        <form onSubmit={handleChangeSubmit}>
          <input type="text" onChange={handleChange} value={changeName} />Set or Change User Name
          <br />
          <button type="submit">Change Name</button>
        </form>
      </div>
      <Transactions username={username} allUserNames={allUserNames}/>
    </div>
  );
}

export default App;
