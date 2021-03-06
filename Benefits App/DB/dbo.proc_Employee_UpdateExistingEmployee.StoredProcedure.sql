USE [Benefits]
GO
/****** Object:  StoredProcedure [dbo].[proc_Employee_UpdateExistingEmployee]    Script Date: 7/29/2021 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Josh
-- Create date: 07/25/2021
-- Description:	Updates an Existing Employee
-- =============================================
CREATE PROCEDURE [dbo].[proc_Employee_UpdateExistingEmployee]
	@EmployeeId int,
	@DateOfBirth DateTime,
	@FirstName varchar(100),
	@LastName varchar(100),
	@Gender varchar(1)
AS
BEGIN

	BEGIN TRANSACTION EmployeeTransaction
	BEGIN TRY
		update
			dbo.EmployeeInformation
		set
			DateOfBirth = @DateOfBirth
			, FirstName = @FirstName
			, LastName = @LastName
			, Gender = @Gender
		where 
			EmployeeId = @EmployeeId

		IF @@ROWCOUNT = 0 or @@ROWCOUNT > 1
		BEGIN
			;THROW 51000, 'ERROR: Incorrect # of Records Updated', 20;
		END
		commit transaction EmployeeTransaction
	END TRY
	BEGIN CATCH
		print 'ERROR: Unable to update Existing Employee!'
		print CONCAT('ERROR: ', ERROR_MESSAGE()); 
		rollback transaction EmployeeTransaction;
	END CATCH
	
END
GO
