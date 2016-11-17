var API_KEY = 'fd2011fbe1938026b40fcf7cdc3f75ab';

var refreshButton = document.querySelector('.refresh');
var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');

var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
var close1ClickStream = Rx.Observable.fromEvent(closeButton1, 'click');
var close2ClickStream = Rx.Observable.fromEvent(closeButton2, 'click');
var close3ClickStream = Rx.Observable.fromEvent(closeButton3, 'click');


var requestStream = refreshClickStream.startWith('startup click')
    .map(function(){
        var page = Math.floor(Math.random()*100)+1
        var randomOffset = Math.floor(Math.random()*20);
        return 'http://api.themoviedb.org/3/discover/movie?api_key='+API_KEY+'&page='+page;
    })

var responseStream = requestStream
    .flatMap(function (requestUrl) {
        return Rx.Observable.fromPromise($.getJSON(requestUrl));
    });

function createSuggestionStream(closeClickStream) {
    return closeClickStream.startWith('startup click')
        .combineLatest(responseStream,             
            function(click, listUsers) {
                console.log(listUsers['results']);
                return listUsers['results'][Math.floor(Math.random()*20)];
            }
        )
        .merge(
            refreshClickStream.map(function(){ 
                return null;
            })
        )
        .startWith(null);
}

var suggestion1Stream = createSuggestionStream(close1ClickStream);
var suggestion2Stream = createSuggestionStream(close2ClickStream);
var suggestion3Stream = createSuggestionStream(close3ClickStream);


// Rendering ---------------------------------------------------
function renderSuggestion(suggestedUser, selector) {
    var suggestionEl = document.querySelector(selector);
    if (suggestedUser === null) {
        suggestionEl.style.visibility = 'hidden';
    } else {
        suggestionEl.style.visibility = 'visible';
        var usernameEl = suggestionEl.querySelector('.username');
        usernameEl.href = 'https://www.themoviedb.org/movie/'+suggestedUser.id;
        usernameEl.textContent = suggestedUser.title;
        var imgEl = suggestionEl.querySelector('img');
        imgEl.src = "";
        imgEl.src = 'http://image.tmdb.org/t/p/w500'+ suggestedUser.poster_path;
        var overviewEl = suggestionEl.querySelector('.overview');
        overviewEl.textContent = suggestedUser.overview;
        var releaseEL = suggestionEl.querySelector('.release_date');
        releaseEL.textContent = suggestedUser.release_date;
    }
}

suggestion1Stream.subscribe(function (suggestedUser) {
    renderSuggestion(suggestedUser, '.suggestion1');
});

suggestion2Stream.subscribe(function (suggestedUser) {
    renderSuggestion(suggestedUser, '.suggestion2');
});

suggestion3Stream.subscribe(function (suggestedUser) {
    renderSuggestion(suggestedUser, '.suggestion3');
});
