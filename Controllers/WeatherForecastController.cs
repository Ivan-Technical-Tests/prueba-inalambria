using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }



    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {

        string[] test = new string[] {
            "[2|1] [2|3] [1|3]", // Pasar
            "[1|2] [4|1] [2|3]", // No pasar
            "[6|1] [6|3] [3|1]", // Pasar
            "[1|2] [3|1]", // No pasar
        };

        // Validar  cada petición
        string pattern = @"\[\d\|\d\]";
        Regex rgx = new(pattern);
        foreach (var item in test)
        {
            // Validar que la cadena tenga al menos 3 fichas
            if (rgx.Matches(item).Count < 3)
            {
                Console.WriteLine("No contienen al menos 3 fichas");
                continue;
            }

            // Validar que el primer y último número sean iguales
            string[] fichas = item.Split(" ");
            string[] primerFicha = fichas[0].Replace("[", "").Replace("]", "").Split("|");
            string[] ultimaFicha = fichas[^1].Replace("[", "").Replace("]", "").Split("|");
            if (primerFicha[0] != ultimaFicha[1])
            {
                Console.WriteLine("No cumplen con el primer y último número iguales");
                continue;
            }

            // Validar que las fichas concuerden
            bool paso = true;
            for (int i = 0; i < fichas.Length - 1; i++)
            {
                string[] ficha = fichas[i].Replace("[", "").Replace("]", "").Split("|");
                string[] siguienteFicha = fichas[i + 1].Replace("[", "").Replace("]", "").Split("|");
                if (ficha[1] != siguienteFicha[0])
                {
                    paso = false;
                    break;
                }
            }

            if (paso)
            {
                Console.WriteLine("Pasó: " + item);
            }
            else
            {
                Console.WriteLine("No pasó: " + item);
            }
        }

        Console.WriteLine("Fin de las pruebas");

        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }

}
