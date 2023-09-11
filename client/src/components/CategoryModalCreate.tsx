import { Form } from "react-router-dom";
// import { ApiPath } from "../common/enums/enums";
import { useMutation, useQueryClient } from "react-query";
import { categoryService } from "../services/category.service";
import { useState } from "react";

interface ICategoryModalProps {
  type: 'post' | 'patch';
  setVisibleModal: (visible: boolean) => void
}

const CategoryModalCreate: React.FC<ICategoryModalProps> = ({ type, setVisibleModal }) => {
  const [title, setTitle] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation(categoryService.addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories')
    },
  });

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVisibleModal(false)
    mutation.mutate({ title })
  };
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
      <Form
        method={type}
        onSubmit={handelSubmit}
        className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900">
        <label htmlFor="title" className="flex flex-col gap-1">
          <small>Category title</small>
          <input
            className="bg-transparent border bg-slate-700 border-slate-800 rounded-md outline-none placeholder:text-white'"
            type="text"
            name='title'
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <div className="flex items-center gap-2">
          <button className="btn btn-green " type="submit" >
            {type === 'patch' ? 'Save' : 'Create'}
          </button>
          <button onClick={() => setVisibleModal(false)} className="btn btn-red" type="button">Close</button>
        </div>
      </Form>
    </div >
  )
}

export { CategoryModalCreate };