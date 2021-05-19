//Variables--------------------------------------------------
const libCtn = document.querySelector(".lib-list-grid");
const addButton = document.querySelector(".addbtn");
const confirmButton = document.querySelector(".confirmBtn");
const exitForm = document.querySelector(".exit-form");
const inputForm = document.querySelector(".add-book-form");
const inputFstatus = document.getElementById("form-switch");
const noBooks = document.getElementById("no-books");
const clearInputBtn = document.querySelector(".clearBtn");
const inputFnread = document.querySelector(".input-tog");
const inputFnrText = document.querySelector(".status-nr");
const inputFrText = document.querySelector(".status-r");
const bookCount = document.getElementById("tot-count");
const readCount = document.getElementById("read-count");
const nreadCount = document.getElementById("nread-count");
const pageCount = document.getElementById("page-frac");
const invalidTitle = document.querySelector(".invalid-form-title");
const invalidAuthor = document.querySelector(".invalid-form-auth");
const invalidPages = document.querySelector(".invalid-form-page");
const invalidDate = document.querySelector(".invalid-form-date");
const startPop = document.querySelector(".start-pop");
const libName = document.querySelector(".name-title");
const libTitle = document.querySelector(".logo-title");
startPop.style.display = "flex";
//Book class and functions-----------------------------------

//MOST FUNCTIONS WORKING WELL TOMORROW DDINGLOCAL/CLOUD
//STORAGE AND THEN DONE!!!!! ALSO ADDING "" LIBRARY PLUS A LOGO

class Book {
	//constructor
	constructor(
		title = "unknown",
		author = "unknown",
		numPages = 0,
		date = "mm, dd, yyyy",
		read = "false",
		displayed = "false"
	) {
		this.title = title;
		this.author = author;
		this.numPages = numPages;
		this.date = date;
		this.read = read;
		this.displayed = displayed;
	}
}

let userMap = new Map();

//Book array
let myLibrary = [];

//add a book object to my library
function addBookToLibrary(newBook) {
	if (
		myLibrary.some((book) => book.title === newBook.title) ||
		newBook.title === ""
	) {
		invalidTitle.style.display = "flex";
	} else {
		invalidTitle.style.display = "none";
	}
	if (newBook.author === "") {
		invalidAuthor.style.display = "flex";
	} else {
		invalidAuthor.style.display = "none";
	}
	if (newBook.numPages !== newBook.numPages) {
		invalidPages.style.display = "flex";
	} else {
		invalidPages.style.display = "none";
	}
	if (Date.parse(newBook.date) !== Date.parse(newBook.date)) {
		invalidDate.style.display = "flex";
	} else {
		invalidDate.style.display = "none";
	}
	if (
		invalidDate.style.display === "flex" ||
		invalidAuthor.style.display === "flex" ||
		invalidPages.style.display === "flex" ||
		invalidTitle.style.display === "flex"
	) {
		return false;
	} else {
		myLibrary.push(newBook);
		saveLocal();
		return true;
	}
}

function appendFromArray() {
	for (const c of myLibrary) {
		if (c.displayed === "false") {
			createBook(c.title, c.author, c.numPages, c.date, c.read);
			c.displayed = "true";
		}
	}
	if (myLibrary.length > 0) {
		inputForm.style.display = "none";
		noBooks.style.display = "none";
	}
	saveLocal();
}

//removes book from the array of books
function removeBookfromLib(bookTitle) {
	myLibrary = myLibrary.filter((book) => book.title !== bookTitle);
	saveLocal();
}

function addNewBookfromForm() {
	const title = document.getElementById("book-title").value.toLowerCase();
	const author = document.getElementById("book-auth").value.toLowerCase();
	const numPages = parseInt(document.getElementById("book-num").value);
	const date = document.getElementById("book-pub").value;
	const read = document.getElementById("tog-val").checked;
	return new Book(title, author, numPages, date, read);
}

function setNameandRemovePop() {
	if (libName.value !== "") {
		if (JSON.parse(localStorage.getItem(libName.value)) !== null) {
			userMap = objToStrMap(JSON.parse(localStorage.getItem(libName.value)));
			if (userMap.get(libName.value)) {
				libTitle.innerText = libName.value + `'s` + " Library";
				myLibrary = userMap.get(libName.value);
				if (myLibrary.length !== 0) {
				}
				for (let temp of myLibrary) {
					temp.displayed = "false";
				}
			}
		} else {
			libTitle.innerText = libName.value + `'s` + " Library";
			userMap.set(libName.value, myLibrary);
		}
		localStorage.setItem(libName.value, JSON.stringify(strMapToObj(userMap)));
		appendFromArray();

		// myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
		// if (myLibrary === null) {
		// 	myLibrary = [];
		// } else {
		// 	for (let temp of myLibrary) {
		// 		temp.displayed = "false";
		// 	}
		// }
		// appendFromArray();
	} else {
		libTitle.value.innerText = "Library";
	}
	saveLocal();
	startPop.style.display = "none";
}

