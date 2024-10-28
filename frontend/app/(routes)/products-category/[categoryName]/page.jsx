import React from 'react'
import TopCategoryList from "@/app/(routes)/products-category/_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

const dummyCategories = [
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

const dummyProducts = [
    {
        image: 'https://images.unsplash.com/photo-1467825487722-2a7c4cd62e75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyb2Nlcmllc3xlbnwwfHwwfHx8MA%3D%3D',
        name: "Spinach",
        price: "3",
        sellingPrice: "2",
        description: "Vegetables are edible parts of plants, such as roots, leaves, stems, or flowers, that are rich in nutrients and essential for a balanced diet. They provide vitamins, minerals, and fiber while being low in calories.",
        quantityType:"100g",
        category:'Vegetable'
    },
    {
        image: 'https://images.unsplash.com/photo-1607309089576-358db307bf89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3JvY2VyaWVzfGVufDB8fDB8fHww',
        name: "Carrot",
        price: "6",
        sellingPrice: "4",
        description: "Vegetables are edible parts of plants, such as roots, leaves, stems, or flowers, that are rich in nutrients and essential for a balanced diet. They provide vitamins, minerals, and fiber while being low in calories.",
        quantityType:"500g",
        category:'Vegetable'
    },
    {
        image: 'https://images.unsplash.com/photo-1569254631271-fb470f53fa85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdyb2Nlcmllc3xlbnwwfHwwfHx8MA%3D%3D',
        name: "Banana",
        price: "4",
        sellingPrice: "2.50",
        description: "Vegetables are edible parts of plants, such as roots, leaves, stems, or flowers, that are rich in nutrients and essential for a balanced diet. They provide vitamins, minerals, and fiber while being low in calories.",
        quantityType:"6pcs",
        category:'Fruit'
    }
]
const ProductsCategory = ({params}) => {

    const filteredProducts = dummyProducts.filter((product) => product.category === params.categoryName)
    return (
        <div>
            <h2 className='p-4 bg-primary text-white font-bold text-3xl text-center'>{params.categoryName}</h2>

            <TopCategoryList categoryList={dummyCategories} selectedCategory={params.categoryName}/>

            <div className='md:p-10 p-5'>
                <ProductList productList={filteredProducts}/>
            </div>
        </div>
    )
}
export default ProductsCategory
