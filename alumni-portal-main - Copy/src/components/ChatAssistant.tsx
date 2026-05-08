'use client';
import { useState, useRef, useEffect } from 'react'; 
import { MessageSquare, X, Send } from 'lucide-react';
import styles from './ChatAssistant.module.css';

// 1. PLACE FAQ_DATA AT THE TOP
const FAQ_DATA: Record<string, string> = {
  "What is GBPIET?": "G.B. Pant Institute of Engineering & Technology (GBPIET) is a premier engineering college in Pauri Garhwal, Uttarakhand.",
  "How do I join the Alumni Network?": "Register via the 'Login / Register' button. Once verified, you'll be part of the official network.",
  "Where is the college located?": "The campus is located in Ghurdauri, Pauri Garhwal, Uttarakhand.",
  "When was the college founded?": "GBPIET was established in 1989.",
  "What is the 'Legacy Wall'?": "The Legacy Wall is a space dedicated to the history and milestones of our alumni and institute.",
  "How can I post a job?": "Go to the Careers section; if you are a verified alumnus, you can post vacancies for the community.",
  "What are the major college fests?": "The annual fests are 'Goonj' (Cultural) and 'Josh' (Sports).",
  "How to find my batchmates?": "Use the 'Alumni Connect' directory and filter by your graduation year.",
  "Is this portal official?": "Yes, this is the official GBPIET Network for alumni and student synchronization.",
  "How can I contact support?": "You can reach out to the admin through the 'Institutional Alerts' or the contact page.",
  "How do I update my profile?": "Go to 'Me' > 'View Profile' to edit your details and professional info.",
  "Can I message alumni directly?": "Yes, once logged in, you can use the 'Messages' tab to connect.",
  "What is 'Network Sync'?": "Sync indicates your level of activity and connection within the alumni ecosystem.",
  "Who are the top recruiters?": "Alumni work at top firms like TCS, Infosys, Wipro, Nokia, and Microsoft.",
  "Are there any campus vacancies?": "Current job openings at the college are listed under 'Campus Vacancies' in the Jobs tab.",
  "What is the 'GBPIET Feed'?": "It is a real-time social feed for campus news, alumni posts, and updates.",
  "How do I report a post?": "Use the report icon on any post to alert the coordination committee.",
  "What are 'Institutional Alerts'?": "These are official notifications regarding fests, registrations, and college news.",
  "How to reset my password?": "Click 'Forgot Password' on the login screen to receive a reset link.",
  "Can students use this portal?": "Yes, current students can join to find mentors and explore career opportunities."
};

const DEFAULT_RESPONSE = "I'm sorry, I don't have that information. Please select one of the suggested questions or contact the admin.";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi! How can I help you with the GBPIET Network today?", isBot: true }
  ]);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const askQuestion = (question: string) => {
    // Add user question
    const newMessages = [...messages, { text: question, isBot: false }];
    
    // Get answer
    const answer = FAQ_DATA[question] || DEFAULT_RESPONSE;
    
    // Add bot answer with a tiny delay for realism
    setMessages(newMessages);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: answer, isBot: true }]);
    }, 400);
  };

  return (
    <div className={styles.chatContainer}>
      <button className={styles.fab} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <MessageSquare />}
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h4>GBPIET Assistant</h4>
          </div>
          
          <div className={styles.chatBody} ref={chatBodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={m.isBot ? styles.botMsg : styles.userMsg}>
                {m.text}
              </div>
            ))}
          </div>

          <div className={styles.suggestionTitle}>Suggested Questions:</div>
          <div className={styles.suggestions}>
            {Object.keys(FAQ_DATA).map((q, i) => (
              <button key={i} onClick={() => askQuestion(q)} className={styles.qBtn}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

