using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TaskManager.Database;
using TaskManager.DTOs;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TaskContext _context;
        private readonly IConfiguration _configuration;

        public UsersController(TaskContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.Include(u=> u.Address).Include(u => u.Tasks).ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.Include(u => u.Address).Include(u => u.Tasks).FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
     
        public async Task<IActionResult> PutUser(int id, UserRequestDTO userRequest)
        {
            // Check if the requested user ID matches the ID in the URL
            var existingUser = await _context.Users.Include(u => u.Address).FirstOrDefaultAsync(u => u.Id == id);
            if (existingUser == null)
            {
                return NotFound();
            }

            // Map UserRequestDTO fields to User model fields
            existingUser.Name = userRequest.Name;
            existingUser.Email = userRequest.Email;
            existingUser.Phone = userRequest.Phone;
            existingUser.Role = userRequest.Role;
            existingUser.Tasks = userRequest.Tasks;

            // Update Address if provided
            if (userRequest.Address != null)
            {
                existingUser.Address.City = userRequest.Address.City;
                existingUser.Address.Line1 = userRequest.Address.Line1;
                existingUser.Address.Line2 = userRequest.Address.Line2;
            }

            // Hash the password and assign it to PasswordHash
            existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userRequest.Password);

            // Mark the User entity as modified
            _context.Entry(existingUser).State = EntityState.Modified;
            if (existingUser.Address != null)
            {
                _context.Entry(existingUser.Address).State = EntityState.Modified;
            }

                await _context.SaveChangesAsync();
            

            return NoContent();
        }

        /* public async Task<IActionResult> PutUser(int id, User user)
         {
             if (id != user.Id)
             {
                 return BadRequest();
             }

             _context.Entry(user).State = EntityState.Modified;
             _context.Entry(user.Address).State = EntityState.Modified;

             try
             {
                 await _context.SaveChangesAsync();
             }
             catch (DbUpdateConcurrencyException)
             {
                 if (!UserExists(id))
                 {
                     return NotFound();
                 }
                 else
                 {
                     throw;
                 }
             }

             return NoContent();
         }*/

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostUser(UserRequestDTO userReq)
        {
            var user = new User
            {
                Name = userReq.Name,
                Email = userReq.Email,
                Phone = userReq.Phone,
                Role = userReq.Role,
                Tasks = userReq.Tasks,
                Address = userReq.Address,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userReq.Password) 

            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            //var createdUser =  CreatedAtAction("GetUser", new { id = user.Id }, user);
          
            var token = CreateToken(user);
            return Ok(token);
        }

        [HttpPost("login")] 
        public async Task<IActionResult> Login(loginRequestDTO loginRequest)
        {
            try
            {
                var user = await _context.Users.Include(u => u.Address).Include(u => u.Tasks).FirstOrDefaultAsync(u => u.Email == loginRequest.Email);
                if (user == null)
                {
                    throw new Exception("User not found");
                }
                var isValid = BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash);
                if (!isValid)
                {
                    throw new Exception("Password is invalid");
                }
                var token = CreateToken(user);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
   

        }

        private TokenModel CreateToken(User user)
        {
            var claimList = new List<Claim>();
            claimList.Add(new Claim("UserId",user.Id.ToString()));
            claimList.Add(new Claim("Name", user.Name.ToString()));
            claimList.Add(new Claim("Email",user.Email.ToString()));
            claimList.Add(new Claim("Phone",user.Phone.ToString()));
            claimList.Add(new Claim("Role", user.Role.ToString()));
            /* claimList.Add(new Claim("Tasks", user.Tasks.ToString()));
             claimList.Add(new Claim("Address", user.Address.ToString())); */

           /* if (user.Tasks != null )
            {
                var tasksJson = JsonSerializer.Serialize(user.Tasks.Select(t => new { t.Title, t.Description, t.DueDate, t.Priority }));
                claimList.Add(new Claim("Tasks", tasksJson));
            }
            else
            {
                claimList.Add(new Claim("Tasks", "[]")); 
            }

       
            if (user.Address != null)
            {
                var addressJson = JsonSerializer.Serialize(new { user.Address.Line1, user.Address.Line2, user.Address.City });
                claimList.Add(new Claim("Address", addressJson));
            }
            else
            {
                claimList.Add(new Claim("Address", "{}"));
            }*/


            var key = _configuration["Jwt:Key"];
            var secKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
            var credential = new SigningCredentials(secKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claimList,  
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credential 
                );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            var res = new TokenModel();
            res.Token = tokenString;
            return res;


        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
