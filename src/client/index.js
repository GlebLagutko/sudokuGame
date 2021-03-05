import {gql, ApolloClient, InMemoryCache} from '@apollo/client';
import {FETCH_COMPLETED} from "../store/actions/FetchCompleted";
import store from "../store";


export const client = new ApolloClient({
    uri: 'https://desolate-bastion-22611.herokuapp.com/graphql',
    cache: new InMemoryCache()
});


console.log("************")

export function clientQuery() {
    client
    .query({
        query: gql`
            query
            {
                games{user, difficulty, time}
            }
        `,
        fetchPolicy: "no-cache"
    })
    .then(result => {
        store.dispatch({type: FETCH_COMPLETED, value: result.data.games})
    });
}

clientQuery();



