<?php if (isset($this->allowFile) && $this->allowFile): ?>

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800 link-underline-dark"><?= $this->e($data['on-menu']['submenu-name']) ?></h1>
        </div>

        <div class="row justify-content-center main-js" my-js="web-setting">
          <div class="col-lg-9">

            <div class="card shadow">
              <div class="card-body">

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="set-web-title">Title</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-tag"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="set-web-title" value="<?= $data['header']['title_sec'] ?>">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-set-web-title"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="set-web-brand">Brand</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-icons"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="set-web-brand" value="<?= $data['header']['brand'] ?>">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-set-web-brand"></div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-control-label" for="set-web-description">Description</label>
                  <div class="input-group input-group-merge">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-book"></i></span>
                    </div>
                    <textarea class="form-control" placeholder="Description" rows="3" id="set-web-description"><?= $data['header']['desc'] ?></textarea>
                  </div>
                  <div class="invalid-feedback-msg" id="msg-set-web-description"></div>
                </div>


                <div class="form-group">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="turn-image">
                    <label class="custom-control-label" for="turn-image" id="label-turn-image">Enable change image</label>
                  </div>
                </div>

                <div class="form-row mb-2 align-items-center">
                  <div class="form-group col-4 col-lg-2">
                    <img id="change-img-thumbnail" src="<?= $this->e($data['header']['img']) ?>" class="img-thumbnail"> 
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
                  <button class="btn btn-primary" id="save-web-setting">Save</button>
                </div>

              </div>
            </div>
          </div>

          <div class="col-lg-3">
            <div class="card shadow">
              <div class="card-body">
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="switch-maintenance"<?= ($data['maintenance'] ? " checked" : "") ?>>
                  <label class="custom-control-label" for="switch-maintenance">Maintenance</label>
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