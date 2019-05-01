Zadatak 02
==========

U datoteci db-dump-02.sql nalaze se podaci o županijama i dnevnim statistikama. Napraviti stranicu koja prikazuje mapu Hrvatske u SVG formatu, te za zadani datum oboji županije ovisno o statističkim vrijednostima.

Detalji
-------

U tablici county nalazi se popis županija. Polje county_id je primarni ključ. Polje svg_path sadrži informacije za prikaz mape.
U tablici county_stats nalaze se statistike po županiji i datumu. Polja (stats_date, county_id) zajedno su jedinstvena (unique index).
Statističke vrijednosti su red i blue. Zbrojene uvijek daju 100.

Ulazni parametar u stranicu skriptu je GET varijabla d, koja sadrži datum u YYYYMMDD formatu. Ako d nije naveden, uzima se trenutni datum. Za neispravne datume tipa 20190229 ili 12378128 stranica mora vraćati HTTP 404 status.

Ovisno o vrijednostima red/blue za pojedinu županiju, istu je na mapi potrebno obojiti između '#cc0000' (red=100, blue=0) i '#0000cc' (red=0, blue=100). Za vrijednosti između koristiti linearnu interpolaciju, e.g. red=50, blue=50 treba dati '#660066'. Primjer možete pogledati u priloženoj slici results-example.png.


Napomene
--------

Koristiti: vanilla PHP. PDO za bazu podataka. 



