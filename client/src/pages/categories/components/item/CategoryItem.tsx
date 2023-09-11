import React from 'react'
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai'
import { Form } from 'react-router-dom';
import { ICategoryItem } from '../../types';
import { useMutation } from 'react-query';
import { categoryService } from '../../../../services/category.service';

interface ICategoryItemProps {
  category: ICategoryItem,
  setCategoryId: (id: number) => void
  setVisibleModal: (visible: boolean) => void
  setIsEdit: (visible: boolean) => void
}



const CategoryItem: React.FC<ICategoryItemProps> = ({ category, setCategoryId, setVisibleModal, setIsEdit }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const deleteCategory = useMutation((id: number) => {
    return categoryService.removeCategory(id);
  });
  const handelEditCategory = () => {
    setCategoryId(id);
    setVisibleModal(true);
    setIsEdit(true);
  }
  const { title, id } = category;

  return (
    <>
      <div className="group px-4 py-2 rounded-md bg-blue-600 flex items-center relative gap-2 capitalize">
        {title}
        <div className="absolute hidden px-3 left-0 top-0 right-0 bottom-0 rounded-md bg-black/80  items-center justify-between group-hover:flex">
          <button onClick={handelEditCategory}>
            <AiFillEdit />
          </button>

          <Form className='flex' onSubmit={() => deleteCategory.mutate(id)}>
            <button type='submit'>
              <AiFillCloseCircle />
            </button>
          </Form>
        </div>
      </div >
    </>
  )
}

export { CategoryItem };