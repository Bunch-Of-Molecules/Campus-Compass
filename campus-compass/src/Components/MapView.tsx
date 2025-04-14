import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';
import axios from 'axios';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix marker paths in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const ClickHandler = ({ onClick }: { onClick: (latlng: L.LatLng) => void }) => {
    useMapEvents({
        click(e) {
            onClick(e.latlng);
        },
    });
    return null;
};

const MapView = ({ onLogout }: { onLogout: () => void }) => {
    const x = 26.5124;
    const y = 80.2334;

    const [position, setPosition] = useState<L.LatLng | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [form, setForm] = useState({ locname: '', review: '' });

    const handleSubmit = async () => {
        if (!position) return;

        if (form.locname === "") {
            alert('Please enter a name');
        } else {
            try {
                await axios.post('http://localhost:3000/locations', {
                    locname: form.locname,
                    latitude: position.lat,
                    longitude: position.lng,
                    review: form.review,
                });

                alert('Review added!');
                setShowDialog(false);
                setForm({ locname: '', review: '' });
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            {/* Logout button */}
            <button
                onClick={onLogout}
                style={{
                    position: 'absolute',
                    top: 55,
                    right: 12,
                    zIndex: 1000,
                    padding: '8px 12px',
                    backgroundColor: '#ff4d4d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                Logout
            </button>

            <MapContainer
                className="map-layer"
                center={[x, y]}
                zoom={17}
                style={{ height: '80vh' }}
                maxBounds={[[x - 0.01, y - 0.01], [x + 0.01, y + 0.015]]}
                maxBoundsViscosity={1.0}
                maxZoom={18}
                minZoom={16}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ClickHandler onClick={(latlng) => {
                    setPosition(latlng);
                    setShowDialog(true);
                }} />
                {position && (
                    <Marker position={position}>
                        <Popup>
                            {showDialog ? (
                                <div className='custom-popup'>
                                    <span>Review this place!</span>
                                    <input
                                        placeholder="Location name"
                                        style={{ backgroundColor: '#252422', color: 'white' }}
                                        value={form.locname}
                                        onChange={(e) => setForm({ ...form, locname: e.target.value })}
                                    />
                                    <textarea
                                        placeholder="Review"
                                        style={{ backgroundColor: '#252422', color: 'white' }}
                                        value={form.review}
                                        onChange={(e) => setForm({ ...form, review: e.target.value })}
                                    />
                                    <button onClick={handleSubmit}>Submit</button>
                                    <button onClick={() => setShowDialog(false)}>Cancel</button>
                                </div>
                            ) : (
                                <span>{form.locname}</span>
                            )}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default MapView;
