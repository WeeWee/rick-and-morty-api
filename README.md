# Rick and Morty!!

I made a Rick and Morty website using the [Rick and Morty API](https://rickandmortyapi.com).
This website was made for my course "WD-JS-ext" as the final project.

## To get started

1. Start by git cloning the repo and when its cloned you need to run "npm install" or "yarn" to install the node modules.
2. Run "npm run dev" or "yarn dev" to start the server.
3. Visit the website on [Localhost](http://localhost:3000/).

## File structure

<ul>
  
  <li>
    
### App
    
   Includes all the boilerplate code including **Components**, **Css**, **Sass** and our **Routes**
   
  <ul>
      
### Routes
   Consists of **Character folder**, **index.tsx** and **results.tsx**.
#### Character folder 
   Consists of **$characterId.tsx** file which is a dynamic file in **[Remix.JS](https://remix.run/)** and is used to display the more in depth Character data.
#### Index
   This file is the landing page of the website which display the Navbar, 6 Rick and Morty Characters and the Footer.
#### Results
   This file display what Character the user has searched in the search bar and is paginated meaning if you get more than 20 results you can change page.
   It also has a Filter button making it easy for the user to narrow the search down by filtering through Status (Alive, Dead, Unkown), Gender (Male, Female, Genderless, Unknown) and Species (Human, Humanoid, Animal, Robot, Unknown).
   The Filter Menu also provides the user with an Apply Filters button and a Clear filters button.
    
   </ul> 
    
</ul>

### Components

<ul>

This folder consists of an **Character Component**, **Filter Component**, **Footer Component** and a **Navbar Component**.
  
</ul> 

## API

### URLs

[The Base Url](https://rickandmortyapi.com/api) 

<ul>

  [Fetch the 6 first Characters](https://rickandmortyapi.com/api/character/[1,2,3,4,5,6])
  [Fetch the Location Data with Location Id](https://rickandmortyapi.com/api/location/)
  [Fetch the Character Data with Character Id](https://rickandmortyapi.com/api/character/)
  [Fetch the Character Array and next/previous fetch url from Search Query](https://rickandmortyapi.com/api/character/?name=)
  [Fetch the Characters with a specific filter](https://rickandmortyapi.com/api/character/?status=)
</ul> 

