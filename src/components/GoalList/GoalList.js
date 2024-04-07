import React from "react";
import "./Goal.css";
export const GoalList = ({ courseGoals }) => {
  return (
    <ul className="goal-list">
      {courseGoals?.map((goal) => {
        return <li key={goal.id}>{goal.text} </li>;
      })}
    </ul>
  );
};
