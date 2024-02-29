export type ModalDataType = {
    restaurantId: string;
    menuName: string;
};
export type ModalStore = {
    show: boolean;
    modalData: ModalDataType | undefined;
    showModal: () => void;
    hideModal: () => void;
    setModalData: (value: ModalDataType) => void;
    resetModalData: () => void;
};
