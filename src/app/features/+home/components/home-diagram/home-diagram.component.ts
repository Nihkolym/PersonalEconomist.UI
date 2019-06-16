import { Indication } from './../../models/indication.interface';
import { CounterService } from './../../services/counter.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { AppSettings } from 'src/app/core/settings';
import * as Chart from 'chart.js';
import { ICounter } from '../../models/counter.interface';
import { tap } from 'rxjs/operators';

function toCamelCase(key, value) {
  if (value && typeof value === 'object'){
    for (var k in value) {
      if (/^[A-Z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
        value[k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
        delete value[k];
      }
    }
  }
  return value;
}

@Component({
  selector: 'app-home-diagram',
  templateUrl: './home-diagram.component.html',
  styleUrls: ['./home-diagram.component.css']
})
export class HomeDiagramComponent implements OnInit {

  public counterConnection: HubConnection;
  public indicationConnection: HubConnection;

  public counters: ICounter[] = [];

  @ViewChild('lineChart') private chartRef: ElementRef;
  public chart: any;

  constructor(public counterService: CounterService) { }

  ngOnInit() {
    this.counterService.getAll().pipe(
      tap(c => {
        if (c.length) {
          this.createChart(c[0]);
        }
      })
    ).subscribe(c => this.counters = c);

    const builder = new HubConnectionBuilder();
    this.counterConnection = builder.withUrl(AppSettings.counterHubHost).build();
    this.indicationConnection = builder.withUrl(AppSettings.indicationHubHost).build();

    this.indicationConnection.on('AddIndication', (indicationJSON: string) => {
      if (indicationJSON) {
        const indication = JSON.parse(indicationJSON, toCamelCase);
        const counter = this.counters.find(c => c.id === indication.counterId);
        counter.indications.push(indication);

        this.createChart(counter);
      }
    });

    this.counterConnection.on('AddCounter', (message) => {

    });

    this.counterConnection.start();
    this.indicationConnection.start();
  }

  public createChart(counter: ICounter) {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: counter.indications.map(i => new Date(i.date).toLocaleTimeString()).sort(),
        datasets: [{
          label: `Spended per 30sec`,
          data: counter.indications.map(i => +i.value).sort((a, b) => a > b ? 1 : -1),
          fill: false,
          lineTension: 0.2,
          borderColor: 'black',
          borderWidth: 2,
          backgroundColor: ['black']
        }]
      },
      options: {
        title: {
          display: true,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
