import { Button, Grid2 } from '@mui/material';
import styled from 'styled-components';
import { ChangeEvent, FormEvent, useContext } from 'react';
import { StoreContext } from '../context/storeContext.ts';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm.tsx';

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
            data-testid="units-button"
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
          <StyledLink to="/favorites" data-testid="favorites-link">
            Favorites
          </StyledLink>
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 8 }}
          display="flex"
          justifyContent={{
            xs: 'center',
            sm: 'flex-end',
          }}
        >
          <SearchForm
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            onFormSubmit={onFormSubmit}
          />
        </Grid2>
      </Grid2>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  //display: flex;
  //justify-content: space-between;
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

const StyledLink = styled(Link)`
  color: #fff;
  margin-left: 20px;
`;
