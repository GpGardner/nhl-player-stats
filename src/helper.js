export const chooseBackgroundColor = () => {
	return `rgba(${randomNumber(200)}, ${randomNumber(200)}, ${randomNumber(200)}, 0.9)`
}

export const randomNumber = (val) => {
	return Math.floor(Math.random()* val);
}