import { useEffect, useState } from 'react';
import Container from '../UI/Container/Container';
import BlogItem from '../components/Blog/BlogItem';
import UserCaseList from '../components/UserCase/UserCaseList';
import { useLocation } from 'react-router-dom';
import { selectBlogPerson } from '../store/users/users-selectors';
import { useSelector } from 'react-redux';
import { uniqueUnionBlogData } from '../helpers/blogHelpers';

const UserCase = () => {
	const personBlogItem = useSelector(selectBlogPerson);
	const [person, setPerson] = useState(
		JSON.parse(localStorage.getItem('user') as string)
	);
	const location = useLocation();

	useEffect(() => {
		setPerson(JSON.parse(localStorage.getItem('user') as string));
	}, [location]);

	return (
		<>
			<div className='mt-16'></div>
			<UserCaseList
				blogs={uniqueUnionBlogData(personBlogItem, person.blogItem)}
			/>
		</>
	);
};
export default UserCase;
