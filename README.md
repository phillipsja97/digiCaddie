# DigiCaddie Application Overview
>Utilized React JS to build a web application that would allow users to search golf courses in their area and leave caddie tips on holes at that course. The application also allows users to keep up with their scores by charting their last 5 scores in a graph using amCharts and keeping a running average of their scores.

## Technologies Used
* React.JS
* React-Router (DOM)
* React-Bootstrap
* HTML
* CSS/Sass
* Javascript
* Firebase
    - Google Authentication
    - RealTime Database & Storage
    - Firebase Hosting
* Webpack
* Node.JS
* Axios
* amCharts.JS

## Aplication Features
* When the user first visits the site they will be prompted to sign in through Google Authentication. 

![Authentication Page](https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/UnAuthed.PNG?raw=true)

![Google Auth](https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/GoogleAuth.PNG?raw=true)

* The user is then lead to the home page where they can see their profile that has their name, profile image, and email address, which are acquired through their Google account. They will also see a graph populated by [amCharts.JS](https://www.amcharts.com/) that will show the user their last 5 inputed scores and also an average of their total inputed scores and total amount of posts they have made on the application.

![HomePage](https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/digiCaddieScreenShot.png?raw=true)

* The user can add a recent score to their scores by clicking on the "Add A New Score" button above the graph. This will populate a [React Bootstrap](https://react-bootstrap.github.io/) modal that allows them to input the date of the score and the score.

![Add A Score](https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/AddScore.PNG?raw=true)

* The user also has the ability to update one of the last 5 scores, or delete one of the last 5 scores. By clicking on the "Edit A Score" button another [React Bootstrap](https://react-bootstrap.github.io/) modal will pop up that has the last 5 scores and a button either update or delete the score.

![Edit or Delete Score](https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/EditingScore.PNG?raw=true)

* If the user wants to find new courses in their area to look at before they play a round, they can go to the Find Courses page which will list out the courses and some quick information about the course. The user can also search by course name to pull up a single course.

![Find Courses](https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/FindCourses.PNG?raw=true)

![Search Feature](https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/search.PNG?raw=true)

* Once the user selects a course they are lead to a page that will show more details about that course, along with a map image of where the course is located, and a carousel from [React Bootstrap](https://react-bootstrap.github.io/) with images of the course.

![Course Details Page](https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/CourseDetails.PNG?raw=true)

* The user can then click on the "Hole By Hole Caddie Tips" button which will lead them to Single Hole Information Page. This page will use a Pagination Navigation Tool from [React Bootstrap](https://react-bootstrap.github.io/) to switch between certain holes at that course. When a hole is selected the user will see information about that hole and a hole layout photo for that particular hole.

![Hole View](https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/HoldDetails1.PNG?raw=true)

* On that same page, the user will be able to scroll down to the Caddie Tips section where users can leave comments with insider tips about that hole. You will notice that if a user has left a comment on that hole already there will be the option to edit that comment, or delete that comment. If it is not their comment, they do not have that option.

![Comments](https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/HoleDetails2%20-Tips.PNG?raw=true)

* The user can also add a new commen ton that hole by clicking on the "Add Comment" button. This pulls up a new modal from [React Bootstrap](https://react-bootstrap.github.io/). The modal will have a comment box and a "Save Changes" button along with a "Close" button.

![Add Comment](https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/AddComment.PNG?raw=true)

* If the user has already left a comment but wants to delete that comment, they can simply click on the "X" button in the top right of the comment they want to delete.

* If the user wants to update a particular comment they have left they can also click on the "Edit Comment" button in the comment box they want to update. This pulls up a new modal from [React Bootstrap](https://react-bootstrap.github.io/) which populates the original comment and allows them to make any changes. They will then click the "Save Changes" button to save the edited comment, or they can dismiss and not save the changes by clicking the "Close" button.

![Edit Comment](https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/EditComment.PNG?raw=true)

## Live Demo of Digi-Caddie

* Click [Here](https://digicaddie-capstone.web.app/auth) to go to the [Firebase](https://firebase.google.com/) Hosted version of the application.

