import React, { useState } from "react";
const BirthForm = (props) => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    await props.setBirthYearMutation({
      variables: { name, born: parseInt(birthYear) },
    });
    setName("");
    setBirthYear("");
  };
  return (
    <form onSubmit={submit}>
      <div>
        <label>name</label>
        <input value={name} onChange={({ target }) => setName(target.value)} />
      </div>
      <div>
        <label>birth year</label>
        <input
          value={birthYear}
          onChange={({ target }) => setBirthYear(target.value)}
        />
      </div>
      <button type="submit">update author</button>
    </form>
  );
};
export default BirthForm;
