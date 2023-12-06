export const timestampNow = async() => {
    let date_timestamp: Date = new Date();
    const timestampSeconds: number = Math.floor(date_timestamp.getTime() / 1000);
    return timestampSeconds;
}
