"use strict";
(function () {
        window.addEventListener("load", init);
function init() {
        document.getElementById("get-btn").addEventListener("click", getMovie);
        document.getElementById("add-btn").addEventListener("click", addMovie);
        document.getElementById("delete-btn").addEventListener("click", deleteMovie);
}

function checkStatus(response) {
        if (!response.ok) {
                throw Error("Error in request: " + response.statusText);
        }
        return response;
}

function getMovie() {
const id = document.getElementById("get-id").value;
fetch(`/movie?id=${id}`)
        .then(checkStatus)
        .then(resp => resp.json())
        .then(data => {
                document.getElementById("get-result").textContent=`Title: ${data.title}`
        })
        .catch(err => {
                document.getElementById("get-result").textContent = `Error: ${err.message}`;
                console.error(err);
        });
}

function addMovie() {
        const data = {
                id: document.getElementById("movie-id").value,
                title: document.getElementById("movie-title").value,
                genres: document.getElementById("movie-genres").value,
                averageRating: parseFloat(document.getElementById("movie-rating").value),
                numVotes: parseInt(document.getElementById("movie-votes").value, 10),
                releaseYear: parseInt(document.getElementById("movie-year").value, 8),
        };
        fetch("/movie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
        })
                .then(checkStatus)
                .then(resp => resp.json())
                .then(responseData => {
                        document.getElementById("add-result").textContent = `Movie added: ${responseData.title}`;
                })
                .catch(err => {
                        document.getElementById("add-result").textContent = `Error: ${err.message}`;
                        console.error(err);
                });
}
function deleteMovie() {
        const id = document.getElementById("delete-id").value;
        fetch(`/movie?id=${id}`, {
                method: "DELETE",
        })
                .then(checkStatus)
                .then(resp => resp.text())
                .then(message => {
                        document.getElementById("delete-result").textContent = message;
        })
        .catch(err => {
                document.getElementById("delete-result").textContent = `Error: ${err.message}`;
                console.error(err);
        });
        }
})();
