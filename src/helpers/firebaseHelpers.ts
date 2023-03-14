import { userFirebase } from './../firebase/user';
import {
	updateDoc,
	doc,
	deleteDoc,
	getDocs,
	collection,
} from 'firebase/firestore';
import { IBlog } from '../types/blog';
import { IProduct } from '../types/product';

export const handleBlock = async (id: string, userBlock: boolean) => {
	await updateDoc(doc(userFirebase, 'users', id), {
		block: !userBlock,
	});
};

export const handleDelete = async (id: string) => {
	await deleteDoc(doc(userFirebase, 'users', id));
};

export const handleLike = async (id: string, favoriteProducts: string[]) => {
	await updateDoc(doc(userFirebase, 'users', id), {
		f_prod: favoriteProducts,
	});
};

export const handleFinishBlog = async (id: string, finishBlog: boolean) => {
	await updateDoc(doc(userFirebase, 'blogs', id), {
		finish: finishBlog,
	});
};

export const handleAddBlogPricePerson = async (id: string, blogs: IBlog[]) => {
	console.log(id);
	await updateDoc(doc(userFirebase, 'users', id), {
		blogItem: blogs,
	});
};

export const fetchData = async (name: string) => {
	const result: any[] = [];
	await getDocs(collection(userFirebase, name)).then(querySnapshot =>
		querySnapshot.docs.map(doc => result.push({ ...doc.data(), id: doc.id }))
	);

	return result;
};
