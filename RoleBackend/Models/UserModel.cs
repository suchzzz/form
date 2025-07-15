using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace RoleBackend.Models
{
    public class GenericModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string OrgId { get; set; } = System.Guid.NewGuid().ToString();
    }
    public class UserModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
    //public class Admin : UserModel
    //{
    //    [BsonId]
    //    [BsonRepresentation(BsonType.ObjectId)]
    //    public string Id { get; set; }
    //    public string OrgId { get; set; } = System.Guid.NewGuid().ToString();
    //}
    public class User : UserModel
    {
        //[BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        //public string Id { get; set; }
        //public string OrgId { get; set; }= System.Guid.NewGuid().ToString();
        public string PhoneNumber { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsAdmin { get; set; }
    }
}
