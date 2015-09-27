var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

//In charge of the projects menubar and loading projects
var ProjectDisplay = React.createClass({
  getInitialState: function() {
    return {
      mode: this.props.mode,
    };
  },
  showMenu: function() {
    menu = document.getElementById("menu")
    if (menu.classList.contains('active')){
      menu.classList.remove('active');
    } else {
      menu.classList.add('active');
    }
  },
  aboutClicked: function() {
    menuCircle = document.getElementById("projectMenuCirlce")
    menuCircle.style.opacity = 0
    //Make it look like the ball is shooting up
    menuCircle.style.top = String(0)+'px';
  },
  render: function() {
    //which menuList to send into the menu is decided here
    var menuList = DeveloperDetails
    var CVLink = "cv.pdf"
    var aboutLink ="aboutdev"
    return(
      <div>
        <div onClick={this.showMenu} id="showmenu"><i id="menuBar" className="fa fa-bars"></i></div>
        <div id="projectElements">
          <div id="menu" className="pull-menu">
            <div id="menuLingHeading" onClick={this.aboutClicked}><Link to={aboutLink}>Ling Zhang</Link></div>
            <ProjectsMenu menuList={menuList}/>
          </div>
          <div className="projectDetail ">
            <RouteHandler/>
          </div>
        </div>
        <div className="clear"></div>
        <ProjectFooter cvLink={CVLink} />
      </div>
    );
  }
})

var ProjectFooter = React.createClass({
  render: function() {
    return(
      <div id="projectsFooter">
        <div className="left"><a href="mailto:lingliang.zhang@nyu.edu"><i className="fa fa-paper-plane-o"></i>lingliang.zhang@nyu.edu</a></div>
        <div className="right"><a href={this.props.cvLink} target="_blank"><i className="fa fa-paperclip"></i>Download CV</a></div>
      </div>
      )
  }
})

/*ProjectsMenu is created from the projects constant set
which set to choose from is determined by this.state.mode*/
var ProjectsMenu = React.createClass({
  render: function() {
    //Each menuList is a dict of {tite: , description:, keyword: }
    //item['description'] to print out desciption as well
    return (
      <ul className="menuList">
        <div id="projectMenuCirlce"></div>
        <div id="projectHeading">Projects</div>
        {this.props.menuList.map(function(item){
          // var clickHandler = this.menuItemClicked.bind(this, item);
          return (
              <ProjectMenuItem keyword={item['keyword']} title={item['title']} />
              // <ProjectMenuItem  onClick={this.menuItemClicked} keyword='nyuvote' title='pumklin' />
            );
          }, this)
        }
      </ul>
    )
  },
  //We need to make sure that the cirlce gets loaded in the right position first time it is rendered
  componentDidMount: function() {
    menuCircle = document.getElementById("projectMenuCirlce")
    //querySelector by .active to find which route user is currently on.
    var menuItem = document.querySelector(".active");
    var menuList = document.querySelector(".menuList");
    var menuItemCoords = menuItem.getBoundingClientRect();
    var menuListCoords = menuList.getBoundingClientRect();
    //setting circle to top for sweeping animation on initial load
    menuCircle.style.left = String(menuItemCoords.left-menuListCoords.left-15)+'px';
    menuCircle.style.top = String(0)+'px';
    //We do not want to display the cirlce if the about page is active.
    if (menuItem.parentNode.id == "menuLingHeading"){
      return;
    }
    menuCircle.style.top = String(menuItemCoords.top-menuListCoords.top+104)+'px';
    menuCircle.style.opacity = 1
  }
});

//We need to change the 

//Each menu item needs to be its own component so that we can use getDOMNode() for the menu circle position manipulation
var ProjectMenuItem = React.createClass({
  menuItemClicked: function() {
    menuCircle = document.getElementById("projectMenuCirlce")
    //we get the cordinates of the clicked menu item then manipulate #projectMenuCircle with it
    //getDOMNode() is needed to taget the DOM element instead of the react component
    var menuItemCoords = this.getDOMNode().getBoundingClientRect();
    var menuList = document.querySelector(".menuList");
    var menuListCoords = menuList.getBoundingClientRect();
    menuCircle.style.top = String(menuItemCoords.top-menuListCoords.top+104)+'px';
    menuCircle.style.left = String(menuItemCoords.left-menuListCoords.left-15)+'px';
    menuCircle.style.opacity = 1
    //If we are in mobile mode, automatically hide menu if user clicks on project
    menu = document.getElementById("menu")
    if (menu.classList.contains('active')){
      menu.classList.remove('active');
    }
  },
  render: function() {
    return(
      <Link to={this.props.keyword}>
        <li onClick={this.menuItemClicked} key={this.props.keyword} className="menuItem">
          <div>{this.props.title}</div>
        </li>
      </Link>
    )
  }
})

