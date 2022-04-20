// import React, { useRef, useContext, useEffect, useState } from 'react';
// import file from '../../assets/file.svg'
// import { Card, Spinner } from 'react-bootstrap';
// import { FileContext } from '../../contexts/FileContext';
// // import { AuthContext } from '../../contexts/AuthContext';
// import axios from 'axios';

// function DropForm({ maxAllowedSize, Child1 }) {
//     // const { authState: { user: { username } } } = useContext(AuthContext)
//     const {
//         fileState: { files, filesLoading }, getFiles
//     } = useContext(FileContext)
    
//     const [uploadPercentage,setUploadPercentage] = useState(0)
//     const browseFile = (e) => {
//         fileInput.current.click()
//     }

//     const dragOver = (e) => {
//         e.preventDefault();
//         dropZone.current.classList.add("dragged");
//     }
//     const drop = async (e) => {
//         e.preventDefault();
//         //   console.log("dropped", e.dataTransfer.files[0].name);
//         const files = e.dataTransfer.files;
//         if (files.length === 1) {
//             if (files[0].size < maxAllowedSize) {
//                 // console.log(files)
//                 fileInput.current.files = files
//                 await uploadFile(e);

//             } else {
//                 // showToast("Max file size is 100MB");
//                 alert("Max file size is 100MB");
//             }
//         } else if (files.length > 1) {
//             // showToast("You can't upload multiple files");
//             alert("You can't upload multiple files");
//         }
//         dropZone.current.classList.remove("dragged");
//     }

//     const dragLeave = (e) => {
//         e.preventDefault()
//         dropZone.current.classList.remove("dragged");
//     }

//     const onFileChange = () => {
//         if (fileInput.current.files[0].size > maxAllowedSize) {
//             // showToast("Max file size is 100MB");
//             alert("Max file size is 100MB")
//             fileInput.current.value = ""; // reset the input
//             return;
//         }
//     }

//     const uploadFile = async (e) => {
//         // e.preventDefault()
//         console.log("file added uploading");
//         try {
//             const formData = new FormData()
//             const files = fileInput.current.files
//             console.log(files)
//             formData.append("myFile", files[0]);
//             // for (let key of formData) {
//             //     console.log(key)
//             // }

//             // const uploadData = await addFile(formData)
//             const response = await axios.post('http://localhost:3001/api/files',formData,{
//                 onUploadProgress: (event) => {
//                     console.log("Upload event", event);
//                     setUploadPercentage(Math.round((100 * event.loaded) / event.total))
//                 }
//             })
//             if(response.data.success){
//                 return response.data
//             }
//         } catch (error) {
//             console.log(error)
//             return error.response.data ? error.response.data :{success:false,message:"Server error"}
//         }
//     }

//     const DropZone = React.forwardRef((props, ref) => {
//         return <div className="drop-zone"
//             ref={ref}
//             onDrop={drop}
//             onDragOver={dragOver}
//             onDragLeave={dragLeave}
//         >{props.children}</div>
//     });
//     const fileInput = useRef(null)
//     const dropZone = useRef(null)
//     useEffect(()=>getFiles(),[])
//     let body = null
//     if (filesLoading) {
//         body = (
//             <>
//                 <div className="spinner-container"><Spinner variant='info' animation='border' /></div>
//             </>
//         )
//     } else if (files.length === 0) {
//         <Card className='text-center mx-5 my-5'>
//             <Card.Header as='h1'>Hi {username}</Card.Header>
//         </Card>
//     } else {
//         body = (
//             <>
//                 <form onSubmit={uploadFile} encType='multipart/form-data'>
//                     <DropZone ref={dropZone}
//                     // onDragOver={dragOver}
//                     // onDrop={drop}
//                     // onDragLeave={dragLeave}
//                     >
//                         <div className="icon-container">
//                             <img src={file} draggable="false" className="center" alt="File Icon" />
//                             <img src={file} draggable="false" className="left" alt="File Icon" />
//                             <img src={file} draggable="false" className="right" alt="File Icon" />
//                         </div>
//                         <Child1 ref={fileInput} onChange={onFileChange} value={fileInput.current} />
//                         <div className="title">Drop your Files here or, <span id="browseBtn" onClick={browseFile}>browse</span></div>
//                     </DropZone>

//                 </form>
//             </>
//         )
//     }

//     return (
//         <>{body}</>
//     )
// }
// export default DropForm