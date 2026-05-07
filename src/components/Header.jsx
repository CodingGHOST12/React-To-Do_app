import React from "react";

const Header = ({ todos }) => {
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const progressPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="app-header">
      <div className="header-top">
        <h1>My Tasks</h1>
        <p className="date-text">{today}</p>
      </div>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="progress-text">
        {completedTasks} of {totalTasks} tasks completed
      </p>
    </header>
  );
};

export default Header;
