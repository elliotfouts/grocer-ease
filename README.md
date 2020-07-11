# React Grocery List
### Introduction
During the Covid 19 Pandemic, my family had trouble organizing grocery lists and my mother was becoming overwhelmed by constant random text messages containing bits and pieces of recipes. I was in the middle of a quarter of school so I built a super quick JQuery and SQL grocery list which can be viewed [here](). However, after a couple weeks of use I began to wonder how I could improve both the UI and the backend. In my addition, problems arose such as not knowing which family members added certain items and ambiguity over which products to purchase. I solved these problem by building Grocer-ease. By providing Oauth sign in strategies as well as local authentication options, I can track who added what as well as collect timestamps. By web scraping google images, I can provide automated specificity to items on the list. 
### Key Features
##### 1. Multiple Authentication Options 
Initially I utilized passport.js with sessions to set up a local authentication strategy. However, younger members of my family had trouble remembering their passwords and requested to remove the authentication feature. Instead of removing authentication (I thought it was important to track who was adding what to the list) I implemented a google oauth option that allows them to login without remembering a separate password. Currently, I compare email address on login which allows me to recognize someone as the same user even when they login with different options. 
##### 2. Web Scraper 
I used puppeteer to web scrape from google images in order to display real pictures for items added to the grocery list. The most difficult part of this was deciding which standard query would return the pictures I was looking for (product photos with a white background). Eventually, I settled on 'product name' + 'walmart' in order to take advantage of walmart's extensive product image database. In the future, I might add an option to specify the store but for now walmart's products are covering nearly everything my family buys!
##### 3. Lazy Loading Images + Cache
When I first built this app I loaded all products from the database onto the search page everytime. However as our database of foods grew in size, this resulted in fairly large performance issues and the app became very inefficient in terms of data usage. In order to address this problem, I added lazy loading onto the search and grocery list page and began to cache images so subsequent page loads would not make uneccessary calls to the API. 
##### 4. Indexed DB for offline functionality 
If you have ever shopped at the Safeway in my city, then you know that the cell reception is near nonexistent. My solution to this was to incorporate a connection to indexed db in order to temporarily store new items and items that had been removed off of the list when not connected to the internet. This data is then uploaded to the mongo databse once the user is back online.  

