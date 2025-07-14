import { createContext, useReducer, useState } from "react";
import { fileReducer } from "../reducers/fileReducer";

import axios from "axios";
import { ADD_FILE, apiUrl, DOWNLOAD_FILE, FIND_FILE, SHOW_FILE } from "./constants";

export const FileContext = createContext()

function FileContextProvider({ children }) {
    const [fileState, distpach] = useReducer(fileReducer, {
        filesLoading: true,
        files: [],
        file: null,
    })

    const [showAddFileModal, setShowAddFileModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        type: null,
        message: ''
    })
    const getFiles = async () => {
        try {
            const response = await axios.get(`${apiUrl}/files`);
            if (response.data.success) {
                distpach({
                    type: "FILES_LOADED_SUCCESS",
                    payload: response.data.files
                })
                return response.data
            }

        } catch (error) {
            console.log(error)
            distpach({ type: "FILES_LOADED_FAIL" })
        }
    }

    const addFile = async (myFile, onUploadProgress) => {
        try {
            const formData = new FormData()
            formData.append('myFile', myFile);
            const response = await axios.post(`${apiUrl}/api/files`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress
            });
            if (response.data.success) {
                distpach({
                    type: ADD_FILE,
                    payload: response.data.file
                });
                return response.data
            } else {
                setShowToast({
                    show: true,
                    type: 'danger',
                    message: response.data.message || 'Upload failed.'
                });
            }

        } catch (error) {
            console.log(error)
            setShowToast({
                show: true,
                type: 'danger',
                message: error?.response?.data?.message || 'Server error'
            });
            return error.response?.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    }
    const sendMail = async (sendForm) => {
        try {
            const response = await axios.post(`${apiUrl}/api/files/send`, sendForm)
            if (response.data.success) {
                distpach({
                    type: "SEND_MAIL"
                })
                return response.data
            }

        } catch (error) {
            console.log(error)
            return error.response.data ? error.response.data : { success: false, message: "Server error" }
        }
    }
    const showFile = async (uuid) => {

        try {
            const response = await axios.get(`${apiUrl}/api/files/${uuid}`)
            if (response.data.success) {
                distpach({ type: SHOW_FILE, payload: response.data.file })
                return response.data
            }

        } catch (error) {
            distpach({ type: "FILES_LOADED_FAIL" })
            return error.response.data ? error.response.data : { success: false, message: "Server error" }
        }
    }
    const findFile = (fileId) => {
        const file = fileState.files.find((file) => file.uuid === fileId)
        distpach({ type: FIND_FILE, payload: file })
    }
    const downLoadFile = async (uuid) => {
        try {
            const response = await axios.get(`${apiUrl}/api/files/download/${uuid}`);
            if (response.data.success) {
                distpach({
                    type: DOWNLOAD_FILE,
                    payload: response.data.file
                })
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    }


    const fileContextData = {
        fileState, getFiles, downLoadFile, showFile,
        findFile,
        addFile, showAddFileModal, setShowAddFileModal,
        sendMail,
        showToast, setShowToast
    }



    return (
        <FileContext.Provider value={fileContextData}>{children}</FileContext.Provider>
    )
}

export default FileContextProvider