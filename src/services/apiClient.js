import axios from "axios";
import { API_KEY, BASE_URL } from "../utils/constants";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: API_KEY,
  },
});

// Fetch Movies
export const getMovies = async (category = "popular", page) => {
  try {
    const response = await apiClient.get(`/movie/${category}`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Search Movies
export const search = async (type, query) => {
  try {
    const response = await apiClient.get(`/search/${type}`, {
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch TV Shows
export const getTVShows = async (category, page) => {
  try {
    const response = await apiClient.get(`/tv/${category}`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch Details
export const getDetails = async (route) => {
  console.log("detaile ,route : " + route);

  try {
    const response = await apiClient.get(route);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
