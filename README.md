# Eduspark

Eduspark is a online learning platform where students can login and access course material provided by instructors. This site is created in Node.js, React.js Express and MongoDB (MERN).


# Prerequisites 

1. Latest (LTS) version of Node.js (>= 10.16.2) and npm, installed in system.
2. MongoDB should be running in background or can connect to online Database using MongoDB connection string which you will get from https://www.mongodb.com


# Steps for installation

1. Clone or download the current repository.
2. Navigate through the directory eduspark_ritviz in terminal.
3. Run "npm install" and then "cd client && npm install" in the terminal.


# Running the application

1. Run MongoDB application in the backend via terminal or whichever method you use.
2. If you don't have mongodb installed or don't want to install mongodb then you can use online MongoDB database (https://www.mongodb.com). You will get a connection string and replace it with 'mongodb://127.0.0.1:27017/eduspark' in the file './src/db/mongoose.js'.
3. Now run "npm run dev" in the given directory. The web application will get opened in your default browser.
