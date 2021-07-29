using Xunit;
using EmployeeBenefits_API;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net;
using System.Data;

namespace EmployeeBenefits_API_Tests
{
    public class EmployeeUnitTests
    {
        public EmployeeUnitTests()
        {

        }

        public void Dispose()
        {
            UtilityMethods.ExecuteStoredProcedure("[dbo].[proc_Employee_RemoveEmployee]"
                    , new string[] { "@EmployeeId " }
                    , new DbType[] { DbType.Int32 }
                    , new object[] { -1 }
                );
        }
        //Test that Employees who's names do not start with A have a Benefits Amount = 1000
        [Fact]
        public void Employee_NameStartsWithNonA_ReturnsNormalBenefitAmount()
        {
            // Arrange
            Employee emp = new Employee(111111, "Josh", "White", 'M');

            // Act
            var BenefitsAmount = emp.GetBenefitsCost();

            // Assert
            Assert.Equal(1000.00, BenefitsAmount);
        }

        //Test that Employees who's names do start with A have a Discounted Benefits Amount = 900
        [Fact]
        public void Employee_NameStartsWithA_ReturnsDiscountedBenefitAmount()
        {
            // Arrange
            Employee emp = new Employee(111111, "AJosh", "White", 'M');

            // Act
            var BenefitsAmount = emp.GetBenefitsCost();

            // Assert
            Assert.Equal(900.00, BenefitsAmount);
        }

        //Test that Employees who's names do start with lower case A have a Discounted Benefits Amount = 900
        [Fact]
        public void Employee_NameStartsWithLowerCaseA_ReturnsDiscountedBenefitAmount()
        {
            // Arrange
            Employee emp = new Employee(111111, "aaaa", "aaaa", 'M');

            // Act
            var BenefitsAmount = emp.GetBenefitsCost();

            // Assert
            Assert.Equal(900.00, BenefitsAmount);
        }

        //Test that Employees return a Salary of 2000 * 26
        [Fact]
        public void Employee_CreateValidEmployee_ReturnsSalary()
        {
            // Arrange
            Employee emp = new Employee(111111, "aaaa", "aaaa", 'M');

            // Act
            var SalaryAmount = emp.SalaryAmount;

            // Assert
            Assert.Equal(2000.00 * 26, SalaryAmount);
        }


        //Test that Employees whos First Name is null throws exception
        [Fact]
        public void Employee_FirstNameIsNull_ReturnsArgumentNullException()
        {
            // Arrange/ Act/ Assert
            Assert.Throws<ArgumentNullException>(() => new Employee(111111, null, "aaaa", 'M'));
        }

        //Test that Employees whos Last Name is null throws exception
        [Fact]
        public void Employee_LastNameIsNull_ReturnsArgumentNullException()
        {
            // Arrange/ Act/ Assert
            Assert.Throws<ArgumentNullException>(() => new Employee(111111, "aaaa", null, 'M'));
        }

        //Test that Employees whos Gender is null does not throw exception
        [Fact]
        public void Employee_GenderIsNull_DoesNotThrowArgumentNullException()
        {
            //Arrange
            var exception = Record.Exception(() => new Employee(111111, "aaaa", "aaaa", null));

            //Act/Assert
            Assert.Null(exception);
        }

        /* API Functions */

        //Test that making a GET Request to Employee/GetEmployeeList returns a list of Employees
        [Fact]
        public async Task PerformGetRequest_GetEmployeeList_ReturnsResult()
        {
            string url = "https://localhost:44352/api/Employee/GetEmployeeList";
            using (var handler = new HttpClientHandler { UseDefaultCredentials = true })
            {
                using (HttpClient client = new HttpClient(handler))
                {
                    client.DefaultRequestHeaders.Add("Accept", "application/json, text/plain, */*");

                    var response = await client.GetStringAsync(url);
                    Assert.NotNull(response);
                    Assert.True(response.Length > 0);
                }
            }


        }

        //Test that making a GET Request to Employee/GetEmployeeInfo with a valid Employee ID returns 
        [Fact]
        public async Task PerformGetRequest_GetEmployeeInfo_ReturnsResult()
        {
            //Note: I would create a Test Helper that would insert a Test Employee for Testing, and use that Employee ID for testing (as if the below one gets removed, this will fail)
            string url = "https://localhost:44352/api/Employee/GetEmployeeInfo/1";
            using (var handler = new HttpClientHandler { UseDefaultCredentials = true })
            {
                using (HttpClient client = new HttpClient(handler))
                {
                    client.DefaultRequestHeaders.Add("Accept", "application/json, text/plain, */*");

                    var response = await client.GetStringAsync(url);
                    Assert.NotNull(response);
                    Assert.True(response.Length > 0);
                }
            }


        }

        //Test that making a GET Request to Employee/GetEmployeeInfo without passing a valid param returns Not Accepted 
        [Fact]
        public async Task PerformGetRequest_GetEmployeeInfoWithInvalidParam_ReturnsBadRequest()
        {
            string url = "https://localhost:44352/api/Employee/GetEmployeeInfo/abc";
            using (var handler = new HttpClientHandler { UseDefaultCredentials = true })
            {
                using (HttpClient client = new HttpClient(handler))
                {
                    client.DefaultRequestHeaders.Add("Accept", "application/json, text/plain, */*");

                    var response = await client.GetAsync(url);
                    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                }
            }


        }
    }
}
