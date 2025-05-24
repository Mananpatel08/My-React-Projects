import React, {useState} from 'react'
import { productServices } from '../../services/productServices';

export const AddProduct = () => {
    const [ formData, setFormData ] = useState({
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: "",
      });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const res = await productServices.addProduct(
            formData.title,
            Number(formData.price),
            formData.description,
            Number(formData.categoryId),
            [formData.images]  // API expects an array of URLs
          );
          console.log("Product added:", res);
        } catch (error) {
          console.error("Error adding product:", error);
        }
      };
      

  return (
    <div>
      <form onSubmit={handleSubmit} className='d-flex flex-column gap-3 w-25'>

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <label>Category ID</label>
        <input
          type="number"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
        />

        <label htmlFor="">Image URL</label>
        <input 
        type="text" 
        name="images"
        value={formData.images}
        onChange={handleInputChange}
        />

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
