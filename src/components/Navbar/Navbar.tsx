import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 60px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const LogoIcon = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style-type: none;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  transition: color ${({ theme }) => theme.transitions.fast};
  &:hover{color: ${({ theme }) => theme.colors.primary}
`;

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <Nav>
      <Logo to="/">
        <LogoIcon>
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="#D85A30" />
            <ellipse cx="24" cy="28" rx="9" ry="7.5" fill="#fff" />
            <ellipse cx="14" cy="20" rx="4.5" ry="3.2" fill="#fff" />
            <ellipse cx="19.5" cy="16.5" rx="4.2" ry="3" fill="#fff" />
            <ellipse cx="28.5" cy="16.5" rx="4.2" ry="3" fill="#fff" />
            <ellipse cx="34" cy="20" rx="4.5" ry="3.2" fill="#fff" />
          </svg>
        </LogoIcon>
        PawFolio
      </Logo>
      <Links>
        <NavLink to="/" $active={pathname === "/"}>
          Home
        </NavLink>
        <NavLink to="/gallery" $active={pathname === "/gallery"}>
          Gallery
        </NavLink>
        <NavLink to="/about_me" $active={pathname === "/about_me"}>
          About Me
        </NavLink>
      </Links>
    </Nav>
  );
}
