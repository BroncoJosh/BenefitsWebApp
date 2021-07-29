using EmployeeBenefits_API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeBenefits_API
{
    public abstract class BenefitsEnrollee : IBenefitsCost
    {
        public int EmployeeId { get; set;  }  //Used for Identifying Employee's, and attaching Dependents to an Employee
        public string FirstName { get; set; } 
        public string LastName { get; set; }
        public char? Gender { get; set; }


        public DateTime DateOfBirth { get; set; }
        public abstract double BenefitsAmount { get;  }  //This would be a hard-coded number possibly retrieved from an Internal System
                                                    //Getting from Child Sub Classes

        public abstract double GetBenefitsCost();

    }
}
