import {} from '../../types/product';
import { IDevice, IBrand, DeviceOrBrandTypeActions } from '../../types/product';

export const fetchDevice = (devices: IDevice[]) => ({
	type: DeviceOrBrandTypeActions.FETCH_DEVICE,
	payload: devices,
});

export const fetchBrand = (brands: IBrand[]) => ({
	type: DeviceOrBrandTypeActions.FETCH_BRAND,
	payload: brands,
});
