using EmployeeBenefits_API.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeBenefits_API
{
    [Table("Dependent")]

    public class Dependent : BenefitsEnrollee
    {
        public int DependentId { get; set; }

        public const double BenefitsRate = 500;

        public override double BenefitsAmount { get { return GetBenefitsCost(); } }

        public Dependent() { }

        public Dependent(int EmployeeId, string FirstName, string LastName, char? Gender)
        {
            if (FirstName == null || LastName == null)
            {
                throw new ArgumentNullException();
            }

            this.EmployeeId = EmployeeId;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Gender = Gender;
        }

        //Returns the Benefits Amount associated to the Enrollee type (Employee or Dependent).
        //If Name starts with A, return discounted rate of 10%
        public override double GetBenefitsCost()
        {
            if (FirstName.ToUpper()[0] == 'A')
            {
                return BenefitsRate - (BenefitsRate * 0.10);
            }

            return BenefitsRate;
        }
    }
}
