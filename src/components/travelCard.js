import React, { useState } from "react";
import ContactInfoBox from "./ContactInfoBox";


const TravelCard = ({ data, setSelectedDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.card}>
      <div style={styles.place}>
        <h3> </h3>
        <h4 style={styles.h4}>From :</h4>
        <h6 style={styles.h6}>{data.from}</h6>

        <h5 style={styles.h5}>To :</h5>
        <p style={styles.h7}> {data.to}</p> 
        <img src="/arrow.png" style={styles.arrow} />
        <p style={styles.date}>{data.date}</p>
      </div>

      <p style={styles.time}>{data.time}</p>

      <button 
        onClick={() => setSelectedDetails(data)} // ✅ Uses prop from TravelPage
        style={isHovered ? styles.InfoHover : styles.Info}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        View
      </button>
    </div>
  );
};

const styles = {
  
  card: {
    border:"1.5px solid rgba(32, 32, 32, 0.2)",
    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
    padding: "15px",
    borderRadius: "20px",
    backgroundColor: "white",
    width: "850px",
    height:"125px",
     marginBottom:"25px" ,
    
  },
  place:{border:"1.5px  solid rgba(0, 0, 0, 0.31)",
    background:"white",
    borderRadius: "10px",
    width:"80%",
    height:"133px",
    marginTop:"-5px",
    marginLeft:"-5px",
    position: "relative",
  },
  h4:{
    fontSize: "17px",
    fontWeight: "500",
    color: "rgba(0, 0, 0, 0.58)",  
    textAlign: "left", 
    fontFamily:"Segoe UI",
    marginTop: "-4px",
    marginLeft:"20px"
  },
  h6:{
    fontSize: "27px",
    fontWeight: "700",
    color: "#373737",  
    fontFamily:"Segoe UI",
    marginTop: "-9px",
    marginLeft:"19px"
  },
  h5:{
    fontSize: "17px",
    fontWeight: "500",
    color: "rgba(0, 0, 0, 0.58)",  
    textAlign: "right", 
    fontFamily:"Segoe UI",
    marginTop: "-135px",
    marginRight:"170px"
  },
  h7:{
    fontSize: "27px",
    fontWeight: "700",
    color: "#373737",  
    fontFamily:"Segoe UI",
    marginLeft:"485px",
    marginTop:"-14px"
  },
  arrow:{
    position:"absolute",
    top:"185%",
    height:"35px",
    width:"auto",
    marginTop:"-200px",
    marginLeft:"260px",
  },
  date:{
    fontSize: "18px",
    fontWeight: "500",
    color: "rgba(0, 0, 0, 0.58)",  
    textAlign: "left", 
    fontFamily:"Segoe UI",
    marginTop: "-15px",
    marginLeft:"278px"
  },
  time:{
    fontSize: "42px",
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.58)",  
    textAlign: "left", 
    fontFamily:"Segoe UI",
    marginTop: "-130px",
    marginLeft:"720px"
  },
  Info: { marginTop:"-25px",marginLeft:"715px",height:"40px",width:"115px",background: "#097bfd", color: "white", border: "none",
     borderRadius: "10px", cursor: "pointer",fontFamily:"Segoe UI",fontWeight:"500",fontSize:"19px" },
  InfoHover: { marginTop:"-25px",marginLeft:"715px",height:"40px",width:"115px",background: "white", color: "#097bfd", border: "3px solid #097bfd",
      borderRadius: "10px", cursor: "pointer",fontFamily:"Segoe UI",fontWeight:"500",fontSize:"19px" },

   
    
  
 

};

export default TravelCard;
