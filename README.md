# forito  
  
Client: https://forito.netlify.app/  
[![Netlify Status](https://api.netlify.com/api/v1/badges/c5386383-05db-4aa1-8b57-116ca0f6d833/deploy-status)](https://app.netlify.com/sites/forito/deploys)  
Server: https://forito-app.herokuapp.com/  
  
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
