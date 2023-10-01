import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {

  weatherData!: WeatherData;
  cityName: string = 'New Delhi';

  constructor(private ws: WeatherService) {}

  private getWeatherData (cityName: string) {
    this.ws.getData(cityName)
    .subscribe({
      next: (response) => {
        this.weatherData = response;
        console.log(response);
      }
    })
  }
}
