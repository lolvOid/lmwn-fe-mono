import { render, screen } from '@testing-library/react';
import RestaurantCardHeader from '@/components/restaurant-card/RestaurantCardHeader'; // Assuming your component is in './RestaurantCardHeader'
import '@testing-library/jest-dom';

describe('RestaurantCardHeader', () => {
  it('renders restaurant name and open/close hours correctly', () => {
    const name = 'My Restaurant';
    const openTime = '10:00';
    const closeTime = '20:00';

    render(<RestaurantCardHeader name={name} openTime={openTime} closeTime={closeTime} />);

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(`Open ${openTime} - Close ${closeTime}`)).toBeInTheDocument();
  });

  it('renders default values when props are not provided', () => {
    render(<RestaurantCardHeader name={''} openTime={''} closeTime={''} />);

    expect(screen.getByText('Restaurant Name')).toBeInTheDocument();
    expect(screen.getByText('Open 00:00 - Close 00:00')).toBeInTheDocument();
  });
});
