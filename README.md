# TrackMyGames

## Description

A college web project for the New Web Technologies course using Angular 10 in the front end, NestJS in the backend and a MongoDB database.

## Prerequisites

* Yarn
* Angular (version 10 preferably)
* NestJS
* MongoDB
* Git
* (optionnal) Robot 3T / Studio3T

## Installation (Linux)

* Create a new folder
* Open a shell inside this folder and input these commands

```bash
$ git init
$ git remote add origin https://github.com/Bert54/NWT_Project.git
$ git pull
$ git checkout prod
```
* Either open a Mongo shell or open a command line in Robo 3T/Studio 3T
* Initialize the Mongo database using the script located in videogames-back/scripts/init-db in your Mongo command line environment
	* If you want to initialize the database with data, copy the entire script
	* If you want to initialize an empty database, only copy the first three lines


## Running the app

```bash
# front end (in the 'videogames-front' folder)
$ ng serve

# back end (in the 'videogames-back' folder)
$ yarn run start:dev
```

## Additionnal

If you are using the data set provided in the database initialization script, you can log in the account **User** using the following password: **password**.
