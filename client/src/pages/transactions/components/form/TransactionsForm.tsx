import { Form, useLoaderData } from "react-router-dom"
import { Input } from "../../../../components/UI/input/input"
import { Select } from "../../../../components/UI/select/select"
import { FaPlus } from 'react-icons/fa'
import { ITransactionsLoaderResponse } from "../../types";
import { useState } from "../../../../hooks/hooks";
import { CategoryModal } from "../../../../components/CategoryModal";



const TransactionsForm: React.FC = () => {
  const { categories } = useLoaderData() as ITransactionsLoaderResponse
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <div className="rounded-md bg-slate-800 p-4">
      <Form className="grid gap-2" action="/transactions" method="post">
        <Input
          name="title"
          type="text"
          text="Title"
          required
          placeholder="Title..."
        />
        <Input
          name="amount"
          required
          type="number"
          text="Amount"
          placeholder="Amount..."
        />
        {categories.length > 0 ?
          <Select
            name="category"
            optionList={categories}
            title="Category"
            required
          /> :
          <h1 className="mt-1 text-red-400">To continue first create a category</h1>
        }
        <button
          onClick={() => setVisibleModal(true)}
          className="flex mt-2 max-w-fit items-start gap-2 text-white/50 hover:text-white">
          <FaPlus />
          <span>Manage categories:</span>
        </button>
        {/* Radio buttons */}
        <div className="flex gap-4 items-center">
          <label className="cursor-pointer flex items-center gap-2">
            <input type="radio" name="type" value={'income'} className="form-radio text-blue-600" />
            <span>Income</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input type="radio" name="type" value={'expense'} className="form-radio text-blue-600" />
            <span>Expense</span>
          </label>
        </div>
        {/* Submit button */}
        <button className="btn btn-green max-w-fit mt-2 hover:bg-green-700 transition-all ease-in duration-600" type="submit">
          Submit
        </button>
      </Form>
      {visibleModal && <CategoryModal type={'post'} setVisibleModal={setVisibleModal} />}
    </div>
  )
}

export default TransactionsForm