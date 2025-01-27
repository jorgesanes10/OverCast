import { render, fireEvent, screen } from '@testing-library/react';
import UnitButton from './UnitButton.tsx';
import StoreProvider from '../context/StoreProvider.tsx';

describe('UnitButton', () => {
  test('renders the component', () => {
    render(
      <StoreProvider>
        <UnitButton />
      </StoreProvider>,
    );

    expect(screen.getByText('Imperial')).toHaveProperty(
      'className',
      'selected',
    );
    expect(screen.getByText('metric')).toHaveProperty(
      'className',
      'unselected',
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('metric')).toHaveProperty('className', 'selected');
  });
});
