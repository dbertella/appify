var addListnerToLink = function () {

	[].forEach.call(document.querySelectorAll('a'), function (el) {
		var relativePath = '/' + el.getAttribute('href').split("/").pop();
		var locationPath = location.pathname;
		
		if (relativePath === locationPath) {
			el.classList.add('active');
		} else {
			el.classList.remove('active');
		}
		el.addEventListener('click', appify, false);
	});
};

var removeListnerToLink = function () {
	[].forEach.call(document.querySelectorAll('a'), function (el) {
		el.removeEventListener('click', appify);
	});
};

// animation of the header
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
	}, 1000);
};

var addBgColorOnLoad = function () {
	var el = document.querySelector('.active');
	var color = el.getAttribute('data-color');
	var header = document.querySelector('header');
	header.style.background = color;
};

// on page load
addListnerToLink();
addBgColorOnLoad();

window.addEventListener("popstate", function(e) {
    appify(e, location.pathname);
});

function appify (e, link) {
	e.preventDefault();
	removeListnerToLink();
	
	var header = document.querySelector('header');
	var element = this;
	var ajaxLink;

	if (link) {
		ajaxLink = link;
	} else {
		var relativePath = '/' + element.getAttribute('href').split("/").pop();
		ajaxLink = relativePath;
		history.pushState(null, null, ajaxLink);
	}
		
	addListnerToLink();

	var color = document.querySelector('.active').getAttribute('data-color');
	animateBg(e, color);
	
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
	
}
