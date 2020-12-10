// import { ReactComponent as Logo } from "../assets/logo.svg";
import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiBookmark } from "react-icons/fi";
import { FirebaseContext } from "./FirebaseContext";
import { ProfileMenu } from "./ProfileMenu";

export const Header = () => {
  const { appUser, handleSignOut } = useContext(FirebaseContext);
  // const { currentUser } = useCurrentUser();

  // var loginButton;
  // if (appUser) {
  //   loginButton = <Option>{appUser.displayName}</Option>;
  // } else {
  //   loginButton = <Option2>Sign in</Option2>;
  // }

  // console.log(appUser);

  return (
    <Wrapper>
      <MobileHeader></MobileHeader>
      <Div>
        <NavigationLink exact to="/">
          <FiHome />
          <Option> Home</Option>
        </NavigationLink>
      </Div>
      {appUser.email ? (
        <ProfileMenu />
      ) : (
        <Div>
          <NavigationLink to="/login">
            <FiUser />
          </NavigationLink>
        </Div>
      )}
      {/* <Div>
        <NavigationLink to="/bookmarks">
          <FiBookmark />
          <Option>Bookmarks</Option>
        </NavigationLink>
      </Div> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 30px;
  background-color: #222;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: none !important;
  }
`;

const MobileHeader = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block !important;
  }
`;

const Div = styled.span`
  display: inline;
  text-decoration: none;
  padding: 10px;
  :hover {
    color: purple;
    background: rgb(76, 0, 255, 0.2);
    border-radius: 20px;
  }
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin-left: 13px;
  display: flex;
  font-size: 20px;
`;

const Option = styled.div`
  margin: 0 10px;
`;

const Option2 = styled.div`
  margin: 0 10px;
`;

export default Header;
