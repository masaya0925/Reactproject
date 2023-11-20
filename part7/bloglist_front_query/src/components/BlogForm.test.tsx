import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BlogForm } from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("Parameters received by the event handler when the form is submitted are as expected", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const component = render(<BlogForm />);

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const button = component.container.querySelector("#submit");

  if (title && author && url && button) {
    await user.type(title, "testing-library");
    await user.type(author, "Mr.D");
    await user.type(url, "http://boodoo.com");
    await user.click(button);
  }

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing-library");
  expect(createBlog.mock.calls[0][0].author).toBe("Mr.D");
  expect(createBlog.mock.calls[0][0].url).toBe("http://boodoo.com");
});
