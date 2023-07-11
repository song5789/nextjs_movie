import NavBar from "./NavBar";
import { useState } from "react";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
