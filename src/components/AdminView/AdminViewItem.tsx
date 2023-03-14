import { useEffect } from 'react';
import styles from './AdminView.module.css';
import { handleBlock, handleDelete } from '../../helpers/firebaseHelpers';

interface AdminViewItemProps {
	index: number | string;
	id?: string;
	role: string;
	name: string;
	email: string;
	password: string;
	block: boolean | string;
	remove?: string;
}

const AdminViewItem: React.FC<AdminViewItemProps> = ({
	index,
	remove,
	id,
	role,
	name,
	email,
	password,
	block,
}) => {
	const classesAll =
		index === '№'
			? `${styles['admin-view_item']} ${styles['underline']}`
			: styles['admin-view_item'];

	const deleteHandler = () => {
		handleDelete(id as string);
	};

	const blockHandler = () => {
		handleBlock(id as string, block as boolean);
	};

	return (
		<div className={classesAll}>
			<div className={styles['item_index']}>{index}</div>
			<div className={styles['item_name']}>{name}</div>
			<div className={styles['item_email']}>{email}</div>
			<div className={styles['item_password']}>{password}</div>
			<div className={styles['item_role']}>{role}</div>
			{block === 'Block' ? (
				<div className={styles['item_blocked']}>{block}</div>
			) : (
				<div
					className={`${styles['item_block']} ${styles['item_hover']}`}
					onClick={blockHandler}
				>
					{block ? '+' : '-'}
				</div>
			)}
			{remove === 'Delete' ? (
				<div className={styles['item_removed']}>{remove}</div>
			) : (
				<div
					className={`${styles['item_remove']} ${styles['item_hover']}`}
					onClick={deleteHandler}
				>
					x
				</div>
			)}
		</div>
	);
};
export default AdminViewItem;
