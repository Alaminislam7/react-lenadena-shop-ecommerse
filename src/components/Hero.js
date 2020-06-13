import React from "react";

export default function Hero({children}) {
  return (
    <div className="hero">
      <div className="banner">
        <h1>LENAGA TU DENAGA</h1>
        <p>KOI JAU KICU KINA JAU</p>
        {children}
      </div>
    </div>
  );
}
