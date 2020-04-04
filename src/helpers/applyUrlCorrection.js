export default function applyUrlCorrection (url) {
    return (
        url.slice(-1) === "/" ? url.slice(0,url.length -1) : url
    );
} 