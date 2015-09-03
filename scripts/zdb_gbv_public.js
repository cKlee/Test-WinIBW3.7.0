/*	Datei:	zdb_gbv_public.js
	Autor:	Karen Hachmann, GBV
	edited	ZDB 2015
	Datum:	2006
*/
function testGlobals()
{
    __meldung(delimiter);
    __meldung(charCode);
}
//-------------------------------------------------------------------------------
function __screenID(){
	return application.activeWindow.getVariable("scr");
}

function __matCode(){
	return application.activeWindow.materialCode;
}

function __matCode1(){
	//0500, 005 1. Position
	return application.activeWindow.materialCode.charAt(0);
}
function __matCode2(){
	//0500, 005 2. Position
	return application.activeWindow.materialCode.charAt(1);
}
function __matCode3(){
	//0500, 005 3. Position
	return application.activeWindow.materialCode.charAt(2);
}
function __Materialbenennung()
{
	// Funktion wird von Aaup() und Avu() verwendet, um den Materialcode f�r 1108 zu ermitteln
	// au�erdem beim Anlegen von Aufs�tzen
	switch (__matCode1())
	{
		case "B":
			Materialart = "\n1108 Bildtontr�ger";
			break;
		case "E":
			Materialart = "\n1108 Mikroform";
			break;
		case "G":
			Materialart = "\n1108 Tontr�ger";
			break;
		case "M":
			Materialart = "\n1108 Musikdruck";
			break;
		case "O":
			Materialart = "\n1108 Elektronische Ressource";
			break;
		case "S":
			Materialart = "\n1108 Elektronische Ressource";
			break;
		case "Z":
			Materialart = "\n1108 "; //hier kann man nicht wissen, welches Material vorliegt
			break;
		default:
			Materialart = "";
	}
	//if (Materialart != "") Materialart = "\n" + Materialart;
	return Materialart;
}

function __formatD()
{
	//Pr�sentationsformat pr�fen und auf "D" umstellen
	if (application.activeWindow.getVariable("P3GPR") != "D") {
		application.activeWindow.command ("\\too d", false);
	}
}
function __formatP()
{
	//Pr�sentationsformat pr�fen und auf "D" umstellen
	if (application.activeWindow.getVariable("P3GPR") != "P") {
		application.activeWindow.command ("\\too p", false);
	}
}

//----------------------------------------------------------
//Beide Funktionen geh�ren zusammen!
function __loescheBisKategorieEnde()
{
	//Im WinIBW3-Men� 'Bearbeiten', Men�befehl 'L�sche bis Ende der Kategorie', Strg+E
	if (!application.activeWindow.title) {
	return false;
	}
}
function loescheBisKategorieEnde()
{
	//steht nur zur Verf�gung, wenn __loescheBisKategorieEnde() nicht false
	application.activeWindow.title.deleteToEndOfLine();
}
//----------------------------------------------------------
//Beide Funktionen geh�ren zusammen!
function __loescheKategorie()
{
	//Im WinIBW3-Men� 'Bearbeiten', Men�befehl 'L�sche Kategorie', Stry+Y
	if (!application.activeWindow.title) {
	return false;
	}
}
function loescheKategorie()
{
	//steht nur zur Verf�gung, wenn __loescheKategorie() nicht false
	application.activeWindow.title.deleteLine(1);
}
//----------------------------------------------------------
function Kategorienbeschreibung()
{
	var xulFeatures = "centerscreen, chrome, close, titlebar,resizable, modal=no, dependent=yes, dialog=yes";
	open_xul_dialog("chrome://ibw/content/xul/gbv_kategorie_dialog.xul", xulFeatures);
}
function Sacherschliessungsrichtlinie()
{
	application.shellExecute ("http://www.gbv.de/vgm/info/mitglieder/02Verbund/01Erschliessung/02Richtlinien/04Sacherschliessungsrichtlinie/index", 5, "open", "");
}

// ------- MessageBoxen GBV --------

function __warnung(meldungstext)
{
	application.messageBox("Warnung", meldungstext, "alert-icon");
}
function __fehler(meldungstext)
{
	application.messageBox("Fehler", meldungstext, "error-icon");
}

function __meldung(meldungstext)
{
	application.messageBox("Hinweis", meldungstext, "message-icon");
}
function __frage(meldungstext)
{
	application.messageBox("Frage", meldungstext, "question-icon");
}
// ------- Ende MessageBoxen GBV --------

