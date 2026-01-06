const API_BASE_URL = 'http://localhost:8082/api/estimates';

// Helper function to handle errors
const handleError = (response) => {
    if (!response.ok) {
        return response.json().then(errorData => {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
        }).catch(() => {
            throw new Error(`HTTP error! Status: ${response.status}`);
        });
    }
    return response.json();
};

// Create a new estimate
export const createEstimate = async (estimateData) => {
    try {
        console.log('Sending data to backend:', estimateData);
        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(estimateData),
        });
        const responseData = await handleError(response);
        return responseData;
    } catch (error) {
        console.error('Error creating estimate:', error.message || error);
        throw error;
    }
};

// Fetch an estimate by estimateNo
export const fetchEstimateById = async (estimateNo) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${estimateNo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const responseData = await handleError(response);
        return responseData;
    } catch (error) {
        console.error('Error fetching estimate:', error.message || error);
        throw error;
    }
};

// Client-side Basic Auth helpers
const getClientBasicHeader = () => {
    // Prefer explicit CRA env vars, then localStorage (developer convenience)
    const user = process.env.REACT_APP_BASIC_AUTH_USER || localStorage.getItem('BASIC_AUTH_USER');
    const pass = process.env.REACT_APP_BASIC_AUTH_PASSWORD || localStorage.getItem('BASIC_AUTH_PASSWORD');
    if (user && pass) return 'Basic ' + btoa(`${user}:${pass}`);
    return null;
};

export function authFetch(url, options = {}) {
    const headers = Object.assign({}, options.headers || {});
    const basic = getClientBasicHeader();
    if (basic) headers['Authorization'] = basic;
    // default to json content-type unless a FormData body
    if (!headers['Content-Type'] && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    const opts = Object.assign({}, options, { headers, credentials: 'include' });
    return fetch(url, opts);
}

export function setBasicAuthCredentials(user, pass) {
    try {
        localStorage.setItem('BASIC_AUTH_USER', user);
        localStorage.setItem('BASIC_AUTH_PASSWORD', pass);
        return true;
    } catch (e) {
        return false;
    }
}