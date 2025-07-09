import React, { useState, useRef, useEffect } from "react";
//list of freq asked questions user can possibliy ask chat bot
const FAQS = [
  { q: "What is this portfolio about?", a: "This is Amrish's portfolio showcasing projects, skills, and experience." },
  { q: "How can I contact you?", a: "You can use the contact form on this site or email me directly." },
  { q: "What technologies do you use?", a: "React, TypeScript, Node.js, and more!" },
  { q: "Can I see your GitHub?", a: "Yes! Check the links in the hero section or footer." },
  { q: "What are your main skills?", a: "My main skills include full-stack development, cloud deployment, and UI/UX design." },
  { q: "Do you have experience with cloud platforms?", a: "Yes, I have experience with AWS, Vercel, and other cloud platforms." },
  { q: "What projects are you most proud of?", a: "I'm proud of several projects, including web apps, automation tools, and open-source contributions. See the Projects section for details." },
  { q: "Are you open to freelance or contract work?", a: "Yes, I'm open to freelance and contract opportunities. Please reach out via the contact form." },
  { q: "Where are you located?", a: "I'm based in Morrisvile,NC,United States." },
  { q: "What is your educational background?", a: "I have a background in Computer Science and continuous self-learning through real-world projects." },
  { q: "What is your preferred tech stack?", a: "I enjoy working with React, TypeScript, Node.js, PostgreSQL, and Tailwind CSS." },
  { q: "How quickly do you respond to messages?", a: "I usually respond within 24-48 hours." },
  { q: "Do you contribute to open source?", a: "Yes, I enjoy contributing to open-source projects and collaborating with the community." },
];
// Function to find an answer to a user's question from the FAQS list
function getAnswer(question: string) {
  const found = FAQS.find(faq => question.toLowerCase().includes(faq.q.toLowerCase().split(" ")[0]));
  return found ? found.a : "Sorry, I don't have an answer for that yet!";
}
// chat bot component
export const ChatbotWidget: React.FC = () => {
  // state to control the open/close state of the chatbot
  const [open, setOpen] = useState(false);
  // state to store the messages in the chatbot
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([]);
  // state to store the input from the user
  const [input, setInput] = useState("");
  // ref to the chat end div
  const chatEndRef = useRef<HTMLDivElement>(null);
// scroll to the bottom of the chat when a new message is added
  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);
  // handle the send button click
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // add user message to the messages state
    setMessages(msgs => [...msgs, { from: "user", text: input }]);
    // add bot message to the messages state
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: "bot", text: getAnswer(input) }]);
    }, 500);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: "#222",
          color: "#fff",
          borderRadius: "50%",
          width: 56,
          height: 56,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          border: "none",
          fontSize: 28,
          cursor: "pointer",
        }}
        aria-label="Open chat"
      >
        💬
      </button>
      {/* chatbot widget */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: 320,
            maxHeight: 400,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            zIndex: 1001,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        > 

          <div style={{ background: "#222", color: "#fff", padding: "12px 16px", fontWeight: 600 }}>
            Ask me about my projects
            <button onClick={() => setOpen(false)} style={{ float: "right", background: "none", border: "none", color: "#fff", fontSize: 18, cursor: "pointer" }}>&times;</button>
          </div>
          {/* chat messages */}
          <div style={{ flex: 1, padding: 12, overflowY: "auto", fontSize: 15 }}>
            {messages.length === 0 && (
              <div style={{ color: "#888", fontStyle: "italic" }}>Try asking: "What is this portfolio about?"</div>
            )}
            {/* map through the messages and display them */}
            {messages.map((msg, i) => (
              <div key={i} style={{ margin: "8px 0", textAlign: msg.from === "user" ? "right" : "left" }}>
                <span style={{
                  display: "inline-block",
                  background: msg.from === "user" ? "#e0e7ff" : "#f3f4f6",
                  color: "#222",
                  borderRadius: 8,
                  padding: "6px 12px",
                  maxWidth: "80%",
                }}>{msg.text}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          {/* chat input form */}
          <form onSubmit={handleSend} style={{ display: "flex", borderTop: "1px solid #eee", padding: 8, background: "#fafafa" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              style={{ flex: 1, border: "none", outline: "none", fontSize: 15, background: "transparent" }}
              autoFocus
            />
            <button type="submit" style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 6, padding: "0 16px", marginLeft: 8, fontWeight: 600, cursor: "pointer" }}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}; 