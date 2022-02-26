import { View, Text, StyleSheet } from 'react-native';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { Query, QueryUserByUserIdArgs } from '../../../graphql/generated';
import { IAuthUser } from '../../types';
import { useContext } from 'react';
import UserContext from '../../global/userContext';

const GET_USER_BY_ID = gql`
    query GetUserById($userId: ID!) {
        UserByUserId(userId: $userId) {
            success,
            errors,
            user {
                id,
                firstName,
                lastName,
            },
            token,
        }
    }
`
export default () => {
    const [getUser, { loading, data }] = useLazyQuery<Query, QueryUserByUserIdArgs>(GET_USER_BY_ID);

    const { user, setUser } = useContext(UserContext);


    if (user) {
        // console.log('' + user!.user_id);
        console.log(user);
        console.log(user['user_id']);
        console.log(user.user_id)
        // console.log(user);
        // getUser({ variables: { userId: user.user_id.toString() } })
    }

    // console.log(data?.UserByUserId);

    if (loading || !user) return <Text>Loading...</Text>

    return (
        <Text>Hello</Text>
    )


}