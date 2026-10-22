import React from "react";

function Footer() {
  return <footer className="footer"><div className="footer-main"><a className="brand footer-brand" href="#home"><span className="brand-mark">✳</span><span>Trip<span className="brand-accent">Tales</span><small>FIND YOUR NEXT ESCAPE</small></span></a><p>Take the scenic route.<br /><em>The world is waiting.</em></p><a className="back-top" href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Back to top ↑</a></div><div className="footer-bottom"><span>© 2026 TripTales · React frontend project</span><span>Made for curious souls ✳</span></div></footer>;
}
export default Footer;
