import { useMemo } from 'react';
import { useAxios } from './hooks';

function App(): JSX.Element {

  const { data, error, loading } = useAxios({  method: 'get',url: 'https://rickandmortyapi.com/api/character'}  );

  console.log("data",data);
  return <></>;
}

export default App;
