using Backend.Data;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Controllers.Tests
{
    [TestClass()]
    public class CursusControllerTests
    {
        private readonly ICursusHandler handler;

        public CursusControllerTests()
        {
            handler = Mock.Of<ICursusHandler>();
        }

        [TestMethod()]
        public void GetCursusTest()
        {
            var optionsBuilder = new DbContextOptionsBuilder<CursusContext>();
            optionsBuilder.UseInMemoryDatabase("InMemoryCursussenDB");
            var context = new CursusContext(optionsBuilder.Options);

            List<CursusInstantie> cursusInstantie1 = new () {
                new()
                {
                    StartDatum = DateTime.Now
                }
            };
            Cursus cursus = new ()
            {
                Titel = "Titel1",
                Duur = 1,
                Code = "Code1",
                CursusInstanties = cursusInstantie1
            };
            context.Cursus.Add(cursus);
            context.SaveChanges();

            CursusController cursusController = new (context, handler);
            var result = cursusController.GetCursus();

            Assert.IsInstanceOfType(result.Result.Value, typeof(List<Cursus>));
            Assert.AreEqual(result.Result.Value?.First().Titel, cursus.Titel);
            context.Dispose();
        }

        [TestMethod()]
        public void PostCursusTest()
        {
            var optionsBuilder = new DbContextOptionsBuilder<CursusContext>();
            optionsBuilder.UseInMemoryDatabase("InMemoryCursussenDB");
            var context = new CursusContext(optionsBuilder.Options);


            List<CursusInstantie> cursusInstantie1 = new () {
                new()
                {
                    StartDatum = DateTime.Now
                }
            };

            List<Cursus> cursusList = new ()
            {
                new ()
                {
                    Titel = "Titel1",
                    Duur = 1,
                    Code = "Code1",
                    CursusInstanties = cursusInstantie1
                }
            };

            CursusController cursusController = new (context, handler);
            var result = cursusController.PostCursus(cursusList);

            Assert.IsInstanceOfType(result.Result.Result, typeof(OkObjectResult));
            context.Dispose();
        }
    }
}