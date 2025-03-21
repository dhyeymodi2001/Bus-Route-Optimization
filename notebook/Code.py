from ortools.linear_solver import pywraplp


def bus_scheduling_optimization(demand, trip_factors, fleet_size):
    solver = pywraplp.Solver.CreateSolver('SCIP')

    num_routes = len(demand)
    num_shifts = len(demand[0])

    # Decision variables
    x = {}  # Bus type-I trips
    y = {}  # Bus type-II trips
    for i in range(num_routes):
        for j in range(num_shifts):
            x[i, j] = solver.IntVar(0, solver.infinity(), f'x[{i},{j}]')
            y[i, j] = solver.IntVar(0, solver.infinity(), f'y[{i},{j}]')

    # Objective function: Minimize total trips
    solver.Minimize(solver.Sum(x[i, j] + y[i, j] for i in range(num_routes) for j in range(num_shifts)))

    # Constraints
    for i in range(num_routes):
        for j in range(num_shifts):
            solver.Add(60 * x[i, j] + 90 * y[i, j] >= demand[i][j])  # Demand constraint
            solver.Add(x[i, j] <= fleet_size[0] * trip_factors[i][j])  # Bus type-I availability
            solver.Add(y[i, j] <= fleet_size[1] * trip_factors[i][j])  # Bus type-II availability

    # Fleet constraints
    solver.Add(sum(x[i, j] for i in range(num_routes) for j in range(num_shifts)) <= fleet_size[0])
    solver.Add(sum(y[i, j] for i in range(num_routes) for j in range(num_shifts)) <= fleet_size[1])

    # Solve model
    status = solver.Solve()

    if status == pywraplp.Solver.OPTIMAL:
        print("Optimal solution found!")
        for i in range(num_routes):
            for j in range(num_shifts):
                print(
                    f'Route {i + 1}, Shift {j + 1}: Bus Type-I Trips = {x[i, j].solution_value()}, Bus Type-II Trips = {y[i, j].solution_value()}')
    else:
        print("No optimal solution found.")


# Example synthetic data
demand = [[4126, 1650, 825, 1444], [3497, 1399, 699, 1224], [11030, 4412, 2206, 3860], [1212, 606 ,1060 ,151]
          , [1534 ,767 ,1342 ,192]]  # Demand for 2 routes, 4 shifts
trip_factors = [[7, 12, 8, 3], [4, 7, 5, 2], [4, 7, 5, 2], [3, 5, 3, 1], [4 ,8 ,5, 2]]  # Trips per shift for each route
fleet_size = [600, 90]  # Fleet size for Bus type-I and II

bus_scheduling_optimization(demand, trip_factors, fleet_size)
