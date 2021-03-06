USE [Benefits]
GO
/****** Object:  StoredProcedure [dbo].[proc_Dependent_UpdateExistingDependent]    Script Date: 7/29/2021 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Josh
-- Create date: 07/25/2021
-- Description:	Updates an Existing Dependent 
-- =============================================
CREATE PROCEDURE [dbo].[proc_Dependent_UpdateExistingDependent]
	@DependentId int,
	@DateOfBirth DateTime,
	@FirstName varchar(100),
	@LastName varchar(100),
	@Gender varchar(1)
AS
BEGIN

	BEGIN TRANSACTION DependentTransaction
	BEGIN TRY
		update
			dbo.DependentInformation
		set
			DateOfBirth = @DateOfBirth
			, FirstName = @FirstName
			, LastName = @LastName
			, Gender = @Gender
		where 
			DependentId = @DependentId

		IF @@ROWCOUNT = 0 or @@ROWCOUNT > 1
		BEGIN
			;THROW 51000, 'ERROR: Incorrect # of Records Updated', 20;
		END
		commit transaction DependentTransaction
	END TRY
	BEGIN CATCH
		print 'ERROR: Unable to update Existing Dependent!'
		print CONCAT('ERROR: ', ERROR_MESSAGE()); 
		rollback transaction DependentTransaction;
	END CATCH
	
END
GO
