using DtoTask.Dto;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITaskRepository.ITask
{
    public interface ICustomerRepository
    {
        DataTable PrintCustomerInfo();
        bool AddCustomer(DtoCustomer dto);
    }
}
