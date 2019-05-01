Zadatak 01
==========

Na web stranici index.htm napraviti funkcionalnost "slučajnog citata" (eng. random quote).

Detalji
-------

Postoje dvije skripte:

- quotes.php. Server strana. Unutra napisati kod koji vraća slučajni citat. Lista dostupnih citata dobiva se sa getAllQuotes(). Svaki citat se sastoji od unique ID-a, teksta i autora.

- index.htm. Klijent strana. Sadrži između ostalog i fragment za prikaz citata (div.random-quote). U kodu stranice potrebno je napraviti AJAX poziv na quotes.php, te ubaciti primljeni citat u stranicu. 

Jednom prikazani citat ne smije se više prikazivati istom posjetitelju. Ako ne postoji ni jedan dostupni citat, sakriti cijeli fragment. 

U slučaju bilo kakve server greške (HTTP status 400 ili veći), sakriti cijeli fragment.

Napomene
--------

Dozvoljeno koristiti: jQuery, dodaci za jQuery, vanilla PHP 5.4 ili noviji



