"use client";
import { deleteTodo, editTodo } from "@/api/api"
import { Todo } from "@/type/todoType"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface Props{
    todos: Todo[],
}
export default function TodoList({todos}:Props){
    const router = useRouter();
    const [isEdit,setIsEdit] = useState<boolean>(false);
    const [editId,setEditId] = useState<string>("");
    const [editText,setEditText] = useState<string>("");
    const handleDelete = async (id:string) => {
        await deleteTodo(id);
        router.refresh();
    }
    const handleEdit = async (todo: Todo) => {
        setEditText(todo.text);
        setIsEdit(true);
        setEditId(todo.id);
    }
    const saveEditTodo = async (e:FormEvent) => {
        e.preventDefault();
        await editTodo({
            id: editId,
            text: editText
        });
        router.refresh();
        setEditId("");
        setIsEdit(false);
        setEditText("");
    }
    
    return <>
    <table>
        <thead>
          <tr>
          <th>Name</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(itm=>(
            <>
            <tr>
              <td>{itm.text}</td>
              <td>
                <button onClick={()=>handleEdit(itm)}>Edit</button>
                <button onClick={()=>handleDelete(itm.id)}>Delete</button>
              </td>
            </tr>
            {isEdit && <tr><td><form onSubmit={saveEditTodo}>
                    <input type="text" value={editText} onChange={(e)=>setEditText(e.target.value)}/>
                    <button type="submit">Submit</button>
                </form></td></tr>}
            </>
          ))}
        </tbody>
      </table></>
}