import React, { useEffect, useState } from 'react';
import AlgoliaPlaces from 'algolia-places-react';

import Weather from '../components/Weather';
import Skycons from '../utils/skycons-master/skycons';

import '../static/css/reset.css';
import '../static/css/styles.css';
import '../static/css/ap-dropdown.css';

const Content = () => {
    const [location, setLocation] = useState('Vancouver');
    const [lat, setLat] = useState(49.2827);
    const [lng, setLng] = useState(123.1207);

    useEffect(() => {
        let skycons = new Skycons({"monochrome": false});
        skycons.add("navicon", "showers-day");
        skycons.play();
    }, [])
    // The second param is an array of variables the component will check to make sure its changed
    // before re-rendering
    // Putting nothing also ensures it runs once

    return (
        <>
            <AlgoliaPlaces
                placeholder="Write an address here"
                options={{
                    appId: 'plVVQ87U2ZPF',
                    apiKey: 'c35ecc9ab5dac235dd492ef0710c5537',
                    language: 'en',
                    type: 'city'
                    // Other options from https://community.algolia.com/places/documentation.html#options
                }}
                onChange={({ suggestion}) => {
                    console.log("suggestion", suggestion);
                    setLocation(suggestion.name);
                    setLat(suggestion.latlng.lat);
                    setLng(suggestion.latlng.lng);
                }}
                onError={({ message }) =>
                    console.log(
                        'Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.'
                    )}
            />
            <div className="flex justify-between">
                <p className="mt-4 text-xl">
                    Selected: <strong id="address-value">{location}</strong>
                </p>
                <div className="inline-flex mt-2">
                    <button
                        type="button"
                        id="hours"
                        className="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                    >
                        48-hrs
                    </button>
                    <button
                        type="button"
                        id="week"
                        className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                    >
                        7-days
                    </button>
                </div>
            </div>
            <Weather lat={lat} lng={lng} />
        </>
    );
}

export default Content;
