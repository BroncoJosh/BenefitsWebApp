using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;


namespace EmployeeBenefits_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(ILogger<EmployeeController> logger)
        {
            _logger = logger;
        }
        
        //Returns a list of all Employees (only Employee ID, First & Last Name)
        [HttpGet]
        [Route("GetEmployeeList")]
        public IActionResult GetEmployeeList()
        {
            
            string EmployeeListSql = "select EmployeeId, FirstName, LastName, SalaryAmount from dbo.EmployeeInformation";
            var EmployeeResults = UtilityMethods.QuerySql<Employee>(EmployeeListSql
                                        , null
                                        , null
                                        , null
                                        );

            string DependentListSql = "select EmployeeId, DependentId, FirstName, LastName from dbo.DependentInformation";
            var DependentResults = UtilityMethods.QuerySql<Dependent>(DependentListSql
                                        , null
                                        , null
                                        , null
                                        );

            var CombinedResults = from emp in EmployeeResults
                                  join dep in DependentResults
                                    on emp.EmployeeId equals dep.EmployeeId into gj
                                  select new
                                  {
                                      emp.EmployeeId,
                                      emp.SalaryAmount,
                                      emp.FirstName,
                                      emp.LastName,
                                      EmployeeBenefitsAmount = emp.BenefitsAmount,
                                      DependentBenefitsAmount = DependentResults.Where(x => x.EmployeeId == emp.EmployeeId).Sum(y => y.BenefitsAmount),
                                      DependentCount = DependentResults.Count(x => x.EmployeeId == emp.EmployeeId)
                                      
                                  };
            return new ObjectResult(CombinedResults);
            

            /*
            var DT = UtilityMethods.QueryStoredProcedure(
                                    "proc_Employee_RetrieveEmployeeList"
                                    , null
                                    , null
                                    , null
                                );

            return new ObjectResult(JsonConvert.SerializeObject(DT));
            */
        }

        [HttpGet]
        [Route("GetEmployeeInfo/{EmployeeId}")]
        public IActionResult GetEmployeeInfo(int EmployeeId)
        {
            
            
            var res = UtilityMethods.QuerySql<Employee>("SELECT * FROM EmployeeInformation where EmployeeId = @EmployeeId"
                                        , new string[] { "@EmployeeId" }
                                        , new System.Data.DbType[] { System.Data.DbType.Int32 }
                                        , new object[] { EmployeeId });
            return new ObjectResult(res);
            
            /*
            var DT = UtilityMethods.QueryStoredProcedure(
                                        "proc_Employee_GetEmployeeInformation"
                                        , new string[] { "@EmployeeId" }
                                        , new System.Data.DbType[] { System.Data.DbType.Int32 }
                                        , new object[] { EmployeeId }

                                    );
            return new ObjectResult(JsonConvert.SerializeObject(DT));
            */
        }


        //Updates an Existing Employee 
        [HttpPut]
        [Route("UpdateEmployee")]
        public IActionResult UpdateEmployee([FromBody] Employee employee)
        {
            if (!ModelState.IsValid || employee == null)
            {
                _logger.LogError("Employee Controller -> UpdateEmployee: Invalid ModelState!", employee);
                return BadRequest();
            }

            UtilityMethods.ExecuteStoredProcedure("[dbo].[proc_Employee_UpdateExistingEmployee]"
                    , new string[] { "@DateOfBirth", "@FirstName", "@LastName", "@Gender", "@EmployeeId " }
                    , new DbType[] { DbType.DateTime, DbType.String, DbType.String, DbType.String, DbType.Int32 }
                    , new object[] { employee.DateOfBirth, employee.FirstName, employee.LastName, employee.Gender, employee.EmployeeId }
                );


            return Ok();
        }

        //Adds a New Employee 
        [HttpPost]
        [Route("AddNewEmployee")]
        public IActionResult AddNewEmployee([FromBody] Employee employee)
        {
            if (!ModelState.IsValid || employee == null)
            {
                _logger.LogError("Employee Controller -> AddNewEmployee: Invalid ModelState!", employee);
                return BadRequest();
            }

            UtilityMethods.ExecuteStoredProcedure("[dbo].[proc_Employee_AddNewEmployee]"
                    , new string[] { "@DateOfBirth", "@FirstName", "@LastName", "@Gender" }
                    , new DbType[] { DbType.DateTime, DbType.String, DbType.String, DbType.String }
                    , new object[] { employee.DateOfBirth, employee.FirstName, employee.LastName, employee.Gender }
                );


            return Ok();
        }

        //Removes an Employee (and any attached Dependents)
        [HttpDelete]
        [Route("RemoveEmployee/{EmployeeId}")]
        public IActionResult RemoveEmployee(int EmployeeId)
        {

            UtilityMethods.ExecuteStoredProcedure("[dbo].[proc_Employee_RemoveEmployee]"
                    , new string[] { "@EmployeeId " }
                    , new DbType[] { DbType.Int32 }
                    , new object[] { EmployeeId }
                );


            return Ok();
        }

    }
}
