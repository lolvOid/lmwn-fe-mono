import { useParams } from 'react-router-dom';
import RestaurantContainer from './components/containers/RestaurantContainer';
import useRestaurantQuery from './services/queries/restaurant.query'; // Update with your actual file path
import { useEffect, useState } from 'react';
import CustomNavbar from './components/navbar/CustomNavbar';
import ItemModal from './components/modals/ItemModal';
import useModalStore from './store/modal/modalStore';
import RestaurantLoadingContainer from './components/loading/Loading';
import Loading from './components/loading/Loading';

const RestaurantPage = () => {
    const { id = '' } = useParams<{ id?: string }>();
    const { show: showModal } = useModalStore();
    const [scrolled, setScrolled] = useState(false);
    const { data, error, isFetchingNextPage, isLoading, fetchNextPage } = useRestaurantQuery(id);
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 322) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    const currentRestaurant = data?.pages[0];
    useEffect(() => {
        fetchNextPage();
        if (data) document.title = currentRestaurant.name;
    }, [data]);

    return (
        <>
            <CustomNavbar />
            {!isLoading && !error && (
                <>
                    {showModal && <ItemModal restaurantId={id} />}
                    <RestaurantContainer
                        itemData={data}
                        name={currentRestaurant.name}
                        openTime={currentRestaurant.activeTimePeriod.open}
                        closeTime={currentRestaurant.activeTimePeriod.close}
                        restaurantImage={currentRestaurant.coverImage}
                    />
                </>
            )}
        </>
    );
};

export default RestaurantPage;
