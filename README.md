Project Based Online Portfolio
========

Forked from my friend's portfolio: https://github.com/kohterai/kohterai.github.io

The website is geared towards project based portfolios.  It is written in JSX with [Facebook React](http://facebook.github.io/react/).  Each project is its own React component.  As the user clicks on a project in the left menu, the component gets swapped out.  In addition, routing is done with [React-Router](https://github.com/rackt/react-router).

<h2>Menu Loading</h2>

Below is an example of how the menu items are loaded and are linked to the individual project components.

First a variable with the menu items must be created.  We will use this array for mapping menu items to components.  The `title` field is what is displayed to the user in the menubar.  `keyword` is the keyword that we will use to connect to the Routes.

Here is an example of a menu that will have two items, *Yalla*, and *NYU Vote*.
```javascript
var DeveloperDetails = [
  {title: 'Yalla', description: 'Event Sharing Applicaton', keyword: 'yalla'},
  {title: 'NYU Vote', description: 'Voting Service for NYU', keyword: 'nyuvote'}
];
```

Inside the ProjectDisplay component, we specify which menuList we want to use.  In this example we update the menuList to the menuList we created earlier as DeveloperDetails.

```javascript
var ProjectDisplay = React.createClass({
	...
	render: function() {
		switch(this.state.mode){
			case "Developer":
				var menuList = DeveloperDetails
				var CVLink = "cv.pdf"
				var aboutLink = "aboutdev"
				break;
		}
	}
}
```

To ensure that the routes work correctly, the routes variable must be updated.  `name` takes the `keyword` from the `menuList` and `handler` should correspond to the variable name of the React component that is to be loaded.

```javascript
var routes = (
  <Routes location="hash">
    <Route path="/" name="home" handler={SelectMode} />
    <Route path="/dev" name="developer" mode={"Developer"} handler={ProjectDisplay}>
      <Route name="yalla" handler={Yalla} />
      <DefaultRoute name="nyuvote" handler={NYUVote} />
    </Route>
  </Routes>
);
```

<h2>File Hierarchy</h2>
Optional StylusCompiler folder is added.  Running ```grunt watch``` in the directory will convert the .styl file to standard CSS into the ./css directory.

Only using reactify may not suffice since react-router is an additional component.  Instead watchify can be used.
```watchify -t reactify source/source.js -o destination.js -v```

Keybase Migration pending...
