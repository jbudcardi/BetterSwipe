import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./UploadPage.css";



function UploadPage({ userId }) {
    const [filename, setFilename] = useState('');
    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchFiles(); // Load files when the component mounts
    }, []);



    //paste the api address in ' '
    // let api ='http://localhost:8000/algorithms/upload/'

    /**created a function to save the file being uploaded */
    const saveFile = () =>{
        console.log('Button Clicked')

        /*TO CAPTURE THE USER BROWERED FILE */
        let formData = new FormData();
        formData.append("csv", filename)

        /*let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }*/

        console.log(formData)
        axios.post(`http://localhost:8000/algorithms/upload/${userId}/`, formData /*axiosConfig*/).then(
            response => {
                console.log(response);
                setStatus('File Uploaded Successfully');
                fetchFiles();
            }
        ).catch(error =>{
            console.log(error)
        })

    }

    const fetchFiles = () => {
        axios.get(`http://localhost:8000/algorithms/uploaded_files/${userId}/`)
        .then(response => {
            setFiles(response.data.files);  // Assuming the endpoint returns an object with a `files` array
        })
        .catch(error => {
            console.error('Error fetching files:', error);
        });

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
                {files.map((file, index) => (
                                <tr key={index}>
                                    <td>{file.name}</td>
                                    <td><a href={file.url} target="_blank" rel="noopener noreferrer">Download</a></td>
                                </tr>
                            ))}
                    
                </tbody>
            </table>
            </div>
        </div>
       </div>

    );

}
    

export default UploadPage;