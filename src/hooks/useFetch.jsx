// src/hooks/useFetch.js
import { useState, useCallback } from 'react';
import axios from 'axios';

const useFetch = (baseURL) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const request = useCallback(async (method, endpoint, payload = null, customHeaders = {}) => {
        setLoading(true);
        setError(null);



        try {
            const res = await axios({
                method,
                url: `${baseURL}${endpoint}`, // ✅ baseURL + query string
                data: payload,
                headers: {
                    'Content-Type': 'application/json', // ✅ matches your working version
                    ...customHeaders
                },
            });

            setData(res?.data);
            return res?.data;
        } catch (err) {
            setError(err?.response?.data || err?.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, [baseURL]);

    // Exposed shortcut methods
    const get = (endpoint, headers = {}) => request('GET', endpoint, null, headers);
    const post = (endpoint, payload = {}, headers = {}) => request('POST', endpoint, payload, headers);
    const put = (endpoint, payload = {}, headers = {}) => request('PUT', endpoint, payload, headers);
    const del = (endpoint, headers = {}) => request('DELETE', endpoint, null, headers);

    return { data, error, loading, get, post, put, del };
};

export default useFetch;
