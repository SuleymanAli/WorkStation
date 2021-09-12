<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/Dashboard"
        >WorkStation</a
      >
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" @click="logout">Sign out</a>
        </li>
      </ul>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  <span data-feather="home"></span>
                  Dashboard <span class="sr-only">(current)</span>
                </a>
              </li>
              <!-- <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file"></span>
                  Orders
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="shopping-cart"></span>
                  Products
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="users"></span>
                  Customers
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="bar-chart-2"></span>
                  Reports
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="layers"></span>
                  Integrations
                </a>
              </li> -->
            </ul>

            <!-- <h6
              class="
                sidebar-heading
                d-flex
                justify-content-between
                align-items-center
                px-3
                mt-4
                mb-1
                text-muted
              "
            >
              <span>Saved reports</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Current month
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Last quarter
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Social engagement
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Year-end sale
                </a>
              </li>
            </ul> -->
          </div>
        </nav>

        <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
          <!-- <div
            class="
              d-flex
              justify-content-between
              flex-wrap flex-md-nowrap
              align-items-center
              pt-3
              pb-2
              mb-3
              border-bottom
            "
          >
            <h1 class="h2">Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Share
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Export
                </button>
              </div>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary dropdown-toggle"
              >
                <span data-feather="calendar"></span>
                This week
              </button>
            </div>
          </div> -->

          <div class="d-flex justify-content-between py-3">
            <h2>Documents</h2>
            <button v-b-modal.modalInsert class="btn btn-info btn-sm">
              Create Document
            </button>
          </div>

          <div class="row">
            <div class="col-lg-8 table-responsive">
              <table class="table table-striped table-sm">
                <thead>
                  <tr>
                    <!-- <th># ID</th> -->
                    <th>Name</th>
                    <th>File</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(document, index) in documentAll"
                    :key="document._id"
                    @click="selectedDocument.file = document.file"
                  >
                    <!-- <td>{{ document._id.slice(15, -1) + '...' }}</td> -->
                    <td>{{ document.name }}</td>
                    <td>
                      <div>
                        {{ document.file.slice(0, 30) + '...' }}
                        <span>
                          <a :href="document.file" target="_blank">
                            Open New Tab
                          </a>
                        </span>
                      </div>
                    </td>
                    <td>
                      {{ $moment(document.date).format('DD MMM YYYY') }}
                    </td>
                    <td>
                      <span
                        v-b-modal.modalEdit
                        class="badge badge-warning"
                        @click="editDocument(index)"
                        >Edit</span
                      >
                      <span
                        class="badge badge-danger"
                        @click="deleteDocument(document._id)"
                        >Delete</span
                      >
                      <span
                        class="badge badge-success"
                        @click="selectedDocument.file = document.file"
                        >Open</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-4">
              <div class="px-2"><pdf :src="selectedDocument.file"></pdf></div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <!-- Modal Insert -->
    <b-modal id="modalInsert" centered hide-footer title="Create Document">
      <form @submit.prevent="insertDocument">
        <div class="form-group">
          <label for="">Name</label>
          <input
            v-model="insertedDocument.name"
            type="text"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="">File</label>
          <input
            id="file"
            ref="file"
            type="file"
            @change="onChangeFileUpload()"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-info">Submit</button>
        </div>
      </form>
    </b-modal>
    <!-- Modal Edit-->
    <b-modal id="modalEdit" centered hide-footer title="Edit Document Name">
      <form @submit.prevent="updateDocument">
        <div class="form-group">
          <label for="">Name</label>
          <input
            v-model="editingDocument.name"
            type="text"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-secondary">Submit</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: { pdf },
  middleware({ app, redirect }) {
    if (!app.$cookies.get('token')) {
      return redirect('/user/login')
    }
  },
  data() {
    return {
      documentAll: null,
      insertedDocument: {
        name: null,
        file: null,
      },
      selectedDocument: {
        file: null,
      },
      editingDocument: '',
    }
  },
  // watch: {
  //   selectedDocument: {
  //     handler(old, newV) {
  //       console.log(old, newV)
  //     },
  //     deep: true,
  //   },
  // },
  created() {
    this.$axios
      .get('/api/document/all', {
        headers: { Authorization: `Bearer ${this.$cookies.get('token')}` },
      })
      .then((res) => {
        this.documentAll = res.data
      })
  },
  methods: {
    insertDocument() {
      const formData = new FormData()
      formData.append('file', this.insertedDocument.file)
      formData.append('name', this.insertedDocument.name)

      this.$axios
        .post('api/document/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        })
        .then((res) => {
          this.documentAll.push(res.data)
          this.$bvModal.hide('modalInsert')
        })
        .catch(function (error) {
          console.error('FAILURE!!', error)
        })
    },
    editDocument(index) {
      this.editingDocument = this.documentAll[index]
    },
    updateDocument() {
      this.$axios
        .patch(
          'api/document/update/' + this.editingDocument._id,
          { name: this.editingDocument.name },
          {
            headers: { Authorization: `Bearer ${this.$cookies.get('token')}` },
          }
        )
        .then((res) => this.$bvModal.hide('modalEdit'))
        .catch((e) => console.log(e))
    },
    deleteDocument(id) {
      this.$axios
        .delete('api/document/delete/' + id, {
          headers: { Authorization: `Bearer ${this.$cookies.get('token')}` },
        })
        .then((res) => {
          const deletedDocument = this.documentAll.findIndex((item) => {
            return item._id === id
          })
          this.documentAll.splice(deletedDocument, 1)
        })
        .catch((e) => console.log(e))
    },
    onChangeFileUpload() {
      this.insertedDocument.file = this.$refs.file.files[0]
    },
    logout() {
      this.$cookies.remove('token')
      this.$router.push('/user/login')
    },
  },
}
</script>

<style>
body {
  font-size: 0.875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

.badge {
  cursor: pointer;
}

table,
th,
td {
  border-collapse: collapse;
}

table {
  width: 100%;
}

/* td:nth-child(1) {
  width: 10% !important;
}

td:nth-child(2) {
  width: 60%;
} */

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}

/*
 * Content
 */

[role='main'] {
  padding-top: 133px; /* Space for fixed navbar */
}

@media (min-width: 768px) {
  [role='main'] {
    padding-top: 48px; /* Space for fixed navbar */
  }
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>
