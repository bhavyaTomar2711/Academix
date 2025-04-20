import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Travel from "../sections/Travel";
import Events from "../sections/Events";
import Classroom from "../sections/Classroom"; // ✅ Updated to show ClassroomPage
import "./dashboard.css";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("classroom"); // Default: Classroom

  const renderSection = () => {
    if (activeSection === "travel") return <Travel />;
    if (activeSection === "events") return <Events />;
    return <Classroom />; // ✅ Shows the full Classroom page
  };

  return (
    <div style={styles.container}>
      <Sidebar setActiveSection={setActiveSection} />
      <div style={styles.content}>{renderSection()}</div>
    </div>
  );
};

const styles = {
  container: { display: "flex", height: "100vh" },
  content: { flex: 1, padding: "20px" }
};

export default Dashboard;
