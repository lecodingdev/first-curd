import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import CreateIcon from '@mui/icons-material/Create'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { toast } from "react-toastify";

const AppCURD = () => {
    const [dataMahasiswa, setDataMahasiswa] = useState([]);

// Get Data
    const getData = async () => {
        try {
            const {data} = await axios.get('https://first-curd.vercel.app/mahasiswa/getData');
            console.log(data.data);
            setDataMahasiswa(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const deleteData = async (id) => {
        try {
            const response = await axios.delete(`https://first-curd.vercel.app/mahasiswa/deleteData/${id}`)
            console.log(response);
            getData();
            toast.success("Data Berhasil dihapus.")
        } catch(error){
            console.log(error)
        }
    }
    
  return (
    <div>
        <div className="flex flex-col">
            <Link to="/addData" className="mx-auto font-bold bg-orange-400 py-2 px-7 rounded hover:opacity-80">Add Data</Link>
            <table className="mx-auto mt-12 border-collapse w-[60%] shadow">
                <tbody>
                    <tr className="h-12 bg-green-500">
                        <th>No</th>
                        <th>NPM</th>
                        <th>NAMA LENGKAP</th>
                        <th>JURUSAN</th>
                        <th>ACTION</th>
                    </tr>
                    {dataMahasiswa.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center text-lg font-bold py-2">Data Not Found</td>
                        </tr>
                    ) : (
                        <>
                        {dataMahasiswa.map((data, index) => {
                        return (
                             <tr key={data._id} className="text-center h-12 bg-slate-200 even:bg-white">
                        <td className="font-bold">{index + 1}</td>
                        <td>{data.npm}</td>
                        <td>{data.nama}</td>
                        <td>{data.jurusan}</td>
                        <td className="cursor-pointer">
                            <Link to={`/editData/${data._id}`}>
                                <CreateIcon titleAccess="Edit Data" className=" text-sky-500"/>
                            </Link>
                            <DeleteRoundedIcon titleAccess="Delete Data" className="text-red-500" onClick={() => {
                                return confirm("Are you sure?") ? deleteData(data._id) : "";
                            }}/>
                        </td>
                    </tr>
                    );
                    })}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AppCURD