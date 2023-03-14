import {
	IBrandAndDevice,
	DeviceOrBrandAction,
	DeviceOrBrandTypeActions,
} from '../../types/product';

const initialState: IBrandAndDevice = {
	brands: [],
	devices: [],
};

export const devBrandReducer = (
	state = initialState,
	action: DeviceOrBrandAction
): IBrandAndDevice => {
	switch (action.type) {
		case DeviceOrBrandTypeActions.FETCH_DEVICE:
			return { ...state, devices: action.payload };
		case DeviceOrBrandTypeActions.FETCH_BRAND:
			return { ...state, brands: action.payload };
		default:
			return state;
	}
};
