export const apiUrl =
    process.env.NODE_ENV !== 'production' ?
    'http://localhost:3001' :
    'http://localhost:3001'
    // 'https://mern-inshare-app.herokuapp.com'
export const LOCAL_STORAGE_TOKEN_NAME = 'mern-shareit'

export const FILES_LOADED_SUCCESS = "FILES_LOADED_SUCCESS"
export const FILES_LOADED_FAIL = 'FILES_LOADED_FAIL'
export const ADD_FILE = 'ADD_FILE'
export const DELETE_FILE = 'DELETE_FILE'
export const FIND_FILE = 'FIND_FILE'
export const SHOW_FILE = 'SHOW_FILE'
export const DOWNLOAD_FILE = "DOWNLOAD_FILE"
    // export const APP_BASE_URL = "http://localhost:3001"

// export const APP_BASE_URL =
//     process.env.NODE_ENV !== 'production' ?
//     'http://localhost:3001' :
//     'https://mern-share-it-app.herokuapp.com/api'