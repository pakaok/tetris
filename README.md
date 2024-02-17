# 3815ICT-Software-Engineering-Assignment

Assignment repo using p5.play

###### Instruction on how to run

###### 1. Pull down the repository from GitHub and open the repository in VS Code.

###### 2. Install all dependencies using the command `npm install` within each directory: `/frontend` & `/backend`.

###### This will install a directory called node_modules which will include all the required development dependencies such as P5.js, Angular, Node.js and Express.

###### NPM ensures easier management of dependencies. A `.gitignore` is set up in `/frontend` and `/backend` to ensure node_modules to kept out of our online repository.

###### 3. To run the front end (Angular Client) run the command `ng serve`. This will run at default port http://localhost:4200/. Click on the url in the terminal.

###### To run `/Backend` server make sure you are in the backend directory and type `npm run start`

###### We're using Angular.js as it uses typescript, handles DOM manipulation and offers two-way data binding. We're also using a Typescript Node.js Express server for better type handling of payloads sent to and from the REST API. Both frontend and backend offer live reload on save.

Source Code

##### Backend

###### Server.ts - Deploys a node.js server using express, cors, helmet and Typescript. Handles API requests.

###### scores.ts - Handles `GET` and `POST` request for the /scores endpoint.

###### scores.json & settings.json - Files for persisting data. Data from API calls are saved to respective files.

##### Frontend

###### board.ts - A class used to create new instances of a game board

###### piece.ts - A class used to create new instances of a piece for the game board

###### gameFactory.ts - A class used to create a new instance of a game by handling the instantiation of `Game` and `Piece` objects within the method.

###### Home Component -The View and View Model for the game using HTML, TypeScript. Method playGame for instantiating a new instance of `P5` and `GameFactory.createSketch()`.

###### Scores Component - The View, View Model and Model for game scores using HTML, TypeScript and `ModelService` for injecting the model.

###### Settings Component - The View, View Model and Model for game settings using HTML, TypeScript and `ModelService` for injecting the model.

###### GameScreen.ts - Handles the rendering and logic of an active game by manipulating classes `Piece` and `Board`.

###### Model.ts - A class for creating a new Model when ModelService is instantiated and injected into components. Is used to hold data from either the game or API calls when the user refreshes the page.

###### ModelService.ts - A service class for handling HTTP requests to the server. Also handles the saving of data to a model from API requests.

###### enums.ts - Used to store various enums used throughout the application.

###### interfaces.ts - Used to store various interfaces throughout the application.

###### logic.ts - Used to store re-useable function used to handle the logic for manipulating instances of the class `Board` and `Piece`.

###### shapes.ts - Used to store a nested array of various shapes for the class `Piece` when a new piece is created. A shape is chosen at random for a newly spawned piece.

###### App Component, App Module and App HTML - For handling content and functionality to be displayed on every page such as the navigation bar. App module to enable the use of Angular components and services. Also enables routing between pages.
