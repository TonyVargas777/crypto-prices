import { useState, useEffect } from 'react'
import CryptoCard from './components/CryptoCard'
import './App.css'

function App() {
  const [cryptoData, setCryptoData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCryptoPrices = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h,7d,30d,1y'
      )
      
      if (!response.ok) {
        throw new Error('Error al obtener los datos')
      }
      
      const data = await response.json()
      
      const formattedData = data.map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        ath: coin.ath,
        change24h: coin.price_change_percentage_24h,
        change1w: coin.price_change_percentage_7d_in_currency,
        change1m: coin.price_change_percentage_30d_in_currency,
        change1y: coin.price_change_percentage_1y_in_currency,  
        image: coin.image // CoinGecko ya trae el logo
      }))
      
      setCryptoData(formattedData)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCryptoPrices()
    
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchCryptoPrices, 30000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando precios...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={fetchCryptoPrices}>Reintentar</button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>💰 Top 20 Criptomonedas</h1>     
      </header>
      
      <main className="crypto-grid">
        {cryptoData.map(crypto => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </main>
      
      <footer className="footer">
        <p>Datos proporcionados por CoinGecko API</p>
      </footer>
    </div>
  )
}

export default App