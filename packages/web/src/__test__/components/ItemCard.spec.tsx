import { render, screen, fireEvent } from '@testing-library/react';
import ItemCard from '@/components/card/ItemCard';
import renderer from 'react-test-renderer';

describe('ItemCard', () => {
    const mockProps = {
        name: 'Cake',
        imageSource: 'sample-image.jpg',
        fullPrice: 100,
        discountedPercent: '10',
        totalInStock: 5,
        onClick: jest.fn(),
    };

    it('Should render and match the snapshot with mockProps', () => {
        const itemCard = renderer.create(<ItemCard {...mockProps} />).toJSON();
        expect(itemCard).toMatchSnapshot();
    });

    it('Render properly with provided props', () => {
        render(<ItemCard {...mockProps} />);
        expect(screen.getByTestId('item-card-name')).toHaveTextContent('Cake');
        expect(screen.getByAltText('Cake')).toBeInTheDocument();
        expect(screen.getByTestId('item-card-discounted-price')).toHaveTextContent('฿90');
        expect(screen.getByTestId('item-card-price')).toHaveTextContent('฿100');
    });

    it('Should call onClick when clicked', () => {
        render(<ItemCard {...mockProps} />);
        fireEvent.click(screen.getByText('Cake'));
        expect(mockProps.onClick).toHaveBeenCalled();
    });
});
