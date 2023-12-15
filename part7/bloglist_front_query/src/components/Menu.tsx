import React from "react";
import { Link } from "react-router-dom";

export const Menu = () => {
  const style = {
    paddingRight: 5,
  };

  return (
    <>
      <Link style={style} to="/">
        blogs
      </Link>
      <Link style={style} to="/user">
        user
      </Link>
    </>
  );
};
