// takes in a string as input.
// Removes / at the end of the string if present and returns the string

export default function applyUrlCorrection(url) {
  if (typeof url === 'string') {
    return (
      url.slice(-1) === '/' ? url.slice(0, url.length - 1) : url
    );
  }
  throw new TypeError('applUrlCorrection requires a string as the input');
}
