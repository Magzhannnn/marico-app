import styles from './Container.module.css';

interface ContainerProps {
	className?: string;
	children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ className, children }) => {
	let classes = styles.container;
	if (className) classes = `${styles.container} ${className}`;

	return <div className={classes}>{children}</div>;
};
export default Container;
