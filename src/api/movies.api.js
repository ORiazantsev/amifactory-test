import axios from "@/axios";

class Movies {
  getMovies(page) {
    return axios
      .get(`/api/v1/movies/?page=${page}`)
      .then((response) => {
        if (response?.data) {
          return response.data;
        }
      })
      .catch((error) => {
        console.log({ error });
        return null;
      });
  }
}

const movies = new Movies();

export default movies;
