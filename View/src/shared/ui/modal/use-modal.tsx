import { useCallback, useId } from 'react';

export const useModal = () => {
  const modalId = `modal-${useId()}`;

  const open = useCallback(() => {
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;

    if (modal) {
      modal.showModal();
    }
  }, [modalId]);

  const close = useCallback(() => {
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;

    if (modal) {
      modal.close();
    }
  }, [modalId]);

  return {
    modalId,
    open,
    close,
  };
};
