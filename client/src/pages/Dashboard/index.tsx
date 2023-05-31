import BreadCrumbs from '@/components/common/BreadCrumbs';
import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

function DashboardPage() {
  const { t } = useTranslation();

  const btnData: { href: string; text: string }[] = [
    {
      href: './project',
      text: 'Projects',
    },
    {
      href: './year',
      text: 'Years',
    },
  ];

  return (
    <Container
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      <BreadCrumbs />
      <Typography variant="h4">{t('DashboardPage')}</Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        {btnData.map((data, key) => (
          <Button
            key={key}
            sx={{ height: '70px' }}
            variant="contained"
            component={Link}
            to={data.href}
          >
            {data.text}
          </Button>
        ))}
      </Box>
      <Outlet />
    </Container>
  );
}

export default DashboardPage;
