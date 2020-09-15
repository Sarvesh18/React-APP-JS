import { api } from '@utils';

//https://api.spacexdata.com/v3/launches/{{flight_number}}
export const getLaunchById = (id, data = {}) => {
    const path = `/launches/${id}`;

    console.log('path===>', path);

    return api('GET', path, data);
} 