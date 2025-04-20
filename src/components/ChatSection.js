import React, { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp ,where, collectionGroup} from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // Ensure you have auth imported
import { doc, getDoc } from "firebase/firestore"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const ChatSection = ({ selectedClassroom, closeChat }) => {
  
  const [messages, setMessages] = useState([]); // ✅ State for messages
  const [message, setMessage] = useState(""); // ✅ State for input field
  const [isHovered, setIsHovered] = useState(false); // ✅ Hover effect for button
  

  

  const { classroomId, courseName, teacherName } = selectedClassroom; // ✅ Extract values safely

  

  // ✅ Fetch username from Firestore
 
  const getUsername = () => {
    return new Promise((resolve) => {
      const storedUser = localStorage.getItem("user");
  
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        console.log("✅ Retrieved username from localStorage:", userData.username);
        resolve(userData.username);
      } else {
        console.warn("⚠️ No user found in localStorage");
        resolve("Anonymous");
      }
    });
  };
  
  // ✅ Send message to Firestore
  const sendMessage = async () => {
    if (!message.trim()) return;
    if (!classroomId) {
      console.error("❌ classroomId is missing!");
      return;
    }
  
    console.log("🔍 Fetching username...");
  
    try {
      const username = await getUsername(); // ✅ Wait for username before sending
  
      console.log("📨 Sending message as:", username);
  
      await addDoc(collection(db, "chats"), {
        text: message,
        username: username, // ✅ Should now store the correct name
        timestamp: serverTimestamp(),
        classroomId: classroomId,
      });
  
      console.log("✅ Message sent successfully!");
      setMessage("");
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };
  
  useEffect(() => {
    if (!classroomId) return;

    console.log("📡 Listening for new messages in:", classroomId);

    const q = query(
      collection(db, "chats"),
      where("classroomId", "==", classroomId),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(fetchedMessages); // ✅ Updates messages in real-time
      console.log("✅ New messages loaded:", fetchedMessages);
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, [classroomId]);

 

  return (
    <div style={styles.chatBox}>
      <h2 style={styles.h2}>{courseName}</h2>
      <button 
        onClick={closeChat} 
        style={isHovered ? styles.closeButtonH : styles.closeButton}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        x
      </button>

      <div style={styles.messages}>
      {messages.map((msg) => {
         

    return (
      <div key={msg.id} style={styles.sentMessage}>
      <div style={styles.usernameContainer}>
        <p style={styles.username}>~ {msg.username}</p>
      </div>
      <div style={styles.messageTextContainer}>
        <p style={styles.messageText}>{msg.text}</p>
      </div>
      <p style={styles.timestamp}>
      {msg.timestamp 
  ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) 
  : ""}

      </p>
      
    </div>
    );
  })}
</div>


      <input 
        type="text" 
        placeholder="Type a message..." 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={styles.input} 
      />
      <button style={styles.sendButton} onClick={sendMessage}>
        <FontAwesomeIcon icon={faPaperPlane} style={styles.icon} />
      </button>
    </div>
  );
};


const styles = {
  chatBox: { 
    border: "1.5px  solid rgba(32, 32, 32, 0.2)",
    position: "absolute", 
    top: "22%", 
    right: "4%", 
    width: "36.1%", 
    height: "70%",  
    background: "white",  
    color: "white",  
    padding: "15px", 
    borderRadius: "20px", 
    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)", 
    overflow: "hidden",  
  },
  h2: {  fontSize: "25px",
    fontWeight: "700",
    color: "#373737",  
    textAlign: "left", 
    fontFamily:"Segoe UI",
    marginTop: "2px",
    marginLeft:"13px"},
  messages: {borderRadius: "20px",marginLeft:"7px",width:"97.7%",marginTop:"-7px",
    border: "1.7px  solid rgba(27, 27, 27, 0.23)", height: "82%", overflowY: "auto", background: "rgba(0, 68, 255, 0.06)" },
    // "#f6f6f6"

  input: { width: "80%", padding: "10px", borderRadius: "20px", border: "1.7px solid rgba(27, 27, 27, 0.3)", marginTop: "16px",outline: "none",height:"20px",
    fontSize:"18px",fontFamily:"Segoe UI",color:"#373737",fontWeight:"400",marginLeft:"-30px" },

  sendButton: { position:"absolute",top:"88.5%",padding: "10px", border:"none",background: "white", color: "white",height:"40px", cursor: "pointer", marginLeft: "1px" },
  icon:{fontSize:"28px",color:"#007bff",marginTop:"10px"},

  closeButton: { background: "white",color: "#ff172d",height:"30px", borderRadius: "10px",width:"50px",top:"3%",right:"3.9%",position:"absolute", 
    cursor: "pointer",border:"2.3px solid #ff172d",fontFamily:"arial",fontWeight:"600",fontSize:"20px" },

  closeButtonH: { background: "#ff172d", color: "white",height:"30px", borderRadius: "10px",width:"50px",top:"3.4%",right:"3.7%",position:"absolute", 
      cursor: "pointer",border:"2px solid #ff172d",fontFamily:"arial",fontWeight:"600",fontSize:"20px" },


      sentMessage: {
        alignSelf: "flex-start", // Align to the left
        backgroundColor: "white", // Blue background or any color you like
        color: "white",
        padding: "10px",
        borderRadius: "10px",
        margin: "5px 0",

        display: "flex",
        flexDirection: "column", // Stack the content vertically (text and timestamp)
        alignItems: "flex-start", // 
        wordWrap: "break-word", // Ensure long words break and wrap
        whiteSpace: "normal", // Allow text to wrap within the container
        maxWidth: "80%", // Prevents long messages from being too wide
        minWidth: "100px",
        width: "auto", 
        alignItems: "flex-start",
        marginLeft:"2%",
        marginTop:"2%",
        borderRadius: "8px 8px 8px 8px",
        position: "relative",
        border:"0.1px solid rgba(55, 55, 55, 0.36)"
      },
      usernameContainer:{
        marginTop:"-20px",
        marginLeft:"2px",
        color:"White",
        fontFamily:"Segoe UI",
        fontWeight: "500",
        fontSize:"17px",
        color:"#1B59F8"
        
      },
      messageText: {
        marginTop: "-8px",
        marginLeft:"18px",
        fontSize: "14px",
        fontFamily:"Segoe UI",
        fontWeight: "450",
        fontSize:"18px",
        paddingBottom: "0px",
        color:"#373737"
      },
    
      timestamp: {
        fontSize: "10px",
        color: "#373737",
        marginTop: "5px",
        fontFamily:"Segoe UI",
        fontWeight: "400",
        fontSize:"13px",
        marginBottom:"5px",
        position:"absolute",
        right:"3%",
        bottom:"2.5%",
      },

      

      

  
};

export default ChatSection;

