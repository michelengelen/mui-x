'use client';

import * as React from 'react';
import * as BaseUI from '@base-ui-components/react';
import Link from 'next/link';
import { styled } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NavContainer = styled('nav')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  padding: '0.75rem 0',
}));

const NavContent = styled('div')(() => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Logo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1.25rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  cursor: 'pointer',
}));

const NavLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    display: 'none',
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
  transition: 'color 0.2s',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const IconButton = styled(BaseUI.Button)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const MobileMenuButton = styled(IconButton)(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'flex',
  },
}));

const MobileMenu = styled('div')<{ open: boolean }>(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: '280px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[8],
  transform: open ? 'translateX(0)' : 'translateX(100%)',
  transition: 'transform 0.3s ease',
  zIndex: 1100,
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

const Overlay = styled('div')<{ open: boolean }>(({ open }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  opacity: open ? 1 : 0,
  pointerEvents: open ? 'auto' : 'none',
  transition: 'opacity 0.3s',
  zIndex: 1050,
}));

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <NavContainer>
        <NavContent>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Logo>
              <span style={{ fontSize: '1.5rem' }}>📝</span>
              <span>MUI X Editor</span>
            </Logo>
          </Link>

          <NavLinks>
            <NavLink href="/playground">Playground</NavLink>
            <NavLink href="/examples">Examples</NavLink>
            <NavLink href="/docs">Documentation</NavLink>
            <NavLink href="/api">API</NavLink>
            <IconButton
              as="a"
              href="https://github.com/mui/mui-x"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
          </NavLinks>

          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
            <MenuIcon />
          </MobileMenuButton>
        </NavContent>
      </NavContainer>

      <Overlay open={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />
      
      <MobileMenu open={mobileMenuOpen}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <Logo>MUI X Editor</Logo>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <NavLink href="/playground" onClick={() => setMobileMenuOpen(false)}>Playground</NavLink>
        <NavLink href="/examples" onClick={() => setMobileMenuOpen(false)}>Examples</NavLink>
        <NavLink href="/docs" onClick={() => setMobileMenuOpen(false)}>Documentation</NavLink>
        <NavLink href="/api" onClick={() => setMobileMenuOpen(false)}>API</NavLink>
      </MobileMenu>
    </>
  );
}
