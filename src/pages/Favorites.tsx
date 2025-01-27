import { useContext } from 'react';
import { City, StoreContext } from '../context/storeContext.ts';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQueries } from '@tanstack/react-query';
import { fetchWeatherData } from '../api';
import WidgetSm from '../components/WidgetSm.tsx';
import { ArrowBack, Thermostat } from '@mui/icons-material';
import { Grid2 } from '@mui/material';
import UnitButton from '../components/UnitButton.tsx';

export default function Favorites() {
  const { favorites, unit, conditions, setCurrentCity } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const degrees = `°${unit === 'imperial' ? 'F' : 'C'}`;

  const cityQueries = useQueries({
    queries: favorites.map((city: City) => {
      return {
        queryKey: ['user', city, unit],
        queryFn: () => fetchWeatherData({ lat: city.lat, lon: city.lon }, unit),
      };
    }),
  });

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
                <StyledButton
                  data-testid={`favorite-link-${data.name}`}
                  // sx={{ padding: 0 }}
                  onClick={() => {
                    setCurrentCity({
                      name: data.name,
                      lat: data.coord.lat,
                      lon: data.coord.lon,
                    });

                    navigate('/');
                  }}
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
                </StyledButton>
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

const StyledButton = styled.button`
  all: unset;
  width: 100%;
  cursor: pointer;
  padding: 0;
`;
