"use client";

import { ReactNode } from "react";

interface Props {
    openModal: boolean;
    setOpenModal: (bln: boolean) => boolean | void;
    children: ReactNode;
}
export default function Modal({ openModal, setOpenModal, children }: Props) {
    const handleClose = () => {
        setOpenModal(false);
    }
    return <>
        <dialog id="my_modal_3" className={`modal ${openModal ? "modal-open" : ""}`}>
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>✕</button>
                </form>
                {children}
            </div>
        </dialog>
    </>
}