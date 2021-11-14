import { screen, render } from 'tests';

import { BusinessHeader } from './BusinessHeader';

describe('BusinessHeader', () => {
  it('renders children correctly', () => {
    render(
      <BusinessHeader>BusinessHeader</BusinessHeader>,
    );

    const element = screen.getByText('BusinessHeader');

    expect(element).toBeInTheDocument();
  });
});
