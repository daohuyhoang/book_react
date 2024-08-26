import axios from "axios";

export const getAllBooks = async (name, genreId) => {
    try {
        let query = "http://localhost:8080/books?";
        if (name) query += `name_like=${name}&`;
        if (genreId) query += `genreId=${genreId}&`;
        query = query.slice(0, -1);
        let res = await axios.get(query);
        return res.data;
    } catch (e) {
        return [];
    }
}

export const getAllGenres = async () => {
    try {
        let res = await axios.get("http://localhost:8080/genres");
        return res.data;
    } catch (e) {
        return [];
    }
}

export const saveStudent = async (book) => {
    try {
        await axios.post("http://localhost:8080/books", book);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}