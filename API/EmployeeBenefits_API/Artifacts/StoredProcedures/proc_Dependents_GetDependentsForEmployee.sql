use Benefits;

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Josh
-- Create date: 07/25/2021
-- Description:	Retrieves the Dependent List attached to an Employee ID
-- =============================================
CREATE PROCEDURE proc_Dependents_GetDependentsForEmployee 
	@EmployeeId int
AS
BEGIN
	select 
		*
	from 
		dbo.DependentInformation
	where 
		EmployeeId = @EmployeeId
END
GO
