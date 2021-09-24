import './piechart.scss'

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color1, color2){
    // Создание градиента для заливки
    let gradient
    if (color2) {
        gradient = ctx.createLinearGradient(centerX, centerY,centerX, centerY+radius);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
    } else {
        gradient = color1
    }

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

class Piechart {
    constructor(canvas, data, colors, holeSize) {
        this.canvas = canvas;
        this.doughnutHoleSize = Math.min(this.canvas.width, this.canvas.height) * holeSize;
        this.ctx = this.canvas.getContext("2d");
        this.colors = colors;
        this.data = new Map(Object.entries(data));
    }

    drow() {
        this.totalValue = 0
        for (let value of this.data.values()) {
            this.totalValue += value[1]
        }

        let centerX = this.canvas.width/2
        let centerY = this.canvas.height/2
        let radius = Math.min(this.canvas.width, this.canvas.height)/2

        let startAngle = -Math.PI / 2;
        for (let [key, value] of this.data) {
            let endAngle = 2 * Math.PI * value[1] / this.totalValue
            // Рисуем кусочки круга
            drawPieSlice(
                this.ctx,
                centerX,
                centerY,
                radius,
                startAngle + 0.04,
                startAngle+endAngle - 0.04,
                this.colors[key][0],
                this.colors[key][1],
            )
            // Разделители белого цвета
            drawPieSlice(
                this.ctx,
                centerX,
                centerY,
                radius,
                startAngle - 0.04,
                startAngle + 0.04,
                '#ffffff',
            )
            startAngle += endAngle
        }
        // Рисуем дырку для doughnut chart
        if (this.doughnutHoleSize !== 0) {
            drawPieSlice(
                this.ctx,
                centerX,
                centerY,
                this.doughnutHoleSize/2,
                0,
                2*Math.PI,
                '#ffffff',
            )
        }
        let legend = document.querySelector('.piechart__legend')
        let arr = []
        let ul = document.createElement('ul')
        ul.classList.add('piechart__legend-list');
        for (let [key, value] of this.data){
            let li = document.createElement('li')
            li.classList.add('piechart__legend-item')
            li.classList.add(`piechart__legend-item--${key}`)
            li.textContent = value[0]
            arr.push(li)
        }
        for (let i = arr.length - 1; i >= 0; i--){
            ul.appendChild(arr[i])
        }

        legend.appendChild(ul);

        this.ctx.fillStyle = "#BC9CFF";
        this.ctx.font = "normal 2rem Montserrat";
        this.ctx.fillText(this.totalValue+"", this.canvas.width/2-25, this.canvas.height/2);
        this.ctx.font = "normal 1.25rem Montserrat";
        this.ctx.fillText("голосов", this.canvas.width/2-35, this.canvas.height/2+15);
    }

}

let canvas = document.querySelector(".piechart__canvas");
if (canvas) {
    canvas.width = 120;
    canvas.height = 120;
    const impressionsRating = {
        // Я не могу прокинуть эти данные в
        // js файл piechart, поэтому копировал их сюда
        '5': ['Великолепно', 130],
        '4': ['Хорошо', 70],
        '3': ['Удовлетворительно', 60],
        '2': ['Разочарован', 0],
    }

    let colors = {
        '5': ['#FFE39C', '#FFBA9C'],
        '4': ['#6FCF97', '#66D2EA'],
        '3': ['#BC9CFF', '#8BA4F9'],
        '2': ['#909090', '#3D4975'],
    }
    let piechart = new Piechart(canvas, impressionsRating, colors, 0.9)
    piechart.drow()
}





