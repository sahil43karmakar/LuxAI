import React, { useContext } from 'react'
import './App.css'
import va from "./assets/ai.png"
import './index.css'
import { CiMicrophoneOn } from "react-icons/ci";
import { DataContext } from './context/UserContext';
import speak from './assets/speak.gif';
import aivoice from './assets/aiVoice.gif'
function App() {
  let {recognition,speaking,setSpeaking,prompttext,aiResponding,setAiResponding,setPrompttext}=useContext(DataContext)
  return (
    <div className='main'>
      <img src={va} id="luxa" />
      <span className="luxa-headline">
        I'm Luxa, Your Personal Assistant
      </span>

      {/* when speaking value is false, show button */}
      {!speaking ? (
        <button
          onClick={() => {
            setPrompttext("Listening")
            setSpeaking(true);
            recognition.start();
            setAiResponding(false);
          }}
        >
          Click here <CiMicrophoneOn />
        </button>
      ) : (
        <div className='response'>
          {!aiResponding ? (
            <img src={speak} id='speak' />
          ) : (
            <img src={aivoice} id='aigif' />
          )}
          {/* jo bhi hum bolenge we show here */}
          <p>{prompttext}</p>
          {/* jab ai response ho toh purple line */}
        </div>
      )}
    </div>
  );

  
}

export default App;