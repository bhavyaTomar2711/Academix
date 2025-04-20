import React, { useState } from "react";

const ClassroomCard = ({ classroomId, courseName, teacherName, setSelectedClassroom }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleJoinClick = (e) => {
    e.stopPropagation();
    setIsJoined(true);
  };

  const handleDisjoinClick = (e) => {
    e.stopPropagation();
    const confirmLeave = window.confirm("Are you sure you want to leave this classroom?");
    if (confirmLeave) {
      setIsJoined(false);
      setSelectedClassroom(null); // ✅ Ensure chat closes when leaving
    }
  };

  const handleCardClick = () => {
    if (isJoined) {
      console.log("✅ Setting selectedClassroom:", { 
        classroomId, courseName, teacherName 
      });
  
      setSelectedClassroom({
        classroomId: classroomId || "⚠️ No ID",
        courseName: courseName || "⚠️ No Name",
        teacherName: teacherName || "⚠️ No Instructor"
      });
    } else {
      alert("You must join the classroom to access the chat!");
    }
  };

  return (
    <div>
      <div style={styles.card} onClick={handleCardClick}>
        <h3 style={styles.courseName}>{courseName}</h3>
        <p style={styles.teacherName}>Instructor: {teacherName}</p>

        {isJoined ? (
          <button 
            style={isHovered ? styles.joinedButtonHover : styles.joinedButton}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)} 
            onClick={handleDisjoinClick}
          >
            Leave
          </button>
        ) : (
          <button
            style={isHovered ? styles.joinButtonHover : styles.joinButton}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleJoinClick}
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
};




const styles = {
  card: { 
    border: "1.5px  solid rgba(32, 32, 32, 0.2)", padding: "15px", borderRadius: "20px", 
    width: "250px", textAlign: "center", margin: "10px", cursor: "pointer",
    transition: "0.3s", background: "white",boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)"
  },
  joinButton: { 
    background: "white", color: "#007bff",height:"35px", borderRadius: "10px",width:"80px",marginLeft:"160px", 
    cursor: "pointer", marginTop: "5px",border:"2px solid #007bff",fontFamily:"arial",fontWeight:"600",fontSize:"16px"
  },
  joinButtonHover: { 
    background: "#007bff", color: "white", height: "35px", borderRadius: "10px", 
    width: "80px", marginLeft: "160px", cursor: "pointer", marginTop: "5px", 
    border: "2px solid #007bff", fontFamily: "Arial", fontWeight: "600", fontSize: "16px",
    transition: "0.3s ease"
  },
  joinedButton: { 
     background: "white", color: "#ff172d",height:"35px", borderRadius: "10px",width:"80px",marginLeft:"160px", 
    cursor: "pointer", marginTop: "5px",border:"2px solid #ff172d",fontFamily:"arial",fontWeight:"600",fontSize:"16px"
  },
  joinedButtonHover: { 
    background: "#ff172d", color: "white",height:"35px", borderRadius: "10px",width:"80px",marginLeft:"160px", 
   cursor: "pointer", marginTop: "5px",border:"none",fontFamily:"arial",fontWeight:"600",fontSize:"16px"
 },
  
  closeButton: { 
    background: "#dc3545", color: "#fff", padding: "5px", borderRadius: "5px", 
    cursor: "pointer", border: "none", marginTop: "10px"
  },
  courseName: { 
    fontSize: "24px",
    fontWeight: "700",
    color: "#373737",  
    textAlign: "left", 
    fontFamily:"Segoe UI",
    marginTop: "8px",
    marginLeft:"17px"
  },
  teacherName: { 
    fontSize: "18px", 
    color: "#373737", 
    textAlign: "left",
    fontFamily:"Segoe UI",
    fontWeight: "400",
    marginLeft:"18px"
  }
};

export default ClassroomCard;
