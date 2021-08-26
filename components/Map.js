import ReactMapGL,{ Marker,Popup } from 'react-map-gl';
import {useState} from "react";
import getCenter from 'geolib/es/getCenter';
function Map({searchResults}) {
    const [selectedLocation,setSelectedLocation]=useState({});
    
    //transform the search result object into latitude longitude object
    const coordinates=searchResults.map(result=>({
        longitude:result.long,
        latitude:result.lat,
    }))
    const center=getCenter(coordinates);
    const [viewport,setViewport]=useState({
        width:'100%',
        height:'100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 8
    })
    return (
        <ReactMapGL
        mapStyle="mapbox://styles/asimmaharjan/ckssl4qlh37ic17o78sd77fe7"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport)=>setViewport(nextViewport)

        }
        >
            {searchResults.map(result=>(
                <div key={result.long}>
                    <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                    >
                    <p role="img" className="cursor-pointer text-2xl animate-bounce" onClick={()=>setSelectedLocation(result)}
                    aria-label="push-pin">
                        📌
                    </p>
                    </Marker>
                    {/*this is the pop up that should show if pin is clicked*/}
                    {selectedLocation.long === result.long ? (
                        <Popup
                        onClose={()=>setSelectedLocation({})}
                        closeOnClick={true}
                        latitude={result.lat}
                        longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ):(false)}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
