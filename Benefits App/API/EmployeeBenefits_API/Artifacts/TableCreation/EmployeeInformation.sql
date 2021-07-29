drop table if exists EmployeeInformation;

create table EmployeeInformation (
	EmployeeId int Identity(1,1) not null,
	FirstName varchar(100) not null,
	LastName varchar(100) not null,
	Gender char(1) null,
	DateOfBirth DateTime not null,
	Salary decimal(15,2) not null default 52000

)

Alter Table EmployeeInformation add Primary Key (EmployeeId)

Insert into EmployeeInformation (FirstName, LastName, Gender, DateOfBirth) select 'Josh', 'White', 'M', Cast('01/01/1970' as Date);
Insert into EmployeeInformation (FirstName, LastName, Gender, DateOfBirth) select 'Abraham', 'Lincoln', 'M', Cast('01/01/1970' as Date);
Insert into EmployeeInformation (FirstName, LastName, Gender, DateOfBirth) select 'Amelia', 'Earhart', 'F', Cast('01/01/1970' as Date);
Insert into EmployeeInformation (FirstName, LastName, Gender, DateOfBirth) select 'IBM', 'Watson', null, Cast('01/01/1970' as Date);

