import ApolloClient from 'apollo-boost';
import { SERVER_API_URL } from '@/app.constants';
import * as Cookie from 'js-cookie';

const client = new ApolloClient({
    uri: `${SERVER_API_URL}/api/query`,
    request: (operation) => {
        operation.setContext({
            headers: {
                'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN')
            }
        });
        return new Promise((resolve) => {
            resolve();
        });
    }
});

export default client;