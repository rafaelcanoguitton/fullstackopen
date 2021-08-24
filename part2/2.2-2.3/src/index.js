import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}
const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}
//So that it works regardless of the number of parts
const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part=><Part part={part}/>)}
    </div>
  )
}
//Total exercises
const Total = ({ course }) => {
  const sum=course.parts.reduce((a,b)=>a+b.exercises,0)
  return(
    <p>Total of {sum} exercises</p>
  ) 
}

const Course=({course})=>{
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  );

}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))