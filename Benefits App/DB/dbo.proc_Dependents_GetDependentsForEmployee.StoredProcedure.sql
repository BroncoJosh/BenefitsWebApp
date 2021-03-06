USE [Benefits]
GO
/****** Object:  StoredProcedure [dbo].[proc_Dependents_GetDependentsForEmployee]    Script Date: 7/29/2021 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Josh
-- Create date: 07/25/2021
-- Description:	Retrieves the Dependent List attached to an Employee ID
-- =============================================
CREATE PROCEDURE [dbo].[proc_Dependents_GetDependentsForEmployee] 
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
