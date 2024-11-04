import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  
  function handleDelete(deletedId) {
    fetch(`http://localhost:4000/questions/${deletedId}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions((questions) => questions.filter((q) => q.id !== deletedId));
      });
  }

function handleUpdate(updateQuestion) {
  setQuestions((questions) =>
    questions.map((q) => 
      (q.id === updateQuestion.id ? updateQuestion : q))
  );
}

  useEffect(() => {
    fetch("http://localhost:4000/questions")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => setQuestions(data))
  .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
        <QuestionItem
        key={question.id}
        question={question}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        />
        ))}
        </ul>
    </section>
  );
}

export default QuestionList;
