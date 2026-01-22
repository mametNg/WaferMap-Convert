<?php if (isset($this->allowFile) && $this->allowFile): ?>

    <div class="main-content main-js" my-js="login-page">
      <section class="slice slice-lg vh-100 d-flex align-items-center bg-section-secondary">
        <!-- SVG background -->
        <div class="bg-absolute-cover bg-size--contain d-none d-lg-block">
          <figure class="w-100">
            <img alt="Image placeholder" src="<?= $this->base_url() ?>/assets/img/svg/backgrounds/bg-3.svg" class="svg-inject">
          </figure>
        </div>
        <div class="container px-md-0 d-flex align-items-center">
          <div class="w-100">
            <div class="row row-grid justify-content-center justify-content-lg-between align-items-center">
              <div class="col-sm-8 col-lg-6 col-xl-5 order-lg-2">
                <div class="card shadow zindex-100 mb-0">
                  <div class="card-body px-md-5 ">
                    <div class="mb-5">
                      <h6 class="h3">Login</h6>
                      <p class="text-muted mb-0">Welcome back to <?= $this->e($data['header']['brand']); ?>.</p>
                    </div>
                    <span class="clearfix"></span>
                    <form role="form">
                      <div class="form-group">
                        <label class="form-control-label">Username</label>
                        <div class="input-group input-group-merge">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                          </div>
                          <input type="text" class="form-control px-2" id="input-username" placeholder="630XXXXX">
                        </div>
                        <div class="text-danger text-sm" id="msg-input-username"></div>
                      </div>
                      <div class="form-group mb-4">
                        <label class="form-control-label">Password</label>
                        <div class="input-group input-group-merge">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                          </div>
                          <input type="password" class="form-control px-2" id="input-password" placeholder="Password">
                          <div class="input-group-append">
                            <span class="input-group-text" type="button" id="turn-passwd">
                              <i class="fas fa-eye"></i>
                            </span>
                          </div>
                        </div>
                        <div class="text-danger text-sm" id="msg-input-password"></div>
                      </div>
                      <div class="mt-4">
                        <button type="button" class="btn btn-sm btn-primary btn-icon rounded-pill" id="btn-login-page">
                          <span class="btn-inner--text">Sign in</span>
                          <span class="btn-inner--icon">
                            <i class="fas fa-long-arrow-alt-right"></i>
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-5 order-lg-1 d-none d-lg-block">
                <blockquote>
                  <h3 class="h2 mb-4">QC Tools.</h3>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

<?php endif; ?>