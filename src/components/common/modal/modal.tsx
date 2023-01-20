/*
  Автор не я, компонент честно украден в инете :). Я только типизировал +
  убрал мелкие косяки
*/
import React, { ReactNode } from "react";

interface ModalProps {
  isVisible: boolean;
  title: string | ReactNode;
  content: ReactNode;
  footer: ReactNode;
  onClose: () => void;
}

export const Modal = ({
  isVisible = false,
  title,
  content,
  footer,
  onClose,
}: ModalProps) => {
  const keydownHandler = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  return !isVisible ? null : (
    // Чтобы окно закрывалось при щелчке вне его, надо так:
    // <div className="modal" onClick={onClose}>
    <div className="modal">
      {/*
        `stopPropagation` нужно только если включено закрытие окна при
        щелчке вне его (см. коммент выше), чтобы окно не закрывалось
        при щелчке по нему
       */}
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
