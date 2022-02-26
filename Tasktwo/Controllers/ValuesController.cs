using AspNetCore.Reporting;
using DtoTask.Dto;
using ITaskRepository.ITask;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO; 
using System.Threading.Tasks;

namespace Tasktwo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        private readonly ICustomerRepository _customer;
        private readonly IHostingEnvironment _hostingEnv;
        public ValuesController(ICustomerRepository customer, IHostingEnvironment hostingEnv)
        {
            _customer = customer;
            _hostingEnv = hostingEnv;
        }

        [HttpGet]
        [Route("GenerateReport")]
        public async Task<IActionResult> GenerateReport()
        {
            try
            {
                byte[] pdfByte = { 0 };
                var dt = _customer.PrintCustomerInfo();
                int extension = 1;
                string mimetype = "";
                string path = $"{this._hostingEnv.WebRootPath}\\Reports\\Report1.rdlc";
                Dictionary<string, string> param = new Dictionary<string, string>();

                LocalReport loclRpt = new LocalReport(path);
                loclRpt.AddDataSource(dataSetName: "DSCustomer", dt);
                var result = loclRpt.Execute(RenderType.Pdf, extension, param, mimetype);
                Response.Headers.Add("Content-Type", "application/pdf");
                Response.Headers.Add("Content-Disposition", "attachment; filename=rptCustomerInvoice.pdf");
                Stream stream = new MemoryStream(result.MainStream);
                return new FileStreamResult(stream, "application/pdf");
            }
            catch (Exception ex)
            {
                return NotFound(ex);
            }
        }

        [HttpPost]
        [Route("AddCustomer")]
        public async Task<Responce<bool>> AddCustomer(DtoCustomer dto)
        {
            var result = _customer.AddCustomer(dto);

            Responce<bool> res = new Responce<bool>();

            res.code = result == true ? StaticApiStatus.ApiSuccess.Code : StaticApiStatus.ApiFaild.Code;
            res.message = result == true ? StaticApiStatus.ApiSuccess.MessageAr : StaticApiStatus.ApiFaild.MessageAr;
            res.status = result == true ? StaticApiStatus.ApiSuccess.Status : StaticApiStatus.ApiFaild.Status;
            res.IsSuccess = result == true ? true : false;
            res.payload = result;

            return res;
        }
    }
}
