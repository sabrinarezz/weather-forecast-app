import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  weatherData!: WeatherData;
  cityName: string = 'New Delhi';

  constructor(private ws: WeatherService) {
    this.getWeatherData(this.cityName);
  }

  private getWeatherData (cityName: string) {
    this.ws.getData(cityName)
    .subscribe({
      next: (response) => {
        this.weatherData = response;
        console.log(response);
      }
    })
  }

  onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }
}
