import { View, Text, StyleSheet } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { Query, QueryUserByUserIdArgs } from '../../../graphql/generated';
import { IAuthUser } from '../../types';
import { saveUserCredsToLocal } from '../../global/localStorage';

const GET_USER_BY_ID = gql`
    query GetUserById($userId: ID!) {
        UserByUserId(userId: $userId) {
            success,
            errors,
            user {
                id,
                firstName,
                lastName,
                email,
                phone
            },
            token,
        }
    }
`

type Props ={
    userId: string
}

export default ({userId}: Props) => {
    const { loading, data } = useQuery<Query, QueryUserByUserIdArgs>(GET_USER_BY_ID, { variables: { userId: userId } });

    if (data?.UserByUserId.token !== undefined) {
        if (data?.UserByUserId.user?.id! !== userId) {
            throw new Error('User ids do not match');
        } else {
            // Not using setUser from UserCOntext because then it will infinitely rerender 
            saveUserCredsToLocal(data?.UserByUserId.user?.id!, data?.UserByUserId.token!)
        }

    }


    if (loading) return <Text>Loading...</Text>

    return (
        <View>
            <Text>Hello</Text>
            <Text>{data?.UserByUserId.user?.firstName}</Text>
        </View>
    )


}