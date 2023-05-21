import BreadCrumbs from '@/components/common/BreadCrumbs';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';

function DashboardPage() {
  const { t } = useTranslation();
  return (
    <Container sx={{ padding: '20px' }}>
      <BreadCrumbs />
      <Typography variant="h4">{t('DashboardPage')}</Typography>
      <Outlet />
    </Container>
  );
}

export default DashboardPage;
