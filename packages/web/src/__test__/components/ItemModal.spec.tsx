import { render, screen, fireEvent } from '@testing-library/react';
import ItemModal from '@/components/modals/ItemModal';
import * as modalStoreModule from '@/store/modal/modalStore';
import * as cartStoreModule from '@/store/cart/cartStore';
import useFullMenuItemQuery from '@/services/queries/menu.query';

jest.mock('@/services/queries/menu.query');

describe('ItemModal', () => {
    const mockHideModal = jest.fn();
    const mockResetModalData = jest.fn();
    const mockAddToCart = jest.fn();

    beforeEach(() => {
        jest.spyOn(modalStoreModule, 'default').mockReturnValue({
            show: true,
            modalData: {
                restaurantId: 227018,
                menuName: 'Egg',
            },
            setModalData: jest.fn(),
            showModal: jest.fn(),
            hideModal: mockHideModal,
            resetModalData: mockResetModalData,
        });

        jest.spyOn(cartStoreModule, 'default').mockReturnValue({
            addToCart: mockAddToCart,
            calculateTotalCartPrice: jest.fn(),
            calculateTotalCartCount: jest.fn(),
        });

        (useFullMenuItemQuery as jest.Mock).mockReturnValue({
            data: {
                name: 'Egg',
                id: 'Egg',
                thumbnailImage: 'thumb.jpg',
                fullPrice: 200,
                discountedPercent: 0,
                discountedTimePeriod: {
                    begin: '0',
                    end: '0',
                },
                sold: 200,
                totalInStock: 10,
                largeImage: 'sample.jpg',
                options: [],
            },
            isLoading: false,
            isError: false,
        });
    });

    it('Should render properly with provided modalData', async () => {
        render(<ItemModal restaurantId={227018} />);
        await screen.findByTestId('item-name');
        expect(screen.getByTestId('item-name')).toHaveTextContent('Egg');
        fireEvent.click(screen.getByTestId('close-button'));
        expect(mockHideModal).toHaveBeenCalled();
        expect(mockResetModalData).toHaveBeenCalled();
    });

    it('Should handle adding to cart properly', async () => {
        render(<ItemModal restaurantId={227018} />);
        const addToCartButton = screen.getByTestId('add-to-cart-button');
        fireEvent.click(addToCartButton);
        expect(mockAddToCart).toHaveBeenCalledWith({
            id: 'Egg',
            name: 'Egg',
            count: 1,
            restaurantId: 227018,
            fullPrice: 200,
            options: [],
            thumbnailImage: 'thumb.jpg',
        });
    });
});
