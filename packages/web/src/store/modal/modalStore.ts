import { ModalDataType, ModalStore } from '@/types/modalTypes';
import { create } from 'zustand';

const useModalStore = create<ModalStore>((set) => ({
    show: false,
    modalData: {
        menuName: '',
        restaurantId: '',
    },
    setModalData: (value: ModalDataType) => set({ modalData: value }),
    showModal: () => set({ show: true }),
    hideModal: () => set({ show: false }),
    resetModalData: () =>
        set({
            modalData: {
                menuName: '',
                restaurantId: '',
            },
        }),
}));

export default useModalStore;
