import Image from 'next/image'
import aboutImg from "../../../public/assets/images/about/1.jpg"


const page = () => {
  return (
    <div>
        <section className='w-[90%] mx-auto flex flex-col gap-6 md:flex-row md:items-center md:gap-4'>
        <Image src={aboutImg} alt='About Image' />
        <aside className='w-full flex flex-col gap-4'>
            <h1 className='text-2xl md:text-3xl'>About Us</h1>
            <p>For those that rather the full immersion of the in store experience we welcome your company and look forward to meeting you face to face. Being located in the 47 street diamond district, known to be the largest diamond.</p>
            <p>Based in the heart of New York’s Diamond District, also known as the NYC diamond district, I. D. Jewelry has some of the most competitively priced in the market. It is our goal to supply our clients.</p>
        </aside>

        </section>
    </div>
  )
}

export default page