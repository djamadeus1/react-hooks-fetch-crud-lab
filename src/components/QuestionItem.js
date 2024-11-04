import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

 function handleUpdateAnswer(newIndex) {
   fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex: newIndex }),
  })
    .then((response) => response.json())
    .then((updatedQuestion) => onUpdate(updatedQuestion));
}  

  // const options = answers.map((answer, index) => (
  //   <option key={index} value={index}>
  //     {answer}
  //   </option>
  // ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
          defaultValue={correctIndex}
          onChange={(e) => handleUpdateAnswer(parseInt(e.target.value))}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
          </select>
      </label>
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
