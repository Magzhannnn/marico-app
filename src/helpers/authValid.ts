import { userFirebase } from './../firebase/user';
import { IUser } from './../types/users';
const symbolValid = (name: string, inputTitle: string) => {
	let nameSymbols: string[] = name.toLowerCase().split('');
	const cyrillicPattern = /^[\u0400-\u04FF]+$/;

	if (!nameSymbols.length) {
		if (inputTitle === 'Email Address') {
			alert(`You didn't enter anything before @ in ${inputTitle}!`);
		} else {
			alert(`You didn't enter anything in ${inputTitle}!`);
		}

		return false;
	}

	if (inputTitle === 'Password') {
		// Проверка наличия в строке букв кириллицы
		const passwordCheck = nameSymbols.filter(symbol =>
			cyrillicPattern.test(symbol)
		);

		return passwordCheck.length === 0;
	}

	for (const symbol of nameSymbols) {
		if (symbol.charCodeAt(0) < 97 || symbol.charCodeAt(0) > 122) {
			alert(`In ${inputTitle}, you can only enter Latin letters A-Z, a-z`);
			return false;
		}
	}

	return true;
};

const emailValid = (email: string) => {
	const emailTypes: string[] = [
		'email.com',
		'gmail.com',
		'yandex.ru',
		'kaznu.kz',
		'mail.ru',
	];

	if (email.includes('@')) {
		const emailArray: string[] = email.split('@');
		let checkEmailType = false;

		if (!symbolValid(emailArray[0], 'Email Address')) return false;
		if (!emailArray[1]) {
			alert("You didn't enter anything after @!!!");
			return false;
		}

		for (const emailType of emailTypes) {
			if (emailType === emailArray[1]) checkEmailType = true;
		}

		if (!checkEmailType) {
			alert('You entered the incorrect emailType!!!');
		}
		return checkEmailType;
	} else {
		alert('You entered incorrectly in Email!!!');
		return false;
	}
};

const unusualOrNumberSymbolValid = (
	charToCheck: string,
	unusualSymbol = '0123456789'
) => {
	let result = false;

	for (const char of charToCheck) {
		if (unusualSymbol.includes(char)) result = true;
	}

	// if (!result) alert('You entered incorrectly in Password unsual or number!!!');
	return result;
};

const passwordValid = (password: string): boolean => {
	if (!password) {
		alert("You didn't enter anything in Password!!!");
		return false;
	}

	const unusualSymbol = '!@#$%^&*()_+';
	const result =
		password.length >= 8 &&
		symbolValid(password, 'Password') &&
		unusualOrNumberSymbolValid(password) &&
		unusualOrNumberSymbolValid(password, unusualSymbol);

	if (!result) {
		alert(`Error!!! \nYou have an incorrect password. \nThe correct password consists of:
		  In Password, you can only enter Latin letters A-Z, a-z;
		  Password length is 8 characters;
		  Must have at least one of these characters - "!@#$%^&*()_+";
		  Must have at least one number in the range 0-9`);
	}

	return result;
};

export const authValid = (
	name: string,
	password: string,
	email = 'a@gmail.com'
): boolean => {
	if (!symbolValid(name, 'Username')) return false;
	if (!emailValid(email)) return false;
	if (!passwordValid(password)) return false;
	return true;
};

export const isThereSuch = (users: IUser[], name: string) => {
	for (const user of users) {
		if (user.name === name) {
			alert(
				'An account with this name already exists!\nPlease enter another name!!!'
			);
			return false;
		}
	}

	return true;
};

export const isLoginValid = (users: IUser[], userData: IUser) => {
	console.log(users);
	console.log(userData);
	return users.filter(
		user => user.name === userData.name && user.password === userData.password
	);
};

export const chooseRole = (): string => {
	const resultChooseNum = prompt(`1) Admin\n2) Seller\n3) User`);
	let secretKeyAdmin: string | null;

	if (typeof resultChooseNum === 'string') {
		switch (resultChooseNum) {
			case '1':
				secretKeyAdmin = prompt('Введите секретный ключ!');
				break;
			case '2':
				return 'seller';
			case '3':
				return 'user';
			default:
				return '';
		}
	} else {
		return '';
	}

	if (typeof secretKeyAdmin === 'string')
		return secretKeyAdmin === "MARICO_1998_EXPERT_PRODUCT" ? 'admin' : '';
	//если secretKeyAdmin не string а что-то другое
	return '';
};
