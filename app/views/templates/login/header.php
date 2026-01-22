<?php if (isset($this->allowFile) && $this->allowFile): ?>
<!DOCTYPE html>
<html lang="en">
  <head>
  	<meta charset="utf-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<meta property="og:site_name" content="<?= $this->e($data['header']['title']) ?>">
  	<meta property="og:url" content="<?= $this->base_url() ?>">
  	<meta property="og:image" content="<?= $this->e($data['header']['img']); ?>">
  	<meta name="access-token" content="<?= $this->e(base64_encode($this->RSAPublicKey())) ?>">
  	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  	<meta name="description" content="<?= $this->e($data['header']['desc']); ?>">
  	<meta name="author" content="IT DEPT UTAC INDONESIA">

  	<title><?= $this->e($data['header']['title']) ?></title>
  	<!-- Favicon -->
  	<link rel="icon" href="<?= $this->e($data['header']['img']) ?>" type="image/png">
    <!-- Font Awesome 5 -->
    <link rel="stylesheet" href="<?= $this->base_url() ?>/assets/libs/@fortawesome/fontawesome-free/css/all.min.css">
    <!-- Purpose CSS -->
    <link rel="stylesheet" href="<?= $this->base_url() ?>/assets/css/purpose.css" id="stylesheet">
    <link rel="stylesheet" href="<?= $this->base_url() ?>/assets/css/style.css" id="stylesheet">
  </head>

  <body>
<?php endif; ?>