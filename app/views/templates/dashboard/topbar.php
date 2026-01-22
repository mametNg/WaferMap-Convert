<?php if (isset($this->allowFile) && $this->allowFile): ?>

  
  <header class="header fixed-top border-bottom">
    <!-- Nav -->
    <nav id="navbar-main" class="navbar navbar-expand-lg navbar-light bg-gradient-light shadow">
      <div class="container-fluid">
        <!-- Brand logo -->
        <a class="navbar-brand text-center text-dark" href="<?= $this->base_url() ?>">
          <h3 class="h5 font-weight-bolder mb-n3 text-dark"><?= $data['header']['brand'] ?></h3>
          <span class="text-xs text-wrap">PT. Utac Manufacturing Services Indonesia</span>
        </a>
        <!-- Sidenav toggler -->
        <button class="sidenav-toggler ml-auto mr-3" type="button" data-action="sidenav-pin" data-target="#sidenav-main">
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </button>

        <!-- Navbar -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown mr-0 d-flex">
              <a class="nav-link active" href="#" id="dropdown_user_account" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img alt="<?= $this->e($data['user']['name']) ?>" style="height: 31.25px; width: 31.25px;" src="<?= $this->base_url(); ?>/assets/img/profiles/<?= $this->e($data['user']['img']) ?>" class="avatar avatar-sm rounded-circle border-sm">
                <span class="text-sm text-dark"><?= $this->e(ucwords(trim($data['user']['name']))) ?></span>
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown_user_account">
                <a class="dropdown-item" href="<?= $this->base_url('auth/logout') ?>">
                  <i class="fas fa-sign-out-alt text-primary"></i>Logout
                </a>
              </div>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  </header>
<?php endif; ?>