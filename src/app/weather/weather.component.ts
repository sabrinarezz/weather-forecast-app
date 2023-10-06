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
  errorMessage: string | null = null;

  constructor(private ws: WeatherService) {
    this.getWeatherData(this.cityName);
  }

  private getWeatherData (cityName: string) {
    this.ws.getData(cityName)
    .subscribe({
      next: (response) => {
        this.weatherData = response;
        this.errorMessage = null;
        console.log(response);
      },
      error: (error) => {
        // this.weatherData = null;
        this.errorMessage = "City Not Found !";
        console.error(error);
      }
    })
  }

  onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }
}
