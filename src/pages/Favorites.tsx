import { useContext } from 'react';
import { StoreContext } from '../context/storeContext.ts';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Favorites() {
  const { favorites } = useContext(StoreContext);

  return (
    <main>
      <StyledHeader>
        <Link to="/">Back</Link>
      </StyledHeader>
      <h1>My favorites</h1>
      {favorites.length === 0 && (
        <p>
          You have no favorite cities.{' '}
          <StyledLink to="/">Search now</StyledLink> to get started.
        </p>
      )}
      <StyledUl>
        {favorites.map((city) => (
          <li key={city}>
            <Link to={`/?city=${city}`}>{city}</Link>
          </li>
        ))}
      </StyledUl>
    </main>
  );
}

const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    margin: 10px 0;
  }

  a {
    font-size: 21px;
    color: #fff;
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
`;

const StyledHeader = styled.header`
  display: flex;
  a {
    color: #fff;
  }
`;
