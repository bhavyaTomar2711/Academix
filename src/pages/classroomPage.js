import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ClassroomCard from "../components/classroomCard";
import ChatSection from "../components/ChatSection";
import { db } from "../firebaseConfig"; // 🔥 Import Firestore instance
import { collection, addDoc, serverTimestamp, getDocs, onSnapshot } from "firebase/firestore";

const ClassroomPage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null); // ✅ Track selected classroom

  const handleCreateClassroom = async () => {
    const courseName = prompt("Enter Course Name:").trim();
    const teacherName = prompt("Enter Teacher Name:").trim();
  
    if (!courseName || !teacherName) {
      alert("Course Name and Teacher Name cannot be empty!");
      return;
    }
  
    try {
      const docRef = await addDoc(collection(db, "classrooms"), {
        courseName,
        teacherName,
        createdAt: serverTimestamp(), // ✅ Store timestamp for sorting
      });
  
      console.log("Classroom created with ID:", docRef.id);
  
      // 🔥 Update local state (React) with the new classroom
      setClassrooms((prevClassrooms) => [
        ...prevClassrooms,
        { id: docRef.id, courseName, teacherName },
      ]);
    } catch (error) {
      console.error("Error creating classroom:", error);
    }
  };
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "classrooms"));
        const classroomList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClassrooms(classroomList);
      } catch (error) {
        console.error("❌ Error fetching classrooms:", error);
      }
    };

    fetchClassrooms();
  }, []); 
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "classrooms"), (snapshot) => {
      const classroomList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClassrooms(classroomList);
      console.log("🔥 Updated classrooms:", classroomList);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div style={styles.container}>
      <h29 style={styles.h29}>Classrooms</h29>

      <button 
        style={isHovered ? styles.createButtonHover : styles.createButton} 
        onClick={handleCreateClassroom}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FontAwesomeIcon icon={faPlus} style={styles.icon} /> Create
      </button>

      {/* ✅ Display classroom cards */}
      <div style={styles.classroomList}>
        {classrooms.length > 0 ? (
          classrooms.map((classroom, index) => (
            <ClassroomCard 
            key={classroom.id} 
            classroomId={classroom.id}  // ✅ Pass classroomId correctly
            courseName={classroom.courseName} 
            teacherName={classroom.teacherName} 
            setSelectedClassroom={setSelectedClassroom} // ✅ Pass selected classroom
            />
          ))
        ) : (
          <p style={styles.p}>No classrooms available. Click "Create" to add one.</p>
        )}
        </div>
      

     
      {selectedClassroom && (
          <ChatSection 
          selectedClassroom={selectedClassroom} 
            closeChat={() => setSelectedClassroom(null)} // ✅ Fix: Only close chat, don’t delete classrooms
          /> 
      )}

      <div style={styles.line}></div>
      </div>
    
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
 
   
  createButton: { height:"50px",width:"150px", position:"absolute",top:"8%",
    left:"88%",background: "#097bfd", color: "#ffff", border: "none", borderRadius: "30px", cursor: "pointer",fontWeight:"normal",fontSize:"20px" },

    createButtonHover: { height:"50px",width:"150px", position:"absolute",top:"8%",
      left:"88%",background: "white", color: "#007bff", border: "3px solid #097bfd", borderRadius: "30px", cursor: "pointer",fontWeight:"normal",fontSize:"20px" },
    
  classroomList: { display: "flex", flexWrap: "wrap",justifyContent: "flex-start",alignItems: "flex-start",marginTop: "8%",paddingLeft: "19%",gap: "50px" },


  icon: {fontSize: "20px" ,paddingRight:"7px",fontWeight:"bold"},
  h29: {color:"#373737",position:"absolute",left:"21%",top:"7%",fontSize:"38px",fontFamily:"Segoe UI",fontWeight:"bold"},
  p:{color:"#7d7d7d",fontSize:"17px",position:"absolute",left:"46%",top:"43%",fontFamily:"Inter",fontWeight:"lighter"},
  line:{height:"0.1%",width:"75%",position:"absolute",top:"16%",left:"21%",background:"rgba(0, 0, 0, 0.24)"}


};

export default ClassroomPage;
