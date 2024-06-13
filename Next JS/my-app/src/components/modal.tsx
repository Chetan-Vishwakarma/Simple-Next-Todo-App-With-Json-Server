"use client"
import { addTodo, getTodos } from "@/api/api";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Modal(){
    const router = useRouter();
    const [isAdd,setIsAdd] = useState<boolean>(false);
    const [todoText,setTodoText] = useState<string>("");
    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        setIsAdd(false);
        await addTodo({
            id: uuidv4(),
            text: todoText
        });
        setTodoText("");
        router.refresh();
    }
    return <>
    <button onClick={()=>setIsAdd(true)}>Add Todo</button>
        {isAdd && <form onSubmit={handleSubmit}>
            <input type="text" value={todoText} onChange={(e)=>setTodoText(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>}
    </>
}