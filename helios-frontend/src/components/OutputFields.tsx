'use client';

import React, { useState } from 'react';

const OutputFields: React.FC = () => {
  const [outputs, setOutputs] = useState<{ label: string, value: string }[]>([
    { label: 'Cloud Coverage', value: '{VALUE}%' },
    { label: 'Landsat 8 Next Overpass', value: '{DATETIME}' },
    { label: 'Landsat 9 Next Overpass', value: '{DATETIME}' },
    { label: 'Image Quality Rating', value: '{RATING}' },
    { label: 'Surfance Reflectance', value: '{REFLECTANCE}' },
    { label: 'Surfance Temperature', value: '{TEMPERATURE} degrees C/F' },
  ]);

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
          {output.label}: {output.value}
        </div>
      ))}
    </div>
  );
};

export default OutputFields;