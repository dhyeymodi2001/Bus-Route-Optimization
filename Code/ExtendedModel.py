from ortools.linear_solver import pywraplp

demand = [
    [2000, 1800, 1600, 1400],  # Route 1 demand across 4 shifts
    [1500, 1300, 1100, 900],   # Route 2 demand
    [2200, 2000, 1800, 1600]   # Route 3 demand
]

trip_factors = [
    [10, 9, 8, 7],
    [8, 7, 6, 5],
    [12, 11, 10, 9]
]

fleet_size = [300, 60]  # Fleet size for bus types I and II
min_trips_per_shift = [10, 12, 8, 6]
cost = [100, 150]  # Cost per trip for Type-I and Type-II buses


def bus_scheduling_min_cost(demand, trip_factors, fleet_size, min_trips_per_shift, cost):
    solver = pywraplp.Solver.CreateSolver('SCIP')

    num_routes = len(demand)
    num_shifts = len(demand[0])

    x = {}
    y = {}
    for i in range(num_routes):
        for j in range(num_shifts):
            x[i, j] = solver.IntVar(0, solver.infinity(), f'x[{i},{j}]')
            y[i, j] = solver.IntVar(0, solver.infinity(), f'y[{i},{j}]')

    # Objective: Minimize total operating cost
    solver.Minimize(solver.Sum((cost[0] * x[i, j]) + (cost[1] * y[i, j]) for i in range(num_routes) for j in range(num_shifts)))

    # Constraints:
    for i in range(num_routes):
        for j in range(num_shifts):
            solver.Add(60 * x[i, j] + 90 * y[i, j] >= demand[i][j])  # Demand satisfaction
            solver.Add(x[i, j] <= fleet_size[0] * trip_factors[i][j])  # Fleet availability (Type-I)
            solver.Add(y[i, j] <= fleet_size[1] * trip_factors[i][j])  # Fleet availability (Type-II)

    solver.Add(solver.Sum(x[i, j] for i in range(num_routes) for j in range(num_shifts)) <= fleet_size[0])
    solver.Add(solver.Sum(y[i, j] for i in range(num_routes) for j in range(num_shifts)) <= fleet_size[1])

    # Minimum trips per shift:
    for j in range(num_shifts):
        solver.Add(solver.Sum(x[i, j] + y[i, j] for i in range(num_routes)) >= min_trips_per_shift[j])

    status = solver.Solve()

    if status == pywraplp.Solver.OPTIMAL:
        print("Optimal solution found!")
        print(f"Total operating cost: {solver.Objective().Value()}")
        for i in range(num_routes):
            for j in range(num_shifts):
                print(f'Route {i + 1}, Shift {j + 1}: Type-I Trips = {x[i, j].solution_value()}, Type-II Trips = {y[i, j].solution_value()}')
    else:
        print("No optimal solution found.")

bus_scheduling_min_cost(demand, trip_factors, fleet_size, min_trips_per_shift, cost)