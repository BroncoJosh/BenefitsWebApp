using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Data;

namespace EmployeeBenefits_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DependentController : ControllerBase
    {
        private readonly ILogger<DependentController> _logger;

        public DependentController(ILogger<DependentController> logger)
        {
            _logger = logger;
        }


        //Retrieves all of the Dependents that are associated with an Employee ID. 
        [HttpGet]
        [Route("GetDependentsForEmployee/{EmployeeId}")]
        public IActionResult GetDependentsForEmployee(int EmployeeId)
        {
            
            var res = UtilityMethods.QuerySql<Dependent>("SELECT * FROM DependentInformation where EmployeeId = @EmployeeId"
                                        , new string[] { "@EmployeeId" }
                                        , new System.Data.DbType[] { DbType.Int32 }
                                        , new object[] { EmployeeId });
            return new ObjectResult(res);
            
            /*
            var DT = UtilityMethods.QueryStoredProcedure(
                                        "proc_Dependents_GetDependentsForEmployee"
                                        , new string[] { "@EmployeeId" }
                                        , new System.Data.DbType[] { System.Data.DbType.Int32 }
                                        , new object[] { EmployeeId }

                                    );
            return new ObjectResult(JsonConvert.SerializeObject(DT));
            */
        }


        //Updates an Existing Dependent 
        [HttpPut]
        [Route("UpdateDependent")]
        public IActionResult UpdateDependent([FromBody] Dependent dependent)
        {
            if(!ModelState.IsValid)
            {
                _logger.LogError("Dependent Controller -> UpdateDependent: Invalid ModelState!", dependent);
                return BadRequest();
            }

            UtilityMethods.ExecuteStoredProcedure("[dbo].[proc_Dependent_UpdateExistingDependent]"
                    , new string[] { "@DateOfBirth", "@FirstName", "@LastName", "@Gender", "@DependentId " }
                    , new DbType[] { DbType.DateTime, DbType.String, DbType.String, DbType.String, DbType.Int32 }
                    , new object[] { dependent.DateOfBirth, dependent.FirstName, dependent.LastName, dependent.Gender, dependent.DependentId }
                );


            return Ok();
        }

        //Adds a New Dependent 
        [HttpPost]
        [Route("AddNewDependent/{EmployeeId}")]
        public IActionResult AddNewDependent(int EmployeeId, [FromBody] Dependent dependent)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("Dependent Controller -> AddNewDependent: Invalid ModelState!", dependent);
                return BadRequest();
            }

            UtilityMethods.ExecuteStoredProcedure("[dbo].[proc_Dependent_AddNewDependent]"
                    , new string[] { "@DateOfBirth", "@FirstName", "@LastName", "@Gender", "@EmployeeId " }
                    , new DbType[] { DbType.DateTime, DbType.String, DbType.String, DbType.String, DbType.Int32 }
                    , new object[] { dependent.DateOfBirth, dependent.FirstName, dependent.LastName, dependent.Gender, EmployeeId }
                );


            return Ok();
        }

        //Removes a Dependent 
        [HttpDelete]
        [Route("RemoveDependent/{DependentId}")]
        public IActionResult RemoveDependent(int DependentId)
        {

            UtilityMethods.ExecuteStoredProcedure("[dbo].[proc_Dependent_RemoveDependent]"
                    , new string[] { "@DependentId " }
                    , new DbType[] { DbType.Int32 }
                    , new object[] { DependentId }
                );


            return Ok();
        }
    }
}
