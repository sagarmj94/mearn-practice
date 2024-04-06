import "./App.css";
import React from "react";
import { GoalList } from "./components";

function App() {
  return (
    <div className="course-goal">
      <h2>Course Goals</h2>
      <GoalList />
    </div>
  );
}

export default App;
