import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  modalId: string;
  title: string;
  content: ReactNode;
}

export const Modal = (props: ModalProps) => {
  const { modalId, title, content } = props;

  return createPortal(
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg select-none">{title}</h3>
        <p className="py-4">{content}</p>
      </div>
    </dialog>,
    document.body,
  );
};
