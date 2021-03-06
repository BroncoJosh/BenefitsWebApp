USE [Benefits]
GO
/****** Object:  StoredProcedure [dbo].[proc_Employee_RemoveEmployee]    Script Date: 7/29/2021 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Josh
-- Create date: 07/25/2021
-- Description:	Removes an Employee 
-- =============================================
CREATE PROCEDURE [dbo].[proc_Employee_RemoveEmployee]
	@EmployeeId int

AS
BEGIN


	BEGIN TRANSACTION EmployeeTransaction
	BEGIN TRY
		--Need to remove all Dependents attached to an Employee
		delete from
			dbo.DependentInformation 
		where
			EmployeeId = @EmployeeId;

		--Remove the Employee from the Employee Table
		delete from
			dbo.EmployeeInformation 
		where
			EmployeeId = @EmployeeId;

		commit transaction EmployeeTransaction
	END TRY
	BEGIN CATCH
		print 'ERROR: Unable to Remove Employee!'
		print CONCAT('ERROR: ', ERROR_MESSAGE()); 
		rollback transaction EmployeeTransaction;
	END CATCH
	
END
GO
