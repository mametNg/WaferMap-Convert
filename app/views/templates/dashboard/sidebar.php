<?php if (isset($this->allowFile) && $this->allowFile): ?>


  <!-- Sidenav -->
  <nav class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light shadow mt-0" id="sidenav-main">
    <div class="px-3 scrollbar-inner">
      <!-- Collapse -->
      <div class="collapse navbar-collapse" id="sidenav-collapse-main">
        <!-- Navigation -->
        <ul class="navbar-nav navbar-nav-docs">
          <?php if ($data['user-menu'] !== false) : ?>
          <?php foreach ($data['user-menu'] as $menu) : ?>
          <?php if ($menu['is_submenu'] == "1") : ?>
          <!-- Submenu -->
          <li class="nav-item <?= ($menu['path'] == $data['on-menu']['menu'] ? " active" : "") ?>">
            <a class="nav-link" href="#navbar-menu-<?= $this->e($menu['menu']) ?>" data-toggle="collapse" role="button" aria-expanded="<?= ($menu['path'] == $data['on-menu']['menu'] ? "true" : "false") ?>" aria-controls="navbar-menu-<?= $this->e($menu['menu']) ?>">
              <i class="<?= $this->e($menu['icon']) ?>"></i><?= $this->e($menu['name']) ?>
            </a>
            <div class="collapse border-bottom py-3<?= ($menu['path'] == $data['on-menu']['menu'] ? " show" : "") ?>" id="navbar-menu-<?= $this->e($menu['menu']) ?>">
              <ul class="nav flex-column">
          <?php if ($menu['submenu'] !== false) : ?>
          <?php foreach ($menu['submenu'] as $submenu) : ?>
                <li class="nav-item<?= ($menu['path'] == $data['on-menu']['menu'] && $submenu['path'] == $data['on-menu']['submenu'] ? " active" : "") ?>">
                  <a href="<?= $this->base_url($menu['path']."/".$submenu['path']) ?>" class="nav-link"><?= $this->e($submenu['name']) ?></a>
                </li>
          <?php endforeach; ?>
          <?php endif; ?>
              </ul>
            </div>
          </li>
          <?php else : ?>
          <!-- Menu -->
          <li class="nav-item <?= ($menu['path'] == $data['on-menu']['menu'] ? " active" : "") ?>">
            <a class="nav-link" href="<?= $this->base_url($menu['path']) ?>">
              <i class="<?= $this->e($menu['icon']) ?>"></i><?= $this->e($menu['name']) ?>
            </a>
          </li>
          <?php endif; ?>
          <?php endforeach; ?>
          <?php endif; ?>

          <li class="nav-item d-lg-none">
            <a class="nav-link" href="<?= $this->base_url('auth/logout') ?>">
              <i class="fas fa-fw fa-sign-out-alt"></i>Logout
            </a>
          </li>
        </ul>
        <ul class="navbar-nav mb-md-3 mt-4">
          <li class="nav-item">
            <div class="custom-control custom-switch ml-5">
              <input type="checkbox" class="custom-control-input" id="darkSwitch">
              <label class="custom-control-label" for="darkSwitch">Dark Mode</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>



  <!-- Main content -->
  <div class="main-content">
    <!-- Page content -->
    <div class="container-fluid">
      <div class="docs-content">
<?php endif; ?>