# WTA Backend Sample Project

Sample REST backend project for Willowtree.

## Getting Started

These quick instructions will help you to get the system up and running in a timely fashion, with (hopefully) a minimum of difficulty.

### Prerequisites

This was build using Node.js. Since I'm using a lot of modern features of the language, please make sure you're using recent versions of both node and npm.

### Installing

Once you've got the repo cloned, simply run the following command from within the repo directory.

```
npm install
```

There are two optional components you can install as well. They're not necessary, but they'll allow you to run the watch and test commands.

I use artillery for load testing.

```
npm install -g artillery
```
As well as nodemon for watching changes to the code while I'm developing.

```
npm install -g nodemon
```

### Configuration

There is only one thing that needs to be configured, the Mongo connection string.
This is located within the server/config/mongo.json file.

```
vim server/config/mongo.json
```
Modify the ConnectionString value with the connection string appropriate to your environment.

** If you're a Willowtree employee, a specific connection string will be supplied to you via email! **

## Running the backend service

Once everything is installed and configured...

```
npm run start
```

Alternately, if you've got nodemon installed:

```
npm run watch
```

### Accessing the endpoints

The following endpoints are available on http://localhost:8080
I recommend using [Postman](https://www.getpostman.com/) for accessing these endpoints.

1. /api/assets
..+ GET request that lists all available assets
2. /api/asset
..+ POST request that creates an asset when supplied a uri string and a name string
3. /api/asset/ASSETID
..+ GET request retrieves a single asset
..+ PATCH request modifies asset specified by ASSETID when provided uri and/or name parameters
..+ DELETE request marks an asset for deletion
..+ PURGE request that deletes an asset (regardless of whether or not it has been marked for deletion)
4. /api/asset/ASSETID/note
..+ POST request that creates a note and associates it with the specified ASSETID
5. /api/asset/ASSETID/note/NOTEID
..+ PATCH request that modifies the note specified by NOTEID and associated with ASSETID when supplied a note parameter
6. /api/note/NOTEID
..+ GET request retrieves the note associated with NOTEID
..+ PATCH request modifies the note associated with NOTEID when supplied a note parameter

### Load testing

If you've got artillery installed, open a second terminal window and run the following command:

```
npm run test
```

Artillery will simulate hiting the /api/assets endpoint with 60 new virtual users every second for 60 seconds. 

** This means that it's going to get hit 3600 times in one minute and will most likely make a noticeable impact on your cpu usage **

## Built With

* [Express](https://expressjs.com/) - Web framework.
* [body-parser](https://github.com/expressjs/body-parser) - Body parsing middleware.
* [mongoose](http://mongoosejs.com/) - MongoDB object modeling.
* [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware.
* [artillery](https://artillery.io/) - Load testing
* [nodemon](https://nodemon.io/) - Automatic reload


## Author

* **Trevor Lewis** - *Initial work* 

## Acknowledgments

* Thank you to Willowtree for the opportunity!
