import React, { useState ,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faBook, faCar, faCalendar,faRightFromBracket } from "@fortawesome/free-solid-svg-icons"; 

const Sidebar = ({ setActiveSection }) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("classroom");
   const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user"); // Check if user is logged in
    if (!loggedInUser) {
      navigate("/login"); 
    }
  }, [navigate]);
  

  const handleClick = (section) => {
    setActiveSection(section);
    setActiveButton(section);
  };

  return (
    <div style={styles.sidebar}>
      <img src="/academix.png" alt="Logo" style={styles.logo1} />

      <div style={{ flexGrow: 0.25 }}></div>
    <div style={styles.bC}>
      <button 
        style={activeButton === "classroom" ? styles.activeButton : styles.button} 
        onClick={() => handleClick("classroom")}
      >
        <FontAwesomeIcon icon={faBook} style={styles.icon} /> Classroom
      </button>

      <button 
        style={activeButton === "travel" ? styles.activeButton : styles.button} 
        onClick={() => handleClick("travel")}
      >
        <FontAwesomeIcon icon={faCar} style={styles.icon} />  Travel
      </button>

      <button 
        style={activeButton === "events" ? styles.activeButton : styles.button} 
        onClick={() => handleClick("events")}
      >
        <FontAwesomeIcon icon={faCalendar} style={styles.icon} /> Events
      </button>
      </div>


      <button style={isHovered ?styles.activeBButton : styles.bbutton} onClick={() => { localStorage.removeItem("user");  navigate("/login");}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
       >
        <FontAwesomeIcon icon={faRightFromBracket} style={styles.icon}/> Logout
      </button> 

      
      
    </div>
  );
};

const styles = {
  bC:{marginTop:"142px",height:"300px"},
  sidebar: { 
    top: "0.1%", left: "0%", borderTopRightRadius: "23px", borderBottomRightRadius: "23px",
    position: "absolute", width: "15%", height: "95.4%", background: "white", 
    padding: "20px", display: "flex", flexDirection: "column",boxShadow: "2px 0px 20px rgba(71, 71, 71, 0.2)" 

  },
  logo1: { 
    width: "auto", height: "6.5%", position: "absolute", top: "6%", left: "7%"
  },
  button: { 
    height: "60px", width: "266px", background: "white", color:"#4e4e4e", 
    margin: "2.3% 0", border: "none", cursor: "pointer", marginLeft: "12px",
    borderRadius: "13px", display: "flex", alignItems: "center", justifyContent: "left",
    paddingLeft: "15px", fontSize: "19px", fontWeight:"normal",gap: "10px",marginTop:"15px"
  },
 
  activeButton: { 
    height: "60px", width: "266px", background: "#e8eefe", color: "#1B59F8", 
    margin: "2.3% 0", border: "none", cursor: "pointer", marginLeft: "12px",
    borderRadius: "13px", fontWeight: "bold", marginTop:"15px",
    display: "flex", alignItems: "center", justifyContent: "left", paddingLeft: "15px",
    fontSize: "16px", gap: "10px"
  },
  icon: {
    fontSize: "27px" ,// ✅ Adjust icon size
    marginLeft:"10px",
    paddingRight:"4px",
  },


  bbutton: { 
    height: "60px", width: "266px", background: "white", color:"#4e4e4e", 
    margin: "2.3% 0", border: "0.5px solid #4e4e4e", cursor: "pointer", marginLeft: "12px",
    borderRadius: "13px", display: "flex", alignItems: "center", justifyContent: "left",
    paddingLeft: "15px", fontSize: "19px", fontWeight:"normal",gap: "10px",marginTop:"290px"
  },
 
  activeBButton: { 
    height: "60px", width: "266px", background: "#e8eefe", color: "#1B59F8", 
    margin: "2.3% 0", border: "none", cursor: "pointer", marginLeft: "12px",
    borderRadius: "13px", fontWeight: "normal", marginTop:"290px",
    display: "flex", alignItems: "center", justifyContent: "left", paddingLeft: "15px",
    fontSize: "19px", gap: "10px"
  },
};

export default Sidebar;
