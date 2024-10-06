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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setOutputs(outputs.map(output => 
      output.label === 'Cloud Coverage' ? { ...output, value: `${newValue}%` } : output
    ));
  };

  return (
    <div style={{ borderWidth: 1, borderColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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