function __alleZeilenArray()
{
	//gibt alle Zeilen des in der Vollanzeige befindlichen Datensatzes als Array aus.
	var zeilen = application.activeWindow.copyTitle().split("\r\n");
	return zeilen;
}
function __kategorieInhalt(strTitle, kategorie, bPlus)
{
	/*Ermitteln von Kategorien aus der Vollanzeige (nicht Korrekturstatus!)
	Kategorie + Inhalt werden ausgegeben
	In strTitle muss der kopierte Datensatz �bergeben werden
	In kategorie muss die gesuchte Kategorie genannt werden
	Mit bPlus wird festgelegt, ob Ausgabewert mit Kategorie (true) oder ohne Kategorie (false) 
	Funktionsaufruf: __kategorieInhalt(strTitle, "4000", true)
	auch Pica+ m�glich: __kategorieInhalt(strTitle, "209A", true);
	*/
	var strKategorie, strKategoriePlus;
	var zeilen = strTitle.split("\r\n");
	var laenge = kategorie.length;
	var i;
	for (i=0; i<zeilen.length; i++){
		if (zeilen[i].substring(0,laenge) == kategorie) {
			strKategoriePlus = zeilen[i];
			strKategorie = zeilen[i].substring(laenge+1);
			break;
		} else {
			strKategoriePlus= "";
			strKategorie = "";
		}
	}
	//R�ckgabewert mit Kategorie oder ohne?
	if (bPlus == true){
		return strKategoriePlus;
		} else {
			return strKategorie
		}
}

function __datum()
{	
	//Form: JJJJ.MM.TT
	var heute = new Date();
	
	var strMonat = heute.getMonth();
	strMonat = strMonat + 1;
	if (strMonat <10){strMonat = "0" + strMonat};
	
	var strTag = heute.getDate();
	if (strTag <10){strTag = "0" + strTag}; 
	
	var datum = heute.getFullYear() + "." + strMonat + "." + strTag;
	return datum;
}

function __datumTTMMJJJJ()
{	
	//Form: JJJJ.MM.TT
	var heute = new Date();
	
	var strMonat = heute.getMonth();
	strMonat = strMonat + 1;
	if (strMonat <10){strMonat = "0" + strMonat};
	
	var strTag = heute.getDate();
	if (strTag <10){strTag = "0" + strTag}; 
	
	var datum = strTag + "." + strMonat + "." + heute.getFullYear();
	return datum;
}

function __datumUhrzeit()
{
	//das Datum und die Uhrzeit wird Bestandteil des Dateinamens
	var jetzt = new Date();
	var jahr = jetzt.getFullYear();
	
	var monat = jetzt.getMonth();
	monat = monat + 1;
	if (monat <10){monat = "0" + monat};
	
	var strTag = jetzt.getDate();
	if (strTag <10){strTag = "0" + strTag}; 
	
	var stunde = jetzt.getHours();
	if (stunde <10){stunde = "0" + stunde};
	
	var minute = jetzt.getMinutes();
	if (minute <10){minute = "0" + minute};
	
	var sekunde = jetzt.getSeconds();
	if (sekunde <10){sekunde = "0" + sekunde};
	
	return jahr + monat + strTag + stunde + minute + sekunde;
}

//----------------------------------------------------------

function ppnlisteDownload()
{
	//PPN-Datei muss im Profiles-Verzeichnis des Benutzers gespeichert werden
	//liest Datei, ruft jede PPN auf und f�hrt Download aus.
	var theFileInput = utility.newFileInput();
	var theLine;
	var fileName = "\\" + "ppnliste.txt";
	if (!theFileInput.openSpecial("ProfD", fileName)) {
			application.messageBox("Datei suchen","Datei " + fileName + " wurde nicht gefunden.", "error-icon");
			return;
	}
	while (!theFileInput.isEOF()) {
		theLine = theFileInput.readLine();
		//Zeilen ohne PPN werden ausgelassen
		if (theLine.length >= 9) {
			application.activeWindow.command("f ppn " + theLine, false);
			application.activeWindow.command("dow d" + theLine, false);
		}
	}
	theFileInput.close();
}

function stapelJob()
{
	var xulFeatures = "centerscreen, chrome, close, titlebar,resizable, modal=no, dependent=yes, dialog=no";
	open_xul_dialog("chrome://ibw/content/xul/gbv_stapelJob_dialog.xul", xulFeatures);
}

//-------------------------------------------------------------------

