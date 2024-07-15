// export const fetcher = (url) => fetch(url).then((res) => res.json())
export const fetcher = async (url) => {
    await new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds delay
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
