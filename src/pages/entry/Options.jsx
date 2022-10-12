import React, { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import Row from "react-bootstrap/Row";
import axios from "axios";

export default function Options({ optionType, toppingOption }) {
  const [items, setItems] = useState([]);

  // optionType is scoops or toppings

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        // TODO handle error
      });
  }, [optionType]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${toppingOption}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        // todo handle error
      });
  }, [toppingOption]);

  // @ts-ignore
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });

  return (
    <>
      <Row>{optionItems}</Row>
    </>
  );
}
