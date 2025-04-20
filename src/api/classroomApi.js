const API_URL = "http://localhost:3002"; // Change this to your backend URL

export const createClassroom = async (courseName, teacherName) => {
  const response = await fetch(`${API_URL}/classrooms/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseName, teacherName }),
  });
  return response.json();
};
