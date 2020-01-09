import React from 'react';
import UserList from './components/userList';
import UserCreate from './components/userCreate';
import UserEdit from './components/userEdit';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/users' component={UserList}/>
          <Route path='/usercreate' component={UserCreate} />
          <Route path='/useredit/:id' component={UserEdit}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
