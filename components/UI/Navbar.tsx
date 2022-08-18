import NextLink from 'next/link';
import { useContext } from 'react';
import { UIContext } from '../../context/UI/';

import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export function Navbar() {
  const { openSidebar } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSidebar}>
          <MenuOutlinedIcon />
        </IconButton>

        <NextLink href="/" passHref>
          <Link underline="none" color="white">
            <Typography variant="h6">OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
}
