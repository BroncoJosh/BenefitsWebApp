USE [Benefits]
GO
/****** Object:  Table [dbo].[DependentInformation]    Script Date: 7/29/2021 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DependentInformation](
	[DependentId] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [int] NOT NULL,
	[FirstName] [varchar](100) NOT NULL,
	[LastName] [varchar](100) NOT NULL,
	[Gender] [char](1) NULL,
	[DateOfBirth] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeId] ASC,
	[DependentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
