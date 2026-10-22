import React from "react";

function Navbar() {
  const path = window.location.pathname;
  return <header className="navbar">
    <a className="brand" href="/"><span className="brand-mark">✳</span><span>Trip<span className="brand-accent">Tales</span><small>FIND YOUR NEXT ESCAPE</small></span></a>
    <nav>
      <a className={path === "/" || path === "/home" ? "nav-active" : ""} href="/">Home</a>
      <a className={path === "/destinations" ? "nav-active" : ""} href="/destinations">Destinations</a>
      <a className={path === "/plan" ? "nav-active" : ""} href="/plan">Plan a trip</a>
    </nav>
    <a className="nav-button" href="/plan">Start exploring <span>↗</span></a>
  </header>;
}
export default Navbar;
