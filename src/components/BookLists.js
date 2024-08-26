import {useEffect, useState} from "react";
import * as bookService from "../service/BookService";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

function BookLists() {
    const [books, setBooks] = useState([]);
    const [name, setName] = useState("");
    const [genreId, setGenreId] = useState("");
    const [genres, setGenres] = useState([]);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        getAllData(name, genreId);
    }, [name, genreId]);

    const getAllData = async (name, genreId) => {
        let bookRes = await bookService.getAllBooks(name, genreId);
        let genreRes = await bookService.getAllGenres();

        bookRes.sort((a, b) => a.quantity - b.quantity);

        const combinedData = bookRes.map(book => {
            const genre = genreRes.find(g => g.genreId === book.genreId);
            return {
                ...book, genreName: genre ? genre.name : 'Không xác định'
            };
        });

        setBooks(combinedData);
        setGenres(genreRes);

        combinedData.length === 0 ? setNoResults(true) : setNoResults(false);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="container mt-4">
            <h2 className="d-flex mb-3">Danh sách toàn bộ sách</h2>
            <div className="d-flex justify-content-between mb-3">
                <Link to="/create" className="btn btn-primary">Thêm mới</Link>
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Tìm kiếm theo tên sách" value={name}
                       onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <select className="form-control" value={genreId} onChange={(e) => setGenreId(e.target.value)}>
                    <option value="">Tất cả thể loại</option>
                    {genres.map(genre => (
                        <option key={genre.genreId} value={genre.genreId}>{genre.name}</option>
                    ))}
                </select>
            </div>
            { noResults ? (
                <div className="alert alert-warning" role="alert">
                    Không có thông tin sách này
                </div>
            ) : (
                <table className="table table-hover">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên sách</th>
                        <th scope="col">Thể loại</th>
                        <th scope="col">Ngày nhập sách</th>
                        <th scope="col">Số lượng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        books.map((item, index) =>
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.genreName}</td>
                                <td>{formatDate(item.dateOfAcquisition)}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default BookLists;
