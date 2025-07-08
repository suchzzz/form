namespace Form_Backend.Models
{
    public class FormDatabaseSetting
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string FormCollectionName { get; set; } = null!;
    }
}
