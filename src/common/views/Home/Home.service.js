import { api } from '@utils';

export const getAllLaunches = (query = '/', data = {}) => {
    const path = `/launches${query}`;
    return api('GET', path, data);
} 