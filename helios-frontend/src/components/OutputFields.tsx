'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import gameIcon from '../app/game-icons_hot-surface.png';
import iCtwotone from '../app/ic_twotone-hd.png';
import satellite1 from '../app/openmoji_satellite-1.png';
import satellite from '../app/openmoji_satellite.png';
import solarCloud from '../app/solar_clouds-bold.png';

const OutputFields: React.FC = () => {
  const [outputs, setOutputs] = useState<{ label: string; value: string; image: string }[]>([
    { label: 'Cloud Coverage', value: '', image: solarCloud },
    { label: 'Landsat 8 Next Overpass', value: '{DATETIME}', image: satellite },
    {
      label: 'Landsat 9 Next Overpass',
      value: '{DATETIME}',
      image: satellite1,
    },
    { label: 'Image Quality Rating', value: '{RATING}', image: iCtwotone },
    { label: 'Surface Reflectance', value: '{REFLECTANCE}', image: gameIcon },
  ]);

  const [startYear, setStartYear] = useState<number>(2010);
  const [startMonth, setStartMonth] = useState<string>('May');
  const [startDay, setStartDay] = useState<number>(17);
  const [endYear, setEndYear] = useState<number>(2014);
  const [endMonth, setEndMonth] = useState<string>('May');
  const [endDay, setEndDay] = useState<number>(17);

  const calculateDateDifference = (): number => {
    const startDate = new Date(
      startYear,
      new Date(`${startMonth} 1`).getMonth(),
      startDay
    );
    const endDate = new Date(
      endYear,
      new Date(`${endMonth} 1`).getMonth(),
      endDay
    );
    const timeDifference = endDate.getTime() - startDate.getTime();
    const yearsDifference = timeDifference / (1000 * 3600 * 24 * 365.25);
    return Math.floor(yearsDifference);
  };

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
    setOutputs(
      outputs.map((output) => ({
        ...output,
        value: 'processing...', // Replace with the desired new value
      }))
    );
    setTimeout(() => {
      setOutputs(
        outputs.map((output) => {
          switch (output.label) {
            case 'Cloud Coverage':
              return { ...output, value: 'Updated Coverage' };
            case 'Landsat 8 Next Overpass':
              return { ...output, value: 'Thursday, Oct 17, 2024' };
            case 'Landsat 9 Next Overpass':
              return { ...output, value: 'Wednesday, Oct 9, 2024' };
            case 'Image Quality Rating':
              return { ...output, value: '22280' };
            case 'Surface Reflectance':
              return { ...output, value: '0.9759' };
            case 'Surface Temperature':
              return { ...output, value: 'Updated Temperature' };
            default:
              return output;
          }
        })
      );
    }, 240000)
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
        overflowY: 'auto',
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
      <div>
        <div>
          <div
            style={{
              fontWeight: '600',
              color: '#D9D9D9',
              marginBottom: '5px',
            }}
          >
            Retroactive Data Collection (Default)
          </div>
          <div
            style={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              padding: '10px 0px',
            }}
          >
            <div>
              <input
                type='checkbox'
                style={{
                  width: '25px',
                  height: '25px',
                  marginRight: '10px',
                }}
              />
            </div>
            <div style={{ lineHeight: '1', color: '#fff' }}>
              Future Data Collection
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              marginBottom: '10px',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            Select a time frame:
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type='number'
                value={startYear}
                onChange={(e) => setStartYear(Number(e.target.value))}
                style={{ width: '80px', padding: '10px', textAlign: 'center' }}
                placeholder='Year'
              />
              <select
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                style={{ width: '100px', padding: '10px' }}
              >
                {[
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <input
                type='number'
                value={startDay}
                onChange={(e) => setStartDay(Number(e.target.value))}
                style={{ width: '50px', padding: '10px', textAlign: 'center' }}
                placeholder='Day'
              />
            </div>
            <div style={{ color: '#fff' }}>TO</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type='number'
                value={endYear}
                onChange={(e) => setEndYear(Number(e.target.value))}
                style={{ width: '80px', padding: '10px', textAlign: 'center' }}
                placeholder='Year'
              />
              <select
                value={endMonth}
                onChange={(e) => setEndMonth(e.target.value)}
                style={{ width: '100px', padding: '10px' }}
              >
                {[
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <input
                type='number'
                value={endDay}
                onChange={(e) => setEndDay(Number(e.target.value))}
                style={{ width: '50px', padding: '10px', textAlign: 'center' }}
                placeholder='Day'
              />
            </div>
          </div>
          <div style={{ marginTop: '10px', fontSize: '10px', color: '#fff' }}>
            You are requesting data for:{' '}
            <strong>{calculateDateDifference()} Years</strong>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px' }}>
            For Future Data Collection Select The Location On the Map & Press
            Set Location
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
              Set Email:
            </label>
            <input
              type='email'
              style={{
                flex: '1',
                padding: '10px 20px',
                borderRadius: 8,
                border: '2px solid #EDE9D5',
                backgroundColor: 'transparent',
                marginLeft: 10,
                color: '#fff',
              }}
            />
          </div>
          <button
            onClick={handleButtonClick}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 8,
              backgroundColor: '#F9C74F',
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutputFields;