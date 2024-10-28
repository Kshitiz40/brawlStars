import React from 'react'
import Image from "next/image";
import Link from "next/link";

const dummyData = [
    {
        name: "Vegetable",
        image: 'https://images.unsplash.com/photo-1467825487722-2a7c4cd62e75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyb2Nlcmllc3xlbnwwfHwwfHx8MA%3D%3D',
        attribute: "Spinach"
    },
    {
        name: "Vegetable",
        image: 'https://images.unsplash.com/photo-1607309089576-358db307bf89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3JvY2VyaWVzfGVufDB8fDB8fHww',
        attribute: "Carrot"
    },
    {
        name: "Fruit",
        image: 'https://images.unsplash.com/photo-1569254631271-fb470f53fa85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdyb2Nlcmllc3xlbnwwfHwwfHx8MA%3D%3D',
        attribute: "Banana"
    }
]

const CategoryList = () => {
    return (
        <div className='mt-5'>
            <h2 className='text-green-600 font-bold text-2xl'>Shop by Category</h2>
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2 cursor-pointer'>
                {
                    dummyData.map((category,index) => (
                        <Link href={'/products-category/'+category.name} className='flex flex-col items-center bg-green-100 gap-2 p-3 rounded-lg group hover:bg-green-200'>
                            <Image src={category.image} alt=''
                            width={50}
                                   height={50}
                                   className='group-hover:scale-125 transition-all ease-in-out'
                            />
                            <h2 className='text-green-800'>{category.attribute}</h2>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
export default CategoryList
