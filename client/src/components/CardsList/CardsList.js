import React from "react";
import { ListContainer } from "./style";
import GoodDeedCard from "../GoodDeedCard/GoodDeedCard"; // Adjust the path as needed

const CardList = ({ items, layout }) => {
  console.log(items, "ssdsd");
  if (!items) {
    return <div>No items to display.</div>; // Or any other fallback UI
  }
  return (
    <ListContainer layout={layout}>
      {items &&
        items.map((item) => (
          <GoodDeedCard
            key={item.id}
            title={item.title}
            description={item.description}
            status={item.status}
            creationDate={item.creationDate}
          />
        ))}
    </ListContainer>
  );
};

export default CardList;
