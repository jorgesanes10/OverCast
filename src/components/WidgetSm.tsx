import { ReactNode } from 'react';
import styled from 'styled-components';

interface WidgetSmProps {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  ariaLabel: string;
}

export default function WidgetSm({
  label,
  value,
  icon,
  ariaLabel,
}: WidgetSmProps) {
  return (
    <StyledWidgetSm aria-label={ariaLabel} className="widget">
      <div aria-hidden>
        <p>
          {icon} {label}
        </p>
        <p className="value">{value}</p>
      </div>
    </StyledWidgetSm>
  );
}

const StyledWidgetSm = styled.div`
  height: 100%;
  display: flex;

  div {
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 12px;
    color: #fff;
    background-color: #ffffff30;
    border-radius: 8px;
    flex-grow: 1;
  }

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
