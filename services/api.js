import axios from "axios";

const BASE_URL = 'https://v2.jokeapi.dev';

export const getCategories = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/categories`);
        return res.data.categories;
    } catch (error) {
        console.log('Error fetching categories:', error);
        return null;
    }
}

export const getJokes = async (category) => {
    try {
        const res = await axios.get(`${BASE_URL}/joke/${category}?type=single&amount=2`);
        return res.data.jokes;
    } catch (error) {
        console.log('Error fetching jokes:', error);
        return null;
    }
}