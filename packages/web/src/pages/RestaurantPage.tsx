import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantContainer from '@/components/containers/RestaurantContainer';
import useRestaurantQuery from '@/services/queries/restaurant.query';
import useModalStore from '@/store/modal/modalStore';
import CustomNavbar from '@/components/navbar/CustomNavbar';
import ItemModal from '@/components/modals/ItemModal';

const RestaurantPage = () => {
    const params = useParams<any>();
    const id = params?.id || '';
    const { show: showModal } = useModalStore();
    const [scrolled, setScrolled] = useState(false);

    const { data, error, isFetchingNextPage, isLoading, fetchNextPage } = useRestaurantQuery(id);

    const handleScroll = () => {
        const offset = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (offset > 322 && offset >= pageHeight * 0.9) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const currentRestaurant = data?.pages[0];

    useEffect(() => {
        if (scrolled && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [scrolled, isFetchingNextPage]);

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
