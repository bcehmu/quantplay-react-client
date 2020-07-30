import React from 'react'
import CardStock from './Card'
import ApiGet from '../ApiGet'

export default function Watchlist() {
    const { series, seriesVolume, companyName, ticker, description, stats } = ApiGet('aapl', '2019-01-01', '2019-12-31')
    return (
        <div>
            <CardStock series={series} seriesVolume={seriesVolume} companyName={companyName} ticker={ticker} description={description} stats={stats}/>
            <CardStock series={series} seriesVolume={seriesVolume} companyName={companyName} ticker={ticker} description={description} stats={stats} />
            <CardStock series={series} seriesVolume={seriesVolume} companyName={companyName} ticker={ticker} description={description} stats={stats} />
        </div>
    )
}
