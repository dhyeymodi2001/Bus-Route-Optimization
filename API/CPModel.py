from ortools.sat.python import cp_model

def bus_scheduling_optimization_cp(demand, trip_factors, fleet_size):
    model = cp_model.CpModel()

    num_routes = len(demand)
    num_shifts = len(demand[0])

    # Decision variables
    x = {}  # Bus type-I trips
    y = {}  # Bus type-II trips
    for i in range(num_routes):
        for j in range(num_shifts):
            x[i, j] = model.NewIntVar(0, max(fleet_size[0] * trip_factors[i][j], int(demand[i][j]/60) +1), f'x[{i},{j}]')
            y[i, j] = model.NewIntVar(0, max(fleet_size[1] * trip_factors[i][j], int(demand[i][j]/90) +1), f'y[{i},{j}]')

    # Objective function: Minimize total trips
    model.Minimize(sum(x[i, j] + y[i, j] for i in range(num_routes) for j in range(num_shifts)))

    # Constraints
    for i in range(num_routes):
        for j in range(num_shifts):
            model.Add(60 * x[i, j] + 90 * y[i, j] >= demand[i][j])  # Demand constraint
            model.Add(x[i, j] <= fleet_size[0] * trip_factors[i][j])  # Bus type-I availability
            model.Add(y[i, j] <= fleet_size[1] * trip_factors[i][j])  # Bus type-II availability

    # Fleet constraints
    model.Add(sum(x[i, j] for i in range(num_routes) for j in range(num_shifts)) <= fleet_size[0])
    model.Add(sum(y[i, j] for i in range(num_routes) for j in range(num_shifts)) <= fleet_size[1])

    # Solve model
    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        print("Optimal solution found!")
        for i in range(num_routes):
            for j in range(num_shifts):
                print(
                    f'Route {i + 1}, Shift {j + 1}: Bus Type-I Trips = {solver.Value(x[i, j])}, Bus Type-II Trips = {solver.Value(y[i, j])}')
    else:
        print("No optimal solution found.")

def bus_scheduling_optimization_cp_with_min_trips(demand, trip_factors, fleet_size, min_trips_per_shift):
    model = cp_model.CpModel()

    num_routes = len(demand)
    num_shifts = len(demand[0])

    # Decision variables
    x = {}  # Bus type-I trips
    y = {}  # Bus type-II trips
    for i in range(num_routes):
        for j in range(num_shifts):
            x[i, j] = model.NewIntVar(0, max(fleet_size[0] * trip_factors[i][j], int(demand[i][j]/60) +1), f'x[{i},{j}]')
            y[i, j] = model.NewIntVar(0, max(fleet_size[1] * trip_factors[i][j], int(demand[i][j]/90) +1), f'y[{i},{j}]')

    # Objective function: Minimize total trips
    model.Minimize(sum(x[i, j] + y[i, j] for i in range(num_routes) for j in range(num_shifts)))

    # Constraints
    for i in range(num_routes):
        for j in range(num_shifts):
            model.Add(60 * x[i, j] + 90 * y[i, j] >= demand[i][j])  # Demand constraint
            model.Add(x[i, j] <= fleet_size[0] * trip_factors[i][j])  # Bus type-I availability
            model.Add(y[i, j] <= fleet_size[1] * trip_factors[i][j])  # Bus type-II availability

    # Fleet constraints
    model.Add(sum(x[i, j] for i in range(num_routes) for j in range(num_shifts)) <= fleet_size[0])
    model.Add(sum(y[i, j] for i in range(num_routes) for j in range(num_shifts)) <= fleet_size[1])

    # Minimum trip constraints
    for j in range(num_shifts):
        model.Add(sum(x[i, j] + y[i, j] for i in range(num_routes)) >= min_trips_per_shift[j]) #correct line

    # Solve model
    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        print("Optimal solution found!")
        for i in range(num_routes):
            for j in range(num_shifts):
                print(
                    f'Route {i + 1}, Shift {j + 1}: Bus Type-I Trips = {solver.Value(x[i, j])}, Bus Type-II Trips = {solver.Value(y[i, j])}')
    else:
        print("No optimal solution found.")

# Example synthetic data
demand = [[4126, 1650, 825, 1444], [3497, 1399, 699, 1224], [11030, 4412, 2206, 3860]]  # Demand for 3 routes, 4 shifts
trip_factors = [[7, 12, 8, 3], [4, 7, 5, 2], [4, 7, 5, 2]]  # Trips per shift for each route
fleet_size = [600, 90]  # Fleet size for Bus type-I and II
min_trips_per_shift = [10, 15, 8, 5]  # minimum trips for each shift.

print("Original code output (CP):")
bus_scheduling_optimization_cp(demand, trip_factors, fleet_size)
print("\nModified code output (CP, with min trips):")
bus_scheduling_optimization_cp_with_min_trips(demand, trip_factors, fleet_size, min_trips_per_shift)