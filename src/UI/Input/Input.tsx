import styles from './Input.module.css';

interface InputProps {
	type: string;
	title: string;
	value: string;
	className?: string;
	onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
	type,
	title,
	value,
	className,
	onChangeHandler,
}) => {
	let classes = styles.auth_input;
	if (className) classes = `${styles.auth_input} ${className}`;

	return (
		<input
			className={classes}
			type={type}
			placeholder={title}
			value={value}
			onChange={onChangeHandler}
		/>
	);
};
export default Input;
