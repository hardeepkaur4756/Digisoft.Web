using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DigisoftSolution.Web.Models;
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace DigisoftSolution.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [Route("About")]
        public IActionResult About()
        {
            return View();
        }

        [Route("Contact")]
        public IActionResult Contact()
        {
            return View();
        }

        [Route("Portfolio")]
        public IActionResult Portfolio()
        {
            return View();
        }

        [Route("Gallery")]
        public IActionResult Gallery()
        {
            return View();
        }

        [Route("Mobile")]
        public IActionResult Mobile()
        {
            return View();
        }

        [Route("Services")]
        public IActionResult Services()
        {
            return View();
        }

        [Route("WebDevelopment")]
        public IActionResult WebDevelopment()
        {
            return View();
        }

        [Route("Career")]
        public ActionResult Career()
        {
            return View();
        }

        [Route("OurTeam")]
        public IActionResult OurTeam()
        {
            return View();
        }

        [Route("DigitalMarketing")]
        public IActionResult DigitalMarketing()
        {
            return View();
        }

        [Route("UIUXDesigns")]
        public IActionResult UIUXDesigns()
        {
            return View();
        }

        [Route("WhyChooseUs")]
        public IActionResult WhyChooseUs()
        {
            return View();
        }

        [Route("QaAndTesting")]
        public IActionResult QaAndTesting()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Send([FromBody]ContactUsEmail contactUsEmail)
        {
            SmtpClient smtp = new SmtpClient();
            smtp.Port = 587;
            smtp.EnableSsl = true;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential("info@digisoftsolution.net", "BreakingBad8@");
            smtp.Host = "smtppro.zoho.com";

            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("info@digisoftsolution.net");
            mail.To.Add(new MailAddress("info@digisoftsolution.net"));

            mail.IsBodyHtml = true;
            mail.Subject = "Email from Contact Us Digisoft!";
            mail.Body = "From: " + contactUsEmail.Email + "<br/> Name: " + contactUsEmail.Name + "<br/> Phone: " + contactUsEmail.PhoneNumber + "<br/> Message: " + contactUsEmail.Message;
            smtp.Send(mail);
            return Ok(new { Success = true });
        }

        [HttpPost]
        public IActionResult CareerSend([FromForm] ContactUsEmail contactUsEmail)
        {                  
            SmtpClient smtp = new SmtpClient();
            smtp.Port = 587;
            smtp.EnableSsl = true;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential("info@digisoftsolution.net", "BreakingBad8@");
            smtp.Host = "smtppro.zoho.com";

            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("info@digisoftsolution.net");
            mail.To.Add(new MailAddress("hr@digisoftsolution.net"));

            mail.IsBodyHtml = true;
            mail.Subject = "Email from Contact Us Digisoft!";
            mail.Body = "From: " + contactUsEmail.Email + "<br/> Name: " + contactUsEmail.Name + "<br/> Phone: " + contactUsEmail.PhoneNumber + "<br/>";
            using (var ms = new MemoryStream())
            {
                contactUsEmail.File.CopyTo(ms);
                var fileBytes = ms.ToArray();
                Attachment att = new Attachment(new MemoryStream(fileBytes), contactUsEmail.File.FileName);
                mail.Attachments.Add(att);
            }
            smtp.Send(mail);
            return Ok(new { Success = true });
        }
    }
}
