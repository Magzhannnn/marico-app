import { IProduct } from '../../types/product';
import SellProductItem from './SellProductItem';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper';

interface SellProductProps {
	shoppingProducts: IProduct[];
}

const SellProduct: React.FC<SellProductProps> = ({ shoppingProducts }) => {
	const slideArray = [];
	for (let i = 0; i < 10; i++) {
		slideArray.push(`Slide ${i}`);
	}

	return (
		<Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
			{shoppingProducts.map(shop_prod => (
				<SwiperSlide key={`product_${shop_prod.productId}`}>
					<SellProductItem
						product={shop_prod}
						key={`product_${shop_prod.productId}`}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};
export default SellProduct;
