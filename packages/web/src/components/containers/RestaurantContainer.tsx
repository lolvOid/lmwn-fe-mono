import RestaurantCardHeader from '@/components/restaurant-card/RestaurantCardHeader';
import ItemCardLayout from '@/components/layouts/ItemCardLayout';
import ItemCard from '@/components/card/ItemCard';
import { Fragment } from 'react';
import { Menu } from '@/types/menu';
import useModalStore from '@/store/modal/modalStore';
import { getKey } from '@/utilts/generateId';

type RestaurantContainerProps = {
    itemData: any;
    name: string;
    openTime: string;
    closeTime: string;
    restaurantImage: string;
};

const RestaurantContainer: React.FC<RestaurantContainerProps> = ({
    itemData,
    name,
    openTime,
    closeTime,
    restaurantImage,
}: RestaurantContainerProps) => {
    const { showModal, setModalData } = useModalStore();
    const handleShowItem = (name: string, restaurantId: any) => {
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
                            className="object-cover w-full h-[180px] lg:h-96"
                        />
                    </div>
                </div>
                <RestaurantCardHeader name={name} closeTime={closeTime} openTime={openTime} />
                <ItemCardLayout>
                    {itemData?.pages.map((page: { id: string; menus: Menu[] }) => {
                        return (
                            <Fragment key={getKey()}>
                                {page.menus.map((item: Menu, index: number) => {
                                    return (
                                        <ItemCard
                                            key={index}
                                            imageSource={item.thumbnailImage ?? ''}
                                            name={item.name}
                                            fullPrice={item.fullPrice.toString()}
                                            discountedPercent={Number(
                                                item.discountedPercent,
                                            ).toFixed(0)}
                                            totalInStock={0}
                                            onClick={() =>
                                                handleShowItem(item.name, page?.id || '')
                                            }
                                        />
                                    );
                                })}
                            </Fragment>
                        );
                    })}
                </ItemCardLayout>
            </div>
        </main>
    );
};

export default RestaurantContainer;
