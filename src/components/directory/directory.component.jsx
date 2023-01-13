import '../directory/directory.styles.scss';
import CategoryItem from '../directory-item/category-item.component'

const Directory = ({ categories }) => {



  return (
    <div className='categories-container'>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}

    </div>
  )



}

export default Directory;