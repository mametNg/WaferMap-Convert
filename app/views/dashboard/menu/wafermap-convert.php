<?php if (isset($this->allowFile) && $this->allowFile): ?>


        <div class="row justify-content-center">
          <div class="col-lg-6 mb-4">
            <div class="card bg-transparent shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary"><?= $this->e($data['header']['brand']) ?></h6>
              </div>
              <div class="card-body">
                <div class="text-center">
                  <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem;" src="<?= $this->base_url(); ?>/assets/img/brand/icon.png" alt="">
                </div>
                <p>Hello <?= $this->e(ucwords(trim($data['user']['name']))) ?>, Welcome to <?= $this->e($data['header']['brand']) ?>.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mb-4">
            <div class="card bg-transparent shadow mb-4">
              <div class="card-body">

                <div class="swiper-js-container mb-4">
                  <div class="swiper-container" data-swiper-items="1" data-swiper-sm-items="2" data-swiper-xl-items="3" data-swiper-space-between="20" data-swiper-sm-space-between="20"  data-swiper-xl-space-between="20">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <img class="bd-placeholder-img card-img-top" style="height : 250px;" src="<?= $this->base_url('assets/img/swiper/sw1.jpg') ?>">
                        <div class="bg-transition"></div>
                      </div>
                      <div class="swiper-slide">
                        <img class="bd-placeholder-img card-img-top" style="height : 250px;" src="<?= $this->base_url('assets/img/swiper/sw2.jpg') ?>">
                        <div class="bg-transition"></div>
                      </div>
                      <div class="swiper-slide">
                        <img class="bd-placeholder-img card-img-top" style="height : 250px;" src="<?= $this->base_url('assets/img/swiper/sw3.jpg') ?>">
                        <div class="bg-transition"></div>
                      </div>
                      <div class="swiper-slide">
                        <img class="bd-placeholder-img card-img-top" style="height : 250px;" src="<?= $this->base_url('assets/img/swiper/sw4.jpg') ?>">
                        <div class="bg-transition"></div>
                      </div>
                      <div class="swiper-slide">
                        <img class="bd-placeholder-img card-img-top" style="height : 250px;" src="<?= $this->base_url('assets/img/swiper/sw5.jpg') ?>">
                        <div class="bg-transition"></div>
                      </div>
                      <div class="swiper-slide">
                        <img class="bd-placeholder-img card-img-top" style="height : 250px;" src="<?= $this->base_url('assets/img/swiper/sw6.jpg') ?>">
                        <div class="bg-transition"></div>
                      </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                  </div>
                </div>

                <table class="text-sm">
                  <tr>
                    <td class="align-top">Nama Perusahaan</td>
                    <td class="align-top px-2">:</td>
                    <td class="align-top">PT. UTAC MANUFACTURING SEVICES INDONESIA</td>
                  </tr>
                  <tr>
                    <td class="align-top">Alamat</td>
                    <td class="align-top px-2">:</td>
                    <td class="align-top">Jl. Maligi I Lot A-1, Kawasan Industri KIIC, Sukaluyu Teluk Jambe Timur, Karawang 41361, Jawa Barat</td>
                  </tr>
                  <tr>
                    <td class="align-top">Telephone</td>
                    <td class="align-top px-2">:</td>
                    <td class="align-top">(62-21) 89111119</td>
                  </tr>
                  <tr>
                    <td class="align-top">NPWP</td>
                    <td class="align-top px-2">:</td>
                    <td class="align-top">01.071.432.7.055.000</td>
                  </tr>
                  <tr>
                    <td class="align-top">NIB</td>
                    <td class="align-top px-2">:</td>
                    <td class="align-top">8120213102026</td>
                  </tr>
                  <tr>
                    <td class="align-top">Izin Kawasan Berikat</td>
                    <td class="align-top px-2">:</td>
                    <td class="align-top">KEP-409/WBC.09/2020</td>
                  </tr>
                  <tr>
                    <td class="align-top">Fasilitas</td>
                    <td class="align-top px-2">:</td>
                    <td class="align-top">Kawasan Berikat Mandiri (KBM)</td>
                  </tr>
                  <tr>
                    <td class="align-top">Jalur</td>
                    <td class="align-top px-2">:</td>
                    <td class="align-top">Hijau</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>

<?php endif; ?> 