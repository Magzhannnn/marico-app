import Container from '../UI/Container/Container';
import AboutBody from '../components/About/AboutBody';
import AboutFooter from '../components/About/AboutFooter';
import AboutHeader from '../components/About/AboutHeader';

// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectAllUsers } from '../store/users/users-selectors';

const About = () => {
	return (
		<Container>
			<AboutHeader />
			<AboutBody />
			<AboutFooter />
		</Container>
	);
};
export default About;
