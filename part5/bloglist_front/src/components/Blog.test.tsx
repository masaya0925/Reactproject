/*
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { SingleBlog } from "./Blog";

let component: RenderResult;

const blog = {
  id: "mofmof1",
  title: "test blog",
  author: "Mr.T",
  url: "http://testingblog.com",
  likes: 2,
  user: {
    id: "mogemoge",
    username: "Mr.T",
    name: "Taro Yamada",
  },
};

const mock1 = jest.fn();
const mock2 = jest.fn();

beforeEach(() => {
  component = render(
    <SingleBlog blog={blog} pushLikes={mock1} pushDelete={mock2} />
  );
});

test("render content", () => {
  const content = component.container.querySelector(".blog"); 
  expect(content).toHaveTextContent("test blog");
  expect(content).toHaveTextContent("Mr.T");
  expect(content).toHaveTextContent("http://testingblog.com");
  expect(content).toHaveTextContent("2");
  expect(content).toHaveTextContent("Taro Yamada");
});

test("at start details are not displayed", () => {
  const div = component.container.querySelector(".details");
  expect(div).toHaveStyle("display: none");
});

test("Press the button and the details will be displayed", () => {
  const button = component.container.querySelector("#detailButton");
  if (button !== null) {
    fireEvent.click(button);
  }
  const div = component.container.querySelector(".details");
  expect(div).not.toHaveStyle("display: none");
});

test("When the like button is pressed twice, the event handler is called twice", () => {
  const button = component.container.querySelector("#likeButton");
  if (button !== null) {
    fireEvent.click(button);
    fireEvent.click(button);
  }
  expect(mock1.mock.calls).toHaveLength(2);
});
*/
