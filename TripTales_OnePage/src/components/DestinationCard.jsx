import React from "react";

function DestinationCard({ place, saved, onFavourite, onPlan }) {
  return <article className="destination-card"><div className="card-image"><img src={place.image} alt={place.name} loading="lazy" /><span className="place-type">{place.type}</span><button className={saved ? "heart saved" : "heart"} onClick={onFavourite} aria-label="Save destination">{saved ? "♥" : "♡"}</button><span className="rating">★ {place.rating}</span></div><div className="card-content"><div className="place-location">⌖ {place.state}</div><h3>{place.name}</h3><p>{place.description}</p><div className="card-bottom"><div><small>EST. FROM</small><strong>₹{place.price.toLocaleString("en-IN")} <small>/ person</small></strong><span>{place.days} escape</span></div><button onClick={onPlan}>Plan trip <span>↗</span></button></div></div></article>;
}
export default DestinationCard;
