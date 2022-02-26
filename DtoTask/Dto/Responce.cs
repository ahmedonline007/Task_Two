
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace DtoTask.Dto
{
    //thiss Class for Change Return type of Request
    [DataContract]
    public class Responce<T>
    {
        public Responce()
        {
        }

        [Display(Description = "Please Display!")]
        [DataMember]
        public string status { get; set; }

        [DataMember]
        public string code { get; set; }

        [DataMember]
        public string message { get; set; }

        [DataMember]
        public new T payload { get; set; }

        [Display(Description = "Please Display!")]
        [DataMember]
        public bool IsSuccess { get; set; }
    }
}
