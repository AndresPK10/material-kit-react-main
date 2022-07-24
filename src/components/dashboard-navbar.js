import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Bell as BellIcon } from '../icons/bell';
import { Users as UsersIcon } from '../icons/users';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { useRouter } from 'next/router';
import {LogOutUsuarioActual} from '../actions/UsuarioAction'
const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const router = useRouter();
  const { onSidebarOpen, ...other } = props;
  const CerrarSesion = () => {
    LogOutUsuarioActual();
    window.localStorage.clear();
    router.push('/login');
  }
  const GoAlertas = () => {
    router.push('/alertas');
  }
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
                onClick={GoAlertas}
              >
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Sign off">
            <IconButton sx={{ ml: 1 }}>
              <ExitToAppRoundedIcon fontSize="small"
              onClick={CerrarSesion} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
