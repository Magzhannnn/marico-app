import Container from '../UI/Container/Container';
import AuthViewForm from '../components/AdminView/AdminViewForm';
import AuthViewList from '../components/AdminView/AdminViewList';

const AdminView = () => {
	return (
		<Container>
			<AuthViewForm />
			<AuthViewList />
		</Container>
	);
};
export default AdminView;
