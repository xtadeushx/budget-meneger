import { useLoaderData } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { CategoryModal } from '../../components/CategoryModal';
import { useState } from '../../hooks/hooks';
import { CategoryItem } from './components/item/CategoryItem';
import { ICategoryItem } from './types';

const Categories: React.FC = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const categories = useLoaderData() as ICategoryItem[];

  const handelCreateCategory = (): void => {
    setVisibleModal(true);
    setIsEdit(false);
  }

  return (
    <>
      <div className="mt-10 p-4 rounded-md bg-slate-800">
        <h1>
          Your category list
        </h1>
        {/* Category list */}
        <div className="flex mt-2 flex-wrap items-center gap-2">
          {categories.length > 0 && categories.map((category) =>
          (<CategoryItem
            key={category.id}
            category={category}
            setCategoryId={setCategoryId}
            setVisibleModal={setVisibleModal}
            setIsEdit={setIsEdit}
          />))
          }
        </div>
        {/* Add category */}
        <button
          onClick={handelCreateCategory}
          className="flex mt-5 max-w-fit items-start gap-2 text-white/50 hover:text-white">
          <FaPlus />
          <span>Create a new category</span>
        </button>
      </div >
      {/* Add category modal */}
      {!isEdit && visibleModal && <CategoryModal type={'post'} setVisibleModal={setVisibleModal} />}
      {/* Edit category modal */}
      {isEdit && visibleModal && <CategoryModal type={'patch'} id={categoryId} setVisibleModal={setVisibleModal} />}
    </>
  )
}

export { Categories };