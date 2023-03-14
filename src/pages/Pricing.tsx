import PricingDevice from '../components/Pricing/PricingDevice';
import PricingList from '../components/Pricing/PricingList';
import PricingFilter from '../components/Pricing/PricingFilter';
import {
	filterDevice,
	filterBrand,
	filterName,
} from '../store/product/product-action';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllBrandsAndDevices } from '../store/devices_brands/d_b-selectors';

const Pricing = () => {
	const dispatch = useDispatch();
	const { devices, brands } = useSelector(selectAllBrandsAndDevices);

	useEffect(() => {
		dispatch(filterDevice('Devices'));
		dispatch(filterBrand('ALL'));
		dispatch(filterName(''));
	}, []);

	return (
		<div className='flex items-start mt-20'>
			<PricingDevice devices={devices} />
			<div>
				<PricingFilter brands={brands} />
				<PricingList />
			</div>
		</div>
	);
};
export default Pricing;
