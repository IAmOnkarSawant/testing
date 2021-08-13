export const ORIGIN_URL = 'http://localhost:4000'

export const options = {
    position: "top-left",
    autoClose: 4200,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
}

export const AdminOptions = {
    position: "bottom-left",
    autoClose: 4200,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const stringMinimizer = (str, len) => {
    return str.length > len ? str.substr(0, 45) + '...' : str
}

export const replaceURLWithHTMLLinks = (text) => {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;   //eslint-disable-line
    return text?.replace(exp, "<a class='utilsa' href='$1' target='_blank'>$1</a>");
}

export const replaceURLWithHTMLLinksForComments = (text) => {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;   //eslint-disable-line
    return text?.replace(exp, "<a href='$1' class='utilsa_comment' target='_blank'>$1</a>");
}

export const ImageFormat = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    'image/gif',
    'image/bmp',
    'image/vnd.microsoft.icon'
]

export const ApplicationFormat = [
    'application/vnd.amazon.ebook',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
    'application/json',
    'application/vnd.rar',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    'application/x-7z-compressed',
    'application/octet-stream'
]

export const TextFormat = [
    'text/css',
    'text/csv',
    'text/html',
    'text/plain'
]

export const AudioAllFormat = [
    'audio/aac',
    'audio/mpeg',
    'audio/ogg',
    'audio/opus',
    'audio/wav',
    'audio/webm',
    "audio/vnd.dlna.adts"
]

export const VideoFormat = [
    'video/x-msvideo',
    'video/mpeg',
    'video/ogg',
    'video/mp2t',
    'video/webm',
    'video/3gpp',
    'video/mp4',
    'video/x-matroska'
]