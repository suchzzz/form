using Form_Backend.Models;
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
        public User Create(User user)
        {
            _userDatas.InsertOneAsync(user);
            return user;
        }


        public string Authenticate(string email, string password)
        {
            var user = _userDatas.Find(x => x.Email == email && x.Password ==
            password).FirstOrDefault();
            if (user == null)
                return null;
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenkey = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]{
                        new Claim (ClaimTypes.Email, email),
                        }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenkey),
                                            SecurityAlgorithms.Sha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


    }
}
