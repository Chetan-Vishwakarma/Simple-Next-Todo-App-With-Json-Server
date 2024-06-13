"use client"
import { Todo } from "@/type/todoType";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "./Modal";
import { FormEvent, useState } from "react";
import { deleteTodo, editTodo } from "@/api/api";
import { useRouter } from "next/navigation";


interface Props {
    todos: Todo[],
}
export default function TodoList({ todos }: Props) {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
    const [todoText, setTodoText] = useState<string>("");
    const handleSubmit=async(e:FormEvent, id:string)=>{
        e.preventDefault();
        await editTodo({
            id: id,
            text: todoText
        });
        setTodoText("");
        setModalOpen(false);
        router.refresh();
    }
    const handleEdit=async(text:string)=>{
        setTodoText(text);
        setModalOpen(true);
    }
    const deleteTask=async(e:FormEvent,id:string)=>{
        e.preventDefault();
        await deleteTodo(id);
        setModalDeleteOpen(false);
        router.refresh();
    }

    return <div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(itm => (
                    <tr>
                        <td className="w-full">{itm?.text}</td>
                        <td className="flex gap-4">
                            <FaEdit className="text-blue-500" size={18} onClick={()=>handleEdit(itm?.text)}/>
                            <Modal openModal={modalOpen} setOpenModal={setModalOpen}>
                                <form onSubmit={(e)=>handleSubmit(e,itm?.id)}>
                                    <h3 className="font-bold text-lg"> Edit task </h3>
                                    <div className="modal-action">
                                        <input value={todoText} onChange={(e) => setTodoText(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
                                        <button className="btn" type="submit">Submit</button>
                                    </div>
                                </form>
                            </Modal>
                            <FaRegTrashAlt onClick={()=>setModalDeleteOpen(true)} className="text-red-500" size={18} />
                            <Modal openModal={modalDeleteOpen} setOpenModal={setModalDeleteOpen}>
                                <form onSubmit={(e)=>deleteTask(e,itm?.id)}>
                                    <h3 className="font-bold text-lg"> Are you sure, you want to delete this task? </h3>
                                    <div className="modal-action">
                                        <button className="btn" type="submit">Yes</button>
                                    </div>
                                </form>
                            </Modal>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}