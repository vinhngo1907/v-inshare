import fileImg from '../assets/file.svg'
import React, {
    useState,
    useContext,
    useRef
} from 'react';

import ProgressBar from '../components/ProgressBar';
import SendForm from '../components/SendForm';
import { FileContext } from '../contexts/FileContext';

function Upload() {
    const { addFile, setShowToast, showToast: { show, message, type } } = useContext(FileContext);
    const maxAllowedSize = 100 * 1024 * 1024; // 100MB
    const [startUpload, setStartUpload] = useState(false);
    const [startSend, setStartSend] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [progress, setProgress] = useState(0);

    const dropZone = useRef(null);
    const fileInput = useRef(null);

    const browseFile = () => {
        fileInput.current.click();
    };

    const dragOver = (e) => {
        e.preventDefault();
        dropZone.current.classList.add("dragged");
    };

    const drop = async (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length === 1) {
            if (files[0].size < maxAllowedSize) {
                fileInput.current.files = files;
                await uploadFile(e);
            } else {
                setShowToast({ show: true, type: 'danger', message: "Max file size is 100MB" });
            }
        } else if (files.length > 1) {
            setShowToast({ show: true, type: 'danger', message: "You can't upload multiple files" });
        }
        dropZone.current.classList.remove("dragged");
    };

    const dragLeave = (e) => {
        e.preventDefault();
        dropZone.current.classList.remove("dragged");
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file.size > maxAllowedSize) {
            setShowToast({ show: true, type: 'danger', message: "Max file size is 100MB" });
            setTimeout(() => {
                setShowToast({ show: false, type: null, message: '' });
            }, 3000);
            fileInput.current.value = "";
            return;
        }
        await uploadFile(e);
    };

    const uploadFile = async (e) => {
        e.preventDefault();
        setStartUpload(true);

        const files = fileInput.current.files;
        const response = await addFile(files[0], (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        });

        const { success, message } = response;
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' });

        setTimeout(() => {
            setShowToast({ show: false, message: '', type: null });
        }, 3000);

        if (success) {
            setStartUpload(false);
            setStartSend(true);
            setFileUrl(`${response.filePath}`);
        } else {
            setStartUpload(false);
        }
    };

    const getIsSent = (isSent = false) => {
        if (isSent) {
            setStartUpload(false);
            setStartSend(false);
        }
    };

    return (
        <>
            <div className='wrapper'>
                <header>File Upload And Share</header>
                <section className='upload-container'>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <form onSubmit={uploadFile}>
                            <div
                                className="drop-zone"
                                ref={dropZone}
                                onDrop={drop}
                                onDragOver={dragOver}
                                onDragLeave={dragLeave}
                            >
                                <div className="icon-container">
                                    <img src={fileImg} draggable="false" className="center" alt="File Icon" />
                                    <img src={fileImg} draggable="false" className="left" alt="File Icon" />
                                    <img src={fileImg} draggable="false" className="right" alt="File Icon" />
                                </div>
                                <input
                                    type="file"
                                    ref={fileInput}
                                    id="fileInput"
                                    onChange={handleFileChange}
                                    name="myFile"
                                />
                                <div className="title">
                                    Drop your Files here or, <span id="browseBtn" onClick={browseFile}>browse</span>
                                </div>
                            </div>
                        </form>

                        <ProgressBar
                            percentage={progress}
                            label={`${progress}%`}
                            startUpload={startUpload}
                        />
                    </div>

                    <SendForm
                        fileURL={fileUrl}
                        startSend={startSend}
                        getIsSent={getIsSent}
                        percentage={progress}
                    />
                </section>
            </div>
            {show && (
                <div
                    className="toast show"
                    style={{ background: type === 'danger' ? '#ff7800' : '#03a9f4' }}
                >
                    {message}
                </div>
            )}
        </>
    );
}

export default Upload;