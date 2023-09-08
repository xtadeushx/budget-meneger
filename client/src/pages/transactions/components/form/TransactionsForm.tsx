import { Form, useLoaderData } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';
import { Input } from "../../../../components/UI/input/input";
import { Select } from "../../../../components/UI/select/select";
import { ITransactionsLoaderResponse } from "../../types";
import { useState, useRef } from "../../../../hooks/hooks";
import { CategoryModal } from "../../../../components/CategoryModal";
import { ActionMethods, ApiPath } from "../../../../common/enums/enums";
import { RadioButton, } from "./components/radioButtons/RadioButtons";
import { radioButtonsData } from "./constants/constants";



const TransactionsForm: React.FC = () => {
  const { categories } = useLoaderData() as ITransactionsLoaderResponse;

  const [visibleModal, setVisibleModal] = useState(false);
  const [categoryId, setCategoryId] = useState(categories[0].id);

  const formRef = useRef<HTMLFormElement | null>(null);

  const handelCategoryId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = categories.find(option => option.title === event.target.value);
    if (category) setCategoryId(+category.id);
  };

  return (
    <div className="rounded-md bg-slate-800 p-4">
      <Form
        className="grid gap-2"
        action={`/${ApiPath.TRANSACTIONS}`}
        method={`${ActionMethods.POST}`}
        ref={formRef}

      >
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
            onChange={handelCategoryId}
            required
          /> :
          <h1 className="mt-1 text-red-400">To continue first create a category</h1>
        }

        <input type="hidden" name="categoryId" value={categoryId} />

        <button
          onClick={() => setVisibleModal(true)}
          className="flex mt-2 max-w-fit items-start gap-2 text-white/50 hover:text-white">
          <FaPlus />
          <span>Manage categories:</span>
        </button>
        {/* Radio buttons */}
        <div className="flex gap-4 items-center">
          {radioButtonsData.length > 0 && radioButtonsData.map(btn => (
            <RadioButton
              key={btn.id}
              name={btn.name}
              text={btn.text}
              value={btn.value}

            />
          ))}
        </div>
        {/* Submit button */}
        <button className="btn btn-green max-w-fit mt-2 hover:bg-green-700 transition-all ease-in duration-600" type="submit">
          Submit
        </button>
      </Form>
      {visibleModal && <CategoryModal type={'post'} setVisibleModal={setVisibleModal} />}
    </div >
  )
}

export default TransactionsForm