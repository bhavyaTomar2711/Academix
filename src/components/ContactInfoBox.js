import React, { useState, useEffect } from "react";

const ContactInfoBox = ({ data, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div style={styles.detailsBox}>
     <button style={isHovered ? styles.closeButtonH : styles.closeButton}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} 
        onClick={onClose}>
      x</button> 
     
     <p style={styles.h8}>Contact Details</p>
     <p style={styles.h9}>Name :</p>
     <p style={styles.h10}>{data.name}</p>
    <p style={styles.h11}>Phone No. :</p>
    <p style={styles.h12}>{data.phone}</p>
     <p style={styles.h13}>Email :</p>
     <p style={styles.h14}>{data.email}</p> 
      </div>
  );
};

const styles={
    detailsBox:{
        border:"1.5px  solid rgba(32, 32, 32, 0.2)",
        marginLeft:"973px",
        marginTop:"-5px",
        width: "426px", 
        height: "400px",  
        background: "white",  
        color: "white",  
        padding: "15px", 
        borderRadius: "20px", 
        boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        paddingTop: "130px",
        position:"fixed"
        },

        h8:{color:"#373737",position:"absolute",left:"9%",top:"2%",fontSize:"36px",fontFamily:"Segoe UI",fontWeight:"700"},
        h9:{color: "rgba(0, 0, 0, 0.58)",position:"absolute",left:"9%",top:"20%",fontSize:"22px",fontFamily:"Segoe UI",fontWeight:"400"},
        h10:{color:"#373737",position:"absolute",left:"9%",top:"25%",fontSize:"31px",fontFamily:"Segoe UI",fontWeight:"400"},
    
        h11:{color: "rgba(0, 0, 0, 0.58)",position:"absolute",left:"9%",top:"42%",fontSize:"22px",fontFamily:"Segoe UI",fontWeight:"400"},
        h12:{color:"#373737",position:"absolute",left:"9%",top:"47%",fontSize:"31px",fontFamily:"Segoe UI",fontWeight:"400"},
    
        h13:{color: "rgba(0, 0, 0, 0.58)",position:"absolute",left:"9%",top:"64%",fontSize:"22px",fontFamily:"Segoe UI",fontWeight:"400"},
        h14:{color:"#373737",position:"absolute",left:"9%",top:"69%",fontSize:"31px",fontFamily:"Segoe UI",fontWeight:"400"},

        closeButton: { background: "white",color: "#ff172d",height:"30px", borderRadius: "10px",width:"50px",top:"5%",right:"5%",position:"absolute", 
          cursor: "pointer",border:"2.3px solid #ff172d",fontFamily:"arial",fontWeight:"600",fontSize:"20px" },
      
        closeButtonH: { background: "#ff172d", color: "white",height:"30px", borderRadius: "10px",width:"50px",top:"5%",right:"5%",position:"absolute", 
            cursor: "pointer",border:"2px solid #ff172d",fontFamily:"arial",fontWeight:"600",fontSize:"20px" },
};
export default ContactInfoBox;