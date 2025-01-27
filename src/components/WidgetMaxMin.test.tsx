import { render, screen } from '@testing-library/react';
import WidgetMaxMin from './WidgetMaxMin.tsx';

describe('WidgetmaxMin', () => {
  test('renders the component', () => {
    const { container } = render(
      <WidgetMaxMin
        maxTemperature="30 F"
        minTemperature="20 F"
        ariaLabel="My aria label"
      />,
    );

    expect(screen.getByText('30 F')).toBeDefined();
    expect(screen.getByText('20 F')).toBeDefined();

    expect(container).toMatchSnapshot();
  });
});
