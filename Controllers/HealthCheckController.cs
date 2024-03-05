using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class HealthCheckController : ControllerBase
{
    [HttpGet(Name = "HealthCheck")] // http://localhost:3000/healthcheck
    public IActionResult Get()
    {
        return Ok("Healthy");
    }
}
