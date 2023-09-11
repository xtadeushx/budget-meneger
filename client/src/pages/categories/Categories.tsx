import { FaPlus } from 'react-icons/fa';
import { CategoryModalCreate } from '../../components/CategoryModalCreate';
import { useState } from '../../hooks/hooks';
import { CategoryItem } from './components/item/CategoryItem';
// import { ICategoryItem } from './types';
import { useQuery } from 'react-query';
import { categoryService } from '../../services/category.service';
import { CategoryModalEdit } from '../../components/CategoryModalEdit';

const Categories: React.FC = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const categories = useQuery('categories', categoryService.getAllCategories);

  // Mutations

  const handelCreateCategory = (): void => {
    setVisibleModal(true);
    setIsEdit(false);
  }

  if (categories.isLoading && !categories.data) {
    <p>Loading...</p>
  }

  if (categories.error && !categories.data) {
    <p className='text-lg text-red-500'>Some error was accrued</p>
  }

  return (
    <>
      <div className="mt-10 p-4 rounded-md bg-slate-500 dark:bg-slate-800">
        <h1>
          Your category list
        </h1>
        {/* Category list */}
        <div className="flex mt-2 flex-wrap items-center gap-2">
          {categories.data && categories.data?.length > 0 && categories.data?.map((category) =>
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
      {!isEdit && visibleModal && <CategoryModalCreate type={'post'} setVisibleModal={setVisibleModal} />}
      {/* Edit category modal */}
      {isEdit && visibleModal && <CategoryModalEdit type={'patch'} id={categoryId} setVisibleModal={setVisibleModal} />}
    </>
  )
}

export { Categories };