import { useContext, useEffect, useState } from "react"
import { FileContext } from "../contexts/FileContext"
import { Button, Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
import downLoadIcon from '../assets/download-sd.svg'
import { apiUrl } from "../contexts/constants"

function DownLoad() {
    
    const { uuid } = useParams()
    const { fileState: { file, filesLoading }, showFile, downLoadFile } = useContext(FileContext)
    const [message,setMessage] = useState('');
    useEffect(async() => {
        const response = await showFile(uuid)
        if(!response.success){
            setMessage(response.message)
        }
        // await showFile(uuid)
    }, []);
    // console.log(file);
    const downLoadLink = file?file.downloadLink:null
    let body = null
    if (filesLoading) {
        body = (
            <><div className="spinner-container"><Spinner animation="border"  variant='info'/></div></>
        )
    } else if (!file || file===null) {
        body = (
            <>
                <h4>{message} 😏</h4>
            </>
        )
    } else {
        body = (
            <>                
                <h2>Your file is ready to download</h2>
                <p>Link expires in 24 hours </p>
                <div className="download__meta">
                    <h4>{file.fileName}</h4>
                    <small>{parseInt(file.size / 1000)} KB</small>
                </div>
                <div className="send-btn-container">
                    <a href={downLoadLink}>Download file</a>
                    {/* <Button  variant="info" size="sm" onClick={downLoadFile.bind(this, uuid)}> Downwload file </Button> */}
                </div>
            </>
        )
    }
    return (
        <>
            <section className="download">
            <img className="download__icon" src={downLoadIcon} alt="" />
                {body}
            </section>
        </>
    )
}

export default DownLoad