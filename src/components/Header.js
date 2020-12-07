// import { ReactComponent as Logo } from "../assets/logo.svg";
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiBookmark } from "react-icons/fi";

export const Header = () => {
  // const { currentUser } = useCurrentUser();

  return (
    <Wrapper>
      {/* <StyledLogo src={Logo} /> */}
      <Div>
        <NavigationLink exact to="/">
          <FiHome />
          <Option> Home</Option>
        </NavigationLink>
      </Div>
      <Div>
        <NavigationLink to="/login">
          <FiUser /> <Option> Sign in</Option>
          {/* <NavigationLink to={`/${currentUser.handle}`}>Profile</NavigationLink> */}
        </NavigationLink>
      </Div>
      <Div>
        <NavigationLink to="/bookmarks">
          <FiBookmark />
          <Option> Bookmarks</Option>
        </NavigationLink>
      </Div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: white;
  width: 100%;
  padding: 30px;
  background-color: #222;
  display: flex;
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
`;

const Option = styled.div`
  margin: 0 10px;
`;

export default Header;
