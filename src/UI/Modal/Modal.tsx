import { IModal } from '../../components/SellerAddProduct/SellerAddProductForm';
import styles from './Modal.module.css';

interface ModalProps {
	active: boolean;
	setActive: React.Dispatch<React.SetStateAction<IModal>>;
	children: React.ReactNode;
	className?: string;
}

const Modal: React.FC<ModalProps> = ({
	active,
	setActive,
	children,
	className,
}) => {
	let classesModal = styles.modal;
	let classesModalContent = styles['modal__content'];

	if (active) {
		classesModal = `${styles.modal} ${styles.activate}`;
		classesModalContent = `${styles['modal__content']} ${
			styles['activate_content']
		} ${className === undefined ? '' : className}`;
	}

	const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	return (
		<div
			className={classesModal}
			onClick={() => setActive({ active: false, item: '' })}
		>
			<div className={classesModalContent} onClick={clickHandler}>
				{children}
			</div>
		</div>
	);
};
export default Modal;
