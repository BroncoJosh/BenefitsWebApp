USE [master]
GO
/****** Object:  Database [Benefits]    Script Date: 7/29/2021 9:51:35 AM ******/
CREATE DATABASE [Benefits]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Benefits', FILENAME = N'C:\Users\Josh\Benefits.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Benefits_log', FILENAME = N'C:\Users\Josh\Benefits_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [Benefits] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Benefits].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Benefits] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Benefits] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Benefits] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Benefits] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Benefits] SET ARITHABORT OFF 
GO
ALTER DATABASE [Benefits] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Benefits] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Benefits] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Benefits] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Benefits] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Benefits] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Benefits] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Benefits] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Benefits] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Benefits] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Benefits] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Benefits] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Benefits] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Benefits] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Benefits] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Benefits] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Benefits] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Benefits] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Benefits] SET  MULTI_USER 
GO
ALTER DATABASE [Benefits] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Benefits] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Benefits] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Benefits] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Benefits] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Benefits] SET QUERY_STORE = OFF
GO
USE [Benefits]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE [Benefits] SET  READ_WRITE 
GO
