/** @format */

import React from 'react';

const UserItem = ({ user }) => {
	const { name, email, phone, assignedCompanies } = user;
	return (
		<div className='alert alert-secondary flex-column'>
			<div>
				{name} {email}
			</div>
			<div>
				{phone} {assignedCompanies}
			</div>
		</div>
	);
};

export default UserItem;
