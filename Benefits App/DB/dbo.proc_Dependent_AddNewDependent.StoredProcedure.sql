USE [Benefits]
GO
/****** Object:  StoredProcedure [dbo].[proc_Dependent_AddNewDependent]    Script Date: 7/29/2021 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Josh
-- Create date: 07/25/2021
-- Description:	Adds A New Dependent 
-- =============================================
CREATE PROCEDURE [dbo].[proc_Dependent_AddNewDependent]
	@EmployeeId int,
	@DateOfBirth DateTime,
	@FirstName varchar(100),
	@LastName varchar(100),
	@Gender varchar(1)
AS
BEGIN

	BEGIN TRANSACTION DependentTransaction
	BEGIN TRY
		insert into
			dbo.DependentInformation (EmployeeId, DateOfBirth, FirstName, LastName, Gender)
		select 
			@EmployeeId
			, @DateOfBirth
			, @FirstName
			, @LastName
			, @Gender;

		IF @@ROWCOUNT = 0 or @@ROWCOUNT > 1
		BEGIN
			;THROW 51000, 'ERROR: Incorrect # of Records Insert', 20;
		END
		commit transaction DependentTransaction
	END TRY
	BEGIN CATCH
		print 'ERROR: Unable to Add New Dependent!'
		print CONCAT('ERROR: ', ERROR_MESSAGE()); 
		rollback transaction DependentTransaction;
	END CATCH
	
END
GO
