import axios from "axios";

const BACKEND_URL = `http://localhost:8082`;

/**
 * @function fetchQuora
 * @returns {Object[]} 
 */
const fetchQuora = async (keyword) => {
    try {
        const { data } = await axios.post(`${BACKEND_URL}/crawl/quora`, { "keyword": keyword });
        return data;
    } catch (error) {
        console.log(error)
    }
}

const fetchTwitter = async (keyword) => {
    try {
        const { data } = await axios.post(`${BACKEND_URL}/crawl/twitter`, { "keyword": keyword });
        return data;
    } catch (error) {

    }
}

const fetchReddit = async (keyword) => {
    try {
        const { data } = await axios.post(`${BACKEND_URL}/crawl/reddit`, { "keyword": keyword });
        return data;
    } catch (error) {

    }
}

const fetchYoutube = async (keyword) => {
    try {
        const { data } = await axios.post(`${BACKEND_URL}/crawl/youtube`, { "keyword": keyword });
        return data;
    } catch (error) {

    }
}

const postNewlyGeneratedData = async (data,type) => {
    try {
        await axios.post(`${BACKEND_URL}/freshData?type=${type}`, { ...data });
    } catch (error) {

    }
}
const getNewData = async (data) => {
    try {
        await axios.get(`${BACKEND_URL}/freshData`);
    } catch (error) {

    }
}


export { fetchQuora, fetchReddit, fetchTwitter, fetchYoutube, postNewlyGeneratedData, getNewData };