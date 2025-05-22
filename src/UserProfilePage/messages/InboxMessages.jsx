// import React, { useEffect, useState } from 'react';
// import './InboxMessages.css';

// function InboxMessages() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/contacts/2')
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch messages');
//         return res.json();
//       })
//       .then((data) => {
//         setMessages(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="inbox-status">Loading messages...</div>;
//   if (error) return <div className="inbox-status error">{error}</div>;
//   if (messages.length === 0) return <div className="inbox-status">No messages found.</div>;

//   return (
//     <div className="inbox-container">
//       <h2>Inbox Messages</h2>
//       <ul className="message-list">
//         {messages.map((msg) => (
//           <li key={msg.id} className="message-card">
//             <div className="message-body">{msg.message}</div>
//             <div className="message-footer">
//               <span className="sender-name"><strong>From:</strong> {msg.sender_name || 'Anonymous'}</span>
//               <span className="date">{new Date(msg.created_at).toLocaleString()}</span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default InboxMessages;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this
import './InboxMessages.css';

function InboxMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Add this
  const [userid,setuserid]=useState('');


  useEffect(() => {
const user=JSON.parse( localStorage.getItem('user'));
setuserid(user.id);
    fetch(`http://localhost:5000/api/contacts/${userid}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch messages');
        return res.json();
      })
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleMessageClick = (msg) => {
    navigate(`/chat/${msg.user_id}`); 

  };

  if (loading) return <div className="inbox-status">Loading messages...</div>;
  if (error) return <div className="inbox-status error">{error}</div>;
  if (messages.length === 0) return <div className="inbox-status">No messages found.</div>;

  return (
    <div className="inbox-container">
      <h2>Inbox Messages</h2>
      <ul className="message-list">
        {messages.map((msg) => (
          <li key={msg.id} className="message-card" onClick={() => handleMessageClick(msg)}>
            <div className="message-body">{msg.message}</div>
            <div className="message-footer">
              <span className="sender-name"><strong>From:</strong> {msg.sender_name || 'Anonymous'}</span>
              <span className="date">{new Date(msg.created_at).toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InboxMessages;
