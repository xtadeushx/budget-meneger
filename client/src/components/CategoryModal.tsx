import { Form } from "react-router-dom";
import { ApiPath } from "../common/enums/enums";

interface ICategoryModalProps {
  type: 'post' | 'patch';
  id?: number;
  setVisibleModal: (visible: boolean) => void
}

const CategoryModal: React.FC<ICategoryModalProps> = ({ type, id, setVisibleModal }) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
      <Form
        action={`/${ApiPath.CATEGORIES}`}
        method={type}
        onSubmit={() => setVisibleModal(false)}
        className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900">
        <label htmlFor="title" className="flex flex-col gap-1">
          <small>Category title</small>
          <input
            className="bg-transparent border bg-slate-700 border-slate-800 rounded-md outline-none placeholder:text-white'"
            type="text"
            name='title'
            placeholder="Title..."
          />
          <input type="hidden" name='id' value={id} />
        </label>
        <div className="flex items-center gap-2">
          <button className="btn btn-green " type="submit">
            {type === 'patch' ? 'Save' : 'Create'}
          </button>
          <button onClick={() => setVisibleModal(false)} className="btn btn-red" type="button">Close</button>
        </div>
      </Form>
    </div >
  )
}

export { CategoryModal };