import './App.css';
import { useEffect,useState } from 'react'
import jwt_decode from 'jwt-decode'

function App() {
  const [user, setUser] = useState({})

  function handleCallBackResponse(response){
   // console.log(response.credential)
    var userObject = jwt_decode(response.credential)
    console.log(userObject.name)
    setUser(userObject)
    document.getElementById("signInDev").hidden = true
  }

  function handleSignOut(event){
    setUser({})
    document.getElementById("signInDev").hidden = false
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "671148825231-j075pkmvnn85lrugprbrq6n47vp0cqdj.apps.googleusercontent.com",
      callback: handleCallBackResponse
    })
    google.accounts.id.renderButton(document.getElementById("signInDev"),
    {theme:"outline", size:"large"})
    
  },[])

  
  return (
    <div className="App">
      <div id="signInDev"></div>
      <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      {(() => { 
        if(user.name){
          return(<div>
            <img src='https://lh3.googleusercontent.com/a/ALm5wu0krHygIlOZw6Ce9sWUmfI92BV2v7D1RKnBQDAG3p4=s96-c'></img>
            <h3>{user.name}</h3>
          </div> )
        }else{
          return (<h1>Logged Out</h1>)
        }
       })()}
    </div>
  );
}

export default App;
