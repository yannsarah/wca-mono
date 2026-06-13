<?php
/* =====================================================================
   West Coast Arcades — traitement du formulaire de contact
   Reçoit le formulaire de contact.html et envoie un email à l'association.
   Hébergement o2switch (PHP natif). Aucun service tiers.
   ===================================================================== */

$DEST = 'westcoastarcades.fr@gmail.com';                 // destinataire (association)
$FROM = 'contact@westcoastarcades.fr';                   // expéditeur technique (domaine)

// N'accepter que les envois POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html');
    exit;
}

// Anti-spam : champ piège (doit rester vide)
if (!empty($_POST['website'])) {
    header('Location: contact.html?sent=1'); // on fait croire au robot que c'est ok
    exit;
}

// Récupération + nettoyage
function clean($v){ return trim(str_replace(array("\r","\n"), ' ', (string)$v)); }
$nom     = clean($_POST['nom']     ?? '');
$email   = clean($_POST['email']   ?? '');
$sujet   = clean($_POST['sujet']   ?? '');
$message = trim($_POST['message']  ?? '');

// Validation
$errors = false;
if ($nom === '' || $message === '') $errors = true;
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors = true;
if ($errors) { header('Location: contact.html?sent=0'); exit; }

// Construction de l'email
$sujet_mail = 'Contact site WCA' . ($sujet !== '' ? ' — ' . $sujet : '');
$corps  = "Nouveau message depuis le formulaire de contact\n";
$corps .= "------------------------------------------------\n";
$corps .= "Nom    : $nom\n";
$corps .= "Email  : $email\n";
$corps .= "Sujet  : $sujet\n\n";
$corps .= "Message :\n$message\n";

$headers  = "From: West Coast Arcades <$FROM>\r\n";
$headers .= "Reply-To: $nom <$email>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$ok = @mail($DEST, '=?UTF-8?B?'.base64_encode($sujet_mail).'?=', $corps, $headers);

header('Location: contact.html?sent=' . ($ok ? '1' : '0'));
exit;
