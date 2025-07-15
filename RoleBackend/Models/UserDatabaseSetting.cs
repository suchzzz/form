namespace RoleBackend.Models
{
    public class UserDatabaseSetting
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string UserCollectionName { get; set; } = null!;
        public string AdminCollectionName { get; set; } = null!;
    }
}
