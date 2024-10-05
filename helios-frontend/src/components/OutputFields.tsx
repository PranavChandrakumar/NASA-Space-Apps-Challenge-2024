'use client';

import React, { useState } from 'react';

const OutputFields: React.FC = () => {
  const [outputs, setOutputs] = useState<string[]>(Array(5).fill(''));

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
          Output Box {index + 1}: {output}
        </div>
      ))}
    </div>
  );
};

export default OutputFields;