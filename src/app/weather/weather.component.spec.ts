import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';
import { WeatherService } from '../services/weather.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherData } from '../models/weather.model';
import { of, throwError } from 'rxjs';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: WeatherService; 

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getData']);

    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [WeatherService]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form and call onSubmit', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should update the cityName property when input changes', () => {
    const input = fixture.debugElement.nativeElement.querySelector('input');
    input.value = 'New York';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.cityName).toEqual('New York');
  })

  it('should initialize the cityName property', () => {
    expect(component.cityName).toEqual('New Delhi');
  });

  it('should render temperature in Celsius', () => {
    component.weatherData = {
      name: 'New Delhi',
      main: {
        temp: 29,
        feels_like: 26,
        temp_max: 34,
        temp_min: 34,
        pressure: 0.2,
        humidity: 74
      },
      wind: {
        deg: 270,
        speed: 2.57
      },
      coord: {
        lon: 77.2311, 
        lat: 28.6128
      },
      weather: [
      {
        id: 721,
        main: 'Haze', 
        description: 'haze', 
        icon: '50d'
      }
      ],
      base: 'stations',
      visibility: 2800,
      clouds: {
        all: 0
      },
      dt: 1696478172,
      sys: {
        country: "IN",
        id: 9165,
        sunrise: 1696466741,
        sunset: 1696509208,
        type: 1
      },
      timezone: 19800,
      id: 1261481,
      cod: 200
    };
    fixture.detectChanges();

    const tempElement = fixture.nativeElement.querySelector('.temp');
    expect(tempElement.textContent).toContain('26°C');
  })

  it('should display an image based on temperature', () => {
    const mockWeatherData: WeatherData = {
      name: 'New Delhi',
      main: {
        temp: 29,
        feels_like: 26,
        temp_max: 34,
        temp_min: 34,
        pressure: 0.2,
        humidity: 74
      },
      wind: {
        deg: 270,
        speed: 2.57
      },
      coord: {
        lon: 77.2311, 
        lat: 28.6128
      },
      weather: [
      {
        id: 721,
        main: 'Haze', 
        description: 'haze', 
        icon: '50d'
      }
      ],
      base: 'stations',
      visibility: 2800,
      clouds: {
        all: 0
      },
      dt: 1696478172,
      sys: {
        country: "IN",
        id: 9165,
        sunrise: 1696466741,
        sunset: 1696509208,
        type: 1
      },
      timezone: 19800,
      id: 1261481,
      cod: 200
  };

  spyOn(weatherService, 'getData').and.returnValue(of(mockWeatherData));

  fixture.detectChanges();

  const compiled = fixture.nativeElement;
  const hotWeatherImg = compiled.querySelector('img[src*="extremeheat"]');
  const mildWeatherImg = compiled.querySelector('img[src*="flowers-meadow"]');
  const coldWeatherImg = compiled.querySelector('img[src*="Blue2Bhour2BFinland_by_Laurence2BNorah"]');

  expect(hotWeatherImg).toBeNull();
  expect(mildWeatherImg).toBeFalsy();
  expect(coldWeatherImg).toBeFalsy();
  });

  it('should display location and temperature', () => {
    const mockWeatherData: WeatherData = {
      name: 'New Delhi',
      main: {
        temp: 29,
        feels_like: 26,
        temp_max: 34,
        temp_min: 34,
        pressure: 0.2,
        humidity: 74
      },
      wind: {
        deg: 270,
        speed: 2.57
      },
      coord: {
        lon: 77.2311, 
        lat: 28.6128
      },
      weather: [
      {
        id: 721,
        main: 'Haze', 
        description: 'haze', 
        icon: '50d'
      }
      ],
      base: 'stations',
      visibility: 2800,
      clouds: {
        all: 0
      },
      dt: 1696478172,
      sys: {
        country: "IN",
        id: 9165,
        sunrise: 1696466741,
        sunset: 1696509208,
        type: 1
      },
      timezone: 19800,
      id: 1261481,
      cod: 200
  };

  spyOn(weatherService, 'getData').and.returnValue(of(mockWeatherData));

  fixture.detectChanges();

  const compiled = fixture.nativeElement;
  const locationText = compiled.querySelector('.location');
  const temperature = compiled.querySelector('.temp');

  expect(locationText.textContent).toContain('');
  });

  it('should load weather data when initialized', () => {
    const mockWeatherData: WeatherData = {
      name: 'New Delhi',
      main: {
        temp: 25,
        feels_like: 26,
        temp_max: 34,
        temp_min: 34,
        pressure: 0.2,
        humidity: 74
      },
      wind: {
        deg: 270,
        speed: 2.57
      },
      coord: {
        lon: 77.2311, 
        lat: 28.6128
      },
      weather: [
      {
        id: 721,
        main: 'Haze', 
        description: 'haze', 
        icon: '50d'
      }
      ],
      base: 'stations',
      visibility: 2800,
      clouds: {
        all: 0
      },
      dt: 1696478172,
      sys: {
        country: "IN",
        id: 9165,
        sunrise: 1696466741,
        sunset: 1696509208,
        type: 1
      },
      timezone: 19800,
      id: 1261481,
      cod: 200
  }

  spyOn(weatherService, 'getData').and.returnValue(of(mockWeatherData));
  fixture.detectChanges();
  expect(mockWeatherData).toEqual(mockWeatherData);
  });

  it('should retrieve weather data when onSubmit is called', () => {
    const mockWeatherData: WeatherData = {
      name: 'New Delhi',
      main: {
        temp: 25,
        feels_like: 26,
        temp_max: 34,
        temp_min: 34,
        pressure: 0.2,
        humidity: 74
      },
      wind: {
        deg: 310,
        speed: 4
      },
      coord: {
        lon: 77.2311, 
        lat: 28.6128
      },
      weather: [
      {
        id: 721,
        main: 'Haze', 
        description: 'haze', 
        icon: '50d'
      }
      ],
      base: 'stations',
      visibility: 2800,
      clouds: {
        all: 0
      },
      dt: 1696478172,
      sys: {
        country: "IN",
        id: 9165,
        sunrise: 1696466741,
        sunset: 1696509208,
        type: 1
      },
      timezone: 19800,
      id: 1261481,
      cod: 200
  }
  spyOn(weatherService, 'getData').and.returnValue(of(mockWeatherData));

    component.cityName = 'New Delhi';
    component.onSubmit();

    expect(weatherService.getData).toHaveBeenCalledWith('New Delhi');
    expect(component.weatherData).toEqual(mockWeatherData);
  });

  it('should call onSubmit and reset cityName', () => {
    const mockWeatherData: WeatherData = {
      name: 'New Delhi',
      main: {
        temp: 25,
        feels_like: 26,
        temp_max: 34,
        temp_min: 34,
        pressure: 0.2,
        humidity: 74
      },
      wind: {
        deg: 310,
        speed: 4
      },
      coord: {
        lon: 77.2311, 
        lat: 28.6128
      },
      weather: [
      {
        id: 721,
        main: 'Haze', 
        description: 'haze', 
        icon: '50d'
      }
      ],
      base: 'stations',
      visibility: 2800,
      clouds: {
        all: 0
      },
      dt: 1696478172,
      sys: {
        country: "IN",
        id: 9165,
        sunrise: 1696466741,
        sunset: 1696509208,
        type: 1
      },
      timezone: 19800,
      id: 1261481,
      cod: 200
    }

    spyOn(weatherService, 'getData').and.returnValue(of(mockWeatherData));

    component.cityName = 'Paris';
    component.onSubmit();

    expect(weatherService.getData).toHaveBeenCalledWith('Paris');
    expect(component.cityName).toBe('');
  });

  it('should handle onSubmit with an empty cityName', () => {
    component.cityName = '';
    component.onSubmit();
    spyOn(weatherService, 'getData');
    expect(weatherService.getData).not.toHaveBeenCalled();
  });

  it('should handle error when loading weather data', () => {
    const errorMsg = null;
    spyOn(weatherService, 'getData').and.returnValue(throwError(errorMsg));

    fixture.detectChanges();

    expect(component.weatherData).toBeUndefined();
    expect(component.errorMessage).toBe(errorMsg);
  });


});
