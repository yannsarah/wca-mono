<?php
/* =====================================================================
   West Coast Arcades — traitement du formulaire de contact (dynamique)
   Reçoit les champs définis dans la gestion (Site internet → Contact)
   et envoie un email à l'association. Hébergement o2switch (PHP natif).
   ⚠️ Le destinataire ($DEST) reste défini ICI pour des raisons de sécurité.
   ===================================================================== */

$DEST = 'westcoastarcades.fr@gmail.com';   // destinataire (association)
$FROM = 'contact@westcoastarcades.fr';     // expéditeur technique (domaine)

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: contact.html'); exit; }

// Anti-spam : champ piège (doit rester vide)
if (!empty($_POST['website'])) { header('Location: contact.html?sent=1'); exit; }

function clean($v){ return trim(str_replace(array("\r","\n"), ' ', (string)$v)); }

// Description des champs envoyée par le formulaire (libellés + types).
$fields = array();
if (!empty($_POST['__fields'])) {
    $decoded = json_decode($_POST['__fields'], true);
    if (is_array($decoded)) $fields = $decoded;
}
// Repli : ancien formulaire statique (nom / email / sujet / message)
if (!$fields) {
    $fields = array(
        array('key'=>'nom',     'label'=>'Nom',     'type'=>'text',     'required'=>true),
        array('key'=>'email',   'label'=>'Email',   'type'=>'email',    'required'=>true),
        array('key'=>'sujet',   'label'=>'Sujet',   'type'=>'text',     'required'=>false),
        array('key'=>'message', 'label'=>'Message', 'type'=>'textarea', 'required'=>true),
    );
}

$email  = '';
$objet  = '';
$errors = false;
$lines  = array();

foreach ($fields as $f) {
    $key = isset($f['key']) ? $f['key'] : '';
    if ($key === '') continue;
    $label = (isset($f['label']) && $f['label'] !== '') ? $f['label'] : $key;
    $type  = isset($f['type']) ? $f['type'] : 'text';
    $raw   = isset($_POST[$key]) ? $_POST[$key] : '';
    $val   = ($type === 'textarea') ? trim($raw) : clean($raw);

    if (!empty($f['required']) && $val === '') $errors = true;
    if ($type === 'email') {
        $email = $val;
        if ($val !== '' && !filter_var($val, FILTER_VALIDATE_EMAIL)) $errors = true;
    }
    if ($type === 'select' && $objet === '') $objet = $val;

    $lines[] = $label . ' : ' . $val;
}

if ($errors) { header('Location: contact.html?sent=0'); exit; }

$sujet_mail = 'Contact site WCA' . ($objet !== '' ? ' — ' . $objet : '');
$corps  = "Nouveau message depuis le formulaire de contact\n";
$corps .= "------------------------------------------------\n";
$corps .= implode("\n", $lines) . "\n";

$headers  = "From: West Coast Arcades <$FROM>\r\n";
if ($email !== '') $headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$ok = @mail($DEST, '=?UTF-8?B?' . base64_encode($sujet_mail) . '?=', $corps, $headers);

header('Location: contact.html?sent=' . ($ok ? '1' : '0'));
exit;
