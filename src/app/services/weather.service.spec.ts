import { TestBed } from '@angular/core/testing';
import { WeatherData } from '../models/weather.model';
import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.development';
// import { HttpClient } from '@angular/common/http';

describe('WeatherService', () => {
  // let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
    // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // service = new WeatherService(httpClientSpy);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve weather data for a given city', () => {
    const cityName = 'New Delhi';

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

    service.getData(cityName).subscribe((data: WeatherData) => {
      expect(data).toEqual(mockWeatherData);
    });

    const req = httpMock.expectOne(`${environment.weatherApiUrl}?q=New%20Delhi&units=metric&mode=json`);
    expect(req.request.method).toBe('GET');

    req.flush(mockWeatherData);
  });

  it('should handle error response gracefully', () => {
    const city = 'NonExistentCity';

    service.getData(city).subscribe(
      (data: WeatherData) => {
        expect(true).toBe(false);
      },
      (error) => {
        expect(error.status).toBe(404);
        expect(error.error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(`${environment.weatherApiUrl}?q=${city}&units=metric&mode=json`);
    expect(req.request.method).toBe('GET');

    req.error(new ErrorEvent('Network error'), { status: 404 });
  });

  it('should handle an empty response gracefully', () => {
    const cityName = 'EmptyCity';
    const emptyResponse = {};

    service.getData(cityName).subscribe(
      (data: WeatherData) => {
        expect(false).toBe(false);
      },
      (error) => {
        expect(error.status).toBe(200);
        expect(error.error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(`${environment.weatherApiUrl}?q=${cityName}&units=metric&mode=json`);
    expect(req.request.method).toBe('GET');

    req.flush(emptyResponse);
  });
});
