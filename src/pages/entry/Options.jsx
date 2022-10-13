import React, { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import Row from "react-bootstrap/Row";
import axios from "axios";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../context/OrderDetails";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  // optionType is scoops or toppings

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        // TODO handle error
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return (
      <AlertBanner
      // variant="danger"
      // message="An unexpected error occured. Please try again later."
      />
    );
  }

  // @ts-ignore
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

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
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
