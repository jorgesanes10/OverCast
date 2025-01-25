import { Button, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import styled from 'styled-components';
import { ChangeEvent, FormEvent, useContext } from 'react';
import { UnitsContext } from '../context/UnitsContext.ts';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
  cleanData: () => void;
}

export default function Header({
  searchValue,
  onSearchChange,
  onFormSubmit,
  cleanData,
}: HeaderProps) {
  const { unit, toggle } = useContext(UnitsContext);
  return (
    <StyledHeader>
      <Button
        variant="outlined"
        color="inherit"
        onClick={() => {
          toggle();
          cleanData();
        }}
      >
        Use {unit === 'imperial' ? 'metric' : 'imperial'} system
      </Button>
      <form onSubmit={onFormSubmit}>
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
          onChange={onSearchChange}
          variant="outlined"
          placeholder="Search for a city..."
        />
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
      </form>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

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
