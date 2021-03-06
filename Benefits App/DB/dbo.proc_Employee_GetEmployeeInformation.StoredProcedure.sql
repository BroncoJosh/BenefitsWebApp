USE [Benefits]
GO
/****** Object:  StoredProcedure [dbo].[proc_Employee_GetEmployeeInformation]    Script Date: 7/29/2021 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Josh
-- Create date: 07/25/2021
-- Description:	Retrieves the Employee Info attached to an Employee ID
-- =============================================
CREATE PROCEDURE [dbo].[proc_Employee_GetEmployeeInformation]
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
