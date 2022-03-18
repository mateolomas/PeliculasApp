import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '9b6e44b58c3922df700632096bf057d1',
    languaje: 'es-ES',
  },
});

export default movieDB;