//This is the default "project" that will be loaded when user lands on Dev projects.
var AboutDev = React.createClass({
  render: function() {
    return(
      <div className="aboutMenu narrowSection">
        <img className="circularPhotoSmall" src="images/Ling-Circular.png"/>
        <h2>Ling Zhang</h2>
        <p>Hi, my name is Ling and I'm a computer science student at <a href="http://nyuad.nyu.edu/en/" target="_blank"><b>New York University Abu Dhabi</b></a>.
        I'm originally from New Zealand.
        I am interested in building robust software that addresses real-world constraints.
        Previously I've worked on <b>Healthcare Tech</b> at <a href="https://www.palantir.com/"><b>Palantir</b></a> and 
        <b> VPN Technologies</b> at <a href="https://internet.org/"><b>Internet.org at Facebook</b></a>.
        I like to focus on writing minimalistic, highly reliable code.
        </p>
        <h4>Skills</h4>
        <table id="skills">
          <tr>
            <td>Java</td>
            <td>Android</td>
          </tr>
          <tr>
            <td>Javascript</td>
            <td>Node</td>
          </tr>
          <tr>
            <td>Python</td>
            <td>React</td>
          </tr>
          <tr>
            <td>C</td>
            <td>MongoDB & PostgreSQL</td>
          </tr>
          <tr>
            <td>PHP</td>
            <td>Git & Mercurial</td>
          </tr>
        </table>
        <h4>Awards</h4>
        <table className="skillsTable">
          <tr>
            <td>
              <b>Best Technical & Design Quality</b><br/>
              Al Jazeera Canvas Intl Hackathon
            </td>
          </tr>
          <tr>          
            <td>
              <b>Top 20 and KPCB Award</b><br/>
              PennApps X
            </td>
          </tr>
          <tr>
            <td>
              <b>First Place</b><br/>
              Google Cloud Developer Challenge (Social Category - MENA)
            </td>
          </tr>
          <tr>
            <td>
              <b>Best API Use</b><br/>
              Bit.ly Hack to the Future Hackathon
            </td>
          </tr>
        </table>
        <h4>Contact</h4>
        <p className="smallMargin"><a href="mailto:lingliang.zhang@nyu.edu">lingliang.zhang@nyu.edu</a></p>
        <h4>CV</h4>
        <a href="cv.pdf" target="_blank"><p className="smallMargin">view resume</p></a>
        <h4>Github</h4>
        <a href="https://github.com/lingz"><p className="smallMargin">https://github.com/lingz</p></a>
      </div>

    )
  }
})

var NYUVote = React.createClass({
  render: function() {
    return(
      <div>
        <h2>NYU Vote</h2>
        <h3>Target audience of 20,000 over the NYU Global Network</h3>
        <p className="narrowSection mainCaption">NYU Vote is an open source live voting platform designed to be the union of capability and simplicity. It has an ultra simple user-facing ballot interface, as well as a minimalistic admin panel. The target audience was 20,000 students from NYU New York, NYU Abu Dhabi, and NYU Shanghai.
        I lead the design and coded the front-end for this project.</p>
        <img className='fullWidth' src='images/developer/VoteHome.png' />
        <p className="narrowSection">The app was designed mobile first to accommodate high volumes of students voting through mobile devices. NYU Vote is built with a responsive design and runs seamlessly across tablets, mobile, and desktop computers.</p>
        <div className='halfWidthContainer'>
          <img className='halfWidth thinBorder left' src='images/developer/VoteMobile-1.png' />
          <img className='halfWidth thinBorder right' src='images/developer/VoteMobile-2.png' />
        </div>
        <img className='fullWidth thinBorder' src='images/developer/VoteEnteringBallot.png' />
        <p className="narrowSection">The green color, which is often associated with validity, is used throughout the design to make users feel secure about the voting app.</p>
        <img className='fullWidth thinBorder' src='images/developer/VoteBallot.png' />
        <p className="narrowSection">Extra emphasis was put into making the casting of the ballots as unambiguous as possible. The changing prompts and colors of the progress bar button were used to guide the user through process.</p>
        <img className='fullWidth' src='images/developer/VoteButtonFlow.png' />
        <div className='center'>
          <a className="button double" href="https://vote.nyuapps.com/" target="_blank"><i className="fa fa-laptop"></i>View Website</a>
          <a className="button double" href="https://github.com/hackAD/nyu-vote" target="_blank"><i className="fa fa-code"></i>Examine Code</a>
        </div>
      </div>
    )
  }
})

