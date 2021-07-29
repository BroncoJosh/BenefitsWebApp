use Benefits;

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Josh
-- Create date: 07/25/2021
-- Description:	Retrieves the Employee Info attached to an Employee ID
-- =============================================
CREATE PROCEDURE proc_Employee_GetEmployeeInformation
	@EmployeeId int
AS
BEGIN
	select 
		*
	from 
		dbo.EmployeeInformation
	where 
		EmployeeId = @EmployeeId
END
GO
