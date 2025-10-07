// To show weather properly, generate OpenWeather's API key
// and start application as following:
//
// export VITE_WEATHER_API_KEY=your_api_key && npm run dev       // For Linux/macOS Bash
// ($env:VITE_WEATHER_API_KEY="your_api_key") -and (npm run dev) // For Windows PowerShell
// set "VITE_WEATHER_API_KEY=your_api_key" && npm run dev        // For Windows cmd.exe

import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)