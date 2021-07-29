# BenefitsWebApp

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#design">Design</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#FutureEnhancements">Future Enhancements</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project 

<img src="http://joshwhite.tech/img/BenefitsWebApp.png"
     alt="Benefits Web App"
     style="float: left; margin-right: 10px;" />
This Application could be used by HR Staff for determining Benefits costs for their employees. End Users have the capability to add new Employees and update existing ones, as well as adding & updating dependents attached to an Employee. 

Employee & Dependent Benefits costs are hardcoded, with Employee Benefits = $1000/year, and Dependent Benefits = $500/year. If either an Employee or Dependent's First name starts with an 'A', that individual receives a 10% discount.

You can also remove Employee's & Dependents in the App. Removing an Employee will also remove all Dependents attached to that Employee ID. 


### Built With

The Front End (SPA) of this Application was built with the following
* [Angular](https://angular.io/)
* [Angular Material](https://material.angular.io/)

The Back End (API) of this Application was built with the following
* [.NET Core 5](https://docs.microsoft.com/en-us/dotnet/core/dotnet-five)
* [Dapper](https://dapper-tutorial.net/dapper)
* [xUnit](https://xunit.net/)

The DB creation scripts can be found in the [DB folder](https://github.com/BroncoJosh/BenefitsWebApp/tree/main/Benefits%20App/DB). 

<!-- GETTING STARTED -->
## Getting Started

### Design
TODO

### Prerequisites
  The Following Software should be installed:
  * Visual Studio 
  * (optional for SPA) Visual Studio Code


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/BroncoJosh/BenefitsWebApp.git
   ```


<!-- USAGE EXAMPLES -->
## Usage
The Front End of the Application is currently hardcoded (in environment.ts) to fetch/push API requests to https://localhost:44352/api

The API portion of the Application is currently hardcoded to 
  - Allow localhost:4200 as an origin (in Startup.cs)
  - set the Database Connectionstring (LocalDB) in appsettings.json. Removed for commit

<!-- FUTURE ENHANCEMENTS -->
## FutureEnhancements
The Following were not added to the Application (due to timing constraints):
  - API testing for PUSH/POST/DELETE Calls in EmployeeController and Dependent Controller. 
    - This would have included having a TestHelper that created a test Employee & Dependent entry in their corresponding DB Tables
  - In depth testing of the HTTP requests in the Front End
  - In Depth documention for the API Controller Methods



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Josh White - [JoshWhite.tech](http://JoshWhite.tech) - joshuawhite1@u.boisestate.edu

