import React from "react";

interface CardScroller {
  children: React.ReactNode;
}

const CardScroller: React.FC<CardScroller> = ({ children }) => {
  return <div className="overflow-x-auto">{children}</div>;
};

export default CardScroller;
