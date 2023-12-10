import CarCard from '@/components/CarCard'
import CustomFilter from '@/components/CustomFilter'
import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'
import ShowMore from '@/components/ShowMore'
import { fuels, yearsOfProduction } from '@/contents'
import { FilterProps } from '@/types'
import { fetchCars } from '@/utils'
import Image from 'next/image'


export default async function Home({ searchParams }: {searchParams : FilterProps}) {
  const allCars = await fetchCars({
    manufacturer : searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });
  const isEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  
  return (
    <main className="overflow-hidden">
      <Hero /> 
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filter-container'>
          <SearchBar />
          <div className='home__filters'>
            <CustomFilter title="fuel" options={ fuels } />
            <CustomFilter title="year" options={ yearsOfProduction } />
          </div>
        </div>
        {!isEmpty
          ? (
            <section>
              <div className='home__cars-wrapper'>
                {allCars?.map((car) => (
                  <CarCard
                    car={ car }
                  />
                ))}
              </div>
              <ShowMore
                pageNumber={(searchParams.limit || 10) / 10}
                isNext={ (searchParams.limit || 10) > allCars.length}
              />
            </section>
          )
          : (
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>Oops, no result</h2>
              <p>{ allCars?.messege }</p>
            </div>
          ) 
        }
        
      </div>
    </main>
  )
}