function createBook(title, author, numPages, date, read) {
	const bookDiv = document.createElement("div");
	bookDiv.classList.add("bookCtn");
	libCtn.appendChild(bookDiv);
	const authorDiv = document.createElement("div");
	const titleDiv = document.createElement("div");
	const pagesDiv = document.createElement("div");
	const readDiv = document.createElement("div");
	const exitDiv = document.createElement("div");
	const dateDiv = document.createElement("div");

	const deleteBookbtn = document.createElement("button");

	const authorPreText = document.createElement("text");
	const pagesPreText = document.createElement("text");
	const datePreText = document.createElement("text");
	const titleText = document.createElement("text");
	const authorText = document.createElement("text");
	const pagesText = document.createElement("text");
	const dateText = document.createElement("text");
	const readText = document.createElement("text");
	const readToggle = document.createElement("input");
	const readTogLabel = document.createElement("label");
	const readTogSpan = document.createElement("span");
	const nR = document.createElement("text");
	const yR = document.createElement("text");
	const readTogCtn = document.createElement("div");
	readTogLabel.appendChild(readToggle);
	readTogLabel.appendChild(readTogSpan);
	readDiv.appendChild(nR);
	readDiv.appendChild(readTogLabel);
	readDiv.appendChild(yR);
	nR.classList.add("status-n2");
	nR.innerText = "Not Read";
	yR.classList.add("status-r2");
	yR.innerText = "Read";
	readDiv.classList.add("read-toggle");
	readTogSpan.classList.add("slider2");
	readTogSpan.classList.add("round2");
	readToggle.classList.add("input-tog2");
	readToggle.type = "checkbox";
	readTogLabel.id = "form-switch2";

	const readDivTog = document.createElement("div");
	readDivTog.appendChild(readDiv);
	readDivTog.classList.add("read-toggle-ctn");

	bookDiv.appendChild(exitDiv);
	bookDiv.appendChild(titleDiv);
	bookDiv.appendChild(authorDiv);
	bookDiv.appendChild(pagesDiv);
	bookDiv.appendChild(dateDiv);
	bookDiv.appendChild(readDivTog);

	titleDiv.appendChild(titleText);
	titleDiv.classList.add("book-inLib-title");
	authorDiv.appendChild(authorPreText);
	authorDiv.appendChild(authorText);
	authorDiv.classList.add("book-inLib-auth");
	pagesDiv.appendChild(pagesPreText);
	pagesDiv.appendChild(pagesText);
	pagesDiv.classList.add("book-inLib-pages");
	dateDiv.appendChild(datePreText);
	dateDiv.appendChild(dateText);
	dateDiv.classList.add("book-inLib-date");
	exitDiv.appendChild(deleteBookbtn);
	exitDiv.classList.add("exitDiv");
	deleteBookbtn.classList.add("deletebookbtn");

	//titleText.innerText = displayLibBook.title;
	titleText.innerText = title;
	titleText.style.textTransform = "capitalize";
	authorPreText.innerText = "Author: ";
	//authorText.innerText = displayLibBook.author;
	authorText.innerText = author;
	authorText.style.textTransform = "capitalize";
	pagesPreText.innerText = "Pages: ";
	pagesText.innerText = numPages;
	datePreText.innerText = "Published: ";
	dateText.innerText = date;
	deleteBookbtn.innerHTML = '<i class="fas fa-times-circle"></i>';
	titleText.classList.add("title-inCtn");
	authorText.classList.add("auth-inCtn");
	pagesText.classList.add("pages-inCtn");
	dateText.classList.add("date-inCtn");
	readToggle.checked = read;
	if (readToggle.checked === true) {
		yR.style.opacity = "100%";
		nR.style.opacity = "50%";
		bookDiv.style.background =
			"linear-gradient(rgb(255,235,205) 70%, rgb(188, 228, 172))";
	} else {
		yR.style.opacity = "50%";
		nR.style.opacity = "100%";
		bookDiv.style.background =
			"linear-gradient(rgb(255,235,205) 70%, rgb(228, 150, 150))";
	}
	bookDiv.id = titleText.innerText;
}

function resetForm() {
	document.getElementById("book-title").value = "";
	document.getElementById("book-auth").value = "";
	document.getElementById("book-num").value = "";
	document.getElementById("book-pub").value = "";
	document.getElementById("tog-val").checked = false;
	invalidDate.style.display = "none";
	invalidAuthor.style.display = "none";
	invalidPages.style.display = "none";
	invalidTitle.style.display = "none";
}

