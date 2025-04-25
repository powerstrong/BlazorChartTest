// wwwroot/js/chartInterop.js

let uplot;
export const chartInterop = {
    initChart: function () {
        const opts = {
            title: "실시간 로봇 데이터",
            width: 800,
            height: 400,
            series: [
                {},
                {
                    label: "값",
                    stroke: "blue"
                }
            ],
            axes: [
                {},
                {
                    values: (u, vals) => vals.map(v => v.toFixed(2)),
                }
            ]
        };

        const data = [
            [], // x
            []  // y
        ];

        uplot = new uPlot(opts, data, document.getElementById("chart"));
    },
    addPoint: function (x, y) {
        if (!uplot) return;

        uplot.data[0].push(x);
        uplot.data[1].push(y);

        if (uplot.data[0].length > 500) {
            uplot.data[0].shift();
            uplot.data[1].shift();
        }

        uplot.setData(uplot.data);
    }
};
