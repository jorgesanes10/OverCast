import { Button, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/storeContext.ts';

interface SearchFormProps {
  searchValue: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function SearchForm({
  searchValue,
  onSearchChange,
  onFormSubmit,
}: SearchFormProps) {
  const { searchHistory } = useContext(StoreContext);
  const [historyToDisplay, setHistoryToDisplay] = useState(searchHistory);
  const [dropdownVisible, setDropdownVisible] = useState(false);

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

    if (onSearchChange) {
      onSearchChange(event);
    }

    const newHistoryToDisplay = searchHistory.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setHistoryToDisplay(newHistoryToDisplay);
  };

  const renderSearchHistory = () =>
    historyToDisplay.map((city) => (
      <Link
        data-testid={`history-item-${city}`}
        key={city}
        to={`/?city=${city}`}
      >
        {city}
      </Link>
    ));

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
      {searchHistory.length > 0 && (
        <StyledDropdown
          data-keepdropdown="true"
          className={`${dropdownVisible ? 'dropdown-visible' : ''}`}
        >
          <StyledHistoryHeader>SEARCH HISTORY</StyledHistoryHeader>
          {renderSearchHistory()}
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
  background-color: #ffffff50;
  top: 100%;
  width: 89%;
  padding: 16px;
  -webkit-backdrop-filter: blur(7px);
  z-index: 10;
  border-radius: 8px;

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

const StyledHistoryHeader = styled.p`
  color: #fff;
  opacity: 0.7;
  margin-top: 0;
  margin-bottom: 8px;
`;
