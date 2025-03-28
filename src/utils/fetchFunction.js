export const fetchData = async (
  api,
  reqMethod,
  bodyData = {},
  token = "",
  isFormData = false
) => {
  try {
    const res = await fetch(api, {
      method: reqMethod,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: !isFormData ? JSON.stringify(bodyData) : bodyData,
    });

    if (!res.ok) {
      console.error("Error fetching data:", res.statusText);
      return;
    }

    const data = await res.json();
    // setFun(data?.result || []);
    // console.log("data", data);
    // console.log(data);
    if (data.hasOwnProperty("result")) return data.result;
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    throw new Error(error.message);
  }
};
