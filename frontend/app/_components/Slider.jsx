import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

const dummyData = [
    '/slider1.jpg',
    'https://images.unsplash.com/photo-1607309089576-358db307bf89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3JvY2VyaWVzfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1569254631271-fb470f53fa85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdyb2Nlcmllc3xlbnwwfHwwfHx8MA%3D%3D'
]

const Slider = () => {
    return (
        <Carousel>
            <CarouselContent>
                {
                    dummyData.map((slider,index) => (
                        <CarouselItem key={index}>
                            <Image src={slider} alt='Image'
                            width={1000} height={400}
                                   className='w-full h-[200px] md:h-[400px] rounded-2xl'
                            />
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    )
}
export default Slider
