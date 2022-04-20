import fileImg from '../assets/file.svg'
import React, {
    useState,
    // useEffect, 
    useContext,
    useRef,
    useEffect
} from 'react';

import ProgressBar from '../components/ProgressBar';
import SendForm from '../components/SendForm';
import { FileContext } from '../contexts/FileContext';

function Upload() {
    const { addFile, setShowToast, showToast: { show, message, type } } = useContext(FileContext);
    const maxAllowedSize = 100 * 1024 * 1024; //100mb
    const [startUpload, setStartUpload] = useState(false);
    const [startSend, setStartSend] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [myFile, setMyFile] = useState('');
    const [progress, setProgress] = useState(0);

    const FileInput = React.forwardRef((props, ref) => {
        return <input type="file" ref={ref} id="fileInput"
            onChange={handleFileChange}
            name='myFile'
        />
    });

    const DropZone = React.forwardRef((props, ref) => {
        return <div className="drop-zone"
            ref={ref}
            onDrop={drop}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
        >{props.children}</div>
    });

    const browseFile = (e) => {
        fileInput.current.click();
        // uploadFile()
    }

    const dragOver = (e) => {
        e.preventDefault();
        dropZone.current.classList.add("dragged");
    }

    const drop = async (e) => {
        e.preventDefault();
        //   console.log("dropped", e.dataTransfer.files[0].name);
        const files = e.dataTransfer.files;
        if (files.length === 1) {
            if (files[0].size < maxAllowedSize) {
                // console.log(files)

                fileInput.current.files = files
                await uploadFile(e);

            } else {
                // showToast("Max file size is 100MB");
                alert("Max file size is 100MB");
            }
        } else if (files.length > 1) {
            // showToast("You can't upload multiple files");
            alert("You can't upload multiple files");
        }
        dropZone.current.classList.remove("dragged");
    }

    const dragLeave = (e) => {
        e.preventDefault()
        dropZone.current.classList.remove("dragged");
    }

    const handleFileChange = async (e) => {
        console.log(e.target.files[0])
        if (fileInput.current.files[0].size > maxAllowedSize) {
            // showToast("Max file size is 100MB");
            alert("Max file size is 100MB");
            // fileInput.current.value = ""; // reset the input
            setMyFile('');
            return;
        }
        setMyFile(e.target.files[0]);
        await uploadFile(e);
    }

    const uploadFile = async (e) => {
        e.preventDefault();
        setStartUpload(true);
        const files = fileInput.current.files;
        const response = await addFile(files[0], (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        });

        console.log(response);
        const { success, message } = response;
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
        setTimeout(() => {
            setShowToast({ show: false, message: '', type: null });
        }, 3000);
        if (success) {
            setStartUpload(false);
            setStartSend(true);
            setFileUrl(`${response.filePath.toString()}`);
        }
    }

    function getIsSent(isSent = false) {
        if (isSent) {
            setStartUpload(false);
            setStartSend(false);
        }
    }

    const dropZone = useRef(null);
    const fileInput = useRef(null);
    return (
        <>
            <div className='wrapper'>
                <header>File Upload And Share</header>
                <section className='upload-container'>
                    {/* <DropForm maxAllowedSize={maxAllowedSize} FileInput={FileInput} /> */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <form onSubmit={uploadFile}>
                            <DropZone ref={dropZone}
                                onDragOver={dragOver}
                                onDrop={drop}
                                onDragLeave={dragLeave}
                            >
                                <div className="icon-container">
                                    <img src={fileImg} draggable="false" className="center" alt="File Icon" />
                                    <img src={fileImg} draggable="false" className="left" alt="File Icon" />
                                    <img src={fileImg} draggable="false" className="right" alt="File Icon" />
                                </div>
                                <FileInput ref={fileInput} />
                                {/* <input type="file" onChange={handleFileChange}/> */}
                                <div className="title">Drop your Files here or, <span id="browseBtn" onClick={browseFile}>browse</span></div>
                            </DropZone>

                        </form>
                        <ProgressBar percentage={progress}
                            label={`${progress}%`}
                            startUpload={startUpload}
                        />
                        
                    </div>

                    <SendForm fileURL={fileUrl}
                        startSend={startSend}
                        getIsSent={getIsSent}
                        percentage={progress}
                    />

                </section>
            </div>
            {/* <div className="image-vector"></div> */}
            <div className={`${show ? 'toast show' : 'toast'}`} style={{ background: type === 'danger' ? '#ff7800' : '#03a9f4' }}>
                {message}
            </div>
        </>
    )
}

export default Upload;