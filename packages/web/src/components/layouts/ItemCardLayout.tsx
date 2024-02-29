import { SyntheticEvent } from 'react';

interface ItemCardLayoutProps {
    onLayoutScroll?: (event: SyntheticEvent) => void;
    children: React.ReactNode;
}

const ItemCardLayout: React.FC<ItemCardLayoutProps> = ({ onLayoutScroll, children }) => {
    return (
        <>
            <div
                className="relative flex justify-center items-start h-[600px] overflow-y-auto max-w-[600px] py-8  bg-white lg:min-w-[200px] min-w-full mt-0 mx-auto my-0 z-50"
                onScroll={onLayoutScroll}
            >
                <div className="mx-0 lg:mx-auto my-0 w-full lg:w-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 py-2">{children}</div>
                </div>
            </div>
        </>
    );
};

export default ItemCardLayout;
