# TJV - TaskManager


Cílem tohoto aplikace je poskytnout uživatelům efektivní a pružný způsob, jak spravovat své denní úkoly a plány. Aplikace je zaměřena na zvýšení produktivity a pomáhá uživatelům dosáhnout svých cílů systematickým způsobem. Kromě základních funkcí správy úkolů také poskytuje vizuální kalendářní rozhraní pro lepší přehled.

## Operace

### Úprava Existujícího Úkolu
Operace umožňuje uživatelům upravit detaily existujícího úkolu. Uživatelé mohou změnit název, popis, tagy, kategorie, a datum dokončení úkolu.

### Klient - Interakce s Uživatelem
1. Uživatel vybere úkol k úpravě v aplikaci.
2. Aplikace zobrazí formulář s aktuálními detaily úkolu (načtené ze serveru).
3. Uživatel provede požadované změny (např. změní název, popis, přidá/odebere tagy).

### Komunikace se Serverem
1. **Načtení Detailů Úkolu:** Klient odešle `GET` požadavek pro získání aktuálních detailů úkolu.
2. **Uživatel Upraví Úkol:** Klient umožňuje uživateli modifikovat detaily úkolu.
3. **Odeslání Změn na Server:** Po potvrzení změn uživatelem klient odešle `PUT` požadavek s upravenými detaily úkolu.

### Zpracování na Serveru
Server přijme požadavek na úpravu, ověří oprávnění uživatele k úpravě daného úkolu a aplikuje změny v databázi.

## Koncepční Model
![Koncepční Model Databáze](/images/diagram.png "Diagram")

## Popis komplexního dotazu:
 Uživatel může odeslat GET požadavek s parametry, které určují požadované tagy a kategorie.

`GET /api/tasks`

### Parametry Dotazu

Uživatel může specifikovat následující parametry ve svém dotazu:

- `tags` - seznam ID tagů, které mají být aplikovány na úkoly.
- `categories` - seznam ID kategorií, do kterých úkoly spadají.
- `dateFrom` - počáteční datum a čas, od kdy mají být úkoly zahrnuty.
- `dateTo` - koncové datum a čas, do kdy mají být úkoly zahrnuty.

`GET /api/tasks?tags=1,2,3&categories=5,6&dateFrom=2023-01-01T00:00:00Z&dateTo=2023-01-31T23:59:59`

Tento dotaz by vrátil všechny úkoly, které odpovídají alespoň jednomu z uvedených tagů a zároveň jsou kategorizovány alespoň jednou z uvedených kategorií v zadaném časovém rozmezí.

### Zpracování na Serveru

Server při obdržení tohoto požadavku provede následující kroky:

1. Parsuje parametry z URL dotazu.
2. Sestaví SQL dotaz, který spojí tabulky úkolů, tagů a kategorií.
3. Aplikuje filtr na základě specifikovaných ID tagů a kategorií, a také kontroluje časové rozmezí.
4. Vrátí odpověď v JSON formátu, která obsahuje seznam úkolů odpovídajících kritériím.

### Příklad Odpovědi JSON

```json
{
  "tasks": [
    {
      "id": 12,
      "name": "Nakoupit potraviny",
      "description": "Mléko, chléb, máslo",
      "tags": [{"id": 1, "name": "Nákupy"}],
      "category": {"id": 5, "name": "Domácnost"},
      "dueDate": "2023-01-15T10:00:00Z"
    },
    // další úkoly ...
  ]
}