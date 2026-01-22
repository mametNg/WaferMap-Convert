<?php if (isset($this->allowFile) && $this->allowFile): ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta property="og:site_name" content="<?= $this->e($data['header']['desc']); ?>">
  <meta property="og:url" content="<?= $this->base_url() ?>">
  <meta property="og:menu" content="<?= $data['on-menu']['menu'] ?>">
  <meta property="og:sub_menu" content="<?= $data['on-menu']['submenu'] ?>">
  <meta property="og:image" content="<?= $this->e($data['header']['img']); ?>">
  <meta name="description" content="<?= $this->e($data['header']['desc']); ?>">
  <meta name="paging-menu" content="<?= $this->e($data['user']['role']); ?>">
  <meta name="author" content="IT DEPT UTAC INDONESIA">
  <meta name="access-token" content="<?= $this->e(base64_encode($this->RSAPublicKey())) ?>">

  <title><?= $this->e($data['header']['title']); ?></title>
  <!-- Favicon -->
  <link rel="icon" href="<?= $this->e($data['header']['img']); ?>" type="image/png">
  <!-- Font Awesome 5 -->
  <link rel="stylesheet" href="<?= $this->base_url() ?>/assets/libs/@fortawesome/fontawesome-free/css/all.min.css">
  <link rel="stylesheet" href="<?= $this->base_url() ?>/assets/libs/select2/dist/css/select2.min.css">
  <link rel="stylesheet" href="<?= $this->base_url() ?>/assets/libs/swiper/dist/css/swiper.min.css">
  <link rel="stylesheet" href="<?= $this->base_url() ?>/assets/libs/dark-mode-switch/dark-mode.css">
  <!-- <link rel="stylesheet" href="<?= $this->base_url() ?>/assets/libs/flatpickr/dist/flatpickr.min.css"> -->
  <!-- Purpose CSS -->
  <link rel="stylesheet" href="<?= $this->base_url() ?>/assets/css/purpose.css" id="stylesheet">
  <link href="<?= $this->base_url() ?>/assets/libs/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
  <link href="<?= $this->base_url() ?>/assets/libs/buttons/css/buttons.dataTables.min.css" rel="stylesheet">
  <link href="<?= $this->base_url() ?>/assets/libs/jquery-ui/jquery-ui.css" rel="stylesheet">
  <link href="<?= $this->base_url() ?>/assets/libs/cropperjs/dist/cropper.css" rel="stylesheet" >
  <link href="<?= $this->base_url() ?>/assets/libs/bootstrap-datepicker/css/bootstrap-datepicker.css" rel="stylesheet" >
  
  <!-- Docs CSS - used only for demo -->
  <link rel="stylesheet" href="<?= $this->base_url() ?>/assets/css/docs.css">
  <link rel="stylesheet" href="<?= $this->base_url() ?>/assets/css/style.css">
  <!-- Page css -->
</head>

<body class="docs">
<?php endif; ?>