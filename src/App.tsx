import * as React from 'react'
import { Link, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Home from './componets/Home';
import Create from "./componets/customer/Create"
import EditCustomer from "./componets/customer/Edit"

class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/create'}>Create Customer</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/create'} exact component={Create} />
          <Route path={'/edit/:id'} exact component={EditCustomer} />
        </Switch>
      </div>
    )
  }
}


export default withRouter(App)