import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection,getDocs,getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import EventCard from "../components/EventCard";

const EventPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [eventRequests, setEventRequests] = useState([]);
  const [formData, setFormData] = useState({
    
    name: "",
    venue: "",
    date:"",
    time:"",
    description:""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateRequest = async () => {
    if (!formData.name || !formData.venue || !formData.date || !formData.time) {
      alert("Please fill all fields!");
      return;
    }
  
    try {
      const docRef = await addDoc(collection(db, "eventRequest"), {
        name: formData.name,
        venue: formData.venue,
        date: formData.date,
        time: formData.time,
        description: formData.description,
        createdAt: serverTimestamp(),
      });
  
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const newData = { id: docSnap.id, ...docSnap.data() };
        setEventRequests((prev) => [...prev, newData]); // Update UI immediately
      }
  
      // Clear form
      setFormData({
        name: "",
        venue: "",
        date: "",
        time: "",
        description: ""
      });
    } catch (error) {
      console.error("❌ Error saving event request:", error);
    }
  };
    
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "eventRequest"));
        const events = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setEventRequests(events);
      } catch (error) {
        console.error("❌ Error fetching event requests:", error);
      }
    };
  
    fetchEvents();
  }, []);
  

  return (
    <div>
       <h1 style={styles.h1}>Event</h1>
       <div style={styles.inputContainer}>
        <h2 style={styles.h2}>Add Event Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Event Title"
          value={formData.from}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="venue"
          placeholder="Event Venue"
          value={formData.to}
          onChange={handleChange}
          style={styles.input}
        /> 
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
          style={styles.input}
        /> 
        <input
          type="time"
          name="time"
          placeholder="Time"
          value={formData.time}
          onChange={handleChange}
          style={styles.input}
        /> 
        <textarea
        name="description"
        placeholder="Write a brief about the event..."
        value={formData.description}
        onChange={handleChange}
        style={{
            width: "350px",
            marginLeft:"24px",
            fontFamily:"Segoe UI",
            height: "100px", 
            color:"#373737",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "10px",
            background:"#f3f3f3",
            border: "1px solid rgba(109, 109, 109, 0.74)",
            resize: "none", 
            marginTop: "5px",

        }}
/>
        
         <button onClick={handleCreateRequest} style={isHovered ? styles.BBHover : styles.BB} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
          Add
        </button> 

        </div>

        <div style={styles.cardContainer}>
  {eventRequests.map((event) => (
    <EventCard key={event.id} data={event} />
  ))}
</div>


      <div style={styles.line}></div>
    </div>

  );
};

const styles = {
  h1:{color:"#373737",position:"absolute",left:"21%",top:"4%",fontSize:"38px",fontFamily:"Segoe UI",fontWeight:"bold"},

  inputContainer:{ border:"1.5px  solid rgba(32, 32, 32, 0.2)",
  position: "absolute", 
  top: "23%", 
  left: "72%", 
  width: "22%", 
  height: "55%",  
  background: "white",  
  color: "white",  
  padding: "15px", 
  borderRadius: "20px", 
  boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
  paddingTop: "130px"},
  

  h2:{color:"#373737",position:"absolute",left:"9%",top:"1%",fontSize:"38px",fontFamily:"Segoe UI",fontWeight:"700"},

  input: { padding: "10px", fontSize: "16px", borderRadius: "10px",outline: "none",fontSize:"19px",fontFamily:"Segoe UI",color:"#373737",fontWeight:"400",marginLeft:"-30px",
     border: "1px solid #ccc",marginLeft:"25px",width:"350px",height:"26px",marginBottom:"25px",background:"#f3f3f3",border:"none", },



  cardContainer: { marginTop: "20px", display: "flex", flexDirection: "row",
     gap: "30px",position:"absolute",left:"21.2%",top:"20.9%" },


  line:{height:"0.1%",width:"75%",position:"absolute",top:"16%",left:"21%",background:"rgba(0, 0, 0, 0.24)"},

  BB: { marginTop:"35px",height:"45px",width:"130px", position:"absolute",top:"82%",
    left:"9%",background: "#097bfd", color: "white", border: "none", borderRadius: "10px", cursor: "pointer",fontFamily:"Segoe UI",fontWeight:"500",fontSize:"21px" },

  BBHover: { marginTop:"35px",height:"45px",width:"130px", position:"absolute",top:"82%",
      left:"9%",background: "white", color: "#097bfd", border: "3px solid #097bfd", borderRadius: "10px", cursor: "pointer",fontFamily:"Segoe UI",fontWeight:"500",fontSize:"21px" },
};

export default EventPage;
