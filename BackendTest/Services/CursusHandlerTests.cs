using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using Backend.Models;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Backend.Services.Tests
{
    [TestClass()]
    public class CursusHandlerTests
    {
        [TestMethod()]
        public async Task AddSingleCursusWithSingleInstantie()
        {
            List<CursusInstantie> cursusInstantie1 = new () {
                new()
                {
                    StartDatum = DateTime.Now
                }
            };

            List<Cursus> cursussen = new () {
                new()
                {
                    Titel = "Titel1",
                    Duur = 1,
                    Code = "Code1",
                    CursusInstanties = cursusInstantie1
                }
            };

            var optionsBuilder = new DbContextOptionsBuilder<CursusContext>();
            optionsBuilder.UseInMemoryDatabase("InMemoryCursussenDB");
            var context = new CursusContext(optionsBuilder.Options);

            var cursusHandler = new CursusHandler();

            var res = await cursusHandler.ReorganizeAndAddCursussenAsync(context, cursussen);

            Assert.AreEqual(res, "Er zijn 1 cursussen en 1 cursusinstanties toegevoegd.");
        }

        [TestMethod()]
        public async Task AddSingleCursusWithMultipleInstanties()
        {
            List<CursusInstantie> cursusInstantie1 = new () {
                new()
                {
                    StartDatum = DateTime.Now
                }
            };

            List<CursusInstantie> cursusInstantie2 = new () {
                new()
                {
                    StartDatum = DateTime.Now.AddDays(1)
                }
            };

            List<Cursus> cursussen = new () {
                new()
                {
                    Titel = "Titel1",
                    Duur = 1,
                    Code = "Code1",
                    CursusInstanties = cursusInstantie1
                },
                new()
                {
                    Titel = "Titel1",
                    Duur = 1,
                    Code = "Code1",
                    CursusInstanties = cursusInstantie2
                }
            };

            var optionsBuilder = new DbContextOptionsBuilder<CursusContext>();
            optionsBuilder.UseInMemoryDatabase("InMemoryCursussenDB");
            var context = new CursusContext(optionsBuilder.Options);

            var cursusHandler = new CursusHandler();

            var res = await cursusHandler.ReorganizeAndAddCursussenAsync(context, cursussen);

            Assert.AreEqual(res, "Er zijn 1 cursussen en 2 cursusinstanties toegevoegd.");
        }

        [TestMethod()]
        public async Task AddMultipleCursussenWithMultipleInstanties()
        {
            List<CursusInstantie> cursusInstantie1 = new () {
                new()
                {
                    StartDatum = DateTime.Now
                }
            };

            List<CursusInstantie> cursusInstantie2 = new () {
                new()
                {
                    StartDatum = DateTime.Now.AddDays(1)
                }
            };

            List<Cursus> cursussen = new () {
                new()
                {
                    Titel = "Titel1",
                    Duur = 1,
                    Code = "Code1",
                    CursusInstanties = cursusInstantie1
                },
                new()
                {
                    Titel = "Titel2",
                    Duur = 2,
                    Code = "Code2",
                    CursusInstanties = cursusInstantie2
                }
            };

            var optionsBuilder = new DbContextOptionsBuilder<CursusContext>();
            optionsBuilder.UseInMemoryDatabase("InMemoryCursussenDB");
            var context = new CursusContext(optionsBuilder.Options);

            var cursusHandler = new CursusHandler();

            var res = await cursusHandler.ReorganizeAndAddCursussenAsync(context, cursussen);

            Assert.AreEqual(res, "Er zijn 2 cursussen en 2 cursusinstanties toegevoegd.");
        }

        [TestMethod()]
        public async Task AddSingleCursusWithMultipleInstantiesWithSingleDuplicate()
        {
            List<CursusInstantie> cursusInstantie1 = new () {
                new()
                {
                    StartDatum = DateTime.Now
                }
            };

            List<CursusInstantie> cursusInstantie2 = new () {
                new()
                {
                    StartDatum = DateTime.Now.AddDays(1)
                }
            };

            List<Cursus> cursussen = new () {
                new()
                {
                    Titel = "Titel1",
                    Duur = 1,
                    Code = "Code1",
                    CursusInstanties = cursusInstantie1
                },
                new()
                {
                    Titel = "Titel1",
                    Duur = 1,
                    Code = "Code1",
                    CursusInstanties = cursusInstantie2
                }
            };

            var optionsBuilder = new DbContextOptionsBuilder<CursusContext>();
            optionsBuilder.UseInMemoryDatabase("InMemoryCursussenDB");
            var context = new CursusContext(optionsBuilder.Options);

            context.Cursus.Add(cursussen[0]);
            context.SaveChanges();

            var cursusHandler = new CursusHandler();

            var res = await cursusHandler.ReorganizeAndAddCursussenAsync(context, cursussen);

            Assert.AreEqual(res, "Er zijn 1 cursussen en 1 cursusinstanties toegevoegd. Er zijn 1 duplicaten tegengekomen.");
            context.Dispose();
        }
    }
}