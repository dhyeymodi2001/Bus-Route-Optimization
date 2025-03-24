# Operations Analytics for Bus Route Optimization

[![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://img.shields.io/badge/Status-Active-brightgreen)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://img.shields.io/badge/License-MIT-blue)

## Overview

This project focuses on applying operations analytics to optimize bus route scheduling, addressing the challenges of urban public transportation systems. It leverages Linear Programming (LP) to develop a model that improves bus utilization, reduces operational costs, and enhances service quality.

The project is inspired by the research paper "Modeling and Analysis of Bus Scheduling Systems of Urban Public Bus Transport" by Eshetie Berhan, Dejene Mengistu, Berhanu Beshah, and Daniel Kitaw.

### Key Features

* **LP-Based Optimization:** Implements a Linear Programming model to determine the optimal number of buses required for each route and shift, minimizing operational costs and improving bus utilization.
* **Enhanced Model:** Includes additional factors beyond the base research paper to provide a more comprehensive and robust solution. (For example: Operating cost, Total fleet size, etc.)
* **API Integration:** Provides an API to seamlessly integrate the optimization model with external applications, such as the project website.
* **Website Integration:** A website is developed to provide user interface for interacting with the API and visualizing the optimized bus schedules.
* **Medium Article:** A Medium article provides a detailed explanation of the project's concepts and implementation: [Bus Route Optimization](https://medium.com/@dhyeymodi21/bus-route-optimization-7faceecafbac)

## Project Details

The project addresses the Vehicle Scheduling Problem (VSP), a branch of Vehicle Routing Problems (VRP), focusing on scheduling buses to trips based on passenger demand and resource availability.

### LP Model Formulation

The Linear Programming model aims to minimize the total number of trips required per route per shift:
Minimize ΣᵢΣⱼ (xᵢⱼ + yᵢⱼ)
Subject to constraints ensuring demand satisfaction, available bus trips, minimum trip requirements, and non-negativity.

Where:

* `i` = Route index
* `j` = Shift index
* `xᵢⱼ` = Number of trips made by bus type-I on route i at shift j
* `yᵢⱼ` = Number of trips made by bus type-II on route i at shift j
* Other parameters (Dᵢⱼ, Pᵢ, wⱼ, Tᵢⱼ) are defined in the research paper.

### Model Validation

The model's performance is validated by comparing it with existing bus scheduling systems using metrics such as:

* Bus utilization 
* Distance and trip coverage
* Operating costs
  
## Installation

To use this project, you'll need to have Python installed on your system, along with the OR-Tools library.

