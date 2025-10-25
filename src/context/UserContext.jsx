import { createContext } from 'react';
import { runGemini } from '../gemini.js'
import { useState } from 'react';


// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext(); // ✅ Capital D

function UserContext({ children }) {
    //when speaking then image of speaking  will be shown  and when not speaking normal  round image will be shown
    //whne false we show normal image and when true we show speaking image
    let[speaking,setSpeaking]=useState(false);
    let[prompttext,setPrompttext]=useState("loading...");
    //jab ai respnd karey we want another respinse not the button response
    let[aiResponding,setAiResponding]=useState(false);
  // eslint-disable-next-line no-unused-vars
  function speak(text) {
    const textspeak = new SpeechSynthesisUtterance(text);
    textspeak.volume = 1;
    textspeak.rate = 1;
    textspeak.pitch = 1;
    textspeak.lang = 'hi-GB';
    window.speechSynthesis.speak(textspeak);
  }
  async function aiRespone(prompt){
    //gemini se response lena hai
    let text=await runGemini(prompt);
    
    
    console.log(text);
    setAiResponding(true);

     setTimeout(()=>{
        setSpeaking(false);
     },5000)
    let newtext=text.split("**")&&text.split("*")&&text.replace("google","Sahil Karmakar")&&text.replace("Google","Sahil Karmakar")
    setPrompttext(newtext);
    speak(newtext);
  }
  //sppech recognition jo bhi hum boley
  let speechRecognition = window.SpeechRecognition||window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.onresult=(e)=>{
    console.log(e);
    let currentIndex=e.resultIndex;
    //transcript ke andar jo bhi bolenege woh show hoga.Isi ko gemeini ko bhejna hai aur resposne dikhana hai 
    let transcript=e.results[currentIndex][0].transcript;
    //jo hum bolenge woh prompttext me show karana hai
    setPrompttext(transcript)
    takecommand(transcript?.toLowerCase?.() || "")
  }
  //now we can use recognitiotn object anywhere in the app
   function takecommand(command) {
  if (command.includes("open") && command.includes("youtube")) {
    window.open("https://www.youtube.com/", "_blank");
    speak("opening youtube");
    setPrompttext("opening youtube");
    setAiResponding(true);
    setTimeout(() => setSpeaking(false), 4000);
  } else if (command.includes("open") && command.includes("google")) {
    window.open("https://www.google.com/", "_blank");
    speak("opening google");
    setPrompttext("opening google");
    setAiResponding(true);
    setTimeout(() => setSpeaking(false), 5000);
  } else if (command.includes("open") && command.includes("facebook")) {
    window.open("https://www.facebook.com/", "_blank");
    speak("opening facebook");
    setPrompttext("opening facebook");
    setAiResponding(true);
    setTimeout(() => setSpeaking(false), 5000);
  } else if (command.includes("open") && command.includes("leetcode")) {
    window.open("https://www.leetcode.com/", "_blank");
    speak("opening leetcode");
    setPrompttext("opening leetcode");
    setAiResponding(true);
    setTimeout(() => setSpeaking(false), 5000);
  } else if (command.includes("open") && command.includes("instagram")) {
    window.open("https://www.instagram.com/", "_blank");
    speak("opening instagram");
    setPrompttext("opening instagram");
    setAiResponding(true);
    setTimeout(() => setSpeaking(false), 5000);
  } else if (command.includes("time")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(time);
    setPrompttext(time);
    setAiResponding(true);
    setTimeout(() => setSpeaking(false), 4000);
  } else if (command.includes("date")) {
    let date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short",
    });
    speak(date);
    setPrompttext(date);
    setAiResponding(true);
    setTimeout(() => setSpeaking(false), 4000);
  } else if (command.includes("joke")) {
    const joke = "Why don't programmers like nature? It has too many bugs.";
    speak(joke);
    setPrompttext(joke);
    setAiResponding(true);
    setTimeout(() => setSpeaking(false), 5000);
  } else if (command.includes("year")) {
    const year = new Date().getFullYear();
    const reply = `The current year is ${year}`;
    speak(reply);
    setPrompttext(reply);
    setAiResponding(true);
    setTimeout(() => setSpeaking(false), 4000);
  } else if (command.includes("battery")) {
    navigator.getBattery().then((battery) => {
      const level = Math.round(battery.level * 100);
      const reply = `Battery is at ${level} percent`;
      speak(reply);
      setPrompttext(reply);
      setAiResponding(true);
      setTimeout(() => setSpeaking(false), 4000);
    });
  } else if (command.includes("weather")) {
    const reply = "Sorry, I can't fetch live weather yet. But it's always sunny in Bhubaneswar!";
    speak(reply);
    setPrompttext(reply);
    setAiResponding(true);
    setTimeout(() => setSpeaking(false), 4000);
  } else if (command.includes("hello") || command.includes("hi")) {
    const reply = "Hello Sahil! How can I assist you today?";
    speak(reply);
    setPrompttext(reply);
    setAiResponding(true);
    setTimeout(() => setSpeaking(false), 4000);
  } else if (command.includes("open github")) {
    speak("Opening GitHub...");
    setPrompttext("Opening GitHub...");
    setAiResponding(true);
    window.open("https://github.com");
    setTimeout(() => setSpeaking(false), 4000);
  } else if (command.includes("your name")) {
    const reply = "I'm LuxA, your personal AI assistant built by Sahil Karmakar.";
    speak(reply);
    setPrompttext(reply);
    setAiResponding(true);
    setTimeout(() => setSpeaking(false), 4000);
  } else if (command.includes("motivate me")) {
    const quote = "Push yourself, because no one else is going to do it for you.";
    speak(quote);
    setPrompttext(quote);
    setAiResponding(true);
    setTimeout(() => setSpeaking(false), 4000);
  } else if (command.includes("open kiit")) {
    speak("Opening KIIT University website...");
    setPrompttext("Opening KIIT University website...");
    setAiResponding(true);
    window.open("https://kiit.ac.in");
    setTimeout(() => setSpeaking(false), 4000);
  } else {
    aiRespone(command); // ✅ Gemini fallback
  }

    
   }
  const value = { recognition,speaking,setSpeaking,prompttext,setPrompttext,aiResponding,setAiResponding }; // ✅ Added setAiResponding

  return (
    <DataContext.Provider value={value}> {/* ✅ Capitalized */}
      {children}
    </DataContext.Provider>
  );
}

export default UserContext;