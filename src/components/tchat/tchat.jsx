import React, { useState, useEffect } from 'react';
import './chat.scss';
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
    }
  };

  useEffect(() => {
    // Simuler la réponse automatique du bot
    if (messages.length && messages[messages.length - 1].sender === 'user') {
      setTimeout(() => {
        setMessages([...messages, { text: "Je suis un bot ! Comment puis-je vous aider ?", sender: 'bot' }]);
      }, 1000);
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat</h3>
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Écrivez un message..." 
        />
        <button onClick={handleSendMessage}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default Chat;
