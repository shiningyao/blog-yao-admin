import ApolloClient from 'apollo-boost';
import { SERVER_API_URL } from '@/app.constants';
import * as Cookie from 'js-cookie';

export const client = new ApolloClient({
    uri: `${SERVER_API_URL}/api/query`,
    headers: {
        'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN')
    }
});