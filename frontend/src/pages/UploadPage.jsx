import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import "./UploadPage.css"



function UploadPage({ userId }) {
    const [filename, setFilename] = useState('')

    //paste the api address in ' '
    // let api ='http://localhost:8000/algorithms/upload/'

    /**created a function to save the file being uploaded */
    const saveFile = () =>{
        console.log('Button Clicked')

        /*TO CAPTURE THE USER BROWERED FILE */
        let formData = new FormData();
        formData.append("csv", filename)

        let axiosConfig = {
            headers: {
                'Content-Type': 'multpart/form-data'
            }
        }

        console.log(formData)
        axios.post(`http://localhost:8000/algorithms/upload/${userId}/`, formData, axiosConfig).then(
            response => {
                console.log(response)
            }
        ).catch(error =>{
            console.log(error)
        })

    }
    return(
       <div className="upload-container">
        
        <div className="row">
            <div className="col-md-4">
                <h2 className="alert alert-success">Upload Bank Statements</h2>
    <form >
        <div className="form-group">
        <label htmlFor="exampleFormControlFile1" className="float-left">Browse A File To Upload</label>
        <input type="file" onChange={e => setFilename(e.target.files[0])} className="form-control" />
        </div>

        <button type="button" onClick={saveFile} className="btn btn-primary float-left mt-2">Submit</button>
        <br/>
        <br/>
        <br/>
        {status ? <h2>{status}</h2>:null}
    </form>
            </div>

            <div className="col-md-7">
            <h2 className="alert alert-success">List of Uploaded Files</h2>
            <table className="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th scope="col">File Title </th>
                        <th scope="col">Download</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
            </div>
        </div>
       </div>

    );

}
    

export default UploadPage;