function deleteBookFromLib(event) {
	if (
		myLibrary.length != 0 &&
		event.target.parentNode.classList.contains("deletebookbtn")
	) {
		removeBookfromLib(
			event.target.parentNode.parentNode.parentNode.id.toLowerCase()
		);
		event.target.parentNode.parentNode.parentNode.remove();
		if (myLibrary.length === 0) {
			noBooks.style.display = "flex";
		}
	} else if (event.target.classList.contains("input-tog2")) {
		if (event.target.checked === false) {
			event.target.parentNode.parentNode.firstChild.style.opacity = "100%";
			for (let readText of event.target.parentNode.parentNode.children) {
				if (readText.classList.contains("status-r2")) {
					readText.style.opacity = "50%";
				}
			}
			event.target.parentNode.parentNode.parentNode.parentNode.style.background =
				"linear-gradient(rgb(255,235,205) 70%, rgb(228, 150, 150))";
		} else {
			event.target.parentNode.parentNode.firstChild.style.opacity = "50%";
			for (let readText of event.target.parentNode.parentNode.children) {
				if (readText.classList.contains("status-r2")) {
					readText.style.opacity = "100%";
				}
			}
			event.target.parentNode.parentNode.parentNode.parentNode.style.background =
				"linear-gradient(rgb(255,235,205) 70%, rgb(188, 228, 172))";
		}
		findBook(
			event.target.parentNode.parentNode.parentNode.parentNode.id.toLowerCase()
		).read = event.target.checked;
	}
	updateStatus();
	saveLocal();
}

function findBook(bookName) {
	for (let book of myLibrary) {
		if (book.title === bookName) {
			return book;
		}
	}
	return null;
}

function updateStatus() {
	let numRead = 0;
	let totPages = 0;
	let totbooks = 0;
	for (let book of myLibrary) {
		if (book.read === true) {
			numRead++;
		}
		totbooks = totbooks + 1;
		totPages = totPages + parseInt(book.numPages);
	}
	bookCount.innerText = totbooks;
	readCount.innerText = numRead;
	nreadCount.innerText = totbooks - numRead;
	pageCount.innerText = totPages;
}

//eventListeners---------------------------------------------

addButton.addEventListener("click", function () {
	resetForm();
	inputForm.style.display = "flex";
});

exitForm.addEventListener("click", function () {
	inputForm.style.display = "none";
});

clearInputBtn.addEventListener("click", function () {
	resetForm();
});

libCtn.addEventListener("click", function (event) {
	if (myLibrary.length !== 0) {
		event.target.addEventListener("click", deleteBookFromLib(event));
	}
});

inputFnread.addEventListener("click", function () {
	var inputFread = document.querySelector(".input-tog:checked");
	if (inputFread === null) {
		inputFnrText.style.opacity = "100%";
		inputFrText.style.opacity = "50%";
	} else {
		inputFnrText.style.opacity = "50%";
		inputFrText.style.opacity = "100%";
	}
});

window.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && inputForm.style.display === "flex") {
		inputForm.style.display = "none";
	}

	if (e.key === "Enter" && inputForm.style.display === "flex") {
		let confirmed = addNewBookfromForm();
		if (addBookToLibrary(confirmed)) {
			appendFromArray();
			inputForm.style.display = "none";
			noBooks.style.display = "none";
			updateStatus();
		} else {
			alert("Input Invalid!");
		}
	}
	if (e.key === "Enter" && startPop.style.display === "flex") {
		setNameandRemovePop();
	}
});

confirmButton.addEventListener("click", function (e) {
	let confirmed = addNewBookfromForm();
	if (addBookToLibrary(confirmed)) {
		appendFromArray();
		updateStatus();
	} else {
		alert("Input Invalid!");
	}
});

function saveLocal() {
	userMap.set(libName.value, myLibrary);
	localStorage.setItem(libName.value, JSON.stringify(strMapToObj(userMap)));

	localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// function restoreLocal(inputName) {
// 	let tempMap = JSON.parse(localStorage.getItem("User"));
// 	if (tempMap.get(inputName)) {
// 		let templibTitle = document.querySelector(".logo-title");
// 		templibTitle.innerText = inputName + `'s` + " Library";
// 		myLibrary = tempMap.get(inputName);
// 		if (myLibrary.length !== 0) {
// 		}
// 			for (let temp of myLibrary) {
// 				temp.displayed = "false";
// 		}
// 	}

// 	else {
// 		myLibrary = [];
// 	}

// 	appendFromArray();

// 	// myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
// 	// if (myLibrary === null) {
// 	// 	myLibrary = [];
// 	// } else {
// 	// 	for (let temp of myLibrary) {
// 	// 		temp.displayed = "false";
// 	// 	}
// 	// }
// 	// appendFromArray();
// }

function strMapToObj(strMap) {
	let obj = Object.create(null);
	for (let [k, v] of strMap) {
		// We don’t escape the key '__proto__'
		// which can cause problems on older engines
		obj[k] = v;
	}
	return obj;
}
function objToStrMap(obj) {
	let strMap = new Map();
	for (let k of Object.keys(obj)) {
		strMap.set(k, obj[k]);
	}
	return strMap;
}
