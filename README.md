[![Build Status](https://travis-ci.org/fob413/ISS-Location.svg?branch=develop)](https://travis-ci.org/fob413/ISS-Location)
[![Coverage Status](https://coveralls.io/repos/github/fob413/ISS-Location/badge.svg?branch=develop)](https://coveralls.io/github/fob413/ISS-Location?branch=develop)

<p align="center">
  <img src="https://github.com/fob413/ISS-Location/blob/ch-update-readme-161341473/angular-src/src/assets/images/isshead.png?raw=true">
</p>

ISSL is a simple application that displays the current location of the International Space Station on Google Map. Logged in Users can see [Fun Facts about the International Space Station.](http://www.sciencekids.co.nz/sciencefacts/space/internationalspacestation.html) All Fun facts are gotten from http://www.sciencekids.co.nz/sciencefacts/space/internationalspacestation.html.

# Hosted Link
```https://iss-location-app.herokuapp.com/```

# Features
* Users can see the current location of the International Space Station
* Users can signup or signin to see fun facts about the International Space Station

# Technology Stack
* Node
* Express
* MongoDB
* Angular

# Installation
* Clone this repo and navigate into the project's directory
```git clone https://github.com/fob413/ISS-Location.git && cd iss-location```
* Ensure you have the following installed, click for installations guide
  - [NODE](https://nodejs.org/en/download/)
  - [NPM](https://www.npmjs.com/get-npm)
  - [MONGODB](https://www.mongodb.com)
  - [ANGULAR-CLI](https://cli.angular.io/)
* Install the project's requirements
```npm install```
* Build the angular project
  - Navigate to `angular-src` directory `cd angular-src`
  - Run `ng build`
* Create a `.env` file
  - Navigate to root directory ```cd ../```
  - Run `touch .env`
  - Update the `.env` file with the following environment variables
    - DATABASE
    - SECRET
    - SEEDADMIN
* Start the application ```npm start```
* Make a post request to ```/api/v1/fun-fact``` to seed the database with fun facts.
* Open the application on your browser.

# Tests
Tests were run with Mocha and Chai on all functions and API routes. To run the tests after the installation of the application:
* Run ```npm test```

# Template Imgaes
<p align="center">
  <img src="https://github.com/fob413/ISS-Location/blob/ch-update-readme-161341473/angular-src/src/assets/images/template1.png?raw=true">

  <img src="https://github.com/fob413/ISS-Location/blob/ch-update-readme-161341473/angular-src/src/assets/images/template2.png?raw=true">

  <img src="https://github.com/fob413/ISS-Location/blob/ch-update-readme-161341473/angular-src/src/assets/images/template3.png?raw=true">
</p>
  
# Contributing
Feel free to dive in. Open an issue to request for a bug fix or additional feature or submit PRs. To contribute:
- Fork this repository
- Create your feature branch on your local machine: `git checkout -b your-feature-branch`
- Commit your changes: `git commit -m 'Add my feature'`
- Push your branch online: `git push origin your-feature-branch`
- Open a pull request to the `development` branch and describe how your feature works

Refer to this wiki for the preferred [GIT workflow.](https://github.com/andela/bestpractices/wiki).

Ensure your codes follow [AirBnB Javascript Style Guide.](https://github.com/airbnb/javascript).

# References
* http://open-notify.org/Open-Notify-API/ISS-Location-Now/
* https://cloud.google.com/maps-platform/
* http://www.sciencekids.co.nz/sciencefacts/space/internationalspacestation.html

### Author
Oluwafunso Oluyole-Balogun
