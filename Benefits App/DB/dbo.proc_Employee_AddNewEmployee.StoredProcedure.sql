USE [Benefits]
GO
/****** Object:  StoredProcedure [dbo].[proc_Employee_AddNewEmployee]    Script Date: 7/29/2021 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Josh
-- Create date: 07/25/2021
-- Description:	Adds A New Employee 
-- =============================================
CREATE PROCEDURE [dbo].[proc_Employee_AddNewEmployee]
	@DateOfBirth DateTime,
	@FirstName varchar(100),
	@LastName varchar(100),
	@Gender varchar(1)
AS
BEGIN

	BEGIN TRANSACTION EmployeeTransaction
	BEGIN TRY
		insert into
			dbo.EmployeeInformation (DateOfBirth, FirstName, LastName, Gender)
		select 
			@DateOfBirth
			, @FirstName
			, @LastName
			, @Gender;

		IF @@ROWCOUNT = 0 or @@ROWCOUNT > 1
		BEGIN
			;THROW 51000, 'ERROR: Incorrect # of Records Insert', 20;
		END
		commit transaction EmployeeTransaction
	END TRY
	BEGIN CATCH
		print 'ERROR: Unable to Add New Employee!'
		print CONCAT('ERROR: ', ERROR_MESSAGE()); 
		rollback transaction EmployeeTransaction;
	END CATCH
	
END
GO
