import React, { useState } from "react";
import "./NewGoal.css";

export const NewGoals = ({ onAddGoal }) => {
  const [goal, setGoal] = useState("");
  const addGoalHandler = (e) => {
    e.preventDefault();
    if (!goal.trim()) {
      alert("Please enter a valid goal.");
      return;
    }
    const newGoal = {
      id: Math.random().toString(),
      text: goal,
    };
    onAddGoal(newGoal);
    setGoal("");
  };
  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input
        type="text"
        value={goal}
        placeholder="Enter new goal"
        onChange={(e) => setGoal(e.target.value)}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
};
