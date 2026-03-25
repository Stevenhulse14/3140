# Project Review Questions

## Core Review Questions

1. What is the overall purpose of this application?
2. Why did we choose a fullstack architecture instead of only building a frontend?
3. What is the responsibility of the frontend in this project?
4. What is the responsibility of the backend in this project?
5. What role does Supabase play in this application?
6. Why do we need authentication for this project?
7. What is the difference between login, signup, and logout?
8. Why should Pokémon routes be protected so only authenticated users can access them?
9. Why is it important to keep the project modularized?
10. What does “modularized” mean in the context of this project?
11. Why are we using React Context API in this project?
12. What kind of state should be stored in Context API for this application?
13. What would happen if we tried to manage all state directly inside individual components?
14. What is the purpose of the /pokemon page?
15. What is the purpose of the /pokemon/find page?
16. What is the purpose of the /pokemon/team page?
17. What is the purpose of the /pokemon/box page?
18. What is the difference between the user’s team and the box?
19. Why do we limit the active team to 6 Pokémon?
20. What should happen when a user catches a Pokémon while their team already has 6 members?
21. Why is a toast notification useful in the catch flow?
22. What kind of information should be shown when a Pokémon is encountered?
23. Why do we want users to be able to click Catch or Find Another?
24. What is the purpose of the zone/terrain system on the find page?
25. How does adding zones make the project more interesting for the user?
26. Give an example of a Pokémon type that would fit well in a Forest zone.
27. Give an example of a Pokémon type that would fit well in a Cave zone.
28. Give an example of a Pokémon type that would fit well in an Ocean zone.
29. Why should each zone have its own theme/style?
30. How do visual themes improve the user experience?
31. What is the purpose of a seed file in this project?
32. Why are we using the Pokémon API for seeding data?
33. What kind of Pokémon data should be stored in our database?
34. Why might we want to store Pokémon data in our own database instead of calling the Pokémon API every single time?
35. What is the difference between base Pokémon data and user-specific Pokémon data?
36. What is the purpose of a user_pokemon table?
37. What is the purpose of a catch history feature?
38. Why is it useful to track the zone where a Pokémon was found?
39. What backend route would make sense for generating a Pokémon encounter by zone?
40. What backend route would make sense for catching a Pokémon?
41. What backend route would make sense for viewing a user’s team?
42. What backend route would make sense for viewing a user’s box?
43. Why is it useful to separate backend code into routes, controllers, and services?
44. What kind of logic belongs in a controller?
45. What kind of logic belongs in a service?
46. What kind of logic belongs in middleware?
47. Why should we avoid putting too much logic directly inside React components?
48. What are some reusable components we could build for this project?
49. Why is a navbar important in this application?
50. How does this project demonstrate real fullstack development skills?

## Good Deeper Discussion Questions

1. If you wanted to add rarity, how would you design that feature?
2. If you wanted Pokémon in each zone to appear with different probabilities, where would that logic belong?
3. If you wanted to let users give Pokémon nicknames, what would need to change in the frontend and backend?
4. If you wanted to add battles later, what parts of this project already help prepare for that?
5. What would be harder to maintain: one giant file for everything, or a modular folder structure? Why?
6. If the app becomes slow, would the problem more likely be in the frontend, backend, database, or API usage? How would we investigate?
7. What is one feature in this project that is mostly about user experience, and what is one feature that is mostly about architecture?

## Quick Check Questions

1. What library are we using for notifications?
2. What are we using for state management?
3. What are we using for authentication?
4. What are we using for the backend?
5. What are we using for the frontend?
6. What API are we using for Pokémon data?
7. What happens when the team is full?
8. What page lets the user encounter a Pokémon?
9. What page shows stored Pokémon with the Professor?
10. What page shows the active team?
