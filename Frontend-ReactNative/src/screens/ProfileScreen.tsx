import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import MainContainer from '../components/mainContainer';
import User from '../components/user/userProfile';
import UserNotAuthenticated from '../components/user/userNotAuthenticated';
import loadUserCredsFromLocal, { resetCreds } from '../global/localStorage';
import { IAuthUser } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParamList } from '../../App';
import PhonePrompt from '../components/user/phonePrompt';

type Props = NativeStackScreenProps<NavParamList, "Profile">;

const ProfileScreen = ({ route, navigation }: Props) => {
  const windowWidth = useWindowDimensions().width;
  const [user, setUser] = useState<IAuthUser | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [externalToken, setExternalToken] = useState<String | undefined>(undefined);

  // Fetching User from local storage
  useEffect(() => {
    async function fetchUserCreds() {
      const creds = await loadUserCredsFromLocal();
      if (creds) setUser(creds);
      setLoading(false);
    }
    fetchUserCreds();
    // return () => { };
  }, [externalToken])

  // Here we are using loading because a user could be authenticated, but we need to get that data from local storage
  if (loading) return (<Text>Loading...</Text>)

  return (
    <MainContainer windowWidth={windowWidth}>
      {externalToken ?
        <PhonePrompt externalToken={externalToken} resetExternalToken={() => { setExternalToken(undefined); }} />
        :
        user === undefined ?
          <UserNotAuthenticated setUser={setUser} setExternalToken={setExternalToken} />
          : <User userId={user!.userId} setUser={setUser} />
      }
    </MainContainer>
  )
};

export default ProfileScreen;