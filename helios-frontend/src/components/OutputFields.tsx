'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import gameIcon from '../app/game-icons_hot-surface.png';
import iCtwotone from '../app/ic_twotone-hd.png';
import satellite1 from '../app/openmoji_satellite-1.png';
import satellite from '../app/openmoji_satellite.png';
import solarCloud from '../app/solar_clouds-bold.png';
import solarTemp from '../app/solar_temperature-bold-duotone.png';

const OutputFields: React.FC = () => {
  const [outputs, setOutputs] = useState<{ label: string; value: string }[]>([
    { label: 'Cloud Coverage', value: '', image: solarCloud },
    { label: 'Landsat 8 Next Overpass', value: '{DATETIME}', image: satellite },
    {
      label: 'Landsat 9 Next Overpass',
      value: '{DATETIME}',
      image: satellite1,
    },
    { label: 'Image Quality Rating', value: '{RATING}', image: iCtwotone },
    { label: 'Surface Reflectance', value: '{REFLECTANCE}', image: gameIcon },
    {
      label: 'Surface Temperature',
      value: '{TEMPERATURE} degrees C/F',
      image: solarTemp,
    },
  ]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const cloudCoverageOptions = [
    'No Preference',
    'Low Coverage',
    'Up to Medium Coverage',
    'All Coverage Data',
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setOutputs(
      outputs.map((output) =>
        output.label === 'Cloud Coverage'
          ? { ...output, value: newValue }
          : output
      )
    );
  };

  const handleButtonClick = () => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'start',
        alignItems: 'start',
        height: '85vh',
        flex: '1',
        padding: '0px 15px',
      }}
    >
      <div>
        <div
          style={{
            fontSize: '3em',
            fontWeight: 'bold',
            textAlign: 'start',
            color: '#EDE9D5',
            lineHeight: '1',
          }}
        >
          Helios.
        </div>
        <div
          style={{
            color: '#6D6875',
            fontWeight: '500',
          }}
        >
          want to detect surface reflections?
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          padding: '10px 0px',
          gap: '15px',
          width: '100%',
        }}
      >
        <label
          style={{
            color: '#EDE9D5',
            fontWeight: 'bold',
          }}
        >
          EarthData Username:{' '}
        </label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            flex: '1',
            padding: '10px 20px',
            borderRadius: 8,
            backgroundColor: '#f0f0f0',
            marginLeft: 10,
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          padding: '10px 0px',
          gap: '15px',
          width: '100%',
        }}
      >
        <label
          style={{
            color: '#EDE9D5',
            fontWeight: 'bold',
          }}
        >
          EarthData Password:{' '}
        </label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            flex: '1',
            padding: '10px 20px',
            borderRadius: 8,
            backgroundColor: '#f0f0f0',
            marginLeft: 10,
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <a
          href='https://urs.earthdata.nasa.gov/'
          target='_blank'
          rel='noopener noreferrer'
          style={{
            color: 'white',
            textDecoration: 'underline',
          }}
        >
          Make an EarthData account
        </a>
        <button
          onClick={handleButtonClick}
          style={{
            width: '100px',
            margin: '10px',
            padding: '10px',
            borderRadius: 8,
            backgroundColor: '#F9C74F',
          }}
        >
          Enter
        </button>
      </div>
      {outputs.map((output, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            width: '100%',
          }}
        >
          {/* Image for the output */}
          <Image
            src={output.image}
            alt={output.label}
            style={{ width: '40px', height: '40px', marginRight: '10px' }}
          />

          {/* Divs for label and value */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                color: '#EDE9D5',
                marginBottom: '5px',
              }}
            >
              {output.label}:
            </div>
            <div style={{ color: '#6D6875', fontSize: '0.9em' }}>
              {output.label === 'Cloud Coverage' ? (
                <select
                  value={output.value}
                  onChange={handleInputChange}
                  style={{
                    width: '200px',
                    textAlign: 'right',
                    backgroundColor: '#f0f0f0',
                    borderRadius: 8,
                    padding: '10px',
                  }}
                >
                  {cloudCoverageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                `${output.value}`
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OutputFields;
