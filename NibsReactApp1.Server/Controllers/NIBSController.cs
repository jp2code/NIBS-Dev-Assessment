using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NibsReactApp1.Server.Models;

namespace NibsReactApp1.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NIBSController : ControllerBase
{
    private readonly AppDbContext _context;

    public NIBSController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NIBS>>> GetNIBS()
    {
        return await _context.NIBS.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<NIBS>> GetNIBS(int id)
    {
        var nibs = await _context.NIBS.FindAsync(id);
        if (nibs == null)
            return NotFound();
        return nibs;
    }

    // Add POST, PUT, DELETE as needed for full CRUD
    [HttpPost]
    public async Task<ActionResult<NIBS>> PostNIBS(NIBS nibs)
    {
        nibs.ID = 0; // Ensure EF treats this as a new entity
        _context.NIBS.Add(nibs);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetNIBS), new { id = nibs.ID }, nibs);
    }
    // PUT: api/NIBS/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutNIBS(int id, NIBS nibs)
    {
        if (id != nibs.ID)
            return BadRequest();

        _context.Entry(nibs).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.NIBS.Any(e => e.ID == id))
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }

    // DELETE: api/NIBS/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNIBS(int id)
    {
        var nibs = await _context.NIBS.FindAsync(id);
        if (nibs == null)
            return NotFound();

        _context.NIBS.Remove(nibs);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}