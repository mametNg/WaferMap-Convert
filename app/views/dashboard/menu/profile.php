<?php if (isset($this->allowFile) && $this->allowFile): ?>


        <div class="row justify-content-center main-js" my-js="profile-page">
          <div class="col-lg-12">
            
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 link-underline-dark"><?= $this->e($data['on-menu']['menu-name']) ?></h1>
            </div>

            <div class="card shadow">
              <div class="card-body">

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-username">Username</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-user"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="profile-username" value="<?= $this->e($data['user']['username']) ?>" disabled>
                    </div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-mail">Email Address</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-envelope"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="profile-mail" value="<?= $this->e($data['user']['email']) ?>" disabled>
                    </div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-name">Name</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-user"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="profile-name" value="<?= $this->e($data['user']['name']) ?>">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-profile-name"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-role">Role</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-user-tag"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="profile-role" value="<?= $this->e($data['user']['role']) ?>" disabled>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                    <label class="form-control-label" for="profile-dept">Departement</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-building"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="profile-dept" value="<?= $this->e($data['user']['dept']) ?>" disabled>
                    </div>
                  </div>

                <div class="form-group">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch-pass">
                    <label class="custom-control-label" for="switch-pass">Enable change password</label>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-control-label" for="profile-old-password">Old Password</label>
                  <div class="input-group input-group-merge">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="turn-profile-old-password"><i class="far fa-eye-slash"></i></span>
                    </div>
                    <input type="password" class="form-control" id="profile-old-password" disabled>
                  </div>
                  <div class="invalid-feedback-msg" id="msg-profile-old-password"></div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-new-password">New Password</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="turn-profile-new-password"><i class="far fa-eye-slash"></i></span>
                      </div>
                      <input type="password" class="form-control" id="profile-new-password" disabled>
                    </div>
                    <div class="invalid-feedback-msg" id="msg-profile-new-password"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-confirm-new-password">Confirm New Password</label>
                    <input type="password" class="form-control" id="profile-confirm-new-password" disabled>
                  </div>
                  <div class="invalid-feedback-msg" id="msg-profile-confirm-new-password"></div>
                </div>

                <div class="form-group">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="turn-image">
                    <label class="custom-control-label" for="turn-image" id="label-turn-image">Enable change image</label>
                  </div>
                </div>

                <div class="form-row mb-2 align-items-center">
                  <div class="form-group col-4 col-lg-2">
                    <img id="change-img-thumbnail" src="<?= $this->base_url() ?>/assets/img/profiles/<?= $this->e($data['user']['img']) ?>" class="img-thumbnail"> 
                  </div>

                  <div class="form-group col-8 col-lg-10 pl-lg-4">
                    <label for="change-choose-image">Image</label>
                    <input type="file" accept="image/*" id="change-choose-image" data-choose="change" class="custom-input-file" disabled>
                    <label for="change-choose-image">
                      <i class="fa fa-upload"></i>
                      <span class="change-file-name">Choose a image</span>
                    </label>
                    <div class="invalid-feedback" id="msg-change-choose-image"></div>
                  </div>
                </div>

                <div class="form-group">
                  <button class="btn btn-primary" id="save-change-profile">Save</button>
                </div>

              </div>
            </div>

          </div>
        </div>

        <!-- Modal Crop Image-->
        <div class="modal fade" id="modal-crop-image" tabindex="-1" aria-labelledby="cropImage" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">

                <div class="modal-title d-flex align-items-center" id="cropImage">
                  <div>
                    <div class="icon icon-sm icon-shape icon-info rounded-circle shadow mr-3">
                      <i class="fas fa-award"></i>
                    </div>
                  </div>
                  <div>
                    <h6 class="mb-0">Crop image</h6>
                  </div>
                </div>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>

              </div>
              <div class="modal-body p-2">

                <div class="card m-0 p-0 border-0">
                  <img id="image-cropper" src="assets/img/account/avatar/default.jpg" class="card-img">

                  <div class="card-img-overlay p-0 m-0 pointer-none">
                    <div class="d-flex justify-content-between absolute-bottom z-1 pointer-none">
                      <button id="rotate-l" type="button" class="btn btn-primary pointer-stroke">
                        <i class="fas fa-fw fa-undo-alt"></i>
                      </button>

                      <button id="scale-l-r" data-scale="true" type="button" class="btn btn-primary pointer-stroke">
                        <i class="fas fa-fw fa-arrows-alt-h"></i>
                      </button>

                      <button id="rotate-r" type="button" class="btn btn-primary pointer-stroke">
                        <i class="fas fa-fw fa-redo-alt"></i>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" id="crop-image" class="btn btn-primary">Crop</button>
              </div>
            </div>
          </div>
        </div>

<?php endif; ?>