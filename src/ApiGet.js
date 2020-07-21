import moment from "moment"
import { Collection, TimeSeries, TimeEvent, IndexedEvent, TimeRange } from "pondjs"

import aapl from "./sampleJSON.json"

// fetch data from tiingo api
function ApiGet(symbol, dateStr1, dateStr2) {
    const fetch = require("node-fetch")
    const tiingoString = "https://api.tiingo.com/tiingo/daily/" + symbol + "/prices?startDate=" + dateStr1 + "&endDate=" + dateStr2 + "&format=json&&token=cb0fa4bee45c5b25e4b7cdc1c74b3e54dd75720e"
    const tiingoMeta = "https://api.tiingo.com/tiingo/daily/" + symbol + "?token=cb0fa4bee45c5b25e4b7cdc1c74b3e54dd75720e"
    
    // save returned data as an object, example as in sampleJSON file
    let temp = null


    // uncomment this part to call real api, or use sampleJSON.json to test and save extra api calls
    // let apiRes = fetch(tiingoString)
    //     .then(data => {return data.json()})
    //     .then(res => {
    //                     // console.log(res)
    //                     temp = res       
    //         })
    //     .catch(er => {console.log(er)})

    // meta info such as description could be acquired
    // let apiMeta = fetch(tiingoMeta)
    //     .then(data => {return data.json()})
    //     .then(res => {console.log(res.description)})
    //     .catch(err => {console.log(err)})


    // building timeseries
    import stockSeries from "./sampleJSON.json" // sample in tiingo format for test
    // const stockSeries = temp // fetch from tiingo api

    // to series as a TimeSeries of (close)price info
    const name = symbol
    const columns = ["time", "close"]
    const events = stockSeries.map(item => {
        const timestamp = moment(new Date(item.date))
        const { close } = item
        return new TimeEvent(timestamp.toDate(), {
            close: +close
        })
    })
    const collection = new Collection(events)
    const sortedCollection = collection.sortByTime()
    const series = new TimeSeries({ name, columns, collection: sortedCollection })
    
    // to seriesVolumn as a TimeSeries of volumn info
    const volumeEvents = stockSeries.map(item => {
        const timestamp = moment(new Date(item.date))
        const { close } = item
        return new TimeEvent(timestamp.toDate(), {
            close: +close
        })
    })
    const volumeCollection = new Collection(volumeEvents);
    const sortedVolumeCollection = volumeCollection.sortByTime()
    const seriesVolume = new TimeSeries({
        name: "Volume",
        utc: false,
        collection: sortedVolumeCollection
    })

    return {'series': series, 'seriesVolume': seriesVolume}
    // to call the chart component, use the following code in other components
    // const ele = <PriceVol series={series} seriesVolume={seriesVolume} />
}

export default ApiGet