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

//Book class and functions-----------------------------------

class Book {
	//constructor
	constructor(
		title = "unknown",
		author = "unknown",
		numPages = "0",
		date = "mm, dd, yyyy",
		read = "false"
	) {
		this.title = title;
		this.author = author;
		this.numPages = numPages;
		this.date = date;
		this.read = read;
	}
}

//Book array
let myLibrary = [];

//add a book object to my library
function addBookToLibrary(newBook) {
	if (myLibrary.some((book) => book.title === newBook.title)) return false;
	myLibrary.push(newBook);
	return true;
}

//removes book from the array of books
function removeBookfromLib(bookTitle) {
	myLibrary = myLibrary.filter((book) => book.title !== bookTitle);
}

function addNewBookfromForm() {
	const title = document.getElementById("book-title").value;
	const author = document.getElementById("book-auth").value;
	const numPages = document.getElementById("book-num").value;
	const date = document.getElementById("book-pub").value;
	const read = document.getElementById("tog-val").checked;
	return new Book(title, author, numPages, date, read);
}

function createBook(event) {
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

	titleText.innerText = document.getElementById("book-title").value;
	authorPreText.innerText = "Author: ";
	authorText.innerText = document.getElementById("book-auth").value;
	pagesPreText.innerText = "Pages: ";
	pagesText.innerText = document.getElementById("book-num").value;
	datePreText.innerText = "Published: ";
	dateText.innerText = document.getElementById("book-pub").value;
	deleteBookbtn.innerHTML = '<i class="fas fa-times-circle"></i>';
	inputForm.style.display = "none";
	noBooks.style.display = "none";
	titleText.classList.add("title-inCtn");
	authorText.classList.add("auth-inCtn");
	pagesText.classList.add("pages-inCtn");
	dateText.classList.add("date-inCtn");
	readToggle.checked = document.querySelector(".input-tog").checked;
	if (readToggle.checked === true) {
		yR.style.opacity = "100%";
		nR.style.opacity = "50%";
		bookDiv.style.opacity = "75%";
	} else {
		yR.style.opacity = "50%";
		nR.style.opacity = "100%";
	}
	bookDiv.id = titleText.innerText;
}

function resetForm() {
	document.getElementById("book-title").value = "";
	document.getElementById("book-auth").value = "";
	document.getElementById("book-num").value = "";
	document.getElementById("book-pub").value = "";
	document.getElementById("tog-val").checked = false;
}

function deleteBookFromLib(event) {
	if (
		myLibrary.length != 0 &&
		event.target.parentNode.classList.contains("deletebookbtn")
	) {
		removeBookfromLib(event.target.parentNode.parentNode.parentNode.id);
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
			event.target.parentNode.parentNode.parentNode.parentNode.style.opacity =
				"100%";
		} else {
			event.target.parentNode.parentNode.firstChild.style.opacity = "50%";
			for (let readText of event.target.parentNode.parentNode.children) {
				if (readText.classList.contains("status-r2")) {
					readText.style.opacity = "100%";
				}
			}
			event.target.parentNode.parentNode.parentNode.parentNode.style.opacity =
				"75%";
		}
		findBook(event.target.parentNode.parentNode.parentNode.parentNode.id).read =
			event.target.checked;
	}
}

function findBook(bookName) {
	for (let book of myLibrary) {
		if (book.title === bookName) {
			return book;
		}
	}
	return null;
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

confirmButton.addEventListener("click", function (e) {
	if (addBookToLibrary(addNewBookfromForm())) {
		addBookToLibrary(addNewBookfromForm());
		createBook(e);
	} else {
		alert("Input Invalid!");
	}
});
