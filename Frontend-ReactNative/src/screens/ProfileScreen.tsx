import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import MainContainer from '../components/mainContainer';
import User from '../components/user/userProfile';
import UserNotAuthenticated from '../components/user/userNotAuthenticated';
import loadUserCredsFromLocal, { resetCreds } from '../global/localStorage';
import { IAuthUser } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParamList } from '../../App';
import PhonePrompt from '../components/user/phonePrompt';
import { UserContext } from '../global/userContext';

type Props = NativeStackScreenProps<NavParamList, "Profile">;

const ProfileScreen = ({ route, navigation }: Props) => {
  const windowWidth = useWindowDimensions().width;
  // const [user, setUser] = useState<IAuthUser | undefined>(undefined);
  const { user } = useContext(UserContext);
  // const [loading, setLoading] = useState<boolean>(true);
  const [externalToken, setExternalToken] = useState<String | undefined>(undefined);

  return (
    <MainContainer windowWidth={windowWidth}>
      {externalToken ?
        <PhonePrompt externalToken={externalToken} resetExternalToken={() => { setExternalToken(undefined); }} />
        :
        user === null ?
          <UserNotAuthenticated setExternalToken={setExternalToken} />
          : <User />
      }
    </MainContainer>
  )
};

export default ProfileScreen;