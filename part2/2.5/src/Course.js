const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};
const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};
//So that it works regardless of the number of parts
const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};
//Total exercises
const Total = ({ course }) => {
  const sum = course.parts.reduce((a, b) => a + b.exercises, 0);
  return <p>Total of {sum} exercises</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};
export default Course;
