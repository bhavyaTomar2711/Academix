import React from "react";

const EventCard = ({ data }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{data.name}</h3>
      <p style={styles.h1}>Venue :</p>
       <p style={styles.venue}>{data.venue}</p> 
       <p style={styles.h2}>Date / Time :</p>
       <p style={styles.date}>{data.date}   / </p>
      <p style={styles.time}>{data.time}</p>
      <div style={styles.line}></div>
      <p style={styles.description}>{data.description}</p>
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
    width: "350px",
    height:"425px",
    marginBottom:"25px" 
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#373737",  
    fontFamily:"Segoe UI",
    marginTop: "8px",
    marginLeft:"15px"
  },
  h1:{color: "rgba(0, 0, 0, 0.63)",position:"absolute",marginLeft:"15px",marginTop:"0px",fontSize:"21px",fontFamily:"Segoe UI",fontWeight:"400"},
  venue: {color:"rgba(0, 0, 0, 0.75)",position:"absolute",marginLeft:"15px",marginTop:"32px",fontSize:"23px",fontFamily:"Segoe UI",fontWeight:"500"},

  h2:{color: "rgba(0, 0, 0, 0.63)",position:"absolute",marginLeft:"15px",marginTop:"90px",fontSize:"21px",fontFamily:"Segoe UI",fontWeight:"400"},

  date: {color:"rgba(0, 0, 0, 0.75)",position:"absolute",marginLeft:"15px",marginTop:"123px",fontSize:"23px",fontFamily:"Segoe UI",fontWeight:"500"},
  time: {color:"rgba(0, 0, 0, 0.75)",position:"absolute",marginLeft:"157px",marginTop:"123px",fontSize:"23px",fontFamily:"Segoe UI",fontWeight:"500"},

  line:{height:"1px",width:"315px",marginLeft:"5%",marginTop:"63%",background:"rgba(0, 0, 0, 0.42)"},

  description: {
  color:"rgba(0, 0, 0, 0.75)",marginLeft:"18px",marginRight:"2px",marginTop:"32px",fontSize:"18px",fontFamily:"Segoe UI",fontWeight:"400" },
};

export default EventCard;
