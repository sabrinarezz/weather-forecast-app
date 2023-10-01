import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getData (cityName: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(environment.weatherApiUrl, {
      headers: new HttpHeaders()
      .set(environment.XRapidApiHostLabel, environment.XRapidApiHostValue)
      .set(environment.XRapidApiKeyLabel, environment.XRapidApiKeyValue),
      params: new HttpParams()
      .set('q', cityName)
      .set('units', 'metric')
      .set('mode', 'json')
    })
  }

}
