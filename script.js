document.addEventListener("DOMContentLoaded", async function () {
    const posterElement = document.getElementById("movie-poster");

    
    const config = await fetch('config.json')
        .then(response => response.json())
        .catch(error => {
            console.error("Error loading config:", error);
        });

    async function fetchData() {
        const url = 'https://random-movie-api2.p.rapidapi.com/api/random-movie';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': config.RAPIDAPI_KEY,
                'x-rapidapi-host': 'random-movie-api2.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            const movieTitle = data.movie || "Movie title not found";
            document.getElementById("random-movie").textContent = movieTitle;
            
            const omdbUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${config.OMDBAPI_KEY}`;
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
    