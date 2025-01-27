import { render, screen } from '@testing-library/react';
import WidgetSm from './WidgetSm.tsx';

describe('WidgetSm', () => {
  test('renders the component', () => {
    const { container } = render(
      <WidgetSm
        label="My label"
        value="My value"
        icon="My icon"
        ariaLabel="My aria label"
      />,
    );

    expect(screen.getByText('My icon My label')).toBeDefined();
    expect(screen.getByText('My value')).toBeDefined();

    expect(container).toMatchSnapshot();
  });
});