var Yalla = React.createClass({
  render: function() {
    return(
      <div>
        <h2>Yalla</h2>
        <h3>Community based event discovery platform in currently in Beta</h3>
        <p className="narrowSection mainCaption">Yalla is an events-centric social network focused on communities. It integrates 
        with existing cloud based calendar workflows. The system enables users to search for nearby events and RSVP to 
        them. I lead the design and coded the front-end for the startup.</p>
        <img className='fullWidth thinBorder' src='images/developer/YallaBlueLogin.png' />
        <p className="narrowSection">SVGs were used throughout Yalla to maximize compatibility across 
        screen densities and to minimize file sizes.  PNG fallbacks were 
        implemented to support older systems.
        </p>
        <p className="narrowSection">Yalla consists of a 3-pane interface, which is updated according to the user's actions. For desktops and devices with large screens, all three panes are shown at once.
        For tablets, two panes can be displayed at once. For mobile, only one pane is displayed. The app is fully responsive.</p>
        <img className="fullWidth" src='images/developer/YallaBrowserMockup.png' />
        <p className="narrowSection">The images below show how the three panels would appear on a mobile device.  The right two panels in the Yalla interface take up the full length of the screen to maximize screen real estate.
        The menu intentionally does not cover the whole screen to remind the user that one can swipe back to the main events panel.</p>
        <img className="thirdWidth left thinBorder" src='images/developer/Yallamobile1.jpg' />
        <img className="thirdWidth thinBorder" src='images/developer/Yallamobile2.jpg' />
        <img className="thirdWidth right thinBorder" src='images/developer/Yallamobile3.jpg' />
        <p className="narrowSection">When users try to create a new event, the right panel updates to the "create event" screen.</p>
        <img className="halfWidth thinBorder" src="images/developer/YallaEventCreation.jpg"/>
        <p className="narrowSection">I oversaw the logo creation process.</p>
        <img className="fullWidth thinBorder" src="images/developer/YallaLogoCompilation.jpg" />
      </div>
      )
  }
})

var WellSense = React.createClass({
  render: function() {
    return(

      <div>
          <h2>WellSense</h2>
          <h3>3rd Place Winner at 2014 Hackathon for Social Good in the Arab world</h3>
          <p className="narrowSection mainCaption">WellSense is a cost-effective web and hardware solution for well management benefit NGOs and local populations.
          I was in charge of designing and front-ending the interface. I also worked with parsing data for displaying the graphs via the Google Charts API.</p>
          <img className='halfWidth thinBorder' src="images/developer/WellSense.jpg" />
          <p className='narrowSection'>The icons for well monitoring are designed to be able to be distinguished by color.</p>
          <img className='fullWidth' src='images/developer/WellSenseIcons.jpg' />
          <p className="narrowSection">The project was completed in a span of 48 hours.  The team consisted of faculty advisors from NYU and CMU Qatar
          as well as students from NYU Abu Dhabi and Carnegie Mellon University.  We were able to place 3rd at the hackathon.</p>
          <img className='fullWidth bottomMargin' src='images/developer/WellSenseGroupshot.jpg' />
          <div className='center'>
            <a className="button double" href="http://nyuad.nyu.edu/en/news-events/conferences/nyuad-hackathon.html" target="_blank"><i className="fa fa-laptop"></i>Hackathon Info</a>
            <a className="button double" href="https://github.com/lingz/wellSense" target="_blank"><i className="fa fa-code"></i>Examine Code</a>
          </div>
      </div>
      )
  }
})

var StudentVoice = React.createClass({
  render: function() {
    return(
      <div>
        <h2>Student Voice</h2>
        <h3>Online feedback sytem developed for NYUAD Student Government</h3>
        <p className="narrowSection mainCaption">Student Voice is a public platform in which students can suggest ways to improve the NYU Global Community.
        Topics range from school specific to the entire Global Network Univerty.  I was a part of the team that designed and front-ended the system.</p> 
        <img className='fullWidth thinBorder' src='images/developer/StudentVoiceFeed.jpg' />
        <p className="narrowSection">The background gradation is evocative of the design trends of the past. When users click on a particular issue from the feed,
        the details page is rendered.</p>
        <img className='fullWidth' src='images/developer/StudentVoiceDetails.jpg' />
        <p className="narrowSection">Users have the ability to tag their issues on the "submit issue" page. The website is fully responsive.</p>
        <img className='fullWidth bottomMargin' src='images/developer/StudentVoiceCreateIssue.jpg' />
        <a className="button" href="https://github.com/lingz/nyu-student-voice" target="_blank"><i className="fa fa-code"></i>Examine Code</a>

      </div>
      )
  }
})

//Title is what shows up in the menu list
var DeveloperDetails = [
  {title: 'NYU Vote', description: 'Voting Service', keyword: 'nyuvote'},
  {title: 'Yalla', description: 'Event Sharing Applicaton', keyword: 'yalla'},
  {title: 'WellSense', description: 'Well analytics', keyword: 'wellsense'},
  {title: 'Student Voice', description: 'Student Service Communication ', keyword: 'studentvoice'}
];

//name must be identical to the keyword inside menu keyword
var routes = (
  <Route name="app" path="/" location="hash" mode={"Developer"} handler={ProjectDisplay}>
    <Route name="nyuvote" handler={NYUVote} />
    <Route name="yalla" handler={Yalla} />
    <Route name="wellsense" handler={WellSense} />
    <Route name="studentvoice" handler={StudentVoice} />
    <DefaultRoute name="aboutdev" handler={AboutDev} />
  </Route>
);



Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('container'));
});

// $(document).ready(function() {
//   $("#menuLingHeading").click(function(){
//     console.log("we are here and this is working")
//   })
// })
// var samplePos = document.querySelectorAll('#menuLingHeading');
// var rect = samplePos.getBoundingClientRect();
// console.log(rect.top, rect.right, rect.bottom, rect.left);
