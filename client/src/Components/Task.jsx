import React, { useState } from "react";
import "./Task.css";

const colors = [
  "#d4f4dd", "#f9e0e0", "#f9f1d0", "#ffffb3", "#ccffcc",
  "#b3e0ff", "#ccccff", "#e6ccff", "#ffcccc", "#f2f2f2"
];

const repeatOptions = ["Daily", "Weekly", "Monthly"];
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const tagsList = ["Daily Routine", "Study Routine", "Add More"];

const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(colors[0]);
  const [repeatCycle, setRepeatCycle] = useState("Weekly");
  const [repeatDays, setRepeatDays] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleDay = (day) => {
    setRepeatDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      color,
      repeatCycle,
      repeatDays,
      list: selectedTags.join(","),
      status: "pending",
    };

    try {
      const res = await fetch(`https://server-xi-ivory-43.vercel.app/task/addTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) throw new Error("Failed to create task");

      const data = await res.json();
      console.log("Task created:", data);

      // Reset form
      setTitle("");
      setDescription("");
      setColor(colors[0]);
      setRepeatCycle("Weekly");
      setRepeatDays([]);
      setSelectedTags([]);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="new-task-container">
      <h2>New Task 📝</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="task-input"
          type="text"
          placeholder="Name your new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="task-textarea"
          placeholder="Describe your new task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="section">
          <label>Card Color:</label>
          <div className="color-picker">
            {colors.map((clr, index) => (
              <span
                key={index}
                className={`color-circle ${color === clr ? "selected" : ""}`}
                style={{ backgroundColor: clr }}
                onClick={() => setColor(clr)}
              />
            ))}
          </div>
        </div>

        <div className="section">
          <label>Repeat:</label>
          <div className="repeat-options">
            {repeatOptions.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={repeatCycle === option}
                  onChange={(e) => setRepeatCycle(e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>

          <div className="repeat-days">
            {weekdays.map((day) => (
              <label key={day}>
                <input
                  type="checkbox"
                  checked={repeatDays.includes(day)}
                  onChange={() => toggleDay(day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <div className="section">
          <label>Tags:</label>
          <div className="tags">
            {tagsList.map((tag) => (
              <button
                type="button"
                key={tag}
                className={`tag-button ${
                  selectedTags.includes(tag) ? "selected" : ""
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          ✔ Submit
        </button>
      </form>
    </div>
  );
};

export default Task;
