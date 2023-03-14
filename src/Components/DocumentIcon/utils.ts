/** document type */
export const documentIcon = (type: string): string => {
    switch (type) {
        case "pptx":
        case "ppt":
            return "powerPoint";
        case "docx":
        case "doc":
        case "wps":
        case "dot":
            return "word";
        case "xlsx":
            return "excel";
        case "pdf":
            return "pdf";
        case "txt":
        case "rtf":
            return "textFile";
        case "html":
            return "languageFile";
        case "rar":
        case "zip":
        case "gz":
        case "z":
            return "zip";
        case "bmp":
        case "gif":
        case "jpg":
        case "pic":
        case "png":
        case "tiff":
            return "graphicFile";
        case "wav":
        case "aif":
        case "au":
        case "mp3":
        case "ram":
            return "audioFile";
        case "avi":
        case "mpg":
        case "mov":
        case "swf":
        case "mp4":
            return "animationFile";
        case "int":
        case "sys":
        case "dll":
        case "adt":
        case "bak":
            return "systemFile";
        case "exe":
        case "com":
            return "executableFile";
        case "c":
        case "asm":
        case "for":
        case "lib":
        case "lst":
        case "msg":
        case "obj":
        case "pas":
        case "wki":
        case "bas":
        case "java":
        case "bat":
        case "cmd":
            return "batchProcessingFile";
        case "map":
        case "iso":
            return "imageFile";
        default:
            // 展示用这个代替
            return "textFile";
    }
};
/** document icon color */
export const documentIconColor = (type: string): string => {
    switch (type) {
        case "powerPoint":
            return "#FFA033";
        case "word":
            return "#0099FF";
        case "excel":
            return "#21AD6A";
        case "pdf":
            return "#EB6364";
        default:
            return "#757575";
    }
};
