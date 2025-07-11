using Form_Backend.Models;
using Form_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.IO;
namespace Form_Backend.Controllers

{
    [Authorize]
    [ApiController]
    [Route("api/Employees")]
    public class FormController : ControllerBase
    {
        private readonly FormServices _FormService;
        private readonly IWebHostEnvironment _env;
        public FormController(FormServices FormService, IWebHostEnvironment env)
        {
            _env = env;
            _FormService = FormService;
        }

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
        public async Task<IActionResult> UploadFile(FormData newUser)
        //public async Task<IActionResult> Post(Req abc)
        {
            try
            {
                var savedPhotoPath = "";
                if (newUser.Files != null)
                {
                    var uploadsDir =_env.WebRootPath+"/uploads";
                    if (!Directory.Exists(uploadsDir))
                        Directory.CreateDirectory(uploadsDir);
                    var fileName = Path.GetFileName(newUser.Files.FileName);
                    savedPhotoPath = Path.Combine(uploadsDir, fileName);
                    var tempPath = savedPhotoPath;
                    var length = savedPhotoPath.Length-4;
                    


                    var i = 0;
                    while (Directory.GetFiles(uploadsDir).Contains(tempPath))
                    {
                        i++;
                        var temp = savedPhotoPath.Substring(0,length);

                        var extension = savedPhotoPath.Substring(length);
                        tempPath = temp+i+extension;
                        
                    }
                    savedPhotoPath = tempPath;

                    using (var stream = new FileStream(savedPhotoPath, FileMode.CreateNew))
                    {
                        try
                        {
                            await newUser.Files.CopyToAsync(stream);
                        }catch(Exception ex)
                        {
                            Console.WriteLine(ex);
                        }
                    }
                }
                var index = savedPhotoPath.IndexOf("uploads");
                savedPhotoPath = savedPhotoPath.Substring(index);
                var user = new EmployeeData
                {

                    Phone = newUser.Phone ?? "",
                    EmpId = newUser.EmpId ?? "",
                    EmpName = newUser.EmpName ?? "",
                    BankAdd = newUser.BankAdd ?? "",
                    AadharNumber = newUser.AadharNumber ?? "",
                    Status = newUser.Status,
                    MaratialStatus = newUser.MaratialStatus,
                    BankAccountNumber = newUser.BankAccountNumber ?? "",
                    Birth = newUser.Birth,
                    BloodGroup = newUser.BloodGroup,
                    Email = newUser.Email ?? "",
                    FatherName = newUser.FatherName ?? "",
                    IfscCode = newUser.IfscCode ?? "",
                    PanNumber = newUser.PanNumber ?? "",
                    PassportNumber = newUser.PassportNumber ?? "",
                    PermanentAdress = newUser.PermanentAdress ?? "",
                    PresentAdress = newUser.PresentAdress ?? "",
                    SameAsPresent = newUser.SameAsPresent,
                    RoleType = newUser.RoleType,
                    IsDeleted = false,
                    PhotoUrl = savedPhotoPath??"",
                    HolderName = newUser.HolderName??"",
                    BankName = newUser.BankName??""
                };
                var userId = newUser.EditId;
                if (newUser.EditId == "1")
                    userId = await _FormService.CreateAsync(user);
                else
                    userId = await _FormService.UpdateAsync(newUser.EditId, user);

                return Ok();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Ok(ex);
            }
        }
        //[HttpPost("upload")]
        //public async Task<IActionResult> Post([FromBody] FilesModel datas)
        //{
        //    var files = new FilesModel
        //    {
        //        CandidatePhoto = datas.CandidatePhoto,
        //        CandidateSign = datas.CandidateSign
        //    };
        //    await _FormService.UpdateAsync();
        //    return Ok();
        //}
    }
}
