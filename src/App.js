// import logo from './logo.svg';
import './App.css';
import AppRoute from './routes/routes'
import { useState } from "react";
import themecontext from './context/themeContext';
import languagecontext from './context/languagecontext';


function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  return (
    <div className="App">
      <themecontext.Provider value={{darkMode, setDarkMode}}>
      <languagecontext.Provider value={{language, setLanguage}}>
      <AppRoute/> 
      </languagecontext.Provider>
        </themecontext.Provider>
      {/* </Header> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
