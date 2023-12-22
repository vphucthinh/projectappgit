import { Favorite, StarRounded, AddRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";


function ItemCard({ item, handAddItem }) {
  const [isFavourite, setFavourite] = useState(false);
  const [currentValue, setCurrentValue] = useState(Math.floor(item?.ratings));


  const handleClick = (value) => {
    setCurrentValue(value)
  };


  return (
    <div className="itemCard" id={item?.itemId}>
      <div
        className={`isfavourite ${isFavourite ? "active" : ""}`}
        onClick={() => setFavourite(!isFavourite)}
      >
        <Favorite />
      </div>

      <div className="imgBox">
        <img src={item?.imgSrc} alt="" className="itemImg" />
      </div>
      <div className="itemContent">
        <h3 className="itemName">{item?.name}</h3>
        <div className="bottom">
          <div className="ratings">
            {Array.apply(null, { length: 5 }).map((e, i) => (
              <i key={i} className={`rating ${currentValue > i ? "orange" : "gray"}`}
                onClick={() => handleClick(i + 1)}
              >
                <StarRounded />
              </i>
            ))}
            <h3 className="price">
              <span>$</span>
              {item?.price}
            </h3>
          </div>
          <i className="addtoCart" onClick={() => handAddItem(item)}>
            <AddRounded />
          </i>
        </div>
      </div>
    </div>
  )
}

export default ItemCard;
