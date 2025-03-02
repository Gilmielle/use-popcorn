import ReactModal from 'react-modal';
import React, {useEffect, useState} from "react";
import IconClose from "#public/icon-close.svg?react"
import "../style.css"

interface ModalProps {
  children: React.ReactNode,
  title: string,
  defaultIsOpen: boolean
}
export const Modal = ({
  children = null,
  title = "",
  defaultIsOpen = false,
}: ModalProps) => {
  const [ isOpen, setIsOpen ] = useState(defaultIsOpen);

  useEffect(() => {
    setIsOpen(defaultIsOpen)
  }, [defaultIsOpen]);

  const handleModalClose = () => {
    setIsOpen(false)
  }


  return <ReactModal
    isOpen={isOpen}
    style={{
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
    }}
  >
    <div className={"modal flex flex-col gap-16"}>
      <div className={"modal__header flex justify-between gap-8"}>
        <div className={"modal__title font-bold text-3xl"}>{title}</div>
        <button
          className={"modal__close"}
          onClick={handleModalClose}
          type={"button"}
        >
          <IconClose />
        </button>
      </div>
      <div className={"modal__content text-lg"}>
        {children}
      </div>
    </div>
  </ReactModal>
}
