# NUS Orbital Project 2021 - Safe Space 
### Difficulty: Gemini (Moderate)
### Introduction
We are a team of 2 members, Estella and Zhiao Wei, who have come together to develop a mobile application called Safe Space. Safe Space aims to enforce the importance of taking care of your mental health above your studies. We have developed features which can help users to cope with stress better to be healthier not only physically, but also mentally. 
### Tech Stack
Safe Space is developed using React Naive with Expo, Firebase Authentication and Firestore Database
### Project Documentation
https://docs.google.com/document/d/1VVSCbGfbWt_C23wbLXxo1WN4o_vLDGjc7QqPKWJH31g/edit?usp=sharing
### Development environment pre-requisites
* [npm](https://nodejs.org/en/) (installing NodeJS LTS client also installs npm by default, macOS users can install NodeJS using the command `brew install node` instead) or [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable)
* A Firebase account 
* [Expo Go](https://expo.io/tools#client)
* expo-cli
  * install using the command `npm install expo-cli --global` or `yarn global add expo-cli`
### Setting up
1. Clone this respository `https://github.com/eseutella/safe_space.git`
2. Change the directory into the project root using `cd safe_space`
3. Install all dependencies using either `npm install` or `yarn install`
4. Create a new [Firebase](https://firebase.google.com/) project (we have used a web application for this project)
5. Create a `.env` file in the root project directory.
6. Add Firebase configuration info (which can be found under project settings in your Firebase project) as follows:
```
API_KEY=<your firebaseConfig apiKey>
AUTH_DOMAIN=<your firebaseConfig authDomain>
DATABASE_URL=<your firebaseConfig databaseURL>
PROJECT_ID=<your firebaseConfig projectId>
STORAGE_BUCKET=<your firebaseConfig storageBucket>
MESSAGING_SENDER_ID=<your firebaseConfig messagingSenderId>
APP_ID=<your firebaseConfig appId>
MEASUREMENT_ID=<your firebaseConfig measurementId>
```
7. In Firebase, enable Authentication by navigating to Build > Authentication > Get started
8. In Firebase, enable Firestore Database by navigating to Build > Firestore Database > Get started
9. Run the app using `expo start` (what we used), `npm start` or `yarn start`
