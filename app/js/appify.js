var addListnerToLink = function () {
	[].forEach.call(document.querySelectorAll('a'), function (el) {
		el.addEventListener('click', appify);
	});
};
var removeListnerToLink = function () {
	[].forEach.call(document.querySelectorAll('a'), function (el) {
		el.removeEventListener('click', appify);
	});
};

addListnerToLink();

function appify (e) {
	e.preventDefault();
	removeListnerToLink();

	var element = this;
	[].forEach.call(document.querySelectorAll('a'), function (el) {
		if (el.classList.contains("clicked"))
			el.classList.remove("clicked");
	});
	element.classList.add("clicked");
	

	console.log(this.classList);
	var ajaxLink = this.href;// getAttribute('href');
	var xhr = new XMLHttpRequest();  
	xhr.open("GET", ajaxLink, false);  
	xhr.send(null);
	var strVal = xhr.responseText; 
	var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im
	var newContent = pattern.exec(strVal);
	var content = document.querySelector('.content');
	while (content.hasChildNodes()) {
	    content.removeChild(content.lastChild);
	}
	var newDiv = document.createElement("div");
	newDiv.className = "new-content";

	document.body.appendChild(newDiv);
	
	newDiv.innerHTML = newContent[0];
	
	[].forEach.call(newDiv.querySelectorAll('script'), function (el) {
		newDiv.removeChild(el);
	});
	
	[].forEach.call(newDiv.querySelectorAll('header'), function (el) {
		newDiv.removeChild(el);
	});
	
	content.innerHTML = newDiv.querySelectorAll('.content')[0].innerHTML;

	document.body.removeChild(newDiv);
	newDiv = null;
	history.pushState(null, null, ajaxLink);

	addListnerToLink();
}
