using Form_Backend.Models;
using Form_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Form_Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/auth")]
    public class UserController : ControllerBase
    {
        public readonly UserServices service;

        public UserController(UserServices _service)
        {
            service = _service;
        }

        [AllowAnonymous]
        [Route("authenticate")]
        [HttpPost]
        public ActionResult Login([FromBody] UserModel user)
        {
            var token = service.Authenticate(user.Email, user.Password);
            if (token == null)
                return Unauthorized();
            return Ok(new { token, user });
        }

        [HttpGet]
        public async Task<ActionResult<User>> Get(string id = null)
        {
            if (id == null)
            {
                return Ok(await service.GetUsers());
            }
            else
            {
                var user = await service.GetUser(id);
                if (user is null)
                {
                    return NotFound();
                }
                return user;
            }
        }
        [HttpPost]
        public ActionResult<UserModel> Create(UserModel user)
        {
            var newUser = new User
            {
                Email = user.Email,
                Password = user.Password
            };
            service.Create(newUser);
            return user;

        }

    }
}
