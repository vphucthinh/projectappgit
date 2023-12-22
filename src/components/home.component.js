import React, { Component, useEffect, useState } from "react";

import UserService from "../services/user.service";
import { Card, List } from "antd";
import { MenuItems, Items } from "./Data";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Header from "./header.component";
import SubMenuContainer from "./SubMenuContainer";
import MenuCard from "./MenuCard";
import BannerName from "./BannerName";
import ItemCard from "./ItemCard";
import LoginModal from "./login.component";
import MyCarts from "./mycarts.component";
export default function Home() {
  const [data, setData] = useState(
    Items.filter(element => element.itemId === "buger01")
  );
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openDrawMyCarts, setOpenDrawMyCarts] = useState(false);
  const [listMyCart, setListMyCart] = useState([])
  const [user, setUser] = useState()
  useEffect(() => {
    UserService.getPublicContent().then(
      response => {
        setUser(response.data?.user);
      },
    );
    UserService.getMyCarts().then(
      response => {
        setListMyCart(response?.data?.listMyCarts || [])
      },
    );
  }, []);

  const handClickitemmenu = (itemId) => {
    setData(Items.filter(element => element.itemId == itemId))
  }

  const handAddItem = (newCart) => {
    setListMyCart([...listMyCart, { ...newCart, qty: 1 }])
    setOpenDrawMyCarts(true)
  }

  return (
    <div className="mainContainer">
      <Header user={user} setOpenModalLogin={setOpenModalLogin} setOpenDrawMyCarts={setOpenDrawMyCarts} listMyCart={listMyCart} />
      <MyCarts setOpenModalLogin={setOpenModalLogin} open={openDrawMyCarts} setOpen={setOpenDrawMyCarts} user={user} listMyCart={listMyCart} setListMyCart={setListMyCart}></MyCarts>
      <LoginModal open={openModalLogin} setOpen={setOpenModalLogin} setUser={setUser}></LoginModal>
      
      <div className="banner">
        <BannerName name={"MealTime"} discount={"20"} link={"#"} />
        <img src="https://swiftee.co.uk/wp-content/uploads/2023/02/Vehicle-Type-Motobike-resized.png" alt="" className="deliveryPic" />
      </div>

      <div className="dishContainer">
        <div className="menuCard">
          <SubMenuContainer name={"Menu Category"} />
        </div>
        <div className="rowContainer">

          {
            MenuItems && MenuItems.map((data) => (
              <div key={data.id} onClick={() => handClickitemmenu(data.itemId)}>
                <MenuCard imgSrc={data.imgSrc} name={data.name} isActive={data.id === 1 ? true : false} />
              </div>
            ))}
        </div>
        <div className="dishitemContainer">
          <List
            grid={{
              gutter: 16,
              column: 4,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <ItemCard
                  key={item.id}
                  item={item}
                  handAddItem={handAddItem}
                />
              </List.Item>
            )}
          />
        </div>
      </div>

    </div>
  );
}

