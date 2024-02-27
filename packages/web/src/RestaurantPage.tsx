import { useParams } from 'react-router-dom';
import RestaurantContainer from './components/containers/RestaurantContainer';
import useRestaurantQuery from './services/queries/restaurant.query'; // Update with your actual file path
import { useEffect, useState } from 'react';
import CustomNavbar from './components/navbar/CustomNavbar';
import ItemModal from './components/modals/ItemModal';

const RestaurantPage = () => {
    const { id = '' } = useParams<{ id?: string }>();
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

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error....</div>;

    return (
        <>
            <CustomNavbar />
            <ItemModal />
            <RestaurantContainer
                itemData={data}
                name={currentRestaurant.name}
                openTime={currentRestaurant.activeTimePeriod.open}
                closeTime={currentRestaurant.activeTimePeriod.close}
                restaurantImage={currentRestaurant.coverImage}
            />
        </>
    );
};

export default RestaurantPage;
