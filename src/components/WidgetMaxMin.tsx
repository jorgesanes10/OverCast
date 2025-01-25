import { Grid2 } from '@mui/material';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Thermostat } from '@mui/icons-material';

interface WidgetMaxMinProps {
  maxTemperature: ReactNode;
  minTemperature: ReactNode;
  ariaLabel: string;
}

export default function WidgetMaxMin({
  maxTemperature,
  minTemperature,
  ariaLabel,
}: WidgetMaxMinProps) {
  return (
    <StyledWidgetMaxMin aria-label={ariaLabel} container>
      <Grid2 aria-hidden>
        <p>
          <Thermostat /> Min
        </p>
        <p className="value">{minTemperature}</p>
      </Grid2>
      <Grid2 aria-hidden>
        <p>
          <Thermostat /> Max
        </p>
        <p className="value">{maxTemperature}</p>
      </Grid2>
    </StyledWidgetMaxMin>
  );
}

const StyledWidgetMaxMin = styled(Grid2)`
  padding: 12px;
  color: #fff;
  background-color: #ffffff30;
  border-radius: 8px;

  display: flex;
  justify-content: space-evenly;

  p {
    margin: 0;
    font-weight: 100;
  }

  p.value {
    margin: 24px 0;
    font-size: 28px;
    align-self: center;
    font-weight: 400;
  }

  svg {
    position: relative;
    top: 5px;
  }
`;
