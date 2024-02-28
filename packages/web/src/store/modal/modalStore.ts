import { create } from 'zustand';

type ModalDataType = {
    restaurantId: string;
    menuName: string;
}
type ModalStore = {
    show: boolean;
    modalData: ModalDataType | undefined;
    showModal: () => void;
    hideModal: () => void;
    setModalData: (value: object) => void;
    resetModalData: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
    show: false,
    modalData: {
        menuName: '',
        restaurantId: '',
    },
    setModalData: (value: ModalDataType | object | any) =>  set({ modalData: value }),
    showModal: () => set({ show: true }),
    hideModal: () => set({ show: false }),
    resetModalData: () => set({modalData: {
        menuName: '',
        restaurantId: '',
    }}),
}));

export default useModalStore;