import { Grid2 } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Search from './Search.tsx';
import UnitButton from './UnitButton.tsx';

interface HeaderProps {
  cleanData: () => void;
}

export default function Header({  cleanData }: HeaderProps) {
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
          <Search  />
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
