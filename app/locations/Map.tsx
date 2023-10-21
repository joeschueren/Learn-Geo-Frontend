import React,{useState, useEffect} from "react";
import { MapContainer, TileLayer, TileLayerProps, MapContainerProps, GeoJSON, GeoJSONProps} from 'react-leaflet';


type props = {
  handleClick: Function;
}

const Map: React.FC<props> = React.memo(function(props){

    function handleCountryClick(e: any){
        const countryInfo = e.target.feature.properties
        
        props.handleClick(JSON.stringify(countryInfo.admin));
        e.stopPropogation;
    }

    const [geoJSONData, setGeoJSONData]: [any, any] = useState(null);

  useEffect(() => {
    fetch("https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_map_subunits.geojson")
      .then((response) => response.json())
      .then((data) => {
        setGeoJSONData(data);
      });
  }, []);

  let numColored = 0
  function styleFunction(){
    let colors = ["#32a852", "#e0322f", "#a22fe0", "#e0822f", "#e0e02f", "#467ce8"];
    let fill = colors[numColored];

    numColored++;
    if(numColored === colors.length){
        numColored = 0;
    }
    return{
        fillColor: fill,
        color: "gray",
        weight: .5,
        fillOpacity: 1
    }

  }

  interface MapProps extends MapContainerProps{
    center: number[],
    zoom: number,
    style: object,
    maxBounds: number[][]
  }

  const mapProps: MapProps = {center:[0, 0],
   zoom: 2,
  style: { height: '100%', width: '100%', backgroundColor: "#c1f3f5"},
  maxBounds: [[-90, -300], [90, 300]]}

  interface GeoProps extends GeoJSONProps{
    data: any,
    style: Function,
    onEachFeature: Function
  }

  const geoProps: GeoProps = {data: geoJSONData,
  style: styleFunction,
  onEachFeature: (feature: any, layer:any) => {
    layer.on({
      click: handleCountryClick,
    });
  }}

  interface TileProps extends TileLayerProps{
    url: string,
    maxZoom: number;
  }

  const tileProps: TileProps = {url: "",
  maxZoom: 10
}

  if(geoJSONData === null){
    return(<div className="loading-div"><h1 className="loading">Loading...</h1></div>)
}
    else return(
      <div className="map-container">
        <div className="map">
      <MapContainer {...mapProps}>
        <TileLayer {...tileProps}/>
        <GeoJSON {...geoProps}/>
      </MapContainer>
    </div>
    </div>
    );
})

export default Map;


