import { useDebounce } from "./hooks/useDebounce";


function App(): JSX.Element {
  
function hola() {
  console.log("hola");
  
}

  return <>
    <button onClick={useDebounce(hola,1000)}>Click</button>
  </>;
}

export default App;
