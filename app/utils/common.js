
export function  createOrderNo(){
		let now = new Date();
		let year = now.getFullYear();
		let month = now.getMonth() + 1;
		let day = now.getDate();
		month = month < 10 ? "0" + month : month;
		day = day < 10 ? "0" + day : day;
		
		let hours = now.getHours();
		let minutes = now.getMinutes();
		let seconds = now.getSeconds();
		let ms = now.getMilliseconds()();
		hours = hours < 10 ? "0" + hours : hours;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		return `${year}${month}${day}${hours}${minutes}${seconds}${ms}`
}