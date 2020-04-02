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

![Edit/Delete Score](https://github.com/phillipsja97/digiCaddie/blob/master/src/Assets/EditingScore.PNG?raw=true)


