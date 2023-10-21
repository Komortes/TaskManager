# TJV - TaskManager


Cílem tohoto aplikace je poskytnout uživatelům efektivní a pružný způsob, jak spravovat své denní úkoly a plány. Aplikace je zaměřena na zvýšení produktivity a pomáhá uživatelům dosáhnout svých cílů systematickým způsobem. Kromě základních funkcí správy úkolů také poskytuje vizuální kalendářní rozhraní pro lepší přehled.

## Business operace (pro klienta)

- **Správa Úkolů**: Uživatel může vytvářet, upravovat a mazat úkoly. Pro každý úkol může být nastaven specifický termín a čas.
- **Stav Úkolu**: Uživatel může označovat úkoly jako dokončené nebo nedokončené. Tímto způsobem může sledovat svůj pokrok a zůstat organizován.
- **Třídění a Filtrování**: Úkoly mohou být tříděny podle různých kriterií, například podle data, kategorie nebo tagů. Uživatelé mohou také rychle filtrovat své úkoly, aby našli to, co potřebují.
- **Opakující se Úkoly**: Pro pravidelné aktivity nebo úkoly může uživatel nastavit opakování, například denně, týdně nebo měsíčně.
- **Vizuální Kalendář**: Aplikace obsahuje kalendářní rozhraní, které ukazuje úkoly naplánované na konkrétní dny. To pomáhá uživatelům mít jasný přehled o svém týdnu.

## Koncepční Model Databáze
![Koncepční Model Databáze](/images/diagram.png "Diagram")

## Popis komplexního dotazu:
Tato operace umožňuje uživateli přidat nový úkol do svého kalendáře.

### Provozní Kroky:

1. Uživatel se přihlásí ke svému účtu a rozhodne se vytvořit nový úkol.
2. Po zadání všech potřebných informací o úkolu (název, popis, datum, čas, kategorie, štítky apod.) uživatel klikne na tlačítko pro přidání úkolu.
3. Na straně serveru proběhne kontrola:
   - Server zkontroluje kolize v zadaném datu a čase:
     - Pokud v zadaném datu a čase neexistuje žádný úkol, server přidá úkol do databáze.
     - Pokud v zadaném datu a čase již existuje jeden úkol, server přidá druhý úkol do databáze, ale informuje uživatele o možné kolizi.
     - Pokud v zadaném datu a čase již existují dva úkoly, server informuje uživatele o kolizi a nepřidá nový úkol.

