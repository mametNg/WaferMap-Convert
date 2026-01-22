<?php if (isset($this->allowFile) && $this->allowFile): ?>

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800 link-underline-dark"><?= $this->e($data['on-menu']['submenu-name']) ?></h1>
        </div>

        <div class="row justify-content-center main-js" my-js="page-inspection-outgoing">
          <div class="col-lg-12">
            <div class="card shadow">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-bordered" id="datatable-inspection-outgoing" width="100%" cellspacing="0">
                    <thead>
                      <tr>
                        <th rowspan="2" class="align-middle text-center text-capitalize">NO</th>
                        <th rowspan="2" class="align-middle text-center text-capitalize">DATE</th>
                        <th rowspan="2" class="align-middle text-center text-capitalize">OUTER #</th>
                        <th rowspan="2" class="align-middle text-center text-capitalize">LOT ID</th>
                        <th colspan="5" class="align-middle text-center text-capitalize">OUTER CARTON</th>
                        <th rowspan="2" class="align-middle text-center text-capitalize">REMARK</th>
                        <th rowspan="2" class="align-middle text-center text-capitalize">QA INSPEC</th>
                      </tr>
                      <tr>
                        <th class="align-middle text-center text-capitalize">CARTON CONDITION</th>
                        <th class="align-middle text-center text-capitalize">LABEL & SHIPPING MARK POSITION</th>
                        <th class="align-middle text-center text-capitalize">PRINTING CONDITION</th>
                        <th class="align-middle text-center text-capitalize">BARCODE CARTON SCANNABLE</th>
                        <th class="align-middle text-center text-capitalize">BARCODE LABEL READABLE</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th rowspan="2" class="align-middle text-center text-capitalize">NO</th>
                        <th rowspan="2" class="align-middle text-center text-capitalize">DATE</th>
                        <th rowspan="2" class="align-middle text-center text-capitalize">OUTER #</th>
                        <th rowspan="2" class="align-middle text-center text-capitalize">LOT ID</th>
                        <th class="align-middle text-center text-capitalize">CARTON CONDITION</th>
                        <th class="align-middle text-center text-capitalize">LABEL & SHIPPING MARK POSITION</th>
                        <th class="align-middle text-center text-capitalize">PRINTING CONDITION</th>
                        <th class="align-middle text-center text-capitalize">BARCODE CARTON SCANNABLE</th>
                        <th class="align-middle text-center text-capitalize">BARCODE LABEL READABLE</th>
                        <th rowspan="2" class="align-middle text-center text-capitalize">REMARK</th>
                        <th rowspan="2" class="align-middle text-center text-capitalize">QA INSPEC</th>
                      </tr>
                      <tr>
                        <th colspan="5" class="align-middle text-center text-capitalize">OUTER CARTON</th>
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
        <div class="modal fade" id="modal-new-inspection-outgoing" tabindex="-1" role="dialog" aria-labelledby="modal-new-inspection-outgoing-label" aria-hidden="true">
          <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modal-new-inspection-outgoing-label">Add new outgoing inspection</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-row">
                  <div class="form-group col-md-3">
                    <label class="form-control-label" for="new-out-inspect-date">Date</label>
                    <input type="date" class="form-control" id="new-out-inspect-date" placeholder="Date" value="<?= date("Y-m-d") ?>">
                    <div class="invalid-feedback-msg" id="msg-new-out-inspect-date"></div>
                  </div>
                  <div class="form-group col-md-2">
                    <label class="form-control-label" for="new-out-inspect-outer">Outer #</label>
                    <input type="text" class="form-control" id="new-out-inspect-outer" placeholder="Outer #">
                    <div class="invalid-feedback-msg" id="msg-new-out-inspect-outer"></div>
                  </div>
                  <div class="form-group col-md-7">
                    <label class="form-control-label" for="new-out-inspect-lot">Lot ID</label>
                    <input type="text" class="form-control" id="new-out-inspect-lot" placeholder="Lot ID">
                    <div class="invalid-feedback-msg" id="msg-new-out-inspect-lot"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label class="form-control-label" for="new-out-inspect-carton-condition">Carton Condition</label>
                    <select class="form-control" id="new-out-inspect-carton-condition" title="Carton Condition" data-live-search="true" data-live-search-placeholder="Carton Condition">
                      <option value="" selected disabled>Choose a Carton Condition</option>
                      <option value="OK">OK</option>
                      <option value="NG">NG</option>
                    </select>
                    <div id="select2-new-out-inspect-carton-condition"></div>
                    <div class="invalid-feedback" id="msg-new-out-inspect-carton-condition"></div>
                  </div>
                  <div class="form-group col-md-4">
                    <label class="form-control-label" for="new-out-inspect-label-position">Label & Shipping Mark Position</label>
                    <select class="form-control" id="new-out-inspect-label-position" title="Label & Shipping Mark Position" data-live-search="true" data-live-search-placeholder="Label & Shipping Mark Position">
                      <option value="" selected disabled>Choose a Label & Shipping Mark Position</option>
                      <option value="OK">OK</option>
                      <option value="NG">NG</option>
                    </select>
                    <div id="select2-new-out-inspect-label-position"></div>
                    <div class="invalid-feedback" id="msg-new-out-inspect-label-position"></div>
                  </div>
                  <div class="form-group col-md-4">
                    <label class="form-control-label" for="new-out-inspect-printing-condition">Printing Condition</label>
                    <select class="form-control" id="new-out-inspect-printing-condition" title="Printing Condition" data-live-search="true" data-live-search-placeholder="Printing Condition">
                      <option value="" selected disabled>Choose a Printing Condition</option>
                      <option value="OK">OK</option>
                      <option value="NG">NG</option>
                    </select>
                    <div id="select2-new-out-inspect-printing-condition"></div>
                    <div class="invalid-feedback" id="msg-new-out-inspect-printing-condition"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-out-inspect-barcode-scan">Barcode Carton Scannable</label>
                    <select class="form-control" id="new-out-inspect-barcode-scan" title="Barcode Carton Scannable" data-live-search="true" data-live-search-placeholder="Barcode Carton Scannable">
                      <option value="" selected disabled>Choose a Barcode Carton Scannable</option>
                      <option value="OK">OK</option>
                      <option value="NG">NG</option>
                    </select>
                    <div id="select2-new-out-inspect-barcode-scan"></div>
                    <div class="invalid-feedback" id="msg-new-out-inspect-barcode-scan"></div>
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-out-inspect-label-read">Barcode Label Readable</label>
                    <select class="form-control" id="new-out-inspect-label-read" title="Barcode Label Readable" data-live-search="true" data-live-search-placeholder="Barcode Label Readable">
                      <option value="" selected disabled>Choose a Barcode Label Readable</option>
                      <option value="OK">OK</option>
                      <option value="NG">NG</option>
                    </select>
                    <div id="select2-new-out-inspect-label-read"></div>
                    <div class="invalid-feedback" id="msg-new-out-inspect-label-read"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-out-inspect-remark">Remark</label>
                    <input type="text" class="form-control" id="new-out-inspect-remark" placeholder="Remark">
                    <div class="invalid-feedback-msg" id="msg-new-out-inspect-remark"></div>
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="new-out-inspect-qa">QA Inspect</label>
                    <input type="text" class="form-control" id="new-out-inspect-qa" placeholder="QA Inspect">
                    <div class="invalid-feedback-msg" id="msg-new-out-inspect-qa"></div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="btn-save-new-inspection-outgoing">Save new</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Edit -->
        <div class="modal fade" id="modal-edit-inspection-outgoing" tabindex="-1" role="dialog" aria-labelledby="modal-edit-inspection-outgoing-label" aria-hidden="true">
          <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modal-edit-inspection-outgoing-label">Edit outgoing inspection</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-row">
                  <div class="form-group col-md-3">
                    <label class="form-control-label" for="edit-out-inspect-date">Date</label>
                    <input type="date" class="form-control" id="edit-out-inspect-date" placeholder="Date" value="<?= date("Y-m-d") ?>">
                    <div class="invalid-feedback-msg" id="msg-edit-out-inspect-date"></div>
                  </div>
                  <div class="form-group col-md-2">
                    <label class="form-control-label" for="edit-out-inspect-outer">Outer #</label>
                    <input type="text" class="form-control" id="edit-out-inspect-outer" placeholder="Outer #">
                    <div class="invalid-feedback-msg" id="msg-edit-out-inspect-outer"></div>
                  </div>
                  <div class="form-group col-md-7">
                    <label class="form-control-label" for="edit-out-inspect-lot">Lot ID</label>
                    <input type="text" class="form-control" id="edit-out-inspect-lot" placeholder="Lot ID">
                    <div class="invalid-feedback-msg" id="msg-edit-out-inspect-lot"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label class="form-control-label" for="edit-out-inspect-carton-condition">Carton Condition</label>
                    <select class="form-control" id="edit-out-inspect-carton-condition" title="Carton Condition" data-live-search="true" data-live-search-placeholder="Carton Condition">
                      <option value="" selected disabled>Choose a Carton Condition</option>
                      <option value="OK">OK</option>
                      <option value="NG">NG</option>
                    </select>
                    <div id="select2-edit-out-inspect-carton-condition"></div>
                    <div class="invalid-feedback" id="msg-edit-out-inspect-carton-condition"></div>
                  </div>
                  <div class="form-group col-md-4">
                    <label class="form-control-label" for="edit-out-inspect-label-position">Label & Shipping Mark Position</label>
                    <select class="form-control" id="edit-out-inspect-label-position" title="Label & Shipping Mark Position" data-live-search="true" data-live-search-placeholder="Label & Shipping Mark Position">
                      <option value="" selected disabled>Choose a Label & Shipping Mark Position</option>
                      <option value="OK">OK</option>
                      <option value="NG">NG</option>
                    </select>
                    <div id="select2-edit-out-inspect-label-position"></div>
                    <div class="invalid-feedback" id="msg-edit-out-inspect-label-position"></div>
                  </div>
                  <div class="form-group col-md-4">
                    <label class="form-control-label" for="edit-out-inspect-printing-condition">Printing Condition</label>
                    <select class="form-control" id="edit-out-inspect-printing-condition" title="Printing Condition" data-live-search="true" data-live-search-placeholder="Printing Condition">
                      <option value="" selected disabled>Choose a Printing Condition</option>
                      <option value="OK">OK</option>
                      <option value="NG">NG</option>
                    </select>
                    <div id="select2-edit-out-inspect-printing-condition"></div>
                    <div class="invalid-feedback" id="msg-edit-out-inspect-printing-condition"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-out-inspect-barcode-scan">Barcode Carton Scannable</label>
                    <select class="form-control" id="edit-out-inspect-barcode-scan" title="Barcode Carton Scannable" data-live-search="true" data-live-search-placeholder="Barcode Carton Scannable">
                      <option value="" selected disabled>Choose a Barcode Carton Scannable</option>
                      <option value="OK">OK</option>
                      <option value="NG">NG</option>
                    </select>
                    <div id="select2-edit-out-inspect-barcode-scan"></div>
                    <div class="invalid-feedback" id="msg-edit-out-inspect-barcode-scan"></div>
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-out-inspect-label-read">Barcode Label Readable</label>
                    <select class="form-control" id="edit-out-inspect-label-read" title="Barcode Label Readable" data-live-search="true" data-live-search-placeholder="Barcode Label Readable">
                      <option value="" selected disabled>Choose a Barcode Label Readable</option>
                      <option value="OK">OK</option>
                      <option value="NG">NG</option>
                    </select>
                    <div id="select2-edit-out-inspect-label-read"></div>
                    <div class="invalid-feedback" id="msg-edit-out-inspect-label-read"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-out-inspect-remark">Remark</label>
                    <input type="text" class="form-control" id="edit-out-inspect-remark" placeholder="Remark">
                    <div class="invalid-feedback-msg" id="msg-edit-out-inspect-remark"></div>
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-control-label" for="edit-out-inspect-qa">QA Inspect</label>
                    <input type="text" class="form-control" id="edit-out-inspect-qa" placeholder="QA Inspect">
                    <div class="invalid-feedback-msg" id="msg-edit-out-inspect-qa"></div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="btn-save-edit-inspection-outgoing">Save change</button>
              </div>
            </div>
          </div>
        </div>
<?php endif; ?>