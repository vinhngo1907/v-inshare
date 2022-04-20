import { DOWNLOAD_FILE, FILES_LOADED_FAIL, FILES_LOADED_SUCCESS, SHOW_FILE } from "../contexts/constants"

export const fileReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case FILES_LOADED_SUCCESS:
            return {
                ...state,
                files: payload,
                filesLoading: false
            }

        case "ADD_FILE":
            return {
                ...state,
                files: [...state.files, payload]
            }

        case FILES_LOADED_FAIL:
            return {
                ...state,
                filesLoading: false,
                files: []
            }
        case "FIND_FILE":
            return {...state, file: payload }

        case "SEND_MAIL":
            return {
                ...state,
                filesLoading: false,
            }
        case SHOW_FILE:
            return {
                ...state,
                filesLoading: false,
                file: payload
            }
        case "DELETE_FILE":
            return {
                ...state,
                files: state.files.filter((file) => file._id !== payload)
            }
        case DOWNLOAD_FILE:
            return {
                ...state,
                file: payload
            }
        default:
            return state
    }
}