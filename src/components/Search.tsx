import { Button, CircularProgress, TextField } from '@mui/material';
import styled from 'styled-components';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { StoreContext } from '../context/storeContext.ts';
import { useQuery } from '@tanstack/react-query';
import { fetchCitiesByName } from '../api';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchNow, setSearchNow] = useState(false);
  const { setCurrentCity } = useContext(StoreContext);

  const timeout = useRef(0);

  const { data, isFetching } = useQuery({
    queryKey: [searchValue],
    queryFn: async () => {
      setSearchNow(false);
      return await fetchCitiesByName(searchValue);
    },
    enabled: searchNow,
  });

  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = window.setTimeout(() => {
      if (searchValue) {
        setSearchNow(true);
      }
    }, 300);
  }, [searchValue]);

  useEffect(() => {
    document.body.addEventListener('click', hideDropdown, true);

    return () => {
      document.body.removeEventListener('click', hideDropdown, true);
    };
  }, []);

  const hideDropdown = (event: MouseEvent) => {
    const keepDropdown = (
      event.target as unknown as { dataset: { keepdropdown: string } }
    ).dataset.keepdropdown;

    if (!keepDropdown) {
      setDropdownVisible(false);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;

    setSearchValue(searchTerm);
  };

  type CitiesResponse = {
    properties: {
      placeId: string;
      city: string;
      lat: number;
      lon: number;
      country: string;
      country_code: string;
    };
  };

  const renderCities = () => {
    if (data.features) {
      return data.features.map(
        ({ properties }: CitiesResponse, index: number) => {
          if (!properties.city) {
            return null;
          }

          return (
            <Button
              sx={{
                color: '#fff',
              }}
              key={`${properties.placeId}-${index}`}
              data-testid={`cities-result-${index}`}
              onClick={() =>
                setCurrentCity({
                  name: `${properties.city}, ${properties.country_code}`,
                  lat: Math.trunc(properties.lat * 10000) / 10000,
                  lon: Math.trunc(properties.lon * 10000) / 10000,
                })
              }
            >
              {properties.city}, {properties.country}
            </Button>
          );
        },
      );
    }
  };

  return (
    <StyledWrapper>
      <StyledTextField
        sx={{
          '&:hover': {
            borderColor: '#fff',
          },
          '&:focused': {
            borderColor: '#fff',
          },
        }}
        color="secondary"
        value={searchValue}
        onChange={handleSearchChange}
        variant="outlined"
        placeholder="Search for a city..."
        onFocus={() => setDropdownVisible(true)}
        onKeyDown={(event) => {
          setDropdownVisible(true);

          if (event.key === 'Escape') {
            setDropdownVisible(false);
          }
        }}
        inputProps={{
          'data-keepdropdown': 'true',
          'data-testid': 'search-field',
        }}
      />
      {data && data.features && (
        <StyledDropdown
          data-keepdropdown="true"
          className={`${dropdownVisible ? 'dropdown-visible' : ''}`}
        >
          <>
            {data.features.length > 0 ? (
              renderCities()
            ) : (
              <StyledSpan>No cities found</StyledSpan>
            )}
          </>
        </StyledDropdown>
      )}
      <>{isFetching && <StyledCircularProgress size={30} color="inherit" />}</>
    </StyledWrapper>
  );
}

const StyledTextField = styled(TextField)`
  input {
    color: #fff;
  }

  fieldset {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-color: #fff;
  }

  & .MuiInputBase-root:hover {
    border-color: #fff;
  }

  & .MuiInputBase-root:hover fieldset {
    border-color: #fff;
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #fff;
    }
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
`;

const StyledDropdown = styled.div`
  position: absolute;
  background-color: #11111180;
  top: 100%;
  width: 100%;
  z-index: 10;
  border-radius: 8px;
  padding: 16px 0;

  @supports (-webkit-backdrop-filter: blur(7px)) {
    -webkit-backdrop-filter: blur(7px);
    background-color: #ffffff50;
  }

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-out;

  display: flex;
  flex-direction: column;

  text-align: left;

  a {
    text-decoration: none;
    padding: 10px;
    color: #fff;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const StyledSpan = styled.span`
  padding: 16px;
  display: flex;
  justify-content: center;
`;

const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
  right: 10px;
  transform: scale(0.5);
  top: 12px;
  pointer-events: none;
`;
