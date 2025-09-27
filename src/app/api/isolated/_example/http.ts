import axios, {
    AxiosError,
    type AxiosHeaders,
    type AxiosRequestConfig,
} from "axios";

// Function to generate headers based on service type
function generateHeaders(headersObject: AxiosHeaders): AxiosRequestConfig {
    const headers: AxiosRequestConfig = {
        headers: headersObject,
    };

    return headers;
}

// Function to send a request to a service
const sendGetRequest = async (
    headersObject: AxiosHeaders,
    apiUrl: string,
): Promise<any> => {
    const headers = generateHeaders(headersObject);

    const response = await axios.get(apiUrl, headers);

    return response.data;
};

// Function to send a request to a service
async function sendPostRequest(
    headersObject: AxiosHeaders,
    apiUrl: string,
    data: any = {},
): Promise<any> {
    try {
        const headers = generateHeaders(headersObject);

        const response = await axios.post(apiUrl, data, headers);

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError)
            throw new Error(
                `Error sending POST request to ${apiUrl}: ${JSON.stringify(error.response?.data)}`,
            );
    }
}

export { sendGetRequest, sendPostRequest };
