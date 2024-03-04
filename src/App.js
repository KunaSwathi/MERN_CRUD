
import { useEffect, useState } from 'react';
import './App.css';

import axios from "axios";
import { FormComponent } from './component/formData/formData';

axios.defaults.baseURL = "http://localhost:2000/"

function App() {

  const [addPopUp, setAddPopUp] = useState(false)
  const [editPopUp, setEditPopUP] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: " "
  })

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: " ",
    _id: ""
  })
  const [dataList, setDataList] = useState([])


  const handleOnChange = (event) => {
    const { value, name } = event.target
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })

  }

  //function for creating data
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = await axios.post("/create", formData)
    console.log(data)
    if (data.data.success) {
      setAddPopUp(false)
      alert(data.data.message)
      getFetchData()
      setFormData({
        name:"",
        email:"",
        mobile :""
      })
    }
  }
  //function for getting data
  const getFetchData = async () => {
    const data = await axios.get("/")
    console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }

  useEffect(() => {
    getFetchData()
  }, [])


  //function for delete data
  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)

    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
    }
  }

  //function for update
  const handleUpdate = async (event) => {
    event.preventDefault()
    const data = await axios.put("/update",formDataEdit)
   
    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
      setEditPopUP(false)
    }
  }
  const handleEditOnChange = async (event) => {
    const { value, name } = event.target
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleEdit = (el) => {
    setFormDataEdit(el)
    setEditPopUP(true)
  }
  return (
    <div>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>MERN CRUD Operations</h1>
        <button className=" bttn bttn add" onClick={() => setAddPopUp(true)}>Add</button>

        {
          addPopUp && (
            <FormComponent
              handleSubmit={handleSubmit}
              handleOnChange={handleOnChange}
              handleclose={() => setAddPopUp(false)}
              rest={formData}></FormComponent>
          )
        }
        {
          editPopUp && (
            <FormComponent
              handleSubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleclose={() => setEditPopUP(false)}
              rest={formDataEdit}></FormComponent>
          )
        }

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email ID</th>
                <th>Mobile No</th>
                <th>

                </th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((el) => {
                  console.log(el)
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                        <button className='bttn bttn-edit' onClick={() => handleEdit(el)} >Edit</button>
                        <button className='bttn bttn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <p style={{ alignItems: "center" }}>No Data</p>
              )
              }
            </tbody>
          </table>
        </div>


      </div>

    </div>
  );
}

export default App;
