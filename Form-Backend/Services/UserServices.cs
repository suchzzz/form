using Form_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace Form_Backend.Services
{
    public class UserServices
    {
        private readonly IMongoCollection<User> _userDatas;
        private readonly string key;

        public UserServices(
        IOptions<UserModelDatabaseSetting> UserModelDatabaseSetting)
        {
            var mongoClient = new MongoClient(
                UserModelDatabaseSetting.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                UserModelDatabaseSetting.Value.DatabaseName);

            _userDatas = mongoDatabase.GetCollection<User>(
                UserModelDatabaseSetting.Value.UserCollectionName);

            this.key = UserModelDatabaseSetting.Value.JwtKey;
        }

        public async Task<List<User>> GetUsers()
        {
            return await _userDatas.Find(user => true).ToListAsync();
        }
        public async Task<User> GetUser(string id)
        {
            return await _userDatas.Find<User>(user => user.Id == id).FirstOrDefaultAsync();
        }
        public async Task<User> GetUserByEmail(string email)
        {
            var x = await _userDatas.Find<User>(user => user.Email == email).FirstOrDefaultAsync();
            return x;
        }
        public User Create(User user)
        {
            //var x= _userDatas.Find<User>(user => user.Email == user.Email).FirstOrDefaultAsync();
            _userDatas.InsertOneAsync(user);
            return user;
        }

        public async Task UpdateRefreshToken(string email,string token)
        {
            var x = await _userDatas.Find<User>(user => user.Email == email).FirstOrDefaultAsync();

            UpdateDefinitionBuilder<User> builder = Builders<User>.Update;
            UpdateDefinition<User> update = builder.Set(f => f.Id,x.Id).Set("Refresh_token", token);
            await _userDatas.UpdateOneAsync<User>(y => y.Id == x.Id,update);
        }

        [AllowAnonymous]
        public string Authenticate(string email, string password,int time)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                return null;

            try
            {
                var user = _userDatas.Find(x => x.Email == email && x.Password == password).FirstOrDefault();
                if (user == null)
                    return null;

                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenkey = Encoding.UTF8.GetBytes(key);
                var tokenDescrpitor = new SecurityTokenDescriptor()
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                new Claim(ClaimTypes.Email, email),
                    }),
                    Expires = DateTime.UtcNow.AddDays(time),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256Signature)

                };
                var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescrpitor));
                return token;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
