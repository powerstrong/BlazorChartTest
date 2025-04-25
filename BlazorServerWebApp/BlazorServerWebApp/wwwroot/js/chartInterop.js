let chartMap = {};
let count = 0;
let limit = 3000;

export const chartInterop = {
    initChart: function (id, strokeColor="red") {
        const opts = {
            title: id,
            width: 600,
            height: 300,
            series: [
                {},
                {
                    label: "값",
                    stroke: strokeColor,
                    points: { show: false },
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

        const target = document.getElementById(id);
        if (!target) return;

        chartMap[id] = {
            uplot: new uPlot(opts, data, target),
            data: data
        };
    },

    addPoint: function (id, x, y) {
        const entry = chartMap[id];
        if (!entry) return;

        entry.data[0].push(x);
        entry.data[1].push(y);

        if (count < limit) {
            count++;
        }
        else {
            entry.data[0].shift();
            entry.data[1].shift();
        }

        entry.uplot.setData(entry.data);
    }
};
