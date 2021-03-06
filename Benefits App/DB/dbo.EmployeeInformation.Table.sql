USE [Benefits]
GO
/****** Object:  Table [dbo].[EmployeeInformation]    Script Date: 7/29/2021 9:51:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeInformation](
	[EmployeeId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](100) NOT NULL,
	[LastName] [varchar](100) NOT NULL,
	[Gender] [char](1) NULL,
	[DateOfBirth] [datetime] NOT NULL,
	[SalaryAmount] [float] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[EmployeeInformation] ADD  DEFAULT ((52000)) FOR [SalaryAmount]
GO
