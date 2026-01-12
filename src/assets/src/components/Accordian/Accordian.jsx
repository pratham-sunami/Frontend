/* eslint-disable no-unused-vars */
import React, { useState} from 'react'
import './Accordian.css'
import data from './Data.json'

const Accordian = () => {

    const [value,setValue] = useState(data.faqs)
    const [openAccordian,setOpenAccordian] = useState(null);

    const handleOpenAccordian = (index) => {
        if(openAccordian === index) setOpenAccordian(null);
        else setOpenAccordian(index);
    }

  return (
    <div className='container'>
      {
        value.map((accordian,index) => {
            return(
                <div key={index} className='accordian'>
                    {accordian.question}
                <span onClick={() => {
                    handleOpenAccordian(index)
                }} className='span'>+</span>
                {
                    openAccordian === index ? (
                        <div>
                            {accordian.answer}
                        </div>
                    ) : " "
                }
                </div>
                
            )
        })
      }
    </div>
  )
}

export default Accordian
