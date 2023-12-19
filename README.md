# TJV - TaskManager


Cílem tohoto aplikace je poskytnout uživatelům efektivní a pružný způsob, jak spravovat své denní úkoly a plány. Aplikace je zaměřena na zvýšení produktivity a pomáhá uživatelům dosáhnout svých cílů systematickým způsobem. Kromě základních funkcí správy úkolů také poskytuje vizuální kalendářní rozhraní pro lepší přehled.

## Operace

### Vytvoření uživatelské kategorie
Při vytváření nebo opravě úkolu může uživatel k uspořádání úkolů použít také kategorie. Je možné použít standardní kategorie nebo vytvořit vlastní kategorie.

### Pořadí  
1. Uživateli se zobrazí seznam všech aktuálních kategorií.
2. Při vytváření nové kategorie se zadává její název, symbol a barva.
3. Uživatel musí zkontrolovat, zda název nové kategorie není stejný jako název již existujících systémových kategorií.
4. Je-li nová kategorie unikátní a nekoliduje se systémovými kategoriemi, pošle na API požadavek na vytvoření této kategorie .

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