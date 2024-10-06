'use client';

import React, { useState } from 'react';

const OutputFields: React.FC = () => {
  const [outputs, setOutputs] = useState<{ label: string; value: string }[]>([
    { label: 'Cloud Coverage', value: '' },
    { label: 'Landsat 8 Next Overpass', value: '{DATETIME}' },
    { label: 'Landsat 9 Next Overpass', value: '{DATETIME}' },
    { label: 'Image Quality Rating', value: '{RATING}' },
    { label: 'Surface Reflectance', value: '{REFLECTANCE}' },
    { label: 'Surface Temperature', value: '{TEMPERATURE} degrees C/F' },
  ]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setOutputs(
      outputs.map((output) =>
        output.label === 'Cloud Coverage'
          ? { ...output, value: `${newValue}%` }
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
        <div key={index} style={{}}>
          {output.label === 'Cloud Coverage' ? (
            <>
              {output.label}:{' '}
              <input
                type='text'
                value={output.value.replace('%', '')}
                onChange={handleInputChange}
                style={{
                  width: '40px',
                  textAlign: 'right',
                  backgroundColor: '#f0f0f0',
                  borderRadius: 8,
                }}
              />
              %
            </>
          ) : (
            `${output.label}: ${output.value}`
          )}
        </div>
      ))}
    </div>
  );
};

export default OutputFields;
