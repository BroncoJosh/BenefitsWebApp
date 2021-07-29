using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.Extensions.Configuration;

namespace EmployeeBenefits_API
{
    public class UtilityMethods
    {
        private static string connectionString = Startup.Configuration.GetConnectionString("LocalDB");


        public static void ExecuteStoredProcedure(string StoredProcedureName, String[] ParameterNames = null, DbType[] ParameterTypes = null, Object[] ParameterValues = null)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    DynamicParameters parameter = new DynamicParameters();

                    if (ParameterNames != null)
                    {
                        //Pass Parameters to Stored Procedure (if they exist)
                        for (var i = 0; i < ParameterNames.Length; i++)
                        {
                            parameter.Add(ParameterNames[i], ParameterValues[i], ParameterTypes[i], ParameterDirection.Input);
                        }
                    }

                    var results = connection.Execute(StoredProcedureName, parameter, commandType: CommandType.StoredProcedure);
                    Console.WriteLine("Affected Rows: " + results);
                    return ;
                }


            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }           
            
        }


        //Used to query a SQL statement (provided as string) and return the results as a strongly typed list (using Generics, Type of List passed in Controller)
        public static List<T> QuerySql<T>(string Sql, String[] ParameterNames = null, DbType[] ParameterTypes = null, Object[] ParameterValues = null)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    DynamicParameters parameter = new DynamicParameters();

                    if (ParameterNames != null)
                    {
                        //Pass Parameters to Stored Procedure (if they exist)
                        for (var i = 0; i < ParameterNames.Length; i++)
                        {
                            parameter.Add(ParameterNames[i], ParameterValues[i], ParameterTypes[i], ParameterDirection.Input);
                        }
                    }
                   
                    var results =  connection.Query<T> (Sql, parameter).ToList();

                    return results;

                }

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

        }

        //Used to query a Stored Procedure and return the results as a DataTable
        public static DataTable QueryStoredProcedure(string StoredProcedureName, String[] ParameterNames = null, DbType[] ParameterTypes = null, Object[] ParameterValues = null)
        {
            var procedureOutputDT = new DataTable();

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    DynamicParameters parameter = new DynamicParameters();

                    if (ParameterNames != null)
                    {
                        //Pass Parameters to Stored Procedure (if they exist)
                        for (var i = 0; i < ParameterNames.Length; i++)
                        {
                            parameter.Add(ParameterNames[i], ParameterValues[i], ParameterTypes[i], ParameterDirection.Input);
                        }
                    }

                    //var orderDetails = connection.Query<Employee>(sql).ToList();
                    var reader = connection.ExecuteReader(StoredProcedureName, parameter, commandType: CommandType.StoredProcedure);
                    //Console.WriteLine(orderDetails.Count);

                    procedureOutputDT.Load(reader);
                    return procedureOutputDT;

                }

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

        }
    }
}
