import ReactDOM from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'

import App from './App'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
)
