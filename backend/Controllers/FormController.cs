using Form_Backend.Models;
using Form_Backend.Services;
using Microsoft.AspNetCore.Mvc;
namespace Form_Backend.Controllers
{
    [ApiController]
    [Route("api/Employees")]
    public class FormController : ControllerBase
    {
        private readonly FormServices _FormService;

        public FormController(FormServices FormService) =>
            _FormService = FormService;

        [HttpGet]
        public async Task<ActionResult<FormData>> Get(string id = null, int page = 0, int show = 0, string query = "")
        {
            if (
                id == null)
            {
                //var data = await _FormService.GetAsync();
                //return Ok(data.Skip(page*show).Take(show));

                return Ok(await _FormService.GetAsync(page, show, query));
            }
            else
            {
                var user = await _FormService.GetAsync(id);

                if (user is null)
                {
                    return NotFound();
                }

                return user;
            }
        }

        //[HttpPut("{id}")]
        //public async Task<ActionResult<FormData>> Update(string? id, FormData updatedData)
        //{
        //    FormData data = await _FormService.GetAsync(id);
        //    if (data is null)
        //    {
        //        return NotFound();
        //    }
            
        //    updatedData.Id = data.Id;

        //    await _FormService.UpdateAsync(id, updatedData);
        //    return Ok();
        //}

        [HttpPost("delete")]
        public async Task<IActionResult> Post([FromBody]string id)
        {
            var user = new EmployeeData
            {
                //user.Id=EmployeeData.id
                IsDeleted = true
            };
            await _FormService.UpdateAsync(id, user);

            return Ok();
        }

        //public class Req{
        //    public string id { get; set; }
        //    public FormData newUser { get; set; }
        //    }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]FormData newUser)
        //public async Task<IActionResult> Post(Req abc)
        {
            //var newUser= abc.newUser;
            //var id = abc.id;
            Console.WriteLine(newUser);
            try
            {
                var user = new EmployeeData
                {
                    Phone = newUser.Phone,
                    EmpId = newUser.EmpId,
                    EmpName = newUser.EmpName,
                    BankAdd = newUser.BankAdd,
                    AadharNumber = newUser.AadharNumber,
                    Status = newUser.Status,
                    MaratialStatus = newUser.MaratialStatus,
                    CandidateSign = newUser.CandidateSign,
                    BankAccountNumber = newUser.BankAccountNumber,
                    Birth = newUser.Birth,
                    BloodGroup = newUser.BloodGroup,
                    CandidatePhoto = newUser.CandidatePhoto,
                    Email = newUser.Email,
                    FatherName = newUser.FatherName,
                    IfscCode = newUser.IfscCode,
                    PanNumber = newUser.PanNumber,
                    PassportNumber = newUser.PassportNumber,
                    PermanentAdress = newUser.PermanentAdress,
                    PresentAdress = newUser.PresentAdress,
                    SameAsPresent = newUser.SameAsPresent,
                    RoleType = newUser.RoleType,
                    IsDeleted = false
                };
                if (newUser.EditId == null)
                    await _FormService.CreateAsync(user);
                else
                    await _FormService.UpdateAsync(newUser.EditId, user);

                return Ok();
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
        }
    }
}
