# Movie Recommender using ReactiveX
> This is a movie recommender application based on ReactiveX concept. I create 3 streams to fetch movie data from API endpoints and each stream is considered as distinct. So the user can remove a single suggestion and it will be replaced by a new suggestion.

## Features
- [x] When user open the page, it renders 3 movie suggestions via calling from API endpoints.
- [x] When user click 'show me more' button, it re-render 3 new movie suggestions.
- [x] When user click 'x' button on one of the movie suggestion, it replaces with a new suggestion.
- [x] When user click movie title, a new tab of movie homepage will show up.
- [x] When user click 'add to cart' on one of the movie suggestions, the movie will be added to user's cart(collections) which is located on the right up corner of page.
- [x] User's cart is saved in local storage(offline) so user can still access that when revisting page.

## Live
https://xinyzhang9.github.io/movie_recommender/

## Screenshot
![alt tag](https://raw.githubusercontent.com/xinyzhang9/movie_recommender/master/movie2.png)
