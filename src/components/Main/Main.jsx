//import React from 'react'
import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Main.css'
import { Context } from '../../Context/context'
import { useEffect } from 'react'

const Main = () => {
    const {onSent,recentPrompt,showResult,loading,resultdata,setInput,input} = useContext(Context);
    const [name,setName] = useState();
    useEffect(()=>{
        if(!name){
            const userName = prompt("Enter Your Name");
            setName(userName);
        }
    }, [name])
  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult?<>
            <div className="greet">
            <p><span>Hello,{name} </span></p>
            <p>How can i help you?</p>
        </div>
        <div className="cards">
            <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
                <p>Briefly summarize this concept: Urban Planning</p>
                <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
                <p>brainstrom team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
            </div>
        </div>
        </>
        : <div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading?<div className='loader'>
                    <hr />
                    <hr />
                    <hr />
                </div>
                :<p dangerouslySetInnerHTML={{__html:resultdata}}></p>}
            </div>
        </div>
        }
       
        <div className="main-bottom">
            <div className="search-box">
                <input onChange={(e)=>{setInput(e.target.value)}} value={input} type="text" placeholder='Enter a prompt here' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img 
  id="mic-icon" 
  src={assets.mic_icon} 
  alt="" 
  onClick={() => {
    // Activate voice input
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.maxResults = 10;

    recognition.onstart = () => {
      // Hide the mic icon when the mic is on
      document.getElementById('mic-icon').style.visibility = 'hidden';
      document.getElementById('mic-status').innerHTML = 'Listening...';
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onend = () => {
      // Show the mic icon when the mic is off
      document.getElementById('mic-icon').style.visibility = 'visible';
      document.getElementById('mic-status').innerHTML = '';
    };

    recognition.start();
  }} 
/>
<span id="mic-status" style={{ fontSize: '12px', color: 'gray' }}></span>
                  {input?<img onClick={()=>{onSent()}} src={assets.send_icon} alt="" />:null}  
                </div>
            </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps 
                </p>
        </div>
      </div>
    </div>
  )
}

export default Main
