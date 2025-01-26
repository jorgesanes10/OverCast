import { Grid2 } from '@mui/material';
import styled from 'styled-components';
import { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm.tsx';
import UnitButton from './UnitButton.tsx';

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
          <UnitButton cleanData={cleanData} />
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

const StyledLink = styled(Link)`
  color: #fff;
  margin-left: 20px;
`;
