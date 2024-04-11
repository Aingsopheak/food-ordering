'use client'
import { useState } from 'react'

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    status: '',
    categoryId: ''
  })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const newProduct = await response.json()
        console.log('Product created successfully:', newProduct)
        setFormData({
          name: '',
          price: '',
          description: '',
          image: '',
          status: '',
          categoryId: ''
        })
      } else {
        console.error('Error creating product:', response.status)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type='text' name='name' value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Price:
        <input type='number' name='price' value={formData.price} onChange={handleChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea name='description' value={formData.description} onChange={handleChange} />
      </label>
      <br />
      <label>
        Image:
        <input type='text' name='image' value={formData.image} onChange={handleChange} />
      </label>
      <br />
      <label>
        Status:
        <input type='text' name='status' value={formData.status} onChange={handleChange} />
      </label>
      <br />
      <label>
        Category ID:
        <input type='text' name='categoryId' value={formData.categoryId} onChange={handleChange} />
      </label>
      <br />
      <button type='submit'>Create Product</button>
    </form>
  )
}

export default CreateProductForm
