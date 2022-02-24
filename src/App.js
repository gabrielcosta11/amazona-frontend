import { BrowserRouter, Route, Switch } from "react-router-dom";

import { PrivateRoute } from "./pages/components/PrivateRoute.jsx";
import {AdminRoute} from "./pages/components/AdminRoute.jsx"
import { Footer } from "./pages/components/Header&Footer/index.jsx";

import {Product} from "./pages/Product/index.jsx"
import {Home} from "./pages/Home/index.jsx"
import {Cart} from "./pages/Cart/index.jsx"
import {SignIn} from './pages/SignIn/index.jsx'
import {Register} from './pages/Register/index.jsx'
import {Shipping} from './pages/Shipping/index.jsx'
import {Payment} from './pages/Payment/index.jsx'
import {OrderCompleted} from './pages/OrderCompleted/index.jsx'
import {OrderHistory} from './pages/OrderHistory/index.jsx'
import {OrderDetails} from './pages/OrderDetails/index.jsx'
import {Profile} from './pages/Profile/index.jsx'
import {ProductList} from './pages/ProductList/index.jsx'
import {ProductEdit} from './pages/ProductEdit/index.jsx'
import {OrderList} from './pages/OrderList/index.jsx'
import {Search} from './pages/Search/index.jsx'

function App() {
  return (
    <>
      <script src="https://sdk.mercadopago.com/js/v2"></script>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/product/:id" component={Product} exact/>
          <Route path="/cart/:id?" component={Cart}/>
          <Route path="/sign-in" component={SignIn}/>
          <Route path="/register" component={Register}/>
          <Route path="/shipping" component={Shipping}/>
          <Route path="/payment" component={Payment}/>
          <Route path="/order-completed" component={OrderCompleted}/>
          <Route path="/order-history" component={OrderHistory}/>
          <Route path="/order-details/:id" component={OrderDetails}/>
          <PrivateRoute path="/profile" component={Profile}/>
          <AdminRoute path="/product-list" component={ProductList}/>
          <AdminRoute path="/product/:id/edit" component={ProductEdit}/>
          <AdminRoute path="/order-list" component={OrderList}/>
          <Route path="/search/name/:name?" component={Search}/>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
