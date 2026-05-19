import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to redirect to a path after a specified timeout.
 * @param {string} path - The path to redirect to.
 * @param {number} timeout - The delay in milliseconds.
 */
export const useAutoRedirect = (path, timeout) => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(path);
        }, timeout);

        return () => clearTimeout(timer);
    }, [navigate, path, timeout]);
};
