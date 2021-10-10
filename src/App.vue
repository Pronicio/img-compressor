<template>
  <header class="header-dark">
    <nav class="navbar navbar-dark navbar-expand-lg navigation-clean-search">
      <div class="container"><a class="navbar-brand" href="#">Just a simple image compressor</a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="navbar-nav">
            <li class="nav-item"></li>
          </ul>
          <form class="me-auto" target="_self">
            <div class="d-flex align-items-center"><label class="form-label d-flex mb-0" for="search-field"></label></div>
          </form><span class="navbar-text"></span><a class="btn btn-light action-button" role="button" href="#">Github</a>
        </div>
      </div>
    </nav>
    <div class="container hero">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">Compress your images :</h1>
          <div class="ratio ratio-16x9">
            <DropZone
              :maxFiles="Number(10000000000)"
              url="null"
              :uploadOnDrop="true"
              :multipleUpload="true"
              :parallelUpload="3"
              :acceptedFiles="['png', 'jpg', 'jpeg', 'tif', 'svg']"
              @addedFile="upload"
              @removedFile="remove"
            />
          </div>
        </div>
      </div>
    </div>
    <footer class="footer-dark">
      <button v-if="imagesUrl[Object.keys(imagesUrl)[0]]" @click="downloadAll" class="btn btn-primary btn-lg text-center" type="button" style="color: #fff;background-color: #0d6efd;border-color: #0d6efd;text-align: center;display: block;margin-left: auto;margin-right: auto;">Download everything !</button>
    </footer>
  </header>

</template>

<script>
import { DropZone } from 'dropzone-vue'
import '@/assets/css/dropzone.css';

import imageCompression from 'browser-image-compression'

export default {
  name: 'App',
  components: { DropZone },
  data: function () {
    return {
      images: {},
      imagesUrl: {}
    };
  },
  mounted: () => {},
  methods: {
    async upload (e) {
      const file = e.file

      Object.assign(this.images, {file})

      const compressed = URL.createObjectURL(await imageCompression(file))
      Object.assign(this.imagesUrl, { [file.name]: compressed })
    },
    async remove (e) {
      const file = e.file

      delete this.images[file.name]
      delete this.imagesUrl[file.name]
    },
    downloadAll () {
      const link = document.createElement('a');

      link.setAttribute('download', null);
      link.style.display = 'none';

      document.body.appendChild(link);

      for (const prop in this.imagesUrl) {
        link.setAttribute('download', prop);
        link.setAttribute('href', this.imagesUrl[prop]);
        link.click();
      }

      document.body.removeChild(link);
    },
  }
}
</script>

<style scoped>
@import "./assets/bootstrap/css/bootstrap.min.css";
@import "./assets/css/Footer-Dark.css";
@import "./assets/css/Header-Dark.css";
</style>
