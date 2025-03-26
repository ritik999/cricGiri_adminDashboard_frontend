export const fetchData = async (api, reqMethod, setFun, bodyData = {}) => {
    try {
        const res = await fetch(api, {
            method: reqMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });

        if (!res.ok) {
            console.error('Error fetching data:', res.statusText);
            return;
        }

        const data = await res.json();
        setFun(data?.result || []);
    } catch (error) {
        console.error('Error during fetch:', error);
    }
};
