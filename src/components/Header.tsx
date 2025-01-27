import { Grid2 } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Search from './Search.tsx';
import UnitButton from './UnitButton.tsx';

interface HeaderProps {
  cleanData: () => void;
}

export default function Header({ cleanData }: HeaderProps) {
  return (
    <header>
      <Grid2 container>
        <Grid2
          size={{ xs: 12, sm: 6 }}
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
          size={{ xs: 12, sm: 6 }}
          display="flex"
          justifyContent={{
            xs: 'center',
            sm: 'flex-end',
          }}
        >
          <Search />
        </Grid2>
      </Grid2>
    </header>
  );
}

const StyledLink = styled(Link)`
  color: #fff;
  margin-left: 20px;
`;
