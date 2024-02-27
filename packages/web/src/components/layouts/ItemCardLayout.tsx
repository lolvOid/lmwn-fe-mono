
const ItemCardLayout:React.FC<{ children: React.ReactNode }> = ({children}) => {
    return <>
        <div className="relative shadow-md flex justify-center items-start h-full max-w-[600px] py-8  bg-white lg:min-w-[200px] min-w-full mt-0 mx-auto my-0 z-50  ">
            <div className="mx-0 lg:mx-auto my-0 w-full lg:w-auto px-4">
                <div className=" grid grid-cols-2 lg:grid-cols-2 gap-4 ">
                    {children}
                </div>
            </div>
        </div>
    </>;
};

export default ItemCardLayout;
