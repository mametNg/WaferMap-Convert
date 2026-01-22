// Call the dataTables jQuery plugin
// $(document).ready(function() {
//   $('#dataTable').DataTable(datatableOpt());
//   $('#datatable-exam-result').DataTable(datatableOpt());
// });

const datatableOpt = () => {
  return {
    // dom: 'Blfrtip',
    initComplete: function () {
      let api = this.api();
      let footers = $('tfoot th');
      for (i = 0; i < footers.length; i++) {
        api.order.listener(footers[i], i);
      }

      api.buttons().container().prependTo("#"+this.attr("id")+"_wrapper .row:eq(0)");
      $(".dt-buttons").addClass("col-sm-12 mb-2").removeClass("dt-buttons");
      $(".dt-down-arrow").addClass("text-xs ml-2");
    },
    buttons: selectionExportBtn(),
  };
}

const exportBtn = () => {
  return [
    {
      extend: 'excel',
      text : '<span class="mr-2">Excel</span><i class="fas fa-fw fa-file-excel"></i>', 
      className: 'btn btn-success btn-sm mb-1',
      init: function(api, node, config) {
        $(node).removeClass('dt-button');
      }
    },
    {
      extend: 'csv',
      text : '<span class="mr-2">CSV</span><i class="fas fa-fw fa-file-csv"></i>', 
      className: 'btn btn-success btn-sm mb-1',
      init: function(api, node, config) {
        $(node).removeClass('dt-button');
      }
    },
    // {
    //   extend: 'pdf',
    //   text : '<span class="mr-2">PDF</span><i class="fas fa-fw fa-file-pdf"></i>', 
    //   className: 'btn btn-danger btn-sm mb-1',
    //   init: function(api, node, config) {
    //     $(node).removeClass('dt-button');
    //   }
    // },
    {
      extend: 'copy',
      text : '<span class="mr-2">Copy</span><i class="fas fa-fw fa-copy"></i>', 
      className: 'btn btn-outline-primary btn-sm mb-1',
      init: function(api, node, config) {
        $(node).removeClass('dt-button');
      }
    }
  ];
}

const selectionExportBtn = () => {
  return [
    {
      extend: 'collection',
      text : '<span class="mr-2">Export Table</span><i class="fas fa-fw fa-file-export"></i>', 
      className: 'btn btn-primary btn-sm mb-1',
      buttons: [
      {
        extend: 'excel',
        text : '<span class="mr-2">Excel</span><i class="fas fa-fw fa-file-excel"></i>', 
        className: 'btn btn-success btn-sm btn-block mt-0',
        init: function(api, node, config) {
          $(node).removeClass('dt-button');
        }
      },
      {
        extend: 'csv',
        text : '<span class="mr-2">CSV</span><i class="fas fa-fw fa-file-csv"></i>', 
        className: 'btn btn-success btn-sm btn-block mt-1',
        init: function(api, node, config) {
          $(node).removeClass('dt-button');
        }
      },
      {
        extend: 'pdf',
        text : '<span class="mr-2">PDF</span><i class="fas fa-fw fa-file-pdf"></i>', 
        className: 'btn btn-danger btn-sm btn-block mt-1',
        init: function(api, node, config) {
          $(node).removeClass('dt-button');
        }
      },
      {
        extend: 'copy',
        text : '<span class="mr-2">Copy</span><i class="fas fa-fw fa-copy"></i>', 
        className: 'btn btn-primary btn-sm btn-block mt-1',
        init: function(api, node, config) {
          $(node).removeClass('dt-button');
        }
      },
      // {
      //   extend: 'print',
      //   text : '<span class="mr-2">Print</span><i class="fas fa-fw fa-print"></i>', 
      //   className: 'btn btn-primary btn-sm btn-block mt-1',
      //   init: function(api, node, config) {
      //     $(node).removeClass('dt-button');
      //   }
      // }
      ],
      init: function(api, node, config) {
        $(node).removeClass('dt-button');
      }
    }
    ];
}