import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

// Wrap both Nav and MobileMenu in a sticky container
const NavWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  position: relative; 
`;
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

  @media (max-width: 600px) {
    padding: 0 20px;
  }
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

// Desktop links — hidden on mobile
const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style-type: none;

  @media (max-width: 600px) {
    display: none;
  }
`;

// Hamburger button — only visible on mobile
const HamburgerBtn = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;

  @media (max-width: 600px) {
    display: flex;
  }
`;

const Bar = styled.span<{ $open: boolean; $pos: "top" | "mid" | "bot" }>`
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.textPrimary};
  transition: all 250ms ease;

  ${({ $open, $pos }) =>
    $open && $pos === "top" && `transform: translateY(7px) rotate(45deg);`}
  ${({ $open, $pos }) =>
    $open && $pos === "mid" && `opacity: 0; transform: scaleX(0);`}
  ${({ $open, $pos }) =>
    $open && $pos === "bot" && `transform: translateY(-7px) rotate(-45deg);`}
`;

/* Mobile dropdown menu */
const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    position: absolute;   /* ✅ overlays content instead of pushing it */
    top: 60px;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.surface};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ $open }) => ($open ? '16px 20px 20px' : '0 20px')};
    gap: 16px;
    overflow: hidden;
    max-height: ${({ $open }) => ($open ? '260px' : '0')};
    transition: max-height 280ms ease, padding 280ms ease;
  }
`;

const MobileLink = styled(Link)<{ $active: boolean }>`
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? "500" : "400")};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  padding: 4px 0;
  transition: color 150ms ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
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
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <NavWrapper>
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

        {/* Desktop */}
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

        {/* Hamburger */}
        <HamburgerBtn
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <Bar $open={open} $pos="top" />
          <Bar $open={open} $pos="mid" />
          <Bar $open={open} $pos="bot" />
        </HamburgerBtn>
      </Nav>

      {/* Mobile dropdown */}
      <MobileMenu $open={open}>
        <MobileLink to="/" $active={pathname === "/"} onClick={close}>
          Home
        </MobileLink>
        <MobileLink
          to="/gallery"
          $active={pathname === "/gallery"}
          onClick={close}
        >
          Gallery
        </MobileLink>

        <MobileLink
          to="/about_me"
          $active={pathname === "/about_me"}
          onClick={close}
        >
          About
        </MobileLink>
      </MobileMenu>
    </NavWrapper>
  );
}
