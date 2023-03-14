import { useState, useEffect } from 'react';
import styles from './Blog.module.css';
import { IBlog } from '../../types/blog';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ISubscription } from '../../types/blog';
import { USER_CASE_ROUTE } from '../../utils/consts';
import { addBlogItem } from '../../store/users/users-actions';
import { blogPriceBuy } from '../../helpers/blogHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { selectPersonData } from '../../store/users/users-selectors';

interface BlogSubcsriptionProps {
	blog: IBlog;
	subscription: ISubscription;
}
const BlogSubcsription: React.FC<BlogSubcsriptionProps> = ({
	blog,
	subscription,
}) => {
	const [isModal, setIsModal] = useState({ active: false, item: '' });

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const priceMonth = (subscription.price / 12).toFixed(2);

	const personData = useSelector(selectPersonData);
	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(personData));
	}, [personData]);

	const helpFunction = () => {
		dispatch(addBlogItem(blogPriceBuy(blog, subscription)));
		setIsModal({ active: false, item: '' });
		setTimeout(() => {
			navigate(USER_CASE_ROUTE);
		}, 2000);
	};

	const blogPriceHandler = () => {
		if (subscription.title === 'Personal') {
			helpFunction();
		} else {
			setIsModal({ active: true, item: subscription.title });
		}
	};

	const blogPriceModalHandler = () => {
		helpFunction();
	};

	return (
		<>
			<div className={styles['blog-subscription']}>
				<div className={styles['blog-subscription_title']}>
					{subscription.title}
				</div>
				<div className={styles['blog-subscription_text']}>
					{subscription.text}
				</div>
				<div className={styles['blog-subscription_price']}>
					{priceMonth === '0.00' ? 'Free' : `$${priceMonth}`}{' '}
					{priceMonth !== '0.00' && (
						<span className={styles['blog-sub_month']}>per month</span>
					)}
				</div>
				<div className={styles['blog-subscription_subopport']}>
					{subscription.subopportunity}
				</div>
				<div>
					{subscription.opportunity.map((opport: string) => (
						<li className={styles['blog-opport_li']} key={`ooport_${opport}`}>
							{opport}
						</li>
					))}
				</div>
				<div className={styles['blog-foot']}>
					{subscription.price !== 0 && (
						<div className={styles['blog-billed']}>
							Billed annually for ${subscription.price}
						</div>
					)}
					<Button
						title={subscription.title === 'Personal' ? 'Start Now' : 'Buy Now'}
						className={styles['blog-btn']}
						onClickHandler={blogPriceHandler}
					/>
				</div>
			</div>
			<Modal active={isModal.active} setActive={setIsModal}>
				<div className={styles['blog-buy_item']}>
					Subscription: {subscription.title}
				</div>
				<div className={styles['blog-buy_item']}>
					Price: ${subscription.price}
				</div>
				<Button title='Buy' onClickHandler={blogPriceModalHandler} />
			</Modal>
		</>
	);
};
export default BlogSubcsription;
