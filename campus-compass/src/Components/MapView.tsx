import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
//L is a JS object, all customisations done here

import ClickPopup from './ClickCoord.tsx';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
//importing

// Fix marker paths in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapView = () => {
    const x = 26.5124;
    const y = 80.2334;

    return (
        <MapContainer className="mapLayer"
            center={[x, y]}
            zoom={17}
            style={{ height: '80vh' }}

            maxBounds={[[x-0.01, y-0.01],[x+0.01, y+0.015]]}
            maxBoundsViscosity={1.0}

            maxZoom={18}
            minZoom={16}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickPopup />
        </MapContainer>
    );
};

export default MapView;
