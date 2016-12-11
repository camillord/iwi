/**
 * Created by Kamil on 22.10.2016.
 */

Plotly.d3.json('/Data/nodes.json', function (err, rows) {

    function getPersons(data, key) {
        return data.map(function (row) {
            if (row.type === 'person') {
                return row[key];
            }
        });
    }

    function getExpertise(data, key) {
        return data.map(function (row) {
            if (row.type === 'expertise') {
                return row[key];
            }
        });
    }

    function getNodes(data, key) {
        return [data.source[key], data.target[key]];
    }

    var data1 = {
        x: getPersons(rows[0], 'x'), y: getPersons(rows[0], 'y'), z: getPersons(rows[0], 'z'),
        mode: 'markers',
        marker: {
            size: 3,
            line: {
                color: 'rgba(217, 217, 217, 0.14)',
                width: 0.5
            },
            opacity: 0.8
        },
        type: 'scatter3d'
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
        type: 'scatter3d'
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
            }
        };
        data.push(edge)
    }

    var layout = {
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        }
    };
    Plotly.newPlot('plot', data, layout);
});
