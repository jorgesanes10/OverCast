import { Button, CircularProgress, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import styled from 'styled-components';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/storeContext.ts';
import { useQuery } from '@tanstack/react-query';
import { fetchCitiesByName } from '../api';

interface SearchFormProps {
  searchValue: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function SearchForm({
  onSearchChange,
  onFormSubmit,
}: SearchFormProps) {
  const [searchValue, setSearchValue] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setCurrentCity } = useContext(StoreContext);

  const { data, isFetching } = useQuery({
    queryKey: [searchValue],
    queryFn: async () => {
      return await fetchCitiesByName(searchValue);
    },
  });

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

    if (onSearchChange) {
      onSearchChange(event);
    }
  };

  type CitiesResponse = {
    properties: {
      placeId: string;
      city: string;
      lat: number;
      lon: number;
      country: string;
    };
  };

  const renderCities = () => {
    if (data.features) {
      return data.features.map(({ properties }: CitiesResponse) => (
        <Button
          sx={{
            color: '#fff',
          }}
          key={properties.placeId}
          onClick={() =>
            setCurrentCity({
              name: properties.city,
              lat: properties.lat,
              lon: properties.lon,
            })
          }
        >
          {properties.city}, {properties.country}
        </Button>
      ));
    }
  };

  console.log(data);

  return (
    <StyledForm onSubmit={onFormSubmit}>
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
          <>{isFetching ? <CircularProgress /> : renderCities()}</>
        </StyledDropdown>
      )}
      <Button
        sx={{
          padding: '15px',
          borderColor: '#fff',
          color: '#fff',
          position: 'relative',
          left: '-1px',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
        }}
        aria-label="Search"
        type="submit"
        variant="outlined"
        color="secondary"
      >
        <Search />
      </Button>
    </StyledForm>
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

const StyledForm = styled.form`
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
