import React, { useEffect, useState } from 'react';
import { } from "@mui/material";
import { SearchRounded, ShoppingCartRounded, BarChart, ArrowDropDown, RemoveRounded, AddRounded } from "@mui/icons-material";
import { Drawer, Dropdown, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/auth';
import userService from '../services/user.service';
import axios from 'axios';

function MyCarts({ listMyCart, open, setOpen, setListMyCart, user, setOpenModalLogin }) {
  const [total, setTotal] = useState()
  useEffect(() => {
    let newTT = 0
    listMyCart.forEach(element => {
      newTT = newTT + (element.price * element.qty)
    })
    setTotal(newTT)
  }, [listMyCart]);
  const updateQuantity = (action, id) => {

    let rs = []
    listMyCart.forEach(element => {
      if (element?.id == id) {
        if (action == "add") {
          rs.push({ ...element, qty: element?.qty + 1 })
        } else {
          if (element?.qty > 1) {
          rs.push({ ...element, qty: element?.qty - 1 })
          }
        }
      } else rs.push(element)
    });
    console.log(rs);
    setListMyCart(rs);


  }
  async function saveMyCarts() {
    if (!user) {
      setOpenModalLogin(true)
    } else {
      let rs = []
      listMyCart.forEach(element => {
        rs.push({ ...element, uid: user?.id })
      })
      console.log(rs);
      const data = {rs};
      await axios.post('http://localhost:3000/checkout', data).then(response => {
        window.location = response.data.url;
      })
      userService.saveMyCarts(rs).then(
        response => {
          
        },
      );
    }

  }
  return (
    <Drawer title="My Carts" placement="right" onClose={() => setOpen(false)} open={open}>
      {listMyCart?.map((e, i) => <>
        <div className="cardItem">
          <div className="imgBox">
            <img src={e?.imgSrc} alt="" />
          </div>

          <div className="itemSection">
            <h2 className="itemName">{e?.name}</h2>
            <div className="itemQuantity">
              <span>{e?.qty}</span>
              <div className="quantity">
                <RemoveRounded className="itemRemove" onClick={() => updateQuantity('remove', e?.id)} />

                <AddRounded className="itemAdd" onClick={() => updateQuantity('add', e?.id)} />
              </div>
            </div>
          </div>

          <p className="itemPrice">
            <span className="dolorSign">$ </span>
            <span className="itemPriceValue">{e?.price * e?.qty}</span>
          </p>
        </div>


      </>)}
      <div className="totalSection">
        <h3>Total</h3>
        <p>
          <span>$ </span> {total}
        </p>
      </div>

      <button className="checkOut" onClick={() => saveMyCarts()} >Check Out</button>
    </Drawer>
  );
}

export default MyCarts;
