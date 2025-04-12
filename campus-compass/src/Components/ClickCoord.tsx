import { useMapEvents, Popup, Marker } from 'react-leaflet';
import { useState } from 'react';

const ClickPopup = () => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });

    return position ? (
        <Marker position={position}>
            <Popup>
                <b>Coordinates:</b><br />
                Lat: {position[0].toFixed(5)} <br />
                Lng: {position[1].toFixed(5)}
            </Popup>
        </Marker>
    ) : null;
};

export default ClickPopup;
