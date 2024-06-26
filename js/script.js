//obtener chistes de la API al hacer click /DONE
// guardar en el localStorage
//BONUS> hacer boton para eliminar chistes



const fetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
const btnDelete = document.querySelector('btnDelete');
let jokes = JSON.parse(localStorage.getItem('joke')) || [];

const getJoke = () => {
    fetch('https://api.chucknorris.io/jokes/random')
    .then (response => {
        if (!response.ok) {
            throw new Error ("la solicitud no fue existosa")
        } return response.json()
    }
    ).then (joke => {
        jokes.push(joke.value);
        localStorage.setItem("joke", JSON.stringify(jokes));
        addJoke(joke.value);
    }
        
    ).catch ((error) => {
        console.error('Error al cargar el chiste:', error);
    }) 
}

const addJoke = (joke) => {
    const li = document.createElement('li');
    li.innerHTML= `<p>${joke}</p><button class="btnDelete">Eliminar</button>`;
    jokeList.appendChild(li);

    li.querySelector('.btnDelete').addEventListener('click', () => {
        deleteJoke(joke);
    });
}


const loadJokes = () => {
    renderJokes();
};

const renderJokes = () => {
    jokeList.innerHTML = '';
    jokes.forEach(joke => {
        addJoke(joke);
    });
    deleteAllJokes();
};


const deleteJoke = (joke) => {
    jokes = jokes.filter(i => i !== joke);
    localStorage.setItem('joke', JSON.stringify(jokes));
    renderJokes();
};


fetchJoke.addEventListener('click', getJoke);
window.addEventListener('load', loadJokes);

const deleteAllJokes = () => {
    const deleteAll = document.createElement('button');
    deleteAll.textContent = 'Borrar todo';
    deleteAll.addEventListener('click', () => {
        jokes = [];
        localStorage.removeItem('joke');
        renderJokes();  
    });
    jokeList.appendChild(deleteAll);
};


