/*
  Автор не я, компонент честно украден в инете :). Я только типизировал +
  убрал мелкие косяки + стилизовал под проект + заиспользовал `children`
  + добавил возможность закрытия по `Enter`
*/
import { ReactNode, useCallback, useEffect } from "react";
import "./modal.css";

interface ModalProps {
  isVisible: boolean;
  title: string | ReactNode;
  footer: ReactNode;
  onClose: () => void;
  onEnter?: () => void;
  children: ReactNode;
}

export const Modal = ({
  isVisible = false,
  title,
  footer,
  onClose,
  onEnter = undefined,
  children,
}: ModalProps) => {
  const keydownHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      switch (key) {
        case "Escape":
          onClose();
          break;
        case "Enter":
          onEnter?.();
          break;
        default:
      }
    },
    [onClose, onEnter]
  );

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [keydownHandler]);

  return !isVisible ? null : (
    // Чтобы окно закрывалось при щелчке вне его, надо так:
    // <div className="modal" onClick={onClose}>
    <div className="lock-screen">
      {/*
        `stopPropagation` нужно только если включено закрытие окна при
        щелчке вне его (см. коммент выше), чтобы окно не закрывалось
        при щелчке по нему
       */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <span className="modal__close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal__body">
          <div className="modal__content">{children}</div>
        </div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
};
