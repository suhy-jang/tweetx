import { gql } from '@apollo/client';
import { useEffect } from 'react';
import client from './apolloClient';

const WAKE_UP_QUERY = gql`
  {
    __typename
  }
`;

function WakeUpServer() {
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await client.query({ query: WAKE_UP_QUERY });
      } catch (error) {
        console.error('Error waking up server:', error);
      }
    };

    wakeUpServer();
  }, []);

  return <></>;
}

export default WakeUpServer;
