import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface CardScroller {
  children: React.ReactNode;
}

const CardScroller: React.FC<CardScroller> = ({ children }) => {
  return (
    <ScrollArea className="w-full rounded-md border">
      <div className="flex space-x-4 p-4">
        {React.Children.map(children, (child, index) => (
          <div key={index} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CardScroller;
