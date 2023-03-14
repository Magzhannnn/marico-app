import styles from './Button.module.css';

interface ButtonProps {
	className?: string;
	title: string;
	onClickHandler?: (e: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
	className,
	title,
	onClickHandler,
}) => {
	let classes = styles.button;
	if (className) classes = `${classes} ${className}`;

	return (
		<div className={classes} onClick={onClickHandler}>
			{title}
		</div>
	);
};
export default Button;
