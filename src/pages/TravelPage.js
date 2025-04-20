import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection,getDocs,getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import TravelCard from "../components/travelCard";
import ContactInfoBox from "../components/ContactInfoBox";

const TravelPage = () => {
  const [travelRequests, setTravelRequests] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);


  const [formData, setFormData] = useState({
    
    from: "",
    to: "",
    date:"",
    time:"",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateRequest = async () => {
    if (!formData.from || !formData.to) {
      alert("Please fill all fields!");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const name = user?.username;
    const phone = user?.phone;
    const email = user?.email;

    try {
      const docRef = await addDoc(collection(db, "travelRequests"), {
        from: formData.from,
        to: formData.to,
        date: formData.date,       
        time: formData.time, 
        name,
        phone,
        email,
        createdAt: serverTimestamp()
      });
      const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const newData = { id: docSnap.id, ...docSnap.data() };

      setTravelRequests((prev) => [...prev, newData]); // Update state with full data
    }
  
      setFormData({ from: "", to: "",date: "", time: "" }); // Clear form
    } catch (error) {
      console.error("❌ Error saving travel request:", error);
    }
  };
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "travelRequests"));
        const requests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setTravelRequests(requests);
      } catch (error) {
        console.error("❌ Error fetching travel requests:", error);
      }
    };
  
    fetchRequests();
  }, []);

  return (
    <div>
       <h1 style={styles.h1}>Travel</h1>
       <div style={styles.inputContainer}>
        <h2 style={styles.h2}>Plan Your Ride</h2>
        <input
          type="text"
          name="from"
          placeholder="Enter Location"
          value={formData.from}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="to"
          placeholder="Enter Destination"
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
        
         <button onClick={handleCreateRequest} style={isHovered ? styles.BBHover : styles.BB} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
          Add
        </button> 

        </div>

        <div style={styles.cardContainer}>
  <div style={styles.cardList}>
    {travelRequests.map((request) => (
      <TravelCard 
        key={request.id} 
        data={request} 
        setSelectedDetails={setSelectedDetails}
      />
    ))}
  </div>

   {selectedDetails && (
  <ContactInfoBox 
    data={selectedDetails} 
    onClose={() => setSelectedDetails(null)} 
  />
)} 
  
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
  height: "43%",  
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



  cardContainer: { marginTop: "20px", display: "flex", flexDirection: "column",width:"950px",
     gap: "30px",position:"absolute",left:"21.2%",top:"20.9%" },


  line:{height:"0.1%",width:"75%",position:"absolute",top:"16%",left:"21%",background:"rgba(0, 0, 0, 0.24)"},

  BB: { marginTop:"35px",height:"45px",width:"130px", position:"absolute",top:"72%",
    left:"9%",background: "#097bfd", color: "white", border: "none", borderRadius: "10px", cursor: "pointer",fontFamily:"Segoe UI",fontWeight:"500",fontSize:"21px" },

  BBHover: { marginTop:"35px",height:"45px",width:"130px", position:"absolute",top:"72%",
      left:"9%",background: "white", color: "#097bfd", border: "3px solid #097bfd", borderRadius: "10px", cursor: "pointer",fontFamily:"Segoe UI",fontWeight:"500",fontSize:"21px" },
};

export default TravelPage;
