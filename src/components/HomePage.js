import React from "react";
import { useNavigate } from "react-router-dom";
import background from "./greenblue.jpg";
import "./index2.css";
 

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div 
  className="home-container"
  style={{
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    width: "100%",
  }}
>
     
      <nav className="navbar">
        <ul>
          <li><a href="#home">HOME</a></li>
          <li><a href="#services">SERVICES</a></li>
          <li><a href="#about">ABOUT</a></li>
          <li><a href="#contact">CONTACTS</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <h1>Build Bridges</h1>
      <h2>Learn Engage Thrive</h2>
      <h3>A unified platform for academics, travel coordination, and<br/> 
          campus activities to connect students, professors, and<br/> organizations.</h3>

      {/* Buttons */}
      <button type="button" className="start" onClick={() => navigate("/Login")}>
        Get Started
      </button>
      <button type="button" className="login" onClick={() => navigate("/Login")}>
        Login
      </button>

      {/* Images */}
      <img src="/header-teamwork.svg" alt="image1" className="image1" />
      <img src="/academix1.png" alt="logo" className="logo" />
      <img src="/heading.png" alt="heading" className="heading" />

      {/* Feature Boxes */}
      <div className="feature-box">
        <img src="/blk1.png" alt="blk1" className="blk1" />
        <h4>Academic Support</h4>
        <p>Get quick answers to your queries, interact with professors, and collaborate on academic topics effortlessly.</p>
      </div>
      <div className="feature-box2">
        <img src="/blk2.png" alt="blk2" className="blk2" />
        <h5>Travel Coordination</h5>
        <p>Simplify your commute with shared travel plans and carpooling options within the campus community.</p>
      </div>
      <div className="feature-box3">
        <img src="/blk3.png" alt="blk3" className="blk3" />
        <h6>Event Updates</h6>
        <p>Stay informed about the latest campus events, club activities, and workshops to enhance your university experience.</p>
      </div>

      {/* Additional Content */}
      <img src="/details-1-office-worker.svg" alt="women" className="women" />
      <h7>Supercharge Your<br/> Academic Connections</h7>
      <h8>Engage with professors and peers to post queries, join discussions,<br/> 
          and get timely feedback, creating a collaborative and efficient<br/> learning experience.</h8>

      <img src="/details-2-office-team-work.svg" alt="men" className="men" />
      <h9>Stay Informed, Engaged,<br/> and Connected</h9>
      <h10>Get instant access to campus events, club activities, and 
           important<br/> updates. Never miss an opportunity to participate, 
           connect, and<br/> grow with your university community.</h10>

      {/* Footer Section */}
      <div className="bottom-section"></div>
      <h11>About Us</h11>
      <h12>We are committed to enhancing campus experiences by<br/> 
           providing a unified platform for academic interactions,<br/> 
           travel coordination, and campus engagement.</h12>
      <h13>Contact Us</h13>
      <h14>E23CSEU0405@bennett.edu.in<br/> E23CSEU0395@bennett.edu.in</h14>
    </div>
  );
};

export default HomePage;
