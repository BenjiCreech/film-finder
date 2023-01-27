const tmdbKey = '5d5a0451f3a2119f49f4d269ba44580c';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
  //console.log(urlToFetch);
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      const genres = jsonResponse.genres;
      //console.log(genres);
      return genres;
    }
  }
  catch(error){
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  //console.log(selectedGenre);
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = (`?api_key=${tmdbKey}&with_genres=${selectedGenre}`);
  const urlToFetch = tmdbBaseUrl+discoverMovieEndpoint+requestParams;
  //console.log(urlToFetch);
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      const movies = jsonResponse.results;
      //console.log(movies);
      return movies;
    }
  }
  catch(error){
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  console.log(movieId);
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;
  console.log(urlToFetch);
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const movieInfo = await response.json();
      return movieInfo;
    }
  }
  catch(error){
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
