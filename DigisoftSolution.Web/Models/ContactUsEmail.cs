using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DigisoftSolution.Web.Models
{
    public class ContactUsEmail
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Message { get; set; }
        public IFormFile File { get; set; }

    }
}
