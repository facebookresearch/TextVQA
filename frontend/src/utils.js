const possiblePaths = ["textocr", "textcaps", "textvqa"];


export const getWebsiteType = (props) => {
    let pathname;
    if (!props) {
        pathname = window.location.href;
    } else {
        pathname = props.location.pathname;
    }

    for (const possiblePath of possiblePaths) {
        if (pathname.indexOf(possiblePath) !== -1) {
            return possiblePath;
        }
    }

    return "textvqa";
};