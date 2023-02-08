import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {Button} from '../../styles'


function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/api/v1/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Wrapper>
      <Logo>
        <Link to="/">Home</Link>
      </Logo>
      <Nav>
        {user ? (
          <Button variant="outline" onClick={handleLogoutClick}>
            Logout
          </Button>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-conent: center;
  align-items: center;
  padding: 8px;
`

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: deeppink;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;
export default NavBar;
