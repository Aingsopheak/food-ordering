import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
const express = require('express')

export const GET_BY_ID = async (request, { params }) => {
  try {
    const id = parseInt(params.id)
    const product = await prisma.product.findUnique({
      where: {
        id
      }
    })
    if (!product) {
      return NextResponse.error(new Error('Product not found'), { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return NextResponse.error(new Error('Failed to fetch product'))
  }
}

export const PUT = async (request, { params }) => {
  try {
    const data = await request.json()
    const { name, price, description, image, productId } = data
    const id = parseInt(params.id)
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
        image,
        status: true,
        productId
      }
    })
    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.error(new Error('Failed to update product'))
  }
}

export const DELETE = async (request, { params }) => {
  try {
    const id = parseInt(params.id)
    const deletedProduct = await prisma.product.delete({
      where: { id }
    })
    return NextResponse.json({ message: 'product deleted successfully' })
  } catch (error) {
    return NextResponse.error(new Error('Failed to delete product'))
  }
}
