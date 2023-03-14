import styles from './Pricing.module.css';
import { IDevice } from '../../types/product';
import { useDispatch, useSelector } from 'react-redux';
import { filterDevice } from '../../store/product/product-action';
import { selectDevice } from '../../store/product/product-selectors';

interface PricingDeviceProps {
	devices: IDevice[];
}

const PricingDevice: React.FC<PricingDeviceProps> = ({ devices }) => {
	const dispatch = useDispatch();
	const deviceName = useSelector(selectDevice);

	return (
		<div className={styles.devices}>
			<h1
				className={styles['devices-title']}
				onClick={() => dispatch(filterDevice('Devices'))}
			>
				Devices
			</h1>
			{devices
				.sort((x, y) => x.nameD.localeCompare(y.nameD))
				.map(device => (
					<li
						key={device.deviceId}
						className={
							deviceName === device.nameD
								? `${styles['device-name']} ${styles.underline_dev}`
								: styles['device-name']
						}
						onClick={() => dispatch(filterDevice(device.nameD))}
					>
						{device.nameD}
					</li>
				))}
		</div>
	);
};
export default PricingDevice;
