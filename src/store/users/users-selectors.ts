import { RootState } from './../rootReducer';

export const selectAllInfoOfUsers = (state: RootState) => state.users;

export const selectAllUsers = (state: RootState) => state.users.user;

export const selectPersonData = (state: RootState) => state.users.person_data;

export const selectPersonRole = (state: RootState) =>
	state.users.person_data.role;

export const selectFavoriteproductPerson = (state: RootState) =>
	state.users.person_data.f_prod;

export const selectShopCardPerson = (state: RootState) =>
	state.users.person_data.shop_card;

export const selectTotalShopCard = (state: RootState) => {
	return state.users.person_data.shop_card.reduce(
		(sum, currentValue) =>
			sum + Number(currentValue.price) * Number(currentValue.count),
		0
	);
};

export const selectBlogPerson = (state: RootState) =>
	state.users.person_data.blogItem;

export const selectFindUsers = (state: RootState, userId: string) => {
	const findName = state.users.name;
	const findRole = state.users.role.toLowerCase();

	if (!findName) {
		if (findRole === 'all')
			// empty findName
			return state.users.user.filter(user => user.userId !== userId);

		//findRole value other than 'All'
		return state.users.user.filter(
			user => user.userId !== userId && user.role === findRole
		);
	} else {
		// The value of findRole is 'All'
		if (findRole === 'all')
			return state.users.user.filter(
				user => user.userId !== userId && user.name.includes(findName)
			);
	}

	// findName is not empty, findRole value other than 'All'
	return state.users.user.filter(
		user =>
			user.name.includes(findName) &&
			user.role === findRole &&
			user.userId !== userId
	);
};
