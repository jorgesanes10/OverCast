import { useContext } from 'react';
import { StoreContext } from '../context/storeContext.ts';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function SearchHistory() {
  const { searchHistory } = useContext(StoreContext);

  return (
    <main>
      <h1>Search history</h1>
      {searchHistory.length === 0 && (
        <p>
          There are no cities in your search history.{' '}
          <StyledLink to="/">Search now</StyledLink>
        </p>
      )}
      <StyledUl>
        {searchHistory.map((city) => (
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
