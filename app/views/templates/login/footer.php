<?php if (isset($this->allowFile) && $this->allowFile): ?>
    <div class="air-badge position-fixed zindex-2023"></div>

    <!-- Core JS - includes jquery, bootstrap, popper, in-view and sticky-kit -->
    <script src="<?= $this->base_url() ?>/assets/js/purpose.core.js"></script>
    <!-- Purpose JS -->
    <script src="<?= $this->base_url() ?>/assets/js/purpose.js"></script>
    <!-- include library -->
    <script src="<?= $this->base_url() ?>/assets/libs/jsencrypt/dist/jsencrypt.js"></script>
    <!-- Demo JS - remove it when starting your project -->
    <script src="<?= $this->base_url() ?>/assets/js/demo.js"></script>

    <!-- Custome JS -->
    <script src="<?= $this->base_url() ?>/assets/js/tools/function.js"></script>
    <script src="<?= $this->base_url() ?>/assets/js/tools/login.js"></script>

  </body>

</html>
<?php endif; ?>