using Form_Backend.Models;
using Form_Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SharpCompress.Compressors.Xz;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Reflection.PortableExecutable;

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

        public class LoginSchema()
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
        

        [AllowAnonymous]
        [Route("login")]
        [HttpPost]
        public async Task<ActionResult> Login([FromBody] LoginSchema user)
        {
            var token = service.Authenticate(user.Email, user.Password,10);
            if (token == null)
                return Unauthorized();

            var Refresh_token = service.Authenticate(user.Email, user.Password, 60);
            await service.UpdateRefreshToken(user.Email, Refresh_token);

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
        [Authorize]
        [Route("stillAuthorized")]
        [HttpGet]
        public ActionResult Authorized()
        {
            var Acesstoken = Request.Headers.Authorization.ToString();
            if (!Acesstoken.StartsWith("Bearer"))
                return null;
            Acesstoken = Acesstoken.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(Acesstoken) as JwtSecurityToken;

            var expirationDateAcess = jsonToken.ValidTo;
            if (expirationDateAcess < DateTime.UtcNow)
                return Unauthorized();
            return Ok();
        }
        [AllowAnonymous]
        [Route("gettoken")]
        [HttpGet]
        public async Task<ActionResult<UserModel>> GetToken()
        {
            var Acesstoken = Request.Headers.Authorization.ToString();
            if (!Acesstoken.StartsWith("Bearer"))
                return null;
            Acesstoken = Acesstoken.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(Acesstoken) as JwtSecurityToken;
            string email = jsonToken.Claims.First(claim => claim.Type == "email").Value;
            var data = await service.GetUserByEmail(email);

            //var expirationDateAcess = jsonToken.ValidTo;
            //if (expirationDateAcess < DateTime.UtcNow)
            //    return Unauthorized();

            var UserRefreshToken = data.Refresh_token;
            jsonToken = handler.ReadToken(UserRefreshToken) as JwtSecurityToken;
            var expirationDate = jsonToken.ValidTo;
            if (expirationDate > DateTime.UtcNow)
                return NotFound();
            
            var NewAcessToken = service.Authenticate(data.Email, data.Password,10);
            var NewRefreshTOken= service.Authenticate(data.Email, data.Password, 60);
            await service.UpdateRefreshToken(email, NewRefreshTOken);

            return Ok(new { NewAcessToken, data });
        }


        [AllowAnonymous]
        [HttpPost]
        public ActionResult<UserModel> Create(UserModel user)
        {
            var newUser = new User
            {
                Name=user.Name,
                Email = user.Email,
                Password = user.Password
            };
            service.Create(newUser);
            var token = service.Authenticate(user.Email, user.Password,10);
            return Ok(new { token, user });
        }
        [Authorize]
        [Route("me")]
        [HttpGet]
        public async Task<ActionResult<UserModel>>Me()
        {
            var token = Request.Headers.Authorization.ToString();
            if (!token.StartsWith("Bearer"))
                return null;
            token = token.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

           

            string email = jsonToken.Claims.First(claim=>claim.Type=="email").Value;
            var data = await service.GetUserByEmail(email);
            return Ok(data);
        }

    }
}
