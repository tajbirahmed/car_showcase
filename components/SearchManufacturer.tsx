"use client"; 
import React, { useState, Fragment } from 'react'
import { SearchManufacturerProps } from '@/types'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image';
import { manufacturers } from '@/contents';


const SearchManufacturer = ({manufacturer, setManufacturer} : SearchManufacturerProps) => {
  const [query, setQuery] = useState('');

  const filteredManufacturers = 
    query === ""  
    ? manufacturers 
    : manufacturers.filter((item) => (
      item.toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.toLowerCase().replace(/\s+/g, ""))
    ))
  return (
    <div className='search-manufacturer'>
      <Combobox value={ manufacturer } onChange={setManufacturer}>
        <div className='relative w-full'>
          <Combobox.Button className='absolute top-[14px]'>
            <Image src="/car-logo.svg" alt="car logo" width={20} height={20} className='ml-4'/>
          </Combobox.Button>
          <Combobox.Input 
            className='search-manufacturer__input' 
            placeholder='Volkswagen' 
            displayValue={(manufacturer : string) => manufacturer}  
            onChange={(e) => setQuery(e.target.value)}
          />
          <Transition 
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={()=>setQuery('')}
          >
            <Combobox.Options>
              {filteredManufacturers.length === 0 && query !== "" ? (
                <></>) : query === "" ? <></> : (
                  filteredManufacturers.map((items) => (
                    <Combobox.Option
                      key={items}
                      className={({active}) => `
                        relative search-manufacturer__option ${active ? 'bg-primary-blue text-white' : 'text-gray'}
                      `}
                      value={items}
                    >
                      {({selected, active}) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                              }`}
                          >
                            { items }
                          </span>
                          
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )
              }
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SearchManufacturer