<?php if (isset($this->allowFile) && $this->allowFile): ?>

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800 link-underline-dark"><?= $this->e($data['on-menu']['submenu-name']) ?></h1>
        </div>

        <div class="row justify-content-center main-js" my-js="page-map-convert-legic" data-containt="<?= $this->e(strtolower(str_replace(' ', '-', $data['on-menu']['menu-name']))) ?>-<?= $this->e(strtolower(str_replace(' ', '-', $data['on-menu']['submenu-name']))) ?>">
          <div class="col-lg-12">
            <div class="card shadow">
              <div class="card-body">

                <div class="form-group">
                  <label class="form-control-label" for="wafer-code-legic">Wafer Code:</label>
                  <select class="form-control" id="wafer-code-legic" title="Wafer code" data-live-search="true" data-live-search-placeholder="Wafer code">
                    <option value="" selected disabled>Choose a Wafer code</option>
                    <option value="M/PM410">M/PM410</option>
                    <option value="ATC 1024">ATC 1024</option>
                  </select>
                  <div id="select2-wafer-code-legic"></div>
                  <div class="invalid-feedback" id="msg-wafer-code-legic"></div>
                </div>

                <div id="drop-zone-legic" class="border border-2 border-dashed rounded-3 p-5 text-center bg-light">
                  <i class="bi bi-cloud-arrow-up fs-1 text-primary"></i>
                  <h4 class="mt-3">Drag & Drop files here</h4>
                  <p class="text-muted">or click to browse</p>
                  <input type="file" id="file-input-legic" multiple class="d-none">
                  <button type="button" class="btn btn-primary mt-2" id="btn-file-input-legic">
                    Select Files
                  </button>
                </div>

                <div id="file-list-legic" class="mt-3"></div>

                <div class="form-group d-flex justify-content-center">
                  <button type="button" class="btn btn-info d-none" id="btn-map-convert-legic" disabled>Convert</button>
                  <button type="button" class="btn btn-outline-primary d-none" id="btn-map-download-legic" disabled>Download All</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal View Map Before -->
        <div class="modal fade" id="modal-map-before-convert-legic" tabindex="-1" role="dialog" aria-labelledby="map-before-convert-legic-label" aria-hidden="true">
          <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="map-before-convert-legic-label">Wafermap View</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <textarea class="form-control" id="text-map-before-convert-legic" rows="10" readonly></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal View Map After -->
        <div class="modal fade" id="modal-map-after-convert-legic" tabindex="-1" role="dialog" aria-labelledby="map-after-convert-legic-label" aria-hidden="true">
          <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="map-after-convert-legic-label">Wafermap View</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="overflow-auto" style="max-width: 100%; max-height: 500px;">
                  <div class="text-center px-4 py-2">
                    <div id="map-container-after-convert-legic" class="mx-auto" style="display: inline-grid; gap: 1px; background: #ccc; border: 1px solid #999;">
                    </div>
                  </div>
                </div>

                <div class="mt-3 d-flex justify-content-center gap-4" id="map-decs-after-convert-legic">
                </div>
              </div>
            </div>
          </div>
        </div>
<?php endif; ?>