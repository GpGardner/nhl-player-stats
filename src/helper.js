export const chooseBackgroundColor = () => {
	return `rgba(${randomNumber(200)}, ${randomNumber(200)}, ${randomNumber(200)}, 0.7)`
}

export const randomNumber = (val) => {
	return Math.floor(Math.random()* val);
}

export const capitalize = (val) => {
	let word = val.toString();
	return word[0].toUpperCase() + word.substring(1);	
}