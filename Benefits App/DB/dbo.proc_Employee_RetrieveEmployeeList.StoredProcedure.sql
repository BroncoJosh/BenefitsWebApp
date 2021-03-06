USE [Benefits]
GO
/****** Object:  StoredProcedure [dbo].[proc_Employee_RetrieveEmployeeList]    Script Date: 7/29/2021 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Josh
-- Create date: 07/25/2021
-- Description:	Retrieves the Employee List for the Benefits App
-- =============================================
CREATE PROCEDURE [dbo].[proc_Employee_RetrieveEmployeeList] 
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
