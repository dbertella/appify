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

var animateBg = function (e, color) {
	var xPos = e.clientX;
    var yPos = e.clientY;
    var coor = xPos + 'px ' + yPos + 'px';
    var header = document.querySelector('header');
	var animateBg = document.createElement("div");
	animateBg.className = "animate-bg";
	animateBg.style.background = color;
	//animateBg.style.transformOrigin = coor;	
	animateBg.style.top = yPos + 'px';
	animateBg.style.left = xPos + 'px';
	header.appendChild(animateBg);
	setTimeout(function () {
		header.style.background = color;
		header.removeChild(animateBg);
	}, 2000);
};

addListnerToLink();

function appify (e) {
	e.preventDefault();
	removeListnerToLink();
	var header = document.querySelector('header');
	var element = this;
	// header.classList.toggle("clicked");
	var color = element.classList;

	animateBg(e, color);
	
	// [].forEach.call(document.querySelectorAll('a'), function (el) {
	// 	if (el.classList.contains("clicked"))
	// 		el.classList.remove("clicked");
	// });
	
	//console.log(this.classList);
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
