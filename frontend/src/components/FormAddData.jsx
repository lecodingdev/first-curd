import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FormAddData = () => {
  const navigate = useNavigate();

  const [npm, setNPM] = useState("");
  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");

  const [dataMahasiswa, setDataMahasiswa] = useState([]);

  // Get Data
  const getData = async () => {
    try {
      const { data } = await axios.get(
        "https://first-curd.vercel.app/mahasiswa/getData"
      );
      console.log(data.data);
      setDataMahasiswa(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // add Data
  const addData = async (e) => {
    e.preventDefault();

    try {
      await dataMahasiswa.find((data) => {
        if (data.npm == npm) {
          return toast.error("Data Sudah Terdaftar.");
        }
      });

      await axios.post("https://first-curd.vercel.app/mahasiswa/addData", {
        npm,
        nama,
        jurusan,
      });
      // console.log(response)

      navigate("/");
      toast.success("Data Berhasil ditambahkan");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <form onSubmit={addData}>
          <table>
            <tr className="flex flex-col mb-5 gap-2">
              <td>
                <label htmlFor="npm" className="font-bold text-lg">
                  NPM
                </label>
              </td>
              <td>
                <input
                  type="text"
                  name="npm"
                  id="npm"
                  placeholder="Masukan NPM"
                  value={npm}
                  onChange={(e) => setNPM(e.target.value)}
                  required
                  className=" bg-slate-200 h-10 w-[400px] rounded-sm ps-2 text-lg"
                />
              </td>
            </tr>
            <tr className="flex flex-col mb-5 gap-2">
              <td>
                <label htmlFor="nama" className="font-bold text-lg">
                  Nama Lengkap
                </label>
              </td>
              <td>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  placeholder="Masukan Nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                  className="bg-slate-200 h-10 w-[400px] rounded-sm ps-2 text-lg"
                />
              </td>
            </tr>
            <tr className="flex flex-col mb-5 gap-2">
              <td>
                <label htmlFor="jurusan" className="font-bold text-lg">
                  Jurusan
                </label>
              </td>
              <td>
                <select
                  name="jurusan"
                  id="jurusan"
                  value={jurusan}
                  onChange={(e) => setJurusan(e.target.value)}
                  required
                  className="bg-slate-200 h-10 w-[400px] rounded-sm ps-2 text-lg font-bold"
                >
                  <option value="">...</option>
                  <option value="Teknik Informatika">Teknik Informatika</option>
                  <option value="Sistem Informatika">Sistem Informatika</option>
                  <option value="Teknik Komputer">Teknik Komputer</option>
                  <option value="Desain Komunikasi Visual">
                    Desain Komunikasi Visual
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="flex gap-2 justify-end mt-5">
                <button
                  onClick={() => navigate("/")}
                  className="py-2 px-6 font-bold text-base bg-yellow-500 cursor-pointer hover:opacity-80"
                >
                  {" "}
                  Back
                </button>
                <button
                  type="submit"
                  className="py-2 px-6 font-bold text-base bg-lime-500 cursor-pointeR hover:opacity-80"
                >
                  Add Data
                </button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
};

export default FormAddData;
