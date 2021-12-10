using Backend.Data;
using Backend.Models;

namespace Backend.Services
{
    public class CursusHandler : ICursusHandler
    {
        private int totalInstanties;
        private int duplicates;
        public async Task<string> ReorganizeAndAddCursussenAsync(CursusContext _context, List<Cursus> cursussen)
        {
            string res = "Er zijn XXX cursussen en YYY cursusinstanties toegevoegd.DDD";

            totalInstanties = 0;
            duplicates = 0;
            List<Cursus> cursussenWithInstanties = GetCombinedCursussen(_context, cursussen);

            res = ReplaceInResAccordingly(res, cursussenWithInstanties.Count().ToString(), totalInstanties.ToString(), duplicates.ToString());

            if (cursussenWithInstanties.Count() > 0)
            {
                await AddCursussenToDbAsync(_context, cursussenWithInstanties);
            }

            return res;
        }

        private List<Cursus> GetCombinedCursussen(CursusContext _context, List<Cursus> cursussen)
        {
            List<Cursus> cursussenWithInstanties = new List<Cursus>() { };

            foreach (Cursus cursus in cursussen)
            {
                if (CheckForDuplicates(_context, cursus))
                {
                    duplicates++;
                }
                else
                {
                    if (!cursussenWithInstanties.Any(c => c.Titel == cursus.Titel))
                    {
                        cursussenWithInstanties.Add(cursus);
                        totalInstanties++;
                    }
                    else
                    {
                        for (int i = 0; i < cursussenWithInstanties.Count(); i++)
                        {
                            if (cursus.Titel == cursussenWithInstanties[i].Titel)
                            {
                                List<CursusInstantie> ci = cursussenWithInstanties[i].CursusInstanties.ToList();
                                ci.Add(cursus.CursusInstanties.First());

                                cursussenWithInstanties[i].CursusInstanties = ci;
                                totalInstanties++;
                            }
                        }
                    }
                }
            }
            return cursussenWithInstanties;
        }

        private bool CheckForDuplicates(CursusContext _context, Cursus cursus)
        {
            return _context.Cursus.Where(
                    c => c.Code == cursus.Code &&
                    c.Duur == cursus.Duur &&
                    c.Titel == cursus.Titel &&
                    c.CursusInstanties.Where(
                        ci => ci.StartDatum == cursus.CursusInstanties.First().StartDatum
                        ).Any()
                    ).Any();
        }

        private string ReplaceInResAccordingly(string res, string cursussenAmount, string cursusInstantiesAmount, string duplicateCursussen)
        {
            res = res.Replace("XXX", cursussenAmount).Replace("YYY", cursusInstantiesAmount);
            if (!duplicateCursussen.Equals("0"))
            {
                return res.Replace("DDD", " Er zijn " + duplicateCursussen + " duplicaten tegengekomen.");
            } else
            {
                return res.Replace("DDD", "");
            }
        }

        private async Task AddCursussenToDbAsync(CursusContext _context, List<Cursus> cursussenWithInstanties)
        {
            foreach (Cursus cursusWithInstanties in cursussenWithInstanties)
            {
                _context.Add(cursusWithInstanties);
            }            
            
            await _context.SaveChangesAsync();
        }
    }
}
