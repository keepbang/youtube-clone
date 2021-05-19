import React from 'react';
import { Menu } from 'antd';
import {useSelector} from "react-redux";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state => state.user)

  const subscripPage = () => (user.userData && !user.userData.isAuth) &&
      <Menu.Item key="subscription"> <a href="/subscription">Subscription</a> </Menu.Item>

  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
      {
        subscripPage
      }

  </Menu>
  )
}

export default LeftMenu