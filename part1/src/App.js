import React from "react";
const Hello = (props) => {  return (
  <div>
    <p>Hello {props.name}</p>    </div>
)
}
const App = () => {
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Rafxar"/>
      <Hello name="Tu vieja"/>      <Hello name="lmao"/>
    </>
  );
};
export default App;
