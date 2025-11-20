using Bogus;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using WebApi.Data;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMemoryCache _cache;

        public UsersController(AppDbContext context, IMemoryCache cache)
        {
            _context = context;
            _cache = cache;
        }

        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            user.TimeStamp = DateTime.UtcNow;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            _cache.Remove("all_users"); 
            return Ok(user);
        }

        [HttpPost("create-bulk-users")]
        public async Task<IActionResult> CreateBulkUsers()
        {
            var faker = new Faker<User>()
                .RuleFor(u => u.Name, f => f.Person.FullName)
                .RuleFor(u => u.Age, f => f.Random.Int(18, 60))
                .RuleFor(u => u.Email, f => f.Internet.Email())
                .RuleFor(u => u.TimeStamp, f => f.Date.Recent());

            var users = faker.Generate(10000);
            _context.Users.AddRange(users);
            await _context.SaveChangesAsync();
            _cache.Remove("all_users"); // clear cache
            return Ok(new { Created = users.Count });
        }

        [HttpGet("fetch-users")]
        public async Task<IActionResult> FetchUsers()
        {
            if (!_cache.TryGetValue("all_users", out List<User>? users))
            {
                users = await _context.Users.ToListAsync();
                _cache.Set("all_users", users, TimeSpan.FromMinutes(5));
            }

            return Ok(users);
        }
    }
}
