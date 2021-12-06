import { CoursePart } from "../types";
const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <>
          <b>
            {part.name}
            {part.exerciseCount}
          </b>
          <p>{part.description}</p>
        </>
      );
    case "groupProject":
      return (
        <>
          <b>
            {part.name}
            {part.exerciseCount}
          </b>
          <p>Groups: {part.groupProjectCount}</p>
        </>
      );
    case "submission":
      return (
        <>
          <b>
            {part.name}
            {part.exerciseCount}
          </b>
          <p>{part.description}</p>
          <p>{part.exerciseSubmissionLink}</p>
        </>
      );
    case "special":
      return (
        <>
          <b>
            {part.name}
            {part.exerciseCount}
          </b>
          <p>{part.description}</p>
          <p>{part.requirements}</p>
        </>
      );
    default:
      return null;
  }
};
const Content = ({ contents }: { contents: CoursePart[] }) => {
  return (
    <div>
      {contents.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};
export default Content;
