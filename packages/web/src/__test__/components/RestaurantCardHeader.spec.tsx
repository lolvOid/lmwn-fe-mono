import { render, screen } from '@testing-library/react';
import RestaurantCardHeader from '@/components/restaurant-card/RestaurantCardHeader'; // Assuming your component is in './RestaurantCardHeader'
import renderer from 'react-test-renderer';

describe('RestaurantCardHeader', () => {
    it('Should render restaurant name and open/close hours correctly', () => {
        const name = 'My Restaurant';
        const openTime = '10:00';
        const closeTime = '20:00';

        render(<RestaurantCardHeader name={name} openTime={openTime} closeTime={closeTime} />);

        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText(`Open ${openTime} - Close ${closeTime}`)).toBeInTheDocument();
    });

    it('Should render with default values when props are not provided', () => {
        render(<RestaurantCardHeader name={''} openTime={''} closeTime={''} />);

        expect(screen.getByText('Restaurant Name')).toBeInTheDocument();
        expect(screen.getByText('Open 00:00 - Close 00:00')).toBeInTheDocument();
    });

    it('Should render and match the default snapshot', () => {
        const header = renderer
            .create(
                <RestaurantCardHeader
                    name={'My Restaurant'}
                    openTime={'7:00'}
                    closeTime={'20:00'}
                />,
            )
            .toJSON();

        expect(header).toMatchSnapshot();
    });
});
