<?php if (isset($this->allowFile) && $this->allowFile): ?>
      
      </div>
    </div>
  </div>

  <div class="air-badge position-fixed zindex-2023"></div>
  <!-- Purpose Scripts -->
  <!-- Core JS - includes jquery, bootstrap, popper, in-view and sticky-kit -->
  <script src="<?= $this->base_url() ?>/assets/js/purpose.core.js"></script>

  <!-- Docs JS -->
  <script src="<?= $this->base_url() ?>/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/highlightjs/highlight.pack.min.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/clipboard/dist/clipboard.min.js"></script>

  <!-- =============================================================================== -->
  <!-- Page JS -->
  <script src="<?= $this->base_url() ?>/assets/libs/select2/dist/js/select2.min.js"></script>
  <!-- <script src="<?= $this->base_url() ?>/assets/libs/jquery-mask-plugin/dist/jquery.mask.min.js"></script> -->
  <!-- <script src="<?= $this->base_url() ?>/assets/libs/autosize/dist/autosize.min.js"></script> -->
  <!-- <script src="<?= $this->base_url() ?>/assets/libs/flatpickr/dist/flatpickr.min.js"></script> -->
  <!-- =============================================================================== -->

  <!-- Purpose JS -->
  <script src="<?= $this->base_url() ?>/assets/js/purpose.js"></script>

  <!-- include library -->
  <script src="<?= $this->base_url() ?>/assets/libs/swiper/dist/js/swiper.min.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/cropperjs/dist/cropper.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/jsencrypt/dist/jsencrypt.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/datatables/jquery.dataTables.min.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/datatables/RowsGroup-1.0.0/dataTables.rowsGroup.min.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/buttons/js/dataTables.buttons.min.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/jszip/dist/jszip.min.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/file-saver/dist/FileSaver.min.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/pdfmake/pdfmake.min.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/pdfmake/vfs_fonts.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/buttons/js/buttons.html5.min.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/buttons/js/buttons.print.min.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/dark-mode-switch/dark-mode-switch.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/jquery-ui/jquery-ui.js"></script>
  <script src="<?= $this->base_url() ?>/assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>

  <!-- Demo JS - remove it when starting your project -->
  <script src="<?= $this->base_url() ?>/assets/js/demo.js"></script>

  <!-- Custome JS -->
  <script src="<?= $this->base_url() ?>/assets/js/tools/function.js"></script>
  <script src="<?= $this->base_url() ?>/assets/js/addons/datatables.js"></script>
  <script src="<?= $this->base_url() ?>/assets/js/tools/dashboard.js"></script>

</body>

</html>

<?php endif; ?>