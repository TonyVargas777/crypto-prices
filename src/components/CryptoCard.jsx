import './CryptoCard.css'

function CryptoCard({ crypto }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price)
  }

  const formatChange = (change) => {
    return change?.toFixed(2) || '0.00'
  }

  const getChangeClass = (change) => {
    if (change > 0) return 'positive'
    if (change < 0) return 'negative'
    return 'neutral'
  }

  return (
    <div className="crypto-card">
      <div className="crypto-header">
        <img src={crypto.image} alt={crypto.name} className="crypto-logo" />
        <div className="crypto-info">
          <h3 className="crypto-name">{crypto.name}</h3>
          <span className="crypto-symbol">{crypto.symbol}</span>
        </div>
      </div>
      
      <div className="crypto-price">
        <span className="price">{formatPrice(crypto.price)}</span>
      </div>
      
      <div className="crypto-changes">
  <div className={`crypto-change ${getChangeClass(crypto.change24h)}`}>
    <span className="change-label">24h:</span>
    <span className="change-value">
      {crypto.change24h > 0 ? '+' : ''}{formatChange(crypto.change24h)}%
    </span>
  </div>

  <div className={`crypto-change ${getChangeClass(crypto.change1w)}`}>
    <span className="change-label">1 Week:</span>
    <span className="change-value">
      {crypto.change1w > 0 ? '+' : ''}{formatChange(crypto.change1w)}%
    </span>
  </div>

  <div className={`crypto-change ${getChangeClass(crypto.change1m)}`}>
    <span className="change-label">1 Month:</span>
    <span className="change-value">
      {crypto.change1m > 0 ? '+' : ''}{formatChange(crypto.change1m)}%
    </span>
  </div>

  <div className={`crypto-change ${getChangeClass(crypto.change1y)}`}>
    <span className="change-label">1 Year:</span>
    <span className="change-value">
      {crypto.change1y > 0 ? '+' : ''}{formatChange(crypto.change1y)}%
    </span>
  </div>
</div>
      
      <div className="crypto-indicator">
        <div className={`indicator ${getChangeClass(crypto.change24h)}`}></div>
      </div>
    </div>
  )
}

export default CryptoCard