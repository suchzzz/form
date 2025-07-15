using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoleBackend.Models;
using RoleBackend.Services;

namespace RoleBackend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/users")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeServices _EmployeeServices;
        public EmployeeController(EmployeeServices EmployeeServices)
        {
            _EmployeeServices = EmployeeServices;
        }
        [HttpGet]
        public async Task<ActionResult<User>> Users()
        {
            return Ok(await _EmployeeServices.GetUserAsync());
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser(UserModel userData)
        {
            var user = new User
            {
                Email = userData.Email,
                Name = userData.Name,
                Password = userData.Password,
                OrgId = "",
                PhoneNumber = "",
                IsDeleted = false
            };
            var id=await _EmployeeServices.CreateUserAsync(user);
            return Ok(user);
        }

    }
}
