import { useContext } from 'react';
import { StoreContext } from '../context/storeContext.ts';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQueries } from '@tanstack/react-query';
import { fetchWeatherData } from '../api';
import WidgetSm from '../components/WidgetSm.tsx';
import { ArrowBack, Thermostat } from '@mui/icons-material';
import { Grid2 } from '@mui/material';
import UnitButton from '../components/UnitButton.tsx';

export default function Favorites() {
  const { favorites, unit, conditions } = useContext(StoreContext);

  const degrees = `°${unit === 'imperial' ? 'F' : 'C'}`;

  const cityQueries = useQueries({
    queries: favorites.map((city) => {
      return {
        queryKey: ['user', city, unit],
        queryFn: () => fetchWeatherData(city, unit),
      };
    }),
  });

  console.log(cityQueries[0]);

  return (
    <main className="loaded">
      <StyledHeader>
        <Link to="/">
          <ArrowBack />
        </Link>
        <UnitButton />
      </StyledHeader>
      <h1>My favorites</h1>
      {favorites.length === 0 && (
        <p>
          You have no favorite cities.{' '}
          <StyledLink to="/">Search now</StyledLink> to get started.
        </p>
      )}
      <Grid2 container className="widgets-container">
        {cityQueries.map(({ data, isLoading }, index) => {
          if (!isLoading) {
            return (
              <Grid2
                size={{ xs: 12, sm: 4, md: 3 }}
                key={`favorite-${index}`}
                sx={{ padding: '5px' }}
              >
                <WidgetLink
                  to={`/?city=${data.name}`}
                  data-testid={`favorite-link-${data.name}`}
                >
                  <WidgetSm
                    label={`${data.name} (${conditions})`}
                    value={
                      <>
                        {data.main.temp} <small>{degrees}</small>
                      </>
                    }
                    icon={<Thermostat />}
                    ariaLabel={`${data.name} `}
                  />
                </WidgetLink>
              </Grid2>
            );
          }
        })}
      </Grid2>
    </main>
  );
}

const StyledLink = styled(Link)`
  color: #fff;
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    color: #fff;
  }
`;

const WidgetLink = styled(Link)`
  text-decoration: none;

  div {
    transition: transform 0.2s ease-out;
  }

  &:hover div {
    transform: scale(1.04);
  }
`;
