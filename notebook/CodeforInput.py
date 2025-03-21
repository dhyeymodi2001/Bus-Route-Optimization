import csv

def read_bus_data_from_csv(filename):
    """
    Reads bus scheduling data from a CSV file, skipping the first two rows and three columns.

    Args:
        filename (str): The path to the CSV file.

    Returns:
        tuple: A tuple containing demand, trip_factors, and fleet_size.
               Returns None if there's an error reading the file.
    """
    demand = []
    trip_factors = []
    single_trip_travel_times = []

    try:
        with open(filename, 'r', newline='') as csvfile:
            reader = csv.reader(csvfile)

            # Skip the first two rows
            next(reader, None)
            next(reader, None)

            for row in reader:
                # Skip the first three columns
                data_row = row[3:]

                demand.append([int(data_row[0]), int(data_row[1]), int(data_row[2]), int(data_row[3])])
                trip_factors.append([int(data_row[4]), int(data_row[5]), int(data_row[6]), int(data_row[7])])
                single_trip_travel_times.append(int(data_row[8]))

            return demand, trip_factors, single_trip_travel_times

    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None

# Example usage:
filename = "bus_dataset.csv"
data = read_bus_data_from_csv(filename)

if data:
    demand, trip_factors, single_trip_travel_times = data
    print("Demand:", demand)
    print("Trip Factors:", trip_factors)
    print("Single Trip Travel Times:", single_trip_travel_times)
else:
    print("Error reading data from CSV file.")