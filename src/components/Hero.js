import React from "react";

export default function Hero({children}) {
  return (
    <div className="hero">
      <div className="banner">
        <h1>WELCOME TO OUR SHOP</h1>
        <p>KOI JAU KICU KINA JAU</p>
        {children}
      </div>
    </div>
  );
}
