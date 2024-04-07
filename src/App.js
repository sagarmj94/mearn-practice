import "./App.css";
import React, { useState } from "react";
import { GoalList } from "./components/GoalList";
import { NewGoals } from "./components/NewGoals";

function App() {
  const [courseGoals, setCourseGoals] = useState([
    { id: "cgl1", text: "Finish the course" },
    { id: "cgl2", text: "Learn all about React" },
    { id: "cgl3", text: "Help other students in the Q&A" },
  ]);

  const addNewGoalHandler = (newGoal) => {
    // setCourseGoals([...courseGoals, newGoal]);
    setCourseGoals((prevCourseGoal) => [...prevCourseGoal, newGoal]);
  };
  return (
    <div className="course-goal">
      <h2>Course Goals</h2>
      <NewGoals onAddGoal={addNewGoalHandler} />
      <GoalList courseGoals={courseGoals} />
    </div>
  );
}

export default App;
