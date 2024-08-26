import './App.css';
import BookLists from "./components/BookLists";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BookCreate from "./components/BookCreate";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/create" element={<BookCreate/>}></Route>
                  <Route path="/book" element={<BookLists/>}></Route>
              </Routes>
          </BrowserRouter>
          <ToastContainer/>
      </>
  );
}

export default App;
