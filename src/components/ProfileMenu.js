import React, { useRef, useContext } from "react";
import { FirebaseContext } from "./FirebaseContext";
import { FiUser } from "react-icons/fi";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Favorites } from "./Favorites";

export const ProfileMenu = () => {
  const { appUser, handleSignOut } = useContext(FirebaseContext);

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  return (
    <Wrapper>
      <Div onClick={onClick}>
        <DivContainer>
          <FiUser />
          <Option>{appUser.displayName}</Option>
        </DivContainer>
      </Div>
      {isActive ? (
        <Nav ref={dropdownRef}>
          <ul>
            <li>
              <NavigationLink to="/favorites">Favorites</NavigationLink>
            </li>
            <li>
              <NavigationLink onClick={handleSignOut} exact to="/">
                Sign out
              </NavigationLink>
            </li>
          </ul>
        </Nav>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Div = styled.span`
  display: inline;
  text-decoration: none;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  :hover {
    color: purple;
    background: rgb(76, 0, 255, 0.2);
    border-radius: 20px;
  }
`;
const DivContainer = styled.div`
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin-left: 13px;
  display: flex;
`;

const Option = styled.div`
  margin: 0 10px;
`;

const Nav = styled.div`
  margin-top: 14px;

  border-radius: 8px;
  position: absolute;
  top: 50px;
  right: 0;
  width: 180px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  /* transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s; */
  opacity: 1;
  /* visibility: visible; */
  transform: translateY(0);
  z-index: 1;
  background: rgb(76, 0, 255, 0.2);
  font-size: 20px;
  display: flex;
  justify-content: center;
`;
const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin-left: 13px;
  display: flex;
  padding: 10px;
`;
