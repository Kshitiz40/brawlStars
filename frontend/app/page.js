import Image from "next/image";
import {Button} from "@/components/ui/button";
import Slider from "@/app/_components/Slider";
import CategoryList from "@/app/_components/CategoryList";
import ProductList from "@/app/_components/ProductList";
import Footer from "@/app/_components/Footer";

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

export default function Home() {
  return (
      <div>
          {/*<div className='bg-green-400 bg-transparent px-14 py-2'>*/}
          {/*    /!*Slider*!/*/}
          {/*    <Slider/>*/}
          {/*</div>*/}
          <div className='p-7 px-14'>

              {/*Slider*/}
              <Slider/>

              {/*Category List*/}
              <CategoryList/>

              {/* Product List */}
              <ProductList productList={dummyProducts}/>

              {/*Banner*/}
              <Image src='/footer1.jpg' alt='' width={1000} height={300}
                     className='w-full h-[400px] mt-4 rounded-2xl'/>
              {/*Footer*/}
              <Footer/>
          </div>
      </div>
  );
}
