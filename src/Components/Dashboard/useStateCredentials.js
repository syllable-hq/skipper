import { useState, useEffect } from 'react';
import { getCredentials } from '../../utils';
import { USER_ID } from '../../constants';
import { logout } from '../../utils';

export default function useFetchCredential(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem(USER_ID);
    if (!userId) {
      logout();
      return;
    }
    props.db.getUserInfo(userId)
      .then(doc => {
        const credentials = getCredentials(doc.data().credentials);
        return setData(credentials);
      });
  }, []);
  return data;
}
