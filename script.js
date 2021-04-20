//Variables--------------------------------------------------
const libCtn = document.querySelector(".lib-list-grid");
const addButton = document.querySelector(".addbtn");
const confirmButton = document.querySelector(".confirmBtn");
const exitForm = document.querySelector(".exit-form");
const inputForm = document.querySelector(".add-book-form");
const inputFstatus = document.getElementById("form-switch");
const noBooks = document.getElementById("no-books");

const inputFnread = document.querySelector(".input-tog");
const inputFnrText = document.querySelector(".status-nr");
const inputFrText = document.querySelector(".status-r");

//Book class and functions-----------------------------------
let myLibrary = [];

//constructor
function Book(title, author, numPages, date, read) {
	this.title = title;
	this.author = author;
	this.numPages = numPages;
	this.date = date;
	this.read = read;
}

//add a book object to my library
function addBookToLibrary() {}

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
	readTogLabel.appendChild(readTogSpan);
	readTogLabel.appendChild(readToggle);
	readTogCtn.appendChild(nR);
	readTogCtn.appendChild(readTogLabel);
	readTogCtn.appendChild(yR);
	readDiv.appendChild(readTogCtn);
	nR.classList.add("status-n2");
	yR.classList.add("status-r2");
	readDiv.classList.add("read-toggle");
	readTogSpan.classList.add("slider2");
	readTogSpan.classList.add("round2");
	readToggle.classList.add("input-tog2");
	readToggle.type = "checkbox";
	readTogLabel.id = "form-switch2";

	bookDiv.appendChild(exitDiv);
	bookDiv.appendChild(titleDiv);
	bookDiv.appendChild(authorDiv);
	bookDiv.appendChild(pagesDiv);
	bookDiv.appendChild(dateDiv);
	bookDiv.appendChild(readDiv);

	titleDiv.appendChild(titleText);
	authorDiv.appendChild(authorText);
	pagesDiv.appendChild(pagesText);
	dateDiv.appendChild(dateText);
	readDiv.appendChild(readText);
	exitDiv.appendChild(deleteBookbtn);

	exitDiv.classList.add("exitDiv");
	deleteBookbtn.classList.add("deletebookbtn");

	titleText.innerText = "Title: " + document.getElementById("book-title").value;
	authorText.innerText =
		"Author: " + document.getElementById("book-auth").value;
	pagesText.innerText = "Pages: " + document.getElementById("book-num").value;
	dateText.innerText =
		"Published: " + document.getElementById("book-pub").value;
	deleteBookbtn.innerHTML = '<i class="fas fa-times-circle"></i>';
	inputForm.style.display = "none";
	noBooks.style.display = "none";
	console.log("got here");
}

//eventListeners---------------------------------------------

addButton.addEventListener("click", function () {
	inputForm.style.display = "flex";
});

exitForm.addEventListener("click", function () {
	inputForm.style.display = "none";
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
	createBook(e);
});
