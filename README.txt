Welkom bij de case herkansing van Cefas Pex. Dit project is gemaakt met behulp van de nieuwste Visual Studio (2022), .NET (6.0) etc. (vanaf 10/12/2021) 
De geïnstalleerde workloads op de gebruikte computer zijn te zien in bijlage1.jpg

Hierbij de setup om de site op te starten:

1. Open met behulp van Visual Studio (administrator) de Backend.sln

2. Run in de Package Manager Console de volgende code om de database aan te maken:
Update-Database

3. Gebruik ctrl+F5 of run met behulp van de run-knop de CASECFP_WebApi. Dit opent een terminal en een browser-window met de swagger.

4. Met een nieuw Command window, ga naar de folder AngularFrontend (die zit in Frontend).

5. Run de volgende code in volgorde:
npm install
npm start

6. In de command window zie je zodra het succesvol is gecompiled het volgende staan:
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
Ga naar http://localhost:4200/ (of een eventueel andere link die er staat) op je gewenste browser om de site te zien.

Afsluiten:
Om weer af te sluiten, gebruik Ctrl+C in de command window om de angular te stoppen, en klik de swagger browser-window en de Backend.exe terminal weg.