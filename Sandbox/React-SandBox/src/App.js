import React from "react";
const Note = ({ note }) => {
  return <li key={note.id}>{note.content}</li>;
};
const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note note={note}/>
        ))}
      </ul>
    </div>
  );
};
//{course.parts.map(part=><Part part={part}/>)}
export default App;
