import { useState, useEffect } from 'react';
import { getCredentials } from '../../utils';
import { USER_ID } from '../../constants';

export default  function useFetchCredential(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem(USER_ID)
    props.db.getUserInfo(userId)
    .then(doc => {
      const credentials = getCredentials(doc.data().credentials);
      return setData(credentials);
    });
  }, []);
  return data;
}
