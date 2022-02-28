import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import MainContainer from '../components/mainContainer';
import UserContext from '../global/userContext';
import CreateAccount from '../components/user/createAccount';
import User from '../components/user/user';
import loadUserCredsFromLocal from '../global/localStorage';
import { IAuthUser } from '../types';

const ProfileScreen = () => {
  const windowWidth = useWindowDimensions().width;
  const [user, setUser] = useState<IAuthUser | undefined>(undefined);

  // useEffect(() => {
  //   // mounted is to make sure that we are not generating a warning
  //   // read more here: https://www.debuggr.io/react-update-unmounted-component/
  //   let mounted = true;
  //   async function fetUserCreds() {
  //     try {
  //       const json_value = await loadUserCredsFromLocal();
  //       if (json_value != null) setUser(JSON.parse(json_value) as IAuthUser);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   if (!user) fetUserCreds();
  //   return () => { mounted = false };
  // }, [])


  useEffect(() => {

    async function fetchUserCreds() {
      const creds = await loadUserCredsFromLocal();
      if (creds) setUser(creds);
    }

    fetchUserCreds();

    return () => {};
  }, [])
  console.log(user);

  return (
    <MainContainer windowWidth={windowWidth}>
      {user === undefined ? <CreateAccount setUser={setUser} /> : <User userId={user!.user_id} />}
    </MainContainer>
  )
};

export default ProfileScreen;