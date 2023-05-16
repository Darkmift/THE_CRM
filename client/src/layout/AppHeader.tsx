import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import CountrySelect from '@/components/common/CountrySelect';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Props = {
  anchorElNav?: null | HTMLElement;
  handleOpenNavMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu?: () => void;
};

const pages = [
  { path: '/', name: 'Home' },
  { path: '/projects', name: 'Projects' },
  { path: '/internships', name: 'Internships' },
  { path: '/instructors', name: 'Instructors' },
  { path: '/winning-projects', name: 'Winning Projects' },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function HamburgerMenu({ anchorElNav, handleCloseNavMenu, handleOpenNavMenu }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {pages.map((page) => (
            <MenuItem to={page.path} component={Link} key={page.name} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{t(page.name)}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        LOGO
      </Typography>
    </>
  );
}

function NormalMenu({ handleCloseNavMenu }: Props) {
  const { t } = useTranslation('AppHeader');
  return (
    <>
      <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mx: 3,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        LOGO
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Button
            key={page.name}
            component={Link}
            to={page.path}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {t(page.name)}
          </Button>
        ))}
      </Box>
    </>
  );
}

function AvatarMenu() {
  const { t } = useTranslation();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{t(setting)}</Typography>
          </MenuItem>
        ))}
        <MenuItem>
          <CountrySelect handleCloseUserMenu={handleCloseUserMenu} />
        </MenuItem>
      </Menu>
    </Box>
  );
}

function AppHeader({}: Props) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <HamburgerMenu {...{ anchorElNav, handleCloseNavMenu, handleOpenNavMenu }} />
          <NormalMenu handleCloseNavMenu={handleCloseNavMenu} />
          <AvatarMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppHeader;
