export default function countReadingMinutes(contentLength: number):number {
    // to count the estimated reading time we'll divide the global average by the contentLength
    const readMinutes = Math.ceil(contentLength / 200);
    return readMinutes;
}