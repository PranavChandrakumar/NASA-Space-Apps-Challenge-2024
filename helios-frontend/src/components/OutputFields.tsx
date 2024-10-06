'use client';

import React, { useState } from 'react';

const OutputFields: React.FC = () => {
  const [outputs, setOutputs] = useState<{ label: string, value: string }[]>([
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
    setOutputs(outputs.map(output => 
      output.label === 'Cloud Coverage' ? { ...output, value: `${newValue}%` } : output
    ));
  };

  const handleButtonClick = () => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
  };

  return (
    <div style={{ borderWidth: 1, borderColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ margin: '10px', padding: '10px', border: '1px solid black', width: '30vw', textAlign: 'center' }}>
        <label>EarthData Username: </label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={{ width: '200px', marginBottom: '10px', borderRadius: 8 }} 
        />
      </div>
      <div style={{ margin: '10px', padding: '10px', border: '1px solid black', width: '30vw', textAlign: 'center' }}>
        <label>EarthData Password: </label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '200px', marginBottom: '10px', borderRadius: 8 }} 
        />
        </div>
      <div>
      <a href="https://urs.earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer" style={{ margin: '10px', padding: '10px', color: 'blue', textDecoration: 'underline' }}>
        Make an EarthData account
      </a>
        <button onClick={handleButtonClick} style={{ margin: '10px', padding: '10px', borderRadius: 8, backgroundColor: '#F9C74F'}}>
          Enter
        </button>
      </div>
      {outputs.map((output, index) => (
        <div
          key={index}
          style={{
            margin: '10px',
            padding: '10px',
            border: '1px solid black',
            width: '30vw',
            textAlign: 'center'
          }}
        >
          {output.label === 'Cloud Coverage' ? (
            <>
              {output.label}: <input type="text" value={output.value.replace('%', '')} onChange={handleInputChange} style={{ width: '40px', textAlign: 'right', backgroundColor: '#f0f0f0', borderRadius: 8}} />%
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