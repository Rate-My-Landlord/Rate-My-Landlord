import { useContext } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import MainContainer from '../components/mainContainer';
import UserContext from '../global/userContext';
import CreateAccount from '../components/user/createAccount';
import User from '../components/user/user';

const ProfileScreen = () => {
  const windowWidth = useWindowDimensions().width;
  const { user, setUser } = useContext(UserContext);

  return (
    <MainContainer windowWidth={windowWidth}>
      {user === undefined ? <CreateAccount setUser={setUser} /> : <User />}
    </MainContainer>
  )
};

export default ProfileScreen;