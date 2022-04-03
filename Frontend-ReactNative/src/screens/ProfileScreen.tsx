import { useState, useContext } from 'react';
import MainContainer from '../components/containers/mainContainer';
import User from '../components/user/userProfile';
import UserNotAuthenticated from '../components/user/userNotAuthenticated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParamList } from '../../App';
import PhonePrompt from '../components/user/phonePrompt';
import { UserContext } from '../global/userContext';

type Props = NativeStackScreenProps<NavParamList, "Profile">;

const ProfileScreen = ({ route, navigation }: Props) => {
  const { user } = useContext(UserContext);
  const [externalToken, setExternalToken] = useState<String | undefined>(undefined);

  return (
    <MainContainer>
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