# portfolio
Portfolio for Ovid Mazuru, demonstrating proficiency in technologies such as JS, React, React Native, Python, Django etc

Project Overview:


Mobile Cafe   (React Native, Django Rest Framework Server):
Project in React Native.
Project uses hooks, Expo, React Navigation 5, Redux, Redux Persist, Redux Thunk.
Allows a user to order for a local cafe from their phone.
The user can choose item category, item, any  related options etc.
User can then review order, make amendments, before sending data to server.

This is not a production model, so currently payment is not taken through the phone.

The project connects to a Django Rest server on my localhost, using NGROK to connnect from React Native.
Local data is stored in a persisted redux store.
Screen shots: 
https://raw.githubusercontent.com/trance128/portfolio/master/screenshots/mobilecafe.png
https://raw.githubusercontent.com/trance128/portfolio/master/screenshots/mobilecafe2.png
https://raw.githubusercontent.com/trance128/portfolio/master/screenshots/mobilecafe3.png
https://raw.githubusercontent.com/trance128/portfolio/master/screenshots/mobilecafe4.png

Django Cafe     (Python, Django):
Older code, written only in Django using Views and Django's templating language to generate the web page.
I'm currently rewriting this project to use ReactJS as a front end, and I expeect to upload the React version in a couple days (6-7 March 2020)

This project was made for a friend who manages a very small local cafe.  She wanted to change some menu items and didn't know how to modify her old till system.  Therefore, I made a web page that takes orders, saves those orders to an SQL database, and prints a receipt.
The server is run on a windows tablet, using localhost.
This was the basis for Mobile Cafe.

Native timer   (React Native):
Pomodor Timer coded in React Native.
Users can choose an amount of time to work and for break.  The timer counts down and switches from work / break when appropriate.
Screenshots:
https://raw.githubusercontent.com/trance128/portfolio/master/screenshots/mobiletimer.png
https://raw.githubusercontent.com/trance128/portfolio/master/screenshots/mobiletimer2.png
https://raw.githubusercontent.com/trance128/portfolio/master/screenshots/mobiletimer3.png

Web Timer  ( React JS):
As above, web implementation


Mobile Movie Browser  ( React Native ):
In this project, I wanted to demonstrate use of external APIs.
User can search for movies and get details about said movie.
Project uses redux store for local data.
Screenshots:
https://raw.githubusercontent.com/trance128/portfolio/master/screenshots/mobilemoviebrowser.png
https://raw.githubusercontent.com/trance128/portfolio/master/screenshots/moviebrowser2.png
https://raw.githubusercontent.com/trance128/portfolio/master/screenshots/moviebrowser3.png

Web Movie Browser  (ReactJS):
Same as above, but uses ReactJS rather than React Native.  
This project uses stateful classes rather than hooks, to demonstrate their use.
I prefer using hooks, though.

Currently working on React Cafe -- updated Django Cafe code to use React JS as a front end
Also adding additional features to Mobile Cafe
