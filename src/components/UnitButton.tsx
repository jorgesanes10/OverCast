import styled from 'styled-components';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { StoreContext } from '../context/storeContext.ts';

interface UnitButtonProps {
  cleanData?: () => void;
}

export default function UnitButton({ cleanData }: UnitButtonProps) {
  const { unit, toggleUnit } = useContext(StoreContext);

  return (
    <StyledButton
      variant="outlined"
      color="inherit"
      onClick={() => {
        toggleUnit();

        if (cleanData) {
          cleanData();
        }
      }}
      aria-label={`Change to ${unit === 'imperial' ? 'metric' : 'imperial'} units`}
      data-testid="units-button"
    >
      <div>
        <span className={`${unit === 'imperial' ? 'selected' : 'unselected'}`}>
          Imperial
        </span>
        &nbsp;/&nbsp;
        <span className={`${unit === 'metric' ? 'selected' : 'unselected'}`}>
          metric
        </span>
      </div>
    </StyledButton>
  );
}

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
