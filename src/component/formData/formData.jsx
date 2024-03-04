import "./formData.css";
import { MdClose } from "react-icons/md";
export function FormComponent({handleSubmit,handleOnChange,handleclose,rest}){
    return(
        <div>
             <div className="addcontainer">
              <form onSubmit={handleSubmit}>
                <div className="closebtn" onClick={handleclose}><MdClose /></div>
                <label htmlFor="name">Name :</label>
                <input type="text" id="name"
                  name="name" onChange={handleOnChange} value={rest.name}></input>

                <label htmlFor="email">Email :</label>
                <input type="email" id="email"
                  name="email" onChange={handleOnChange} value={rest.email}></input>

                <label htmlFor="mobile">Mobile :</label>
                <input type="text" id="mobile"
                  name="mobile" onChange={handleOnChange} value={rest.mobile}></input>

                <button>Submit</button>
              </form>
            </div>
        </div>
    )
}