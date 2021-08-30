import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, prettyDOM, render } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog /> component tests", () => {
  beforeEach(() => {
    const testBlog = {
      title: "Generic title",
      author: "Some author",
      likes: 0,
      url: "https soemthing",
    };
    //Since these are prop.types required
    const User = {
      id: "123",
      username: "rafael",
    };
    const deleteBlog = () => 1;
    const showButton = true;
    const component = render(
      <Blog
        blog={testBlog}
        showButton={showButton}
        deleteBlog={deleteBlog}
        user={User}
      />
    );
  });
  test("render only title and author by default", () => {
    const button = component.container.querySelector("button");
    expect(button).toHaveTextContent("view"); //Button that only renders
    //when only author and title get rendered
  });
  test("render likes and url when button gets pressed",()=>{
    const button = component.container.querySelector("button");
    fireEvent.click(button);
    const newButton=component.container.querySelector("button");
    expect(button).toHaveTextContent("hide");
  });
});
