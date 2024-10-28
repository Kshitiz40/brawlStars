import React from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProductItemDetail from "@/app/_components/ProductItemDetail";

const ProductItem = ({product}) => {
    return (
        <div className='p-2 md:p-6 flex flex-col items-center justify-center
        gap-3 border rounded-lg hover:scale-105 cursor-pointer hover:shadow-lg transition-all ease-in-out'>
            <Image src={product.image} alt='' width={500} height={200}
                   className='h-[200px] w-[200px] object-contain'/>

            <h2 className='font-bold text-lg'>{product.name}</h2>

            <div className='flex gap-3'>

                {
                    product.sellingPrice &&
                    <h2 className='font-bold text-lg'>${product.sellingPrice}</h2>
                }
                <h2 className={`font-bold text-lg ${product.sellingPrice && 'line-through text-gray-500'}`}>${product.price}</h2>
            </div>


            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='outlined'
                            className='text-primary hover:text-white hover:bg-primary'>Add to Cart
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>

                        <DialogDescription>
                            <ProductItemDetail product={product}/>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}
export default ProductItem
