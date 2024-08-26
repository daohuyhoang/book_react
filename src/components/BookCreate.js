import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as bookService from "../service/BookService";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
function BookCreate() {
    const [form, setForm] = useState({
        id: "",
        name: "",
        genreId: "",
        dateOfAcquisition: "",
        quantity: 0
    });
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await bookService.getAllGenres();
                setGenres(response);
            } catch (error) {
                toast.error("Không thể load được loại sách");
            }
        };

        fetchGenres();
    }, []);

    const objectValid = {
        id: Yup.string()
            .matches(/^BO-\d{4}$/, "Mã sách phải đúng định dạng BO-XXXX")
            .required("Mã sách là bắt buộc"),
        name: Yup.string()
            .max(100, "Tên sách không dài quá 100 ký tự")
            .required("Tên sách là bắt buộc"),
        genreId: Yup.string()
            .required("Thể loại sách là bắt buộc"),
        dateOfAcquisition: Yup.date()
            .max(new Date(), "Ngày nhập sách không được lớn hơn ngày hiện tại")
            .required("Ngày nhập sách là bắt buộc"),
        quantity: Yup.number()
            .integer("Số lượng phải là số nguyên")
            .positive("Số lượng phải lớn hơn 0")
            .required("Số lượng sách là bắt buộc")
    }

    const saveBook = async(value) => {
        value.quantity = +value.quantity;
        let isSuccess = await bookService.saveStudent(value);
        if (isSuccess) {
            toast.success("Thêm mới thành công");
            navigate("/book");
        } else {
            toast.error("Thêm mới thất bại");
        }
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2>Thêm Sách Mới</h2>
                    <Formik initialValues={form} onSubmit={saveBook} validationSchema={Yup.object(objectValid)}>
                        <Form>
                            <div className="form-group mb-3">
                                <label htmlFor="id">Mã Sách:</label>
                                <Field name="id" type="text" className="form-control"/>
                                <ErrorMessage name="id" component="p" className="text-danger"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="name">Tên Sách:</label>
                                <Field name="name" type="text" className="form-control"/>
                                <ErrorMessage name="name" component="p" className="text-danger"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="genreId">Thể Loại:</label>
                                <Field as="select" name="genreId" className="form-control">
                                    <option value="">Chọn Thể Loại</option>
                                    {genres.map(genre => (
                                        <option key={genre.genreId} value={genre.genreId}>{genre.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="genreId" component="p" className="text-danger"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="dateOfAcquisition">Ngày Nhập Sách:</label>
                                <Field name="dateOfAcquisition" type="date" className="form-control"/>
                                <ErrorMessage name="dateOfAcquisition" component="p" className="text-danger"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="quantity">Số Lượng:</label>
                                <Field name="quantity" type="number" className="form-control"/>
                                <ErrorMessage name="quantity" component="p" className="text-danger"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Thêm Mới</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}
export default BookCreate;