using EmployeeBenefits_API;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace EmployeeBenefits_API_Tests
{
    public class DependentUnitTests
    {
        //Test that Dependents who's names do not start with A have a Benefits Amount = 1000
        [Fact]
        public void Dependent_NameStartsWithNonA_ReturnsNormalBenefitAmount()
        {
            // Arrange
            Dependent emp = new Dependent(111111, "Josh", "White", 'M');

            // Act
            var BenefitsAmount = emp.GetBenefitsCost();

            // Assert
            Assert.Equal(500.00, BenefitsAmount);
        }

        //Test that Dependents who's names do start with A have a Discounted Benefits Amount = 900
        [Fact]
        public void Dependent_NameStartsWithA_ReturnsDiscountedBenefitAmount()
        {
            // Arrange
            Dependent emp = new Dependent(111111, "AJosh", "White", 'M');

            // Act
            var BenefitsAmount = emp.GetBenefitsCost();

            // Assert
            Assert.Equal(450.00, BenefitsAmount);
        }

        //Test that Dependents who's names do start with lower case A have a Discounted Benefits Amount = 900
        [Fact]
        public void Dependent_NameStartsWithLowerCaseA_ReturnsDiscountedBenefitAmount()
        {
            // Arrange
            Dependent emp = new Dependent(111111, "aaaa", "aaaa", 'M');

            // Act
            var BenefitsAmount = emp.GetBenefitsCost();

            // Assert
            Assert.Equal(450.00, BenefitsAmount);
        }



        //Test that Dependents whos First Name is null throws exception
        [Fact]
        public void Dependent_FirstNameIsNull_ReturnsArgumentNullException()
        {
            // Arrange/ Act/ Assert
            Assert.Throws<ArgumentNullException>(() => new Dependent(111111, null, "aaaa", 'M'));
        }

        //Test that Dependents whos Last Name is null throws exception
        [Fact]
        public void Dependent_LastNameIsNull_ReturnsArgumentNullException()
        {
            // Arrange/ Act/ Assert
            Assert.Throws<ArgumentNullException>(() => new Dependent(111111, "aaaa", null, 'M'));
        }

        //Test that Dependents whos Gender is null does not throw exception
        [Fact]
        public void Dependent_GenderIsNull_DoesNotThrowArgumentNullException()
        {
            //Arrange
            var exception = Record.Exception(() => new Dependent(111111, "aaaa", "aaaa", null));

            //Act/Assert
            Assert.Null(exception);
        }
    }
}
