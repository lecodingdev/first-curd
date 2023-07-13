import {Routes, Route} from "react-router-dom"
import AppCURD from "./components/AppCURD"
import FormAddData from "./components/FormAddData"
import FormEditData from "./components/FormEditData"
import './index.css'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <h1 className="text-3xl text-center font-bold py-12">CRUD APPLICATION</h1>

      <Routes>
        <Route path="/" Component={AppCURD} />
        <Route path="/addData" Component={FormAddData} />
        <Route path="/editData/:id" Component={FormEditData} />
      </Routes>

      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" />
    </div>
  )
}

export default App
