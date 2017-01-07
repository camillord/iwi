/**
 * Created by Kamil on 22.10.2016.
 */

Plotly.d3.json('/Data/nodes.json', function (err, rows) {

    var myPlot = document.getElementById('plot');

    function getPersons(data, key) {
        return data.map(function (row) {
            if (row.type === 'person') {
                if (key === 'name') {
                    return row[key]
                }
                else {
                    return Math.round(row[key] * 1000000) / 1000000;
                }
            }

        });
    }

    function getExpertise(data, key) {
        return data.map(function (row) {
            if (row.type === 'expertise') {
                if (key === 'name') {
                    return row[key]
                }
                else {
                    return Math.round(row[key] * 1000000) / 1000000;
                }
            }
        });
    }

    function getNodes(data, key) {
        return [Math.round(data.source[key] * 1000000) / 1000000, Math.round(data.target[key] * 1000000) / 1000000];
    }

    var data1 = {
        x: getPersons(rows[0], 'x'), y: getPersons(rows[0], 'y'), z: getPersons(rows[0], 'z'),
        mode: 'markers',
        marker: {
            size: 8,
            line: {
                color: 'rgba(217, 217, 217, 0.14)',
                width: 0.5
            },
            opacity: 0.8
        },
        type: 'scatter3d',
        text: getPersons(rows[0], 'name'),
        hoverinfo: 'name+text',
        name: 'Person'
    };
    var data2 = {
        x: getExpertise(rows[0], 'x'), y: getExpertise(rows[0], 'y'), z: getExpertise(rows[0], 'z'),
        mode: 'markers',
        marker: {
            color: 'rgb(127, 127, 127)',
            size: 5,
            symbol: 'circle',
            line: {
                color: 'rgb(204, 204, 204)',
                width: 1
            },
            opacity: 0.9
        },
        text: getExpertise(rows[0], 'name'),
        type: 'scatter3d',
        hoverinfo: 'name+text',
        name: 'Expertise'
    };
    var edges = [];
    var data = [data1, data2];

    for (var i = 0; i < rows[1].length; i++) {

        var edge = {
            type: 'scatter3d',
            mode: 'lines',
            x: getNodes(rows[1][i], 'x'),
            y: getNodes(rows[1][i], 'y'),
            z: getNodes(rows[1][i], 'z'),
            opacity: 1,
            line: {
                width: 1,
                color: 'red',
                reversescale: false
            },
            hoverinfo: 'name',
            name: 'Connection'
        };
        data.push(edge)
    }

    var layout = {
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        },
        showlegend: false
    };

    Plotly.newPlot('plot', data, layout);

    myPlot.on('plotly_click', function (eventData) {
        var point = eventData.points[0];

        if (point.data.marker) {
            point = {
                x: point.data.x[point.pointNumber],
                y: point.data.y[point.pointNumber],
                z: point.data.z[point.pointNumber],
            }
        } else if (point.data.line) {
            point.data.line.width = 5;
        }

        for (var i = 2; i < data.length; i++) {

            if (data[i].x[0] == point.x) {
                data[i].line.width = 5;
                data[i].line.color = 'blue';
            }
            else if (data[i].x[1] == point.x && data[i].y[1] == point.y && data[i].z[1] == point.z) {
                data[i].line.width = 5;
                data[i].line.color = 'blue';
            }
            else {
                data[i].line.width = 1;
                data[i].line.color = 'red';
            }
        }

        Plotly.animate('plot', {
            data: data,
            traces: [0],
            layout: layout
        }, {
            transition: {
                duration: 500,
                ease: 'cubic-in-out'
            }
        })
    });
});
