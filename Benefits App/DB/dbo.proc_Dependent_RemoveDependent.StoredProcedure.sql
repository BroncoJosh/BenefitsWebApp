USE [Benefits]
GO
/****** Object:  StoredProcedure [dbo].[proc_Dependent_RemoveDependent]    Script Date: 7/29/2021 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Josh
-- Create date: 07/25/2021
-- Description:	Removes A Dependent 
-- =============================================
CREATE PROCEDURE [dbo].[proc_Dependent_RemoveDependent]
	@DependentId int

AS
BEGIN

	BEGIN TRANSACTION DependentTransaction
	BEGIN TRY
		delete from
			dbo.DependentInformation 
		where
			DependentId = @DependentId;

		IF @@ROWCOUNT = 0 or @@ROWCOUNT > 1
		BEGIN
			;THROW 51000, 'ERROR: Incorrect # of Records Removed', 20;
		END
		commit transaction DependentTransaction
	END TRY
	BEGIN CATCH
		print 'ERROR: Unable to Remove Dependent!'
		print CONCAT('ERROR: ', ERROR_MESSAGE()); 
		rollback transaction DependentTransaction;
	END CATCH
	
END
GO
