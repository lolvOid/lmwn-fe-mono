import RestaurantCardHeader from '@/components/restaurant-card/RestaurantCardHeader';
import ItemCardLayout from '../layouts/ItemCardLayout';
import ItemCard from '../card/ItemCard';
import useRestaurantQuery from '@/services/queries/restaurant.query';
import { Fragment, Key, useEffect } from 'react';
import useShortMenuQuery from '@/services/queries/menu.query';
import { Menu } from '@/types/menu';

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
    return (
        <main className="w-full  max-h-screen relative">
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
                    {itemData?.pages.map((page: { menus: Menu[] }, i: Key | null | undefined) => {
                        return (
                            <Fragment key={i}>
                                {page.menus.map((item: Menu, index: number) => {
                                    return (
                                        <ItemCard
                                            id={item.id}
                                            dataKey={item.id}
                                            imageSource={item.thumbnailImage ?? ''}
                                            name={item.name}
                                            fullPrice={item.fullPrice.toString()}
                                            discountedPercent={Number(
                                                item.discountedPercent,
                                            ).toFixed(0)}
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