function inputBox(ttl,txt,dflt) {
/* Die interne Funktion oeffnet eine Input-Box und gibt den eingegebenen Wert zur�ck.
Mit Parameter ttl kann der Text fuer die Titelzeile der Eingabebox uebergeben werden. 
Parameter txt enthaelt den Text der Input-Box und mit dflt kann ein Default-Wert definiert werden.
Historie:
2010-08-09 Stefan Grund (DNB): erstellt
2011-02-02 umbenannt in inputBox
*/
	var prompter = utility.newPrompter();
	var msg;
	msg = prompter.prompt(ttl,txt,dflt,null,null);
	if (msg == 1)	msg = prompter.getEditValue();
	else			msg = null;
	return msg;
}

//----------------------------------------
function hackSystemVariables() {
	//Clemens Buijs:
	var i, j, varName, varValue, reportG = "", reportV = "", reportL = "";
	alpha = "!0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	
	//G:
	for (i = 0; i <= alpha.length; i++) {
		for (j = 0; j <= alpha.length; j++) {
		//	Use P3G for global, P3L for local, P3V for field variables
			varName = "P3G" + alpha.charAt(i) + alpha.charAt(j);
			varValue = application.activeWindow.getVariable(varName);
			if (varValue) reportG = reportG + "- " + varName + ": " + varValue + "\r\n";
		}
	}
	//application.messageBox("G-Variable:", reportG, "message-icon");
	
	//V:
	for (i = 0; i <= alpha.length; i++) {
		for (j = 0; j <= alpha.length; j++) {
		//	Use P3G for global, P3L for local, P3V for field variables
			varName = "P3V" + alpha.charAt(i) + alpha.charAt(j);
			varValue = application.activeWindow.getVariable(varName);
			if (varValue) reportV = reportV + "- " + varName + ": " + varValue + "\r\n";
		}
	}
	//application.messageBox("V-Variable:", reportV, "message-icon");
	
	//L:
	for (i = 0; i <= alpha.length; i++) {
		for (j = 0; j <= alpha.length; j++) {
		//	Use P3G for global, P3L for local, P3V for field variables
			varName = "P3L" + alpha.charAt(i) + alpha.charAt(j);
			varValue = application.activeWindow.getVariable(varName);
			if (varValue) reportL = reportL + "- " + varName + ": " + varValue + "\r\n";
		}
	}
	//application.messageBox("L-Variable:", reportL, "message-icon");
	// Output to clipboard
	application.activeWindow.clipboard = reportG + reportV + reportL;
	application.messageBox("hackSystemVariables", "Alle Variablen befinden sich jetzt im Zwischenspeicher", "message-icon");
	application.activeWindow.appendMessage("Alle Variablen befinden sich jetzt im Zwischenspeicher", 2);
}
//-------------------------------------------------------------------------------
function getSpecialPath(theDirName, theRelativePath)
{
	//gibt den Pfad als String aus
	const nsIProperties = Components.interfaces.nsIProperties;
	var dirService = Components.classes["@mozilla.org/file/directory_service;1"]
							.getService(nsIProperties);
	var theFile = dirService.get(theDirName, Components.interfaces.nsILocalFile);
	theFile.appendRelativePath(theRelativePath);
	return theFile.path;
}
function getSpecialDirectory(name)
{
	const nsIProperties = Components.interfaces.nsIProperties;
	var dirService = Components.classes["@mozilla.org/file/directory_service;1"].getService(nsIProperties);
	return dirService.get(name, Components.interfaces.nsIFile);
}
function WinIBW3_Verzeichnisse(){
	//Funktion gibt Informationen �ber Installations- und Benutzerverzeichnis aus.
	var verzeichnisProgramme = getSpecialDirectory("BinDir");
	var verzeichnisBenutzer = getSpecialDirectory("ProfD");
	var verzeichnisStart = application.getProfileString("ibw.startup", "homepage", "");
	verzeichnisStart = verzeichnisStart.replace(/file:\/\/\//, "");
	verzeichnisStart = verzeichnisStart.replace(/\//g, "\\");
	
	var dieVerzeichnisse = "Programmverzeichnis: " + verzeichnisProgramme.path 
		+ "\nBenutzerverzeichnis: " + verzeichnisBenutzer.path
		+ "\nVerwendete Startdatei: " + verzeichnisStart;
	
	application.activeWindow.clipboard = dieVerzeichnisse;
	
	application.messageBox("Verzeichnisse der WinIBW3", dieVerzeichnisse + "\n\n--- Die hier angezeigten Informationen wurden im Zwischenspeicher abgelegt ---" +
		"\n--- Einf�gen mit Strg+v ---", "message-icon");
}

function sucheHilfe()
{
	var einstellungen = "centerscreen,chrome,close,titlebar, resizable, dialog=yes";
	__open_xul_dialog("chrome://ibw/content/xul/gbv_hilfe_dialog.xul", einstellungen, null);
}