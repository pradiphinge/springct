import React from 'react'

const UserItem = ({ user}) => {
    const { name, email, phone } = user; 
    return (
        <div className='alert alert-secondary'>
            {name}
        </div>
    )
}

export default UserItem
