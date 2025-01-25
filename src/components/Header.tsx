import { Button, Grid2, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import styled from 'styled-components';
import { ChangeEvent, FormEvent, useContext } from 'react';
import { StoreContext } from '../context/storeContext.ts';
import { Link } from 'react-router-dom';

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
  const { unit, toggleUnit } = useContext(StoreContext);
  return (
    <StyledHeader>
      <Grid2 container>
        <Grid2
          size={{ xs: 12, sm: 4 }}
          display="flex"
          alignItems="center"
          justifyContent={{
            xs: 'center',
            sm: 'flex-start',
          }}
          marginBottom={{
            xs: '16px',
            sm: '0',
          }}
        >
          <StyledButton
            variant="outlined"
            color="inherit"
            onClick={() => {
              toggleUnit();
              cleanData();
            }}
            aria-label={`Change to ${unit === 'imperial' ? 'metric' : 'imperial'} units`}
          >
            <div>
              <span
                className={`${unit === 'imperial' ? 'selected' : 'unselected'}`}
              >
                Imperial
              </span>
              &nbsp;/&nbsp;
              <span
                className={`${unit === 'metric' ? 'selected' : 'unselected'}`}
              >
                metric
              </span>
            </div>
          </StyledButton>
          <StyledLink to="/history">Search history</StyledLink>
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 8 }}
          display="flex"
          justifyContent={{
            xs: 'center',
            sm: 'flex-end',
          }}
        >
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
          </StyledForm>
        </Grid2>
      </Grid2>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  //display: flex;
  //justify-content: space-between;
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

const StyledButton = styled(Button)`
  font-size: 12px !important;
  font-weight: 100;

  .selected {
    font-size: 14px;
    font-weight: 600;
  }

  .unselected {
    opacity: 0.5;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-wrap: nowrap;
`;

const StyledLink = styled(Link)`
  color: #fff;
  margin-left: 20px;
`;
