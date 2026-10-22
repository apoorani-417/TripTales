import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import DestinationCard from "./components/DestinationCard.jsx";
import Footer from "./components/Footer.jsx";

const destinations = [
  { id: 1, name: "Ooty", state: "Tamil Nadu", type: "Mountains", price: 3500, days: "2 days", rating: "4.9", image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=900&q=85", description: "Misty mornings, tea gardens and cool mountain air." },
  { id: 2, name: "Goa", state: "Goa", type: "Beach", price: 6500, days: "3 days", rating: "4.8", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85", description: "Golden beaches, colourful sunsets and laid-back days." },
  { id: 3, name: "Munnar", state: "Kerala", type: "Mountains", price: 5200, days: "2 days", rating: "4.9", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85", description: "Endless green hills and peaceful nature trails." },
  { id: 4, name: "Jaipur", state: "Rajasthan", type: "Culture", price: 7800, days: "3 days", rating: "4.7", image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=85", description: "Royal palaces, pink streets and rich local history." },
  { id: 5, name: "Kodaikanal", state: "Tamil Nadu", type: "Mountains", price: 4200, days: "2 days", rating: "4.8", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85", description: "Pine forests, lake views and a slow hill-station escape." },
  { id: 6, name: "Pondicherry", state: "Puducherry", type: "Beach", price: 3900, days: "2 days", rating: "4.7", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=85", description: "Pastel streets, seaside cafés and French-inspired charm." }
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const [trips, setTrips] = useState([]);
  const [destination, setDestination] = useState("");
  const [travellers, setTravellers] = useState("2");
  const [travelDate, setTravelDate] = useState("");
  const [travellerName, setTravellerName] = useState("");
  const [message, setMessage] = useState("");

  const filteredDestinations = destinations.filter((place) => {
    const matchesSearch = (place.name + " " + place.state).toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || place.type === category;
    const matchesFavourite = !showFavourites || favourites.includes(place.id);
    return matchesSearch && matchesCategory && matchesFavourite;
  });

  function toggleFavourite(id) {
    if (favourites.includes(id)) setFavourites(favourites.filter((item) => item !== id));
    else setFavourites([...favourites, id]);
  }

  function selectDestination(name) {
    setDestination(name);
    window.location.href = "/plan";
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!destination) {
      setMessage("Please choose a destination first.");
      return;
    }
    setTrips([...trips, { id: Date.now(), destination, travellers, travelDate, travellerName }]);
    setMessage("Your trip has been added to My Trips!");
    setDestination("");
    setTravellers("2");
    setTravelDate("");
    setTravellerName("");
  }

  function removeTrip(id) {
    setTrips(trips.filter((trip) => trip.id !== id));
  }

  const page = window.location.pathname;
  return (
    <div className="app">
      <Navbar />
      <main>
        {page === "/" || page === "/home" ? <><section className="hero" id="home">
          <div className="hero-shade"></div>
          <div className="hero-copy">
            <p className="eyebrow"><span></span> YOUR NEXT CHAPTER STARTS HERE</p>
            <h1>Collect moments.<br /><em>Not things.</em></h1>
            <p className="hero-description">Find places that make you feel something. Your next little escape is closer than you think.</p>
            <a className="primary-button" href="/destinations">Explore destinations <span>↗</span></a>
            <div className="hero-note"><span className="note-star">✳</span><span>Small trips. Big memories.</span></div>
          </div>
          <div className="hero-tag"><span>✦</span> Somewhere wonderful is waiting</div>
        </section>

        <section className="quote-band"><span className="quote-flower">✳</span><p>"We travel not to escape life,<br /><em>but for life not to escape us."</em></p><span className="quote-caption">GO A LITTLE FURTHER · FEEL A LITTLE MORE</span></section>

        </> : null}
        {page === "/destinations" ? <><section className="section intro" id="destinations">
          <div><p className="eyebrow section-eyebrow">A LITTLE WANDERLUST</p><h2>Where to <em>next?</em></h2></div>
          <p className="intro-text">Whether you crave misty mountains, sunny beaches or streets full of stories, find a place that feels like you.</p>
        </section>

        <section className="section destination-section">
          <div className="control-row">
            <label className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search a destination..." /></label>
            <div className="category-row">
              {["All", "Mountains", "Beach", "Culture"].map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? "category active" : "category"}>{item}</button>)}
              <button className={showFavourites ? "category favourite active" : "category favourite"} onClick={() => setShowFavourites(!showFavourites)}>♡ Saved {favourites.length}</button>
            </div>
          </div>
          <div className="destination-grid">
            {filteredDestinations.map((place) => <DestinationCard key={place.id} place={place} saved={favourites.includes(place.id)} onFavourite={() => toggleFavourite(place.id)} onPlan={() => selectDestination(place.name)} />)}
          </div>
          {filteredDestinations.length === 0 && <div className="empty-state"><span>✳</span><h3>No places found</h3><p>Try another search or category.</p><button onClick={() => { setSearch(""); setCategory("All"); setShowFavourites(false); }}>Show all destinations</button></div>}
        </section>

        </> : null}
        {page === "/plan" ? <><section className="section planner-section" id="plan">
          <div className="planner-copy"><p className="eyebrow section-eyebrow">MAKE IT HAPPEN</p><h2>Your next adventure<br />starts with <em>a plan.</em></h2><p>Pick a place, choose your date and add it to your personal trip list. Your next memory is waiting.</p><div className="planner-stat"><span>✈</span><div><strong>{trips.length.toString().padStart(2, "0")}</strong><small>{trips.length === 1 ? "trip planned" : "trips planned"}</small></div></div></div>
          <form className="planner-form" onSubmit={handleSubmit}>
            <div className="form-heading"><span>✳</span><div><h3>Plan a little getaway</h3><p>Every great trip starts somewhere.</p></div></div>
            <label>Your name<input value={travellerName} onChange={(e) => setTravellerName(e.target.value)} placeholder="Enter your name" required /></label>
            <label>Destination<select value={destination} onChange={(e) => setDestination(e.target.value)} required><option value="">Choose your destination</option>{destinations.map((place) => <option key={place.id} value={place.name}>{place.name}, {place.state}</option>)}</select></label>
            <div className="form-two"><label>Travel date<input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} required min={new Date().toISOString().split("T")[0]} /></label><label>Travellers<select value={travellers} onChange={(e) => setTravellers(e.target.value)}><option value="1">1 person</option><option value="2">2 people</option><option value="3">3 people</option><option value="4">4 people</option><option value="5+">5+ people</option></select></label></div>
            <button className="submit-button" type="submit">Add to My Trips <span>↗</span></button>
            {message && <p className="form-message">{message}</p>}
            <p className="form-note">Frontend demo only — no booking or payment is made.</p>
          </form>
        </section>

        {trips.length > 0 && <section className="section my-trips"><div className="my-trips-heading"><div><p className="eyebrow section-eyebrow">YOUR LITTLE GETAWAYS</p><h2>My <em>trips.</em></h2></div><span>{trips.length} planned</span></div><div className="trip-list">{trips.map((trip) => <article className="trip-row" key={trip.id}><div className="trip-symbol">✈</div><div className="trip-info"><h3>{trip.destination}</h3><p>{trip.travellerName} · {trip.travelDate} · {trip.travellers} traveller(s)</p></div><button onClick={() => removeTrip(trip.id)}>Remove</button></article>)}</div></section>}
      </> : null}
      </main>
      <Footer />
    </div>
  );
}
export default App;
