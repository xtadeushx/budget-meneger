import { Form } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';
import { Input } from "../../../../components/UI/input/input";
import { Select } from "../../../../components/UI/select/select";
import { useState, useRef } from "../../../../hooks/hooks";
import { CategoryModalCreate } from "../../../../components/CategoryModalCreate";
import { ActionMethods, ApiPath } from "../../../../common/enums/enums";
import { RadioButton, } from "./components/radioButtons/RadioButtons";
import { radioButtonsData } from "./constants/constants";
import { useQuery } from "react-query";
import { categoryService } from "../../../../services/category.service";



const TransactionsForm: React.FC = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const formRef = useRef<HTMLFormElement | null>(null);
  // const { categories } = useLoaderData() as ITransactionsLoaderResponse;
  const categories = useQuery('categories', categoryService.getAllCategories);
  if (!categories.data && categories.isLoading) {
    return <p>Loading</p>;
  }


  const handelCategoryId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!categories.data) return
    const category = categories?.data.find(option => option.title === event.target.value);
    if (category) setCategoryId(+category.id);
  };

  return (
    <div className="rounded-md bg-slate-500 dark:bg-slate-800 p-4">
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
        {categories?.data && categories?.data.length > 0 ?
          <Select
            name="category"
            optionList={categories.data}
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
      {visibleModal && <CategoryModalCreate type={'post'} setVisibleModal={setVisibleModal} />}
    </div >
  )
}

export default TransactionsForm