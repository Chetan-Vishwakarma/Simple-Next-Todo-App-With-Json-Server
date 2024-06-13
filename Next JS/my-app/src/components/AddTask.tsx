"use client"
import { AiOutlinePlus } from "react-icons/ai";
import Modal2 from "./Modal";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { addTodo } from "@/api/api";
import { v4 as uuidv4 } from 'uuid';

export default function AddTask() {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [todoText,setTodoText] = useState<string>("");
    const handleSubmit=async(e:FormEvent)=>{
        e.preventDefault();
        await addTodo({
            id: uuidv4(),
            text: todoText
        });
        setTodoText("");
        setModalOpen(false);
        router.refresh();
    }
    return <>
        <div>
            <button className="btn btn-primary w-full" onClick={() => setModalOpen(true)}>Add new task <AiOutlinePlus className="ml-2" size={18} /> </button>
            <Modal2 openModal={modalOpen} setOpenModal={setModalOpen}>
                <form onSubmit={handleSubmit}>
                    <h3 className="font-bold text-lg"> Add new task </h3>
                    <div className="modal-action">
                        <input value={todoText} onChange={(e)=>setTodoText(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
                        <button className="btn" type="submit">Submit</button>
                    </div>
                </form>
            </Modal2>
        </div>
    </>
}