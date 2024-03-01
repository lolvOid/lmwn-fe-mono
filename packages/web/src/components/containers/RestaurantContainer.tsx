import RestaurantCardHeader from '@/components/restaurant-card/RestaurantCardHeader';
import ItemCardLayout from '@/components/layouts/ItemCardLayout';
import ItemCard from '@/components/card/ItemCard';
import { Fragment } from 'react';
import { Menu } from '@/interfaces/menu';
import useModalStore from '@/store/modal/modalStore';
import { getKey } from '@/utils/generateId';
import { RestaurantContainerProps } from './RestaurantContainerProps';
import styles from '@/components/containers/RestaurantContainer.module.scss';
import DotsLoading from '../loading/DotsLoading';

const RestaurantContainer: React.FC<RestaurantContainerProps> = ({
    pageData,
    name,
    openTime,
    closeTime,
    restaurantImage,
    isLoading,
    onLayoutScroll,
}: RestaurantContainerProps) => {
    const { showModal, setModalData } = useModalStore();
    const handleShowItem = (name: string, restaurantId: string) => {
        showModal();
        setModalData({
            menuName: name,
            restaurantId: restaurantId,
        });
    };
    return (
        <main className="w-full max-h-screen relative overflow-y-visible">
            <div className="mx-auto my-0 relative">
                <div className="flex sticky top-16">
                    <div className="w-full mx-auto my-0">
                        <img
                            src={restaurantImage}
                            alt={name}
                            className={styles.containerImage}
                        />
                    </div>
                </div>
                <RestaurantCardHeader name={name} closeTime={closeTime} openTime={openTime} />
                <ItemCardLayout onLayoutScroll={onLayoutScroll}>
                    {pageData &&
                        pageData.pages.length &&
                        pageData.pages.map((page) => {
                            return (
                                <Fragment key={getKey()}>
                                    {page.menus.map((item: Menu, index: number) => {
                                        return (
                                            <ItemCard
                                                key={index}
                                                imageSource={item.thumbnailImage ?? ''}
                                                name={item.name}
                                                fullPrice={item.fullPrice}
                                                discountedPercent={item.discountedPercent}
                                                totalInStock={0}
                                                onClick={() => handleShowItem(item.name, page?.id)}
                                            />
                                        );
                                    })}
                                </Fragment>
                            );
                        })}
                </ItemCardLayout>
                {isLoading && <DotsLoading />}
            </div>
        </main>
    );
};

export default RestaurantContainer;
