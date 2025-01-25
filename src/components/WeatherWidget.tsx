import { getPreferredUnitOfMeasurement } from '../utils';
import styled from 'styled-components';
import { Grid2 } from '@mui/material';
import {
  Air,
  Cloud,
  CloudDownload,
  Thermostat,
  Visibility,
  Water,
  WbSunny,
  WbTwilight,
} from '@mui/icons-material';

interface WeatherWidgetProps {
  city: string;
  info: {
    temperature: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    pressure: number;
    visibility: number;
    windSpeed: number;
    sunrise: string;
    sunset: string;
    clouds: number;
    country: string;
    // rain?: number;
    // snow?: number;
  };
}

export default function WeatherWidget({ city, info }: WeatherWidgetProps) {
  const degrees = `°${getPreferredUnitOfMeasurement() === 'imperial' ? 'F' : 'C'}`;

  return (
    <section>
      <article>
        <PageTitle>
          {city} ({info.country})
        </PageTitle>
        <Grid2 container display="flex" alignItems="stretch">
          <StyledGrid padding="16px" size={6}>
            <TemperatureWrapper>
              <PanelTitle>Temperature</PanelTitle>
              <Grid2
                size={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="50px"
              >
                <div>
                  <Temperature>
                    <Thermostat color="warning" />
                    {info.temperature} <small>{degrees}</small>
                  </Temperature>
                  <Secondary>
                    Feels like
                    <span>
                      {info.feelsLike} <small>{degrees}</small>
                    </span>
                  </Secondary>
                </div>
                <div>
                  <Secondary>
                    Max
                    <span>
                      <StyledThermostatIcon color="error" />
                      {info.tempMax} <small>{degrees}</small>
                    </span>
                  </Secondary>
                  <Secondary>
                    Min
                    <span>
                      <StyledThermostatIcon color="info" />
                      {info.tempMin} <small>{degrees}</small>
                    </span>
                  </Secondary>
                </div>
              </Grid2>
            </TemperatureWrapper>
          </StyledGrid>
          <StyledGrid padding="16px" size={6}>
            <div>
              <PanelTitle>Other conditions</PanelTitle>
              <Grid2
                size={12}
                display="flex"
                gap="30px"
                justifyContent="center"
              >
                <Secondary>
                  Humidity
                  <span>
                    <StyledHumidityIcon color="info" />
                    {info.humidity}
                    <small>%</small>
                  </span>
                </Secondary>
                <Secondary>
                  Atm. Pressure
                  <span>
                    <StyledPressureIcon />
                    {info.pressure} <small>hPa</small>
                  </span>
                </Secondary>
              </Grid2>
              <Grid2
                size={12}
                display="flex"
                gap="30px"
                justifyContent="center"
              >
                <Secondary>
                  Visibility
                  <span>
                    <StyledVisibilityIcon />
                    {info.visibility / 1000}
                    <small>km</small>
                  </span>
                </Secondary>
                <Secondary>
                  Wind speed
                  <span>
                    <StyledAirIcon color="info" />
                    {info.windSpeed}{' '}
                    <small>
                      {getPreferredUnitOfMeasurement() === 'imperial'
                        ? 'mph'
                        : 'm/s'}
                    </small>
                  </span>
                </Secondary>
              </Grid2>
            </div>
          </StyledGrid>
          <StyledGrid size={12}>
            <div>
              <Secondary>
                Cloudiness
                <span>
                  <Cloud color="info" />
                  {info.clouds}
                  <small>%</small>
                </span>
              </Secondary>
              <Secondary>
                Sunrise{' '}
                <span>
                  <WbSunny color="warning" />
                  {info.sunrise}
                </span>
              </Secondary>
              <Secondary>
                Sunset{' '}
                <span>
                  <WbTwilight color="warning" />
                  {info.sunset}
                </span>
              </Secondary>
            </div>
          </StyledGrid>
        </Grid2>
      </article>
    </section>
  );
}

const PageTitle = styled.h1`
  font-size: 30px;
  font-weight: 100;
`;

const PanelTitle = styled.h2`
  font-weight: 100;
`;

const TemperatureWrapper = styled.div`
  //height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 8px;
`;

const Temperature = styled.p`
  font-size: 38px;
  margin: 0;
  text-align: left;
`;

const Secondary = styled.p`
  font-size: 16px;
  text-align: center;

  display: flex;
  flex-basis: 50%;
  flex-direction: column;
  margin: 8px 0;

  color: #444;

  span {
    color: #111;
    font-size: 21px;
  }
`;

const StyledGrid = styled(Grid2)`
  background-image: linear-gradient(120deg, #a1c4fd60 0%, #c2e9fb60 100%);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const StyledThermostatIcon = styled(Thermostat)`
  position: relative;
  top: 4px;
  font-size: 21px;
`;

const StyledAirIcon = styled(Air)`
  position: relative;
  top: 4px;
  font-size: 21px;
`;

const StyledVisibilityIcon = styled(Visibility)`
  position: relative;
  top: 3px;
  margin-right: 3px;
  font-size: 19px;
`;

const StyledHumidityIcon = styled(Water)`
  position: relative;
  top: 3px;
  margin-right: 3px;
  font-size: 21px;
`;

const StyledPressureIcon = styled(CloudDownload)`
  position: relative;
  top: 3px;
  margin-right: 4px;
  font-size: 18px;
`;
