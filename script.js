require('dotenv').config();

document.addEventListener("DOMContentLoaded", function () {
    const posterElement = document.getElementById("movie-poster");
    
    async function fetchData() {
        const url = 'https://random-movie-api2.p.rapidapi.com/api/random-movie';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,  
                'x-rapidapi-host': 'random-movie-api2.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            const movieTitle = data.movie || "Movie title not found";

            document.getElementById("random-movie").textContent = movieTitle;
            const omdbUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${process.env.OMDBAPI_KEY}`; 
            const omdbResponse = await fetch(omdbUrl);
            const omdbData = await omdbResponse.json();

            if (omdbData.Poster && omdbData.Poster !== "N/A") {
                posterElement.src = omdbData.Poster;
            } else {
                posterElement.src = "";
            }
        } catch (error) {
            console.error("Error fetching movie:", error);
            document.getElementById("random-movie").textContent = "Failed to load movie.";
        }
    }

    document.getElementById("generate-movie").addEventListener("click", fetchData);
});