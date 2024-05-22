### Installation

```
npm i goca
```
## funcion
# useAxios
```
 const {data,error,loading} = useAxios({ method: 'get', url: '/endpoint', enabled: true })
 ```
  you want controler where de you ejecute:<br>
 ```
consy {data,error,loading,fetcher} = useAxios({ method: 'get', url: '/endpoint', enabled: true })
useEffect(()=>{
  fetcher()
},[])
 ```
 # useInterval
 ```
 useInterval(funcion,Time-delay)
 ```
 # useLocalstorage
 ```
 // do you want save value set Item
  useLocalstorage(key,errorHandler,value to local storage)
  //do you want get item
  const [value, _]= useLocalstorage(key,errorHandler)
  //update value
  const [value, updateValue]= useLocalstorage(key,errorHandler)
  updateValue(value to local storage) //the same key
 ```