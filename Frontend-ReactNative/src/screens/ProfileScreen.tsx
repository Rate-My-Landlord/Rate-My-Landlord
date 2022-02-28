import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import MainContainer from '../components/mainContainer';
import CreateAccount from '../components/user/createAccount';
import Login from '../components/user/login';
import User from '../components/user/user';
import loadUserCredsFromLocal, { resetCreds } from '../global/localStorage';
import { IAuthUser } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParamList } from '../../App';

type Props = NativeStackScreenProps<NavParamList, "Profile">;

const ProfileScreen = ({ route, navigation }: Props) => {
  const windowWidth = useWindowDimensions().width;
  const [user, setUser] = useState<IAuthUser | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetching User from local storage
  // useEffect(() => {
  //   async function fetchUserCreds() {
  //     const creds = await loadUserCredsFromLocal();
  //     if (creds) setUser(creds);
  //     setLoading(false);
  //   }
  //   fetchUserCreds();
  //   return () => { };
  // }, [])

  // resetCreds();

  // Here we are using loading because a user could be authenticated, but we need to get that data from local storage
  // if (loading) return <Text>Loading...</Text>

  return (
    <MainContainer windowWidth={windowWidth}>
      {user === undefined ?
        <View style={{width: '100%'}}>
          <Login setUser={setUser} />
          <CreateAccount setUser={setUser} />
        </View>
        : <User userId={user!.user_id} />}
    </MainContainer>
  )
};

export default ProfileScreen;