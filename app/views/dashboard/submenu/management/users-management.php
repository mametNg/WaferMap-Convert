<?php if (isset($this->allowFile) && $this->allowFile): ?>


        <div class="row justify-content-center main-js" my-js="management-user-management-page">
          <div class="col-lg-12">
            <!-- Page Heading -->
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 link-underline-dark"><?= $this->e($data['on-menu']['submenu-name']) ?></h1>
            </div>

            <div class="card shadow">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-bordered" id="datatable-user-management-list" width="100%" cellspacing="0">
                    <thead>
                      <tr>
                        <th class="align-middle text-center text-capitalize">No</th>
                        <th class="align-middle text-center text-capitalize">Name</th>
                        <th class="align-middle text-center text-capitalize">Username</th>
                        <th class="align-middle text-center text-capitalize">Email</th>
                        <th class="align-middle text-center text-capitalize">Role</th>
                        <th class="align-middle text-center text-capitalize">Departement</th>
                        <th class="align-middle text-center text-capitalize">Station</th>
                        <th class="align-middle text-center text-capitalize">Status</th>
                        <th class="align-middle text-center text-capitalize">Register Date</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th class="align-middle text-center text-capitalize">No</th>
                        <th class="align-middle text-center text-capitalize">Name</th>
                        <th class="align-middle text-center text-capitalize">Username</th>
                        <th class="align-middle text-center text-capitalize">Email</th>
                        <th class="align-middle text-center text-capitalize">Role</th>
                        <th class="align-middle text-center text-capitalize">Departement</th>
                        <th class="align-middle text-center text-capitalize">Station</th>
                        <th class="align-middle text-center text-capitalize">Status</th>
                        <th class="align-middle text-center text-capitalize">Register Date</th>
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

        <!-- Modal New -->
        <div class="modal fade" id="modal-new-user-management" tabindex="-1" role="dialog" aria-labelledby="modal-new-user-management-label" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modal-new-user-management-label">New user</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-new-username">Username</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-user"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="profile-new-username">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-profile-new-username"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-new-mail">Email Address</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-envelope"></i></span>
                      </div>
                      <input type="email" class="form-control pl-2 pr-n2" id="profile-new-mail">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-profile-new-mail"></div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-new-name">Name</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-user"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="profile-new-name">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-profile-new-name"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-new-role">Role</label>
                    <select class="form-control" id="profile-new-role" title="Role" data-live-search="true" data-live-search-placeholder="Role">
                      <option value="" selected disabled>Choose a Role</option>
                    </select>
                    <div id="select2-profile-new-role"></div>
                    <div class="invalid-feedback" id="msg-profile-new-role"></div>
                  </div>
                </div>
                
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-new-dept">Departement</label>
                    <select class="form-control" id="profile-new-dept" title="Departement" data-live-search="true" data-live-search-placeholder="Departement">
                      <option value="" selected disabled>Choose a Departement</option>
                    </select>
                    <div id="select2-profile-new-dept"></div>
                    <div class="invalid-feedback" id="msg-profile-new-dept"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-new-station">Station</label>
                    <select class="form-control" id="profile-new-station" title="Station" data-live-search="true" data-live-search-placeholder="Station">
                      <option value="" selected disabled>Choose a Station</option>
                      <option value="Internal">Internal</option>
                      <option value="External">External</option>
                    </select>
                    <div id="select2-profile-new-station"></div>
                    <div class="invalid-feedback" id="msg-profile-new-station"></div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-new-password">New Password</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="turn-profile-new-password"><i class="far fa-eye-slash"></i></span>
                      </div>
                      <input type="password" class="form-control" id="profile-new-password">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-profile-new-password"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-new-confirm-password">Confirm New Password</label>
                    <input type="password" class="form-control" id="profile-new-confirm-password">
                  </div>
                  <div class="invalid-feedback-msg" id="msg-profile-new-confirm-password"></div>
                </div>


              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="btn-save-new-user">Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal edit -->
        <div class="modal fade" id="modal-edit-user-management" tabindex="-1" role="dialog" aria-labelledby="modal-edit-user-management-label" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modal-edit-user-management-label">Edit user</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-edit-username">Username</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-user"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="profile-edit-username">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-profile-edit-username"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-edit-mail">Email Address</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-envelope"></i></span>
                      </div>
                      <input type="email" class="form-control pl-2 pr-n2" id="profile-edit-mail">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-profile-edit-mail"></div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-edit-name">Name</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-user"></i></span>
                      </div>
                      <input type="text" class="form-control pl-2 pr-n2" id="profile-edit-name">
                    </div>
                    <div class="invalid-feedback-msg" id="msg-profile-edit-name"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-edit-role">Role</label>
                    <select class="form-control" id="profile-edit-role" title="Role" data-live-search="true" data-live-search-placeholder="Role">
                      <option value="" selected disabled>Choose a Role</option>
                    </select>
                    <div id="select2-profile-edit-role"></div>
                    <div class="invalid-feedback" id="msg-profile-edit-role"></div>
                  </div>
                </div>
                
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-edit-dept">Departement</label>
                    <select class="form-control" id="profile-edit-dept" title="Departement" data-live-search="true" data-live-search-placeholder="Departement">
                      <option value="" selected disabled>Choose a Departement</option>
                    </select>
                    <div id="select2-profile-edit-dept"></div>
                    <div class="invalid-feedback" id="msg-profile-edit-dept"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-edit-station">Station</label>
                    <select class="form-control" id="profile-edit-station" title="Station" data-live-search="true" data-live-search-placeholder="Station">
                      <option value="" selected disabled>Choose a Station</option>
                      <option value="Internal">Internal</option>
                      <option value="External">External</option>
                    </select>
                    <div id="select2-profile-edit-station"></div>
                    <div class="invalid-feedback" id="msg-profile-edit-station"></div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="switch-pass">
                    <label class="custom-control-label" for="switch-pass">Enable change password</label>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-edit-password">New Password</label>
                    <div class="input-group input-group-merge">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="turn-profile-edit-password"><i class="far fa-eye-slash"></i></span>
                      </div>
                      <input type="password" class="form-control pl-2 pr-n2" id="profile-edit-password" disabled>
                    </div>
                    <div class="invalid-feedback-msg" id="msg-profile-edit-password"></div>
                  </div>

                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="profile-edit-confirm-password">Confirm New Password</label>
                    <input type="password" class="form-control pl-2 pr-n2" id="profile-edit-confirm-password" disabled>
                  </div>
                  <div class="invalid-feedback-msg" id="msg-profile-edit-confirm-password"></div>
                </div>


              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="btn-save-edit-user">Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal disable -->
        <div class="modal modal-dark fade" id="modal-disable-user-management" tabindex="-1" role="dialog" aria-labelledby="modal-disable-user-management" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <div class="text-center">
                  <div class="icon text-secondary">
                    <i class="fas fa-exclamation-circle fa-3x opacity-8"></i>
                  </div>
                  <h5 class="mt-4 text-secondary">Are you sure you want to disable it now!</h5>
                  <p class="text-sm text-secondary">Username <span class="info-disable-user font-weight-bolder"></span> all data will be disabled.</p>
                </div>
                <div class="d-flex justify-content-center">
                  <div class="m-2">
                    <button type="button" id="btn-save-disable-user" data-info="" data-role class="btn btn-secondary">disable Now</button>
                  </div>
                  <div class="m-2">
                    <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal enable -->
        <div class="modal modal-dark fade" id="modal-enable-user-management" tabindex="-1" role="dialog" aria-labelledby="modal-enable-user-management" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <div class="text-center">
                  <div class="icon text-secondary">
                    <i class="fas fa-exclamation-circle fa-3x opacity-8"></i>
                  </div>
                  <h5 class="mt-4 text-secondary">Are you sure you want to enable it now!</h5>
                  <p class="text-sm text-secondary">Username <span class="info-enable-user font-weight-bolder"></span> all data will be enabled.</p>
                </div>
                <div class="d-flex justify-content-center">
                  <div class="m-2">
                    <button type="button" id="btn-save-enable-user" data-info="" data-role class="btn btn-secondary">enable Now</button>
                  </div>
                  <div class="m-2">
                    <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

<?php endif; ?>