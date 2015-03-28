# Appify

Make your site looking like a single page application
Vanilla js no jquery dependency
```html
<h1>This is Appify!</h1>

<h2>A simple base to start and build your next minisite.</h2>
<p>Just clone it from github and start building</p>

<p>It starts with a really simple gulp configuration to let you speed up your development process, you will find <span class="code">connect</span>, to start a web browser, <span class="code">gulp-sass</span> and <span class="code">autoprefixer</span> to give superpower at your css. (Man, I love sass! And if it comes with autoprefixer... Just can't get enough.).</p>

<p>Basically all you need to do is: Download or clone the project from <a href="https://github.com/dbertella/appify" target="_blank">github</a>, run <span class="code">npm install</span> to have your npm ready and start coding!</p>

<p>The html structure is easy.</p>

<p>You will find a <span class="code">header</span> with a div to let you add your logo and a simple navigation on the right. <br>
Then you have a div with class content where you should put all the content that your page will need and a <span class="code">script</span> section at the end.</p>

<p>The <span class="code">header</span> is where the magic happen, links there have an <span class="code">EventListener</span> added to let the navigation <strong>appify.</strong></p>

<p>Basically when you request a new page from a link in the <span class="code">header</span> section instead of a normal http request you will fire an <span class="code">XMLHttpRequest</span> (vanilla js for ajax). <strong>Appify</strong> will get the body part of the page, it'll cut the <span class="code">header</span> section and the <span class="code">script</span> section and the .content section of the page requested will replace the first one</p>

<p>What are you waiting for? Check the live example on github pages: <a href="http://dbertella.github.io/appify/">http://dbertella.github.io/appify/</a></p>

<h3>To be done:</h3>
<ul>
	<li>Make possible to inlcude external scripts</li>
	<li>Change page title with the .content</li>
</ul>

Tell me what you think <a href="https://twitter.com/_denb" target="_blank">@_denb</a></p>
```