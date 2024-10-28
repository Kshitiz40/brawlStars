import React from 'react'
import Link from "next/link";
import Image from "next/image";

const TopCategoryList = ({categoryList,selectedCategory}) => {
    return (
        <div className='flex gap-5 mt-2 cursor-pointer'>
            {
                categoryList.map((category, index) => (
                    <Link href={'/products-category/' + category.name}
                          className={`flex flex-col items-center bg-green-100 gap-2 p-3 rounded-lg group hover:bg-green-600
                          w-[150px] min-w-[100px] overflow-auto mx-7 md:mx-20
                          ${selectedCategory===category.name&&'bg-green-600 text-white'}`}>
                        <Image src={category.image} alt=''
                               width={50}
                               height={50}
                               className='group-hover:scale-125 transition-all ease-in-out'
                        />
                        <h2 className={`text-green-800 group-hover:text-white
                        ${selectedCategory===category.name&& 'text-white'}`}>{category.attribute}</h2>
                    </Link>
                ))
            }
        </div>
    )
}
export default TopCategoryList
