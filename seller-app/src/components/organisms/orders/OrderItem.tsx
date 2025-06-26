import { Box } from '@mui/material'
import React from 'react'

export type OrderItemProps = {
    id: string,
    productName: string,
    productPrice: Number,
    quantity: Number,
    productDescription: string,
}

const OrderItem = ({id, productName, productPrice, quantity, productDescription}: OrderItemProps) => {
  return (
    <Box key={`order-item-${id}`}>
        
    </Box>
  )
}

export default OrderItem