using Microsoft.AspNetCore.Mvc;
using RoleBackend.Models;
using RoleBackend.Services;

namespace RoleBackend.Controllers
{
    [ApiController]
    [Route("api/admins")]
    public class AdminController : ControllerBase
    {
        private readonly AdminService _adminService;
        public AdminController(AdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet]
        public async Task<ActionResult<Admin>> Admins()
        {
            return Ok(await _adminService.GetAdminAsync());
        }
        [HttpPost]
        public async Task<ActionResult> CreateAdmin(UserModel userData)
        {
            var user = new Admin
            {
                Email = userData.Email,
                Name = userData.Name,
                Password = userData.Password
            };
            await _adminService.CreateAdminAsync(user);
            return Ok(user);
        }
    }
}
