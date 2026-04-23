import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
  font-family: ${({theme}) => theme.fonts.display};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

 

const LogoDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style-type:none
`;

const NavLink = styled(Link)<{$active?:boolean}>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme, $active}) => $active ?  theme.colors.primary : theme.colors.textSecondary};
  transition: color ${({ theme }) => theme.transitions.fast};
  &:hover{color: ${({theme})=> theme.colors.primary}
`;

export default function Navbar() {

    const {pathname} = useLocation();

return (
  
     <Nav>
      <Logo to="/">
        <LogoDot />
        PetGallery
      </Logo>
      <Links>
        <NavLink to="/"  $active={pathname === "/"}>Home</NavLink>
        <NavLink to="/gallery" $active={pathname === "/gallery"}>Gallery</NavLink>
        <NavLink to="/about_me" $active={pathname === "/about_me"}>About Me</NavLink>
        
      </Links>
    </Nav>
   
  
 
  
  )
}

