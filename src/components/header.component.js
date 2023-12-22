import React, { useEffect } from 'react';
import { } from "@mui/material";
import { SearchRounded, ShoppingCartRounded, BarChart, ArrowDropDown } from "@mui/icons-material";
import { Dropdown, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/auth';

function Header({ user, setOpenModalLogin, setOpenDrawMyCarts, listMyCart }) {
  const items = [
    {
      label: <a href="/profile">Profile</a>,
      key: '0',
    },
    {
      label: <a href="/#" onClick={() => logOut()}>Logout</a>,
      key: '1',
    }
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    const toggleMenu = document.querySelector(".toggleMenu");

    toggleMenu.addEventListener("click", () => {
      document.querySelector(".rightMenu").classList.toggle("active");
    });
  }, []);

  function logOut() {
    dispatch(logout());
    window.location.reload()
  }
  return (
    <header>
      <img src="https://womensfitness.co.uk/wp-content/uploads/sites/3/2022/11/Shutterstock_1675475479.jpg?w=900" alt="logo" className="logo" />

      <div className="inputBox">
        <SearchRounded className="searchIcon" />
        <input type="text" placeholder="Search" />
      </div>

      <div className="shoppingCart" onClick={() => setOpenDrawMyCarts(true)}>
        <ShoppingCartRounded className="cart" />
        <div className="cart_content">
          <p>{listMyCart?.length || 0}</p>
        </div>
      </div>

      <div className="profileContainer">
        {user ? <>
          <div className="imgBox">
            <img src="https://i.pinimg.com/236x/98/96/86/9896861906bb3ae3d515b48a8c3d1c7e.jpg" alt="" className="profilePic" />
          </div>


          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <h2 className="userName">{user?.username} <ArrowDropDown /></h2>

              </Space>
            </a>
          </Dropdown>
        </> :
          <>
            <nav className="navbar"> <a href='/#' onClick={() => setOpenModalLogin(true)}>Login<span></span></a></nav>
            <nav className="navbar"> <a href='/register'>Register<span></span></a></nav>
          </>
        }

      </div>

      <div className="toggleMenu">
        <BarChart className="toggleIcon" />
      </div>
    </header>
  );
}

export default Header;
