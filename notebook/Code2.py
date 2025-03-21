from flask import Flask, request, jsonify
import csv
from ortools.linear_solver import pywraplp
import io

app = Flask(__name__)

def read_bus_data_from_csv(csv_data):
    """Reads bus scheduling data from CSV data (string)."""
    demand = []
    trip_factors = []
    single_trip_travel_times = []

    try:
        csv_reader = csv.reader(io.StringIO(csv_data))

        next(csv_reader, None)
        next(csv_reader, None)

        for row in csv_reader:
            data_row = row[3:]
            demand.append([int(data_row[0]), int(data_row[1]), int(data_row[2]), int(data_row[3])])
            trip_factors.append([int(data_row[4]), int(data_row[5]), int(data_row[6]), int(data_row[7])])
            single_trip_travel_times.append(int(data_row[8]))

        return demand, trip_factors, single_trip_travel_times

    except Exception as e:
        return None, None, None

def bus_scheduling_optimization(demand, trip_factors, fleet_size, shift_durations, single_trip_travel_times):
    solver = pywraplp.Solver.CreateSolver('SCIP')
    num_routes = len(demand)
    num_shifts = len(demand[0])
    Tij = [[shift_durations[j] / single_trip_travel_times[i] for j in range(num_shifts)] for i in range(num_routes)]
    wj = [duration / 30 for duration in shift_durations]
    total_daily_demand = sum(sum(route_demand) for route_demand in demand)
    Pi = [sum(route_demand) / total_daily_demand for route_demand in demand]
    x = {}
    y = {}
    for i in range(num_routes):
        for j in range(num_shifts):
            x[i, j] = solver.IntVar(0, solver.infinity(), f'x[{i},{j}]')
            y[i, j] = solver.IntVar(0, solver.infinity(), f'y[{i},{j}]')
    solver.Minimize(solver.Sum(x[i, j] + y[i, j] for i in range(num_routes) for j in range(num_shifts)))
    for i in range(num_routes):
        for j in range(num_shifts):
            solver.Add(60 * x[i, j] + 90 * y[i, j] >= demand[i][j])
            solver.Add(x[i, j] <= fleet_size[0] * trip_factors[i][j])
            solver.Add(y[i, j] <= fleet_size[1] * trip_factors[i][j])
            solver.Add(x[i, j] <= fleet_size[0] * Tij[i][j])
            solver.Add(y[i, j] <= fleet_size[1] * Tij[i][j])
    solver.Add(sum(x[i, j] for i in range(num_routes) for j in range(num_shifts)) <= fleet_size[0])
    solver.Add(sum(y[i, j] for i in range(num_routes) for j in range(num_shifts)) <= fleet_size[1])
    for j in range(num_shifts):
        solver.Add(sum(x[i, j] + y[i, j] for i in range(num_routes)) >= wj[j])
    solver.Add(sum(Pi) == 1)
    status = solver.Solve()

    if status == pywraplp.Solver.OPTIMAL:
        results = []
        for i in range(num_routes):
            for j in range(num_shifts):
                results.append({
                    'route': i + 1,
                    'shift': j + 1,
                    'bus_type_i_trips': x[i, j].solution_value(),
                    'bus_type_ii_trips': y[i, j].solution_value()
                })
        total_bus_type_i_trips = sum(x[i, j].solution_value() for i in range(num_routes) for j in range(num_shifts))
        total_bus_type_ii_trips = sum(y[i, j].solution_value() for i in range(num_routes) for j in range(num_shifts))
        return {
            'optimal': True,
            'results': results,
            'total_bus_type_i_trips': total_bus_type_i_trips,
            'total_bus_type_ii_trips': total_bus_type_ii_trips,
            'trip_proportions': Pi,
            'minimum_shift_trips': wj,
            'trip_factors_tij': Tij
        }
    else:
        return {'optimal': False}

@app.route('/optimize', methods=['POST'])
def optimize_bus_schedule():
    try:
        csv_file = request.files['csv_file']
        csv_data = csv_file.read().decode('utf-8')

        demand, trip_factors, single_trip_travel_times = read_bus_data_from_csv(csv_data)

        if not demand:
            return jsonify({'error': 'Invalid CSV data'}), 400

        fleet_size = [600, 90]
        shift_durations = [480, 480, 480, 480]

        result = bus_scheduling_optimization(demand, trip_factors, fleet_size, shift_durations, single_trip_travel_times)

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)