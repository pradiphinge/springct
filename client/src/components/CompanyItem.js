import React from 'react'

const CompanyItem = ({ company }) => {
    const { name,city } = company
    return (

        <div className='alert alert-secondary '>
            {name}
            <span className='float-right'>{city}</span>
        </div>
    )
}

export default CompanyItem
