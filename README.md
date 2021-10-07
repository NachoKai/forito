# Forito  
  
## Available Scripts  
In the project directory, you can run:  
  
#### Client: `yarn start`  
#### Server: `npm run dev`  
  
Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  
  
The page will reload if you make edits.  
You will also see any lint errors in the console.  
  
Add:  
*Sections  
-Forum  
-Categories  
-Topics  
-Posts  
---Normal  
---Important (Visible at the top of each Topic)  
---Announcement (Visible at the top of all Topics of each Category)  
---Global (Visible at the top of all Categories/Topics)  
-Replies  
  
*Tests  
*Routing  
*Cache  
*Pagination  
  
E.g.  
*Forum  
**Category A  
====Topic 1  
-------Post a Global  
-------Post b Announcement  
-------Post c Important  
-------Post d  
-------Post e  
====Topic 2  
-------Post a Global  
-------Post b Announcement  
====Topic 3  
-------Post a Global  
-------Post b Announcement  
-------Post c  
  
**Category B  
====Topic 1  
-------Post a Global  
-------Post b  
====Topic 2  
-------Post a Global  
-------Post b Important  
-------Post c  
====Topic 3  
-------Post a Global  
-------Post b  
-------Post c  
  
## Env variables  
### Client  
REACT_APP_GOOGLE_CLIENT_ID=  
### Server
PORT=  
MONGODB_URI=  
SECRET=  
SALT=  
  