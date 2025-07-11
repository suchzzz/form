using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Form_Backend.Models
{
    [BsonIgnoreExtraElements]
    public class UserModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
    }
    public class User : UserModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Refresh_token { get; set; }
    }

}
