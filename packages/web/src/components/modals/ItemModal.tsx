import { FaRegWindowClose, FaWindowClose } from "react-icons/fa";

const ItemModal = () => {
  return (
  <div className="fixed top-0 left-0 w-screen h-screen z-[1000]  bg-opacity-25 bg-black">
    <div className="w-full h-full flex justify-center items-center">
        <div className="relative flex z-[2000]  w-[600px] h-[600px] max-w-screen-2xl max-h-svh bg-white">
            <div className="flex justify-between h-16 border-b-2 border-solid border-gray-200 w-full">
                <button>

                </button>
            </div>
        </div>
    </div>
  </div>)
}

export default ItemModal;
