<?php if (isset($this->allowFile) && $this->allowFile): ?>


        <div class="row justify-content-center main-js" my-js="menu-management">
          <div class="col-lg-12">
            <!-- Page Heading -->
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 link-underline-dark"><?= $this->e($data['on-menu']['submenu-name']) ?></h1>
            </div>

            <div class="card shadow">
              <div class="card-body">
                  
                <nav>
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-menu-tab" data-bs-toggle="tab" data-bs-target="#nav-menu" type="button" role="tab" aria-controls="nav-menu" aria-selected="true">Menu</button>
                    <button class="nav-link" id="nav-submenu-tab" data-bs-toggle="tab" data-bs-target="#nav-submenu" type="button" role="tab" aria-controls="nav-submenu" aria-selected="false">Submenu</button>
                  </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                  <div class="tab-pane fade mt-4 show active" id="nav-menu" role="tabpanel" aria-labelledby="nav-menu-tab" tabindex="0">
                    
                    <div class="table-responsive">
                      <table class="table table-bordered" id="datatable-menu-management" width="100%" cellspacing="0">
                        <thead>
                          <tr>
                            <th class="align-middle text-center text-capitalize">No</th>
                            <th class="align-middle text-center text-capitalize">Name</th>
                            <th class="align-middle text-center text-capitalize">Icon</th>
                            <th class="align-middle text-center text-capitalize">Path</th>
                            <th class="align-middle text-center text-capitalize">Filename</th>
                            <th class="align-middle text-center text-capitalize">Submenu</th>
                            <th class="align-middle text-center text-capitalize">Order No</th>
                            <th class="align-middle text-center text-capitalize">Status</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th class="align-middle text-center text-capitalize">No</th>
                            <th class="align-middle text-center text-capitalize">Name</th>
                            <th class="align-middle text-center text-capitalize">Icon</th>
                            <th class="align-middle text-center text-capitalize">Path</th>
                            <th class="align-middle text-center text-capitalize">Filename</th>
                            <th class="align-middle text-center text-capitalize">Submenu</th>
                            <th class="align-middle text-center text-capitalize">Order No</th>
                            <th class="align-middle text-center text-capitalize">Status</th>
                          </tr>
                        </tfoot>
                        <tbody>
                        </tbody>
                      </table>
                    </div>

                  </div>
                  <div class="tab-pane fade mt-4" id="nav-submenu" role="tabpanel" aria-labelledby="nav-submenu-tab" tabindex="0">
                    
                     <div class="table-responsive">
                      <table class="table table-bordered" id="datatable-submenu-management" width="100%" cellspacing="0">
                        <thead>
                          <tr>
                            <th class="align-middle text-center text-capitalize">No</th>
                            <th class="align-middle text-center text-capitalize">Menu</th>
                            <th class="align-middle text-center text-capitalize">Name</th>
                            <th class="align-middle text-center text-capitalize">Path</th>
                            <th class="align-middle text-center text-capitalize">Filename</th>
                            <th class="align-middle text-center text-capitalize">Order No</th>
                            <th class="align-middle text-center text-capitalize">Status</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th class="align-middle text-center text-capitalize">No</th>
                            <th class="align-middle text-center text-capitalize">Menu</th>
                            <th class="align-middle text-center text-capitalize">Name</th>
                            <th class="align-middle text-center text-capitalize">Path</th>
                            <th class="align-middle text-center text-capitalize">Filename</th>
                            <th class="align-middle text-center text-capitalize">Order No</th>
                            <th class="align-middle text-center text-capitalize">Status</th>
                          </tr>
                        </tfoot>
                        <tbody>
                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- ===================================== MENU ===================================== -->
        <!-- Modal New Menu -->
        <div class="modal fade" id="modal-new-menu" tabindex="-1" role="dialog" aria-labelledby="new-menu-label" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="new-menu-label">Add new menu</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-menu-name">Menu name</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-bars"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="new-menu-name">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-new-menu-name"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-menu-icon">Icon menu</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-icons"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="new-menu-icon">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-new-menu-icon"></div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-menu-path">Path menu</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-folder"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="new-menu-path">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-new-menu-path"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-menu-filename">Filename</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-file"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="new-menu-filename">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-new-menu-filename"></div>
                  </div>
                </div>

                <div class="form-row">

                  <div class="form-group col-md-4">
                    <label class="form-control-label" for="new-menu-submenu">Submenu</label>
                    <select class="form-control" id="new-menu-submenu" title="Submenu" data-live-search="true" data-live-search-placeholder="Submenu">
                      <option value="" selected disabled>Choose a submenu status</option>
                      <option value="Active">Active</option>
                      <option value="Non-Active">Non-Active</option>
                    </select>
                    <div id="select2-new-menu-submenu"></div>
                    <div class="invalid-feedback" id="msg-new-menu-submenu"></div>
                  </div>

                  <div class="form-group col-md-4">
                    <label class="form-control-label" for="new-menu-order">Order number</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-list"></i></span>
                      </div>
                      <input type="number" class="form-control pl-2 pr-n2" id="new-menu-order">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-new-menu-order"></div>
                  </div>

                  <div class="form-group col-md-4">
                    <label class="form-control-label" for="new-menu-flag">Status Menu</label>
                    <select class="form-control" id="new-menu-flag" title="flag" data-live-search="true" data-live-search-placeholder="flag">
                      <option value="" selected disabled>Choose a status menu</option>
                      <option value="Active">Active</option>
                      <option value="Non-Active">Non-Active</option>
                    </select>
                    <div id="select2-new-menu-flag"></div>
                    <div class="invalid-feedback" id="msg-new-menu-flag"></div>
                  </div>

                </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="btn-save-new-menu">Save</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Edit Menu -->
        <div class="modal fade" id="modal-edit-menu" tabindex="-1" role="dialog" aria-labelledby="edit-menu-label" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="edit-menu-label">Edit menu</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-menu-name">Menu name</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-bars"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="edit-menu-name">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-edit-menu-name"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-menu-icon">Icon menu</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-icons"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="edit-menu-icon">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-edit-menu-icon"></div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-menu-path">Path menu</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-folder"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="edit-menu-path">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-edit-menu-path"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-menu-filename">Filename</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-file"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="edit-menu-filename">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-edit-menu-filename"></div>
                  </div>
                </div>

                <div class="form-row">

                  <div class="form-group col-md-4">
                    <label class="form-control-label" for="edit-menu-submenu">Submenu</label>
                    <select class="form-control" id="edit-menu-submenu" title="Submenu" data-live-search="true" data-live-search-placeholder="Submenu">
                      <option value="" selected disabled>Choose a submenu status</option>
                      <option value="Active">Active</option>
                      <option value="Non-Active">Non-Active</option>
                    </select>
                    <div id="select2-edit-menu-submenu"></div>
                    <div class="invalid-feedback" id="msg-edit-menu-submenu"></div>
                  </div>

                  <div class="form-group col-md-4">
                    <label class="form-control-label" for="edit-menu-order">Order number</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-list"></i></span>
                      </div>
                      <input type="number" class="form-control pl-2 pr-n2" id="edit-menu-order">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-edit-menu-order"></div>
                  </div>

                  <div class="form-group col-md-4">
                    <label class="form-control-label" for="edit-menu-flag">Status Menu</label>
                    <select class="form-control" id="edit-menu-flag" title="flag" data-live-search="true" data-live-search-placeholder="flag">
                      <option value="" selected disabled>Choose a status menu</option>
                      <option value="Active">Active</option>
                      <option value="Non-Active">Non-Active</option>
                    </select>
                    <div id="select2-edit-menu-flag"></div>
                    <div class="invalid-feedback" id="msg-edit-menu-flag"></div>
                  </div>

                </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="btn-save-edit-menu">Save</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Delete Menu -->
        <div class="modal modal-danger fade" id="modal-delete-menu" tabindex="-1" role="dialog" aria-labelledby="modal-delete-menu" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <div class="text-center">
                  <div class="icon text-secondary">
                    <i class="fas fa-exclamation-circle fa-3x opacity-8"></i>
                  </div>
                  <h5 class="mt-4 text-secondary">Are you sure you want to delete it now!</h5>
                  <p class="text-sm text-secondary">Menu Name <span class="info-delete-menu font-weight-bolder"></span> will be deleted.</p>
                </div>
                <div class="d-flex justify-content-center">
                  <div class="m-2">
                    <button type="button" id="btn-save-delete-menu" data-info="" data-role class="btn btn-secondary">Delete Now</button>
                  </div>
                  <div class="m-2">
                    <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Delete Submenu -->
        <div class="modal modal-danger fade" id="modal-delete-submenu" tabindex="-1" role="dialog" aria-labelledby="modal-delete-submenu" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <div class="text-center">
                  <div class="icon text-secondary">
                    <i class="fas fa-exclamation-circle fa-3x opacity-8"></i>
                  </div>
                  <h5 class="mt-4 text-secondary">Are you sure you want to delete it now!</h5>
                  <p class="text-sm text-secondary">Submenu Name <span class="info-delete-submenu font-weight-bolder"></span> will be deleted.</p>
                </div>
                <div class="d-flex justify-content-center">
                  <div class="m-2">
                    <button type="button" id="btn-save-delete-submenu" data-info="" data-role class="btn btn-secondary">Delete Now</button>
                  </div>
                  <div class="m-2">
                    <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ===================================== SUBMENU ===================================== -->
        <!-- Modal New submenu -->
        <div class="modal fade" id="modal-new-submenu" tabindex="-1" role="dialog" aria-labelledby="new-submenu-label" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="new-submenu-label">Add new submenu</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-submenu-menu">Menu Name</label>
                    <select class="form-control" id="new-submenu-menu" title="menu" data-live-search="true" data-live-search-placeholder="menu">
                      <option value="" selected disabled>Choose a menu</option>
                    </select>
                    <div id="select2-new-submenu-menu"></div>
                    <div class="invalid-feedback" id="msg-new-submenu-menu"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-submenu-name">Submenu Name</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-folder"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="new-submenu-name">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-new-submenu-name"></div>
                  </div>

                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-submenu-path">Path submenu</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-folder"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="new-submenu-path">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-new-submenu-path"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-submenu-filename">Filename</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-file"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="new-submenu-filename">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-new-submenu-filename"></div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-submenu-order">Order number</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-list"></i></span>
                      </div>
                      <input type="number" class="form-control pl-2 pr-n2" id="new-submenu-order">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-new-submenu-order"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-submenu-flag">Status submenu</label>
                    <select class="form-control" id="new-submenu-flag" title="flag" data-live-search="true" data-live-search-placeholder="flag">
                      <option value="" selected disabled>Choose a status submenu</option>
                      <option value="Active">Active</option>
                      <option value="Non-Active">Non-Active</option>
                    </select>
                    <div id="select2-new-submenu-flag"></div>
                    <div class="invalid-feedback" id="msg-new-submenu-flag"></div>
                  </div>

                </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="btn-save-new-submenu">Save</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Edit submenu -->
        <div class="modal fade" id="modal-edit-submenu" tabindex="-1" role="dialog" aria-labelledby="edit-submenu-label" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="edit-submenu-label">Edit submenu</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-submenu-menu">Menu Name</label>
                    <select class="form-control" id="edit-submenu-menu" title="menu" data-live-search="true" data-live-search-placeholder="menu">
                      <option value="" selected disabled>Choose a menu</option>
                    </select>
                    <div id="select2-edit-submenu-menu"></div>
                    <div class="invalid-feedback" id="msg-edit-submenu-menu"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-submenu-name">Submenu Name</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-folder"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="edit-submenu-name">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-edit-submenu-name"></div>
                  </div>

                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-submenu-path">Path submenu</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-folder"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="edit-submenu-path">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-edit-submenu-path"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-submenu-filename">Filename</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-file"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="edit-submenu-filename">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-edit-submenu-filename"></div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-submenu-order">Order number</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-list"></i></span>
                      </div>
                      <input type="number" class="form-control pl-2 pr-n2" id="edit-submenu-order">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-edit-submenu-order"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-submenu-flag">Status submenu</label>
                    <select class="form-control" id="edit-submenu-flag" title="flag" data-live-search="true" data-live-search-placeholder="flag">
                      <option value="" selected disabled>Choose a status submenu</option>
                      <option value="Active">Active</option>
                      <option value="Non-Active">Non-Active</option>
                    </select>
                    <div id="select2-edit-submenu-flag"></div>
                    <div class="invalid-feedback" id="msg-edit-submenu-flag"></div>
                  </div>

                </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="btn-save-edit-submenu">Save</button>
              </div>
            </div>
          </div>
        </div>
<?php endif; ?>