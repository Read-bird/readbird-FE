export const timestampNow = async () => {
  let date_timestamp: Date = new Date();
  const timestampSeconds: number = Math.floor(date_timestamp.getTime() / 1000);
  return timestampSeconds;
};

export const go = (obj: Record<string, string>) => {
  const entries = Object.entries(obj);

  let queryString = '';

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];

    if (i === 0) {
      queryString += '?';
    } else {
      queryString += '&';
    }

    queryString += `${key}=${value}`;
  }

  return queryString;
};
