<?php if (isset($this->allowFile) && $this->allowFile): ?>


        <div class="row justify-content-center main-js" my-js="user-access-menu">
          <div class="col-lg-12">
            <!-- Page Heading -->
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 link-underline-dark"><?= $this->e($data['on-menu']['submenu-name']) ?></h1>
            </div>

            <div class="card shadow">
              <div class="card-body">
                
                <div class="table-responsive">
                  <table class="table table-bordered" id="datatable-access-menu-management" width="100%" cellspacing="0">
                    <thead>
                      <tr>
                        <th class="align-middle text-center text-capitalize">No</th>
                        <th class="align-middle text-center text-capitalize">Name</th>
                        <th class="align-middle text-center text-capitalize">Dept</th>
                        <th class="align-middle text-center text-capitalize">Role</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th class="align-middle text-center text-capitalize">No</th>
                        <th class="align-middle text-center text-capitalize">Name</th>
                        <th class="align-middle text-center text-capitalize">Dept</th>
                        <th class="align-middle text-center text-capitalize">Role</th>
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

        <!-- Modal New Menu -->
        <div class="modal fade" id="modal-user-access-menu" tabindex="-1" role="dialog" aria-labelledby="user-access-menu-label" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="user-access-menu-label">User Access Menu</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="d-flex align-items-start border rounded">

                  <ul class="nav flex-column border rounded" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    
                  </ul>
                  <div class="tab-content" id="v-pills-tabContent">

                  </div>
                </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="btn-save-user-access-menu">Save</button>
              </div>
            </div>
          </div>
        </div>

<?php endif; ?>