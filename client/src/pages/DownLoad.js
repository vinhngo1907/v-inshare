import { useContext, useEffect } from "react";
import { FileContext } from "../contexts/FileContext";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import downLoadIcon from '../assets/download-sd.svg';
import axios from "axios";
import { apiUrl } from "../contexts/constants";

function DownLoad() {
    const { uuid } = useParams();
    const {
        fileState: { file, filesLoading },
        showFile,
        setShowToast,
        showToast: { show, message, type }
    } = useContext(FileContext);

    // useEffect(() => {
    //     (async () => {
    //         const response = await showFile(uuid);
    //         if (!response.success) {
    //             setShowToast({ show: true, type: 'danger', message: response.message });
    //             setTimeout(() => {
    //                 setShowToast({ show: false, type: null, message: '' });
    //             }, 3000);
    //         }
    //     })();
    // }, [showFile, uuid, setShowToast]);
    useEffect(() => {
        showFile(uuid).then(response => {
            if (!response.success) {
                setShowToast({ show: true, type: 'danger', message: response.message });
                setTimeout(() => {
                    setShowToast({ show: false, type: null, message: '' });
                }, 3000);
            }
        });
    }, [uuid]);


    const downLoadLink = file ? file.downloadLink : null;

    const handleDownload = async (e) => {
        e.preventDefault(); // CHẶN mở link tự động!

        try {
            await axios.get(`${apiUrl}/files/download/${file.uuid}`);

            setShowToast({
                show: true,
                type: 'success',
                message: 'Download started!'
            });

            setTimeout(() => {
                setShowToast({ show: false, type: null, message: '' });
            }, 3000);

            window.open(`${apiUrl}/files/download/${file.uuid}`, '_blank');

        } catch (err) {
            console.error(err);
            setShowToast({
                show: true,
                type: 'danger',
                message: 'Failed to trigger download!'
            });

            setTimeout(() => {
                setShowToast({ show: false, type: null, message: '' });
            }, 3000);
        }
    };


    let body = null;
    if (filesLoading) {
        body = <div className="spinner-container"><Spinner animation="border" variant="info" /></div>;
    } else if (!file) {
        body = <h4>File not found 😏</h4>;
    } else {
        body = (
            <>
                <h2>Your file is ready to download</h2>
                <p>Link expires in 24 hours</p>
                <div className="download__meta">
                    <h4>{file.fileName}</h4>
                    <small>{parseInt(file.size / 1000)} KB</small>
                </div>
                <div className="send-btn-container">
                    <a href={downLoadLink}
                        // target="_blank"
                        onClick={handleDownload}
                    // rel="noopener noreferrer"
                    >
                        Download file
                    </a>
                    {/* <button onClick={handleDownload}>Download file</button> */}

                </div>
            </>
        );
    }

    return (
        <>
            <section className="download">
                <img className="download__icon" src={downLoadIcon} alt="" />
                {body}
            </section>
            <div className={`${show ? 'toast show' : 'toast'}`} style={{ background: type === 'danger' ? '#ff7800' : '#03a9f4' }}>
                {message}
            </div>
        </>
    );
}

export default DownLoad;