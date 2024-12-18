"use client"

import React, {useState} from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";
import {useRouter} from "next/navigation";

const ProductItemDetail = ({product}) => {
    const router = useRouter();

    const dummyJwt = 'ayush';

    const [productTotalPrice, setProductTotalPrice] = useState(
        product.sellingPrice?
            product.sellingPrice:
            product.price
    )

    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        if(!dummyJwt){
            router.push('/sign-in');
            return;
        }
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
            <Image src={product.image} alt='' width={300} height={300}
            className='bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg'/>

            <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-bold'>{product.name}</h2>
                <h2 className='text-sm text-gray-500'>{product.description}</h2>
                <div className='flex gap-3'>

                    {
                        product.sellingPrice &&
                        <h2 className='font-bold text-3xl'>${product.sellingPrice}</h2>
                    }
                    <h2 className={`font-bold text-3xl ${product.sellingPrice && 'line-through text-gray-500'}`}>${product.price}</h2>
                </div>
                <h2 className='font-medium text-lg'>Quantity ({product.quantityType})</h2>

                <div className='flex flex-col items-baseline gap-3'>
                    <div className='flex gap-3 items-center'>
                        <div className='p-2 border flex gap-10 items-center px-5'>
                            <button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                            <h2>{quantity}</h2>
                            <button onClick={() =>setQuantity(quantity + 1)}>+</button>
                        </div>
                        <h2 className='text-2xl font-bold'> = ${(quantity*productTotalPrice).toFixed(2)}</h2>
                    </div>
                    <Button className='flex gap-3 mt-3' onClick={() => addToCart()}>
                        <ShoppingCart/>
                        Add to Cart
                    </Button>
                </div>

                <h2><span className='font-bold'>Category: </span>{product.category}</h2>
            </div>
        </div>
    )
}
export default ProductItemDetail
