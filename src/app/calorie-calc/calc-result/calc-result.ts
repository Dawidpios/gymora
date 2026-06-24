import { Component, computed, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-calc-result',
  imports: [ChartModule],
  templateUrl: './calc-result.html',
  styleUrl: './calc-result.scss',
})
export class CalcResult {
  calories = input<number>(0);

  get caloriesRounded() {
    return Math.round(this.calories());
  }
  getProteinOrCarbs() {
    return Math.round(Math.round(this.calories() * 0.3) / 4);
  }

  getFat() {
    return Math.round(Math.round(this.calories() * 0.3) / 9);
  }

  chartData = computed(() => ({
    labels: [`Protein ${this.getProteinOrCarbs()}g (${Math.round(this.calories() * 0.3)} kcal)`, `Carbohydrates ${this.getProteinOrCarbs()}g (${Math.round(this.calories() * 0.4)} kcal)`, `Fat ${this.getFat()}g (${Math.round(this.calories() * 0.3)} kcal)`],
    datasets: [
      {
        data: [
          Math.round(this.calories() * 0.3),
          Math.round(this.calories() * 0.4),
          Math.round(this.calories() * 0.3),
        ],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
        hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D'],
      },
    ],
  }));

  chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed} kcal`,
        },
      },
    },
  };
}
