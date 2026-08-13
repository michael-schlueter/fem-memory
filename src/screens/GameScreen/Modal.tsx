import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
};

function Modal({ open, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={(e) => {
        if (!onClose) e.preventDefault();
      }}
      className="m-auto max-w-[calc(100vw-48px)] rounded-[10px] bg-grey-100 backdrop:bg-black/50 md:rounded-[20px]"
    >
      {children}
    </dialog>
  );
}

export default Modal;
