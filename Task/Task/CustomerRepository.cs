using DtoTask.Dto;
using ITaskRepository.ITask;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data;
using System.Linq; 
using TaskContext.Context;
using TaskContext.Entities;

namespace TaskRepository.Task
{
    public class CustomerRepository : GenericRepository<DataContext, TblCustomers>, ICustomerRepository
    {
        public DataTable PrintCustomerInfo()
        {
            var result = Context.TblCustomers.AsNoTracking().Select(x => new
            {
                Id = x.Id,
                CustomerName = x.CustomerName,
                CustomerNo = x.CustomerNo,
                Address = x.Address,
                Phone = x.Phone
            }).OrderByDescending(a => a.Id).FirstOrDefault();

            if (result == null)
                throw new Exception();


            var dt = new DataTable();

            dt.Columns.Add(columnName: nameof(result.CustomerName));
            dt.Columns.Add(columnName: nameof(result.CustomerNo));
            dt.Columns.Add(columnName: nameof(result.Address));
            dt.Columns.Add(columnName: nameof(result.Phone));

            DataRow row1;

            row1 = dt.NewRow();

            row1[nameof(result.CustomerName)] = result.CustomerName;
            row1[nameof(result.CustomerNo)] = result.CustomerNo;
            row1[nameof(result.Address)] = result.Address;
            row1[nameof(result.Phone)] = result.Phone;

            dt.Rows.Add(row1);

            return dt;
        }

        public bool AddCustomer(DtoCustomer dto)
        {
            if (dto != null)
            {
                var objCustomer = new TblCustomers()
                {
                    CustomerName = dto.CustomerName,
                    Address = dto.Address,
                    CustomerNo = dto.CustomerNo,
                    Phone = dto.Phone
                };

                Add(objCustomer);
                Save();

                return true;
            }

            return false;
        }
    }
}
