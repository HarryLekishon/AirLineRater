import { Route, Switch } from "react-router";
import Airline from "./Airline/Airline";
import Airlines from "./Airlines/Airlines";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import React, { useEffect, useState } from "react";
import NavBar from "./Pages/NavBar";


function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch("/api/v1/me").then((r) => {
      if(r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login setUser={setUser} />;
  
  return (
    <>
    <NavBar user={user} setUser={setUser} />
      <Switch>

        <Route exact path="/">
          <Airlines user={user}/>
        </Route>

        <Route exact path="/airlines/:slug" >
          <Airline />
        </Route>

        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route exact path="/login">
          <Login setUser={setUser}/>
        </Route>

v   
      </Switch>
    </>
  );
}

export default App;
