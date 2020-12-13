// import { ReactComponent as Logo } from "../assets/logo.svg";
import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser } from "react-icons/fi";
import { FirebaseContext } from "./FirebaseContext";
import { ProfileMenu } from "./ProfileMenu";

export const Header = () => {
  const { appUser, handleSignOut } = useContext(FirebaseContext);

  return (
    <Wrapper>
      <MobileHeader></MobileHeader>
      <div>
        <Div>
          <NavigationLink exact to="/">
            <FiHome />
            <Option> Home</Option>
          </NavigationLink>
        </Div>
      </div>

      <Div>
        <h1>Movies</h1>
      </Div>

      {appUser.email ? (
        <ProfileMenu />
      ) : (
        <Div>
          <NavigationLink to="/login">
            <FiUser /> <Option> Sign in</Option>
          </NavigationLink>
        </Div>
      )}
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
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin: 0 13px;
  display: flex;
  font-size: 20px;
  padding: 10px;
  :hover {
    color: purple;
    border-radius: 20px;
  }
`;

const Option = styled.div`
  margin: 0 10px;
`;

const Option2 = styled.div`
  margin: 0 10px;
`;

export default Header;
