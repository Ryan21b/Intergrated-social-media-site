RYAN BARRON

Read-Me on Upswipes Social Media section:

The app was created using :
Javascript
Css
Html
Node.js
Express
Bcrypt
MongoDb
Jwt
Material ui
Mongoose
Cors(which i later removed due to runtime errors)
cloudinary(as a third party hosting site to store data in the cloud)
Postman(to test Post and get requests)

The app consists of 7 parts ,namely:

*Navbar
*Register Page
*Login Page
*Create Post page
*About Page
*Contact Page
*Home page which displays the posts by each user


*Navbar
created using material ui and uses state to display certain sections of the navbar on succesful login .
the uparrow icon also functions as a logout button.

Register page :

I created the page using fetch api to retrieve the url data , using material ui and React hooks I added the front end functionality.
The register accepts :Fullname,Email,password(i used bcrypt to hash the password) as application/json and adds the user to the MongoDB
useHistory was used to push savedUser to the login page

Login Page:

I created my login in page using fetch api to retrieve url data, i added front end functionality using React hooks (useState).
The login page used the user credentials saved in the database ,if the user data was entered correctly history would push it to the home page to 
view and like other users posts and create your own post.

Create post page:

Uing Schema to create the create post model which consists of Username,Post title,Post Body,And a heart section(Like) the user is able to add their username which will be displayed 
on the Post also a title and body with a like option .
when post is succesfully created useHistory would push it to home page.

About Page : 
Using material ui the about page displays info about upswipes central.

Conatact page:
displays my contact info

Home page:
Home displays all posts created by users of the app ,contains a like button the posts created by users the posts are brought to the home page using fetch api to fetch all posts
from the database.

Resources used for research,inspiration,and the fixing of problems:

scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
stack overflow(to fix 422 and 500 errors)
Material-ui/icons
Material-ui
Cloudinary(After attempting to use Idrive and mediafire this was the only service that seemed to work)
https://support.cloudinary>image_upload
https://dev.to/ogwurujohnson/cloudinary-image-upload-the setup-k3h


