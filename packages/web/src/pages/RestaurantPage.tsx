import { useEffect, useState, SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantContainer from '@/components/containers/RestaurantContainer';
import useRestaurantQuery from '@/services/queries/restaurant.query';
import useModalStore from '@/store/modal/modalStore';
import CustomNavbar from '@/components/navbar/CustomNavbar';
import ItemModal from '@/components/modals/ItemModal';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { handleScroll } from '@/utilts/helper';

const RestaurantPage = () => {
    const params = useParams();
    const id = params?.id || '';
    const { show: showModal } = useModalStore();
    const [scrolled, setScrolled] = useState(false);

    const { data, error, isFetchingNextPage, isLoading, fetchNextPage } = useRestaurantQuery(id);

    const currentRestaurant = data?.pages[0];

    useEffect(() => {
        if (scrolled && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [scrolled, isFetchingNextPage, fetchNextPage]);

    useDocumentTitle(currentRestaurant?.name);

    return (
        <>
            <CustomNavbar />
            {!isLoading && !error && (
                <>
                    {showModal && <ItemModal restaurantId={id} />}
                    {data && (
                        <RestaurantContainer
                            pageData={data}
                            name={currentRestaurant.name}
                            openTime={currentRestaurant.activeTimePeriod.open}
                            closeTime={currentRestaurant.activeTimePeriod.close}
                            restaurantImage={currentRestaurant.coverImage}
                            onLayoutScroll={(event: SyntheticEvent) => {
                                handleScroll(event, setScrolled);
                            }}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default RestaurantPage;
