import { useContext } from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import MainContainer from '../components/mainContainer';
import UserContext from '../global/userContext';

const ProfileScreen = () => {
  const windowWidth = useWindowDimensions().width;
  const { user, setUser } = useContext(UserContext);

  return (
    <MainContainer windowWidth={windowWidth}>
      {user === undefined ? <Text>Not logged in/ no account</Text> : <Text>Logged in</Text>}
    </MainContainer>
  )
};

export default ProfileScreen;