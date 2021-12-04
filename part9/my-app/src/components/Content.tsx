import React from "react";
import { ContentProps } from "../types";
const Content = ({ contents }: { contents: ContentProps[] }) => {
  return (
    <div>
      {contents.map((content) => (
        <p>
          {content.name} {content.exerciseCount}
        </p>
      ))}
    </div>
  );
};
export default Content;
