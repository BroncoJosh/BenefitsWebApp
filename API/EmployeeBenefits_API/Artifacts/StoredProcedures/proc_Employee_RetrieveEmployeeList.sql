use Benefits;

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Josh
-- Create date: 07/25/2021
-- Description:	Retrieves the Employee List for the Benefits App
-- =============================================
CREATE PROCEDURE proc_Employee_RetrieveEmployeeList 
AS
BEGIN
	select 
		EmployeeId
		, FirstName
		, LastName
	from 
		dbo.EmployeeInformation
END
GO
