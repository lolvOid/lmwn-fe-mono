import { render } from '@testing-library/react';
import RestaurantContainer, {
    RestaurantContainerProps,
} from '@/components/containers/RestaurantContainer';
import useModalStore from '@/store/modal/modalStore';
import renderer from 'react-test-renderer';
import { ModalStore } from '@/types/modalTypes';

jest.mock('@/store/modal/modalStore', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('RestaurantContainer', () => {
    const mockItemData = {
        pages: [
            {
                id: 'pageId1',
                menus: [
                    {
                        thumbnailImage: 'item1-image.jpg',
                        name: 'Item 1',
                        fullPrice: 200,
                        discountedPercent: '10',
                    },
                ],
            },
        ],
    };

    const mockProps = {
        itemData: mockItemData as unknown,
        name: 'Restaurant Name',
        openTime: '08:00 AM',
        closeTime: '10:00 PM',
        restaurantImage: 'restaurant-image.jpg',
    } as RestaurantContainerProps;

    it('Should render properly with provided props', () => {
        const mockShowModal = jest.fn();
        const mockSetModalData = jest.fn();
        (useModalStore as unknown as jest.Mock<ModalStore>).mockReturnValue({
            show: false,
            modalData: {
                menuName: '',
                restaurantId: '',
            },
            setModalData: mockSetModalData,
            showModal: mockShowModal,
            hideModal: jest.fn(),
            resetModalData: jest.fn(),
        });

        render(<RestaurantContainer {...mockProps} />);
        expect(mockShowModal).not.toHaveBeenCalled();
        expect(mockSetModalData).not.toHaveBeenCalled();

        const containter = renderer.create(<RestaurantContainer {...mockProps} />).toJSON();
        expect(containter).toMatchSnapshot();
    });
});
