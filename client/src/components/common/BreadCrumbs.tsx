import { Breadcrumbs, Link as MuiLink, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type BreadCrumbSegment = { path: string; name: string };

function BreadCrumbs() {
  const location = useLocation();
  const [routeSegments, setRouteSegments] = useState<BreadCrumbSegment[]>([]);

  useEffect(() => {
    let cumulativePath = '';
    const segments = location.pathname
      .split('/')
      .filter((s) => s.length)
      .map((s) => {
        cumulativePath += `/${s}`;
        const name = s.replace(/-/g, ' ');
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
        return { path: cumulativePath, name: formattedName };
      });

    setRouteSegments(segments);
  }, [location]);

  return (
    <Breadcrumbs maxItems={2} separator="›" aria-label="breadcrumb">
      {routeSegments.map((segment, key, self) => {
        return segment === self[self.length - 1] ? (
          <Typography key={key} color="#a7a7a7">
            {segment.name}
          </Typography>
        ) : (
          <MuiLink component={Link} key={key} to={segment.path} underline="hover" color="inherit">
            {segment.name}
          </MuiLink>
        );
      })}
    </Breadcrumbs>
  );
}

export default BreadCrumbs;
