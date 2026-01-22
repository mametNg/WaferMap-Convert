'use strict';

const inputValidation = (method1, method2) => {
	const input = $(method1);
	const msg = $(method2);

	let filter = filterLength(method1, 1);
	if (filter !== true) {
		input.removeClass("is-valid");
		input.addClass("is-invalid");
		msg.text('Cannot be empty!');
		return false;
	} else {
		input.addClass("is-valid");
		input.removeClass("is-invalid");
		msg.text("");
		return true;
	}
}

const numberValidation = (method1, method2) => {
	const input = $(method1);
	const msg = $(method2);

	let filter = filterNumb("#"+input.attr("id"), false, 1, false, false);

	if (filter['status'] !== true) {
		input.removeClass("is-valid");
		input.addClass("is-invalid");
		msg.text(filter['msg']);
		return false;
	} else {
		input.addClass("is-valid");
		input.removeClass("is-invalid");
		msg.text("");
		return true;
	}
}

const selectValidation = (method1, method2) => {
	let input = $(method1);
	let msg = $(method2);

	if (input.val() && input.val().length !== 0) {
		input.removeClass('is-invalid');
		input.addClass('is-valid');
		msg.text("");
		return true;
	} else {
		input.removeClass('is-valid');
		input.addClass('is-invalid');
		msg.text("Cannot be empty!");
		return false;
	}
}

const select2Validation = (method1, method2) => {
	let input = $(method1 + " + span span span");
	let inputCore = $(method1);
	let msg = $(method2);

	if (inputCore.val() && inputCore.val().length !== 0) {
		input.removeClass('border-danger');
		input.addClass('border-success');

		inputCore.removeClass('is-invalid');
		inputCore.addClass('is-valid');

		msg.text("");
		return true;
	} else {
		input.removeClass('border-success');
		input.addClass('border-danger');

		inputCore.removeClass('is-valid');
		inputCore.addClass('is-invalid');

		msg.text("Cannot be empty!");
		return false;
	}
}

const filterImage = (method1, method2, fname) => {
	let input = $(method1);
	let msg = $(method2);
	let _fname = $(fname);

	if (input && input.prop('files').length == 1) {
		msg.text('');
		input.removeClass('is-invalid');
		input.addClass('is-valid');
		return true;
	}

	if (!method1 || !input.prop('files').length == 1) {
		msg.text("Please choose a image!");
		_fname.text("Choose a image");
		input.removeClass('is-valid');
		input.addClass('is-invalid');
		return false;
	}
}

let filterName = (method1, method2) => {
	let input = $(method1);
	let msg = $(method2);

	let filter = filterChar(input, [" "], 3);
	if (filter.status) {
		msg.text('');
		input.attr('class', 'form-control is-valid');
	}

	if (!filter.status) {
		msg.text(filter.msg);
		input.attr('class', 'form-control is-invalid');
	}

	return filter.status ? true:false;
}

const filterPasswd = (method1, method2, method3) => {
	const input = $(method1);
	const msg = $(method2);

	let filter = filterPass(method1, 6);

	if (filter.status) {
		msg.text('');
		input.addClass("is-valid");
		input.removeClass("is-invalid");
	}

	if (!filter.status) {
		msg.text(filter.msg);
		input.removeClass("is-valid");
		input.addClass("is-invalid");
	}

	return filter.status ? true:false;
}

let filterNewPassword = (method1, method2, method3) => {
	let password = $(method1);
	let msgPassword = $(method2);
	let confirm = $(method3);

	let filter = filterPass(method1, 8);

	if (!filter.status) {
		password.attr("class", "form-control is-invalid");
		msgPassword.text(filter.msg);
		return false;
	}

	if (filter.status) {

		if (confirm.val().trim().length >= 1) {
			if (password.val().trim() == confirm.val().trim()) {
				password.attr("class", "form-control is-valid");
				confirm.attr("class", "form-control is-valid");
				msgPassword.text("");
				return true;
			}

			if (password.val().trim() !== confirm.val().trim()) {
				password.attr("class", "form-control is-invalid");
				confirm.attr("class", "form-control is-invalid");
				msgPassword.text("This password is not sync!");
				return false;
			}
		}

		if (confirm.val().trim().length <= 0) {
			password.attr("class", "form-control is-valid");
			msgPassword.text("");
			return true;
		}
	}
}

let filterConfirmNewPassword = (method1, method2, method3) => {
	let password = $(method1);
	let msgPassword = $(method2);
	let confirm = $(method3);

	let fPass = filterPass(method1, 8);

	if (!fPass.status) {
		password.attr("class", "form-control is-invalid");
		msgPassword.text(fPass.msg);
		return false;
	}

	if (fPass.status) {
		if (password.val().trim() == confirm.val().trim()) {
			password.attr("class", "form-control is-valid");
			confirm.attr("class", "form-control is-valid");
			msgPassword.text("");
			return true;
		}

		if (password.val().trim() !== confirm.val().trim()) {
			password.attr("class", "form-control is-invalid");
			confirm.attr("class", "form-control is-invalid");
			msgPassword.text("Password is not sync!");
			return false;
		}
	}
}

// ==================================================================
const shippingInstructuion = () => {

	$("#shp-incoterm").select2({
		dropdownParent: $('#select2-shp-incoterm')
	});

	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;
	let autocompleteRows = {
		"label": [],
		"data": {}
	};

	let tableOptIndex = datatableOpt();

	let tableBtnIndex = [
		{	
			text : '<span class="mr-2">Add</span><i class="fas fa-fw fa-plus"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-new-shp');
				$(node).attr('disabled', false);
			}
		},
		{	
			text : '<span class="mr-2">Edit</span><i class="fas fa-fw fa-edit"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-edit-shp');
				$(node).attr('disabled', false);
			}
		},
		{	
			text : '<span class="mr-2">Delete</span><i class="fas fa-fw fa-minus"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-delete-shp');
				$(node).attr('disabled', false);
			}
		},
		{	
			text : '<span class="mr-2">Format Print</span><i class="fas fa-fw fa-print"></i>', 
			className: 'btn btn-dark btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-format-print-shp');
				$(node).attr('disabled', false);
			}
		},
		{	
			text : '<span class="mr-2">Format Excel</span><i class="fas fa-fw fa-file-excel"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-format-excel-shp');
				$(node).attr('disabled', false);
			}
		},
		{	
			text : '<span class="mr-2">Format PDF</span><i class="fas fa-fw fa-file-pdf"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-format-pdf-shp');
				$(node).attr('disabled', false);
			}
		}
	];

	tableOptIndex['buttons'] = arrayPrepend(tableBtnIndex, selectionExportBtn());

	tableOptIndex['columns'] = [
		{data: "NO"},
		{data: "DOCS NUMBER"},
		{data: "CONSIGNEE"},
		{data: "Fowarder"},
		{data: "Total Carton"},
		{data: "FLIGHT"},
		{data: "MAWB"},
		{data: "HAWB"},
		{data: "CREATED"}
	];

	tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-shp-list');
		$(row).attr('data', data.data);
		$(row).attr('stg', false);
	};

	tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 1],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
			}
		},
	];
	
	let dataTableIndex = $('#datatable-shp-list').DataTable(tableOptIndex);

	const selectShippingList = (arr) => {
		const btnEdit = $("#btn-edit-shp");
		const btnDelete = $("#btn-delete-shp");
		const btnPrint = $("#btn-format-print-shp");
		const btnExcel = $("#btn-format-excel-shp");
		const btnPdf = $("#btn-format-pdf-shp");

		let tables = $('[id^="select-shp-list"]');
		let isOn = 0;
		let shiftTable = 0;

		for (let i = 0; i < tables.length; i++) {

			if (selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				isOn++;
				lastPressed = (i+1);
			} else {
				if (ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							isOn++;
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (shiftPressed && !ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						shiftTable = (i+1);
					}
				}

				if (!shiftPressed) shiftTable = 0;
			}
		}

		// naik
		if (lastPressed && shiftTable && lastPressed > shiftTable) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					isOn++;
				}
			}
		}

		// turun
		if (shiftTable > lastPressed) {
			if (lastPressed >= 1) lastPressed --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= lastPressed && i < shiftTable) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					isOn++;
				}
			}
		}

		if (isOn == 0) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", true);
			btnPrint.attr("disabled", true);
			btnExcel.attr("disabled", true);
			btnPdf.attr("disabled", true);
			lastPressed = 0;
		}

		if (isOn == 1) {
			btnEdit.attr("disabled", false);
			btnDelete.attr("disabled", false);
			btnPrint.attr("disabled", false);
			btnExcel.attr("disabled", false);
			btnPdf.attr("disabled", false);
		}

		if (isOn >= 2) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", false);
			btnPrint.attr("disabled", true);
			btnExcel.attr("disabled", true);
			btnPdf.attr("disabled", true);
		}
	}

	$(document).keydown(function(event){
		if(event.which == "17") ctrlPressed = true;
		if(event.which == "16") shiftPressed = true;
		if(ctrlPressed && event.which == "65") selectAll = true;

		if (event.keyCode == 65 && event.ctrlKey && selectAll) {
			textSelection('datatable-shp-list');
			event.preventDefault();
			selectShippingList();
		}
	});

	$(document).keyup(function(){
		ctrlPressed = false;
		shiftPressed = false;
		selectAll = false;
	});

	$(document).on('click', '[id^="select-shp-list"]', function () {
		const myData = $(this);

		selectShippingList(myData);
	});

	$(document).ready(function () {
		const shpNumb = $("#shp-number");
		const btnEdit = $("#btn-edit-shp");
		const btnDelete = $("#btn-delete-shp");
		const btnPrint = $("#btn-format-print-shp");
		const btnExcel = $("#btn-format-excel-shp");
		const btnPdf = $("#btn-format-pdf-shp");

		const shpConsignee = $("#shp-consignee");
		const shpAddress = $("#shp-address");
		const shpEori = $("#shp-eori");
		const shpAttention = $("#shp-attention");
		const shpEmail = $("#shp-email");
		const shpContact = $("#shp-contact");
		const shpExt = $("#shp-ext");


		$(".air-badge").html(loadingBackdrop());

		const url = baseUrl("/auth/api/v11/info-si");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				shpNumb.val(obj.result.new['si_number']);

				let sc = [];

				for (let i = 0; i < obj.result.load.length; i++) {
					autocompleteRows['label'][i] = {value: obj.result.load[i].consignee, label: obj.result.load[i].consignee, data: obj.result.load[i].si_number};
					autocompleteRows['data'][obj.result.load[i].si_number] = obj.result.load[i];
					sc[i] = {
						"NO": (i+1),
						"DOCS NUMBER": obj.result.load[i].si_number,
						"CONSIGNEE": obj.result.load[i].consignee,
						"Fowarder": obj.result.load[i].forwarder,
						"Total Carton": obj.result.load[i].total_carton,
						"FLIGHT": obj.result.load[i].flight_name,
						"MAWB": obj.result.load[i].mawb,
						"HAWB": obj.result.load[i].hawb,
						"CREATED": obj.result.load[i].created,
						"data": obj.result.load[i].id,
					};
				}

				// autocompleteRows['data'] = obj.result.load;

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				btnEdit.attr('disabled', true);
				btnDelete.attr('disabled', true);
				btnPrint.attr('disabled', true);
				btnExcel.attr('disabled', true);
				btnPdf.attr('disabled', true);

				$("#shp-consignee").autocomplete({
					source: autocompleteRows['label'],
					select: function( event, ui ) {
						let data = autocompleteRows['data'][ui.item.data];

						shpAddress.val(data.address);
						shpEori.val(data.aori);
						shpAttention.val(data.attention);
						shpEmail.val(data.email);
						shpContact.val(data.contact_numb);
						shpExt.val(data.contact_ext);
					}
				});

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-new-shp").click(function () {
		const cardIndex = $("#card-index");
		const cardNew = $("#card-new");

		cardIndex.addClass("d-none");
		cardNew.removeClass("d-none");
	});

	$("#btn-edit-shp").click(function () {
		const shpNumber = $("#edit-shp-number");
		const shpConsignee = $("#edit-shp-consignee");
		const shpAddress = $("#edit-shp-address");
		const shpEori = $("#edit-shp-eori");
		const shpAttention = $("#edit-shp-attention");
		const shpEmail = $("#edit-shp-email");
		const shpContact = $("#edit-shp-contact");
		const shpExt = $("#edit-shp-ext");

		const shpForwarder = $("#edit-shp-forwarder");
		const shpDateCollection = $("#edit-shp-date-collection");
		const shpEtd = $("#edit-shp-etd");
		const shpIncoterm = $("#edit-shp-incoterm");
		const shpTotalCarton = $("#edit-shp-total-carton");

		const cloneDimension = $("#edit-clone-dimension");
		// const shpDimensionX1 = $('[id^="edit-shp-dimension-x-1"]');
		// const shpDimensionX2 = $('[id^="edit-shp-dimension-x-2"]');
		// const shpDimensionX3 = $('[id^="edit-shp-dimension-x-3"]');
		// const shpDimensionXCt = $('[id^="edit-shp-dimension-x-ct"]');

		const shpDescription = $("#edit-shp-description");

		const cloneDescription = $("#edit-clone-description");
		// const shpXdescription = $('[id^="edit-shp-x-description"]');
		// const shpXhsCode = $('[id^="edit-shp-x-hs-code"]');
		// const shpXinvoiceNo = $('[id^="edit-shp-x-invoice-no"]');
		// const shpXflightEtd = $('[id^="edit-shp-x-flight-etd"]');

		const shpGrossWeight = $("#edit-shp-gross-weight");
		const shpNettWeight = $("#edit-shp-nett-weight");
		const shpNote = $("#edit-shp-note");
		const shpFlightName = $("#edit-shp-flight-name");
		const shpMawb = $("#edit-shp-mawb");
		const shpHawb = $("#edit-shp-hawb");

		const btnSaveEditShp = $("#btn-save-edit-shp");

		let tables = $('[id^="select-shp-list"]');
		let id = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id = tables.eq(i).attr('data');
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': id,
		};
		
		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v11/get-si");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				shpNumber.val(obj.result.si_number);
				shpConsignee.val(obj.result.consignee);
				shpAddress.val(obj.result.address);
				shpEori.val(obj.result.aori);
				shpAttention.val(obj.result.attention);
				shpEmail.val(obj.result.email);
				shpContact.val(obj.result.contact_numb);
				shpExt.val(obj.result.contact_ext);

				shpForwarder.val(obj.result.forwarder);
				shpDateCollection.val(obj.result.date_collection);
				shpEtd.val(obj.result.etd_flight);

				for (let i = 0; i < shpIncoterm.find('option').length; i++) {
					if (shpIncoterm.find('option').eq(i).val() == obj.result.incoterm) {
						shpIncoterm.find('option').eq(i).attr('selected', true)
					}
				}

				shpIncoterm.select2({
					dropdownParent: $('#select2-edit-shp-incoterm')
				}).val(obj.result.incoterm).trigger('change');

				// shpIncoterm.val(obj.result.incoterm);
				shpTotalCarton.val(obj.result.total_carton);

				cloneDimension.html('');
				for (let i = 0; i < obj.result.dimension.length; i++) {
					let sc = `
					<div class="form-group row" number="${i}" id="edit-dimension-column">
			            <label for="edit-shp-date-total-carton" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Dimension</label>
			            <div class="col-sm-12 col-md-12 col-lg-10">
			              <div class="form-row">
			                <div class="col-lg-3">
			                  <div class="form-group row">
			                    <div class="col-sm-12 col-md-12 col-lg-3">
			                      <div class="form-check mb-3 mb-lg-0">
			                        <input class="form-check-input mt-lg-3" type="checkbox" value="" id="edit-dimension-checked" number="${i}">
			                        <label class="form-check-label d-lg-none" for="edit-dimension-checked">Checked</label>
			                      </div>
			                    </div>

			                    <div class="col-sm-12 col-md-12 col-lg-9">
			                      <input type="text" class="form-control" id="edit-shp-dimension-x-1" placeholder="X" value="${obj.result.dimension[i].x1}" number="${i}">
			                      <div class="invalid-feedback" number="${i}" id="msg-edit-shp-dimension-x-1"></div>
			                    </div>
			                  </div>
			                </div>
			                <div class="col-lg-3">
			                  <div class="form-group row">
			                    <label for="edit-shp-dimension-x-2" class="col-sm-12 col-md-12 col-lg-3 col-form-label">X</label>
			                    <div class="col-sm-12 col-md-12 col-lg-9">
			                      <input type="text" class="form-control" id="edit-shp-dimension-x-2" placeholder="X" value="${obj.result.dimension[i].x2}" number="${i}">
			                      <div class="invalid-feedback" number="${i}" id="msg-edit-shp-dimension-x-2"></div>
			                    </div>
			                  </div>
			                </div>
			                <div class="col-lg-3">
			                  <div class="form-group row">
			                    <label for="edit-shp-dimension-x-3" class="col-sm-12 col-md-12 col-lg-3 col-form-label">X</label>
			                    <div class="col-sm-12 col-md-12 col-lg-9">
			                      <input type="text" class="form-control" id="edit-shp-dimension-x-3" placeholder="X" value="${obj.result.dimension[i].x3}" number="${i}">
			                      <div class="invalid-feedback" number="${i}" id="msg-edit-shp-dimension-x-3"></div>
			                    </div>
			                  </div>
			                </div>
			                <div class="col-lg-3">
			                  <div class="form-group row">
			                    <label for="edit-shp-dimension-x-ct" class="col-sm-12 col-md-12 col-lg-4 col-form-label">CT</label>
			                    <div class="col-sm-12 col-md-12 col-lg-8">
			                      <input type="text" class="form-control" id="edit-shp-dimension-x-ct" placeholder="CT" value="${obj.result.dimension[i].ct}" number="${i}">
			                      <div class="invalid-feedback" number="${i}" id="msg-edit-shp-dimension-x-ct"></div>
			                    </div>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </div>
					`;

					cloneDimension.append(sc);
				}

				shpDescription.val(obj.result.description);

				cloneDescription.html('');
				for (let i = 0; i < obj.result.descriptions.length; i++) {
					let sc = `
					<div class="form-group row" number="${i}" id="edit-description-column">
				        <label for="edit-shp-x-description" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Description</label>
				        <div class="col-sm-12 col-md-12 col-lg-10">
				          <div class="form-row">
				            <div class="form-group col-md-3">
				              <div class="form-check ">
				                <input class="form-check-input mt-lg-3" type="checkbox" value="" id="edit-description-checked" number="${i}">
				                <label class="form-check-label d-lg-none" for="edit-description-checked">Checked</label>
				              </div>
				            </div>
				            <div class="form-group col-md-3">
				              <input type="text" class="form-control" id="edit-shp-x-description" value="${obj.result.descriptions[i].desc_info}" number="${i}" placeholder="Description">
				              <div class="invalid-feedback" number="${i}" id="msg-edit-shp-x-description"></div>
				            </div>
				            <div class="form-group col-md-3">
				              <input type="text" class="form-control" id="edit-shp-x-hs-code" value="${obj.result.descriptions[i].hs_code}" number="${i}" placeholder="HS Code">
				              <div class="invalid-feedback" number="${i}" id="msg-edit-shp-x-hs-code"></div>
				            </div>
				            <div class="form-group col-md-3">
				              <input type="text" class="form-control" id="edit-shp-x-invoice-no" value="${obj.result.descriptions[i].invoice_no}" number="${i}" placeholder="Invoice No.">
				              <div class="invalid-feedback" number="${i}" id="msg-edit-shp-x-invoice-no"></div>
				            </div>
				          </div>
				        </div>
				      </div>
					`;

					cloneDescription.append(sc);
				}

				shpGrossWeight.val(obj.result.gross_weight);
				shpNettWeight.val(obj.result.nett_weight);
				shpFlightName.val(obj.result.flight_name);
				shpMawb.val(obj.result.mawb);
				shpHawb.val(obj.result.hawb);
				shpNote.val(obj.result.note);

				btnSaveEditShp.attr("target", obj.result.id);
				btnSaveEditShp.attr("si", obj.result.si_number);
				btnSaveEditShp.attr("dim", obj.result.dimension_code);
				btnSaveEditShp.attr("des", obj.result.description_code);

				const cardIndex = $("#card-index");
				const cardEdit = $("#card-edit");

				cardIndex.addClass("d-none");
				cardEdit.removeClass("d-none");
				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-delete-shp").click(function () {
		const modal = $("#modal-delete-shp");
		const label = $(".info-delete-shp");
		const btn = $("#btn-save-delete-shp");

		let tables = $('[id^="select-shp-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(1).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	});

	$("#btn-format-excel-shp").click(function () {

		let tables = $('[id^="select-shp-list"]');
		let id = false;
		let sino = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id = tables.eq(i).attr('data');
				sino = tables.eq(i).find('td').eq(1).text()
				break;
			}
		}

		const params = {
			'target': id,
			'shipping-no': sino,
			'type': "excel",
		};

		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(window.location.href+'/export/'+executePost);
	});

	$("#btn-format-pdf-shp").click(function () {

		let tables = $('[id^="select-shp-list"]');
		let id = false;
		let sino = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id = tables.eq(i).attr('data');
				sino = tables.eq(i).find('td').eq(1).text()
				break;
			}
		}

		const params = {
			'target': id,
			'shipping-no': sino,
			'type': "pdf",
		};

		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(window.location.href+'/export/'+executePost);
	});

	$("#btn-format-print-shp").click(function () {

		let tables = $('[id^="select-shp-list"]');
		let id = false;
		let sino = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id = tables.eq(i).attr('data');
				sino = tables.eq(i).find('td').eq(1).text()
				break;
			}
		}

		const params = {
			'target': id,
			'shipping-no': sino,
			'type': "print",
		};

		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(window.location.href+'/export/'+executePost);
	});

	$("#btn-back-new-to-index").click(function () {
		const cardIndex = $("#card-index");
		const cardNew = $("#card-new");

		cardNew.addClass("d-none");
		cardIndex.removeClass("d-none");
	});

	$("#btn-back-edit-to-index").click(function () {
		const cardIndex = $("#card-index");
		const cardEdit = $("#card-edit");

		cardEdit.addClass("d-none");
		cardIndex.removeClass("d-none");
	});

	$("#turn-colomn-dimension").click(function() {
		let clone = $("#clone-dimension");
		let totalClone = $('[id^="dimension-column"]');

		let sc = `
		<div class="form-group row" number="${totalClone.length}" id="dimension-column">
            <label for="shp-date-total-carton" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Dimension</label>
            <div class="col-sm-12 col-md-12 col-lg-10">
              <div class="form-row">
                <div class="col-lg-3">
                  <div class="form-group row">
                    <div class="col-sm-12 col-md-12 col-lg-3">
                      <div class="form-check mb-3 mb-lg-0">
                        <input class="form-check-input mt-lg-3" type="checkbox" value="" id="dimension-checked" number="${totalClone.length}">
                        <label class="form-check-label d-lg-none" for="dimension-checked">Checked</label>
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-12 col-lg-9">
                      <input type="text" class="form-control" id="shp-dimension-x-1" placeholder="X" number="${totalClone.length}">
                      <div class="invalid-feedback" number="${totalClone.length}" id="msg-shp-dimension-x-1"></div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="form-group row">
                    <label for="shp-dimension-x-2" class="col-sm-12 col-md-12 col-lg-3 col-form-label">X</label>
                    <div class="col-sm-12 col-md-12 col-lg-9">
                      <input type="text" class="form-control" id="shp-dimension-x-2" placeholder="X" number="${totalClone.length}">
                      <div class="invalid-feedback" number="${totalClone.length}" id="msg-shp-dimension-x-2"></div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="form-group row">
                    <label for="shp-dimension-x-3" class="col-sm-12 col-md-12 col-lg-3 col-form-label">X</label>
                    <div class="col-sm-12 col-md-12 col-lg-9">
                      <input type="text" class="form-control" id="shp-dimension-x-3" placeholder="X" number="${totalClone.length}">
                      <div class="invalid-feedback" number="${totalClone.length}" id="msg-shp-dimension-x-3"></div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="form-group row">
                    <label for="shp-dimension-x-ct" class="col-sm-12 col-md-12 col-lg-4 col-form-label">CT</label>
                    <div class="col-sm-12 col-md-12 col-lg-8">
                      <input type="text" class="form-control" id="shp-dimension-x-ct" placeholder="CT" number="${totalClone.length}">
                      <div class="invalid-feedback" number="${totalClone.length}" id="msg-shp-dimension-x-ct"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
		`;
		clone.append(sc);
	});

	$("#burn-colomn-dimension").click(function () {
		const dv = $('[id^="dimension-column"]');
		const checkbox = $('[id^="dimension-checked"]');

		let number = false;

		for (let i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				number = checkbox.eq(i).attr('number');
				dv.eq(i).remove();
			} else {
				checkbox.eq(i).attr("number", i);
				dv.eq(i).attr("number", i);
			}
		}

		if (!number) {
			$(".air-badge").html(airBadge("Please check the box", 'danger'));
		}
	});

	$("#turn-colomn-description").click(function() {
		let clone = $("#clone-description");
		let totalClone = $('[id^="description-column"]');

		let sc = `
		<div class="form-group row" number="${totalClone.length}" id="description-column">
	        <label for="shp-x-description" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Description</label>
	        <div class="col-sm-12 col-md-12 col-lg-10">
	          <div class="form-row">
	            <div class="form-group col-md-3">
	              <div class="form-check ">
	                <input class="form-check-input mt-lg-3" type="checkbox" value="" id="description-checked" number="${totalClone.length}">
	                <label class="form-check-label d-lg-none" for="description-checked">Checked</label>
	              </div>
	            </div>
	            <div class="form-group col-md-3">
	              <input type="text" class="form-control" id="shp-x-description" number="${totalClone.length}" placeholder="Description">
	              <div class="invalid-feedback" number="${totalClone.length}" id="msg-shp-x-description"></div>
	            </div>
	            <div class="form-group col-md-3">
	              <input type="text" class="form-control" id="shp-x-hs-code" number="${totalClone.length}" placeholder="HS Code">
	              <div class="invalid-feedback" number="${totalClone.length}" id="msg-shp-x-hs-code"></div>
	            </div>
	            <div class="form-group col-md-3">
	              <input type="text" class="form-control" id="shp-x-invoice-no" number="${totalClone.length}" placeholder="Invoice No.">
	              <div class="invalid-feedback" number="${totalClone.length}" id="msg-shp-x-invoice-no"></div>
	            </div>
	          </div>
	        </div>
	      </div>
		`;
		clone.append(sc);
	});

	$("#burn-colomn-description").click(function () {
		const dv = $('[id^="description-column"]');
		const checkbox = $('[id^="description-checked"]');

		let number = false;

		for (let i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				number = checkbox.eq(i).attr('number');
				dv.eq(i).remove();
			} else {
				checkbox.eq(i).attr("number", i);
				dv.eq(i).attr("number", i);
			}
		}

		if (!number) {
			$(".air-badge").html(airBadge("Please check the box", 'danger'));
		}
	});

	$("#edit-turn-colomn-dimension").click(function() {
		let clone = $("#edit-clone-dimension");
		let totalClone = $('[id^="edit-dimension-column"]');

		let sc = `
		<div class="form-group row" number="${totalClone.length}" id="edit-dimension-column">
            <label for="edit-shp-date-total-carton" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Dimension</label>
            <div class="col-sm-12 col-md-12 col-lg-10">
              <div class="form-row">
                <div class="col-lg-3">
                  <div class="form-group row">
                    <div class="col-sm-12 col-md-12 col-lg-3">
                      <div class="form-check mb-3 mb-lg-0">
                        <input class="form-check-input mt-lg-3" type="checkbox" value="" id="edit-dimension-checked" number="${totalClone.length}">
                        <label class="form-check-label d-lg-none" for="edit-dimension-checked">Checked</label>
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-12 col-lg-9">
                      <input type="text" class="form-control" id="edit-shp-dimension-x-1" placeholder="X" number="${totalClone.length}">
                      <div class="invalid-feedback" number="${totalClone.length}" id="msg-edit-shp-dimension-x-1"></div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="form-group row">
                    <label for="edit-shp-dimension-x-2" class="col-sm-12 col-md-12 col-lg-3 col-form-label">X</label>
                    <div class="col-sm-12 col-md-12 col-lg-9">
                      <input type="text" class="form-control" id="edit-shp-dimension-x-2" placeholder="X" number="${totalClone.length}">
                      <div class="invalid-feedback" number="${totalClone.length}" id="msg-edit-shp-dimension-x-2"></div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="form-group row">
                    <label for="edit-shp-dimension-x-3" class="col-sm-12 col-md-12 col-lg-3 col-form-label">X</label>
                    <div class="col-sm-12 col-md-12 col-lg-9">
                      <input type="text" class="form-control" id="edit-shp-dimension-x-3" placeholder="X" number="${totalClone.length}">
                      <div class="invalid-feedback" number="${totalClone.length}" id="msg-edit-shp-dimension-x-3"></div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="form-group row">
                    <label for="edit-shp-dimension-x-ct" class="col-sm-12 col-md-12 col-lg-4 col-form-label">CT</label>
                    <div class="col-sm-12 col-md-12 col-lg-8">
                      <input type="text" class="form-control" id="edit-shp-dimension-x-ct" placeholder="CT" number="${totalClone.length}">
                      <div class="invalid-feedback" number="${totalClone.length}" id="msg-edit-shp-dimension-x-ct"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
		`;
		clone.append(sc);
	});

	$("#edit-burn-colomn-dimension").click(function () {
		const dv = $('[id^="edit-dimension-column"]');
		const checkbox = $('[id^="edit-dimension-checked"]');

		let number = false;

		for (let i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				number = checkbox.eq(i).attr('number');
				dv.eq(i).remove();
			} else {
				checkbox.eq(i).attr("number", i);
				dv.eq(i).attr("number", i);
			}
		}

		if (!number) {
			$(".air-badge").html(airBadge("Please check the box", 'danger'));
		}
	});

	$("#edit-turn-colomn-description").click(function() {
		let clone = $("#edit-clone-description");
		let totalClone = $('[id^="edit-description-column"]');

		let sc = `
		<div class="form-group row" number="${totalClone.length}" id="edit-description-column">
	        <label for="edit-shp-x-description" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Description</label>
	        <div class="col-sm-12 col-md-12 col-lg-10">
	          <div class="form-row">
	            <div class="form-group col-md-3">
	              <div class="form-check ">
	                <input class="form-check-input mt-lg-3" type="checkbox" value="" id="edit-description-checked" number="${totalClone.length}">
	                <label class="form-check-label d-lg-none" for="edit-description-checked">Checked</label>
	              </div>
	            </div>
	            <div class="form-group col-md-3">
	              <input type="text" class="form-control" id="edit-shp-x-description" number="${totalClone.length}" placeholder="Description">
	              <div class="invalid-feedback" number="${totalClone.length}" id="msg-edit-shp-x-description"></div>
	            </div>
	            <div class="form-group col-md-3">
	              <input type="text" class="form-control" id="edit-shp-x-hs-code" number="${totalClone.length}" placeholder="HS Code">
	              <div class="invalid-feedback" number="${totalClone.length}" id="msg-edit-shp-x-hs-code"></div>
	            </div>
	            <div class="form-group col-md-3">
	              <input type="text" class="form-control" id="edit-shp-x-invoice-no" number="${totalClone.length}" placeholder="Invoice No.">
	              <div class="invalid-feedback" number="${totalClone.length}" id="msg-edit-shp-x-invoice-no"></div>
	            </div>
	          </div>
	        </div>
	      </div>
		`;
		clone.append(sc);
	});

	$("#edit-burn-colomn-description").click(function () {
		const dv = $('[id^="edit-description-column"]');
		const checkbox = $('[id^="edit-description-checked"]');

		let number = false;

		for (let i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				number = checkbox.eq(i).attr('number');
				dv.eq(i).remove();
			} else {
				checkbox.eq(i).attr("number", i);
				dv.eq(i).attr("number", i);
			}
		}

		if (!number) {
			$(".air-badge").html(airBadge("Please check the box", 'danger'));
		}
	});

	$("#btn-save-new-shp").click(function () {
		const shpNumber = $("#shp-number");
		const shpConsignee = $("#shp-consignee");
		const shpAddress = $("#shp-address");
		const shpEori = $("#shp-eori");
		const shpAttention = $("#shp-attention");
		const shpEmail = $("#shp-email");
		const shpContact = $("#shp-contact");
		const shpExt = $("#shp-ext");

		const shpForwarder = $("#shp-forwarder");
		const shpDateCollection = $("#shp-date-collection");
		const shpEtd = $("#shp-etd");
		const shpIncoterm = $("#shp-incoterm");
		const shpTotalCarton = $("#shp-total-carton");

		const shpDimensionX1 = $('[id^="shp-dimension-x-1"]');
		const shpDimensionX2 = $('[id^="shp-dimension-x-2"]');
		const shpDimensionX3 = $('[id^="shp-dimension-x-3"]');
		const shpDimensionXCt = $('[id^="shp-dimension-x-ct"]');

		const shpDescription = $("#shp-description");

		const shpXdescription = $('[id^="shp-x-description"]');
		const shpXhsCode = $('[id^="shp-x-hs-code"]');
		const shpXinvoiceNo = $('[id^="shp-x-invoice-no"]');
		const shpXflightEtd = $('[id^="shp-x-flight-etd"]');

		const shpGrossWeight = $("#shp-gross-weight");
		const shpNettWeight = $("#shp-nett-weight");
		const shpNote = $("#shp-note");
		const shpFlightName = $("#shp-flight-name");
		const shpMawb = $("#shp-mawb");
		const shpHawb = $("#shp-hawb");
		let allow = true;

		if (!inputValidation("#"+shpNumber.attr("id"), "#msg-"+shpNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+shpConsignee.attr("id"), "#msg-"+shpConsignee.attr("id"))) allow = false;
		if (!inputValidation("#"+shpAddress.attr("id"), "#msg-"+shpAddress.attr("id"))) allow = false;
		if (!inputValidation("#"+shpEori.attr("id"), "#msg-"+shpEori.attr("id"))) allow = false;
		if (!inputValidation("#"+shpAttention.attr("id"), "#msg-"+shpAttention.attr("id"))) allow = false;
		if (!inputValidation("#"+shpEmail.attr("id"), "#msg-"+shpEmail.attr("id"))) allow = false;
		if (!inputValidation("#"+shpContact.attr("id"), "#msg-"+shpContact.attr("id"))) allow = false;
		if (!inputValidation("#"+shpExt.attr("id"), "#msg-"+shpExt.attr("id"))) allow = false;

		if (!inputValidation("#"+shpForwarder.attr("id"), "#msg-"+shpForwarder.attr("id"))) allow = false;
		if (!inputValidation("#"+shpDateCollection.attr("id"), "#msg-"+shpDateCollection.attr("id"))) allow = false;
		if (!inputValidation("#"+shpEtd.attr("id"), "#msg-"+shpEtd.attr("id"))) allow = false;
		if (!select2Validation("#"+shpIncoterm.attr("id"), "#msg-"+shpIncoterm.attr("id"))) allow = false;
		if (!inputValidation("#"+shpTotalCarton.attr("id"), "#msg-"+shpTotalCarton.attr("id"))) allow = false;

		for (let i = 0; i < shpDimensionX1.length; i++) {
			if (!inputValidation("input[id$='"+shpDimensionX1.eq(i).attr('id')+"'][number='"+shpDimensionX1.eq(i).attr('number')+"']", "div[id$='msg-"+shpDimensionX1.eq(i).attr('id')+"'][number='"+shpDimensionX1.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+shpDimensionX2.eq(i).attr('id')+"'][number='"+shpDimensionX2.eq(i).attr('number')+"']", "div[id$='msg-"+shpDimensionX2.eq(i).attr('id')+"'][number='"+shpDimensionX2.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+shpDimensionX3.eq(i).attr('id')+"'][number='"+shpDimensionX3.eq(i).attr('number')+"']", "div[id$='msg-"+shpDimensionX3.eq(i).attr('id')+"'][number='"+shpDimensionX3.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+shpDimensionXCt.eq(i).attr('id')+"'][number='"+shpDimensionXCt.eq(i).attr('number')+"']", "div[id$='msg-"+shpDimensionXCt.eq(i).attr('id')+"'][number='"+shpDimensionXCt.eq(i).attr('number')+"']")) allow = false;
		}

		if (!inputValidation("#"+shpDescription.attr("id"), "#msg-"+shpDescription.attr("id"))) allow = false;

		// for (let i = 0; i < shpXdescription.length; i++) {
		// 	if (!inputValidation("input[id$='"+shpXdescription.eq(i).attr('id')+"'][number='"+shpXdescription.eq(i).attr('number')+"']", "div[id$='msg-"+shpXdescription.eq(i).attr('id')+"'][number='"+shpXdescription.eq(i).attr('number')+"']")) allow = false;
		// 	if (!inputValidation("input[id$='"+shpXhsCode.eq(i).attr('id')+"'][number='"+shpXhsCode.eq(i).attr('number')+"']", "div[id$='msg-"+shpXhsCode.eq(i).attr('id')+"'][number='"+shpXhsCode.eq(i).attr('number')+"']")) allow = false;
		// 	if (!inputValidation("input[id$='"+shpXinvoiceNo.eq(i).attr('id')+"'][number='"+shpXinvoiceNo.eq(i).attr('number')+"']", "div[id$='msg-"+shpXinvoiceNo.eq(i).attr('id')+"'][number='"+shpXinvoiceNo.eq(i).attr('number')+"']")) allow = false;
		// }

		if (!inputValidation("#"+shpGrossWeight.attr("id"), "#msg-"+shpGrossWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+shpNettWeight.attr("id"), "#msg-"+shpNettWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+shpFlightName.attr("id"), "#msg-"+shpFlightName.attr("id"))) allow = false;
		if (!inputValidation("#"+shpMawb.attr("id"), "#msg-"+shpMawb.attr("id"))) allow = false;
		if (!inputValidation("#"+shpHawb.attr("id"), "#msg-"+shpHawb.attr("id"))) allow = false;
		if (!inputValidation("#"+shpNote.attr("id"), "#msg-"+shpNote.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		const params = {
			"shp-number" : shpNumber.val(), 
			"shp-consignee" : shpConsignee.val(), 
			"shp-address" : shpAddress.val(), 
			"shp-eori" : shpEori.val(), 
			"shp-attention" : shpAttention.val(), 
			"shp-email" : shpEmail.val(), 
			"shp-contact" : shpContact.val(), 
			"shp-ext" : shpExt.val(), 
			"shp-forwarder" : shpForwarder.val(), 
			"shp-date-collection" : shpDateCollection.val(), 
			"shp-etd" : shpEtd.val(), 
			"shp-incoterm" : shpIncoterm.val(), 
			"shp-total-carton" : shpTotalCarton.val(), 
			"shp-dimension" : [],
			"shp-description" : shpDescription.val(),
			"shp-x-description" : [],
			"shp-gross-weight" : shpGrossWeight.val(),
			"shp-nett-weight" : shpNettWeight.val(),
			"shp-note" : shpNote.val(),
			"shp-flight-name" : shpFlightName.val(),
			"shp-mawb" : shpMawb.val(),
			"shp-hawb" : shpHawb.val(),
		};

		for (let i = 0; i < shpDimensionX1.length; i++) {
			params['shp-dimension'].push({
				shpDimensionX1: shpDimensionX1.eq(i).val(),
				shpDimensionX2: shpDimensionX2.eq(i).val(),
				shpDimensionX3: shpDimensionX3.eq(i).val(),
				shpDimensionXCt: shpDimensionXCt.eq(i).val(),
			});
		}

		for (let i = 0; i < shpXdescription.length; i++) {
			params['shp-x-description'].push({
				shpXdescription: shpXdescription.eq(i).val(),
				shpXhsCode: shpXhsCode.eq(i).val(),
				shpXinvoiceNo: shpXinvoiceNo.eq(i).val(),
			});
		}

		const url = baseUrl("/auth/api/v11/new-si");

		const execute = postField(url, 'POST', params, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-save-edit-shp").click(function () {
		const shpNumber = $("#edit-shp-number");
		const shpConsignee = $("#edit-shp-consignee");
		const shpAddress = $("#edit-shp-address");
		const shpEori = $("#edit-shp-eori");
		const shpAttention = $("#edit-shp-attention");
		const shpEmail = $("#edit-shp-email");
		const shpContact = $("#edit-shp-contact");
		const shpExt = $("#edit-shp-ext");

		const shpForwarder = $("#edit-shp-forwarder");
		const shpDateCollection = $("#edit-shp-date-collection");
		const shpEtd = $("#edit-shp-etd");
		const shpIncoterm = $("#edit-shp-incoterm");
		const shpTotalCarton = $("#edit-shp-total-carton");

		const shpDimensionX1 = $('[id^="edit-shp-dimension-x-1"]');
		const shpDimensionX2 = $('[id^="edit-shp-dimension-x-2"]');
		const shpDimensionX3 = $('[id^="edit-shp-dimension-x-3"]');
		const shpDimensionXCt = $('[id^="edit-shp-dimension-x-ct"]');

		const shpDescription = $("#edit-shp-description");

		const shpXdescription = $('[id^="edit-shp-x-description"]');
		const shpXhsCode = $('[id^="edit-shp-x-hs-code"]');
		const shpXinvoiceNo = $('[id^="edit-shp-x-invoice-no"]');
		const shpXflightEtd = $('[id^="edit-shp-x-flight-etd"]');

		const shpGrossWeight = $("#edit-shp-gross-weight");
		const shpNettWeight = $("#edit-shp-nett-weight");
		const shpNote = $("#edit-shp-note");
		const shpFlightName = $("#edit-shp-flight-name");
		const shpMawb = $("#edit-shp-mawb");
		const shpHawb = $("#edit-shp-hawb");

		const btnSaveEditShp = $("#btn-save-edit-shp");
		let allow = true;

		if (!inputValidation("#"+shpNumber.attr("id"), "#msg-"+shpNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+shpConsignee.attr("id"), "#msg-"+shpConsignee.attr("id"))) allow = false;
		if (!inputValidation("#"+shpAddress.attr("id"), "#msg-"+shpAddress.attr("id"))) allow = false;
		if (!inputValidation("#"+shpEori.attr("id"), "#msg-"+shpEori.attr("id"))) allow = false;
		if (!inputValidation("#"+shpAttention.attr("id"), "#msg-"+shpAttention.attr("id"))) allow = false;
		if (!inputValidation("#"+shpEmail.attr("id"), "#msg-"+shpEmail.attr("id"))) allow = false;
		if (!inputValidation("#"+shpContact.attr("id"), "#msg-"+shpContact.attr("id"))) allow = false;
		if (!inputValidation("#"+shpExt.attr("id"), "#msg-"+shpExt.attr("id"))) allow = false;

		if (!inputValidation("#"+shpForwarder.attr("id"), "#msg-"+shpForwarder.attr("id"))) allow = false;
		if (!inputValidation("#"+shpDateCollection.attr("id"), "#msg-"+shpDateCollection.attr("id"))) allow = false;
		if (!inputValidation("#"+shpEtd.attr("id"), "#msg-"+shpEtd.attr("id"))) allow = false;
		if (!select2Validation("#"+shpIncoterm.attr("id"), "#msg-"+shpIncoterm.attr("id"))) allow = false;
		if (!inputValidation("#"+shpTotalCarton.attr("id"), "#msg-"+shpTotalCarton.attr("id"))) allow = false;

		for (let i = 0; i < shpDimensionX1.length; i++) {
			if (!inputValidation("input[id$='"+shpDimensionX1.eq(i).attr('id')+"'][number='"+shpDimensionX1.eq(i).attr('number')+"']", "div[id$='msg-"+shpDimensionX1.eq(i).attr('id')+"'][number='"+shpDimensionX1.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+shpDimensionX2.eq(i).attr('id')+"'][number='"+shpDimensionX2.eq(i).attr('number')+"']", "div[id$='msg-"+shpDimensionX2.eq(i).attr('id')+"'][number='"+shpDimensionX2.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+shpDimensionX3.eq(i).attr('id')+"'][number='"+shpDimensionX3.eq(i).attr('number')+"']", "div[id$='msg-"+shpDimensionX3.eq(i).attr('id')+"'][number='"+shpDimensionX3.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+shpDimensionXCt.eq(i).attr('id')+"'][number='"+shpDimensionXCt.eq(i).attr('number')+"']", "div[id$='msg-"+shpDimensionXCt.eq(i).attr('id')+"'][number='"+shpDimensionXCt.eq(i).attr('number')+"']")) allow = false;
		}

		if (!inputValidation("#"+shpDescription.attr("id"), "#msg-"+shpDescription.attr("id"))) allow = false;

		// for (let i = 0; i < shpXdescription.length; i++) {
		// 	if (!inputValidation("input[id$='"+shpXdescription.eq(i).attr('id')+"'][number='"+shpXdescription.eq(i).attr('number')+"']", "div[id$='msg-"+shpXdescription.eq(i).attr('id')+"'][number='"+shpXdescription.eq(i).attr('number')+"']")) allow = false;
		// 	if (!inputValidation("input[id$='"+shpXhsCode.eq(i).attr('id')+"'][number='"+shpXhsCode.eq(i).attr('number')+"']", "div[id$='msg-"+shpXhsCode.eq(i).attr('id')+"'][number='"+shpXhsCode.eq(i).attr('number')+"']")) allow = false;
		// 	if (!inputValidation("input[id$='"+shpXinvoiceNo.eq(i).attr('id')+"'][number='"+shpXinvoiceNo.eq(i).attr('number')+"']", "div[id$='msg-"+shpXinvoiceNo.eq(i).attr('id')+"'][number='"+shpXinvoiceNo.eq(i).attr('number')+"']")) allow = false;
		// }

		if (!inputValidation("#"+shpGrossWeight.attr("id"), "#msg-"+shpGrossWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+shpNettWeight.attr("id"), "#msg-"+shpNettWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+shpFlightName.attr("id"), "#msg-"+shpFlightName.attr("id"))) allow = false;
		if (!inputValidation("#"+shpMawb.attr("id"), "#msg-"+shpMawb.attr("id"))) allow = false;
		if (!inputValidation("#"+shpHawb.attr("id"), "#msg-"+shpHawb.attr("id"))) allow = false;
		if (!inputValidation("#"+shpNote.attr("id"), "#msg-"+shpNote.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		const params = {
			"shp-number" : shpNumber.val(), 
			"shp-consignee" : shpConsignee.val(), 
			"shp-address" : shpAddress.val(), 
			"shp-eori" : shpEori.val(), 
			"shp-attention" : shpAttention.val(), 
			"shp-email" : shpEmail.val(), 
			"shp-contact" : shpContact.val(), 
			"shp-ext" : shpExt.val(), 
			"shp-forwarder" : shpForwarder.val(), 
			"shp-date-collection" : shpDateCollection.val(), 
			"shp-etd" : shpEtd.val(), 
			"shp-incoterm" : shpIncoterm.val(), 
			"shp-total-carton" : shpTotalCarton.val(), 
			"shp-dimension" : [],
			"shp-description" : shpDescription.val(),
			"shp-x-description" : [],
			"shp-gross-weight" : shpGrossWeight.val(),
			"shp-nett-weight" : shpNettWeight.val(),
			"shp-note" : shpNote.val(),
			"shp-flight-name" : shpFlightName.val(),
			"shp-mawb" : shpMawb.val(),
			"shp-hawb" : shpHawb.val(),
			"shp-target" : btnSaveEditShp.attr('target'), 
			"shp-target-info" : btnSaveEditShp.attr('si'), 
			"shp-target-dim" : btnSaveEditShp.attr('dim'), 
			"shp-target-des" : btnSaveEditShp.attr('des'), 
		};

		for (let i = 0; i < shpDimensionX1.length; i++) {
			params['shp-dimension'].push({
				shpDimensionX1: shpDimensionX1.eq(i).val(),
				shpDimensionX2: shpDimensionX2.eq(i).val(),
				shpDimensionX3: shpDimensionX3.eq(i).val(),
				shpDimensionXCt: shpDimensionXCt.eq(i).val(),
			});
		}

		for (let i = 0; i < shpXdescription.length; i++) {
			params['shp-x-description'].push({
				shpXdescription: shpXdescription.eq(i).val(),
				shpXhsCode: shpXhsCode.eq(i).val(),
				shpXinvoiceNo: shpXinvoiceNo.eq(i).val(),
			});
		}

		const url = baseUrl("/auth/api/v11/edit-si");

		const execute = postField(url, 'POST', params, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-save-clone-shp").click(function () {
		const shpNumber = $("#edit-shp-number");
		const shpConsignee = $("#edit-shp-consignee");
		const shpAddress = $("#edit-shp-address");
		const shpEori = $("#edit-shp-eori");
		const shpAttention = $("#edit-shp-attention");
		const shpEmail = $("#edit-shp-email");
		const shpContact = $("#edit-shp-contact");
		const shpExt = $("#edit-shp-ext");

		const shpForwarder = $("#edit-shp-forwarder");
		const shpDateCollection = $("#edit-shp-date-collection");
		const shpEtd = $("#edit-shp-etd");
		const shpIncoterm = $("#edit-shp-incoterm");
		const shpTotalCarton = $("#edit-shp-total-carton");

		const shpDimensionX1 = $('[id^="edit-shp-dimension-x-1"]');
		const shpDimensionX2 = $('[id^="edit-shp-dimension-x-2"]');
		const shpDimensionX3 = $('[id^="edit-shp-dimension-x-3"]');
		const shpDimensionXCt = $('[id^="edit-shp-dimension-x-ct"]');

		const shpDescription = $("#edit-shp-description");

		const shpXdescription = $('[id^="edit-shp-x-description"]');
		const shpXhsCode = $('[id^="edit-shp-x-hs-code"]');
		const shpXinvoiceNo = $('[id^="edit-shp-x-invoice-no"]');
		const shpXflightEtd = $('[id^="edit-shp-x-flight-etd"]');

		const shpGrossWeight = $("#edit-shp-gross-weight");
		const shpNettWeight = $("#edit-shp-nett-weight");
		const shpNote = $("#edit-shp-note");
		const shpFlightName = $("#edit-shp-flight-name");
		const shpMawb = $("#edit-shp-mawb");
		const shpHawb = $("#edit-shp-hawb");

		let allow = true;

		if (!inputValidation("#"+shpNumber.attr("id"), "#msg-"+shpNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+shpConsignee.attr("id"), "#msg-"+shpConsignee.attr("id"))) allow = false;
		if (!inputValidation("#"+shpAddress.attr("id"), "#msg-"+shpAddress.attr("id"))) allow = false;
		if (!inputValidation("#"+shpEori.attr("id"), "#msg-"+shpEori.attr("id"))) allow = false;
		if (!inputValidation("#"+shpAttention.attr("id"), "#msg-"+shpAttention.attr("id"))) allow = false;
		if (!inputValidation("#"+shpEmail.attr("id"), "#msg-"+shpEmail.attr("id"))) allow = false;
		if (!inputValidation("#"+shpContact.attr("id"), "#msg-"+shpContact.attr("id"))) allow = false;
		if (!inputValidation("#"+shpExt.attr("id"), "#msg-"+shpExt.attr("id"))) allow = false;

		if (!inputValidation("#"+shpForwarder.attr("id"), "#msg-"+shpForwarder.attr("id"))) allow = false;
		if (!inputValidation("#"+shpDateCollection.attr("id"), "#msg-"+shpDateCollection.attr("id"))) allow = false;
		if (!inputValidation("#"+shpEtd.attr("id"), "#msg-"+shpEtd.attr("id"))) allow = false;
		if (!select2Validation("#"+shpIncoterm.attr("id"), "#msg-"+shpIncoterm.attr("id"))) allow = false;
		if (!inputValidation("#"+shpTotalCarton.attr("id"), "#msg-"+shpTotalCarton.attr("id"))) allow = false;

		for (let i = 0; i < shpDimensionX1.length; i++) {
			if (!inputValidation("input[id$='"+shpDimensionX1.eq(i).attr('id')+"'][number='"+shpDimensionX1.eq(i).attr('number')+"']", "div[id$='msg-"+shpDimensionX1.eq(i).attr('id')+"'][number='"+shpDimensionX1.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+shpDimensionX2.eq(i).attr('id')+"'][number='"+shpDimensionX2.eq(i).attr('number')+"']", "div[id$='msg-"+shpDimensionX2.eq(i).attr('id')+"'][number='"+shpDimensionX2.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+shpDimensionX3.eq(i).attr('id')+"'][number='"+shpDimensionX3.eq(i).attr('number')+"']", "div[id$='msg-"+shpDimensionX3.eq(i).attr('id')+"'][number='"+shpDimensionX3.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+shpDimensionXCt.eq(i).attr('id')+"'][number='"+shpDimensionXCt.eq(i).attr('number')+"']", "div[id$='msg-"+shpDimensionXCt.eq(i).attr('id')+"'][number='"+shpDimensionXCt.eq(i).attr('number')+"']")) allow = false;
		}

		if (!inputValidation("#"+shpDescription.attr("id"), "#msg-"+shpDescription.attr("id"))) allow = false;

		// for (let i = 0; i < shpXdescription.length; i++) {
		// 	if (!inputValidation("input[id$='"+shpXdescription.eq(i).attr('id')+"'][number='"+shpXdescription.eq(i).attr('number')+"']", "div[id$='msg-"+shpXdescription.eq(i).attr('id')+"'][number='"+shpXdescription.eq(i).attr('number')+"']")) allow = false;
		// 	if (!inputValidation("input[id$='"+shpXhsCode.eq(i).attr('id')+"'][number='"+shpXhsCode.eq(i).attr('number')+"']", "div[id$='msg-"+shpXhsCode.eq(i).attr('id')+"'][number='"+shpXhsCode.eq(i).attr('number')+"']")) allow = false;
		// 	if (!inputValidation("input[id$='"+shpXinvoiceNo.eq(i).attr('id')+"'][number='"+shpXinvoiceNo.eq(i).attr('number')+"']", "div[id$='msg-"+shpXinvoiceNo.eq(i).attr('id')+"'][number='"+shpXinvoiceNo.eq(i).attr('number')+"']")) allow = false;
		// }

		if (!inputValidation("#"+shpGrossWeight.attr("id"), "#msg-"+shpGrossWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+shpNettWeight.attr("id"), "#msg-"+shpNettWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+shpFlightName.attr("id"), "#msg-"+shpFlightName.attr("id"))) allow = false;
		if (!inputValidation("#"+shpMawb.attr("id"), "#msg-"+shpMawb.attr("id"))) allow = false;
		if (!inputValidation("#"+shpHawb.attr("id"), "#msg-"+shpHawb.attr("id"))) allow = false;
		if (!inputValidation("#"+shpNote.attr("id"), "#msg-"+shpNote.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		const params = {
			"shp-number" : shpNumber.val(), 
			"shp-consignee" : shpConsignee.val(), 
			"shp-address" : shpAddress.val(), 
			"shp-eori" : shpEori.val(), 
			"shp-attention" : shpAttention.val(), 
			"shp-email" : shpEmail.val(), 
			"shp-contact" : shpContact.val(), 
			"shp-ext" : shpExt.val(), 
			"shp-forwarder" : shpForwarder.val(), 
			"shp-date-collection" : shpDateCollection.val(), 
			"shp-etd" : shpEtd.val(), 
			"shp-incoterm" : shpIncoterm.val(), 
			"shp-total-carton" : shpTotalCarton.val(), 
			"shp-dimension" : [],
			"shp-description" : shpDescription.val(),
			"shp-x-description" : [],
			"shp-gross-weight" : shpGrossWeight.val(),
			"shp-nett-weight" : shpNettWeight.val(),
			"shp-note" : shpNote.val(),
			"shp-flight-name" : shpFlightName.val(),
			"shp-mawb" : shpMawb.val(),
			"shp-hawb" : shpHawb.val(),
		};

		for (let i = 0; i < shpDimensionX1.length; i++) {
			params['shp-dimension'].push({
				shpDimensionX1: shpDimensionX1.eq(i).val(),
				shpDimensionX2: shpDimensionX2.eq(i).val(),
				shpDimensionX3: shpDimensionX3.eq(i).val(),
				shpDimensionXCt: shpDimensionXCt.eq(i).val(),
			});
		}

		for (let i = 0; i < shpXdescription.length; i++) {
			params['shp-x-description'].push({
				shpXdescription: shpXdescription.eq(i).val(),
				shpXhsCode: shpXhsCode.eq(i).val(),
				shpXinvoiceNo: shpXinvoiceNo.eq(i).val(),
			});
		}

		const url = baseUrl("/auth/api/v11/clone-si");

		const execute = postField(url, 'POST', params, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	})

	$("#btn-save-delete-shp").click(function () {
		const btn = $("#btn-save-delete-shp");
		const txt = btn.attr("data");

		$("#modal-delete-shp").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v11/delete-si");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});
}

const invoiceForwarder = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;

	let tableOptIndex = datatableOpt();

	let tableBtnIndex = [
		{	
			text : '<span class="mr-2">Add</span><i class="fas fa-fw fa-plus"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-new-invoice');
				$(node).attr('disabled', false);
			}
		},
		{	
			text : '<span class="mr-2">Edit</span><i class="fas fa-fw fa-edit"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-edit-invoice');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Delete</span><i class="fas fa-fw fa-minus"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-delete-invoice');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format Excel</span><i class="fas fa-fw fa-file-excel"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-format-excel-invoice');
				$(node).attr('disabled', false);
			}
		}
	];

	tableOptIndex['buttons'] = arrayPrepend(tableBtnIndex, selectionExportBtn());

	tableOptIndex['columns'] = [
		{data: "NO"},
		{data: "NOMOR AJU"},
		{data: "KODE DOKUMEN"},
		{data: "NOMOR DAFTAR"},
		{data: "TANGGAL DAFTAR"},
		{data: "AWB KODE 740"},
		{data: "AWB KODE 741"},
		{data: "AWB KODE 704"},
		{data: "AWB KODE 705"},
		{data: "PEMASOK/PENERIMA"},
		{data: "URAIAN BARANG"},
		{data: "KODE NEGARA PEMASOK / PENERIMA"},
		{data: "BRUTO (KG)"},
		{data: "NAMA FORWARDER / COURIER"},
		{data: "SERI INVOICE"},
		{data: "NOMOR INVOICE"},
		{data: "AMOUNT"}
	];

	tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-invoice-list');
		$(row).attr('data', data.data);
		$(row).attr('flag', data.flag);
		$(row).attr('fwd', data.fwd);
		$(row).attr('stg', false);
	};


	tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		},{
			"targets": [13, 14, 15, 16],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		},
	];
	
	// ORDER TABLE COLUMN BY IS DISABLE
	tableOptIndex['rowsGroup'] = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
	];

	let dataTableIndex = $('#datatable-invoice-list').DataTable(tableOptIndex);

	const selectInvoiceList = (arr) => {
		const btnEdit = $("#btn-edit-invoice");
		const btnDelete = $("#btn-delete-invoice");

		let tables = $('[id^="select-invoice-list"]');
		let isOn = 0;
		let shiftTable = 0;
		let fwd = [];

		let x = 0;
		for (let i = 0; i < tables.length; i++) {
			if (selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				fwd[x] = tables.eq(i).attr("fwd");
				isOn++;
				x++;
				lastPressed = (i+1);
			} else {
				if (ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							lastPressed = (i+1);
							fwd[x] = tables.eq(i).attr("fwd");
							x++;
						}
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							if (!fwd.includes(tables.eq(i).attr("fwd"))) {
								fwd[x] = tables.eq(i).attr("fwd");
								x++;
								isOn++;
							}
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (shiftPressed && !ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						shiftTable = (i+1);
					}
				}

				if (!shiftPressed) shiftTable = 0;
			}
		}

		// naik
		if (lastPressed && shiftTable && lastPressed > shiftTable) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					fwd[x] = tables.eq(i).attr("fwd");
					x++;
					isOn++;
				}
			}
		}

		// turun
		if (shiftTable > lastPressed) {
			if (lastPressed >= 1) lastPressed --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= lastPressed && i < shiftTable) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					fwd[x] = tables.eq(i).attr("fwd");
					x++;
					isOn++;
				}
			}
		}

		 // console.log("fwd.length : "+ fwd.length +" || fwd.filter(onlyUnique).length : "+ fwd.filter(onlyUnique).length +" || isOn : "+ isOn);
		 // console.log(fwd.includes('FWD-00000003'));
		if (isOn == 0 || fwd.filter(onlyUnique).length == 0) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", true);
			lastPressed = 0;
		}

		if (isOn == 1 && fwd.filter(onlyUnique).length == 1) {
			btnEdit.attr("disabled", false);
			btnDelete.attr("disabled", false);
		}

		if (isOn >= 2 || fwd.filter(onlyUnique).length >= 2) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", false);
		}
	}

	$(document).keydown(function(event){
		if(event.which == "17") ctrlPressed = true;
		if(event.which == "16") shiftPressed = true;
		if(ctrlPressed && event.which == "65") selectAll = true;

		if (event.keyCode == 65 && event.ctrlKey && selectAll) {
			textSelection('datatable-invoice-list');
			event.preventDefault();
			selectInvoiceList();
		}
	});

	$(document).keyup(function(){
		ctrlPressed = false;
		shiftPressed = false;
		selectAll = false;
	});

	$(document).on('click', '[id^="select-invoice-list"]', function () {
		const myData = $(this);

		selectInvoiceList(myData);
	});

	$(document).ready(function () {
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");
		const statusInvoice = $("#invoice-status");

		$(".air-badge").html(loadingBackdrop());

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
			'status': statusInvoice.val(),
		};


		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v13/load-invoice");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				let y = 0;
				for (let i = 0; i < obj.result.length; i++) {
					for (let x = 0; x < obj.result[i]['sub-forward'].length; x++) {
						sc[y] = {
							"NO": (i+1),
							"NOMOR AJU": obj.result[i].nomor_aju,
							"KODE DOKUMEN": obj.result[i].kode_dokumen,
							"NOMOR DAFTAR": obj.result[i].nomor_daftar,
							"TANGGAL DAFTAR": obj.result[i].tanggal_daftar,
							"AWB KODE 740": obj.result[i].awb_kode_740,
							"AWB KODE 741": obj.result[i].awb_kode_741,
							"AWB KODE 704": obj.result[i].awb_kode_704,
							"AWB KODE 705": obj.result[i].awb_kode_705,
							"PEMASOK/PENERIMA": obj.result[i].pemasok_penerima,
							"URAIAN BARANG": obj.result[i].uraian_barang,
							"KODE NEGARA PEMASOK / PENERIMA": obj.result[i].kode_negara_pemasok,
							"BRUTO (KG)": obj.result[i].bruto_kg,
							"NAMA FORWARDER / COURIER": obj.result[i]['sub-forward'][x]['forwarder_name'],
							"SERI INVOICE": obj.result[i]['sub-forward'][x]['seri_invoice'],
							"NOMOR INVOICE": obj.result[i]['sub-forward'][x]['nomor_invoice'],
							"AMOUNT": obj.result[i]['sub-forward'][x]['amount'],
							"data": obj.result[i].id,
							"flag": obj.result[i].flag,
							"fwd": obj.result[i].fwd_code,
							"clr": (parseInt(obj.result[i].flag) == 1 ? "table-warning" : "table-white"),
						};

						y++;
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-search-invoice").click(function () {
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");
		const statusInvoice = $("#invoice-status");

		$(".air-badge").html(loadingBackdrop());

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
			'status': statusInvoice.val(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v13/load-invoice");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				let y = 0;
				for (let i = 0; i < obj.result.length; i++) {
					for (let x = 0; x < obj.result[i]['sub-forward'].length; x++) {
						sc[y] = {
							"NO": (i+1),
							"NOMOR AJU": obj.result[i].nomor_aju,
							"KODE DOKUMEN": obj.result[i].kode_dokumen,
							"NOMOR DAFTAR": obj.result[i].nomor_daftar,
							"TANGGAL DAFTAR": obj.result[i].tanggal_daftar,
							"AWB KODE 740": obj.result[i].awb_kode_740,
							"AWB KODE 741": obj.result[i].awb_kode_741,
							"AWB KODE 704": obj.result[i].awb_kode_704,
							"AWB KODE 705": obj.result[i].awb_kode_705,
							"PEMASOK/PENERIMA": obj.result[i].pemasok_penerima,
							"URAIAN BARANG": obj.result[i].uraian_barang,
							"KODE NEGARA PEMASOK / PENERIMA": obj.result[i].kode_negara_pemasok,
							"BRUTO (KG)": obj.result[i].bruto_kg,
							"NAMA FORWARDER / COURIER": obj.result[i]['sub-forward'][x]['forwarder_name'],
							"SERI INVOICE": obj.result[i]['sub-forward'][x]['seri_invoice'],
							"NOMOR INVOICE": obj.result[i]['sub-forward'][x]['nomor_invoice'],
							"AMOUNT": obj.result[i]['sub-forward'][x]['amount'],
							"data": obj.result[i].id,
							"flag": obj.result[i].flag,
							"fwd": obj.result[i].fwd_code,
							"clr": (parseInt(obj.result[i].flag) == 1 ? "table-warning" : "table-white"),
						};

						y++;
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-new-invoice").click(function () {
		const cardNew = $("#card-search-new-awb");
		const cardEdit = $("#card-search-edit-awb");
		const cardTable = $("#card-datatable-invoice");

		cardNew.removeClass("d-none");
		cardEdit.addClass("d-none");
		cardTable.addClass("d-none");
	});

	$("#btn-edit-invoice").click(function () {
		const clone = $("#clone-edit-invoice");
		const totalClone = $('[id^="edit-invoice-column"]');

		const cardNew = $("#card-search-new-awb");
		const cardEdit = $("#card-search-edit-awb");
		const cardTable = $("#card-datatable-invoice");

		const editAwb = $("#search-edit-awb-no");
		const editAju = $("#search-edit-aju-no");
		const editFwd = $("#search-edit-forwarder");
		const btnSaveEdit = $("#btn-save-edit-invoice");

		let tables = $('[id^="select-invoice-list"]');
		let id = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true" && tables.eq(i).attr("flag") == "2") {
				id = tables.eq(i).attr('data');
				break;
			}
		}

		if (!id) {
			$(".air-badge").html(airBadge("Access Denied!" , 'danger'));
			cardNew.addClass("d-none");
			cardEdit.addClass("d-none");
			return false;
		}


		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': id,
		};


		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v13/read-invoice");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let awbNo = (obj.result.awb_kode_740 !== "-" ? obj.result.awb_kode_740 : (obj.result.awb_kode_741 !== "-" ? obj.result.awb_kode_741 : (obj.result.awb_kode_704 !== "-" ? obj.result.awb_kode_704 : (obj.result.awb_kode_705 !== "-" ? obj.result.awb_kode_705 : "Invalid AWB No"))));
				editAwb.val(awbNo);
				editAju.val(obj.result.nomor_aju);

				for (let i = 0; i < editFwd.find('option').length; i++) {
					if (editFwd.find('option').eq(i).val() == obj.result['sub-forward'][0].forwarder_name) {
						editFwd.find('option').eq(i).attr('selected', true);
						
						editFwd.select2({
							dropdownParent: $('#select2-search-edit-forwarder'),
						}).val(obj.result['sub-forward'][0].forwarder_name).trigger('change');

						break;
					}
				}

				let sc = ``;
				for (let i = 0; i < obj.result['sub-forward'].length; i++) {
					sc += `
			        <div class="form-row mt-5 mt-lg-0" number="${totalClone.length}" id="edit-invoice-column">
			            <div class="form-group col-lg-1 mb-0" id="default-checked">
			              <label class="d-lg-none">Checked</label>
			              <div class="form-group form-check">
			                <input type="checkbox" class="form-check-input m-lg-2" number="${totalClone.length}" id="ni-edit-checked">
			                <label class="form-check-label" for="ni-edit-checked">
			                  <span class="d-lg-none">Checked for delete column</span>
			                </label>
			              </div>
			            </div>
			            <div class="form-group col-lg-3" id="default-series-no">
			              <label class="d-lg-none">Series</label>
			              <input type="text" class="form-control" number="${totalClone.length}" id="ni-edit-series-no" placeholder="Series" value="${totalClone.length}">
			              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-edit-series-no"></div>
			            </div>
			            <div class="form-group col-lg-2" id="default-invoice-no">
			              <label class="d-lg-none">Invoice Number</label>
			              <input type="text" class="form-control" number="${totalClone.length}" id="ni-edit-invoice-no" placeholder="Invoice Number" value="${obj.result['sub-forward'][i].nomor_invoice}">
			              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-edit-invoice-no"></div>
			            </div>
			            <div class="form-group col-lg-2" id="default-date">
			              <label class="d-lg-none">Date</label>
			              <input type="date" class="form-control" number="${totalClone.length}" id="ni-edit-date" placeholder="Date" value="${obj.result['sub-forward'][i].tanggal_invoice}">
			              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-edit-date"></div>
			            </div>
			            <div class="form-group col-lg-2" id="default-amount">
			              <label class="d-lg-none">Total Amount</label>
			              <input type="text" class="form-control" number="${totalClone.length}" id="ni-edit-amount" placeholder="Total Amount" value="${obj.result['sub-forward'][i].amount}">
			              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-edit-amount"></div>
			            </div>
			            <div class="form-group col-lg-2" id="default-valuta">
			              <label class="d-lg-none">Valuta</label>
			              <input type="text" class="form-control" number="${totalClone.length}" id="ni-edit-valuta" placeholder="Valuta" value="${obj.result['sub-forward'][i].valuta}">
			              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-edit-valuta"></div>
			            </div>
			          </div>
			        `;

			        totalClone.length++;
				}

				clone.html(sc);

				btnSaveEdit.attr('target', id);

				cardNew.addClass("d-none");
				cardTable.addClass("d-none");
				cardEdit.removeClass("d-none");
				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});		
	});

	$("#btn-delete-invoice").click(function () {
		const modal = $("#modal-delete-invoice");
		const label = $(".info-delete-invoice");
		const btn = $("#btn-save-delete-invoice");

		let tables = $('[id^="select-invoice-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(1).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	});

	$("#btn-format-excel-invoice").click(function () {

		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");
		const statusInvoice = $("#invoice-status");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
			'status': statusInvoice.val(),
		};

		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(window.location.href+'/export/'+executePost);
	});

	$("#btn-exit-edit-card, #btn-exit-new-card").click(function () {
		const cardNew = $("#card-search-new-awb");
		const cardEdit = $("#card-search-edit-awb");
		const cardTable = $("#card-datatable-invoice");

		cardTable.removeClass("d-none");
		cardNew.addClass("d-none");
		cardEdit.addClass("d-none");
	});

	$("#search-forwarder").select2({
		dropdownParent: $('#select2-search-forwarder')
	});

	$("#invoice-status").select2({
		dropdownParent: $('#select2-invoice-status')
	});

	$("#search-new-awb-no").change(function () {
		const awb = $("#search-new-awb-no");
		const aju = $("#search-new-aju-no");
		const card = $("#card-new-invoice-input");
		const btnSave = $("#btn-save-new-invoice");

		let allow = true;

		if (!inputValidation("#"+awb.attr("id"), "#msg-"+awb.attr("id"))) allow = false;

		$(".air-badge").html(loadingBackdrop());

		const params = {
			'no-awb': awb.val(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v13/get-no-aju");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				card.removeClass("d-none");
				aju.val(obj.result['no-aju']);
				btnSave.attr('target', obj.result['target']);

				$(".air-badge").html("");
			} else {
				card.addClass("d-none");
				aju.val("");
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});

	$("#turn-colomn-new-invoice").click(function() {
        let clone = $("#clone-new-invoice");
        let totalClone = $('[id^="new-invoice-column"]');

        if (totalClone.length >= 6) {
        	$(".air-badge").html(airBadge("Maximun 6 column", 'danger'));
        	return false;
        }

        let sc = `
        <div class="form-row mt-5 mt-lg-0" number="${totalClone.length}" id="new-invoice-column">
            <div class="form-group col-lg-1 mb-0" id="default-checked">
              <label class="d-lg-none">Checked</label>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input m-lg-2" number="${totalClone.length}" id="ni-new-checked">
                <label class="form-check-label" for="ni-new-checked">
                  <span class="d-lg-none">Checked for delete column</span>
                </label>
              </div>
            </div>
            <div class="form-group col-lg-3" id="default-series-no">
              <label class="d-lg-none">Series</label>
              <input type="text" class="form-control" number="${totalClone.length}" id="ni-new-series-no" placeholder="Series" value="${totalClone.length+1}">
              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-new-series-no"></div>
            </div>
            <div class="form-group col-lg-2" id="default-invoice-no">
              <label class="d-lg-none">Invoice Number</label>
              <input type="text" class="form-control" number="${totalClone.length}" id="ni-new-invoice-no" placeholder="Invoice Number">
              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-new-invoice-no"></div>
            </div>
            <div class="form-group col-lg-2" id="default-date">
              <label class="d-lg-none">Date</label>
              <input type="date" class="form-control" number="${totalClone.length}" id="ni-new-date" placeholder="Date">
              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-new-date"></div>
            </div>
            <div class="form-group col-lg-2" id="default-amount">
              <label class="d-lg-none">Total Amount</label>
              <input type="text" class="form-control" number="${totalClone.length}" id="ni-new-amount" placeholder="Total Amount">
              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-new-amount"></div>
            </div>
            <div class="form-group col-lg-2" id="default-valuta">
              <label class="d-lg-none">Valuta</label>
              <input type="text" class="form-control" number="${totalClone.length}" id="ni-new-valuta" placeholder="Valuta" value="IDR">
              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-new-valuta"></div>
            </div>
          </div>
        `;
        clone.append(sc);
    });

    $("#burn-colomn-new-invoice").click(function () {
        const dv = $('[id^="new-invoice-column"]');
        const checkbox = $('[id^="ni-new-checked"]');
        const niSeries = $('[id^="ni-new-series-no"]');
        const niInvoiceNo = $('[id^="ni-new-invoice-no"]');
        const niDate = $('[id^="ni-new-date"]');
        const niAmount = $('[id^="ni-new-amount"]');
        const niValuta = $('[id^="ni-new-valuta"]');

        const niMsgSeries = $('[id^="msg-ni-new-series-no"]');
        const niMsgInvoiceNo = $('[id^="msg-ni-new-invoice-no"]');
        const niMsgDate = $('[id^="msg-ni-new-date"]');
        const niMsgAmount = $('[id^="msg-ni-new-amount"]');
        const niMsgValuta = $('[id^="msg-ni-new-valuta"]');

        let number = false;
        let x = 1;
        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                number = checkbox.eq(i).attr('number');
                dv.eq(i).remove();
            } else {
                checkbox.eq(i).attr("number", x);
                dv.eq(i).attr("number", x);
                niSeries.eq(i).attr("number", x);
                niSeries.eq(i).val(x);
                niInvoiceNo.eq(i).attr("number", x);
                niDate.eq(i).attr("number", x);
                niAmount.eq(i).attr("number", x);
                niValuta.eq(i).attr("number", x);

                niMsgSeries.eq(i).attr("number", x);
                niMsgInvoiceNo.eq(i).attr("number", x);
                niMsgDate.eq(i).attr("number", x);
                niMsgAmount.eq(i).attr("number", x);
                niMsgValuta.eq(i).attr("number", x);
                x++;
            }
        }

        if (!number) {
            $(".air-badge").html(airBadge("Please check the box", 'danger'));
        }
    });

    $("#turn-colomn-edit-invoice").click(function() {
        let clone = $("#clone-edit-invoice");
        let totalClone = $('[id^="edit-invoice-column"]');

        if (totalClone.length >= 6) {
          $(".air-badge").html(airBadge("Maximun 6 column", 'danger'));
          return false;
        }

        let sc = `
        <div class="form-row mt-5 mt-lg-0" number="${totalClone.length}" id="edit-invoice-column">
            <div class="form-group col-lg-1 mb-0" id="default-checked">
              <label class="d-lg-none">Checked</label>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input m-lg-2" number="${totalClone.length}" id="ni-edit-checked">
                <label class="form-check-label" for="ni-edit-checked">
                  <span class="d-lg-none">Checked for delete column</span>
                </label>
              </div>
            </div>
            <div class="form-group col-lg-3" id="default-series-no">
              <label class="d-lg-none">Series</label>
              <input type="text" class="form-control" number="${totalClone.length}" id="ni-edit-series-no" placeholder="Series" value="${totalClone.length+1}">
              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-edit-series-no"></div>
            </div>
            <div class="form-group col-lg-2" id="default-invoice-no">
              <label class="d-lg-none">Invoice Number</label>
              <input type="text" class="form-control" number="${totalClone.length}" id="ni-edit-invoice-no" placeholder="Invoice Number">
              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-edit-invoice-no"></div>
            </div>
            <div class="form-group col-lg-2" id="default-date">
              <label class="d-lg-none">Date</label>
              <input type="date" class="form-control" number="${totalClone.length}" id="ni-edit-date" placeholder="Date">
              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-edit-date"></div>
            </div>
            <div class="form-group col-lg-2" id="default-amount">
              <label class="d-lg-none">Total Amount</label>
              <input type="text" class="form-control" number="${totalClone.length}" id="ni-edit-amount" placeholder="Total Amount">
              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-edit-amount"></div>
            </div>
            <div class="form-group col-lg-2" id="default-valuta">
              <label class="d-lg-none">Valuta</label>
              <input type="text" class="form-control" number="${totalClone.length}" id="ni-edit-valuta" placeholder="Valuta" value="IDR">
              <div class="invalid-feedback" number="${totalClone.length}" id="msg-ni-edit-valuta"></div>
            </div>
          </div>
        `;
        clone.append(sc);
    });

    $("#burn-colomn-edit-invoice").click(function () {
        const dv = $('[id^="edit-invoice-column"]');
        const checkbox = $('[id^="ni-edit-checked"]');
        const niSeries = $('[id^="ni-edit-series-no"]');
        const niInvoiceNo = $('[id^="ni-edit-invoice-no"]');
        const niDate = $('[id^="ni-edit-date"]');
        const niAmount = $('[id^="ni-edit-amount"]');
        const niValuta = $('[id^="ni-edit-valuta"]');

        const niMsgSeries = $('[id^="msg-ni-edit-series-no"]');
        const niMsgInvoiceNo = $('[id^="msg-ni-edit-invoice-no"]');
        const niMsgDate = $('[id^="msg-ni-edit-date"]');
        const niMsgAmount = $('[id^="msg-ni-edit-amount"]');
        const niMsgValuta = $('[id^="msg-ni-edit-valuta"]');

        let number = false;
        let x = 1;
        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                number = checkbox.eq(i).attr('number');
                dv.eq(i).remove();
            } else {
                checkbox.eq(i).attr("number", x);
                dv.eq(i).attr("number", x);
                niSeries.eq(i).attr("number", x);
                niSeries.eq(i).val(x);
                niInvoiceNo.eq(i).attr("number", x);
                niDate.eq(i).attr("number", x);
                niAmount.eq(i).attr("number", x);
                niValuta.eq(i).attr("number", x);

                niMsgSeries.eq(i).attr("number", x);
                niMsgInvoiceNo.eq(i).attr("number", x);
                niMsgDate.eq(i).attr("number", x);
                niMsgAmount.eq(i).attr("number", x);
                niMsgValuta.eq(i).attr("number", x);
                x++;
            }
        }

        if (!number) {
            $(".air-badge").html(airBadge("Please check the box", 'danger'));
        }
    });

    $("#btn-save-new-invoice").click(function () {
    	const card = $("#card-search-new-awb");

    	const btn = $("#btn-save-new-invoice");
    	const srcAwbNo = $("#search-new-awb-no");
    	const srcAjuNo = $("#search-new-aju-no");
    	const srcForwarder = $("#search-new-forwarder");

    	const niSeriesNo = $('[id^="ni-new-series-no"]');
    	const niInvoiceNo = $('[id^="ni-new-invoice-no"]');
    	const niDate = $('[id^="ni-new-date"]');
    	const niAmount = $('[id^="ni-new-amount"]');
    	const niValuta = $('[id^="ni-new-valuta"]');
    	let allow = true;

    	if (!inputValidation("#"+srcAwbNo.attr("id"), "#msg-"+srcAwbNo.attr("id"))) allow = false;
    	if (!inputValidation("#"+srcAjuNo.attr("id"), "#msg-"+srcAjuNo.attr("id"))) allow = false;
    	if (!select2Validation("#"+srcForwarder.attr("id"), "#msg-"+srcForwarder.attr("id"))) allow = false;

    	for (let i = 0; i < niSeriesNo.length; i++) {
    		if (!inputValidation("input[id$='"+niSeriesNo.eq(i).attr('id')+"'][number='"+niSeriesNo.eq(i).attr('number')+"']", "div[id$='msg-"+niSeriesNo.eq(i).attr('id')+"'][number='"+niSeriesNo.eq(i).attr('number')+"']")) allow = false;
    		if (!inputValidation("input[id$='"+niInvoiceNo.eq(i).attr('id')+"'][number='"+niInvoiceNo.eq(i).attr('number')+"']", "div[id$='msg-"+niInvoiceNo.eq(i).attr('id')+"'][number='"+niInvoiceNo.eq(i).attr('number')+"']")) allow = false;
    		if (!inputValidation("input[id$='"+niDate.eq(i).attr('id')+"'][number='"+niDate.eq(i).attr('number')+"']", "div[id$='msg-"+niDate.eq(i).attr('id')+"'][number='"+niDate.eq(i).attr('number')+"']")) allow = false;
    		if (!inputValidation("input[id$='"+niAmount.eq(i).attr('id')+"'][number='"+niAmount.eq(i).attr('number')+"']", "div[id$='msg-"+niAmount.eq(i).attr('id')+"'][number='"+niAmount.eq(i).attr('number')+"']")) allow = false;
    		if (!inputValidation("input[id$='"+niValuta.eq(i).attr('id')+"'][number='"+niValuta.eq(i).attr('number')+"']", "div[id$='msg-"+niValuta.eq(i).attr('id')+"'][number='"+niValuta.eq(i).attr('number')+"']")) allow = false;
    	}

    	if (!allow) return false;
    	$(".air-badge").html(loadingBackdrop());

    	const params = {
			"target" : btn.attr('target'),
			"no-awb" : srcAwbNo.val(),
			"no-aju" : srcAjuNo.val(),
			"forwarder" : srcForwarder.val(),
			"invoice" : [],
		};

		for (let i = 0; i < niSeriesNo.length; i++) {
			params['invoice'].push({
				series: niSeriesNo.eq(i).val(),
				invoice: niInvoiceNo.eq(i).val(),
				date: niDate.eq(i).val(),
				amount: niAmount.eq(i).val(),
				valuta: niValuta.eq(i).val(),
			});
		}

		const url = baseUrl("/auth/api/v13/save-new-invoice");

		const execute = postField(url, 'POST', params, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				card.addClass("d-none");
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
    });

    $("#btn-save-edit-invoice").click(function () {
    	const card = $("#card-search-edit-awb");

    	const btn = $("#btn-save-edit-invoice");
    	const srcAwbNo = $("#search-edit-awb-no");
    	const srcAjuNo = $("#search-edit-aju-no");
    	const srcForwarder = $("#search-edit-forwarder");

    	const niSeriesNo = $('[id^="ni-edit-series-no"]');
    	const niInvoiceNo = $('[id^="ni-edit-invoice-no"]');
    	const niDate = $('[id^="ni-edit-date"]');
    	const niAmount = $('[id^="ni-edit-amount"]');
    	const niValuta = $('[id^="ni-edit-valuta"]');
    	let allow = true;

    	if (!inputValidation("#"+srcAwbNo.attr("id"), "#msg-"+srcAwbNo.attr("id"))) allow = false;
    	if (!inputValidation("#"+srcAjuNo.attr("id"), "#msg-"+srcAjuNo.attr("id"))) allow = false;
    	if (!select2Validation("#"+srcForwarder.attr("id"), "#msg-"+srcForwarder.attr("id"))) allow = false;

    	for (let i = 0; i < niSeriesNo.length; i++) {
    		if (!inputValidation("input[id$='"+niSeriesNo.eq(i).attr('id')+"'][number='"+niSeriesNo.eq(i).attr('number')+"']", "div[id$='msg-"+niSeriesNo.eq(i).attr('id')+"'][number='"+niSeriesNo.eq(i).attr('number')+"']")) allow = false;
    		if (!inputValidation("input[id$='"+niInvoiceNo.eq(i).attr('id')+"'][number='"+niInvoiceNo.eq(i).attr('number')+"']", "div[id$='msg-"+niInvoiceNo.eq(i).attr('id')+"'][number='"+niInvoiceNo.eq(i).attr('number')+"']")) allow = false;
    		if (!inputValidation("input[id$='"+niDate.eq(i).attr('id')+"'][number='"+niDate.eq(i).attr('number')+"']", "div[id$='msg-"+niDate.eq(i).attr('id')+"'][number='"+niDate.eq(i).attr('number')+"']")) allow = false;
    		if (!inputValidation("input[id$='"+niAmount.eq(i).attr('id')+"'][number='"+niAmount.eq(i).attr('number')+"']", "div[id$='msg-"+niAmount.eq(i).attr('id')+"'][number='"+niAmount.eq(i).attr('number')+"']")) allow = false;
    		if (!inputValidation("input[id$='"+niValuta.eq(i).attr('id')+"'][number='"+niValuta.eq(i).attr('number')+"']", "div[id$='msg-"+niValuta.eq(i).attr('id')+"'][number='"+niValuta.eq(i).attr('number')+"']")) allow = false;
    	}

    	if (!allow) return false;
    	$(".air-badge").html(loadingBackdrop());

    	const params = {
    		"target" : btn.attr('target'),
    		"no-awb" : srcAwbNo.val(),
    		"no-aju" : srcAjuNo.val(),
    		"forwarder" : srcForwarder.val(),
    		"invoice" : [],
    	};

    	for (let i = 0; i < niSeriesNo.length; i++) {
    		params['invoice'].push({
    			series: niSeriesNo.eq(i).val(),
    			invoice: niInvoiceNo.eq(i).val(),
    			date: niDate.eq(i).val(),
    			amount: niAmount.eq(i).val(),
    			valuta: niValuta.eq(i).val(),
    		});
    	}

    	const url = baseUrl("/auth/api/v13/save-edit-invoice");

    	const execute = postField(url, 'POST', params, false);

    	execute.done(function(result) {
    		let obj = JSON.parse(JSON.stringify(result));

    		if (obj.code == 200) {
    			card.addClass("d-none");
    			$(".air-badge").html(airBadge(obj.msg , 'success'));
    			setTimeout(function() {
    				window.location = window.location.href;
    			}, 5000);
    		} else {
    			$(".air-badge").html(airBadge(obj.msg , 'danger'));
    		}
    	});

    	execute.fail(function() {
    		$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
    	});
    });

    $("#btn-save-delete-invoice").click(function () {
		const btn = $("#btn-save-delete-invoice");
		const txt = btn.attr("data");

		$("#modal-delete-invoice").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v13/save-delete-invoice");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});
}

const historyMyHistoryLogin = () => {
	let tableOptIndex = datatableOpt();

	tableOptIndex['buttons'] = [];

	tableOptIndex['columns'] = [
		{data: "NO"},
		{data: "USERNAME"},
		{data: "STATUS"},
		{data: "CREATED"}
	];

	tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 3],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
			}
		},
	];
	
	let dataTableIndex = $('#datatable-my-history-login').DataTable(tableOptIndex);

	$(document).ready(function () {

		$(".air-badge").html(loadingBackdrop());

		const url = baseUrl("/auth/api/v12/login-log");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					sc[i] = {
						"NO": (i+1),
						"USERNAME": obj.result[i].username,
						"STATUS": obj.result[i].status,
						"CREATED": obj.result[i].created,
					};
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const historyUserActivity = () => {
	let tableOptIndex = datatableOpt();

	tableOptIndex['buttons'] = [];

	tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Username"},
		{data: "IP Address"},
		{data: "Device"},
		{data: "Method"},
		{data: "Server"},
		{data: "Post"},
		{data: "Get"},
		{data: "Cookie"},
		{data: "Request"},
		{data: "Env"},
		{data: "Session"},
		{data: "Files"},
		{data: "Created"}
	];

	tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 3],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
			}
		},
	];
	
	let dataTableIndex = $('#datatable-user-activity').DataTable(tableOptIndex);

	$(document).ready(function () {

		$(".air-badge").html(loadingBackdrop());

		const url = baseUrl("/auth/api/v12/user-activity");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					sc[i] = {
						"No": (i+1),
						"Username": obj.result[i].username,
						"IP Address": obj.result[i].ip_address,
						"Device": obj.result[i].device,
						"Method": obj.result[i].method,
						"Server": obj.result[i].server,
						"Post": obj.result[i].post,
						"Get": obj.result[i].get,
						"Cookie": obj.result[i].cookie,
						"Request": obj.result[i].request,
						"Env": obj.result[i].env,
						"Session": obj.result[i].session,
						"Files": obj.result[i].files,
						"Created": obj.result[i].created,
					};
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

// ===============================================================================
const profilePage = () => {

	let newFileCandidate = null;
	let changeFileCandidate = null;
	let newAvatar = null;
	let changeAvatar = null;
	let fileInput = null;
	let myFile = null;
	let image = document.getElementById('image-cropper');
	let thumbnail = null;
	let fileName = null;
	let modalCropper = $("#modal-crop-image");
	let cropper = null;
	let TypeAction = null;
	let saveFile = null;
	let options = {
		// aspectRatio: 1,
		// viewMode: 3,
		dragMode: 'move',
		aspectRatio: 1,
		autoCropArea: 1,
		restore: false,
		guides: false,
		center: true,
		highlight: true,
		cropBoxMovable: false,
		cropBoxResizable: false,
		toggleDragModeOnDblclick: false,

		// ready: function (e) {
		// 	 // console.log(e.type);
		// },

		// cropstart: function (e) {
		// 	 // console.log(e.type, e.detail.action);
		// },
		// cropmove: function (e) {
		// 	 // console.log(e.type, e.detail.action);
		// },
		// cropend: function (e) {
		// 	 // console.log(e.type, e.detail.action);
		// },
		// zoom: function (e) {
		// 	 // console.log(e.type, e.detail.ratio);
		// },
		// crop: function (e) {
		// 	 // console.log(e.detail);
		// },
	};

	$("#switch-pass").change(function() {
		const turnPass = $("#switch-pass");
		const password = $("#profile-old-password");
		const newPassword = $("#profile-new-password");
		const confPassword = $("#profile-confirm-new-password");

		if (turnPass.prop("checked")) {
			password.attr("disabled", false);
			newPassword.attr("disabled", false);
			confPassword.attr("disabled", false);
		}
		if (!turnPass.prop("checked")) {
			password.attr("disabled", true);
			newPassword.attr("disabled", true);
			confPassword.attr("disabled", true);
		}
	});

	$("#turn-profile-old-password").click(function() {
		showPasswd("profile-old-password", this.id);
	});

	$("#turn-profile-new-password").click(function() {
		multiShowPasswd("profile-new-password", "profile-confirm-new-password", this.id);
	});

	$("#turn-image").click(function() {
		let turn = $("#turn-image");
		let label = $("#label-turn-image");
		let change = $("#change-choose-image");
		let msg = $("#msg-change-choose-image");

		if (turn.prop('checked')) {
			// label.text("Disabled change image");
			change.addClass("custom-input-file--2");
			change.attr("disabled", false);
			if (fileName) fileName.text("Choose a image");
		} else {
			// label.text("Enable change image");
			change.removeClass("is-invalid");
			change.removeClass("custom-input-file--2");
			msg.text("");
			change.attr("disabled", true);
			change.val("");
		}
	});

	$("#change-choose-image").click(function() {
		const choose = $(this);
		TypeAction = choose.attr("data-choose");
		fileInput = choose;

		if (TypeAction == "new") {
			fileName = $(".new-file-name");
			thumbnail = $("#new-img-thumbnail");
		}

		if (TypeAction == "change") {
			fileName = $(".change-file-name");
			thumbnail = $("#change-img-thumbnail");
		}

		fileName.text("Choose a image");
		fileInput.val("");
	});

	$("#change-choose-image").change(function() {
		myFile = fileInput.prop('files')[0];
		let cropImage = $("#image-cropper");
		let modal = $('#modal-crop-image');

		fileName.text("Choose a image");

		if (imgExtension(myFile) == false ) {
			$(".air-badge").html(airBadge("The file must be an image!" , 'danger'));
			return false;
		}

		const reader = new FileReader();
		reader.onload = function() {

			const img = new Image;
			img.onload = function() {
				if (img.width > 5000 && img.height > 5000) {
					fileInput.val("");
					$(".air-badge").html(airBadge("Upload JPG or PNG image. 5000 x 5000 required!" , 'danger'));
				}
				cropImage.attr('src', reader.result);

				if (cropper) {
					cropper.destroy();
					cropper = null;
				}

				modal.modal('show');
			};

			img.onerror = function() {
				fileInput.val("");
				$(".air-badge").html(airBadge("Malicious files detected!" , 'danger'));
			};
			img.src = reader.result;
		}
		reader.readAsDataURL(myFile);
	});

	modalCropper.on('shown.bs.modal', function () {
		cropper = new Cropper(image, options);
	});

	$("#rotate-l").click(function() {
		cropper.rotate(-90);
	});

	$("#rotate-r").click(function() {
		cropper.rotate(90);
	});

	$("#scale-l-r").click(function() {
		let dataScale = this.getAttribute('data-scale');

		if (this.getAttribute('data-scale') == "true") {
			cropper.scale(-1, 1);
			this.setAttribute('data-scale', false);
		} else {
			cropper.scale(1, 1);
			this.setAttribute('data-scale', true);
		}
	});

	$("#crop-image").click(function() {
		let finish = cropper.getCroppedCanvas({
			width: 1500,
			height: 1500,
			minWidth: 1000,
			minHeight: 1000,
			maxWidth: 1500,
			maxHeight: 1500,
			imageSmoothingEnabled: false,
			imageSmoothingQuality: 'high',
		});

		let blobBin = atob(finish.toDataURL().split(',')[1]);
		let array = [];
		for(let i = 0; i < blobBin.length; i++) {
			array.push(blobBin.charCodeAt(i));
		}
		let avatarFile = new Blob([new Uint8Array(array)], {type: 'image/png'});

		fileName.text(myFile.name);
		thumbnail.attr("src", finish.toDataURL());
		modalCropper.modal("hide");

		if (TypeAction == "new") {
			newFileCandidate = fileInput;
			newAvatar = avatarFile;
		}

		if (TypeAction == "change") {
			changeFileCandidate = fileInput;
			changeAvatar = avatarFile;
		}
	});

	$("#profile-name").keyup(function() {
		filterName("#"+this.id, "#msg-"+this.id);
	});

	$("#profile-old-password").keyup(function () {
		filterPasswd("#"+this.id, "#msg-"+this.id);
	});

	$("#profile-new-password").keyup(function () {
		const password = $("#profile-old-password");
		const newPassword = $("#profile-new-password");
		const confPassword = $("#profile-confirm-new-password");

		filterNewPassword("#"+newPassword.attr("id"), "#msg-"+newPassword.attr("id"), "#"+confPassword.attr("id"));
	});

	$("#profile-confirm-new-password").keyup(function () {
		const password = $("#profile-old-password");
		const newPassword = $("#profile-new-password");
		const confPassword = $("#profile-confirm-new-password");

		filterConfirmNewPassword("#"+newPassword.attr("id"), "#msg-"+newPassword.attr("id"), "#"+confPassword.attr("id"));
	});

	$("#save-change-profile").click(function() {
		const name = $("#profile-name");
		const turnPass = $("#switch-pass");
		const password = $("#profile-old-password");
		const newPassword = $("#profile-new-password");
		const confPassword = $("#profile-confirm-new-password");
		const button = $("#save-change-profile");
		const turnImage = $("#turn-image");
		const changeImage = $("#change-choose-image");
		const nameFile = $(".change-file-name");
		let allow = true;
		let onFile = null;
		let formData = null;

		if (!filterName("#"+name.attr('id'), "#msg-"+name.attr('id'))) allow =false;
		if (turnPass.prop("checked")) {
			if (!filterPasswd("#"+password.attr('id'), "#msg-"+password.attr('id'))) allow =false;
			if (!filterNewPassword("#"+newPassword.attr("id"), "#msg-"+newPassword.attr("id"), "#"+confPassword.attr("id"))) allow =false;
			if (!filterConfirmNewPassword("#"+newPassword.attr("id"), "#msg-"+newPassword.attr("id"), "#"+confPassword.attr("id"))) allow =false;
		}
		if (turnImage.prop("checked")) {
			if (!filterImage("#"+changeImage.attr("id"), "#msg-"+changeImage.attr("id"), "."+nameFile.attr("class"))) allow = false;
			if (!changeFileCandidate || !changeFileCandidate.prop('files').length == 1) {
				$("#msg-"+changeImage.attr("id")).text("Please choose a image!");
				nameFile.text("Choose a image");
				changeImage.removeClass('is-valid');
				changeImage.addClass('is-invalid');
				allow = false;
			}
		}

		if (!allow) return false;

		$(".air-badge").html(loadingBackdrop());
		name.attr("disabled", true);
		turnPass.attr("disabled", true);
		if (turnPass.prop("checked")) {
			password.attr("disabled", true);
			newPassword.attr("disabled", true);
			confPassword.attr("disabled", true);
		}
		turnImage.attr("disabled", true);
		if (turnImage.prop("checked")) {
			changeImage.attr("disabled", true);
		}
		button.attr("disabled", true);

		let params = {
			'name': name.val().trim(),
		};

		if (turnPass.prop("checked")) {
			params = {
				'name': name.val().trim(),
				'on-password': turnPass.prop("checked"),
				'old-password': password.val().trim(),
				'new-password': newPassword.val().trim(),
				'confirm-new-password': confPassword.val().trim(),
			};
		}

		if (turnImage.prop("checked")) {
			params['on-image'] = turnImage.prop("checked");
			formData = new FormData();
			formData.append('data', JEncrypt(JSON.stringify(params)));
			formData.append('original-avatar', changeFileCandidate.prop('files')[0]);
			formData.append('avatar', changeAvatar, changeFileCandidate.prop('files')[0].name);
			onFile = true;
		} else {
			formData = {
				'data' : JEncrypt(JSON.stringify(params)),
			}
			onFile = false;
		}

		const url = baseUrl("/auth/api/v4/change-profile");
		const execute = postField(url, 'POST', formData, false, onFile);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
				name.attr("disabled", false);
				turnPass.attr("disabled", false);
				if (turnPass.prop("checked")) {
					password.attr("disabled", false);
					newPassword.attr("disabled", false);
					confPassword.attr("disabled", false);
				}
				turnImage.attr("disabled", false);
				if (turnImage.prop("checked")) {
					changeImage.attr("disabled", false);
				}
				button.attr("disabled", false);
			}
		});

		execute.fail(function() {
			name.attr("disabled", false);
			turnPass.attr("disabled", false);
			if (turnPass.prop("checked")) {
				password.attr("disabled", false);
				newPassword.attr("disabled", false);
				confPassword.attr("disabled", false);
			}
			turnImage.attr("disabled", false);
			if (turnImage.prop("checked")) {
				changeImage.attr("disabled", false);
			}
			button.attr("disabled", false);
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

// ===============================================================================
const userManagement = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;

	let tableOptIndex = datatableOpt();

	let tableBtnIndex = [
		{	
			text : '<span class="mr-2">Add</span><i class="fas fa-fw fa-plus"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-new-user-management');
				$(node).attr('disabled', false);
			}
		},
		{	
			text : '<span class="mr-2">Edit</span><i class="fas fa-fw fa-edit"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-edit-user-management');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Disable</span><i class="fas fa-fw fa-ban"></i>', 
			className: 'btn btn-dark btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-disable-user-management');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Enable</span><i class="fas fa-fw fa-ban"></i>', 
			className: 'btn btn-dark btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-enable-user-management');
				$(node).attr('disabled', true);
			}
		}
	];

	tableOptIndex['buttons'] = arrayPrepend(tableBtnIndex, selectionExportBtn());

	tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Name"},
		{data: "Username"},
		{data: "Email"},
		{data: "Role"},
		{data: "Departement"},
		{data: "Status"},
		{data: "Register Date"}
	];

	tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-user-management-list');
		$(row).attr('data', data.data);
		// $(row).attr('flag', data.flag);
		// $(row).attr('fwd', data.fwd);
		$(row).attr('stg', false);
	};

	tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 2, 6, 7],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
			}
		},
		{
			"targets": [3, 4, 5],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
			}
		}
	];

	let dataTableIndex = $('#datatable-user-management-list').DataTable(tableOptIndex);

	$("#profile-edit-role").select2({
		dropdownParent: $('#select2-profile-edit-role')
	});

	$("#profile-new-role").select2({
		dropdownParent: $('#select2-profile-new-role')
	});

	$("#profile-new-dept").select2({
		dropdownParent: $('#select2-profile-new-dept')
	});

	$("#profile-edit-dept").select2({
		dropdownParent: $('#select2-profile-edit-dept')
	});

	const selectUserManagementList = (arr) => {
		const btnEdit = $("#btn-edit-user-management");
		const btnDisable = $("#btn-disable-user-management");
		const btnEnable = $("#btn-enable-user-management");

		let tables = $('[id^="select-user-management-list"]');
		let isOn = 0;
		let shiftTable = 0;

		for (let i = 0; i < tables.length; i++) {

			if (selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				isOn++;
				lastPressed = (i+1);
			} else {
				if (ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							isOn++;
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (shiftPressed && !ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						shiftTable = (i+1);
					}
				}

				if (!shiftPressed) shiftTable = 0;
			}
		}

		// naik
		if (lastPressed && shiftTable && lastPressed > shiftTable) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					isOn++;
				}
			}
		}

		// turun
		if (shiftTable > lastPressed) {
			if (lastPressed >= 1) lastPressed --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= lastPressed && i < shiftTable) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					isOn++;
				}
			}
		}

		if (isOn == 0) {
			btnEdit.attr("disabled", true);
			btnDisable.attr("disabled", true);
			btnEnable.attr("disabled", true);
			lastPressed = 0;
		}

		if (isOn == 1) {
			btnEdit.attr("disabled", false);
			btnDisable.attr("disabled", false);
			btnEnable.attr("disabled", false);
		}

		if (isOn >= 2) {
			btnEdit.attr("disabled", true);
			btnDisable.attr("disabled", false);
			btnEnable.attr("disabled", false);
		}
	}

	$(document).keydown(function(event){
		const modalAdd = $("#modal-new-user-management");
		const modalEdit = $("#modal-edit-user-management");
		if(event.which == "17") ctrlPressed = true;
		if(event.which == "16") shiftPressed = true;
		if(ctrlPressed && event.which == "65") selectAll = true;

		if (event.keyCode == 65 && event.ctrlKey && selectAll && modalAdd.attr('aria-hidden') == "true" && modalEdit.attr('aria-hidden') == "true") {
			textSelection('datatable-user-management-list');
			event.preventDefault();
			selectUserManagementList();
		}
	});

	$(document).keyup(function(){
		ctrlPressed = false;
		shiftPressed = false;
		selectAll = false;
	});

	$(document).on('click', '[id^="select-user-management-list"]', function () {
		const myData = $(this);

		selectUserManagementList(myData);
	});

	$(document).ready(function () {
		const profileNewRole = $("#profile-new-role");
		const profileEditRole = $("#profile-edit-role");
		const profileNewDept = $("#profile-new-dept");
		const profileEditDept = $("#profile-edit-dept");

		$(".air-badge").html(loadingBackdrop());
		const url = baseUrl("/auth/api/v5/load-all-user");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				for (let i = 0; i < obj.result.role.length; i++) {
					profileNewRole.append(new Option(obj.result.role[i].name, obj.result.role[i].id));
					profileEditRole.append(new Option(obj.result.role[i].name, obj.result.role[i].id));
				}
				for (let i = 0; i < obj.result.dept.length; i++) {
					profileNewDept.append(new Option(obj.result.dept[i].name, obj.result.dept[i].code));
					profileEditDept.append(new Option(obj.result.dept[i].name, obj.result.dept[i].code));
				}

				let sc = [];
				let y = 0;
				for (let i = 0; i < obj.result.users.length; i++) {
					let nameTag = `
						<div class="media align-items-center">
	                        <div>
	                            <img alt="Image placeholder" src="${baseUrl("/assets/img/profiles/"+obj.result.users[i].img)}" class="avatar  rounded-circle">
	                        </div>
	                        <div class="media-body ml-4">
	                            <span class="name mb-0 text-sm">${obj.result.users[i].name}</span>
	                        </div>
	                    </div>
					`;
					sc[y] = {
						"No": (i+1),
						"Name": nameTag,
						"Username": obj.result.users[i].username,
						"Email": obj.result.users[i].email,
						"Role": obj.result.users[i].role,
						"Departement": obj.result.users[i].dept,
						"Status": obj.result.users[i].flag,
						"Register Date": obj.result.users[i].register_date,
						// "img": "default.jpg",
						"data": obj.result.users[i].id
					};

					y++;
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#switch-pass").change(function() {
		const turnPass = $("#switch-pass");
		const newPassword = $("#profile-edit-password");
		const confPassword = $("#profile-edit-confirm-password");

		if (turnPass.prop("checked")) {
			newPassword.attr("disabled", false);
			confPassword.attr("disabled", false);
		}
		if (!turnPass.prop("checked")) {
			newPassword.attr("disabled", true);
			confPassword.attr("disabled", true);
		}
	});

	$("#turn-profile-new-password").click(function() {
		multiShowPasswd("profile-new-password", "profile-new-confirm-password", this.id);
	});

	$("#turn-profile-edit-password").click(function() {
		multiShowPasswd("profile-edit-password", "profile-edit-confirm-password", this.id);
	});

	$("#btn-new-user-management").click(function () {
		const modal = $("#modal-new-user-management");

		modal.modal('show');
	});

	$("#btn-save-new-user").click(function () {
		const modal = $("#modal-new-user-management");

		const profileUsername = $("#profile-new-username");
		const profileMail = $("#profile-new-mail");
		const profileName = $("#profile-new-name");
		const profileRole = $("#profile-new-role");
		const profileDept = $("#profile-new-dept");
		const profilePassword = $("#profile-new-password");
		const profileConfirmPassword = $("#profile-new-confirm-password");
		let allow = true;

		if (!inputValidation("#"+profileUsername.attr('id'), "#msg-"+profileUsername.attr('id'))) allow =false;
		if (!inputValidation("#"+profileMail.attr('id'), "#msg-"+profileMail.attr('id'))) allow =false;
		if (!filterName("#"+profileName.attr('id'), "#msg-"+profileName.attr('id'))) allow =false;
		if (!select2Validation("#"+profileRole.attr("id"), "#msg-"+profileRole.attr("id"))) allow = false;
		if (!select2Validation("#"+profileDept.attr("id"), "#msg-"+profileDept.attr("id"))) allow = false;
		if (!filterNewPassword("#"+profilePassword.attr("id"), "#msg-"+profilePassword.attr("id"), "#"+profileConfirmPassword.attr("id"))) allow =false;
		if (!filterConfirmNewPassword("#"+profilePassword.attr("id"), "#msg-"+profilePassword.attr("id"), "#"+profileConfirmPassword.attr("id"))) allow =false;

		if (!allow) return false;
		modal.modal('hide');
		$(".air-badge").html(loadingBackdrop());

		let params = {
			'username': profileUsername.val().trim(),
			'mail': profileMail.val().trim(),
			'name': profileName.val().trim(),
			'role': profileRole.val().trim(),
			'dept': profileDept.val().trim(),
			'password': profilePassword.val().trim(),
			'confirm-password': profileConfirmPassword.val().trim(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v5/new-user");
		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
				
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-save-edit-user").click(function () {
		const modal = $("#modal-edit-user-management");
		const btn = $("#btn-save-edit-user");

		const profileUsername = $("#profile-edit-username");
		const profileMail = $("#profile-edit-mail");
		const profileName = $("#profile-edit-name");
		const profileRole = $("#profile-edit-role");
		const profileDept = $("#profile-edit-dept");
		const turnPass = $("#switch-pass");
		const profilePassword = $("#profile-edit-password");
		const profileConfirmPassword = $("#profile-edit-confirm-password");
		let allow = true;

		if (!inputValidation("#"+profileUsername.attr('id'), "#msg-"+profileUsername.attr('id'))) allow =false;
		if (!inputValidation("#"+profileMail.attr('id'), "#msg-"+profileMail.attr('id'))) allow =false;
		if (!filterName("#"+profileName.attr('id'), "#msg-"+profileName.attr('id'))) allow =false;
		if (!select2Validation("#"+profileRole.attr("id"), "#msg-"+profileRole.attr("id"))) allow = false;
		if (!select2Validation("#"+profileDept.attr("id"), "#msg-"+profileDept.attr("id"))) allow = false;
		if (turnPass.prop("checked")) {
			if (!filterNewPassword("#"+profilePassword.attr("id"), "#msg-"+profilePassword.attr("id"), "#"+profileConfirmPassword.attr("id"))) allow =false;
			if (!filterConfirmNewPassword("#"+profilePassword.attr("id"), "#msg-"+profilePassword.attr("id"), "#"+profileConfirmPassword.attr("id"))) allow =false;
		}

		if (!allow) return false;
		modal.modal('hide');
		$(".air-badge").html(loadingBackdrop());

		let params = {
			'target': btn.attr('target'),
			'username': profileUsername.val().trim(),
			'mail': profileMail.val().trim(),
			'name': profileName.val().trim(),
			'role': profileRole.val().trim(),
			'dept': profileDept.val().trim(),
			'new-password': turnPass.prop("checked"),
		};

		if (turnPass.prop("checked")) {
			params['password'] = profilePassword.val().trim();
			params['confirm-password'] = profileConfirmPassword.val().trim();
		}

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v5/edit-user");
		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
				
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-save-disable-user").click(function () {
		const btn = $("#btn-save-disable-user");
		const txt = btn.attr("data");

		$("#modal-disable-user-management").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v5/disable-user");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});

	$("#btn-save-enable-user").click(function () {
		const btn = $("#btn-save-enable-user");
		const txt = btn.attr("data");

		$("#modal-enable-user-management").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v5/enable-user");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});

	$("#btn-edit-user-management").click(function () {
		const modal = $("#modal-edit-user-management");
		const btn = $("#btn-save-edit-user");

		const profileUsername = $("#profile-edit-username");
		const profileMail = $("#profile-edit-mail");
		const profileName = $("#profile-edit-name");
		const profileRole = $("#profile-edit-role");
		const profileDept = $("#profile-edit-dept");
		const profilePassword = $("#profile-edit-password");
		const profileConfirmPassword = $("#profile-edit-confirm-password");

		let tables = $('[id^="select-user-management-list"]');
		let id = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id = tables.eq(i).attr('data');
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': id,
		};
		
		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v5/get-user-by");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				profileRole.select2({
					dropdownParent: $('#select2-profile-edit-role')
				}).val(obj.result['role']).trigger('change');

				profileDept.select2({
					dropdownParent: $('#select2-profile-edit-dept')
				}).val(obj.result['dept_code']).trigger('change');

				profileUsername.val(obj.result['username']);
				profileMail.val(obj.result['email']);
				profileName.val(obj.result['name']);

				btn.attr('target', obj.result['id']);

				modal.modal('show');
				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});	

	$("#btn-disable-user-management").click(function () {
		const modal = $("#modal-disable-user-management");
		const label = $(".info-disable-user");
		const btn = $("#btn-save-disable-user");

		let tables = $('[id^="select-user-management-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(1).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	});

	$("#btn-enable-user-management").click(function () {
		const modal = $("#modal-enable-user-management");
		const label = $(".info-enable-user");
		const btn = $("#btn-save-enable-user");

		let tables = $('[id^="select-user-management-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(1).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	});
}

const userManagementNewPass = () => {
	$("#turn-new-password").click(function() {
		multiShowPasswd("new-password", "new-confirm-password", this.id);
	});

	$("#btn-save-change").click(function () {
		const btn = $("#btn-save-change");
		const profilePassword = $("#new-password");
		const profileConfirmPassword = $("#new-confirm-password");
		let allow = true;

		if (!filterNewPassword("#"+profilePassword.attr("id"), "#msg-"+profilePassword.attr("id"), "#"+profileConfirmPassword.attr("id"))) allow =false;
		if (!filterConfirmNewPassword("#"+profilePassword.attr("id"), "#msg-"+profilePassword.attr("id"), "#"+profileConfirmPassword.attr("id"))) allow =false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		let params = {
			'username': btn.attr('target').trim(),
			'password': profilePassword.val().trim(),
			'confirm-password': profileConfirmPassword.val().trim(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v5/new-user-passwd");
		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
				
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const menuManagement = () => {
	let menu_selectAll = false;
	let menu_ctrlPressed = false;
	let menu_shiftPressed = false;
	let menu_lastPressed = 0;

	let submenu_selectAll = false;
	let submenu_ctrlPressed = false;
	let submenu_shiftPressed = false;
	let submenu_lastPressed = 0;

	let menu_tableOptIndex = datatableOpt();
	let submenu_tableOptIndex = datatableOpt();

	let menu_tableBtnIndex = [
		{	
			text : '<span class="mr-2">Add Menu</span><i class="fas fa-fw fa-plus"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-new-menu-management');
				$(node).attr('disabled', false);
			}
		},
		{	
			text : '<span class="mr-2">Edit</span><i class="fas fa-fw fa-edit"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-edit-menu-management');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">delete</span><i class="fas fa-fw fa-trash"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-delete-menu-management');
				$(node).attr('disabled', true);
			}
		}
	];

	let submenu_tableBtnIndex = [
		{	
			text : '<span class="mr-2">Add submenu</span><i class="fas fa-fw fa-plus"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-new-submenu-management');
				$(node).attr('disabled', false);
			}
		},
		{	
			text : '<span class="mr-2">Edit</span><i class="fas fa-fw fa-edit"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-edit-submenu-management');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">delete</span><i class="fas fa-fw fa-trash"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-delete-submenu-management');
				$(node).attr('disabled', true);
			}
		}
	];

	menu_tableOptIndex['buttons'] = arrayPrepend(menu_tableBtnIndex, selectionExportBtn());
	submenu_tableOptIndex['buttons'] = arrayPrepend(submenu_tableBtnIndex, selectionExportBtn());

	menu_tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Name"},
		{data: "Icon"},
		{data: "Path"},
		{data: "Filename"},
		{data: "Submenu"},
		{data: "Order No"},
		{data: "Status"},
	];

	submenu_tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Menu"},
		{data: "Name"},
		{data: "Path"},
		{data: "Filename"},
		{data: "Order No"},
		{data: "Status"},
	];

	menu_tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-menu-management-list');
		$(row).attr('data', data.data);
		$(row).attr('stg', false);
	};

	submenu_tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-submenu-management-list');
		$(row).attr('data', data.data);
		$(row).attr('stg', false);
	};

	menu_tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 5, 6, 7],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
			}
		},
		{
			"targets": [1, 2, 3, 4],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
			}
		}
	];

	submenu_tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 5, 6],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
			}
		},
		{
			"targets": [1, 2, 3, 4],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
			}
		}
	];

	let menu_dataTableIndex = $('#datatable-menu-management').DataTable(menu_tableOptIndex);
	let submenu_dataTableIndex = $('#datatable-submenu-management').DataTable(submenu_tableOptIndex);

	const selectMenuManagementList = (arr) => {
		const btnEdit = $("#btn-edit-menu-management");
		const btnDelete = $("#btn-delete-menu-management");

		let tables = $('[id^="select-menu-management-list"]');
		let isOn = 0;
		let shiftTable = 0;

		let x = 0;
		for (let i = 0; i < tables.length; i++) {
			if (menu_selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				isOn++;
				x++;
				menu_lastPressed = (i+1);
			} else {
				if (menu_ctrlPressed && !menu_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							menu_lastPressed = (i+1);
							x++;
						}
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!menu_ctrlPressed && !menu_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							
							x++;
							isOn++;
							menu_lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (menu_shiftPressed && !menu_ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						shiftTable = (i+1);
					}
				}

				if (!menu_shiftPressed) shiftTable = 0;
			}
		}

		// naik
		if (menu_lastPressed && shiftTable && menu_lastPressed > shiftTable) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (menu_lastPressed >= (i+1) && shiftTable <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					x++;
					isOn++;
				}
			}
		}

		// turun
		if (shiftTable > menu_lastPressed) {
			if (menu_lastPressed >= 1) menu_lastPressed --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= menu_lastPressed && i < shiftTable) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					x++;
					isOn++;
				}
			}
		}

		if (isOn == 0) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", true);

			menu_lastPressed = 0;
		}

		if (isOn == 1) {
			btnEdit.attr("disabled", false);
			btnDelete.attr("disabled", false);
		}

		if (isOn >= 2) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", false);
		}
	};

	const selectSubmenuManagementList = (arr) => {
		const btnEdit = $("#btn-edit-submenu-management");
		const btnDelete = $("#btn-delete-submenu-management");

		let tables = $('[id^="select-submenu-management-list"]');
		let isOn = 0;
		let shiftTable = 0;

		let x = 0;
		for (let i = 0; i < tables.length; i++) {
			if (submenu_selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				isOn++;
				x++;
				submenu_lastPressed = (i+1);
			} else {
				if (submenu_ctrlPressed && !submenu_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							submenu_lastPressed = (i+1);
							x++;
						}
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!submenu_ctrlPressed && !submenu_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							
							x++;
							isOn++;
							submenu_lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (submenu_shiftPressed && !submenu_ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						shiftTable = (i+1);
					}
				}

				if (!submenu_shiftPressed) shiftTable = 0;
			}
		}

		// naik
		if (submenu_lastPressed && shiftTable && submenu_lastPressed > shiftTable) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (submenu_lastPressed >= (i+1) && shiftTable <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					x++;
					isOn++;
				}
			}
		}

		// turun
		if (shiftTable > submenu_lastPressed) {
			if (submenu_lastPressed >= 1) submenu_lastPressed --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= submenu_lastPressed && i < shiftTable) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					x++;
					isOn++;
				}
			}
		}

		if (isOn == 0) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", true);

			submenu_lastPressed = 0;
		}

		if (isOn == 1) {
			btnEdit.attr("disabled", false);
			btnDelete.attr("disabled", false);
		}

		if (isOn >= 2) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", false);
		}
	}

	$(document).keydown(function(event){
		const tabMenu = $("#nav-menu-tab").attr("aria-selected");
		const tabSubmenu = $("#nav-submenu-tab").attr("aria-selected");

		if(event.which == "17" && tabMenu == "true") menu_ctrlPressed = true;
		if(event.which == "17" && tabSubmenu == "true") submenu_ctrlPressed = true;

		if(event.which == "16" && tabMenu == "true") menu_shiftPressed = true;
		if(event.which == "16" && tabSubmenu == "true") submenu_shiftPressed = true;

		if(menu_ctrlPressed && event.which == "65" && tabMenu == "true") menu_selectAll = true;
		if(submenu_ctrlPressed && event.which == "65" && tabSubmenu == "true") submenu_selectAll = true;

		if (tabMenu == "true" && event.keyCode == 65 && event.ctrlKey && menu_selectAll && $("#modal-new-menu").attr('aria-hidden') == "true" && $("#modal-edit-menu").attr('aria-hidden') == "true") {
			textSelection('datatable-menu-management');
			event.preventDefault();
			selectMenuManagementList();
		}

		if (tabSubmenu == "true" && event.keyCode == 65 && event.ctrlKey && submenu_selectAll && $("#modal-new-submenu").attr('aria-hidden') == "true" && $("#modal-edit-submenu").attr('aria-hidden') == "true") {
			textSelection('datatable-submenu-management');
			event.preventDefault();
			selectSubmenuManagementList();
		}
	});

	$(document).keyup(function(){
		const tabMenu= $("#nav-menu-tab").attr("aria-selected");
		const tabSubmenu = $("#nav-submenu-tab").attr("aria-selected");

		if (tabMenu == "true") {
			menu_ctrlPressed = false;
			menu_shiftPressed = false;
			menu_selectAll = false;
		}

		if (tabSubmenu == "true") {
			submenu_ctrlPressed = false;
			submenu_shiftPressed = false;
			submenu_selectAll = false;
		}	
	});

	$(document).on('click', '[id^="select-menu-management-list"]', function () {
		const myData = $(this);

		selectMenuManagementList(myData);
	});

	$(document).on('click', '[id^="select-submenu-management-list"]', function () {
		const myData = $(this);

		selectSubmenuManagementList(myData);
	});

	$(document).ready(function () {
		const newSubmenuMenu = $("#new-submenu-menu");
		const editSubmenuMenu = $("#edit-submenu-menu");

		$(".air-badge").html(loadingBackdrop());

		const url = baseUrl("/auth/api/v6/get-all-data");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc_menu = [];
				let sc_submenu = [];

				let z = 0;
				for (let i = 0; i < obj.result.length; i++) {

					newSubmenuMenu.append(new Option(obj.result[i]['name'], obj.result[i]['id']));
					editSubmenuMenu.append(new Option(obj.result[i]['name'], obj.result[i]['id']));

					if (obj.result[i]['is_submenu']) {
						for (var x = 0; x < obj.result[i]['submenu'].length; x++) {
							sc_submenu[z] = {
								"No": (z+1),
								"Menu": obj.result[i]['submenu'][x]['menu'],
								"Name": obj.result[i]['submenu'][x]['name'],
								"Path": obj.result[i]['submenu'][x]['path'],
								"Filename": obj.result[i]['submenu'][x]['filename'],
								"Order No": obj.result[i]['submenu'][x]['order_no'],
								"Status": obj.result[i]['submenu'][x]['flag'],
								"data": obj.result[i]['submenu'][x]['id'],
							}

							z++;
						}
					}
					
					sc_menu[i] = {
						"No": (i+1),
						"Name": obj.result[i]['name'],
						"Icon": obj.result[i]['icon'],
						"Path": obj.result[i]['path'],
						"Filename": obj.result[i]['filename'],
						"Submenu": obj.result[i]['is_submenu'],
						"Order No": obj.result[i]['order_no'],
						"Status": obj.result[i]['flag'],
						"data": obj.result[i]['id'],
					};
				}

				menu_dataTableIndex.rows().remove();
				menu_dataTableIndex.rows.add(sc_menu).draw();

				submenu_dataTableIndex.rows().remove();
				submenu_dataTableIndex.rows.add(sc_submenu).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#new-menu-submenu").select2({
		dropdownParent: $('#select2-new-menu-submenu')
	});

	$("#new-menu-flag").select2({
		dropdownParent: $('#select2-new-menu-flag')
	});

	$("#edit-menu-submenu").select2({
		dropdownParent: $('#select2-edit-menu-submenu')
	});

	$("#edit-menu-flag").select2({
		dropdownParent: $('#select2-edit-menu-flag')
	});

	// =================================================
	$("#new-submenu-menu").select2({
		dropdownParent: $('#select2-new-submenu-menu')
	});

	$("#new-submenu-flag").select2({
		dropdownParent: $('#select2-new-submenu-flag')
	});

	$("#edit-submenu-menu").select2({
		dropdownParent: $('#select2-edit-submenu-menu')
	});

	$("#edit-submenu-flag").select2({
		dropdownParent: $('#select2-edit-submenu-flag')
	});

	$("#btn-new-menu-management").click(function () {
		const modal = $("#modal-new-menu");

		modal.modal('show');
	});

	$("#btn-new-submenu-management").click(function () {
		const modal = $("#modal-new-submenu");

		modal.modal('show');
	});

	$("#btn-edit-menu-management").click(function () {
		const modal = $("#modal-edit-menu");
		const btn = $("#btn-save-edit-menu");

		const menuName = $("#edit-menu-name");
		const menuIcon = $("#edit-menu-icon");
		const menuPath = $("#edit-menu-path");
		const menuFilename = $("#edit-menu-filename");
		const menuSubmenu = $("#edit-menu-submenu");
		const menuOrder = $("#edit-menu-order");
		const menuFlag = $("#edit-menu-flag");

		let tables = $('[id^="select-menu-management-list"]');
		let id = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id = tables.eq(i).attr('data');
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': id,
		};
		
		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v6/get-menu-by");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				menuSubmenu.select2({
					dropdownParent: $('#select2-edit-menu-submenu')
				}).val(obj.result['is_submenu']).trigger('change');

				menuFlag.select2({
					dropdownParent: $('#select2-edit-menu-flag')
				}).val(obj.result['flag']).trigger('change');

				menuName.val(obj.result['name']);
				menuIcon.val(obj.result['icon']);
				menuPath.val(obj.result['path']);
				menuFilename.val(obj.result['filename']);
				menuOrder.val(obj.result['order_no']);

				btn.attr('target', obj.result['id']);

				modal.modal('show');
				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-edit-submenu-management").click(function () {
		const modal = $("#modal-edit-submenu");
		const btn = $("#btn-save-edit-submenu");

		const submenuMenu = $("#edit-submenu-menu");
		const submenuName = $("#edit-submenu-name");
		const submenuPath = $("#edit-submenu-path");
		const submenuFilename = $("#edit-submenu-filename");
		const submenuOrder = $("#edit-submenu-order");
		const submenuFlag = $("#edit-submenu-flag");

		let tables = $('[id^="select-submenu-management-list"]');
		let id = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id = tables.eq(i).attr('data');
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': id,
		};
		
		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v6/get-submenu-by");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				submenuMenu.select2({
					dropdownParent: $('#select2-edit-submenu-menu')
				}).val(obj.result['menu']).trigger('change');

				submenuFlag.select2({
					dropdownParent: $('#select2-edit-submenu-flag')
				}).val(obj.result['flag']).trigger('change');

				submenuName.val(obj.result['name']);
				submenuPath.val(obj.result['path']);
				submenuFilename.val(obj.result['filename']);
				submenuOrder.val(obj.result['order_no']);

				btn.attr('target', obj.result['id']);

				modal.modal('show');
				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});	

	$("#btn-delete-menu-management").click(function () {
		const modal = $("#modal-delete-menu");
		const label = $(".info-delete-menu");
		const btn = $("#btn-save-delete-menu");

		let tables = $('[id^="select-menu-management-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(1).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	});

	$("#btn-delete-submenu-management").click(function () {
		const modal = $("#modal-delete-submenu");
		const label = $(".info-delete-submenu");
		const btn = $("#btn-save-delete-submenu");

		let tables = $('[id^="select-submenu-management-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(2).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	});

	$("#btn-save-new-menu").click(function () {
		const menuName = $("#new-menu-name");
		const menuIcon = $("#new-menu-icon");
		const menuPath = $("#new-menu-path");
		const menuFilename = $("#new-menu-filename");
		const menuSubmenu = $("#new-menu-submenu");
		const menuOrder = $("#new-menu-order");
		const menuFlag = $("#new-menu-flag");
		let allow = true;

		if (!inputValidation("#"+menuName.attr("id"), "#msg-"+menuName.attr("id"))) allow = false;
		if (!inputValidation("#"+menuIcon.attr("id"), "#msg-"+menuIcon.attr("id"))) allow = false;
		if (!inputValidation("#"+menuPath.attr("id"), "#msg-"+menuPath.attr("id"))) allow = false;
		if (!inputValidation("#"+menuFilename.attr("id"), "#msg-"+menuFilename.attr("id"))) allow = false;
		if (!select2Validation("#"+menuSubmenu.attr("id"), "#msg-"+menuSubmenu.attr("id"))) allow = false;
		if (!inputValidation("#"+menuOrder.attr("id"), "#msg-"+menuOrder.attr("id"))) allow = false;
		if (!select2Validation("#"+menuFlag.attr("id"), "#msg-"+menuFlag.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		const params = {
			"name" : menuName.val(), 
			"icon" : menuIcon.val(), 
			"path" : menuPath.val(), 
			"filename" : menuFilename.val(), 
			"submenu" : menuSubmenu.val(), 
			"order" : menuOrder.val(), 
			"flag" : menuFlag.val(), 
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v6/new-menu");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-save-new-submenu").click(function () {
		const submenuMenu = $("#new-submenu-menu");
		const submenuName = $("#new-submenu-name");
		const submenuPath = $("#new-submenu-path");
		const submenuFilename = $("#new-submenu-filename");
		const submenuOrder = $("#new-submenu-order");
		const submenuFlag = $("#new-submenu-flag");
		let allow = true;

		if (!select2Validation("#"+submenuMenu.attr("id"), "#msg-"+submenuMenu.attr("id"))) allow = false;
		if (!inputValidation("#"+submenuName.attr("id"), "#msg-"+submenuName.attr("id"))) allow = false;
		if (!inputValidation("#"+submenuPath.attr("id"), "#msg-"+submenuPath.attr("id"))) allow = false;
		if (!inputValidation("#"+submenuFilename.attr("id"), "#msg-"+submenuFilename.attr("id"))) allow = false;
		if (!inputValidation("#"+submenuOrder.attr("id"), "#msg-"+submenuOrder.attr("id"))) allow = false;
		if (!select2Validation("#"+submenuFlag.attr("id"), "#msg-"+submenuFlag.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		const params = {
			"menu" : submenuMenu.val(), 
			"name" : submenuName.val(), 
			"path" : submenuPath.val(), 
			"filename" : submenuFilename.val(), 
			"order" : submenuOrder.val(), 
			"flag" : submenuFlag.val(), 
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v6/new-submenu");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-save-new-menu").click(function () {
		const submenuMenu = $("#new-submenu-menu");
		const submenuName = $("#new-submenu-name");
		const submenuPath = $("#new-submenu-path");
		const submenuFilename = $("#new-submenu-filename");
		const submenuOrder = $("#new-submenu-order");
		const submenuFlag = $("#new-submenu-flag");
		let allow = true;

		if (!select2Validation("#"+submenuMenu.attr("id"), "#msg-"+submenuMenu.attr("id"))) allow = false;
		if (!inputValidation("#"+submenuName.attr("id"), "#msg-"+submenuName.attr("id"))) allow = false;
		if (!inputValidation("#"+submenuPath.attr("id"), "#msg-"+submenuPath.attr("id"))) allow = false;
		if (!inputValidation("#"+submenuFilename.attr("id"), "#msg-"+submenuFilename.attr("id"))) allow = false;
		if (!inputValidation("#"+submenuOrder.attr("id"), "#msg-"+submenuOrder.attr("id"))) allow = false;
		if (!select2Validation("#"+submenuFlag.attr("id"), "#msg-"+submenuFlag.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		const params = {
			"menu" : submenuMenu.val(), 
			"name" : submenuName.val(), 
			"path" : submenuPath.val(), 
			"filename" : submenuFilename.val(), 
			"order" : submenuOrder.val(), 
			"flag" : submenuFlag.val(), 
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v6/new-submenu");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-save-edit-menu").click(function () {
		const btn = $("#btn-save-edit-menu");
		const menuName = $("#edit-menu-name");
		const menuIcon = $("#edit-menu-icon");
		const menuPath = $("#edit-menu-path");
		const menuFilename = $("#edit-menu-filename");
		const menuSubmenu = $("#edit-menu-submenu");
		const menuOrder = $("#edit-menu-order");
		const menuFlag = $("#edit-menu-flag");
		let allow = true;

		if (!inputValidation("#"+menuName.attr("id"), "#msg-"+menuName.attr("id"))) allow = false;
		if (!inputValidation("#"+menuIcon.attr("id"), "#msg-"+menuIcon.attr("id"))) allow = false;
		if (!inputValidation("#"+menuPath.attr("id"), "#msg-"+menuPath.attr("id"))) allow = false;
		if (!inputValidation("#"+menuFilename.attr("id"), "#msg-"+menuFilename.attr("id"))) allow = false;
		if (!select2Validation("#"+menuSubmenu.attr("id"), "#msg-"+menuSubmenu.attr("id"))) allow = false;
		if (!inputValidation("#"+menuOrder.attr("id"), "#msg-"+menuOrder.attr("id"))) allow = false;
		if (!select2Validation("#"+menuFlag.attr("id"), "#msg-"+menuFlag.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		const params = {
			"target" : btn.attr('target'), 
			"name" : menuName.val(), 
			"icon" : menuIcon.val(), 
			"path" : menuPath.val(), 
			"filename" : menuFilename.val(), 
			"submenu" : menuSubmenu.val(), 
			"order" : menuOrder.val(), 
			"flag" : menuFlag.val(), 
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v6/edit-menu");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-save-edit-submenu").click(function () {
		const btn = $("#btn-save-edit-submenu");
		const submenuMenu = $("#edit-submenu-menu");
		const submenuName = $("#edit-submenu-name");
		const submenuPath = $("#edit-submenu-path");
		const submenuFilename = $("#edit-submenu-filename");
		const submenuOrder = $("#edit-submenu-order");
		const submenuFlag = $("#edit-submenu-flag");

		let allow = true;

		if (!select2Validation("#"+submenuMenu.attr("id"), "#msg-"+submenuMenu.attr("id"))) allow = false;
		if (!inputValidation("#"+submenuName.attr("id"), "#msg-"+submenuName.attr("id"))) allow = false;
		if (!inputValidation("#"+submenuPath.attr("id"), "#msg-"+submenuPath.attr("id"))) allow = false;
		if (!inputValidation("#"+submenuFilename.attr("id"), "#msg-"+submenuFilename.attr("id"))) allow = false;
		if (!inputValidation("#"+submenuOrder.attr("id"), "#msg-"+submenuOrder.attr("id"))) allow = false;
		if (!select2Validation("#"+submenuFlag.attr("id"), "#msg-"+submenuFlag.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		const params = {
			"target" : btn.attr('target'), 
			"menu" : submenuMenu.val(), 
			"name" : submenuName.val(), 
			"path" : submenuPath.val(), 
			"filename" : submenuFilename.val(), 
			"order" : submenuOrder.val(), 
			"flag" : submenuFlag.val(), 
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v6/edit-submenu");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-save-delete-menu").click(function () {
		const btn = $("#btn-save-delete-menu");
		const txt = btn.attr("data");

		$("#modal-delete-menu").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v6/delete-menu");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	})

	$("#btn-save-delete-submenu").click(function () {
		const btn = $("#btn-save-delete-submenu");
		const txt = btn.attr("data");

		$("#modal-delete-submenu").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v6/delete-submenu");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	})
}

const webSettings = () => {
	let newFileCandidate = null;
	let changeFileCandidate = null;
	let newAvatar = null;
	let changeAvatar = null;
	let fileInput = null;
	let myFile = null;
	let image = document.getElementById('image-cropper');
	let thumbnail = null;
	let fileName = null;
	let modalCropper = $("#modal-crop-image");
	let cropper = null;
	let TypeAction = null;
	let saveFile = null;
	let options = {
		dragMode: 'move',
		aspectRatio: 1,
		autoCropArea: 1,
		restore: false,
		guides: false,
		center: true,
		highlight: true,
		cropBoxMovable: false,
		cropBoxResizable: false,
		toggleDragModeOnDblclick: false,
	};

	$("#turn-image").click(function() {
		let turn = $("#turn-image");
		let label = $("#label-turn-image");
		let change = $("#change-choose-image");
		let msg = $("#msg-change-choose-image");

		if (turn.prop('checked')) {
			// label.text("Disabled change image");
			change.addClass("custom-input-file--2");
			change.attr("disabled", false);
			if (fileName) fileName.text("Choose a image");
		} else {
			// label.text("Enable change image");
			change.removeClass("is-invalid");
			change.removeClass("custom-input-file--2");
			msg.text("");
			change.attr("disabled", true);
			change.val("");
		}
	});

	$("#change-choose-image").click(function() {
		const choose = $(this);
		TypeAction = choose.attr("data-choose");
		fileInput = choose;

		if (TypeAction == "new") {
			fileName = $(".new-file-name");
			thumbnail = $("#new-img-thumbnail");
		}

		if (TypeAction == "change") {
			fileName = $(".change-file-name");
			thumbnail = $("#change-img-thumbnail");
		}

		fileName.text("Choose a image");
		fileInput.val("");
	});

	$("#change-choose-image").change(function() {
		myFile = fileInput.prop('files')[0];
		let cropImage = $("#image-cropper");
		let modal = $('#modal-crop-image');

		fileName.text("Choose a image");

		if (imgExtension(myFile) == false ) {
			$(".air-badge").html(airBadge("The file must be an image!" , 'danger'));
			return false;
		}

		const reader = new FileReader();
		reader.onload = function() {

			const img = new Image;
			img.onload = function() {
				if (img.width > 5000 && img.height > 5000) {
					fileInput.val("");
					$(".air-badge").html(airBadge("Upload JPG or PNG image. 5000 x 5000 required!" , 'danger'));
				}
				cropImage.attr('src', reader.result);

				if (cropper) {
					cropper.destroy();
					cropper = null;
				}

				modal.modal('show');
			};

			img.onerror = function() {
				fileInput.val("");
				$(".air-badge").html(airBadge("Malicious files detected!" , 'danger'));
			};
			img.src = reader.result;
		}
		reader.readAsDataURL(myFile);
	});

	modalCropper.on('shown.bs.modal', function () {
		cropper = new Cropper(image, options);
	});

	$("#rotate-l").click(function() {
		cropper.rotate(-90);
	});

	$("#rotate-r").click(function() {
		cropper.rotate(90);
	});

	$("#scale-l-r").click(function() {
		let dataScale = this.getAttribute('data-scale');

		if (this.getAttribute('data-scale') == "true") {
			cropper.scale(-1, 1);
			this.setAttribute('data-scale', false);
		} else {
			cropper.scale(1, 1);
			this.setAttribute('data-scale', true);
		}
	});

	$("#crop-image").click(function() {
		let finish = cropper.getCroppedCanvas({
			width: 1500,
			height: 1500,
			minWidth: 1000,
			minHeight: 1000,
			maxWidth: 1500,
			maxHeight: 1500,
			imageSmoothingEnabled: false,
			imageSmoothingQuality: 'high',
		});

		let blobBin = atob(finish.toDataURL().split(',')[1]);
		let array = [];
		for(let i = 0; i < blobBin.length; i++) {
			array.push(blobBin.charCodeAt(i));
		}
		let avatarFile = new Blob([new Uint8Array(array)], {type: 'image/png'});

		fileName.text(myFile.name);
		thumbnail.attr("src", finish.toDataURL());
		modalCropper.modal("hide");

		if (TypeAction == "new") {
			newFileCandidate = fileInput;
			newAvatar = avatarFile;
		}

		if (TypeAction == "change") {
			changeFileCandidate = fileInput;
			changeAvatar = avatarFile;
		}
	});

	$("#save-web-setting").click(function () {
		const title = $("#set-web-title");
		const brand = $("#set-web-brand");
		const description = $("#set-web-description");

		const turnImage = $("#turn-image");
		const changeImage = $("#change-choose-image");
		const nameFile = $(".change-file-name");

		let allow = true;
		let onFile = null;
		let formData = null;

		if (!inputValidation("#"+title.attr('id'), "#msg-"+title.attr('id'))) allow =false;
		if (!inputValidation("#"+brand.attr('id'), "#msg-"+brand.attr('id'))) allow =false;
		if (!inputValidation("#"+description.attr('id'), "#msg-"+description.attr('id'))) allow =false;
		if (turnImage.prop("checked")) {
			if (!filterImage("#"+changeImage.attr("id"), "#msg-"+changeImage.attr("id"), "."+nameFile.attr("class"))) allow = false;
			if (!changeFileCandidate || !changeFileCandidate.prop('files').length == 1) {
				$("#msg-"+changeImage.attr("id")).text("Please choose a image!");
				nameFile.text("Choose a image");
				changeImage.removeClass('is-valid');
				changeImage.addClass('is-invalid');
				allow = false;
			}
		}

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		let params = {
			'title': title.val().trim(),
			'brand': brand.val().trim(),
			'description': description.val().trim(),
		};

		if (turnImage.prop("checked")) {
			params['on-image'] = turnImage.prop("checked");
			formData = new FormData();
			formData.append('data', JEncrypt(JSON.stringify(params)));
			formData.append('icon', changeAvatar, changeFileCandidate.prop('files')[0].name);
			onFile = true;
		} else {
			formData = {
				'data' : JEncrypt(JSON.stringify(params)),
			}
			onFile = false;
		}

		const url = baseUrl("/auth/api/v8/set-web-setting");
		const execute = postField(url, 'POST', formData, false, onFile);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#switch-maintenance").change(function () {
		const sw = $("#switch-maintenance");

		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': sw.prop("checked"),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v8/set-maintenance");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				// setTimeout(function() {
				// 	window.location = window.location.href;
				// }, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});
}

const userAccessMenu = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;

	let tableOptIndex = datatableOpt();

	let tableBtnIndex = [
		{	
			text : '<span class="mr-2">Add</span><i class="fas fa-fw fa-bars"></i>', 
			className: 'btn btn-info btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-detail-access-menu-management');
				$(node).attr('disabled', true);
			}
		}
	];

	tableOptIndex['buttons'] = arrayPrepend(tableBtnIndex, selectionExportBtn());

	tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Name"},
		{data: "Dept"},
		{data: "Role"},
	];

	tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-access-menu-management-list');
		$(row).attr('data', data.data);
		$(row).attr('stg', false);
	};

	tableOptIndex['columnDefs'] = [
		{
			"targets": [0],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
			}
		},
		{
			"targets": [1, 2, 3],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
			}
		}
	];

	let dataTableIndex = $('#datatable-access-menu-management').DataTable(tableOptIndex);

	const selectAccessMenuManagementList = (arr) => {
		const btnDetails = $("#btn-detail-access-menu-management");

		let tables = $('[id^="select-access-menu-management-list"]');
		let isOn = 0;
		let shiftTable = 0;

		for (let i = 0; i < tables.length; i++) {

			if (selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				isOn++;
				lastPressed = (i+1);
			} else {
				if (ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							isOn++;
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (shiftPressed && !ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						shiftTable = (i+1);
					}
				}

				if (!shiftPressed) shiftTable = 0;
			}
		}

		// naik
		if (lastPressed && shiftTable && lastPressed > shiftTable) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					isOn++;
				}
			}
		}

		// turun
		if (shiftTable > lastPressed) {
			if (lastPressed >= 1) lastPressed --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= lastPressed && i < shiftTable) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					isOn++;
				}
			}
		}

		if (isOn == 0) {
			btnDetails.attr("disabled", true);
			lastPressed = 0;
		}

		if (isOn == 1) {
			btnDetails.attr("disabled", false);
		}

		if (isOn >= 2) {
			btnDetails.attr("disabled", true);
		}
	}

	$(document).keydown(function(event){
		if(event.which == "17") ctrlPressed = true;
		if(event.which == "16") shiftPressed = true;
		if(ctrlPressed && event.which == "65") selectAll = true;

		if (event.keyCode == 65 && event.ctrlKey && selectAll && $("#modal-user-access-menu").attr("aria-hidden") == "true") {
			textSelection('datatable-access-menu-management');
			event.preventDefault();
			selectAccessMenuManagementList();
		}
	});

	$(document).keyup(function(){
		ctrlPressed = false;
		shiftPressed = false;
		selectAll = false;
	});

	$(document).on('click', '[id^="select-access-menu-management-list"]', function () {
		const myData = $(this);

		selectAccessMenuManagementList(myData);
	});

	$(document).ready(function () {

		$(".air-badge").html(loadingBackdrop());

		const url = baseUrl("/auth/api/v7/get-all-user-access-menu");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				let y = 0;
				for (let i = 0; i < obj.result.length; i++) {
					let nameTag = `
						<div class="media align-items-center">
	                        <div>
	                            <img alt="Image placeholder" src="${baseUrl("/assets/img/profiles/"+obj.result[i].img)}" class="avatar  rounded-circle">
	                        </div>
	                        <div class="media-body ml-4">
	                            <span class="name mb-0 text-sm">${obj.result[i].name} (${obj.result[i].username})</span>
	                        </div>
	                    </div>
					`;

					sc[y] = {
						"No": (i+1),
						"Name": nameTag,
						"Dept": obj.result[i].dept,
						"Role": obj.result[i].role,
						"data": obj.result[i].username,
					};

					y++;
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-detail-access-menu-management").click(function () {
		const modal = $("#modal-user-access-menu");
		const btn = $("#btn-save-user-access-menu");

		let tables = $('[id^="select-access-menu-management-list"]');
		let id = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id = tables.eq(i).attr('data');
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': id,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v7/get-user-access-menu-by");

		const execute = postField(url, 'POST', executePost, false);
		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				btn.attr('data', id);

				const menuList = $("#v-pills-tab");
				const menuContainList = $("#v-pills-tabContent");

				let scMenuList = "";
				let scContainMenuList = "";
				for (var i = 0; i < obj.result.length; i++) {
					scMenuList += `
						<li class="nav-item d-flex">
							<div class="custom-control custom-switch ml-3 mt-2">
								<input type="checkbox" class="custom-control-input" ${(obj.result[i]['flag'] == "1" ? " checked" : "")} id="menu-custom-${obj.result[i]['path']}" alt="${obj.result[i]['name']}" data="${obj.result[i]['menu_id']}" submenu="${obj.result[i]['is_submenu']}">
								<label class="custom-control-label" for="menu-custom-${obj.result[i]['path']}"></label>
							</div>
	                      <a class="nav-link ml-n3 px-4${(i == 0 ? " active" : "")}" href="#" id="v-pills-${obj.result[i]['path']}-tab" data-bs-toggle="pill" data-bs-target="#v-pills-${obj.result[i]['path']}" type="button" role="tab" aria-controls="v-pills-${obj.result[i]['path']}" aria-selected="${(i == 0 ? "true" : "false")}">${obj.result[i]['name']}</a>
	                    </li>
					`;

					let containMenu = "";

					if (obj.result[i]['is_submenu'] == "1") {
						containMenu = "<h3 class=\"text-dark mt-3\">"+obj.result[i]['name']+"</h3>"
						for (var x = 0; x < obj.result[i]['submenu'].length; x++) {
							containMenu += `
								<div class="custom-control custom-switch">
								  <input type="checkbox" ${(obj.result[i]['submenu'][x]['flag'] == "1" ? " checked" : "")} class="custom-control-input" id="submenu-custom-${obj.result[i]['path']}-${obj.result[i]['submenu'][x]['path']}" alt="${obj.result[i]['submenu'][x]['name']}" data="${obj.result[i]['submenu'][x]['submenu_id']}" menu="${obj.result[i]['menu_id']}">
								  <label class="custom-control-label" for="submenu-custom-${obj.result[i]['path']}-${obj.result[i]['submenu'][x]['path']}">${obj.result[i]['submenu'][x]['name']}</label>
								</div>
							`;
						}
					}

					if (obj.result[i]['is_submenu'] !== "1") {
						containMenu = "<h3 class=\"text-dark mt-3\">Submenu <span class=\"font-weight-bolder \">"+obj.result[i]['name']+"</span> not available!</h3>"
					}

					scContainMenuList += `
						<div class="tab-pane fade show ${(i == 0 ? " active" : "")}" id="v-pills-${obj.result[i]['path']}" role="tabpanel" aria-labelledby="v-pills-${obj.result[i]['path']}-tab" tabindex="0">
	                      <div class="mt-2 ml-3">

	                        ${containMenu}
	                      </div>
	                    </div>
					`;
				}

				menuList.html(scMenuList);
				menuContainList.html(scContainMenuList);

				$(".air-badge").html('');
				modal.modal('show');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-save-user-access-menu").click(function () {
		const modal = $("#modal-user-access-menu");
		const btn = $("#btn-save-user-access-menu");
		let menu = $('[id^="menu-custom"]');
		let submenu = $('[id^="submenu-custom"]');

		if (menu.length <= 0 || submenu.length <= 0) {
			$(".air-badge").html(airBadge("Error input parameter!" , 'danger'));
		}

		let params = {};

		params['data'] = {};
		params['target'] = btn.attr('data');

		for (let i = 0; i < menu.length; i++) {
			params['data'][i] = {};
			params['data'][i]['menu'] = menu.eq(i).attr('data');
			params['data'][i]['data'] = menu.eq(i).prop("checked");
			params['data'][i]['is-submenu'] = menu.eq(i).attr('submenu');
			params['data'][i]['submenu'] = {};

			if (menu.eq(i).attr('submenu') == "1") {
				let z = 0;
				for (let x = 0; x < submenu.length; x++) {
					if (submenu.eq(x).attr("menu") == menu.eq(i).attr('data')) {
						params['data'][i]['submenu'][z] = {};
						params['data'][i]['submenu'][z]['submenu'] = submenu.eq(x).attr("data");
						params['data'][i]['submenu'][z]['data'] = submenu.eq(x).prop("checked");

						z++;
					}
				}
			}
		}

		if (params['data'].length <= 0) {
			$(".air-badge").html(airBadge("Error input parameter!" , 'danger'));
		}

		modal.modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const executePost = {
			'data' : JSON.stringify(params),
		}

		const url = baseUrl("/auth/api/v7/setup-user-access-menu");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});
}

const managementConversionSms = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;

	let tableOptIndex = datatableOpt();

	let tableBtnIndex = [
		{	
			text : '<span class="mr-2">Add</span><i class="fas fa-fw fa-plus"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-new-management-conversion-sms');
				$(node).attr('disabled', false);
			}
		},
		{	
			text : '<span class="mr-2">Edit</span><i class="fas fa-fw fa-edit"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-edit-management-conversion-sms');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Delete</span><i class="fas fa-fw fa-trash"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-delete-management-conversion-sms');
				$(node).attr('disabled', true);
			}
		}
	];

	tableOptIndex['buttons'] = arrayPrepend(tableBtnIndex, selectionExportBtn());

	tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Customer"},
		{data: "COO"},
		{data: "Device"},
		{data: "Qty"},
		{data: "Nett Weight Carton"},
		{data: "Gross Weight Carton"},
		{data: "Qty Carton"},
		{data: "Carton Dimension"},
		{data: "Qty Inner"},
		{data: "Nett Weight PC"},
		{data: "Gross Weight PC"},
		{data: "Remark"},
	];

	tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-management-conversion-sms-list');
		$(row).attr('data', data.data);
		$(row).attr('stg', false);
	};

	tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 2],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
			}
		},
		{
			"targets": [1, 3, 4],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
			}
		}
	];

	let dataTableIndex = $('#datatable-management-conversion-sms').DataTable(tableOptIndex);

	const selectManagementConversionSmsList = (arr) => {
		const btnEdit = $("#btn-edit-management-conversion-sms");
		const btnDelete = $("#btn-delete-management-conversion-sms");

		let tables = $('[id^="select-management-conversion-sms-list"]');
		let isOn = 0;
		let shiftTable = 0;

		for (let i = 0; i < tables.length; i++) {

			if (selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				isOn++;
				lastPressed = (i+1);
			} else {
				if (ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							isOn++;
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (shiftPressed && !ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						shiftTable = (i+1);
					}
				}

				if (!shiftPressed) shiftTable = 0;
			}
		}

		// naik
		if (lastPressed && shiftTable && lastPressed > shiftTable) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					isOn++;
				}
			}
		}

		// turun
		if (shiftTable > lastPressed) {
			if (lastPressed >= 1) lastPressed --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= lastPressed && i < shiftTable) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					isOn++;
				}
			}
		}

		if (isOn == 0) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", true);
			lastPressed = 0;
		}

		if (isOn == 1) {
			btnEdit.attr("disabled", false);
			btnDelete.attr("disabled", false);
		}

		if (isOn >= 2) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", false);
		}
	}

	$(document).keydown(function(event){
		const modalAdd = $("#modal-new-management-conversion-sms");
		const modalEdit = $("#modal-edit-management-conversion-sms");
		if(event.which == "17") ctrlPressed = true;
		if(event.which == "16") shiftPressed = true;
		if(ctrlPressed && event.which == "65") selectAll = true;

		if (event.keyCode == 65 && event.ctrlKey && selectAll && modalAdd.attr('aria-hidden') == "true" && modalEdit.attr('aria-hidden') == "true") {
			textSelection('datatable-management-conversion-sms');
			event.preventDefault();
			selectManagementConversionSmsList();
		}
	});

	$(document).keyup(function(){
		ctrlPressed = false;
		shiftPressed = false;
		selectAll = false;
	});

	$(document).on('click', '[id^="select-management-conversion-sms-list"]', function () {
		const myData = $(this);

		selectManagementConversionSmsList(myData);
	});

	$(document).ready(function () {

		$(".air-badge").html(loadingBackdrop());

		const url = baseUrl("/auth/api/v10/get-all-conversion");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				let sc = [];
				let y = 0;
				for (let i = 0; i < obj.result.length; i++) {

					sc[y] = {
						"No": (i+1),
						"Customer": obj.result[i].customer,
						"COO": obj.result[i].no,
						"Device": obj.result[i].device,
						"Qty": obj.result[i].qty,
						"Nett Weight Carton": obj.result[i].nw_ctn,
						"Gross Weight Carton": obj.result[i].gw_ctn,
						"Qty Carton": obj.result[i].qty_carton,
						"Carton Dimension": obj.result[i].carton_dimension,
						"Qty Inner": obj.result[i].qty_inner,
						"Nett Weight PC": obj.result[i].nw_pc,
						"Gross Weight PC": obj.result[i].gw_pc,
						"Remark": obj.result[i].remark,
						"data": obj.result[i].id,
					};

					y++;
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#new-conversion-qty, #new-conversion-qtyc, #new-conversion-qty-inner, #new-conversion-nw-pc, #new-conversion-gw-pc").keypress(function() {
		return allowNumberic(this);
	});

	$("#edit-conversion-qty, #edit-conversion-qtyc, #edit-conversion-qty-inner, #edit-conversion-nw-pc, #edit-conversion-gw-pc").keypress(function() {
		return allowNumberic(this);
	});

	$("#new-conversion-qtyc, #new-conversion-nw-pc, #new-conversion-gw-pc").keyup(function () {
		const conversionQty = $("#new-conversion-qty");
		const conversionQtyc = $("#new-conversion-qtyc");
		const conversionNwc = $("#new-conversion-nwc");
		const conversionGwc = $("#new-conversion-gwc");

		const conversionNwPc = $("#new-conversion-nw-pc");
		const conversionGwPc = $("#new-conversion-gw-pc");

		let nw = (parseFloat(conversionQtyc.val()) * parseFloat(conversionNwPc.val())).toFixed(3);
		let gw = (parseFloat(conversionQtyc.val()) * parseFloat(conversionGwPc.val())).toFixed(3);

		conversionNwc.val(nw);
		conversionGwc.val(gw);
	});

	$("#edit-conversion-qtyc, #edit-conversion-nw-pc, #edit-conversion-gw-pc").keyup(function () {
		const conversionQty = $("#edit-conversion-qty");
		const conversionQtyc = $("#edit-conversion-qtyc");
		const conversionNwc = $("#edit-conversion-nwc");
		const conversionGwc = $("#edit-conversion-gwc");

		const conversionNwPc = $("#edit-conversion-nw-pc");
		const conversionGwPc = $("#edit-conversion-gw-pc");

		let nw = (parseFloat(conversionQtyc.val()) * parseFloat(conversionNwPc.val())).toFixed(3);
		let gw = (parseFloat(conversionQtyc.val()) * parseFloat(conversionGwPc.val())).toFixed(3);

		conversionNwc.val(nw);
		conversionGwc.val(gw);
	});

	$("#btn-new-management-conversion-sms").click(function () {
		const modal = $("#modal-new-management-conversion-sms");

		modal.modal('show');
	});

	$("#btn-edit-management-conversion-sms").click(function () {
		const modal = $("#modal-edit-management-conversion-sms");
		const btn = $("#btn-save-edit-management-conversion-sms");

		const conversionCustName = $("#edit-conversion-cust-name");
		const conversionCoo = $("#edit-conversion-coo");
		const conversionDevice = $("#edit-conversion-device");
		const conversionQty = $("#edit-conversion-qty");
		const conversionNwc = $("#edit-conversion-nwc");
		const conversionGwc = $("#edit-conversion-gwc");
		const conversionQtyc = $("#edit-conversion-qtyc");
		const conversionCartonDim = $("#edit-conversion-carton-dim");
		const conversionQtyInner = $("#edit-conversion-qty-inner");
		const conversionNwPc = $("#edit-conversion-nw-pc");
		const conversionGwPc = $("#edit-conversion-gw-pc");
		const conversionRemark = $("#edit-conversion-remark");

		let tables = $('[id^="select-management-conversion-sms-list"]');
		let id = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id = tables.eq(i).attr('data');
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': id,
		};
		
		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v10/load-conversion-data");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				conversionCustName.val(obj.result.customer);
				conversionCoo.val(obj.result.no);
				conversionDevice.val(obj.result.device);
				conversionQty.val(obj.result.qty);
				conversionNwc.val(obj.result.nw_ctn);
				conversionGwc.val(obj.result.gw_ctn);
				conversionQtyc.val(obj.result.qty_carton);
				conversionCartonDim.val(obj.result.carton_dimension);
				conversionQtyInner.val(obj.result.qty_inner);
				conversionNwPc.val(obj.result.nw_pc);
				conversionGwPc.val(obj.result.gw_pc);
				conversionRemark.val(obj.result.remark);


				btn.attr('target', obj.result.id);

				modal.modal('show');
				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-delete-management-conversion-sms").click(function () {
		const modal = $("#modal-delete-management-conversion-sms");
		const label = $(".info-delete-management-conversion-sms");
		const btn = $("#btn-save-delete-management-conversion-sms");

		let tables = $('[id^="select-management-conversion-sms-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(3).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	});

	$("#btn-save-new-management-conversion-sms").click(function () {
		const modal = $("#modal-new-management-conversion-sms");

		const conversionCustName = $("#new-conversion-cust-name");
		const conversionCoo = $("#new-conversion-coo");
		const conversionDevice = $("#new-conversion-device");
		const conversionQty = $("#new-conversion-qty");
		const conversionNwc = $("#new-conversion-nwc");
		const conversionGwc = $("#new-conversion-gwc");
		const conversionQtyc = $("#new-conversion-qtyc");
		const conversionCartonDim = $("#new-conversion-carton-dim");
		const conversionQtyInner = $("#new-conversion-qty-inner");
		const conversionNwPc = $("#new-conversion-nw-pc");
		const conversionGwPc = $("#new-conversion-gw-pc");
		const conversionRemark = $("#new-conversion-remark");
		let allow = true;

		if (!inputValidation("#"+conversionCustName.attr("id"), "#msg-"+conversionCustName.attr("id"))) allow = false;
		if (!inputValidation("#"+conversionCoo.attr("id"), "#msg-"+conversionCoo.attr("id"))) allow = false;
		if (!inputValidation("#"+conversionDevice.attr("id"), "#msg-"+conversionDevice.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionQty.attr("id"), "#msg-"+conversionQty.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionNwc.attr("id"), "#msg-"+conversionNwc.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionGwc.attr("id"), "#msg-"+conversionGwc.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionQtyc.attr("id"), "#msg-"+conversionQtyc.attr("id"))) allow = false;
		if (!inputValidation("#"+conversionCartonDim.attr("id"), "#msg-"+conversionCartonDim.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionQtyInner.attr("id"), "#msg-"+conversionQtyInner.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionNwPc.attr("id"), "#msg-"+conversionNwPc.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionGwPc.attr("id"), "#msg-"+conversionGwPc.attr("id"))) allow = false;
		if (!inputValidation("#"+conversionRemark.attr("id"), "#msg-"+conversionRemark.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());
		modal.modal('hide');

		const params = {
			'cust-name': conversionCustName.val(),
			'coo': conversionCoo.val(),
			'device': conversionDevice.val(),
			'qty': conversionQty.val(),
			'nwc': conversionNwc.val(),
			'gwc': conversionGwc.val(),
			'qtyc': conversionQtyc.val(),
			'cartond-im': conversionCartonDim.val(),
			'qty-inner': conversionQtyInner.val(),
			'nwpc': conversionNwPc.val(),
			'gwpc': conversionGwPc.val(),
			'remark': conversionRemark.val(),
		};

		const url = baseUrl("/auth/api/v10/new-conversion");
		const execute = postField(url, 'POST', params, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});

	$("#btn-save-edit-management-conversion-sms").click(function () {
		const modal = $("#modal-edit-management-conversion-sms");
		const btn = $("#btn-save-edit-management-conversion-sms");

		const conversionCustName = $("#edit-conversion-cust-name");
		const conversionCoo = $("#edit-conversion-coo");
		const conversionDevice = $("#edit-conversion-device");
		const conversionQty = $("#edit-conversion-qty");
		const conversionNwc = $("#edit-conversion-nwc");
		const conversionGwc = $("#edit-conversion-gwc");
		const conversionQtyc = $("#edit-conversion-qtyc");
		const conversionCartonDim = $("#edit-conversion-carton-dim");
		const conversionQtyInner = $("#edit-conversion-qty-inner");
		const conversionNwPc = $("#edit-conversion-nw-pc");
		const conversionGwPc = $("#edit-conversion-gw-pc");
		const conversionRemark = $("#edit-conversion-remark");
		let allow = true;

		if (!inputValidation("#"+conversionCustName.attr("id"), "#msg-"+conversionCustName.attr("id"))) allow = false;
		if (!inputValidation("#"+conversionCoo.attr("id"), "#msg-"+conversionCoo.attr("id"))) allow = false;
		if (!inputValidation("#"+conversionDevice.attr("id"), "#msg-"+conversionDevice.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionQty.attr("id"), "#msg-"+conversionQty.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionNwc.attr("id"), "#msg-"+conversionNwc.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionGwc.attr("id"), "#msg-"+conversionGwc.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionQtyc.attr("id"), "#msg-"+conversionQtyc.attr("id"))) allow = false;
		if (!inputValidation("#"+conversionCartonDim.attr("id"), "#msg-"+conversionCartonDim.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionQtyInner.attr("id"), "#msg-"+conversionQtyInner.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionNwPc.attr("id"), "#msg-"+conversionNwPc.attr("id"))) allow = false;
		if (!numberValidation("#"+conversionGwPc.attr("id"), "#msg-"+conversionGwPc.attr("id"))) allow = false;
		if (!inputValidation("#"+conversionRemark.attr("id"), "#msg-"+conversionRemark.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());
		modal.modal('hide');

		const params = {
			"target" : btn.attr('target'),
			'cust-name': conversionCustName.val(),
			'coo': conversionCoo.val(),
			'device': conversionDevice.val(),
			'qty': conversionQty.val(),
			'nwc': conversionNwc.val(),
			'gwc': conversionGwc.val(),
			'qtyc': conversionQtyc.val(),
			'cartond-im': conversionCartonDim.val(),
			'qty-inner': conversionQtyInner.val(),
			'nwpc': conversionNwPc.val(),
			'gwpc': conversionGwPc.val(),
			'remark': conversionRemark.val(),
		};

		const url = baseUrl("/auth/api/v10/edit-conversion");
		const execute = postField(url, 'POST', params, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});

	$("#btn-save-delete-management-conversion-sms").click(function () {
		const btn = $("#btn-save-delete-management-conversion-sms");
		const txt = btn.attr("data");

		$("#modal-delete-management-conversion-sms").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v10/delete-conversion");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	})
}

const managementKategoriBarang = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;

	let tableOptIndex = datatableOpt();

	let tableBtnIndex = [
		{	
			text : '<span class="mr-2">Add</span><i class="fas fa-fw fa-plus"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-new-management-kategori-barang');
				$(node).attr('disabled', false);
			}
		},
		{	
			text : '<span class="mr-2">Edit</span><i class="fas fa-fw fa-edit"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-edit-management-kategori-barang');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Delete</span><i class="fas fa-fw fa-trash"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-delete-management-kategori-barang');
				$(node).attr('disabled', true);
			}
		}
	];

	tableOptIndex['buttons'] = arrayPrepend(tableBtnIndex, selectionExportBtn());

	tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Categori"},
		{data: "Tipe Dokumen"},
		{data: "Kode Dokumen"},
		{data: "Nama"},
	];

	tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-management-kategori-barang-list');
		$(row).attr('data', data.data);
		$(row).attr('stg', false);
	};

	tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 2],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
			}
		},
		{
			"targets": [1, 3, 4],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
			}
		}
	];

	let dataTableIndex = $('#datatable-management-kategori-barang').DataTable(tableOptIndex);

	const selectManagementKategoriBarangList = (arr) => {
		const btnEdit = $("#btn-edit-management-kategori-barang");
		const btnDelete = $("#btn-delete-management-kategori-barang");

		let tables = $('[id^="select-management-kategori-barang-list"]');
		let isOn = 0;
		let shiftTable = 0;

		for (let i = 0; i < tables.length; i++) {

			if (selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				isOn++;
				lastPressed = (i+1);
			} else {
				if (ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							isOn++;
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (shiftPressed && !ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						shiftTable = (i+1);
					}
				}

				if (!shiftPressed) shiftTable = 0;
			}
		}

		// naik
		if (lastPressed && shiftTable && lastPressed > shiftTable) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					isOn++;
				}
			}
		}

		// turun
		if (shiftTable > lastPressed) {
			if (lastPressed >= 1) lastPressed --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= lastPressed && i < shiftTable) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					isOn++;
				}
			}
		}

		if (isOn == 0) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", true);
			lastPressed = 0;
		}

		if (isOn == 1) {
			btnEdit.attr("disabled", false);
			btnDelete.attr("disabled", false);
		}

		if (isOn >= 2) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", false);
		}
	}

	$("#new-category").select2({
		dropdownParent: $('#select2-new-category')
	});

	$("#edit-category").select2({
		dropdownParent: $('#select2-edit-category')
	});

	$("#new-doc-type").select2({
		dropdownParent: $('#select2-new-doc-type')
	});

	$("#edit-doc-type").select2({
		dropdownParent: $('#select2-edit-doc-type')
	});

	$(document).keydown(function(event){
		const modalAdd = $("#modal-new-management-kategori-barang");
		const modalEdit = $("#modal-edit-management-kategori-barang");
		if(event.which == "17") ctrlPressed = true;
		if(event.which == "16") shiftPressed = true;
		if(ctrlPressed && event.which == "65") selectAll = true;

		if (event.keyCode == 65 && event.ctrlKey && selectAll && modalAdd.attr('aria-hidden') == "true" && modalEdit.attr('aria-hidden') == "true") {
			textSelection('datatable-management-kategori-barang');
			event.preventDefault();
			selectManagementKategoriBarangList();
		}
	});

	$(document).keyup(function(){
		ctrlPressed = false;
		shiftPressed = false;
		selectAll = false;
	});

	$(document).on('click', '[id^="select-management-kategori-barang-list"]', function () {
		const myData = $(this);

		selectManagementKategoriBarangList(myData);
	});

	$(document).ready(function () {
		const newCategory = $("#new-category");
		const editCategory = $("#edit-category");

		$(".air-badge").html(loadingBackdrop());

		const url = baseUrl("/auth/api/v9/get-all-category");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				for (let i = 0; i < obj.result['category'].length; i++) {
					newCategory.append(new Option(obj.result['category'][i].replace("_", " ").toUpperCase(), obj.result['category'][i]));
					editCategory.append(new Option(obj.result['category'][i].replace("_", " ").toUpperCase(), obj.result['category'][i]));
				}

				let sc = [];
				let y = 0;
				for (let i = 0; i < obj.result['data'].length; i++) {

					sc[y] = {
						"No": (i+1),
						"Categori": obj.result['data'][i].doc_category,
						"Tipe Dokumen": obj.result['data'][i].doc_type,
						"Kode Dokumen": obj.result['data'][i].code,
						"Nama": obj.result['data'][i].name,
						"data": obj.result['data'][i].id,
					};

					y++;
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-new-management-kategori-barang").click(function () {
		const modal = $("#modal-new-management-kategori-barang");

		modal.modal('show');
	});

	$("#btn-edit-management-kategori-barang").click(function () {
		const modal = $("#modal-edit-management-kategori-barang");
		const btn = $("#btn-save-edit-management-kategori-barang");

		const newCategory = $("#edit-category");
		const newDocType = $("#edit-doc-type");
		const newDocCode = $("#edit-doc-code");
		const newDocName = $("#edit-doc-name");

		let tables = $('[id^="select-management-kategori-barang-list"]');
		let id = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id = tables.eq(i).attr('data');
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': id,
		};
		
		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v9/load-category-data");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				newCategory.select2({
					dropdownParent: $('#select2-edit-category')
				}).val(obj.result['data']['doc_category']).trigger('change.select2');

				newDocType.find('option').remove();
				newDocType.append(new Option('Choose a Tipe Dokumen', '', true, true));
				for (var i = 0; i < obj.result['doc-type'].length; i++) {
					newDocType.append(new Option(obj.result['doc-type'][i], obj.result['doc-type'][i]));
				}

				newDocType.select2({
					dropdownParent: $('#select2-edit-doc-type')
				}).val(obj.result['data']['doc_type']).trigger('change');

				newDocCode.val(obj.result['data']['code']);
				newDocName.val(obj.result['data']['name']);

				btn.attr('target', obj.result['data']['id']);

				modal.modal('show');
				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-delete-management-kategori-barang").click(function () {
		const modal = $("#modal-delete-management-kategori-barang");
		const label = $(".info-delete-management-kategori-barang");
		const btn = $("#btn-save-delete-management-kategori-barang");

		let tables = $('[id^="select-management-kategori-barang-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(0).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	});

	$("#new-category").change(function () {
		const docType = $("#new-doc-type");
		const data = $("#new-category");

		const params = {
			'category': data.val(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v9/get-doc-type");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				docType.find('option').remove();
				docType.append(new Option('Choose a Tipe Dokumen', '', true, true));

				for (var i = 0; i < obj.result.length; i++) {
					docType.append(new Option(obj.result[i], obj.result[i]));
				}

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#edit-category").change(function () {
		const docType = $("#edit-doc-type");
		const data = $("#edit-category");

		const params = {
			'category': data.val(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v9/get-doc-type");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				docType.find('option').remove();
				docType.append(new Option('Choose a Tipe Dokumen', '', true, true));

				for (var i = 0; i < obj.result.length; i++) {
					docType.append(new Option(obj.result[i], obj.result[i]));
				}

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-save-new-management-kategori-barang").click(function () {
		const modal = $("#modal-new-management-kategori-barang");
		const newCategory = $("#new-category");
		const newDocType = $("#new-doc-type");
		const newDocCode = $("#new-doc-code");
		const newDocName = $("#new-doc-name");

		let allow = true;
		if (!select2Validation("#"+newCategory.attr("id"), "#msg-"+newCategory.attr("id"))) allow = false;
		if (!select2Validation("#"+newDocType.attr("id"), "#msg-"+newDocType.attr("id"))) allow = false;
		if (!inputValidation("#"+newDocCode.attr("id"), "#msg-"+newDocCode.attr("id"))) allow = false;
		if (!inputValidation("#"+newDocName.attr("id"), "#msg-"+newDocName.attr("id"))) allow = false;

		if (!allow) return false;
		modal.modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			"category" : newCategory.val(),
			"doc-type" : newDocType.val(),
			"doc-code" : newDocCode.val(),
			"doc-name" : newDocName.val(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v9/new-category");

		const execute = postField(url, 'POST', executePost, false);

	    execute.done(function(result) {
	      let obj = JSON.parse(JSON.stringify(result));

	      if (obj.code == 200) {
	        $(".air-badge").html(airBadge(obj.msg , 'success'));
	        setTimeout(function() {
	          window.location = window.location.href;
	        }, 5000);
	      } else {
	        $(".air-badge").html(airBadge(obj.msg , 'danger'));
	      }
	    });

	    execute.fail(function() {
	      $(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
	    });
	});

	$("#btn-save-edit-management-kategori-barang").click(function () {
		const modal = $("#modal-edit-management-kategori-barang");
		const btn = $("#btn-save-edit-management-kategori-barang");
		
		const editCategory = $("#edit-category");
		const editDocType = $("#edit-doc-type");
		const editDocCode = $("#edit-doc-code");
		const editDocName = $("#edit-doc-name");

		let allow = true;
		if (!select2Validation("#"+editCategory.attr("id"), "#msg-"+editCategory.attr("id"))) allow = false;
		if (!select2Validation("#"+editDocType.attr("id"), "#msg-"+editDocType.attr("id"))) allow = false;
		if (!inputValidation("#"+editDocCode.attr("id"), "#msg-"+editDocCode.attr("id"))) allow = false;
		if (!inputValidation("#"+editDocName.attr("id"), "#msg-"+editDocName.attr("id"))) allow = false;

		if (!allow) return false;
		modal.modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			"target" : btn.attr('target'),
			"category" : editCategory.val(),
			"doc-type" : editDocType.val(),
			"doc-code" : editDocCode.val(),
			"doc-name" : editDocName.val(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v9/edit-category");

		const execute = postField(url, 'POST', executePost, false);

	    execute.done(function(result) {
	      let obj = JSON.parse(JSON.stringify(result));

	      if (obj.code == 200) {
	        $(".air-badge").html(airBadge(obj.msg , 'success'));
	        setTimeout(function() {
	          window.location = window.location.href;
	        }, 5000);
	      } else {
	        $(".air-badge").html(airBadge(obj.msg , 'danger'));
	      }
	    });

	    execute.fail(function() {
	      $(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
	    });
	});

	$("#btn-save-delete-management-kategori-barang").click(function () {
		const btn = $("#btn-save-delete-management-kategori-barang");
		const txt = btn.attr("data");

		$("#modal-delete-management-kategori-barang").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v9/delete-category");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	})
}

// ===============================================================================
const uploadBahanBaku = () => {
	$(document).ready(function () {
		$("#file-attach").attr("accept", "text/csv");

		$("#file-attach").click(function() {
			const choose = $(this);
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-upload');
			fileName.text("Choose a document");
			choose.val("");
		});

		$("#file-attach").change(function() {
			const choose = $(this);
			let myFile = choose.prop('files')[0];
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-file');
			fileName.text(myFile.name);
		});
	});

	$("#upload-bahan-baku").click(function () {
		const btn = $("#upload-bahan-baku");
		const myfile = $("#file-attach");
		let fileName = $("#name-file-attach");
		let iconName = $("#icon-file-attach");
		let allow = true;

		if (!inputValidation("#"+myfile.attr("id"), "#msg-"+myfile.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		let formData = new FormData();
		formData.append('doc-file', myfile.prop('files')[0]);

		const url = baseUrl("/auth/api/v2/upload-bahan-baku");

		const execute = postField(url, 'POST', formData, false, true);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				myfile.val('');
				myfile.removeClass('is-valid');
				iconName.attr('class', 'fa fa-upload');
				fileName.text("Choose a document");

				$(".air-badge").html(airBadge(obj.msg , 'success'));
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const uploadBarangJadi = () => {
	$(document).ready(function () {
		$("#file-attach").attr("accept", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		
		$("#file-attach").click(function() {
			const choose = $(this);
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-upload');
			fileName.text("Choose a document");
			choose.val("");
		});

		$("#file-attach").change(function() {
			const choose = $(this);
			let myFile = choose.prop('files')[0];
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-file');
			fileName.text(myFile.name);
		});
	});

	$("#upload-barang-jadi").click(function () {
		const btn = $("#upload-barang-jadi");
		const myfile = $("#file-attach");
		let fileName = $("#name-file-attach");
		let iconName = $("#icon-file-attach");
		let allow = true;

		if (!inputValidation("#"+myfile.attr("id"), "#msg-"+myfile.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		let formData = new FormData();
		formData.append('doc-file', myfile.prop('files')[0]);

		const url = baseUrl("/auth/api/v2/upload-barang-jadi");

		const execute = postField(url, 'POST', formData, false, true);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				myfile.val('');
				myfile.removeClass('is-valid');
				iconName.attr('class', 'fa fa-upload');
				fileName.text("Choose a document");

				$(".air-badge").html(airBadge(obj.msg , 'success'));
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const uploadMutasiMesin = () => {
	$(document).ready(function () {
		$("#file-attach").attr("accept", "text/csv");
		
		$("#file-attach").click(function() {
			const choose = $(this);
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-upload');
			fileName.text("Choose a document");
			choose.val("");
		});

		$("#file-attach").change(function() {
			const choose = $(this);
			let myFile = choose.prop('files')[0];
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-file');
			fileName.text(myFile.name);
		});
	});

	$("#upload-mutasi-mesin").click(function () {
		const btn = $("#upload-mutasi-mesin");
		const myfile = $("#file-attach");
		let fileName = $("#name-file-attach");
		let iconName = $("#icon-file-attach");
		let allow = true;

		if (!inputValidation("#"+myfile.attr("id"), "#msg-"+myfile.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		let formData = new FormData();
		formData.append('doc-file', myfile.prop('files')[0]);

		const url = baseUrl("/auth/api/v2/upload-mutasi-mesin");

		const execute = postField(url, 'POST', formData, false, true);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				myfile.val('');
				myfile.removeClass('is-valid');
				iconName.attr('class', 'fa fa-upload');
				fileName.text("Choose a document");

				$(".air-badge").html(airBadge(obj.msg , 'success'));
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const uploadPemasukanBarang = () => {
	$(document).ready(function () {
		$("#file-attach").attr("accept", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		
		$("#file-attach").click(function() {
			const choose = $(this);
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-upload');
			fileName.text("Choose a document");
			choose.val("");
		});

		$("#file-attach").change(function() {
			const choose = $(this);
			let myFile = choose.prop('files')[0];
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-file');
			fileName.text(myFile.name);
		});
	});

	$("#upload-pemasukan-barang").click(function () {
		const btn = $("#upload-pemasukan-barang");
		const myfile = $("#file-attach");
		let fileName = $("#name-file-attach");
		let iconName = $("#icon-file-attach");
		let allow = true;

		if (!inputValidation("#"+myfile.attr("id"), "#msg-"+myfile.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		let formData = new FormData();
		formData.append('doc-file', myfile.prop('files')[0]);

		const url = baseUrl("/auth/api/v2/upload-pemasukan");

		const execute = postField(url, 'POST', formData, false, true);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				myfile.val('');
				myfile.removeClass('is-valid');
				iconName.attr('class', 'fa fa-upload');
				fileName.text("Choose a document");

				$(".air-badge").html(airBadge(obj.msg , 'success'));
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const uploadPengeluaranBarang = () => {
	$(document).ready(function () {
		$("#file-attach").attr("accept", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		
		$("#file-attach").click(function() {
			const choose = $(this);
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-upload');
			fileName.text("Choose a document");
			choose.val("");
		});

		$("#file-attach").change(function() {
			const choose = $(this);
			let myFile = choose.prop('files')[0];
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-file');
			fileName.text(myFile.name);
		});
	});

	$("#upload-pengeluaran-barang").click(function () {
		const btn = $("#upload-pengeluaran-barang");
		const myfile = $("#file-attach");
		let fileName = $("#name-file-attach");
		let iconName = $("#icon-file-attach");
		let allow = true;

		if (!inputValidation("#"+myfile.attr("id"), "#msg-"+myfile.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		let formData = new FormData();
		formData.append('doc-file', myfile.prop('files')[0]);

		const url = baseUrl("/auth/api/v2/upload-pengeluaran");

		const execute = postField(url, 'POST', formData, false, true);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				myfile.val('');
				myfile.removeClass('is-valid');
				iconName.attr('class', 'fa fa-upload');
				fileName.text("Choose a document");

				$(".air-badge").html(airBadge(obj.msg , 'success'));
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const uploadRejectAndScrap = () => {
	$(document).ready(function () {
		$("#file-attach").attr("accept", "text/csv");
		
		$("#file-attach").click(function() {
			const choose = $(this);
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-upload');
			fileName.text("Choose a document");
			choose.val("");
		});

		$("#file-attach").change(function() {
			const choose = $(this);
			let myFile = choose.prop('files')[0];
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-file');
			fileName.text(myFile.name);
		});
	});

	$("#upload-reject-and-scrap").click(function () {
		const btn = $("#upload-reject-and-scrap");
		const myfile = $("#file-attach");
		let fileName = $("#name-file-attach");
		let iconName = $("#icon-file-attach");
		let allow = true;

		if (!inputValidation("#"+myfile.attr("id"), "#msg-"+myfile.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		let formData = new FormData();
		formData.append('doc-file', myfile.prop('files')[0]);

		const url = baseUrl("/auth/api/v2/upload-reject-and-scrap");

		const execute = postField(url, 'POST', formData, false, true);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				myfile.val('');
				myfile.removeClass('is-valid');
				iconName.attr('class', 'fa fa-upload');
				fileName.text("Choose a document");

				$(".air-badge").html(airBadge(obj.msg , 'success'));
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const uploadWip = () => {
	$(document).ready(function () {
		$("#file-attach").attr("accept", "text/csv");
		
		$("#file-attach").click(function() {
			const choose = $(this);
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-upload');
			fileName.text("Choose a document");
			choose.val("");
		});

		$("#file-attach").change(function() {
			const choose = $(this);
			let myFile = choose.prop('files')[0];
			let fileName = $("#name-file-attach");
			let iconName = $("#icon-file-attach");

			iconName.attr('class', 'fa fa-file');
			fileName.text(myFile.name);
		});
	});
	
	$("#upload-wip").click(function () {
		const btn = $("#upload-wip");
		const myfile = $("#file-attach");
		let fileName = $("#name-file-attach");
		let iconName = $("#icon-file-attach");
		let allow = true;

		if (!inputValidation("#"+myfile.attr("id"), "#msg-"+myfile.attr("id"))) allow = false;

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		let formData = new FormData();
		formData.append('doc-file', myfile.prop('files')[0]);

		const url = baseUrl("/auth/api/v2/upload-wip");

		const execute = postField(url, 'POST', formData, false, true);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				myfile.val('');
				myfile.removeClass('is-valid');
				iconName.attr('class', 'fa fa-upload');
				fileName.text("Choose a document");

				$(".air-badge").html(airBadge(obj.msg , 'success'));
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

// ==============================================================================
const laporanPemasukanBarang = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;

	let tableOptIndex = datatableOpt();

	if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
		let tableBtnIndex = [
			{	
				text : '<span class="mr-2">Update</span><i class="fas fa-fw fa-edit"></i>', 
				className: 'btn btn-info btn-sm mb-1',
				init: function(api, node, config) {
					$(node).removeClass('dt-button');
					$(node).attr('id', 'btn-modal-update-pemasukan');
					$(node).attr('disabled', true);
				}
			},
			selectionExportBtn(),
			{	
				text : '<span class="mr-2">Download Laporan</span><i class="fas fa-fw fa-download"></i>', 
				className: 'btn btn-primary btn-sm mb-1 float-lg-right float-xl-right',
				init: function(api, node, config) {
					$(node).removeClass('dt-button');
					$(node).attr('id', 'btn-download-format');
					$(node).attr('disabled', false);
				}
			}
		];
		tableOptIndex['buttons'] = tableBtnIndex;

		tableOptIndex['columns'] = [
			{data: "NO"},		
			{data: "JENIS DOKUMEN"},		
			{data: "NOMOR DAFTAR"},		
			{data: "TANGGAL DAFTAR"},		
			{data: "NO DOKUMEN PEMASUKAN BARANG"},		
			{data: "TANGGAL DOKUMEN"},		
			{data: "PEMASOK / PENGIRIM"},		
			{data: "SERI BARANG"},		
			{data: "KODE BARANG"},		
			{data: "NAMA BARANG"},		
			{data: "KATEGORI BARANG"},		
			{data: "JUMLAH"},		
			{data: "SATUAN"},		
			{data: "VALUTA"},		
			{data: "NILAI BARANG"},		
			{data: "DOKUMEN FILE"},		
			{data: "DIBUAT OLEH"},		
			{data: "TANGGAL DIBUAT"},		
			{data: "DIPERBAHARUI OLEH"},		
			{data: "TANGGAL DIPERBAHARUI"}		
		];

		tableOptIndex['createdRow'] = function (row, data, dataIndex) {
			$(row).attr('id', 'select-pemasukan-list');
			$(row).attr('data', data.data);
			$(row).attr('stg', false);
		};

		tableOptIndex['columnDefs'] = [
			{
				"targets": [0, 1, 15],
				"createdCell": function (td, cellData, rowData, row, col) {
					$(td).addClass("text-center");
				}
			},
		];
	} else {
		let tableBtnIndex = [
			{	
				text : '<span class="mr-2">Download Laporan</span><i class="fas fa-fw fa-download"></i>', 
				className: 'btn btn-primary btn-sm mb-1 float-lg-right float-xl-right',
				init: function(api, node, config) {
					$(node).removeClass('dt-button');
					$(node).attr('id', 'btn-download-format');
					$(node).attr('disabled', false);
				}
			}
		];
		// tableOptIndex['buttons'] = arrayPrepend(exportBtn(), tableBtnIndex);
		tableOptIndex['buttons'] = exportBtn();

		tableOptIndex['columns'] = [
			{data: "NO"},		
			{data: "JENIS DOKUMEN"},		
			{data: "NOMOR DAFTAR"},		
			{data: "TANGGAL DAFTAR"},		
			{data: "NO DOKUMEN PEMASUKAN BARANG"},		
			{data: "TANGGAL DOKUMEN"},		
			{data: "PEMASOK / PENGIRIM"},		
			{data: "SERI BARANG"},		
			{data: "KODE BARANG"},		
			{data: "NAMA BARANG"},		
			{data: "KATEGORI BARANG"},		
			{data: "JUMLAH"},		
			{data: "SATUAN"},		
			{data: "VALUTA"},		
			{data: "NILAI BARANG"},		
		];	
	}
	
	let dataTableIndex = $('#datatable-pemasukan-barang').DataTable(tableOptIndex);

	if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
		const selectPemasukanList = (arr) => {
			const btnEdit = $("#btn-modal-update-pemasukan");

			let tables = $('[id^="select-pemasukan-list"]');
			let isOn = 0;
			let shiftTable = 0;

			for (let i = 0; i < tables.length; i++) {

				if (selectAll) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");
					isOn++;
					lastPressed = (i+1);
				} else {
					if (ctrlPressed && !shiftPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							if (tables.eq(i).attr("stg") == "true") {
								tables.eq(i).attr("stg", false);
								tables.eq(i).removeClass("table-primary");
							} else {
								tables.eq(i).attr("stg", true);
								tables.eq(i).addClass("table-primary");
								lastPressed = (i+1);
							}
						}

						if (tables.eq(i).attr("stg") == "true") isOn++;
					}

					if (!ctrlPressed && !shiftPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							if (tables.eq(i).attr("stg") == "true") {
								tables.eq(i).attr("stg", false);
								tables.eq(i).removeClass("table-primary");
							} else {
								tables.eq(i).attr("stg", true);
								tables.eq(i).addClass("table-primary");
								isOn++;
								lastPressed = (i+1);
							}
						}

						if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						}
					}

					if (shiftPressed && !ctrlPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							shiftTable = (i+1);
						}
					}

					if (!shiftPressed) shiftTable = 0;
				}
			}

			// naik
			if (lastPressed && shiftTable && lastPressed > shiftTable) {
				for (let i = (tables.length-1); i >= 0; i--) {
					tables.eq(i).attr("stg", false);
					tables.eq(i).removeClass("table-primary");

					if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
						tables.eq(i).attr("stg", true);
						tables.eq(i).addClass("table-primary");	
						isOn++;
					}
				}
			}

			// turun
			if (shiftTable > lastPressed) {
				if (lastPressed >= 1) lastPressed --;
				for (let i = 0; i < tables.length; i++) {
					tables.eq(i).attr("stg", false);
					tables.eq(i).removeClass("table-primary");

					if (i >= lastPressed && i < shiftTable) {
						tables.eq(i).attr("stg", true);
						tables.eq(i).addClass("table-primary");	
						isOn++;
					}
				}
			}

			if (isOn == 0) {
				btnEdit.attr("disabled", true);
				lastPressed = 0;
			}

			if (isOn == 1) {
				btnEdit.attr("disabled", false);
			}

			if (isOn >= 2) {
				btnEdit.attr("disabled", true);
			}
		}

		$(document).keydown(function(event){
			if(event.which == "17") ctrlPressed = true;
			if(event.which == "16") shiftPressed = true;
			if(ctrlPressed && event.which == "65") selectAll = true;

			if (event.keyCode == 65 && event.ctrlKey && selectAll) {
				textSelection('datatable-pemasukan-list');
				event.preventDefault();
				selectPemasukanList();
			}
		});

		$(document).keyup(function(){
			ctrlPressed = false;
			shiftPressed = false;
			selectAll = false;
		});

		$(document).on('click', '[id^="select-pemasukan-list"]', function () {
			const myData = $(this);

			selectPemasukanList(myData);
		});

		$("#update-doc-type").select2({
			dropdownParent: $('#select2-update-doc-type')
		});

		$("#btn-modal-update-pemasukan").click(function () {
			const modal = $("#modal-update-pemasukan");

			const updateDocType = $("#update-doc-type");
			const updateNoRegister = $("#update-no-register");
			const updateDateRegister = $("#update-date-register");
			const updateDocInItem = $("#update-doc-in-item");
			const updateDateDoc = $("#update-date-doc");
			const updateSender = $("#update-sender");
			const updateSeriItem = $("#update-seri-item");
			const updateCodeItem = $("#update-code-item");
			const updateNameItem = $("#update-name-item");
			const updateQty = $("#update-qty");
			const updateUnit = $("#update-unit");
			const updateCurrency = $("#update-currency");
			const updateValueItem = $("#update-value-item");
			const updateCatItem = $("#update-cat-item");
			const updateDocFile = $("#update-doc-file");

			const btn = $("#btn-save-update-pemasukan");

			let tables = $('[id^="select-pemasukan-list"]');
			let id = false;

			for (let i = 0; i < tables.length; i++) {
				if (tables.eq(i).attr("stg") == "true") {
					id = tables.eq(i).attr('data');
					break;
				}
			}

			$(".air-badge").html(loadingBackdrop());
			const params = {
				'code': id,
			};

			const executePost = {
				'data' : JEncrypt(JSON.stringify(params)),
			}

			const url = baseUrl("/auth/api/v2/load-pemasukan");

			const execute = postField(url, 'POST', executePost, false);
			execute.done(function(result) {
				let obj = JSON.parse(JSON.stringify(result));

				if (obj.code == 200) {
					btn.attr('data', id);

					updateDocType.select2({
						dropdownParent: $('#select2-update-doc-type')
					}).val(obj.result.jenis_dok).trigger('change');

					updateNoRegister.val(obj.result.no_dok_pabean);
					updateDateRegister.val(obj.result.tgl_dok_pabean);
					updateDocInItem.val(obj.result.no_bukti_penerimaan_brg);
					updateDateDoc.val(obj.result.tgl_dok_pabean);
					updateSender.val(obj.result.pemasok);
					updateSeriItem.val(obj.result.seri_barang);
					updateCodeItem.val(obj.result.kode_barang);
					updateNameItem.val(obj.result.nama_barang);
					updateQty.val(obj.result.jumlah);
					updateUnit.val(obj.result.satuan);
					updateCurrency.val(obj.result.kode_valuta);
					updateValueItem.val(obj.result.nilai_brg);
					updateCatItem.val(obj.result.kategori_barang);
					updateDocFile.val((obj.result.doc_file !== "-" ? atob(obj.result.doc_file) : obj.result.doc_file));

					$(".air-badge").html('');
					modal.modal('show');
				} else {
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			});

			execute.fail(function() {
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			});
		});

		$("#btn-save-update-pemasukan").click(function () {
			const btn = $("#btn-save-update-pemasukan");
			const modal = $("#modal-update-pemasukan");

			const updateDocType = $("#update-doc-type");
			const updateNoRegister = $("#update-no-register");
			const updateDateRegister = $("#update-date-register");
			const updateDocInItem = $("#update-doc-in-item");
			const updateDateDoc = $("#update-date-doc");
			const updateSender = $("#update-sender");
			const updateSeriItem = $("#update-seri-item");
			const updateCodeItem = $("#update-code-item");
			const updateNameItem = $("#update-name-item");
			const updateQty = $("#update-qty");
			const updateUnit = $("#update-unit");
			const updateCurrency = $("#update-currency");
			const updateValueItem = $("#update-value-item");
			const updateCatItem = $("#update-cat-item");
			const updateDocFile = $("#update-doc-file");
			let allow = true;

			if (!select2Validation("#"+updateDocType.attr("id"), "#msg-"+updateDocType.attr("id"))) allow = false;
			if (!inputValidation("#"+updateNoRegister.attr("id"), "#msg-"+updateNoRegister.attr("id"))) allow = false;
			if (!inputValidation("#"+updateDateRegister.attr("id"), "#msg-"+updateDateRegister.attr("id"))) allow = false;
			if (!inputValidation("#"+updateDocInItem.attr("id"), "#msg-"+updateDocInItem.attr("id"))) allow = false;
			if (!inputValidation("#"+updateDateDoc.attr("id"), "#msg-"+updateDateDoc.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSender.attr("id"), "#msg-"+updateSender.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSeriItem.attr("id"), "#msg-"+updateSeriItem.attr("id"))) allow = false;
			if (!inputValidation("#"+updateCodeItem.attr("id"), "#msg-"+updateCodeItem.attr("id"))) allow = false;
			if (!inputValidation("#"+updateNameItem.attr("id"), "#msg-"+updateNameItem.attr("id"))) allow = false;
			if (!inputValidation("#"+updateQty.attr("id"), "#msg-"+updateQty.attr("id"))) allow = false;
			if (!inputValidation("#"+updateUnit.attr("id"), "#msg-"+updateUnit.attr("id"))) allow = false;
			if (!inputValidation("#"+updateCurrency.attr("id"), "#msg-"+updateCurrency.attr("id"))) allow = false;
			if (!inputValidation("#"+updateValueItem.attr("id"), "#msg-"+updateValueItem.attr("id"))) allow = false;
			if (!inputValidation("#"+updateCatItem.attr("id"), "#msg-"+updateCatItem.attr("id"))) allow = false;
			if (!inputValidation("#"+updateDocFile.attr("id"), "#msg-"+updateDocFile.attr("id"))) allow = false;

			if (!allow) return false;
			modal.modal('hide');
			$(".air-badge").html(loadingBackdrop());

			const params = {
				'target': btn.attr('data'),
				'doc-type' : updateDocType.val(),
				'no-register' : updateNoRegister.val(),
				'date-register' : updateDateRegister.val(),
				'doc-in-item' : updateDocInItem.val(),
				'date-doc' : updateDateDoc.val(),
				'sender' : updateSender.val(),
				'seri-item' : updateSeriItem.val(),
				'code-item' : updateCodeItem.val(),
				'name-item' : updateNameItem.val(),
				'qty' : updateQty.val(),
				'unit' : updateUnit.val(),
				'currency' : updateCurrency.val(),
				'value-item' : updateValueItem.val(),
				'cat-item' : updateCatItem.val(),
			};

			const executePost = {
				'data' : JEncrypt(JSON.stringify(params)),
				'doc-file' : btoa(updateDocFile.val()),
			}

			const url = baseUrl("/auth/api/v2/update-pemasukan");

			const execute = postField(url, 'POST', executePost, false);

			execute.done(function(result) {
				let obj = JSON.parse(JSON.stringify(result));

				if (obj.code == 200) {
					$(".air-badge").html(airBadge(obj.msg , 'success'));
					setTimeout(function() {
						window.location = window.location.href;
					}, 5000);
				} else {
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			});

			execute.fail(function() {
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			});
		});
	}

	$(document).ready(function () {
		const kodeDokumen = $("#kode-dokumen");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeDokumen.val() !== null) params['kode-dokumen'] = kodeDokumen.val();

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v2/get-pemasukan");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
						let tableBtn = "-";
						if (obj.result[i].doc_file !== "-") {
							tableBtn = `
								<div class="actions">
			                        <a href="${atob(obj.result[i].doc_file)}" target="_blank" class="action-item" data-toggle="tooltip" title="Quick view">
			                            <i class="fas fa-file"></i>
			                        </a>
			                    </div>
							`;
						}

						sc[i] = {
							"NO": (i+1),
							"JENIS DOKUMEN": obj.result[i].jenis_dok,
							"NOMOR DAFTAR": obj.result[i].no_dok_pabean,
							"TANGGAL DAFTAR": obj.result[i].tgl_dok_pabean,
							"NO DOKUMEN PEMASUKAN BARANG": obj.result[i].no_bukti_penerimaan_brg,
							"TANGGAL DOKUMEN": obj.result[i].tgl_dok_pabean,
							"PEMASOK / PENGIRIM": obj.result[i].pemasok,
							"SERI BARANG": obj.result[i].seri_barang,
							"KODE BARANG": obj.result[i].kode_barang,
							"NAMA BARANG": obj.result[i].nama_barang,
							"JUMLAH": obj.result[i].jumlah,
							"SATUAN": obj.result[i].satuan,
							"VALUTA": obj.result[i].kode_valuta,
							"NILAI BARANG": obj.result[i].nilai_brg,
							"KATEGORI BARANG": obj.result[i].kategori_barang,
							"DOKUMEN FILE": tableBtn,
							"DIBUAT OLEH": obj.result[i].created_by,
							"TANGGAL DIBUAT": obj.result[i].created_date,
							"DIPERBAHARUI OLEH": obj.result[i].update_by,
							"TANGGAL DIPERBAHARUI": obj.result[i].update_date,
							"data": obj.result[i].id,
						};
					} else {
						sc[i] = {
							"NO": (i+1),
							"JENIS DOKUMEN": obj.result[i].jenis_dok,
							"NOMOR DAFTAR": obj.result[i].no_dok_pabean,
							"TANGGAL DAFTAR": obj.result[i].tgl_dok_pabean,
							"NO DOKUMEN PEMASUKAN BARANG": obj.result[i].no_bukti_penerimaan_brg,
							"TANGGAL DOKUMEN": obj.result[i].tgl_dok_pabean,
							"PEMASOK / PENGIRIM": obj.result[i].pemasok,
							"SERI BARANG": obj.result[i].seri_barang,
							"KODE BARANG": obj.result[i].kode_barang,
							"NAMA BARANG": obj.result[i].nama_barang,
							"JUMLAH": obj.result[i].jumlah,
							"SATUAN": obj.result[i].satuan,
							"VALUTA": obj.result[i].kode_valuta,
							"NILAI BARANG": obj.result[i].nilai_brg,
							"KATEGORI BARANG": obj.result[i].kategori_barang,
						};
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				// $(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$(document).ready(function () {
		const kodeDokumen = $("#kode-dokumen");
		let updateDocType = null;
		if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") updateDocType = $("#update-doc-type");

		const url = baseUrl("/auth/api/v2/get-doc-type-pemasukan");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				for (let i = 0; i < obj.result.length; i++) {
					kodeDokumen.append(new Option(obj.result[i], obj.result[i]));
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") updateDocType.append(new Option(obj.result[i], obj.result[i]));
				}
				$(".air-badge").html('');
			} else {
				// $(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-download-format").click(function () {
		const kodeDokumen = $("#kode-dokumen");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
			'type': $(".main-js").attr('my-js'),
		};

		if (kodeDokumen.val() !== null) params['kode-dokumen'] = kodeDokumen.val();

		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl('/export/'+executePost));
	});

	$("#btn-search-docs").click(function () {
		const kodeDokumen = $("#kode-dokumen");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");
		const btn = $("#btn-search-docs");
		let allow = true;

		if (!inputValidation("#"+startPeriod.attr("id"), "#msg-"+startPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}
		if (!inputValidation("#"+endPeriod.attr("id"), "#msg-"+endPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());
		btn.removeClass("mb-4");
		startPeriod.removeClass("is-valid");
		endPeriod.removeClass("is-valid");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeDokumen.val() !== null) params['kode-dokumen'] = kodeDokumen.val();

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v2/get-pemasukan");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];


				for (let i = 0; i < obj.result.length; i++) {
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
						let tableBtn = "-";
						if (obj.result[i].doc_file !== "-") {
							tableBtn = `
								<div class="actions">
			                        <a href="${atob(obj.result[i].doc_file)}" target="_blank" class="action-item" data-toggle="tooltip" title="Quick view">
			                            <i class="fas fa-file"></i>
			                        </a>
			                    </div>
							`;
						}

						sc[i] = {
							"NO": (i+1),
							"JENIS DOKUMEN": obj.result[i].jenis_dok,
							"NOMOR DAFTAR": obj.result[i].no_dok_pabean,
							"TANGGAL DAFTAR": obj.result[i].tgl_dok_pabean,
							"NO DOKUMEN PEMASUKAN BARANG": obj.result[i].no_bukti_penerimaan_brg,
							"TANGGAL DOKUMEN": obj.result[i].tgl_dok_pabean,
							"PEMASOK / PENGIRIM": obj.result[i].pemasok,
							"SERI BARANG": obj.result[i].seri_barang,
							"KODE BARANG": obj.result[i].kode_barang,
							"NAMA BARANG": obj.result[i].nama_barang,
							"JUMLAH": obj.result[i].jumlah,
							"SATUAN": obj.result[i].satuan,
							"VALUTA": obj.result[i].kode_valuta,
							"NILAI BARANG": obj.result[i].nilai_brg,
							"KATEGORI BARANG": obj.result[i].kategori_barang,
							"DOKUMEN FILE": tableBtn,
							"DIBUAT OLEH": obj.result[i].created_by,
							"TANGGAL DIBUAT": obj.result[i].created_date,
							"DIPERBAHARUI OLEH": obj.result[i].update_by,
							"TANGGAL DIPERBAHARUI": obj.result[i].update_date,
							"data": obj.result[i].id,
						};
					} else {
						sc[i] = {
							"NO": (i+1),
							"JENIS DOKUMEN": obj.result[i].jenis_dok,
							"NOMOR DAFTAR": obj.result[i].no_dok_pabean,
							"TANGGAL DAFTAR": obj.result[i].tgl_dok_pabean,
							"NO DOKUMEN PEMASUKAN BARANG": obj.result[i].no_bukti_penerimaan_brg,
							"TANGGAL DOKUMEN": obj.result[i].tgl_dok_pabean,
							"PEMASOK / PENGIRIM": obj.result[i].pemasok,
							"SERI BARANG": obj.result[i].seri_barang,
							"KODE BARANG": obj.result[i].kode_barang,
							"NAMA BARANG": obj.result[i].nama_barang,
							"JUMLAH": obj.result[i].jumlah,
							"SATUAN": obj.result[i].satuan,
							"VALUTA": obj.result[i].kode_valuta,
							"NILAI BARANG": obj.result[i].nilai_brg,
							"KATEGORI BARANG": obj.result[i].kategori_barang,
						};
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const laporanPengeluaranBarang = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;

	let tableOptIndex = datatableOpt();
	
	if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
		let tableBtnIndex = [
			{	
				text : '<span class="mr-2">Update</span><i class="fas fa-fw fa-edit"></i>', 
				className: 'btn btn-info btn-sm mb-1',
				init: function(api, node, config) {
					$(node).removeClass('dt-button');
					$(node).attr('id', 'btn-modal-update-pengeluaran');
					$(node).attr('disabled', true);
				}
			},
			selectionExportBtn(),
			{	
				text : '<span class="mr-2">Download Laporan</span><i class="fas fa-fw fa-download"></i>', 
				className: 'btn btn-primary btn-sm mb-1 float-lg-right float-xl-right',
				init: function(api, node, config) {
					$(node).removeClass('dt-button');
					$(node).attr('id', 'btn-download-format');
					$(node).attr('disabled', false);
				}
			}
		];
		tableOptIndex['buttons'] = tableBtnIndex;

		tableOptIndex['columns'] = [
			{data: "NO"},	
			{data: "JENIS DOKUMEN"},	
			{data: "NOMOR DAFTAR"},	
			{data: "TANGGAL DAFTAR"},	
			{data: "NOMOR DOKUMEN PENGELUARAN BARANG"},	
			{data: "TANGGAL DOKUMEN"},	
			{data: "PEMBELI / PENERIMA"},	
			{data: "SERI BARANG"},	
			{data: "KODE BARANG"},	
			{data: "NAMA BARANG"},	
			{data: "KATEGORI BARANG"},	
			{data: "JUMLAH"},	
			{data: "SATUAN"},	
			{data: "VALUTA"},	
			{data: "NILAI BARANG"},	
			{data: "DOKUMEN FILE"},	
			{data: "DIBUAT OLEH"},	
			{data: "TANGGAL DIBUAT"},	
			{data: "DIPERBAHARUI OLEH"},	
			{data: "TANGGAL DIPERBAHARUI"},	
		];

		tableOptIndex['createdRow'] = function (row, data, dataIndex) {
			$(row).attr('id', 'select-pengeluaran-list');
			$(row).attr('data', data.data);
			$(row).attr('stg', false);
		};

		tableOptIndex['columnDefs'] = [
			{
				"targets": [0, 1, 15],
				"createdCell": function (td, cellData, rowData, row, col) {
					$(td).addClass("text-center");
				}
			},
		];
	} else {
		let tableBtnIndex = [
			{	
				text : '<span class="mr-2">Download Laporan</span><i class="fas fa-fw fa-download"></i>', 
				className: 'btn btn-primary btn-sm mb-1 float-lg-right float-xl-right',
				init: function(api, node, config) {
					$(node).removeClass('dt-button');
					$(node).attr('id', 'btn-download-format');
					$(node).attr('disabled', false);
				}
			}
		];
		// tableOptIndex['buttons'] = arrayPrepend(exportBtn(), tableBtnIndex);
		tableOptIndex['buttons'] = exportBtn();

		tableOptIndex['columns'] = [
			{data: "NO"},		
			{data: "JENIS DOKUMEN"},		
			{data: "NOMOR DAFTAR"},		
			{data: "TANGGAL DAFTAR"},		
			{data: "NOMOR DOKUMEN PENGELUARAN BARANG"},		
			{data: "TANGGAL DOKUMEN"},		
			{data: "PEMBELI / PENERIMA"},		
			{data: "SERI BARANG"},		
			{data: "KODE BARANG"},		
			{data: "NAMA BARANG"},		
			{data: "KATEGORI BARANG"},		
			{data: "JUMLAH"},		
			{data: "SATUAN"},		
			{data: "VALUTA"},		
			{data: "NILAI BARANG"}		
		];
	}

	let dataTableIndex = $('#datatable-pengeluaran-barang').DataTable(tableOptIndex);

	if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
		const selectPengeluaranList = (arr) => {
			const btnEdit = $("#btn-modal-update-pengeluaran");

			let tables = $('[id^="select-pengeluaran-list"]');
			let isOn = 0;
			let shiftTable = 0;

			for (let i = 0; i < tables.length; i++) {

				if (selectAll) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");
					isOn++;
					lastPressed = (i+1);
				} else {
					if (ctrlPressed && !shiftPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							if (tables.eq(i).attr("stg") == "true") {
								tables.eq(i).attr("stg", false);
								tables.eq(i).removeClass("table-primary");
							} else {
								tables.eq(i).attr("stg", true);
								tables.eq(i).addClass("table-primary");
								lastPressed = (i+1);
							}
						}

						if (tables.eq(i).attr("stg") == "true") isOn++;
					}

					if (!ctrlPressed && !shiftPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							if (tables.eq(i).attr("stg") == "true") {
								tables.eq(i).attr("stg", false);
								tables.eq(i).removeClass("table-primary");
							} else {
								tables.eq(i).attr("stg", true);
								tables.eq(i).addClass("table-primary");
								isOn++;
								lastPressed = (i+1);
							}
						}

						if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						}
					}

					if (shiftPressed && !ctrlPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							shiftTable = (i+1);
						}
					}

					if (!shiftPressed) shiftTable = 0;
				}
			}

			// naik
			if (lastPressed && shiftTable && lastPressed > shiftTable) {
				for (let i = (tables.length-1); i >= 0; i--) {
					tables.eq(i).attr("stg", false);
					tables.eq(i).removeClass("table-primary");

					if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
						tables.eq(i).attr("stg", true);
						tables.eq(i).addClass("table-primary");	
						isOn++;
					}
				}
			}

			// turun
			if (shiftTable > lastPressed) {
				if (lastPressed >= 1) lastPressed --;
				for (let i = 0; i < tables.length; i++) {
					tables.eq(i).attr("stg", false);
					tables.eq(i).removeClass("table-primary");

					if (i >= lastPressed && i < shiftTable) {
						tables.eq(i).attr("stg", true);
						tables.eq(i).addClass("table-primary");	
						isOn++;
					}
				}
			}

			if (isOn == 0) {
				btnEdit.attr("disabled", true);
				lastPressed = 0;
			}

			if (isOn == 1) {
				btnEdit.attr("disabled", false);
			}

			if (isOn >= 2) {
				btnEdit.attr("disabled", true);
			}
		}

		$(document).keydown(function(event){
			if(event.which == "17") ctrlPressed = true;
			if(event.which == "16") shiftPressed = true;
			if(ctrlPressed && event.which == "65") selectAll = true;

			if (event.keyCode == 65 && event.ctrlKey && selectAll) {
				textSelection('datatable-pengeluaran-list');
				event.preventDefault();
				selectPengeluaranList();
			}
		});

		$(document).keyup(function(){
			ctrlPressed = false;
			shiftPressed = false;
			selectAll = false;
		});

		$(document).on('click', '[id^="select-pengeluaran-list"]', function () {
			const myData = $(this);

			selectPengeluaranList(myData);
		});

		$("#update-doc-type").select2({
			dropdownParent: $('#select2-update-doc-type')
		});

		$("#btn-modal-update-pengeluaran").click(function () {
			const modal = $("#modal-update-pengeluaran");

			const updateDocType = $("#update-doc-type");
			const updateNoRegister = $("#update-no-register");
			const updateDateRegister = $("#update-date-register");
			const updateDocInItem = $("#update-doc-in-item");
			const updateDateDoc = $("#update-date-doc");
			const updateSender = $("#update-sender");
			const updateSeriItem = $("#update-seri-item");
			const updateCodeItem = $("#update-code-item");
			const updateNameItem = $("#update-name-item");
			const updateQty = $("#update-qty");
			const updateUnit = $("#update-unit");
			const updateCurrency = $("#update-currency");
			const updateValueItem = $("#update-value-item");
			const updateCatItem = $("#update-cat-item");
			const updateDocFile = $("#update-doc-file");

			const btn = $("#btn-save-update-pengeluaran");

			let tables = $('[id^="select-pengeluaran-list"]');
			let id = false;

			for (let i = 0; i < tables.length; i++) {
				if (tables.eq(i).attr("stg") == "true") {
					id = tables.eq(i).attr('data');
					break;
				}
			}

			$(".air-badge").html(loadingBackdrop());
			const params = {
				'code': id,
			};

			const executePost = {
				'data' : JEncrypt(JSON.stringify(params)),
			}

			const url = baseUrl("/auth/api/v2/load-pengeluaran");

			const execute = postField(url, 'POST', executePost, false);
			execute.done(function(result) {
				let obj = JSON.parse(JSON.stringify(result));

				if (obj.code == 200) {
					btn.attr('data', id);

					 // console.log(obj.result);

					updateDocType.select2({
						dropdownParent: $('#select2-update-doc-type')
					}).val(obj.result.documen).trigger('change');

					updateNoRegister.val(obj.result.custom);
					updateDateRegister.val(obj.result.custom_dat);
					updateDocInItem.val(obj.result.document_nu);
					updateDateDoc.val(obj.result.custom_dat);
					updateSender.val(obj.result.customer_name);
					updateSeriItem.val(obj.result.seri_barang);
					updateCodeItem.val(obj.result.product_number);
					updateNameItem.val(obj.result.material_desc);
					updateQty.val(obj.result.sales_quanti);
					updateUnit.val(obj.result.sale);
					updateCurrency.val(obj.result.kode_valuta);
					updateValueItem.val(obj.result.sales_revenu);
					updateCatItem.val(obj.result.kategori_barang);
					updateDocFile.val((obj.result.doc_file !== "-" ? atob(obj.result.doc_file) : obj.result.doc_file));

					$(".air-badge").html('');
					modal.modal('show');
				} else {
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			});

			execute.fail(function() {
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			});
		});

		$("#btn-save-update-pengeluaran").click(function () {
			const btn = $("#btn-save-update-pengeluaran");
			const modal = $("#modal-update-pengeluaran");

			const updateDocType = $("#update-doc-type");
			const updateNoRegister = $("#update-no-register");
			const updateDateRegister = $("#update-date-register");
			const updateDocInItem = $("#update-doc-in-item");
			const updateDateDoc = $("#update-date-doc");
			const updateSender = $("#update-sender");
			const updateSeriItem = $("#update-seri-item");
			const updateCodeItem = $("#update-code-item");
			const updateNameItem = $("#update-name-item");
			const updateQty = $("#update-qty");
			const updateUnit = $("#update-unit");
			const updateCurrency = $("#update-currency");
			const updateValueItem = $("#update-value-item");
			const updateCatItem = $("#update-cat-item");
			const updateDocFile = $("#update-doc-file");
			let allow = true;

			if (!select2Validation("#"+updateDocType.attr("id"), "#msg-"+updateDocType.attr("id"))) allow = false;
			if (!inputValidation("#"+updateNoRegister.attr("id"), "#msg-"+updateNoRegister.attr("id"))) allow = false;
			if (!inputValidation("#"+updateDateRegister.attr("id"), "#msg-"+updateDateRegister.attr("id"))) allow = false;
			if (!inputValidation("#"+updateDocInItem.attr("id"), "#msg-"+updateDocInItem.attr("id"))) allow = false;
			if (!inputValidation("#"+updateDateDoc.attr("id"), "#msg-"+updateDateDoc.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSender.attr("id"), "#msg-"+updateSender.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSeriItem.attr("id"), "#msg-"+updateSeriItem.attr("id"))) allow = false;
			if (!inputValidation("#"+updateCodeItem.attr("id"), "#msg-"+updateCodeItem.attr("id"))) allow = false;
			if (!inputValidation("#"+updateNameItem.attr("id"), "#msg-"+updateNameItem.attr("id"))) allow = false;
			if (!inputValidation("#"+updateQty.attr("id"), "#msg-"+updateQty.attr("id"))) allow = false;
			if (!inputValidation("#"+updateUnit.attr("id"), "#msg-"+updateUnit.attr("id"))) allow = false;
			if (!inputValidation("#"+updateCurrency.attr("id"), "#msg-"+updateCurrency.attr("id"))) allow = false;
			if (!inputValidation("#"+updateValueItem.attr("id"), "#msg-"+updateValueItem.attr("id"))) allow = false;
			if (!inputValidation("#"+updateCatItem.attr("id"), "#msg-"+updateCatItem.attr("id"))) allow = false;
			if (!inputValidation("#"+updateDocFile.attr("id"), "#msg-"+updateDocFile.attr("id"))) allow = false;

			if (!allow) return false;
			modal.modal('hide');
			$(".air-badge").html(loadingBackdrop());

			const params = {
				'target': btn.attr('data'),
				'doc-type' : updateDocType.val(),
				'no-register' : updateNoRegister.val(),
				'date-register' : updateDateRegister.val(),
				'doc-in-item' : updateDocInItem.val(),
				'date-doc' : updateDateDoc.val(),
				'sender' : updateSender.val(),
				'seri-item' : updateSeriItem.val(),
				'code-item' : updateCodeItem.val(),
				'name-item' : updateNameItem.val(),
				'qty' : updateQty.val(),
				'unit' : updateUnit.val(),
				'currency' : updateCurrency.val(),
				'value-item' : updateValueItem.val(),
				'cat-item' : updateCatItem.val(),
			};

			const executePost = {
				'data' : JEncrypt(JSON.stringify(params)),
				'doc-file' : btoa(updateDocFile.val()),
			}

			const url = baseUrl("/auth/api/v2/update-pengeluaran");

			const execute = postField(url, 'POST', executePost, false);

			execute.done(function(result) {
				let obj = JSON.parse(JSON.stringify(result));

				if (obj.code == 200) {
					$(".air-badge").html(airBadge(obj.msg , 'success'));
					setTimeout(function() {
						window.location = window.location.href;
					}, 5000);
				} else {
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			});

			execute.fail(function() {
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			});
		});
	}

	$(document).ready(function () {
		const kodeDokumen = $("#kode-dokumen");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeDokumen.val() !== null) params['kode-dokumen'] = kodeDokumen.val();

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v2/get-pengeluaran");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
						let tableBtn = "-";
						if (obj.result[i].doc_file !== "-") {
							tableBtn = `
								<div class="actions">
			                        <a href="${atob(obj.result[i].doc_file)}" target="_blank" class="action-item" data-toggle="tooltip" title="Quick view">
			                            <i class="fas fa-file"></i>
			                        </a>
			                    </div>
							`;
						}
						sc[i] = {
							"NO": (i+1),
							"JENIS DOKUMEN": obj.result[i].documen,
							"NOMOR DAFTAR": obj.result[i].custom,
							"TANGGAL DAFTAR": obj.result[i].custom_dat,
							"NOMOR DOKUMEN PENGELUARAN BARANG": obj.result[i].document_nu,
							// "TANGGAL DOKUMEN": obj.result[i].docement_d,
							"TANGGAL DOKUMEN": obj.result[i].custom_dat,
							"PEMBELI / PENERIMA": obj.result[i].customer_name,
							"SERI BARANG": obj.result[i].seri_barang,
							"KODE BARANG": obj.result[i].product_number,
							"NAMA BARANG": obj.result[i].material_desc,
							"KATEGORI BARANG": obj.result[i].kategori_barang,
							"JUMLAH": obj.result[i].sales_quanti,
							"SATUAN": obj.result[i].sale,
							"VALUTA": obj.result[i].kode_valuta,
							"NILAI BARANG": obj.result[i].sales_revenu,
							"DOKUMEN FILE": tableBtn,
							"DIBUAT OLEH": obj.result[i].created_by,
							"TANGGAL DIBUAT": obj.result[i].created_date,
							"DIPERBAHARUI OLEH": obj.result[i].update_by,
							"TANGGAL DIPERBAHARUI": obj.result[i].update_date,
							"data": obj.result[i].id,
						};
					} else {
						sc[i] = {
							"NO": (i+1),
							"JENIS DOKUMEN": obj.result[i].documen,
							"NOMOR DAFTAR": obj.result[i].custom,
							"TANGGAL DAFTAR": obj.result[i].custom_dat,
							"NOMOR DOKUMEN PENGELUARAN BARANG": obj.result[i].document_nu,
							// "TANGGAL DOKUMEN": obj.result[i].docement_d,
							"TANGGAL DOKUMEN": obj.result[i].custom_dat,
							"PEMBELI / PENERIMA": obj.result[i].customer_name,
							"SERI BARANG": obj.result[i].seri_barang,
							"KODE BARANG": obj.result[i].product_number,
							"NAMA BARANG": obj.result[i].material_desc,
							"KATEGORI BARANG": obj.result[i].kategori_barang,
							"JUMLAH": obj.result[i].sales_quanti,
							"SATUAN": obj.result[i].sale,
							"VALUTA": obj.result[i].kode_valuta,
							"NILAI BARANG": obj.result[i].sales_revenu,
						};
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				// $(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$(document).ready(function () {
		const kodeDokumen = $("#kode-dokumen");
		let updateDocType = null;
		if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") updateDocType = $("#update-doc-type");

		const url = baseUrl("/auth/api/v2/get-doc-type-pengeluaran");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				for (let i = 0; i < obj.result.length; i++) {
					kodeDokumen.append(new Option(obj.result[i], obj.result[i]));
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") updateDocType.append(new Option(obj.result[i], obj.result[i]));
				}
				$(".air-badge").html('');
			} else {
				// $(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-download-format").click(function () {
		const kodeDokumen = $("#kode-dokumen");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
			'type': $(".main-js").attr('my-js'),
		};

		if (kodeDokumen.val() !== null) params['kode-dokumen'] = kodeDokumen.val();

		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl('/export/'+executePost));
	});

	$("#btn-search-docs").click(function () {
		const kodeDokumen = $("#kode-dokumen");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");
		const btn = $("#btn-search-docs");
		let allow = true;

		if (!inputValidation("#"+startPeriod.attr("id"), "#msg-"+startPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}
		if (!inputValidation("#"+endPeriod.attr("id"), "#msg-"+endPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());
		btn.removeClass("mb-4");
		startPeriod.removeClass("is-valid");
		endPeriod.removeClass("is-valid");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeDokumen.val() !== null) params['kode-dokumen'] = kodeDokumen.val();

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v2/get-pengeluaran");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
						let tableBtn = "-";
						if (obj.result[i].doc_file !== "-") {
							tableBtn = `
								<div class="actions">
			                        <a href="${atob(obj.result[i].doc_file)}" target="_blank" class="action-item" data-toggle="tooltip" title="Quick view">
			                            <i class="fas fa-file"></i>
			                        </a>
			                    </div>
							`;
						}
						sc[i] = {
							"NO": (i+1),
							"JENIS DOKUMEN": obj.result[i].documen,
							"NOMOR DAFTAR": obj.result[i].custom,
							"TANGGAL DAFTAR": obj.result[i].custom_dat,
							"NOMOR DOKUMEN PENGELUARAN BARANG": obj.result[i].document_nu,
							// "TANGGAL DOKUMEN": obj.result[i].docement_d,
							"TANGGAL DOKUMEN": obj.result[i].custom_dat,
							"PEMBELI / PENERIMA": obj.result[i].customer_name,
							"SERI BARANG": obj.result[i].seri_barang,
							"KODE BARANG": obj.result[i].product_number,
							"NAMA BARANG": obj.result[i].material_desc,
							"KATEGORI BARANG": obj.result[i].kategori_barang,
							"JUMLAH": obj.result[i].sales_quanti,
							"SATUAN": obj.result[i].sale,
							"VALUTA": obj.result[i].kode_valuta,
							"NILAI BARANG": obj.result[i].sales_revenu,
							"DOKUMEN FILE": tableBtn,
							"DIBUAT OLEH": obj.result[i].created_by,
							"TANGGAL DIBUAT": obj.result[i].created_date,
							"DIPERBAHARUI OLEH": obj.result[i].update_by,
							"TANGGAL DIPERBAHARUI": obj.result[i].update_date,
							"data": obj.result[i].id,
						};
					} else {
						sc[i] = {
							"NO": (i+1),
							"JENIS DOKUMEN": obj.result[i].documen,
							"NOMOR DAFTAR": obj.result[i].custom,
							"TANGGAL DAFTAR": obj.result[i].custom_dat,
							"NOMOR DOKUMEN PENGELUARAN BARANG": obj.result[i].document_nu,
							// "TANGGAL DOKUMEN": obj.result[i].docement_d,
							"TANGGAL DOKUMEN": obj.result[i].custom_dat,
							"PEMBELI / PENERIMA": obj.result[i].customer_name,
							"SERI BARANG": obj.result[i].seri_barang,
							"KODE BARANG": obj.result[i].product_number,
							"NAMA BARANG": obj.result[i].material_desc,
							"KATEGORI BARANG": obj.result[i].kategori_barang,
							"JUMLAH": obj.result[i].sales_quanti,
							"SATUAN": obj.result[i].sale,
							"VALUTA": obj.result[i].kode_valuta,
							"NILAI BARANG": obj.result[i].sales_revenu,
						};
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const laporanWip = () => {
	let tableOptIndex = datatableOpt();

	tableOptIndex['buttons'] = exportBtn();

	tableOptIndex['columns'] = [
		{data: "NO"},	
		{data: "KODE BARANG"},	
		{data: "NAMA BARANG"},	
		{data: "SAT"},	
		{data: "JUMLAH"},	
		{data: "STATUS"},	
		{data: "AREA"},	
	];

	let dataTableIndex = $('#datatable-wip').DataTable(tableOptIndex);

	$(document).ready(function () {
		const kodeBarang = $("#kode-barang");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeBarang.val() !== null) params['kode-barang'] = kodeBarang.val();
		$(".air-badge").html(loadingBackdrop());

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}
		const url = baseUrl("/auth/api/v2/get-wip");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));
			if (obj.code == 200) {
				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					sc[i] = {
						"NO": (i+1),
						"KODE BARANG": obj.result[i].prod_code,
						"NAMA BARANG": obj.result[i].prod_name,
						"SAT": obj.result[i].sat,
						"JUMLAH": obj.result[i].jumlah,
						"STATUS": obj.result[i].status,
						"AREA": obj.result[i].area,
					};

				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-search-docs").click(function () {
		const kodeBarang = $("#kode-barang");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");
		const btn = $("#btn-search-docs");
		let allow = true;

		if (!inputValidation("#"+startPeriod.attr("id"), "#msg-"+startPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}
		if (!inputValidation("#"+endPeriod.attr("id"), "#msg-"+endPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());
		btn.removeClass("mb-4");
		startPeriod.removeClass("is-valid");
		endPeriod.removeClass("is-valid");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeBarang.val() !== null) params['kode-barang'] = kodeBarang.val();

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v2/get-wip");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					sc[i] = {
						"NO": (i+1),
						"KODE BARANG": obj.result[i].prod_code,
						"NAMA BARANG": obj.result[i].prod_name,
						"SAT": obj.result[i].sat,
						"JUMLAH": obj.result[i].jumlah,
						"STATUS": obj.result[i].status,
						"AREA": obj.result[i].area,
					};
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const laporanBahanBaku = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;
	let tableOptIndex = datatableOpt();

	if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
		let tableBtnIndex = [
			{	
				text : '<span class="mr-2">Update</span><i class="fas fa-fw fa-edit"></i>', 
				className: 'btn btn-info btn-sm mb-1',
				init: function(api, node, config) {
					$(node).removeClass('dt-button');
					$(node).attr('id', 'btn-modal-update-bahan-baku');
					$(node).attr('disabled', true);
				}
			},
			selectionExportBtn()
		];
		tableOptIndex['buttons'] = tableBtnIndex;

		tableOptIndex['columns'] = [
			{data: "NO"},
			{data: "KODE BARANG"},
			{data: "NAMA BARANG"},
			{data: "SAT"},
			{data: "SALDO AWAL"},
			{data: "PEMASUKAN"},
			{data: "PENGELUARAN"},
			{data: "PENYESUAIAN (ADJUSTMENT)"},
			{data: "SALDO AKHIR"},
			{data: "STOCK OPNAME"},
			{data: "SELISIH"},
			{data: "KETERANGAN"},	
			{data: "DIBUAT OLEH"},		
			{data: "TANGGAL DIBUAT"},		
			{data: "DIPERBAHARUI OLEH"},		
			{data: "TANGGAL DIPERBAHARUI"}		
		];

		tableOptIndex['createdRow'] = function (row, data, dataIndex) {
			$(row).attr('id', 'select-bahan-baku-list');
			$(row).attr('data', data.data);
			$(row).attr('stg', false);
		};

		tableOptIndex['columnDefs'] = [
			{
				"targets": [0, 1, 15],
				"createdCell": function (td, cellData, rowData, row, col) {
					$(td).addClass("text-center");
				}
			},
		];
	} else {
		tableOptIndex['buttons'] = exportBtn();

		tableOptIndex['columns'] = [
			{data: "NO"},
			{data: "KODE BARANG"},
			{data: "NAMA BARANG"},
			{data: "SAT"},
			{data: "SALDO AWAL"},
			{data: "PEMASUKAN"},
			{data: "PENGELUARAN"},
			{data: "PENYESUAIAN (ADJUSTMENT)"},
			{data: "SALDO AKHIR"},
			{data: "STOCK OPNAME"},
			{data: "SELISIH"},
			{data: "KETERANGAN"},
		];
	}

	let dataTableIndex = $('#datatable-bahan-baku').DataTable(tableOptIndex);

	if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
		const selectBahanBakuList = (arr) => {
			const btnEdit = $("#btn-modal-update-bahan-baku");

			let tables = $('[id^="select-bahan-baku-list"]');
			let isOn = 0;
			let shiftTable = 0;

			for (let i = 0; i < tables.length; i++) {

				if (selectAll) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");
					isOn++;
					lastPressed = (i+1);
				} else {
					if (ctrlPressed && !shiftPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							if (tables.eq(i).attr("stg") == "true") {
								tables.eq(i).attr("stg", false);
								tables.eq(i).removeClass("table-primary");
							} else {
								tables.eq(i).attr("stg", true);
								tables.eq(i).addClass("table-primary");
								lastPressed = (i+1);
							}
						}

						if (tables.eq(i).attr("stg") == "true") isOn++;
					}

					if (!ctrlPressed && !shiftPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							if (tables.eq(i).attr("stg") == "true") {
								tables.eq(i).attr("stg", false);
								tables.eq(i).removeClass("table-primary");
							} else {
								tables.eq(i).attr("stg", true);
								tables.eq(i).addClass("table-primary");
								isOn++;
								lastPressed = (i+1);
							}
						}

						if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						}
					}

					if (shiftPressed && !ctrlPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							shiftTable = (i+1);
						}
					}

					if (!shiftPressed) shiftTable = 0;
				}
			}

			// naik
			if (lastPressed && shiftTable && lastPressed > shiftTable) {
				for (let i = (tables.length-1); i >= 0; i--) {
					tables.eq(i).attr("stg", false);
					tables.eq(i).removeClass("table-primary");

					if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
						tables.eq(i).attr("stg", true);
						tables.eq(i).addClass("table-primary");	
						isOn++;
					}
				}
			}

			// turun
			if (shiftTable > lastPressed) {
				if (lastPressed >= 1) lastPressed --;
				for (let i = 0; i < tables.length; i++) {
					tables.eq(i).attr("stg", false);
					tables.eq(i).removeClass("table-primary");

					if (i >= lastPressed && i < shiftTable) {
						tables.eq(i).attr("stg", true);
						tables.eq(i).addClass("table-primary");	
						isOn++;
					}
				}
			}

			if (isOn == 0) {
				btnEdit.attr("disabled", true);
				lastPressed = 0;
			}

			if (isOn == 1) {
				btnEdit.attr("disabled", false);
			}

			if (isOn >= 2) {
				btnEdit.attr("disabled", true);
			}
		}

		$(document).keydown(function(event){
			if(event.which == "17") ctrlPressed = true;
			if(event.which == "16") shiftPressed = true;
			// if(ctrlPressed && event.which == "65") selectAll = true;

			if (event.keyCode == 65 && event.ctrlKey && selectAll) {
				// textSelection('datatable-bahan-baku-list');
				event.preventDefault();
				selectBahanBakuList();
			}
		});

		$(document).keyup(function(){
			ctrlPressed = false;
			shiftPressed = false;
			selectAll = false;
		});

		$(document).on('click', '[id^="select-bahan-baku-list"]', function () {
			const myData = $(this);

			selectBahanBakuList(myData);
		});

		$("#btn-modal-update-bahan-baku").click(function () {
			const modal = $("#modal-update-bahan-baku");

			const updateKodeBarang = $("#update-kode-barang");
			const updateNamaBarang = $("#update-nama-barang");
			const updateSat = $("#update-sat");
			const updateSaldoAwal = $("#update-saldo-awal");
			const updatePemasukan = $("#update-pemasukan");
			const updatePengeluaran = $("#update-pengeluaran");
			const updatePenyesuaianAdjustment = $("#update-penyesuaian-adjustment");
			const updateSaldoAkhir = $("#update-saldo-akhir");
			const updateStockOpname = $("#update-stock-opname");
			const updateSelisih = $("#update-selisih");
			const updateKeterangan = $("#update-keterangan");

			const btn = $("#btn-save-update-bahan-baku");

			let tables = $('[id^="select-bahan-baku-list"]');
			let id = false;

			for (let i = 0; i < tables.length; i++) {
				if (tables.eq(i).attr("stg") == "true") {
					id = tables.eq(i).attr('data');
					break;
				}
			}

			$(".air-badge").html(loadingBackdrop());
			const params = {
				'code': id,
			};

			const executePost = {
				'data' : JEncrypt(JSON.stringify(params)),
			}

			const url = baseUrl("/auth/api/v2/load-bahan-baku");

			const execute = postField(url, 'POST', executePost, false);
			execute.done(function(result) {
				let obj = JSON.parse(JSON.stringify(result));

				if (obj.code == 200) {
					btn.attr('data', id);

					updateKodeBarang.val(obj.result.material);
					updateNamaBarang.val(obj.result.material_number);
					updateSat.val(obj.result.bum);
					updateSaldoAwal.val(obj.result.open_stock);
					updatePemasukan.val(obj.result.received_qty);
					updatePengeluaran.val(obj.result.issue_qty);
					updatePenyesuaianAdjustment.val(obj.result.penyesuaian);
					updateSaldoAkhir.val(obj.result.ending_stock);
					updateStockOpname.val(obj.result.stock_opname);
					updateSelisih.val(obj.result.selisih);
					updateKeterangan.val(obj.result.keterangan);

					$(".air-badge").html('');
					modal.modal('show');
				} else {
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			});

			execute.fail(function() {
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			});
		});

		$("#update-penyesuaian-adjustment, #update-stock-opname").keypress(function() {
			return allowNumberic(this);
		});

		$("#update-stock-opname").keyup(function () {
			const updatePenyesuaianAdjustment = $("#update-penyesuaian-adjustment");
			const updateSaldoAkhir = $("#update-saldo-akhir");
			const updateStockOpname = $("#update-stock-opname");
			const updateSelisih = $("#update-selisih");

			let status = false;
			let min = false;
			let max = false;
			let must = false;

			let filter = filterNumb("#"+updateStockOpname.attr("id"), status, min, max, must);

			if (updateStockOpname.val().trim() !== "" && updateStockOpname.val().trim() !== "-" && filter.status == true) {
				let penyesuaian = (parseFloat(updateSaldoAkhir.val()) - parseFloat(updateStockOpname.val())).toFixed(2);
				let selisih = (parseFloat(updateStockOpname.val()) - parseFloat(updateSaldoAkhir.val())).toFixed(2);

				updatePenyesuaianAdjustment.val(penyesuaian);
				updateSelisih.val(selisih);
				// updateStockOpname.val((parseFloat(updateStockOpname.val()).toFixed(2)));
			} else {
				updatePenyesuaianAdjustment.val("-");
				updateSelisih.val("-");
			}
		});

		$("#update-stock-opname").change(function () {
			const updateStockOpname = $("#update-stock-opname");
			let status = false;
			let min = false;
			let max = false;
			let must = false;

			let filter = filterNumb("#"+updateStockOpname.attr("id"), status, min, max, must);
			if (filter.status == true) updateStockOpname.val((parseFloat(updateStockOpname.val()).toFixed(2)));
		});

		$("#btn-save-update-bahan-baku").click(function () {
			const btn = $("#btn-save-update-bahan-baku");
			const modal = $("#modal-update-bahan-baku");

			const updateKodeBarang = $("#update-kode-barang");
			const updateNamaBarang = $("#update-nama-barang");
			const updateSat = $("#update-sat");
			const updateSaldoAwal = $("#update-saldo-awal");
			const updatePemasukan = $("#update-pemasukan");
			const updatePengeluaran = $("#update-pengeluaran");
			const updatePenyesuaianAdjustment = $("#update-penyesuaian-adjustment");
			const updateSaldoAkhir = $("#update-saldo-akhir");
			const updateStockOpname = $("#update-stock-opname");
			const updateSelisih = $("#update-selisih");
			const updateKeterangan = $("#update-keterangan");
			let allow = true;

			if (!inputValidation("#"+updateKodeBarang.attr("id"), "#msg-"+updateKodeBarang.attr("id"))) allow = false;
			if (!inputValidation("#"+updateNamaBarang.attr("id"), "#msg-"+updateNamaBarang.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSat.attr("id"), "#msg-"+updateSat.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSaldoAwal.attr("id"), "#msg-"+updateSaldoAwal.attr("id"))) allow = false;
			if (!inputValidation("#"+updatePemasukan.attr("id"), "#msg-"+updatePemasukan.attr("id"))) allow = false;
			if (!inputValidation("#"+updatePengeluaran.attr("id"), "#msg-"+updatePengeluaran.attr("id"))) allow = false;
			if (!inputValidation("#"+updatePenyesuaianAdjustment.attr("id"), "#msg-"+updatePenyesuaianAdjustment.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSaldoAkhir.attr("id"), "#msg-"+updateSaldoAkhir.attr("id"))) allow = false;
			if (!inputValidation("#"+updateStockOpname.attr("id"), "#msg-"+updateStockOpname.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSelisih.attr("id"), "#msg-"+updateSelisih.attr("id"))) allow = false;
			if (!inputValidation("#"+updateKeterangan.attr("id"), "#msg-"+updateKeterangan.attr("id"))) allow = false;

			if (!allow) return false;
			modal.modal('hide');
			$(".air-badge").html(loadingBackdrop());

			const params = {
				'target': btn.attr('data'),
				'kode-barang' : updateKodeBarang.val(),
				'nama-barang' : updateNamaBarang.val(),
				'sat' : updateSat.val(),
				'saldo-awal' : updateSaldoAwal.val(),
				'pemasukan' : updatePemasukan.val(),
				'pengeluaran' : updatePengeluaran.val(),
				'penyesuaian-adjustment' : updatePenyesuaianAdjustment.val(),
				'saldo-akhir' : updateSaldoAkhir.val(),
				'stock-opname' : updateStockOpname.val(),
				'selisih' : updateSelisih.val(),
				'keterangan' : updateKeterangan.val(),
			};

			const executePost = {
				'data' : JEncrypt(JSON.stringify(params)),
			}

			const url = baseUrl("/auth/api/v2/update-bahan-baku");

			const execute = postField(url, 'POST', executePost, false);

			execute.done(function(result) {
				let obj = JSON.parse(JSON.stringify(result));

				if (obj.code == 200) {
					$(".air-badge").html(airBadge(obj.msg , 'success'));
					setTimeout(function() {
						window.location = window.location.href;
					}, 5000);
				} else {
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			});

			execute.fail(function() {
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			});
		});
	}

	$(document).ready(function () {
		const kodeBarang = $("#kode-barang");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeBarang.val() !== null) params['kode-barang'] = kodeBarang.val();
		$(".air-badge").html(loadingBackdrop());

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}
		const url = baseUrl("/auth/api/v2/get-bahan-baku");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
							"DIBUAT OLEH": obj.result[i].created_by,
							"TANGGAL DIBUAT": obj.result[i].created_date,
							"DIPERBAHARUI OLEH": obj.result[i].update_by,
							"TANGGAL DIPERBAHARUI": obj.result[i].update_date,
							"data": obj.result[i].id,
						};
					} else {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
						};
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-search-docs").click(function () {
		const kodeBarang = $("#kode-barang");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");
		const btn = $("#btn-search-docs");
		let allow = true;

		if (!inputValidation("#"+startPeriod.attr("id"), "#msg-"+startPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}
		if (!inputValidation("#"+endPeriod.attr("id"), "#msg-"+endPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());
		btn.removeClass("mb-4");
		startPeriod.removeClass("is-valid");
		endPeriod.removeClass("is-valid");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeBarang.val() !== null) params['kode-barang'] = kodeBarang.val();

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v2/get-bahan-baku");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
							"DIBUAT OLEH": obj.result[i].created_by,
							"TANGGAL DIBUAT": obj.result[i].created_date,
							"DIPERBAHARUI OLEH": obj.result[i].update_by,
							"TANGGAL DIPERBAHARUI": obj.result[i].update_date,
							"data": obj.result[i].id,
						};
					} else {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
						};
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const laporanBarangJadi = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;
	let tableOptIndex = datatableOpt();

	if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
		let tableBtnIndex = [
			{	
				text : '<span class="mr-2">Update</span><i class="fas fa-fw fa-edit"></i>', 
				className: 'btn btn-info btn-sm mb-1',
				init: function(api, node, config) {
					$(node).removeClass('dt-button');
					$(node).attr('id', 'btn-modal-update-barang-jadi');
					$(node).attr('disabled', true);
				}
			},
			selectionExportBtn()
		];
		tableOptIndex['buttons'] = tableBtnIndex;

		tableOptIndex['columns'] = [
			{data: "NO"},
			{data: "KODE BARANG"},
			{data: "NAMA BARANG"},
			{data: "SAT"},
			{data: "SALDO AWAL"},
			{data: "PEMASUKAN"},
			{data: "PENGELUARAN"},
			{data: "PENYESUAIAN (ADJUSTMENT)"},
			{data: "SALDO AKHIR"},
			{data: "STOCK OPNAME"},
			{data: "SELISIH"},
			{data: "KETERANGAN"},	
			{data: "DIBUAT OLEH"},		
			{data: "TANGGAL DIBUAT"},		
			{data: "DIPERBAHARUI OLEH"},		
			{data: "TANGGAL DIPERBAHARUI"}		
		];

		tableOptIndex['createdRow'] = function (row, data, dataIndex) {
			$(row).attr('id', 'select-barang-jadi-list');
			$(row).attr('data', data.data);
			$(row).attr('stg', false);
		};

		tableOptIndex['columnDefs'] = [
			{
				"targets": [0, 1, 15],
				"createdCell": function (td, cellData, rowData, row, col) {
					$(td).addClass("text-center");
				}
			},
		];
	} else {
		tableOptIndex['buttons'] = exportBtn();

		tableOptIndex['columns'] = [
			{data: "NO"},
			{data: "KODE BARANG"},
			{data: "NAMA BARANG"},
			{data: "SAT"},
			{data: "SALDO AWAL"},
			{data: "PEMASUKAN"},
			{data: "PENGELUARAN"},
			{data: "PENYESUAIAN (ADJUSTMENT)"},
			{data: "SALDO AKHIR"},
			{data: "STOCK OPNAME"},
			{data: "SELISIH"},
			{data: "KETERANGAN"},
		];
	}

	let dataTableIndex = $('#datatable-barang-jadi').DataTable(tableOptIndex);

	if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
		const selectBarangJadiList = (arr) => {
			const btnEdit = $("#btn-modal-update-barang-jadi");

			let tables = $('[id^="select-barang-jadi-list"]');
			let isOn = 0;
			let shiftTable = 0;

			for (let i = 0; i < tables.length; i++) {

				if (selectAll) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");
					isOn++;
					lastPressed = (i+1);
				} else {
					if (ctrlPressed && !shiftPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							if (tables.eq(i).attr("stg") == "true") {
								tables.eq(i).attr("stg", false);
								tables.eq(i).removeClass("table-primary");
							} else {
								tables.eq(i).attr("stg", true);
								tables.eq(i).addClass("table-primary");
								lastPressed = (i+1);
							}
						}

						if (tables.eq(i).attr("stg") == "true") isOn++;
					}

					if (!ctrlPressed && !shiftPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							if (tables.eq(i).attr("stg") == "true") {
								tables.eq(i).attr("stg", false);
								tables.eq(i).removeClass("table-primary");
							} else {
								tables.eq(i).attr("stg", true);
								tables.eq(i).addClass("table-primary");
								isOn++;
								lastPressed = (i+1);
							}
						}

						if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						}
					}

					if (shiftPressed && !ctrlPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							shiftTable = (i+1);
						}
					}

					if (!shiftPressed) shiftTable = 0;
				}
			}

			// naik
			if (lastPressed && shiftTable && lastPressed > shiftTable) {
				for (let i = (tables.length-1); i >= 0; i--) {
					tables.eq(i).attr("stg", false);
					tables.eq(i).removeClass("table-primary");

					if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
						tables.eq(i).attr("stg", true);
						tables.eq(i).addClass("table-primary");	
						isOn++;
					}
				}
			}

			// turun
			if (shiftTable > lastPressed) {
				if (lastPressed >= 1) lastPressed --;
				for (let i = 0; i < tables.length; i++) {
					tables.eq(i).attr("stg", false);
					tables.eq(i).removeClass("table-primary");

					if (i >= lastPressed && i < shiftTable) {
						tables.eq(i).attr("stg", true);
						tables.eq(i).addClass("table-primary");	
						isOn++;
					}
				}
			}

			if (isOn == 0) {
				btnEdit.attr("disabled", true);
				lastPressed = 0;
			}

			if (isOn == 1) {
				btnEdit.attr("disabled", false);
			}

			if (isOn >= 2) {
				btnEdit.attr("disabled", true);
			}
		}

		$(document).keydown(function(event){
			if(event.which == "17") ctrlPressed = true;
			if(event.which == "16") shiftPressed = true;
			// if(ctrlPressed && event.which == "65") selectAll = true;

			if (event.keyCode == 65 && event.ctrlKey && selectAll) {
				// textSelection('datatable-barang-jadi-list');
				event.preventDefault();
				selectBarangJadiList();
			}
		});

		$(document).keyup(function(){
			ctrlPressed = false;
			shiftPressed = false;
			selectAll = false;
		});

		$(document).on('click', '[id^="select-barang-jadi-list"]', function () {
			const myData = $(this);

			selectBarangJadiList(myData);
		});

		$("#btn-modal-update-barang-jadi").click(function () {
			const modal = $("#modal-update-barang-jadi");

			const updateKodeBarang = $("#update-kode-barang");
			const updateNamaBarang = $("#update-nama-barang");
			const updateSat = $("#update-sat");
			const updateSaldoAwal = $("#update-saldo-awal");
			const updatePemasukan = $("#update-pemasukan");
			const updatePengeluaran = $("#update-pengeluaran");
			const updatePenyesuaianAdjustment = $("#update-penyesuaian-adjustment");
			const updateSaldoAkhir = $("#update-saldo-akhir");
			const updateStockOpname = $("#update-stock-opname");
			const updateSelisih = $("#update-selisih");
			const updateKeterangan = $("#update-keterangan");

			const btn = $("#btn-save-update-barang-jadi");

			let tables = $('[id^="select-barang-jadi-list"]');
			let id = false;

			for (let i = 0; i < tables.length; i++) {
				if (tables.eq(i).attr("stg") == "true") {
					id = tables.eq(i).attr('data');
					break;
				}
			}

			$(".air-badge").html(loadingBackdrop());
			const params = {
				'code': id,
			};

			const executePost = {
				'data' : JEncrypt(JSON.stringify(params)),
			}

			const url = baseUrl("/auth/api/v2/load-barang-jadi");

			const execute = postField(url, 'POST', executePost, false);
			execute.done(function(result) {
				let obj = JSON.parse(JSON.stringify(result));

				if (obj.code == 200) {
					btn.attr('data', id);

					updateKodeBarang.val(obj.result.material);
					updateNamaBarang.val(obj.result.material_number);
					updateSat.val(obj.result.bum);
					updateSaldoAwal.val(obj.result.open_stock);
					updatePemasukan.val(obj.result.received_qty);
					updatePengeluaran.val(obj.result.issue_qty);
					updatePenyesuaianAdjustment.val(obj.result.penyesuaian);
					updateSaldoAkhir.val(obj.result.ending_stock);
					updateStockOpname.val(obj.result.stock_opname);
					updateSelisih.val(obj.result.selisih);
					updateKeterangan.val(obj.result.keterangan);

					$(".air-badge").html('');
					modal.modal('show');
				} else {
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			});

			execute.fail(function() {
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			});
		});

		$("#update-penyesuaian-adjustment, #update-stock-opname").keypress(function() {
			return allowNumberic(this);
		});

		$("#update-stock-opname").keyup(function () {
			const updatePenyesuaianAdjustment = $("#update-penyesuaian-adjustment");
			const updateSaldoAkhir = $("#update-saldo-akhir");
			const updateStockOpname = $("#update-stock-opname");
			const updateSelisih = $("#update-selisih");

			let status = false;
			let min = false;
			let max = false;
			let must = false;

			let filter = filterNumb("#"+updateStockOpname.attr("id"), status, min, max, must);

			if (updateStockOpname.val().trim() !== "" && updateStockOpname.val().trim() !== "-" && filter.status == true) {
				let penyesuaian = (parseFloat(updateSaldoAkhir.val()) - parseFloat(updateStockOpname.val())).toFixed(2);
				let selisih = (parseFloat(updateStockOpname.val()) - parseFloat(updateSaldoAkhir.val())).toFixed(2);

				updatePenyesuaianAdjustment.val(penyesuaian);
				updateSelisih.val(selisih);
				// updateStockOpname.val((parseFloat(updateStockOpname.val()).toFixed(2)));
			} else {
				updatePenyesuaianAdjustment.val("-");
				updateSelisih.val("-");
			}
		});

		$("#update-stock-opname").change(function () {
			const updateStockOpname = $("#update-stock-opname");
			let status = false;
			let min = false;
			let max = false;
			let must = false;

			let filter = filterNumb("#"+updateStockOpname.attr("id"), status, min, max, must);
			if (filter.status == true) updateStockOpname.val((parseFloat(updateStockOpname.val()).toFixed(2)));
		});

		$("#btn-save-update-barang-jadi").click(function () {
			const btn = $("#btn-save-update-barang-jadi");
			const modal = $("#modal-update-barang-jadi");

			const updateKodeBarang = $("#update-kode-barang");
			const updateNamaBarang = $("#update-nama-barang");
			const updateSat = $("#update-sat");
			const updateSaldoAwal = $("#update-saldo-awal");
			const updatePemasukan = $("#update-pemasukan");
			const updatePengeluaran = $("#update-pengeluaran");
			const updatePenyesuaianAdjustment = $("#update-penyesuaian-adjustment");
			const updateSaldoAkhir = $("#update-saldo-akhir");
			const updateStockOpname = $("#update-stock-opname");
			const updateSelisih = $("#update-selisih");
			const updateKeterangan = $("#update-keterangan");
			let allow = true;

			if (!inputValidation("#"+updateKodeBarang.attr("id"), "#msg-"+updateKodeBarang.attr("id"))) allow = false;
			if (!inputValidation("#"+updateNamaBarang.attr("id"), "#msg-"+updateNamaBarang.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSat.attr("id"), "#msg-"+updateSat.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSaldoAwal.attr("id"), "#msg-"+updateSaldoAwal.attr("id"))) allow = false;
			if (!inputValidation("#"+updatePemasukan.attr("id"), "#msg-"+updatePemasukan.attr("id"))) allow = false;
			if (!inputValidation("#"+updatePengeluaran.attr("id"), "#msg-"+updatePengeluaran.attr("id"))) allow = false;
			if (!inputValidation("#"+updatePenyesuaianAdjustment.attr("id"), "#msg-"+updatePenyesuaianAdjustment.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSaldoAkhir.attr("id"), "#msg-"+updateSaldoAkhir.attr("id"))) allow = false;
			if (!inputValidation("#"+updateStockOpname.attr("id"), "#msg-"+updateStockOpname.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSelisih.attr("id"), "#msg-"+updateSelisih.attr("id"))) allow = false;
			if (!inputValidation("#"+updateKeterangan.attr("id"), "#msg-"+updateKeterangan.attr("id"))) allow = false;

			if (!allow) return false;
			modal.modal('hide');
			$(".air-badge").html(loadingBackdrop());

			const params = {
				'target': btn.attr('data'),
				'kode-barang' : updateKodeBarang.val(),
				'nama-barang' : updateNamaBarang.val(),
				'sat' : updateSat.val(),
				'saldo-awal' : updateSaldoAwal.val(),
				'pemasukan' : updatePemasukan.val(),
				'pengeluaran' : updatePengeluaran.val(),
				'penyesuaian-adjustment' : updatePenyesuaianAdjustment.val(),
				'saldo-akhir' : updateSaldoAkhir.val(),
				'stock-opname' : updateStockOpname.val(),
				'selisih' : updateSelisih.val(),
				'keterangan' : updateKeterangan.val(),
			};

			const executePost = {
				'data' : JEncrypt(JSON.stringify(params)),
			}

			const url = baseUrl("/auth/api/v2/update-barang-jadi");

			const execute = postField(url, 'POST', executePost, false);

			execute.done(function(result) {
				let obj = JSON.parse(JSON.stringify(result));

				if (obj.code == 200) {
					$(".air-badge").html(airBadge(obj.msg , 'success'));
					setTimeout(function() {
						window.location = window.location.href;
					}, 5000);
				} else {
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			});

			execute.fail(function() {
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			});
		});
	}

	$(document).ready(function () {
		const kodeBarang = $("#kode-barang");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeBarang.val() !== null) params['kode-barang'] = kodeBarang.val();
		$(".air-badge").html(loadingBackdrop());

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}
		const url = baseUrl("/auth/api/v2/get-barang-jadi");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
							"DIBUAT OLEH": obj.result[i].created_by,
							"TANGGAL DIBUAT": obj.result[i].created_date,
							"DIPERBAHARUI OLEH": obj.result[i].update_by,
							"TANGGAL DIPERBAHARUI": obj.result[i].update_date,
							"data": obj.result[i].id,
						};
					} else {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
						};
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-search-docs").click(function () {
		const kodeBarang = $("#kode-barang");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");
		const btn = $("#btn-search-docs");
		let allow = true;

		if (!inputValidation("#"+startPeriod.attr("id"), "#msg-"+startPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}
		if (!inputValidation("#"+endPeriod.attr("id"), "#msg-"+endPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());
		btn.removeClass("mb-4");
		startPeriod.removeClass("is-valid");
		endPeriod.removeClass("is-valid");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeBarang.val() !== null) params['kode-barang'] = kodeBarang.val();

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v2/get-barang-jadi");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
							"DIBUAT OLEH": obj.result[i].created_by,
							"TANGGAL DIBUAT": obj.result[i].created_date,
							"DIPERBAHARUI OLEH": obj.result[i].update_by,
							"TANGGAL DIPERBAHARUI": obj.result[i].update_date,
							"data": obj.result[i].id,
						};
					} else {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
						};
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const laporanMutasiMesin = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;
	let tableOptIndex = datatableOpt();

	if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
		let tableBtnIndex = [
			{	
				text : '<span class="mr-2">Update</span><i class="fas fa-fw fa-edit"></i>', 
				className: 'btn btn-info btn-sm mb-1',
				init: function(api, node, config) {
					$(node).removeClass('dt-button');
					$(node).attr('id', 'btn-modal-update-mutasi-mesin');
					$(node).attr('disabled', true);
				}
			},
			selectionExportBtn()
		];
		tableOptIndex['buttons'] = tableBtnIndex;

		tableOptIndex['columns'] = [
			{data: "NO"},
			{data: "KODE BARANG"},
			{data: "NAMA BARANG"},
			{data: "SAT"},
			{data: "SALDO AWAL"},
			{data: "PEMASUKAN"},
			{data: "PENGELUARAN"},
			{data: "PENYESUAIAN (ADJUSTMENT)"},
			{data: "SALDO AKHIR"},
			{data: "STOCK OPNAME"},
			{data: "SELISIH"},
			{data: "KETERANGAN"},	
			{data: "DIBUAT OLEH"},		
			{data: "TANGGAL DIBUAT"},		
			{data: "DIPERBAHARUI OLEH"},		
			{data: "TANGGAL DIPERBAHARUI"}		
		];

		tableOptIndex['createdRow'] = function (row, data, dataIndex) {
			$(row).attr('id', 'select-mutasi-mesin-list');
			$(row).attr('data', data.data);
			$(row).attr('stg', false);
		};

		tableOptIndex['columnDefs'] = [
			{
				"targets": [0, 1, 15],
				"createdCell": function (td, cellData, rowData, row, col) {
					$(td).addClass("text-center");
				}
			},
		];
	} else {
		tableOptIndex['buttons'] = exportBtn();

		tableOptIndex['columns'] = [
			{data: "NO"},
			{data: "KODE BARANG"},
			{data: "NAMA BARANG"},
			{data: "SAT"},
			{data: "SALDO AWAL"},
			{data: "PEMASUKAN"},
			{data: "PENGELUARAN"},
			{data: "PENYESUAIAN (ADJUSTMENT)"},
			{data: "SALDO AKHIR"},
			{data: "STOCK OPNAME"},
			{data: "SELISIH"},
			{data: "KETERANGAN"},
		];
	}

	let dataTableIndex = $('#datatable-mutasi-mesin').DataTable(tableOptIndex);

	if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
		const selectMutasiMesinList = (arr) => {
			const btnEdit = $("#btn-modal-update-mutasi-mesin");

			let tables = $('[id^="select-mutasi-mesin-list"]');
			let isOn = 0;
			let shiftTable = 0;

			for (let i = 0; i < tables.length; i++) {

				if (selectAll) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");
					isOn++;
					lastPressed = (i+1);
				} else {
					if (ctrlPressed && !shiftPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							if (tables.eq(i).attr("stg") == "true") {
								tables.eq(i).attr("stg", false);
								tables.eq(i).removeClass("table-primary");
							} else {
								tables.eq(i).attr("stg", true);
								tables.eq(i).addClass("table-primary");
								lastPressed = (i+1);
							}
						}

						if (tables.eq(i).attr("stg") == "true") isOn++;
					}

					if (!ctrlPressed && !shiftPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							if (tables.eq(i).attr("stg") == "true") {
								tables.eq(i).attr("stg", false);
								tables.eq(i).removeClass("table-primary");
							} else {
								tables.eq(i).attr("stg", true);
								tables.eq(i).addClass("table-primary");
								isOn++;
								lastPressed = (i+1);
							}
						}

						if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						}
					}

					if (shiftPressed && !ctrlPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							shiftTable = (i+1);
						}
					}

					if (!shiftPressed) shiftTable = 0;
				}
			}

			// naik
			if (lastPressed && shiftTable && lastPressed > shiftTable) {
				for (let i = (tables.length-1); i >= 0; i--) {
					tables.eq(i).attr("stg", false);
					tables.eq(i).removeClass("table-primary");

					if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
						tables.eq(i).attr("stg", true);
						tables.eq(i).addClass("table-primary");	
						isOn++;
					}
				}
			}

			// turun
			if (shiftTable > lastPressed) {
				if (lastPressed >= 1) lastPressed --;
				for (let i = 0; i < tables.length; i++) {
					tables.eq(i).attr("stg", false);
					tables.eq(i).removeClass("table-primary");

					if (i >= lastPressed && i < shiftTable) {
						tables.eq(i).attr("stg", true);
						tables.eq(i).addClass("table-primary");	
						isOn++;
					}
				}
			}

			if (isOn == 0) {
				btnEdit.attr("disabled", true);
				lastPressed = 0;
			}

			if (isOn == 1) {
				btnEdit.attr("disabled", false);
			}

			if (isOn >= 2) {
				btnEdit.attr("disabled", true);
			}
		}

		$(document).keydown(function(event){
			if(event.which == "17") ctrlPressed = true;
			if(event.which == "16") shiftPressed = true;
			// if(ctrlPressed && event.which == "65") selectAll = true;

			if (event.keyCode == 65 && event.ctrlKey && selectAll) {
				// textSelection('datatable-mutasi-mesin-list');
				event.preventDefault();
				selectMutasiMesinList();
			}
		});

		$(document).keyup(function(){
			ctrlPressed = false;
			shiftPressed = false;
			selectAll = false;
		});

		$(document).on('click', '[id^="select-mutasi-mesin-list"]', function () {
			const myData = $(this);

			selectMutasiMesinList(myData);
		});

		$("#btn-modal-update-mutasi-mesin").click(function () {
			const modal = $("#modal-update-mutasi-mesin");

			const updateKodeBarang = $("#update-kode-barang");
			const updateNamaBarang = $("#update-nama-barang");
			const updateSat = $("#update-sat");
			const updateSaldoAwal = $("#update-saldo-awal");
			const updatePemasukan = $("#update-pemasukan");
			const updatePengeluaran = $("#update-pengeluaran");
			const updatePenyesuaianAdjustment = $("#update-penyesuaian-adjustment");
			const updateSaldoAkhir = $("#update-saldo-akhir");
			const updateStockOpname = $("#update-stock-opname");
			const updateSelisih = $("#update-selisih");
			const updateKeterangan = $("#update-keterangan");

			const btn = $("#btn-save-update-mutasi-mesin");

			let tables = $('[id^="select-mutasi-mesin-list"]');
			let id = false;

			for (let i = 0; i < tables.length; i++) {
				if (tables.eq(i).attr("stg") == "true") {
					id = tables.eq(i).attr('data');
					break;
				}
			}

			$(".air-badge").html(loadingBackdrop());
			const params = {
				'code': id,
			};

			const executePost = {
				'data' : JEncrypt(JSON.stringify(params)),
			}

			const url = baseUrl("/auth/api/v2/load-mutasi-mesin");

			const execute = postField(url, 'POST', executePost, false);
			execute.done(function(result) {
				let obj = JSON.parse(JSON.stringify(result));

				if (obj.code == 200) {
					btn.attr('data', id);

					updateKodeBarang.val(obj.result.material);
					updateNamaBarang.val(obj.result.material_number);
					updateSat.val(obj.result.bum);
					updateSaldoAwal.val(obj.result.open_stock);
					updatePemasukan.val(obj.result.received_qty);
					updatePengeluaran.val(obj.result.issue_qty);
					updatePenyesuaianAdjustment.val(obj.result.penyesuaian);
					updateSaldoAkhir.val(obj.result.ending_stock);
					updateStockOpname.val(obj.result.stock_opname);
					updateSelisih.val(obj.result.selisih);
					updateKeterangan.val(obj.result.keterangan);

					$(".air-badge").html('');
					modal.modal('show');
				} else {
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			});

			execute.fail(function() {
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			});
		});

		$("#update-penyesuaian-adjustment, #update-stock-opname").keypress(function() {
			return allowNumberic(this);
		});

		$("#update-stock-opname").keyup(function () {
			const updatePenyesuaianAdjustment = $("#update-penyesuaian-adjustment");
			const updateSaldoAkhir = $("#update-saldo-akhir");
			const updateStockOpname = $("#update-stock-opname");
			const updateSelisih = $("#update-selisih");

			let status = false;
			let min = false;
			let max = false;
			let must = false;

			let filter = filterNumb("#"+updateStockOpname.attr("id"), status, min, max, must);

			if (updateStockOpname.val().trim() !== "" && updateStockOpname.val().trim() !== "-" && filter.status == true) {
				let penyesuaian = (parseFloat(updateSaldoAkhir.val()) - parseFloat(updateStockOpname.val())).toFixed(2);
				let selisih = (parseFloat(updateStockOpname.val()) - parseFloat(updateSaldoAkhir.val())).toFixed(2);

				updatePenyesuaianAdjustment.val(penyesuaian);
				updateSelisih.val(selisih);
				// updateStockOpname.val((parseFloat(updateStockOpname.val()).toFixed(2)));
			} else {
				updatePenyesuaianAdjustment.val("-");
				updateSelisih.val("-");
			}
		});

		$("#update-stock-opname").change(function () {
			const updateStockOpname = $("#update-stock-opname");
			let status = false;
			let min = false;
			let max = false;
			let must = false;

			let filter = filterNumb("#"+updateStockOpname.attr("id"), status, min, max, must);
			if (filter.status == true) updateStockOpname.val((parseFloat(updateStockOpname.val()).toFixed(2)));
		});

		$("#btn-save-update-mutasi-mesin").click(function () {
			const btn = $("#btn-save-update-mutasi-mesin");
			const modal = $("#modal-update-mutasi-mesin");

			const updateKodeBarang = $("#update-kode-barang");
			const updateNamaBarang = $("#update-nama-barang");
			const updateSat = $("#update-sat");
			const updateSaldoAwal = $("#update-saldo-awal");
			const updatePemasukan = $("#update-pemasukan");
			const updatePengeluaran = $("#update-pengeluaran");
			const updatePenyesuaianAdjustment = $("#update-penyesuaian-adjustment");
			const updateSaldoAkhir = $("#update-saldo-akhir");
			const updateStockOpname = $("#update-stock-opname");
			const updateSelisih = $("#update-selisih");
			const updateKeterangan = $("#update-keterangan");
			let allow = true;

			if (!inputValidation("#"+updateKodeBarang.attr("id"), "#msg-"+updateKodeBarang.attr("id"))) allow = false;
			if (!inputValidation("#"+updateNamaBarang.attr("id"), "#msg-"+updateNamaBarang.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSat.attr("id"), "#msg-"+updateSat.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSaldoAwal.attr("id"), "#msg-"+updateSaldoAwal.attr("id"))) allow = false;
			if (!inputValidation("#"+updatePemasukan.attr("id"), "#msg-"+updatePemasukan.attr("id"))) allow = false;
			if (!inputValidation("#"+updatePengeluaran.attr("id"), "#msg-"+updatePengeluaran.attr("id"))) allow = false;
			if (!inputValidation("#"+updatePenyesuaianAdjustment.attr("id"), "#msg-"+updatePenyesuaianAdjustment.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSaldoAkhir.attr("id"), "#msg-"+updateSaldoAkhir.attr("id"))) allow = false;
			if (!inputValidation("#"+updateStockOpname.attr("id"), "#msg-"+updateStockOpname.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSelisih.attr("id"), "#msg-"+updateSelisih.attr("id"))) allow = false;
			if (!inputValidation("#"+updateKeterangan.attr("id"), "#msg-"+updateKeterangan.attr("id"))) allow = false;

			if (!allow) return false;
			modal.modal('hide');
			$(".air-badge").html(loadingBackdrop());

			const params = {
				'target': btn.attr('data'),
				'kode-barang' : updateKodeBarang.val(),
				'nama-barang' : updateNamaBarang.val(),
				'sat' : updateSat.val(),
				'saldo-awal' : updateSaldoAwal.val(),
				'pemasukan' : updatePemasukan.val(),
				'pengeluaran' : updatePengeluaran.val(),
				'penyesuaian-adjustment' : updatePenyesuaianAdjustment.val(),
				'saldo-akhir' : updateSaldoAkhir.val(),
				'stock-opname' : updateStockOpname.val(),
				'selisih' : updateSelisih.val(),
				'keterangan' : updateKeterangan.val(),
			};

			const executePost = {
				'data' : JEncrypt(JSON.stringify(params)),
			}

			const url = baseUrl("/auth/api/v2/update-mutasi-mesin");

			const execute = postField(url, 'POST', executePost, false);

			execute.done(function(result) {
				let obj = JSON.parse(JSON.stringify(result));

				if (obj.code == 200) {
					$(".air-badge").html(airBadge(obj.msg , 'success'));
					setTimeout(function() {
						window.location = window.location.href;
					}, 5000);
				} else {
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			});

			execute.fail(function() {
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			});
		});
	}

	$(document).ready(function () {
		const kodeBarang = $("#kode-barang");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeBarang.val() !== null) params['kode-barang'] = kodeBarang.val();
		$(".air-badge").html(loadingBackdrop());

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}
		const url = baseUrl("/auth/api/v2/get-mutasi-mesin");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material_number,
							"NAMA BARANG": obj.result[i].material,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
							"DIBUAT OLEH": obj.result[i].created_by,
							"TANGGAL DIBUAT": obj.result[i].created_date,
							"DIPERBAHARUI OLEH": obj.result[i].update_by,
							"TANGGAL DIPERBAHARUI": obj.result[i].update_date,
							"data": obj.result[i].id,
						};
					} else {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material_number,
							"NAMA BARANG": obj.result[i].material,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
						};
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-search-docs").click(function () {
		const kodeBarang = $("#kode-barang");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");
		const btn = $("#btn-search-docs");
		let allow = true;

		if (!inputValidation("#"+startPeriod.attr("id"), "#msg-"+startPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}
		if (!inputValidation("#"+endPeriod.attr("id"), "#msg-"+endPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());
		btn.removeClass("mb-4");
		startPeriod.removeClass("is-valid");
		endPeriod.removeClass("is-valid");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeBarang.val() !== null) params['kode-barang'] = kodeBarang.val();

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v2/get-mutasi-mesin");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
							"DIBUAT OLEH": obj.result[i].created_by,
							"TANGGAL DIBUAT": obj.result[i].created_date,
							"DIPERBAHARUI OLEH": obj.result[i].update_by,
							"TANGGAL DIPERBAHARUI": obj.result[i].update_date,
							"data": obj.result[i].id,
						};
					} else {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
						};
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const laporanRejectAndScrap = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;
	let tableOptIndex = datatableOpt();

	if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
		let tableBtnIndex = [
			{	
				text : '<span class="mr-2">Update</span><i class="fas fa-fw fa-edit"></i>', 
				className: 'btn btn-info btn-sm mb-1',
				init: function(api, node, config) {
					$(node).removeClass('dt-button');
					$(node).attr('id', 'btn-modal-update-reject-and-scrap');
					$(node).attr('disabled', true);
				}
			},
			selectionExportBtn()
		];
		tableOptIndex['buttons'] = tableBtnIndex;

		tableOptIndex['columns'] = [
			{data: "NO"},
			{data: "KODE BARANG"},
			{data: "NAMA BARANG"},
			{data: "SAT"},
			{data: "SALDO AWAL"},
			{data: "PEMASUKAN"},
			{data: "PENGELUARAN"},
			{data: "PENYESUAIAN (ADJUSTMENT)"},
			{data: "SALDO AKHIR"},
			{data: "STOCK OPNAME"},
			{data: "SELISIH"},
			{data: "KETERANGAN"},	
			{data: "DIBUAT OLEH"},		
			{data: "TANGGAL DIBUAT"},		
			{data: "DIPERBAHARUI OLEH"},		
			{data: "TANGGAL DIPERBAHARUI"}		
		];

		tableOptIndex['createdRow'] = function (row, data, dataIndex) {
			$(row).attr('id', 'select-reject-and-scrap-list');
			$(row).attr('data', data.data);
			$(row).attr('stg', false);
		};

		tableOptIndex['columnDefs'] = [
			{
				"targets": [0, 1, 15],
				"createdCell": function (td, cellData, rowData, row, col) {
					$(td).addClass("text-center");
				}
			},
		];
	} else {
		tableOptIndex['buttons'] = exportBtn();

		tableOptIndex['columns'] = [
			{data: "NO"},
			{data: "KODE BARANG"},
			{data: "NAMA BARANG"},
			{data: "SAT"},
			{data: "SALDO AWAL"},
			{data: "PEMASUKAN"},
			{data: "PENGELUARAN"},
			{data: "PENYESUAIAN (ADJUSTMENT)"},
			{data: "SALDO AKHIR"},
			{data: "STOCK OPNAME"},
			{data: "SELISIH"},
			{data: "KETERANGAN"},
		];
	}

	let dataTableIndex = $('#datatable-reject-and-scrap').DataTable(tableOptIndex);

	if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
		const selectRejectAndScrapList = (arr) => {
			const btnEdit = $("#btn-modal-update-reject-and-scrap");

			let tables = $('[id^="select-reject-and-scrap-list"]');
			let isOn = 0;
			let shiftTable = 0;

			for (let i = 0; i < tables.length; i++) {

				if (selectAll) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");
					isOn++;
					lastPressed = (i+1);
				} else {
					if (ctrlPressed && !shiftPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							if (tables.eq(i).attr("stg") == "true") {
								tables.eq(i).attr("stg", false);
								tables.eq(i).removeClass("table-primary");
							} else {
								tables.eq(i).attr("stg", true);
								tables.eq(i).addClass("table-primary");
								lastPressed = (i+1);
							}
						}

						if (tables.eq(i).attr("stg") == "true") isOn++;
					}

					if (!ctrlPressed && !shiftPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							if (tables.eq(i).attr("stg") == "true") {
								tables.eq(i).attr("stg", false);
								tables.eq(i).removeClass("table-primary");
							} else {
								tables.eq(i).attr("stg", true);
								tables.eq(i).addClass("table-primary");
								isOn++;
								lastPressed = (i+1);
							}
						}

						if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						}
					}

					if (shiftPressed && !ctrlPressed) {
						if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
							shiftTable = (i+1);
						}
					}

					if (!shiftPressed) shiftTable = 0;
				}
			}

			// naik
			if (lastPressed && shiftTable && lastPressed > shiftTable) {
				for (let i = (tables.length-1); i >= 0; i--) {
					tables.eq(i).attr("stg", false);
					tables.eq(i).removeClass("table-primary");

					if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
						tables.eq(i).attr("stg", true);
						tables.eq(i).addClass("table-primary");	
						isOn++;
					}
				}
			}

			// turun
			if (shiftTable > lastPressed) {
				if (lastPressed >= 1) lastPressed --;
				for (let i = 0; i < tables.length; i++) {
					tables.eq(i).attr("stg", false);
					tables.eq(i).removeClass("table-primary");

					if (i >= lastPressed && i < shiftTable) {
						tables.eq(i).attr("stg", true);
						tables.eq(i).addClass("table-primary");	
						isOn++;
					}
				}
			}

			if (isOn == 0) {
				btnEdit.attr("disabled", true);
				lastPressed = 0;
			}

			if (isOn == 1) {
				btnEdit.attr("disabled", false);
			}

			if (isOn >= 2) {
				btnEdit.attr("disabled", true);
			}
		}

		$(document).keydown(function(event){
			if(event.which == "17") ctrlPressed = true;
			if(event.which == "16") shiftPressed = true;
			// if(ctrlPressed && event.which == "65") selectAll = true;

			if (event.keyCode == 65 && event.ctrlKey && selectAll) {
				// textSelection('datatable-reject-and-scrap-list');
				event.preventDefault();
				selectRejectAndScrapList();
			}
		});

		$(document).keyup(function(){
			ctrlPressed = false;
			shiftPressed = false;
			selectAll = false;
		});

		$(document).on('click', '[id^="select-reject-and-scrap-list"]', function () {
			const myData = $(this);

			selectRejectAndScrapList(myData);
		});

		$("#btn-modal-update-reject-and-scrap").click(function () {
			const modal = $("#modal-update-reject-and-scrap");

			const updateKodeBarang = $("#update-kode-barang");
			const updateNamaBarang = $("#update-nama-barang");
			const updateSat = $("#update-sat");
			const updateSaldoAwal = $("#update-saldo-awal");
			const updatePemasukan = $("#update-pemasukan");
			const updatePengeluaran = $("#update-pengeluaran");
			const updatePenyesuaianAdjustment = $("#update-penyesuaian-adjustment");
			const updateSaldoAkhir = $("#update-saldo-akhir");
			const updateStockOpname = $("#update-stock-opname");
			const updateSelisih = $("#update-selisih");
			const updateKeterangan = $("#update-keterangan");

			const btn = $("#btn-save-update-reject-and-scrap");

			let tables = $('[id^="select-reject-and-scrap-list"]');
			let id = false;

			for (let i = 0; i < tables.length; i++) {
				if (tables.eq(i).attr("stg") == "true") {
					id = tables.eq(i).attr('data');
					break;
				}
			}

			$(".air-badge").html(loadingBackdrop());
			const params = {
				'code': id,
			};

			const executePost = {
				'data' : JEncrypt(JSON.stringify(params)),
			}

			const url = baseUrl("/auth/api/v2/load-reject-and-scrap");

			const execute = postField(url, 'POST', executePost, false);
			execute.done(function(result) {
				let obj = JSON.parse(JSON.stringify(result));

				if (obj.code == 200) {
					btn.attr('data', id);

					updateKodeBarang.val(obj.result.material);
					updateNamaBarang.val(obj.result.material_number);
					updateSat.val(obj.result.bum);
					updateSaldoAwal.val(obj.result.open_stock);
					updatePemasukan.val(obj.result.received_qty);
					updatePengeluaran.val(obj.result.issue_qty);
					updatePenyesuaianAdjustment.val(obj.result.penyesuaian);
					updateSaldoAkhir.val(obj.result.ending_stock);
					updateStockOpname.val(obj.result.stock_opname);
					updateSelisih.val(obj.result.selisih);
					updateKeterangan.val(obj.result.keterangan);

					$(".air-badge").html('');
					modal.modal('show');
				} else {
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			});

			execute.fail(function() {
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			});
		});

		$("#update-penyesuaian-adjustment, #update-stock-opname").keypress(function() {
			return allowNumberic(this);
		});

		$("#update-stock-opname").keyup(function () {
			const updatePenyesuaianAdjustment = $("#update-penyesuaian-adjustment");
			const updateSaldoAkhir = $("#update-saldo-akhir");
			const updateStockOpname = $("#update-stock-opname");
			const updateSelisih = $("#update-selisih");

			let status = false;
			let min = false;
			let max = false;
			let must = false;

			let filter = filterNumb("#"+updateStockOpname.attr("id"), status, min, max, must);

			if (updateStockOpname.val().trim() !== "" && updateStockOpname.val().trim() !== "-" && filter.status == true) {
				let penyesuaian = (parseFloat(updateSaldoAkhir.val()) - parseFloat(updateStockOpname.val())).toFixed(2);
				let selisih = (parseFloat(updateStockOpname.val()) - parseFloat(updateSaldoAkhir.val())).toFixed(2);

				updatePenyesuaianAdjustment.val(penyesuaian);
				updateSelisih.val(selisih);
				// updateStockOpname.val((parseFloat(updateStockOpname.val()).toFixed(2)));
			} else {
				updatePenyesuaianAdjustment.val("-");
				updateSelisih.val("-");
			}
		});

		$("#update-stock-opname").change(function () {
			const updateStockOpname = $("#update-stock-opname");
			let status = false;
			let min = false;
			let max = false;
			let must = false;

			let filter = filterNumb("#"+updateStockOpname.attr("id"), status, min, max, must);
			if (filter.status == true) updateStockOpname.val((parseFloat(updateStockOpname.val()).toFixed(2)));
		});

		$("#btn-save-update-reject-and-scrap").click(function () {
			const btn = $("#btn-save-update-reject-and-scrap");
			const modal = $("#modal-update-reject-and-scrap");

			const updateKodeBarang = $("#update-kode-barang");
			const updateNamaBarang = $("#update-nama-barang");
			const updateSat = $("#update-sat");
			const updateSaldoAwal = $("#update-saldo-awal");
			const updatePemasukan = $("#update-pemasukan");
			const updatePengeluaran = $("#update-pengeluaran");
			const updatePenyesuaianAdjustment = $("#update-penyesuaian-adjustment");
			const updateSaldoAkhir = $("#update-saldo-akhir");
			const updateStockOpname = $("#update-stock-opname");
			const updateSelisih = $("#update-selisih");
			const updateKeterangan = $("#update-keterangan");
			let allow = true;

			if (!inputValidation("#"+updateKodeBarang.attr("id"), "#msg-"+updateKodeBarang.attr("id"))) allow = false;
			if (!inputValidation("#"+updateNamaBarang.attr("id"), "#msg-"+updateNamaBarang.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSat.attr("id"), "#msg-"+updateSat.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSaldoAwal.attr("id"), "#msg-"+updateSaldoAwal.attr("id"))) allow = false;
			if (!inputValidation("#"+updatePemasukan.attr("id"), "#msg-"+updatePemasukan.attr("id"))) allow = false;
			if (!inputValidation("#"+updatePengeluaran.attr("id"), "#msg-"+updatePengeluaran.attr("id"))) allow = false;
			if (!inputValidation("#"+updatePenyesuaianAdjustment.attr("id"), "#msg-"+updatePenyesuaianAdjustment.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSaldoAkhir.attr("id"), "#msg-"+updateSaldoAkhir.attr("id"))) allow = false;
			if (!inputValidation("#"+updateStockOpname.attr("id"), "#msg-"+updateStockOpname.attr("id"))) allow = false;
			if (!inputValidation("#"+updateSelisih.attr("id"), "#msg-"+updateSelisih.attr("id"))) allow = false;
			if (!inputValidation("#"+updateKeterangan.attr("id"), "#msg-"+updateKeterangan.attr("id"))) allow = false;

			if (!allow) return false;
			modal.modal('hide');
			$(".air-badge").html(loadingBackdrop());

			const params = {
				'target': btn.attr('data'),
				'kode-barang' : updateKodeBarang.val(),
				'nama-barang' : updateNamaBarang.val(),
				'sat' : updateSat.val(),
				'saldo-awal' : updateSaldoAwal.val(),
				'pemasukan' : updatePemasukan.val(),
				'pengeluaran' : updatePengeluaran.val(),
				'penyesuaian-adjustment' : updatePenyesuaianAdjustment.val(),
				'saldo-akhir' : updateSaldoAkhir.val(),
				'stock-opname' : updateStockOpname.val(),
				'selisih' : updateSelisih.val(),
				'keterangan' : updateKeterangan.val(),
			};

			const executePost = {
				'data' : JEncrypt(JSON.stringify(params)),
			}

			const url = baseUrl("/auth/api/v2/update-reject-and-scrap");

			const execute = postField(url, 'POST', executePost, false);

			execute.done(function(result) {
				let obj = JSON.parse(JSON.stringify(result));

				if (obj.code == 200) {
					$(".air-badge").html(airBadge(obj.msg , 'success'));
					setTimeout(function() {
						window.location = window.location.href;
					}, 5000);
				} else {
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			});

			execute.fail(function() {
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			});
		});
	}

	$(document).ready(function () {
		const kodeBarang = $("#kode-barang");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeBarang.val() !== null) params['kode-barang'] = kodeBarang.val();
		$(".air-badge").html(loadingBackdrop());

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}
		const url = baseUrl("/auth/api/v2/get-reject-and-scrap");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
							"DIBUAT OLEH": obj.result[i].created_by,
							"TANGGAL DIBUAT": obj.result[i].created_date,
							"DIPERBAHARUI OLEH": obj.result[i].update_by,
							"TANGGAL DIPERBAHARUI": obj.result[i].update_date,
							"data": obj.result[i].id,
						};
					} else {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
						};
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-search-docs").click(function () {
		const kodeBarang = $("#kode-barang");
		const startPeriod = $("#start-period");
		const endPeriod = $("#end-period");
		const btn = $("#btn-search-docs");
		let allow = true;

		if (!inputValidation("#"+startPeriod.attr("id"), "#msg-"+startPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}
		if (!inputValidation("#"+endPeriod.attr("id"), "#msg-"+endPeriod.attr("id"))) {
			allow = false;
			btn.addClass("mb-4");
		}

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());
		btn.removeClass("mb-4");
		startPeriod.removeClass("is-valid");
		endPeriod.removeClass("is-valid");

		const params = {
			'start-period': startPeriod.val(),
			'end-period': endPeriod.val(),
		};

		if (kodeBarang.val() !== null) params['kode-barang'] = kodeBarang.val();

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v2/get-reject-and-scrap");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];

				for (let i = 0; i < obj.result.length; i++) {
					if (pagingRole() == "Administrator" || pagingRole() == "Development" || pagingRole() == "Member") {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
							"DIBUAT OLEH": obj.result[i].created_by,
							"TANGGAL DIBUAT": obj.result[i].created_date,
							"DIPERBAHARUI OLEH": obj.result[i].update_by,
							"TANGGAL DIPERBAHARUI": obj.result[i].update_date,
							"data": obj.result[i].id,
						};
					} else {
						sc[i] = {
							"NO": (i+1),
							"KODE BARANG": obj.result[i].material,
							"NAMA BARANG": obj.result[i].material_number,
							"SAT": obj.result[i].bum,
							"SALDO AWAL": obj.result[i].open_stock,
							"PEMASUKAN": obj.result[i].received_qty,
							"PENGELUARAN": obj.result[i].issue_qty,
							"PENYESUAIAN (ADJUSTMENT)": obj.result[i].penyesuaian,
							"SALDO AKHIR": obj.result[i].ending_stock,
							"STOCK OPNAME": obj.result[i].stock_opname,
							"SELISIH": obj.result[i].selisih,
							"KETERANGAN": obj.result[i].keterangan,
						};
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const laporanCctv = () => {
	const isOn = $(".main-js").attr("data");
	window.location.href = isOn;
}

// ==============================================================================
const smsShipmentInstruction = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;

	let deviceListTmp = false;
	let deviceListEditTmp = false;

	let autocompleteRows = {
		"label": [],
		"data": {}
	};

	let tableOptIndex = datatableOpt();

	let tableBtnIndex = [
		{	
			text : '<span class="mr-2">Add</span><i class="fas fa-fw fa-plus"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-new-sms-shipment-instruction');
				$(node).attr('disabled', false);
			}
		},
		{	
			text : '<span class="mr-2">Edit</span><i class="fas fa-fw fa-edit"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-edit-sms-shipment-instruction');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Cancel</span><i class="fas fa-fw fa-ban"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-cancel-sms-shipment-instruction');
				$(node).attr('disabled', true);
			}
		}
	];

	tableOptIndex['buttons'] = arrayPrepend(tableBtnIndex, selectionExportBtn());

	tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Doc Number"},
		{data: "PO Number"},
		{data: "COO"},
		{data: "Customer Name"},
		{data: "Delivery Plan Date"},
		{data: "Consignee"},
		{data: "address"},
		{data: "EORI No."},
		{data: "Attention"},
		{data: "Email"},
		{data: "Contact Number"},
		{data: "Forwarder / Courier"},
		{data: "Package"},
		{data: "Device"},
		{data: "Quantity"},
		{data: "HS Code"}
	];

	tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-sms-shipment-instruction-list');
		$(row).attr('data', data.data);
		// $(row).attr('flag', data.flag);
		// $(row).attr('fwd', data.fwd);
		$(row).attr('stg', false);
	};

	tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 1, 2, 3, 5, 10, 11],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
				// $(td).addClass(rowData.clr);
			}
		},
		{
			"targets": [4, 6, 7, 8, 9],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
				// $(td).addClass(rowData.clr);
			}
		},
		{
			"targets": [12, 13, 14, 15],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
				// $(td).addClass(rowData.clr);
			}
		},
	];

	// ORDER TABLE COLUMN BY IS DISABLE
	tableOptIndex['rowsGroup'] = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
	];

	let dataTableIndex = $('#datatable-sms-shipment-instruction').DataTable(tableOptIndex);

	const selectSmsShpList = (arr) => {
		const btnEdit = $("#btn-edit-sms-shipment-instruction");
		const btnDelete = $("#btn-cancel-sms-shipment-instruction");

		let tables = $('[id^="select-sms-shipment-instruction-list"]');
		let isOn = 0;
		let shiftTable = 0;
		let fwd = [];

		let x = 0;
		for (let i = 0; i < tables.length; i++) {
			if (selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				fwd[x] = tables.eq(i).attr("fwd");
				isOn++;
				x++;
				lastPressed = (i+1);
			} else {
				if (ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							lastPressed = (i+1);
							fwd[x] = tables.eq(i).attr("fwd");
							x++;
						}
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							if (!fwd.includes(tables.eq(i).attr("fwd"))) {
								fwd[x] = tables.eq(i).attr("fwd");
								x++;
								isOn++;
							}
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (shiftPressed && !ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						shiftTable = (i+1);
					}
				}

				if (!shiftPressed) shiftTable = 0;
			}
		}

		// naik
		if (lastPressed && shiftTable && lastPressed > shiftTable) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					fwd[x] = tables.eq(i).attr("fwd");
					x++;
					isOn++;
				}
			}
		}

		// turun
		if (shiftTable > lastPressed) {
			if (lastPressed >= 1) lastPressed --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= lastPressed && i < shiftTable) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					fwd[x] = tables.eq(i).attr("fwd");
					x++;
					isOn++;
				}
			}
		}

		 // console.log("fwd.length : "+ fwd.length +" || fwd.filter(onlyUnique).length : "+ fwd.filter(onlyUnique).length +" || isOn : "+ isOn);
		 // console.log(fwd.includes('FWD-00000003'));
		if (isOn == 0 || fwd.filter(onlyUnique).length == 0) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", true);
			lastPressed = 0;
		}

		if (isOn == 1 && fwd.filter(onlyUnique).length == 1) {
			btnEdit.attr("disabled", false);
			btnDelete.attr("disabled", false);
		}

		if (isOn >= 2 || fwd.filter(onlyUnique).length >= 2) {
			btnEdit.attr("disabled", true);
			btnDelete.attr("disabled", false);
		}
	}

	$("#sms-si-new-description-device-0").select2({
		dropdownParent: $('#select2-sms-si-new-description-device-0')
	});

	$(document).keydown(function(event){
		if(event.which == "17") ctrlPressed = true;
		if(event.which == "16") shiftPressed = true;
		if(ctrlPressed && event.which == "65") selectAll = true;

		if (event.keyCode == 65 && event.ctrlKey && selectAll && $("#row-index-1").attr("flag") == "true") {
			textSelection('datatable-sms-shipment-instruction');
			event.preventDefault();
			selectSmsShpList();
		}
	});

	$(document).keyup(function(){
		ctrlPressed = false;
		shiftPressed = false;
		selectAll = false;
	});

	$(document).on('click', '[id^="select-sms-shipment-instruction-list"]', function () {
		const myData = $(this);

		selectSmsShpList(myData);
	});

	$(document).ready(function () {
		const smsSiNewCoo = $("#sms-si-new-coo");
		const smsSiNewCustName = $("#sms-si-new-cust-name");
		const smsSiNewPoNumber = $("#sms-si-new-po-number");
		const smsSiNewDelPlanDate = $("#sms-si-new-delivery-plan-date");
		const smsSiNewConsignee = $("#sms-si-new-consignee");
		const smsSiNewAddress = $("#sms-si-new-address");
		const smsSiNewEoriNo = $("#sms-si-new-eori-no");
		const smsSiNewAttention = $("#sms-si-new-attention");
		const smsSiNewEmail = $("#sms-si-new-email");
		const smsSiNewContactNumber = $("#sms-si-new-contact-number");
		const smsSiNewForwarder = $("#sms-si-new-forwarder");
		const smsSiNewCourirNumber = $("#sms-si-new-account-number");
		const smsSiNewRemark = $("#sms-si-new-remark");

		const smsSiEditCoo = $("#sms-si-edit-coo");
		const smsSiEditCustName = $("#sms-si-edit-cust-name");
		const smsSiEditPoNumber = $("#sms-si-edit-po-number");
		const smsSiEditDelPlanDate = $("#sms-si-edit-delivery-plan-date");
		const smsSiEditConsignee = $("#sms-si-edit-consignee");
		const smsSiEditAddress = $("#sms-si-edit-address");
		const smsSiEditEoriNo = $("#sms-si-edit-eori-no");
		const smsSiEditAttention = $("#sms-si-edit-attention");
		const smsSiEditEmail = $("#sms-si-edit-email");
		const smsSiEditContactNumber = $("#sms-si-edit-contact-number");
		const smsSiEditForwarder = $("#sms-si-edit-forwarder");
		const smsSiEditCourirNumber = $("#sms-si-edit-account-number");
		const smsSiEditRemark = $("#sms-si-edit-remark");

		$(".air-badge").html(loadingBackdrop());

		const url = baseUrl("/auth/api/v20/info-sms-shp-instruction");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				autocompleteRows['label']['consignee'] = []
				autocompleteRows['label']['coo'] = []
				autocompleteRows['label']['address'] = []

				for (let i = 0; i < obj.result['tmp'].length; i++) {
					autocompleteRows['label']['consignee'][i] = {value: obj.result['tmp'][i].consignee, label: obj.result['tmp'][i].consignee, data: obj.result['tmp'][i].sms_number};
					autocompleteRows['label']['coo'][i] = {value: obj.result['tmp'][i].coo, label: obj.result['tmp'][i].coo, data: obj.result['tmp'][i].sms_number};
					autocompleteRows['label']['address'][i] = {value: obj.result['tmp'][i].address, label: obj.result['tmp'][i].address, data: obj.result['tmp'][i].sms_number};
					autocompleteRows['data'][obj.result['tmp'][i].sms_number] = obj.result['tmp'][i];
				}

				let sc = [];
				let y = 0;
				for (let i = 0; i < obj.result['info'].length; i++) {
					for (let x = 0; x < obj.result['info'][i]['category'].length; x++) {
						sc[y] = {
							"No": (i+1),
							"Doc Number": obj.result['info'][i].sms_number,
							"PO Number": obj.result['info'][i].po_number,
							"COO": obj.result['info'][i].coo,
							"Customer Name": obj.result['info'][i].customer_name,
							"Delivery Plan Date": obj.result['info'][i].delivery_plan_date,
							"Consignee": obj.result['info'][i].consignee,
							"address": obj.result['info'][i].address,
							"EORI No": obj.result['info'][i].eori_no,
							"Attention": obj.result['info'][i].attention,
							"Email": obj.result['info'][i].email,
							"Contact Number": obj.result['info'][i].contact_number,
							"Forwarder / Courier": obj.result['info'][i].forwarder,
							"Package": obj.result['info'][i]['category'][x]['cat_package'],
							"Device": obj.result['info'][i]['category'][x]['cat_device'],
							"Quantity": obj.result['info'][i]['category'][x]['cat_quantity'],
							"HS Code": obj.result['info'][i]['category'][x]['cat_hs_code'],
							"data": obj.result['info'][i].sms_number,
							// "data": obj.result[i].cat_sms,
						};

						y++;
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$("#sms-si-new-consignee").autocomplete({
					source: autocompleteRows['label']['consignee'],
					select: function(event, ui ) {
						let data = autocompleteRows['data'][ui.item.data];

						smsSiNewPoNumber.val(data.po_number);
						smsSiNewCoo.val(data.coo);
						smsSiNewCustName.val(data.customer_name);
						smsSiNewDelPlanDate.val(data.delivery_plan_date);
						smsSiNewAddress.val(data.address);
						smsSiNewEoriNo.val(data.eori_no);
						smsSiNewAttention.val(data.attention);
						smsSiNewEmail.val(data.email);
						smsSiNewContactNumber.val(data.contact_number);
						smsSiNewForwarder.val(data.forwarder);
						smsSiNewCourirNumber.val(data.courir_number);
						smsSiNewRemark.val(data.remark);
					}
				});

				$("#sms-si-new-coo").autocomplete({
					source: autocompleteRows['label']['coo'],
					select: function(event, ui ) {
						let data = autocompleteRows['data'][ui.item.data];

						smsSiNewPoNumber.val(data.po_number);
						smsSiNewConsignee.val(data.consignee);
						smsSiNewCustName.val(data.customer_name);
						smsSiNewDelPlanDate.val(data.delivery_plan_date);
						smsSiNewAddress.val(data.address);
						smsSiNewEoriNo.val(data.eori_no);
						smsSiNewAttention.val(data.attention);
						smsSiNewEmail.val(data.email);
						smsSiNewContactNumber.val(data.contact_number);
						smsSiNewForwarder.val(data.forwarder);
						smsSiNewCourirNumber.val(data.courir_number);
						smsSiNewRemark.val(data.remark);
					}
				});

				$("#sms-si-new-address").autocomplete({
					source: autocompleteRows['label']['address'],
					select: function(event, ui ) {
						let data = autocompleteRows['data'][ui.item.data];

						smsSiNewPoNumber.val(data.po_number);
						smsSiNewConsignee.val(data.consignee);
						smsSiNewCustName.val(data.customer_name);
						smsSiNewDelPlanDate.val(data.delivery_plan_date);
						smsSiNewCoo.val(data.coo);
						smsSiNewEoriNo.val(data.eori_no);
						smsSiNewAttention.val(data.attention);
						smsSiNewEmail.val(data.email);
						smsSiNewContactNumber.val(data.contact_number);
						smsSiNewForwarder.val(data.forwarder);
						smsSiNewCourirNumber.val(data.courir_number);
						smsSiNewRemark.val(data.remark);
					}
				});

				$("#sms-si-new-consignee").autocomplete({
					source: autocompleteRows['consignee'],
					select: function( event, ui ) {
						let data = autocompleteRows['data'][ui.item.data];

						smsSiNewPoNumber.val(data.po_number);
						smsSiNewCoo.val(data.coo);
						smsSiNewCustName.val(data.customer_name);
						smsSiNewDelPlanDate.val(data.delivery_plan_date);
						smsSiNewAddress.val(data.address);
						smsSiNewEoriNo.val(data.eori_no);
						smsSiNewAttention.val(data.attention);
						smsSiNewEmail.val(data.email);
						smsSiNewContactNumber.val(data.contact_number);
						smsSiNewForwarder.val(data.forwarder);
						smsSiNewCourirNumber.val(data.courir_number);
						smsSiNewRemark.val(data.remark);
					}
				});

				$("#sms-si-edit-consignee").autocomplete({
					source: autocompleteRows['consignee'],
					select: function( event, ui ) {
						let data = autocompleteRows['data'][ui.item.data];

						smsSiEditPoNumber.val(data.po_number);
						smsSiEditCoo.val(data.coo);
						smsSiEditCustName.val(data.customer_name);
						smsSiEditDelPlanDate.val(data.delivery_plan_date);
						smsSiEditAddress.val(data.address);
						smsSiEditEoriNo.val(data.eori_no);
						smsSiEditAttention.val(data.attention);
						smsSiEditEmail.val(data.email);
						smsSiEditContactNumber.val(data.contact_number);
						smsSiEditForwarder.val(data.forwarder);
						smsSiEditCourirNumber.val(data.courir_number);
						smsSiEditRemark.val(data.remark);
					}
				});

				$(".air-badge").html('');
			} else {
				autocompleteRows['label']['consignee'] = []
				autocompleteRows['label']['coo'] = []
				autocompleteRows['label']['address'] = []

				for (let i = 0; i < obj.result['tmp'].length; i++) {
					autocompleteRows['label']['consignee'][i] = {value: obj.result['tmp'][i].consignee, label: obj.result['tmp'][i].consignee, data: obj.result['tmp'][i].sms_number};
					autocompleteRows['label']['coo'][i] = {value: obj.result['tmp'][i].coo, label: obj.result['tmp'][i].coo, data: obj.result['tmp'][i].sms_number};
					autocompleteRows['label']['address'][i] = {value: obj.result['tmp'][i].address, label: obj.result['tmp'][i].address, data: obj.result['tmp'][i].sms_number};
					autocompleteRows['data'][obj.result['tmp'][i].sms_number] = obj.result['tmp'][i];
				}

				$("#sms-si-new-consignee").autocomplete({
					source: autocompleteRows['label']['consignee'],
					select: function(event, ui ) {
						let data = autocompleteRows['data'][ui.item.data];

						smsSiNewPoNumber.val(data.po_number);
						smsSiNewCoo.val(data.coo);
						smsSiNewCustName.val(data.customer_name);
						smsSiNewDelPlanDate.val(data.delivery_plan_date);
						smsSiNewAddress.val(data.address);
						smsSiNewEoriNo.val(data.eori_no);
						smsSiNewAttention.val(data.attention);
						smsSiNewEmail.val(data.email);
						smsSiNewContactNumber.val(data.contact_number);
						smsSiNewForwarder.val(data.forwarder);
						smsSiNewCourirNumber.val(data.courir_number);
						smsSiNewRemark.val(data.remark);
					}
				});

				$("#sms-si-new-coo").autocomplete({
					source: autocompleteRows['label']['coo'],
					select: function(event, ui ) {
						let data = autocompleteRows['data'][ui.item.data];

						smsSiNewPoNumber.val(data.po_number);
						smsSiNewConsignee.val(data.consignee);
						smsSiNewCustName.val(data.customer_name);
						smsSiNewDelPlanDate.val(data.delivery_plan_date);
						smsSiNewAddress.val(data.address);
						smsSiNewEoriNo.val(data.eori_no);
						smsSiNewAttention.val(data.attention);
						smsSiNewEmail.val(data.email);
						smsSiNewContactNumber.val(data.contact_number);
						smsSiNewForwarder.val(data.forwarder);
						smsSiNewCourirNumber.val(data.courir_number);
						smsSiNewRemark.val(data.remark);
					}
				});

				$("#sms-si-new-address").autocomplete({
					source: autocompleteRows['label']['address'],
					select: function(event, ui ) {
						let data = autocompleteRows['data'][ui.item.data];

						smsSiNewPoNumber.val(data.po_number);
						smsSiNewConsignee.val(data.consignee);
						smsSiNewCustName.val(data.customer_name);
						smsSiNewDelPlanDate.val(data.delivery_plan_date);
						smsSiNewCoo.val(data.coo);
						smsSiNewEoriNo.val(data.eori_no);
						smsSiNewAttention.val(data.attention);
						smsSiNewEmail.val(data.email);
						smsSiNewContactNumber.val(data.contact_number);
						smsSiNewForwarder.val(data.forwarder);
						smsSiNewCourirNumber.val(data.courir_number);
						smsSiNewRemark.val(data.remark);
					}
				});

				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#sms-si-new-coo").keyup(function () {

		const data = $("#sms-si-new-coo");
		// const device = $("#sms-si-new-description-device");
		const device = $('select[id^="sms-si-new-description-device"]');

		const params = {
			'coo': data.val(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v20/get-device");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				deviceListTmp = result;
				for (var x = 0; x < device.length; x++) {
					device.eq(x).find('option').remove();
					device.eq(x).append(new Option('Choose a Device', '', true, true));

					for (var i = 0; i < obj.result.length; i++) {
						device.eq(x).append(new Option(obj.result[i], obj.result[i]));
					}
				}

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#sms-si-new-coo").change(function () {
		const data = $("#sms-si-new-coo");
		// const device = $("#sms-si-new-description-device");
		const device = $('select[id^="sms-si-new-description-device"]');

		const params = {
			'coo': data.val(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v20/get-device");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				deviceListTmp = result;
				for (var x = 0; x < device.length; x++) {
					device.eq(x).find('option').remove();
					device.eq(x).append(new Option('Choose a Device', '', true, true));

					for (var i = 0; i < obj.result.length; i++) {
						device.eq(x).append(new Option(obj.result[i], obj.result[i]));
					}
				}

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
	
	$("#btn-cancel-sms-shipment-instruction").click(function () {
		const modal = $("#modal-cancel-sms");
		const label = $(".info-cancel-sms");
		const btn = $("#btn-save-cancel-sms");

		let tables = $('[id^="select-sms-shipment-instruction-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(1).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	});

	$("#btn-edit-sms-shipment-instruction").click(function () {
		const rowIndex1 = $("#row-index-1");
		const rowIndex2 = $("#row-index-2");
		const rowIndex3 = $("#row-index-3");

		const btnTarget = $("#btn-sms-si-edit-save");

		const smsSiEditPoNumber = $("#sms-si-edit-po-number");
		const smsSiEditCoo = $("#sms-si-edit-coo");
		const smsSiEditCustName = $("#sms-si-edit-cust-name");
		const smsSiEditDelPlanDate = $("#sms-si-edit-delivery-plan-date");
		const smsSiEditConsignee = $("#sms-si-edit-consignee");
		const smsSiEditAddress = $("#sms-si-edit-address");
		const smsSiEditEoriNo = $("#sms-si-edit-eori-no");
		const smsSiEditAttention = $("#sms-si-edit-attention");
		const smsSiEditEmail = $("#sms-si-edit-email");
		const smsSiEditContactNumber = $("#sms-si-edit-contact-number");
		const smsSiEditForwarder = $("#sms-si-edit-forwarder");
		const smsSiEditCourirNumber = $("#sms-si-edit-account-number");
		const smsSiEditRemark = $("#sms-si-edit-remark");

		const smsDesClone = $("#sms-si-edit-clone-description");
		const smsSiEditDescriptionPackage = $('[id^="sms-si-edit-description-package"]');
		const smsSiEditDescriptionDevice = $('[id^="sms-si-edit-description-device"]');
		const smsSiEditDescriptionQuantity = $('[id^="sms-si-edit-description-quantity"]');
		const smsSiEditDescriptionInvoice = $('[id^="sms-si-edit-description-invoice"]');
		const smsSiEditDescriptionHsCode = $('[id^="sms-si-edit-description-hs-code"]');

		let tables = $('[id^="select-sms-shipment-instruction-list"]');
		let id = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id = tables.eq(i).attr('data');
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': id,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v20/get-sms-shp-instruction");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				// btnTarget.attr('data', obj.result['id']);
				btnTarget.attr('sms-desc', obj.result['info']['cat_sms']);
				btnTarget.attr('sms-info', obj.result['info']['sms_number']);

				smsSiEditPoNumber.val(obj.result['info']['po_number']);
				smsSiEditCoo.val(obj.result['info']['coo']);
				smsSiEditCustName.val(obj.result['info']['customer_name']);
				smsSiEditDelPlanDate.val(obj.result['info']['delivery_plan_date']);
				smsSiEditConsignee.val(obj.result['info']['consignee']);
				smsSiEditAddress.val(obj.result['info']['address']);
				smsSiEditEoriNo.val(obj.result['info']['eori_no']);
				smsSiEditAttention.val(obj.result['info']['attention']);
				smsSiEditEmail.val(obj.result['info']['email']);
				smsSiEditContactNumber.val(obj.result['info']['contact_number']);
				smsSiEditForwarder.val(obj.result['info']['forwarder']);
				smsSiEditCourirNumber.val(obj.result['info']['courir_number']);
				smsSiEditRemark.val(obj.result['info']['remark']);

				smsDesClone.html('');

				deviceListEditTmp = obj.result['device'];
				for (var i = 0; i < obj.result['info']['category'].length; i++) {
					let selectOption = '';

					for (var x = 0; x < obj.result['device'].length; x++) {
						selectOption += `<option value="${obj.result['device'][x]}"${(obj.result['device'][x] == obj.result['info']['category'][i].cat_device ? " selected" : "")}>${obj.result['device'][x]}</option>`
					}

					let sc = `
						<div class="form-group row" number="${i+Date.now()}" id="sms-si-edit-description-column">
				          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
				          <div class="col-sm-12 col-md-12 col-lg-10">
				            <div class="form-row">
				              <div class="col-lg-1">
				                <div class="form-group row">
				                  <div class="col-sm-12 col-md-12 col-lg-3">
				                    <div class="form-check mb-lg-0">
				                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-edit-description-checked" number="${i+Date.now()}">
				                      <label class="form-check-label d-lg-none" for="sms-si-edit-description-checked">Checked</label>
				                    </div>
				                  </div>
				                </div>
				              </div>
				              <div class="col-lg-11">
				                <div class="row">
				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-edit-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-edit-description-package" value="${obj.result['info']['category'][i].cat_package}" placeholder="Package" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-edit-description-package"></div>
				                      </div>
				                    </div>
				                  </div>

				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-edit-description-device-${i+Date.now()}" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
				                      <select class="form-control" id="sms-si-edit-description-device-${i+Date.now()}" title="Device" data-live-search="true" data-live-search-placeholder="Device" number="${i+Date.now()}">
				                        <option value="" disabled selected>Choose a Device</option>
				                        ${selectOption}
				                      </select>
				                      <div id="select2-sms-si-edit-description-device-${i+Date.now()}" number="${i+Date.now()}"></div>
				                      <div class="invalid-feedback" id="msg-sms-si-edit-description-device-${i+Date.now()}" number="${i+Date.now()}"></div>
				                    </div>
				                  </div>

				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-edit-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-edit-description-quantity" value="${obj.result['info']['category'][i].cat_quantity}" placeholder="Quantity" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-edit-description-quantity"></div>
				                      </div>
				                    </div>
				                  </div>

				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-edit-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-edit-description-invoice" value="${obj.result['info']['category'][i].cat_invoice}" placeholder="Invoice" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-edit-description-invoice"></div>
				                      </div>
				                    </div>
				                  </div>

				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-edit-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-edit-description-hs-code" value="${obj.result['info']['category'][i].cat_hs_code}" placeholder="HS Code" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-edit-description-hs-code"></div>
				                      </div>
				                    </div>
				                  </div>
				                </div>
				              </div>
				            </div>
				          </div>
				        </div>
					`;
					smsDesClone.append(sc);
				}

				$(".air-badge").html('');

				let slect2 = $('select[id^="sms-si-edit-description-device"]');
				let boxSlect2 = $('div[id^="select2-sms-si-edit-description-device"]');
				for (var i = 0; i < slect2.length; i++) {
					if (slect2.eq(x).attr('aria-hidden') !== "true") {
						$("#"+slect2.eq(i).attr('id')).select2({
							dropdownParent: $("#"+boxSlect2.eq(i).attr('id'))
						});
					}
				}

				rowIndex1.addClass("d-none");
				rowIndex1.attr("flag", "false");

				rowIndex2.addClass("d-none");
				rowIndex2.attr("flag", "false");

				rowIndex3.removeClass("d-none");
				rowIndex3.attr("flag", "true");

			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	})

	$("#btn-new-sms-shipment-instruction").click(function () {
		const rowIndex1 = $("#row-index-1");
		const rowIndex2 = $("#row-index-2");
		const rowIndex3 = $("#row-index-3");

		rowIndex1.addClass("d-none");
		rowIndex1.attr("flag", "false");

		rowIndex2.removeClass("d-none");
		rowIndex2.attr("flag", "true");

		rowIndex3.addClass("d-none");
		rowIndex3.attr("flag", "false");
	});

	$("#btn-back-to-index-1").click(function () {
		const rowIndex1 = $("#row-index-1");
		const rowIndex2 = $("#row-index-2");
		const rowIndex3 = $("#row-index-3");

		rowIndex1.removeClass("d-none");
		rowIndex1.attr("flag", "true");

		rowIndex2.addClass("d-none");
		rowIndex2.attr("flag", "false");

		rowIndex3.addClass("d-none");
		rowIndex3.attr("flag", "false");
	});

	$("#btn-back-to-index-2").click(function () {
		const rowIndex1 = $("#row-index-1");
		const rowIndex2 = $("#row-index-2");
		const rowIndex3 = $("#row-index-3");

		rowIndex1.removeClass("d-none");
		rowIndex1.attr("flag", "true");

		rowIndex2.addClass("d-none");
		rowIndex2.attr("flag", "false");

		rowIndex3.addClass("d-none");
		rowIndex3.attr("flag", "false");
	});

	$("#turn-colomn-sms-si-new-description").click(function() {
		let clone = $("#sms-si-new-clone-description");
		let totalClone = $('[id^="sms-si-new-description-column"]');

		let sc = `
		<div class="form-group row" number="${totalClone.length+Date.now()}" id="sms-si-new-description-column">
          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
          <div class="col-sm-12 col-md-12 col-lg-10">
            <div class="form-row">
              <div class="col-lg-1">
                <div class="form-group row">
                  <div class="col-sm-12 col-md-12 col-lg-3">
                    <div class="form-check mb-lg-0">
                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-new-description-checked" number="${totalClone.length+Date.now()}">
                      <label class="form-check-label d-lg-none" for="sms-si-new-description-checked">Checked</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-11">
                <div class="row">
                  <div class="col-lg-3">
                    <div class="form-group row">
                      <label for="sms-si-new-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
                      <div class="col-sm-12 col-md-12 col-lg-12">
                        <input type="text" class="form-control" id="sms-si-new-description-package" placeholder="Package" number="${totalClone.length+Date.now()}">
                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-new-description-package"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group row">
                      <label for="sms-si-new-description-device-${totalClone.length+Date.now()}" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
                      <select class="form-control" id="sms-si-new-description-device-${totalClone.length+Date.now()}" title="Device" data-live-search="true" data-live-search-placeholder="Device" number="${totalClone.length}">
                        <option value="" disabled selected>Choose a Device</option>
                      </select>
                      <div id="select2-sms-si-new-description-device-${totalClone.length+Date.now()}" number="${totalClone.length}"></div>
                      <div class="invalid-feedback" id="msg-sms-si-new-description-device-${totalClone.length+Date.now()}" number="${totalClone.length}"></div>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="form-group row">
                      <label for="sms-si-new-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
                      <div class="col-sm-12 col-md-12 col-lg-12">
                        <input type="text" class="form-control" id="sms-si-new-description-quantity" placeholder="Quantity" number="${totalClone.length+Date.now()}">
                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-new-description-quantity"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="form-group row">
                      <label for="sms-si-new-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
                      <div class="col-sm-12 col-md-12 col-lg-12">
                        <input type="text" class="form-control" id="sms-si-new-description-invoice" placeholder="Invoice" number="${totalClone.length+Date.now()}">
                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-new-description-invoice"></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="form-group row">
                      <label for="sms-si-new-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
                      <div class="col-sm-12 col-md-12 col-lg-12">
                        <input type="text" class="form-control" id="sms-si-new-description-hs-code" placeholder="HS Code" number="${totalClone.length+Date.now()}">
                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-new-description-hs-code"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
		`;
		clone.append(sc);

		let slect2 = $('select[id^="sms-si-new-description-device"]');
		let boxSlect2 = $('div[id^="select2-sms-si-new-description-device"]');

		for (var x = 0; x < slect2.length; x++) {
			if (slect2.eq(x).attr('aria-hidden') !== "true") {
				if (deviceListTmp !== false) {
					for (var i = 0; i < deviceListTmp.result.length; i++) {
						slect2.eq(x).append(new Option(deviceListTmp.result[i], deviceListTmp.result[i]));
					}
				}
			}
		}

		for (var i = 0; i < slect2.length; i++) {
			if (slect2.eq(x).attr('aria-hidden') !== "true") {
				$("#"+slect2.eq(i).attr('id')).select2({
					dropdownParent: $("#"+boxSlect2.eq(i).attr('id'))
				});
			}
		}
	});

	$("#burn-colomn-sms-si-new-description").click(function () {
		const dv = $('[id^="sms-si-new-description-column"]');
		const checkbox = $('[id^="sms-si-new-description-checked"]');

		let number = false;

		for (let i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				number = checkbox.eq(i).attr('number');
				dv.eq(i).remove();
			} else {
				checkbox.eq(i).attr("number", i);
				dv.eq(i).attr("number", i);
			}
		}

		if (!number) {
			$(".air-badge").html(airBadge("Please check the box", 'danger'));
		}
	});

	$("#turn-colomn-sms-si-edit-description").click(function() {
	    let clone = $("#sms-si-edit-clone-description");
	    let totalClone = $('[id^="sms-si-edit-description-column"]');

	    let sc = `
		    <div class="form-group row" number="${totalClone.length+Date.now()}" id="sms-si-edit-description-column">
	          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
	          <div class="col-sm-12 col-md-12 col-lg-10">
	            <div class="form-row">
	              <div class="col-lg-1">
	                <div class="form-group row">
	                  <div class="col-sm-12 col-md-12 col-lg-3">
	                    <div class="form-check mb-lg-0">
	                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-edit-description-checked" number="${totalClone.length+Date.now()}">
	                      <label class="form-check-label d-lg-none" for="sms-si-edit-description-checked">Checked</label>
	                    </div>
	                  </div>
	                </div>
	              </div>
	              <div class="col-lg-11">
	                <div class="row">
	                  <div class="col-lg-3">
	                    <div class="form-group row">
	                      <label for="sms-si-edit-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-edit-description-package" placeholder="Package" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-edit-description-package"></div>
	                      </div>
	                    </div>
	                  </div>
	                  <div class="col-lg-3">
	                    <div class="form-group row">
	                      <label for="sms-si-edit-description-device-${totalClone.length+Date.now()}" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
	                      <select class="form-control" id="sms-si-edit-description-device-${totalClone.length+Date.now()}" title="Device" data-live-search="true" data-live-search-placeholder="Device" number="${totalClone.length}">
	                        <option value="" disabled selected>Choose a Device</option>
	                      </select>
	                      <div id="select2-sms-si-edit-description-device-${totalClone.length+Date.now()}" number="${totalClone.length}"></div>
	                      <div class="invalid-feedback" id="msg-sms-si-edit-description-device-${totalClone.length+Date.now()}" number="${totalClone.length}"></div>
	                    </div>
	                  </div>
	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-edit-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-edit-description-quantity" placeholder="Quantity" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-edit-description-quantity"></div>
	                      </div>
	                    </div>
	                  </div>
	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-edit-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-edit-description-invoice" placeholder="Invoice" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-edit-description-invoice"></div>
	                      </div>
	                    </div>
	                  </div>
	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-edit-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-edit-description-hs-code" placeholder="HS Code" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-edit-description-hs-code"></div>
	                      </div>
	                    </div>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
	    `;
	    clone.append(sc);

	    let slect2 = $('select[id^="sms-si-edit-description-device"]');
	    let boxSlect2 = $('div[id^="select2-sms-si-edit-description-device"]');

	    for (var x = 0; x < slect2.length; x++) {
	    	if (slect2.eq(x).attr('aria-hidden') !== "true") {
	    		if (deviceListEditTmp !== false) {
	    			for (var i = 0; i < deviceListEditTmp.length; i++) {
	    				slect2.eq(x).append(new Option(deviceListEditTmp[i], deviceListEditTmp[i]));
	    			}
	    		}
	    	}
	    }

	    for (var i = 0; i < slect2.length; i++) {
	      if (slect2.eq(x).attr('aria-hidden') !== "true") {
	        $("#"+slect2.eq(i).attr('id')).select2({
	          dropdownParent: $("#"+boxSlect2.eq(i).attr('id'))
	        });
	      }
	    }
	});

	$("#burn-colomn-sms-si-edit-description").click(function () {
		const dv = $('[id^="sms-si-edit-description-column"]');
		const checkbox = $('[id^="sms-si-edit-description-checked"]');

		let number = false;

		for (let i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				number = checkbox.eq(i).attr('number');
				dv.eq(i).remove();
			} else {
				checkbox.eq(i).attr("number", i);
				dv.eq(i).attr("number", i);
			}
		}

		if (!number) {
			$(".air-badge").html(airBadge("Please check the box", 'danger'));
		}
	});

	$("#btn-sms-si-new-save").click(function () {
		const smsSiNewPoNumber = $("#sms-si-new-po-number");
		const smsSiNewCoo = $("#sms-si-new-coo");
		const smsSiNewCustName = $("#sms-si-new-cust-name");
		const smsSiNewDelPlanDate = $("#sms-si-new-delivery-plan-date");
		const smsSiNewConsignee = $("#sms-si-new-consignee");
		const smsSiNewAddress = $("#sms-si-new-address");
		const smsSiNewEoriNo = $("#sms-si-new-eori-no");
		const smsSiNewAttention = $("#sms-si-new-attention");
		const smsSiNewEmail = $("#sms-si-new-email");
		const smsSiNewContactNumber = $("#sms-si-new-contact-number");
		const smsSiNewForwarder = $("#sms-si-new-forwarder");
		const smsSiNewCourirNumber = $("#sms-si-new-account-number");
		const smsSiNewRemark = $("#sms-si-new-remark");

		const smsSiNewDescriptionPackage = $('[id^="sms-si-new-description-package"]');
		const smsSiNewDescriptionDevice = $('[id^="sms-si-new-description-device"]');
		const smsSiNewDescriptionQuantity = $('[id^="sms-si-new-description-quantity"]');
		const smsSiNewDescriptionInvoice = $('[id^="sms-si-new-description-invoice"]');
		const smsSiNewDescriptionHsCode = $('[id^="sms-si-new-description-hs-code"]');
		let allow = true;

		if (!inputValidation("#"+smsSiNewCoo.attr("id"), "#msg-"+smsSiNewCoo.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiNewCustName.attr("id"), "#msg-"+smsSiNewCustName.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiNewPoNumber.attr("id"), "#msg-"+smsSiNewPoNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiNewDelPlanDate.attr("id"), "#msg-"+smsSiNewDelPlanDate.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiNewConsignee.attr("id"), "#msg-"+smsSiNewConsignee.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiNewAddress.attr("id"), "#msg-"+smsSiNewAddress.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiNewEoriNo.attr("id"), "#msg-"+smsSiNewEoriNo.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiNewAttention.attr("id"), "#msg-"+smsSiNewAttention.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiNewEmail.attr("id"), "#msg-"+smsSiNewEmail.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiNewContactNumber.attr("id"), "#msg-"+smsSiNewContactNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiNewForwarder.attr("id"), "#msg-"+smsSiNewForwarder.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiNewCourirNumber.attr("id"), "#msg-"+smsSiNewCourirNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiNewRemark.attr("id"), "#msg-"+smsSiNewRemark.attr("id"))) allow = false;

		for (let i = 0; i < smsSiNewDescriptionPackage.length; i++) {
			if (!inputValidation("input[id$='"+smsSiNewDescriptionPackage.eq(i).attr('id')+"'][number='"+smsSiNewDescriptionPackage.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiNewDescriptionPackage.eq(i).attr('id')+"'][number='"+smsSiNewDescriptionPackage.eq(i).attr('number')+"']")) allow = false;
			if (!select2Validation("select[id$='"+smsSiNewDescriptionDevice.eq(i).attr('id')+"'][number='"+smsSiNewDescriptionDevice.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiNewDescriptionDevice.eq(i).attr('id')+"'][number='"+smsSiNewDescriptionDevice.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiNewDescriptionQuantity.eq(i).attr('id')+"'][number='"+smsSiNewDescriptionQuantity.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiNewDescriptionQuantity.eq(i).attr('id')+"'][number='"+smsSiNewDescriptionQuantity.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiNewDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiNewDescriptionInvoice.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiNewDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiNewDescriptionInvoice.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiNewDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiNewDescriptionHsCode.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiNewDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiNewDescriptionHsCode.eq(i).attr('number')+"']")) allow = false;
		}

		if (!allow) return false;
		$(".air-badge").html(loadingBackdrop());

		const params = {
			"new-po-number" : smsSiNewPoNumber.val(),
			"new-coo" : smsSiNewCoo.val(),
			"new-customer-name" : smsSiNewCustName.val(),
			"new-delivery-plan-date" : smsSiNewDelPlanDate.val(),
			"new-consignee" : smsSiNewConsignee.val(),
			"new-address" : smsSiNewAddress.val(),
			"new-eori-no" : smsSiNewEoriNo.val(),
			"new-attention" : smsSiNewAttention.val(),
			"new-email" : smsSiNewEmail.val(),
			"new-contact-number" : smsSiNewContactNumber.val(),
			"new-forwarder" : smsSiNewForwarder.val(),
			"new-accout-number" : smsSiNewCourirNumber.val(),
			"new-remark" : smsSiNewRemark.val(),
			"cat-sms" : [],
		};

		for (let i = 0; i < smsSiNewDescriptionPackage.length; i++) {
			params['cat-sms'].push({
				"package": smsSiNewDescriptionPackage.eq(i).val(),
				"device": smsSiNewDescriptionDevice.eq(i).val(),
				"quantity": smsSiNewDescriptionQuantity.eq(i).val(),
				"invoice": smsSiNewDescriptionInvoice.eq(i).val(),
				"hs-code": smsSiNewDescriptionHsCode.eq(i).val(),
			});
		}

		const url = baseUrl("/auth/api/v20/new-sms-shp-instruction");

		const execute = postField(url, 'POST', params, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));
				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
	
	// #############################
	$("#btn-sms-si-edit-save").click(function () {
		const btnTarget = $("#btn-sms-si-edit-save");
	    const smsSiEditPoNumber = $("#sms-si-edit-po-number");
	    const smsSiEditCoo = $("#sms-si-edit-coo");
	    const smsSiEditCustName = $("#sms-si-edit-cust-name");
	    const smsSiEditDelPlanDate = $("#sms-si-edit-delivery-plan-date");
	    const smsSiEditConsignee = $("#sms-si-edit-consignee");
	    const smsSiEditAddress = $("#sms-si-edit-address");
	    const smsSiEditEoriNo = $("#sms-si-edit-eori-no");
	    const smsSiEditAttention = $("#sms-si-edit-attention");
	    const smsSiEditEmail = $("#sms-si-edit-email");
	    const smsSiEditContactNumber = $("#sms-si-edit-contact-number");
	    const smsSiEditForwarder = $("#sms-si-edit-forwarder");
	    const smsSiEditCourirNumber = $("#sms-si-edit-account-number");
	    const smsSiEditRemark = $("#sms-si-edit-remark");

	    const smsSiEditDescriptionPackage = $('[id^="sms-si-edit-description-package"]');
	    const smsSiEditDescriptionDevice = $('[id^="sms-si-edit-description-device"]');
	    const smsSiEditDescriptionQuantity = $('[id^="sms-si-edit-description-quantity"]');
	    const smsSiEditDescriptionInvoice = $('[id^="sms-si-edit-description-invoice"]');
	    const smsSiEditDescriptionHsCode = $('[id^="sms-si-edit-description-hs-code"]');
	    let allow = true;

	    if (!inputValidation("#"+smsSiEditCoo.attr("id"), "#msg-"+smsSiEditCoo.attr("id"))) allow = false;
	    if (!inputValidation("#"+smsSiEditCustName.attr("id"), "#msg-"+smsSiEditCustName.attr("id"))) allow = false;
	    if (!inputValidation("#"+smsSiEditPoNumber.attr("id"), "#msg-"+smsSiEditPoNumber.attr("id"))) allow = false;
	    if (!inputValidation("#"+smsSiEditDelPlanDate.attr("id"), "#msg-"+smsSiEditDelPlanDate.attr("id"))) allow = false;
	    if (!inputValidation("#"+smsSiEditConsignee.attr("id"), "#msg-"+smsSiEditConsignee.attr("id"))) allow = false;
	    if (!inputValidation("#"+smsSiEditAddress.attr("id"), "#msg-"+smsSiEditAddress.attr("id"))) allow = false;
	    if (!inputValidation("#"+smsSiEditEoriNo.attr("id"), "#msg-"+smsSiEditEoriNo.attr("id"))) allow = false;
	    if (!inputValidation("#"+smsSiEditAttention.attr("id"), "#msg-"+smsSiEditAttention.attr("id"))) allow = false;
	    if (!inputValidation("#"+smsSiEditEmail.attr("id"), "#msg-"+smsSiEditEmail.attr("id"))) allow = false;
	    if (!inputValidation("#"+smsSiEditContactNumber.attr("id"), "#msg-"+smsSiEditContactNumber.attr("id"))) allow = false;
	    if (!inputValidation("#"+smsSiEditForwarder.attr("id"), "#msg-"+smsSiEditForwarder.attr("id"))) allow = false;
	    if (!inputValidation("#"+smsSiEditCourirNumber.attr("id"), "#msg-"+smsSiEditCourirNumber.attr("id"))) allow = false;
	    if (!inputValidation("#"+smsSiEditRemark.attr("id"), "#msg-"+smsSiEditRemark.attr("id"))) allow = false;

	    for (let i = 0; i < smsSiEditDescriptionPackage.length; i++) {
	      if (!inputValidation("input[id$='"+smsSiEditDescriptionPackage.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionPackage.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionPackage.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionPackage.eq(i).attr('number')+"']")) allow = false;
	      if (!select2Validation("select[id$='"+smsSiEditDescriptionDevice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionDevice.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionDevice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionDevice.eq(i).attr('number')+"']")) allow = false;
	      if (!inputValidation("input[id$='"+smsSiEditDescriptionQuantity.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionQuantity.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionQuantity.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionQuantity.eq(i).attr('number')+"']")) allow = false;
	      if (!inputValidation("input[id$='"+smsSiEditDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionInvoice.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionInvoice.eq(i).attr('number')+"']")) allow = false;
	      if (!inputValidation("input[id$='"+smsSiEditDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionHsCode.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionHsCode.eq(i).attr('number')+"']")) allow = false;
	    }

	    if (!allow) return false;
	    $(".air-badge").html(loadingBackdrop());

	    const params = {
	      "edit-target-desc" : btnTarget.attr('sms-desc'),
	      "edit-target-info" : btnTarget.attr('sms-info'),
	      "edit-po-number" : smsSiEditPoNumber.val(),
	      "edit-coo" : smsSiEditCoo.val(),
	      "edit-customer-name" : smsSiEditCustName.val(),
	      "edit-delivery-plan-date" : smsSiEditDelPlanDate.val(),
	      "edit-consignee" : smsSiEditConsignee.val(),
	      "edit-address" : smsSiEditAddress.val(),
	      "edit-eori-no" : smsSiEditEoriNo.val(),
	      "edit-attention" : smsSiEditAttention.val(),
	      "edit-email" : smsSiEditEmail.val(),
	      "edit-contact-number" : smsSiEditContactNumber.val(),
	      "edit-forwarder" : smsSiEditForwarder.val(),
	      "edit-accout-number" : smsSiEditCourirNumber.val(),
	      "edit-remark" : smsSiEditRemark.val(),
	      "cat-sms" : [],
	    };

	    for (let i = 0; i < smsSiEditDescriptionPackage.length; i++) {
	      params['cat-sms'].push({
	        "package": smsSiEditDescriptionPackage.eq(i).val(),
	        "device": smsSiEditDescriptionDevice.eq(i).val(),
	        "quantity": smsSiEditDescriptionQuantity.eq(i).val(),
	        "invoice": smsSiEditDescriptionInvoice.eq(i).val(),
	        "hs-code": smsSiEditDescriptionHsCode.eq(i).val(),
	      });
	    }

	    const url = baseUrl("/auth/api/v20/edit-sms-shp-instruction");
	    console.log(params);
	    const execute = postField(url, 'POST', params, false);

	    execute.done(function(result) {
	      let obj = JSON.parse(JSON.stringify(result));

	      if (obj.code == 200) {
	        $(".air-badge").html(airBadge(obj.msg , 'success'));
	        setTimeout(function() {
	          window.location = window.location.href;
	        }, 5000);
	      } else {
	        $(".air-badge").html(airBadge(obj.msg , 'danger'));
	      }
	    });

	    execute.fail(function() {
	      $(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
	    });
	});
	
	$("#btn-save-cancel-sms").click(function () {
		const btn = $("#btn-save-cancel-sms");
		const txt = btn.attr("data");

		$("#modal-cancel-shp").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v20/cancel-sms-shp-instruction");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});

	$("#sms-si-new-delivery-plan-date").datepicker({
        multidate: true,
        format: "yyyy/mm/dd",
        daysOfWeekHighlighted: "6, 0",
        language: 'en'
	});
}

const smsBookingDelivery = () => {
	let lem_selectAll = false;
	let lem_ctrlPressed = false;
	let lem_shiftPressed = false;
	let lem_lastPressed_start = 0;
	let lem_lastPressed_end = 0;

	let abov_selectAll = false;
	let abov_ctrlPressed = false;
	let abov_shiftPressed = false;
	let abov_lastPressed_start = 0;
	let abov_lastPressed_end = 0;

	let lem_autocompleteRows = {
		"label": [],
		"data": {}
	};

	let abov_autocompleteRows = {
		"label": [],
		"data": {}
	};

	let lem_tableOptIndex = datatableOpt();
	let abov_tableOptIndex = datatableOpt();

	let lem_tableBtnIndex = [
		{	
			text : '<span class="mr-2">Release</span><i class="fas fa-fw fa-paper-plane"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-release-sms-booking-delivery-lem');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Cancel</span><i class="fas fa-fw fa-ban"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-cancel-sms-booking-delivery-lem');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format Print</span><i class="fas fa-fw fa-print"></i>', 
			className: 'btn btn-dark btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-print-sms-booking-delivery-lem');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format Excel</span><i class="fas fa-fw fa-file-excel"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-excel-sms-booking-delivery-lem');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format PDF</span><i class="fas fa-fw fa-file-pdf"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-pdf-sms-booking-delivery-lem');
				$(node).attr('disabled', true);
			}
		}
	];

	let abov_tableBtnIndex = [
		{	
			text : '<span class="mr-2">Release</span><i class="fas fa-fw fa-paper-plane"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-release-sms-booking-delivery-abov');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Cancel</span><i class="fas fa-fw fa-ban"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-cancel-sms-booking-delivery-abov');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format Print</span><i class="fas fa-fw fa-print"></i>', 
			className: 'btn btn-dark btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-print-sms-booking-delivery-abov');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format Excel</span><i class="fas fa-fw fa-file-excel"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-excel-sms-booking-delivery-abov');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format PDF</span><i class="fas fa-fw fa-file-pdf"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-pdf-sms-booking-delivery-abov');
				$(node).attr('disabled', true);
			}
		}
	];

	lem_tableOptIndex['buttons'] = arrayPrepend(lem_tableBtnIndex, selectionExportBtn());
	abov_tableOptIndex['buttons'] = arrayPrepend(abov_tableBtnIndex, selectionExportBtn());

	lem_tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Doc Number"},
		{data: "Delivery Plan Date"},
		{data: "PO Number"},
		{data: "Consignee"},
		{data: "address"},
		{data: "Package"},
		{data: "Device"},
		{data: "Quantity"},
		{data: "HS Code"},
		{data: "Flight"},
		{data: "Plan Pickup"},
	];

	abov_tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Doc Number"},
		{data: "Delivery Plan Date"},
		{data: "PO Number"},
		{data: "Consignee"},
		{data: "address"},
		{data: "Package"},
		{data: "Device"},
		{data: "Quantity"},
		{data: "HS Code"},
		{data: "Flight"},
		{data: "Plan Pickup"},
	];

	lem_tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-sms-booking-delivery-lem-list');
		$(row).attr('data', data.data);
		$(row).attr('status', data.status);
		$(row).attr('stg', false);
	};

	abov_tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-sms-booking-delivery-abov-list');
		$(row).attr('data', data.data);
		$(row).attr('status', data.status);
		$(row).attr('stg', false);
	};

	lem_tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 1, 2, 3],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		},
		{
			"targets": [4, 5, 6, 7, 8, 9, 10, 11],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		}
	];

	abov_tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 1, 2, 3],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		},
		{
			"targets": [4, 5, 6, 7, 8, 9, 10, 11],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		}
	];

	// ORDER TABLE COLUMN BY IS DISABLE
	lem_tableOptIndex['rowsGroup'] = [
		0, 1, 2, 3, 4, 5, 10, 11
	];

	abov_tableOptIndex['rowsGroup'] = [
		0, 1, 2, 3, 4, 5, 10, 11
	];

	let lem_dataTableIndex = $('#datatable-sms-booking-delivery-lem').DataTable(lem_tableOptIndex);
	let abov_dataTableIndex = $('#datatable-sms-booking-delivery-abov').DataTable(abov_tableOptIndex);

	const selectSmsBookingListLem = (arr) => {
		const btnRelease = $("#btn-release-sms-booking-delivery-lem");
		const btnCancel = $("#btn-cancel-sms-booking-delivery-lem");
		const btnPrint = $("#btn-print-sms-booking-delivery-lem");
		const btnExcel = $("#btn-excel-sms-booking-delivery-lem");
		const btnPdf = $("#btn-pdf-sms-booking-delivery-lem");

		let tables = $('[id^="select-sms-booking-delivery-lem-list"]');
		let isOn = 0;
		let lem_shiftTable_start = 0;
		let lem_shiftTable_end = 0;
		let status = [];

		let x = 0;
		for (let i = 0; i < tables.length; i++) {
			if (lem_selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				status[x] = tables.eq(i).attr("status");
				isOn++;
				x++;
				lem_lastPressed_end = (i+1);
			} else {
				if (lem_ctrlPressed && !lem_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							lem_lastPressed_end = (i+1);
							// status[x] = tables.eq(i).attr("status");
							// x++;
						}
					}

					if (tables.eq(i).attr("stg") == "true") {
						status[x] = tables.eq(i).attr("status");
						x++;
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!lem_ctrlPressed && !lem_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							if (!status.includes(tables.eq(i).attr("status"))) {
								status[x] = tables.eq(i).attr("status");
								lem_lastPressed_start = (i+1);
								x++;
								isOn++;
							}
							lem_lastPressed_end = (i+1);
							lem_lastPressed_end = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (lem_shiftPressed && !lem_ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (!lem_shiftTable_start) lem_shiftTable_start = (i+1);
						lem_shiftTable_end = (i+1);
					}
				}

				if (!lem_shiftPressed) lem_shiftTable_start = 0;
				if (!lem_shiftPressed) lem_shiftTable_end = 0;
			}
		}

		// naik
		if (lem_lastPressed_end && lem_shiftTable_start && lem_lastPressed_end > lem_shiftTable_start) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (lem_lastPressed_end >= (i+1) && lem_shiftTable_start <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					status[x] = tables.eq(i).attr("status");
					x++;
					isOn++;
				}
			}
		}

		// turun
		if (lem_shiftTable_end > lem_lastPressed_start) {
			if (lem_lastPressed_start >= 1) lem_lastPressed_start --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= lem_lastPressed_start && i < lem_shiftTable_end) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					status[x] = tables.eq(i).attr("status");
					x++;
					isOn++;
				}
			}
		}

		let isOpen = status.filter(onlyUnique).includes('open')
		let isClose = status.filter(onlyUnique).includes('close')
		// console.log(status.filter(onlyUnique));
		// console.log("isOpen : "+ isOpen.toString());
		// console.log("isClose : "+ isClose.toString());
		// console.log("============================================");
		if (isOn == 0 || status.filter(onlyUnique).length == 0) {
			btnRelease.attr("disabled", true);
			btnCancel.attr("disabled", true);
			btnPrint.attr("disabled", true);
			btnExcel.attr("disabled", true);
			btnPdf.attr("disabled", true);

			lem_lastPressed_end = 0;
		}

		if (isOn == 1 && status.filter(onlyUnique).length == 1) {
			if (!status.includes('open')) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", false);
				btnPrint.attr("disabled", false);
				btnExcel.attr("disabled", false);
				btnPdf.attr("disabled", false);
			}
			if (status.includes('open')) {
				btnRelease.attr("disabled", false);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}	
		}

		if (isOn >= 2 || status.filter(onlyUnique).length >= 2) {
			if (isClose && !isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", false);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}

			if (!isClose && isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}

			if (isClose && isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}
		}
	}

	const selectSmsBookingListAbov = (arr) => {
		const btnRelease = $("#btn-release-sms-booking-delivery-abov");
		const btnCancel = $("#btn-cancel-sms-booking-delivery-abov");
		const btnPrint = $("#btn-print-sms-booking-delivery-abov");
		const btnExcel = $("#btn-excel-sms-booking-delivery-abov");
		const btnPdf = $("#btn-pdf-sms-booking-delivery-abov");

		let tables = $('[id^="select-sms-booking-delivery-abov-list"]');
		let isOn = 0;
		let abov_shiftTable_start = 0;
		let abov_shiftTable_end = 0;
		let status = [];

		let x = 0;
		for (let i = 0; i < tables.length; i++) {
			if (abov_selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				status[x] = tables.eq(i).attr("status");
				isOn++;
				x++;
				abov_lastPressed_end = (i+1);
			} else {
				if (abov_ctrlPressed && !abov_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							abov_lastPressed_end = (i+1);
							// status[x] = tables.eq(i).attr("status");
							// x++;
						}
					}

					if (tables.eq(i).attr("stg") == "true") {
						status[x] = tables.eq(i).attr("status");
						x++;
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!abov_ctrlPressed && !abov_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							if (!status.includes(tables.eq(i).attr("status"))) {
								status[x] = tables.eq(i).attr("status");
								abov_lastPressed_start = (i+1);
								x++;
								isOn++;
							}
							abov_lastPressed_end = (i+1);
							abov_lastPressed_end = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (abov_shiftPressed && !abov_ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (!abov_shiftTable_start) abov_shiftTable_start = (i+1);
						abov_shiftTable_end = (i+1);
					}
				}

				if (!abov_shiftPressed) abov_shiftTable_start = 0;
				if (!abov_shiftPressed) abov_shiftTable_end = 0;
			}
		}

		// naik
		if (abov_lastPressed_end && abov_shiftTable_start && abov_lastPressed_end > abov_shiftTable_start) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (abov_lastPressed_end >= (i+1) && abov_shiftTable_start <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					status[x] = tables.eq(i).attr("status");
					x++;
					isOn++;
				}
			}
		}

		// turun
		if (abov_shiftTable_end > abov_lastPressed_start) {
			if (abov_lastPressed_start >= 1) abov_lastPressed_start --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= abov_lastPressed_start && i < abov_shiftTable_end) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					status[x] = tables.eq(i).attr("status");
					x++;
					isOn++;
				}
			}
		}

		// console.log("status.length : "+ status.length +" || status.filter(onlyUnique).length : "+ status.filter(onlyUnique).length +" || isOn : "+ isOn);
		// console.log(status.includes('close'));
		// console.log(status);

		if (isOn == 0 || status.filter(onlyUnique).length == 0) {
			btnRelease.attr("disabled", true);
			btnCancel.attr("disabled", true);
			btnPrint.attr("disabled", true);
			btnExcel.attr("disabled", true);
			btnPdf.attr("disabled", true);

			abov_lastPressed_end = 0;
		}

		if (isOn == 1 && status.filter(onlyUnique).length == 1) {
			if (!status.includes('open')) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", false);
				btnPrint.attr("disabled", false);
				btnExcel.attr("disabled", false);
				btnPdf.attr("disabled", false);
			}
			if (status.includes('open')) {
				btnRelease.attr("disabled", false);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}
			if (status.includes('open') && status.includes('close')) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}
		}

		if (isOn >= 2 || status.filter(onlyUnique).length >= 2) {
			if (!status.includes('open')) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", false);
				btnPrint.attr("disabled", false);
				btnExcel.attr("disabled", false);
				btnPdf.attr("disabled", false);
			}
			if (status.includes('open')) {
				btnRelease.attr("disabled", false);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}
			if (status.includes('open') && status.includes('close')) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}
		}
	}

	$(document).keydown(function(event){
		const tabLem = $("#nav-lem-tab").attr("aria-selected");
		const tabAbov = $("#nav-abov-tab").attr("aria-selected");

		if(event.which == "17" && tabLem == "true") lem_ctrlPressed = true;
		if(event.which == "17" && tabAbov == "true") abov_ctrlPressed = true;

		if(event.which == "16" && tabLem == "true") lem_shiftPressed = true;
		if(event.which == "16" && tabAbov == "true") abov_shiftPressed = true;

		if(lem_ctrlPressed && event.which == "65" && tabLem == "true") lem_selectAll = true;
		if(abov_ctrlPressed && event.which == "65" && tabAbov == "true") abov_selectAll = true;

		if (tabLem == "true" && event.keyCode == 65 && event.ctrlKey && lem_selectAll && $("#row-index-lem-1").attr("flag") == "true") {
			textSelection('datatable-sms-booking-delivery-lem');
			event.preventDefault();
			selectSmsBookingListLem();
		}

		if (tabAbov == "true" && event.keyCode == 65 && event.ctrlKey && abov_selectAll && $("#row-index-abov-1").attr("flag") == "true") {
			textSelection('datatable-sms-booking-delivery-abov');
			event.preventDefault();
			selectSmsBookingListAbov();
		}
	});

	$(document).keyup(function(){
		const tabLem = $("#nav-lem-tab").attr("aria-selected");
		const tabAbov = $("#nav-abov-tab").attr("aria-selected");

		if (tabLem == "true") {
			lem_ctrlPressed = false;
			lem_shiftPressed = false;
			lem_selectAll = false;
		}

		if (tabAbov == "true") {
			abov_ctrlPressed = false;
			abov_shiftPressed = false;
			abov_selectAll = false;
		}	
	});

	$(document).on('click', '[id^="select-sms-booking-delivery-lem-list"]', function () {
		const myData = $(this);

		selectSmsBookingListLem(myData);
	});

	$(document).on('click', '[id^="select-sms-booking-delivery-abov-list"]', function () {
		const myData = $(this);

		selectSmsBookingListAbov(myData);
	});

	$(document).ready(function () {

		$(".air-badge").html(loadingBackdrop());

		const url = baseUrl("/auth/api/v21/info-sms-booking-delivery");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc_lem = [];
				let sc_abov = [];

				let y = 0;
				let df = 0;
				let z = 0;
				let gf = 0;
				for (let i = 0; i < obj.result.length; i++) {
					lem_autocompleteRows['label'][i] = {value: obj.result[i].consignee, label: obj.result[i].consignee, data: obj.result[i].sms_number};
					lem_autocompleteRows['data'][obj.result[i].sms_number] = obj.result[i];

					abov_autocompleteRows['label'][i] = {value: obj.result[i].consignee, label: obj.result[i].consignee, data: obj.result[i].sms_number};
					abov_autocompleteRows['data'][obj.result[i].sms_number] = obj.result[i];
					for (let x = 0; x < obj.result[i]['category'].length; x++) {
						if (obj.result[i].type == "LEM") {
							sc_lem[y] = {
								"No": (df+1),
								"Doc Number": obj.result[i].sms_number,
								"Delivery Plan Date": obj.result[i].delivery_plan_date,
								"PO Number": obj.result[i].po_number,
								"Consignee": obj.result[i].consignee,
								"address": obj.result[i].address,
								"Package": obj.result[i]['category'][x]['cat_package'],
								"Device": obj.result[i]['category'][x]['cat_device'],
								"Quantity": obj.result[i]['category'][x]['cat_quantity'],
								"HS Code": obj.result[i]['category'][x]['cat_hs_code'],
								"Flight": obj.result[i].flight,
								"Plan Pickup": obj.result[i].plan_pickup,
								"data": obj.result[i].sms_number,
								"clr": (obj.result[i].act_proc_step == "Shipment Instruction" && obj.result[i].next_proc_step == "Booking Delivery" ? "table-warning" : ""),
								"status": (obj.result[i].act_proc_step == "Shipment Instruction" && obj.result[i].next_proc_step == "Booking Delivery" ? "open" : "close"),
							};
							y++;
						}

						if (obj.result[i].type == "ABOV") {
							sc_abov[z] = {
								"No": (gf+1),
								"Doc Number": obj.result[i].sms_number,
								"Delivery Plan Date": obj.result[i].delivery_plan_date,
								"PO Number": obj.result[i].po_number,
								"Consignee": obj.result[i].consignee,
								"address": obj.result[i].address,
								"Package": obj.result[i]['category'][x]['cat_package'],
								"Device": obj.result[i]['category'][x]['cat_device'],
								"Quantity": obj.result[i]['category'][x]['cat_quantity'],
								"HS Code": obj.result[i]['category'][x]['cat_hs_code'],
								"Flight": obj.result[i].flight,
								"Plan Pickup": obj.result[i].plan_pickup,
								"data": obj.result[i].sms_number,
								"clr": (obj.result[i].act_proc_step == "Shipment Instruction" && obj.result[i].next_proc_step == "Booking Delivery" ? "table-warning" : ""),
								"status": (obj.result[i].act_proc_step == "Shipment Instruction" && obj.result[i].next_proc_step == "Booking Delivery" ? "open" : "close"),
							};
							z++;
						}
					}
					if (obj.result[i].type == "LEM") df++;
					if (obj.result[i].type == "ABOV") gf++;
				}

				lem_dataTableIndex.rows().remove();
				lem_dataTableIndex.rows.add(sc_lem).draw();

				abov_dataTableIndex.rows().remove();
				abov_dataTableIndex.rows.add(sc_abov).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-back-to-index-lem-1").click(function () {
		const rowIndex1 = $("#row-index-lem-1");
		const rowIndex2 = $("#row-index-lem-2");

		rowIndex1.removeClass("d-none");
		rowIndex1.attr("flag", "true");

		rowIndex2.addClass("d-none");
		rowIndex2.attr("flag", "false");
	});

	$("#btn-back-to-index-abov-1").click(function () {
		const rowIndex1 = $("#row-index-abov-1");
		const rowIndex2 = $("#row-index-abov-2");

		rowIndex1.removeClass("d-none");
		rowIndex1.attr("flag", "true");

		rowIndex2.addClass("d-none");
		rowIndex2.attr("flag", "false");
	});

	$("#btn-release-sms-booking-delivery-lem").click(function () {
		const rowIndex1 = $("#row-index-lem-1");
		const rowIndex2 = $("#row-index-lem-2");

		const btnTarget = $("#btn-sms-si-booking-delivery-lem-release");

		const smsSiEditPoNumber = $("#sms-si-lem-edit-po-number");
		const smsSiEditCoo = $("#sms-si-lem-edit-coo");
		const smsSiEditCustName = $("#sms-si-lem-edit-cust-name");
		const smsSiEditDelPlanDate = $("#sms-si-lem-edit-delivery-plan-date");
		const smsSiEditConsignee = $("#sms-si-lem-edit-consignee");
		const smsSiEditAddress = $("#sms-si-lem-edit-address");
		const smsSiEditEoriNo = $("#sms-si-lem-edit-eori-no");
		const smsSiEditAttention = $("#sms-si-lem-edit-attention");
		const smsSiEditEmail = $("#sms-si-lem-edit-email");
		const smsSiEditContactNumber = $("#sms-si-lem-edit-contact-number");
		const smsSiEditForwarder = $("#sms-si-lem-edit-forwarder");
		const smsSiEditAccountNumber = $("#sms-si-lem-edit-account-number");
		const smsSiEditRemark = $("#sms-si-lem-edit-remark");

		const smsSiEditFlight = $("#sms-si-lem-edit-flight");
		const smsSiEditPlanPickup = $("#sms-si-lem-edit-plan-pickup");
		const smsSiEditNettWeight = $("#sms-si-lem-edit-nett-weight");
		const smsSiEditGrossWeight = $("#sms-si-lem-edit-gross-weight");
		const smsSiEditTotalCarton = $("#sms-si-lem-edit-total-carton");
		const smsSiEditCartonDimension = $("#sms-si-lem-edit-carton-dimension");

		const smsDesClone = $("#sms-si-lem-edit-clone-description");
		const smsSiEditDescriptionPackage = $('[id^="sms-si-lem-edit-description-package"]');
		const smsSiEditDescriptionDevice = $('[id^="sms-si-lem-edit-description-device"]');
		const smsSiEditDescriptionQuantity = $('[id^="sms-si-lem-edit-description-quantity"]');
		const smsSiEditDescriptionHsCode = $('[id^="sms-si-lem-edit-description-hs-code"]');

		let tables = $('[id^="select-sms-booking-delivery-lem-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				x++;
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': JSON.stringify(id)
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v21/get-sms-booking-shp-instruction");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				// btnTarget.attr('data', obj.result['id']);
				btnTarget.attr('sms-desc', obj.result[0]['cat_sms']);
				btnTarget.attr('sms-info', obj.result[0]['sms_number']);

				smsSiEditPoNumber.val(obj.result[0]['po_number']);
				smsSiEditCoo.val(obj.result[0]['coo']);
				smsSiEditCustName.val(obj.result[0]['customer_name']);
				smsSiEditDelPlanDate.val(obj.result[0]['delivery_plan_date']);
				smsSiEditConsignee.val(obj.result[0]['consignee']);
				smsSiEditAddress.val(obj.result[0]['address']);
				smsSiEditEoriNo.val(obj.result[0]['eori_no']);
				smsSiEditAttention.val(obj.result[0]['attention']);
				smsSiEditEmail.val(obj.result[0]['email']);
				smsSiEditContactNumber.val(obj.result[0]['contact_number']);
				smsSiEditForwarder.val(obj.result[0]['forwarder']);
				smsSiEditAccountNumber.val(obj.result[0]['courir_number']);
				smsSiEditRemark.val(obj.result[0]['remark']);

				smsSiEditFlight.val(obj.result[0]['flight']);
				smsSiEditPlanPickup.val(obj.result[0]['plan_pickup']);

				smsSiEditNettWeight.val(obj.result[0]['nett_weight']);
				smsSiEditGrossWeight.val(obj.result[0]['gross_weight']);
				smsSiEditTotalCarton.val(obj.result[0]['total_carton']);
				smsSiEditCartonDimension.val(obj.result[0]['carton_dimension']);

				smsDesClone.html('');
				for (var i = 0; i < obj.result[0]['category'].length; i++) {

					let sc = `
						<div class="form-group row" number="${i}" id="sms-si-lem-edit-description-column">
				          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
				          <div class="col-sm-12 col-md-12 col-lg-10">
				            <div class="form-row">
				              <div class="col-lg-1">
				                <div class="form-group row">
				                  <div class="col-sm-12 col-md-12 col-lg-3">
				                    <div class="form-check mb-lg-0">
				                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-lem-edit-description-checked" number="${i}" disabled>
				                      <label class="form-check-label d-lg-none" for="sms-si-lem-edit-description-checked">Checked</label>
				                    </div>
				                  </div>
				                </div>
				              </div>
				              <div class="col-lg-11">
				                <div class="row">
				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-lem-edit-description-package" value="${obj.result[0]['category'][i].cat_package}" placeholder="Package" number="${i}" disabled>
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-lem-edit-description-package"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-device" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-lem-edit-description-device" value="${obj.result[0]['category'][i].cat_device}" placeholder="Device" number="${i}" disabled>
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-lem-edit-description-device"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-lem-edit-description-quantity" value="${obj.result[0]['category'][i].cat_quantity}" placeholder="Quantity" number="${i}" disabled>
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-lem-edit-description-quantity"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-lem-edit-description-invoice" value="${obj.result[0]['category'][i].cat_invoice}" placeholder="Invoice" number="${i}">
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-lem-edit-description-invoice"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-lem-edit-description-hs-code" value="${obj.result[0]['category'][i].cat_hs_code}" placeholder="HS Code" number="${i}">
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-lem-edit-description-hs-code"></div>
				                      </div>
				                    </div>
				                  </div>
				                </div>
				              </div>
				            </div>
				          </div>
				        </div>
					`;
					smsDesClone.append(sc);
				}

				$(".air-badge").html('');
				rowIndex1.addClass("d-none");
				rowIndex1.attr("flag", "false");

				rowIndex2.removeClass("d-none");
				rowIndex2.attr("flag", "true");

			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-release-sms-booking-delivery-abov").click(function () {
		const rowIndex1 = $("#row-index-abov-1");
		const rowIndex2 = $("#row-index-abov-2");

		const pagePagination = $("#pagination-booking-delivery-abov-release");
		const pageContaintPagination = $("#pagination-containt-booking-delivery-abov-release");
		const btnTarget = $("#btn-sms-si-booking-delivery-abov-release");

		// const smsSiEditPoNumber = $("#sms-si-abov-edit-po-number");
		// const smsSiEditCoo = $("#sms-si-abov-edit-coo");
		// const smsSiEditCustName = $("#sms-si-abov-edit-cust-name");
		// const smsSiEditDelPlanDate = $("#sms-si-abov-edit-delivery-plan-date");
		// const smsSiEditConsignee = $("#sms-si-abov-edit-consignee");
		// const smsSiEditAddress = $("#sms-si-abov-edit-address");
		// const smsSiEditEoriNo = $("#sms-si-abov-edit-eori-no");
		// const smsSiEditAttention = $("#sms-si-abov-edit-attention");
		// const smsSiEditEmail = $("#sms-si-abov-edit-email");
		// const smsSiEditContactNumber = $("#sms-si-abov-edit-contact-number");
		// const smsSiEditForwarder = $("#sms-si-abov-edit-forwarder");
		// const smsSiEditFlight = $("#sms-si-abov-edit-flight");
		// const smsSiEditPlanPickup = $("#sms-si-abov-edit-plan-pickup");
		// const smsSiEditNettWeight = $("#sms-si-abov-edit-nett-weight");
		// const smsSiEditGrossWeight = $("#sms-si-abov-edit-gross-weight");
		// const smsSiEditTotalCarton = $("#sms-si-abov-edit-total-carton");
		// const smsSiEditCartonDimension = $("#sms-si-abov-edit-carton-dimension");

		// const smsDesClone = $("#sms-si-abov-edit-clone-description");
		// const smsSiEditDescriptionPackage = $('[id^="sms-si-abov-edit-description-package"]');
		// const smsSiEditDescriptionDevice = $('[id^="sms-si-abov-edit-description-device"]');
		// const smsSiEditDescriptionQuantity = $('[id^="sms-si-abov-edit-description-quantity"]');
		// const smsSiEditDescriptionHsCode = $('[id^="sms-si-abov-edit-description-hs-code"]');

		let tables = $('[id^="select-sms-booking-delivery-abov-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				x++;
				// break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': JSON.stringify(id),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v21/get-sms-booking-shp-instruction");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				// btnTarget.attr('sms-desc', obj.result['cat_sms']);
				// btnTarget.attr('sms-info', obj.result['sms_number']);

				let abovAcording = $("#accordion-abov-release");
				abovAcording.html('');
				for (var i = 0; i < obj.result.length; i++) {
					
					let smsCloneDesc = '';
					for (var x = 0; x < obj.result[i]['category'].length; x++) {
						let sc = `
							<div class="form-group row" number="${x}" id="sms-si-abov-edit-description-column">
					          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
					          <div class="col-sm-12 col-md-12 col-lg-10">
					            <div class="form-row">
					              <div class="col-lg-1">
					                <div class="form-group row">
					                  <div class="col-sm-12 col-md-12 col-lg-3">
					                    <div class="form-check mb-lg-0">
					                      <input class="form-check-input mt-lg-3" type="checkbox" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" value="" id="sms-si-abov-edit-description-checked" number="${x}" disabled>
					                      <label class="form-check-label d-lg-none" for="sms-si-abov-edit-description-checked">Checked</label>
					                    </div>
					                  </div>
					                </div>
					              </div>
					              <div class="col-lg-11">
					                <div class="row">
					                  <div class="col-lg-3">
					                    <div class="form-group row">
					                      <label for="sms-si-abov-edit-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
					                      <div class="col-sm-12 col-md-12 col-lg-12">
					                        <input type="text" class="form-control" id="sms-si-abov-edit-description-package" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" value="${obj.result[i]['category'][x].cat_package}" placeholder="Package" number="${x}" disabled>
					                        <div class="invalid-feedback" number="${x}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-description-package"></div>
					                      </div>
					                    </div>
					                  </div>
					                  <div class="col-lg-3">
					                    <div class="form-group row">
					                      <label for="sms-si-abov-edit-description-device" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
					                      <div class="col-sm-12 col-md-12 col-lg-12">
					                        <input type="text" class="form-control" id="sms-si-abov-edit-description-device" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" value="${obj.result[i]['category'][x].cat_device}" placeholder="Device" number="${x}" disabled>
					                        <div class="invalid-feedback" number="${x}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-description-device"></div>
					                      </div>
					                    </div>
					                  </div>
					                  <div class="col-lg-2">
					                    <div class="form-group row">
					                      <label for="sms-si-abov-edit-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
					                      <div class="col-sm-12 col-md-12 col-lg-12">
					                        <input type="text" class="form-control" id="sms-si-abov-edit-description-quantity" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" value="${obj.result[i]['category'][x].cat_quantity}" placeholder="Quantity" number="${x}" disabled>
					                        <div class="invalid-feedback" number="${x}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-description-quantity"></div>
					                      </div>
					                    </div>
					                  </div>
					                  <div class="col-lg-2">
					                    <div class="form-group row">
					                      <label for="sms-si-abov-edit-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
					                      <div class="col-sm-12 col-md-12 col-lg-12">
					                        <input type="text" class="form-control" id="sms-si-abov-edit-description-invoice" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" value="${obj.result[i]['category'][x].cat_invoice}" placeholder="Invoice" number="${x}">
					                        <div class="invalid-feedback" number="${x}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-description-invoice"></div>
					                      </div>
					                    </div>
					                  </div>
					                  <div class="col-lg-2">
					                    <div class="form-group row">
					                      <label for="sms-si-abov-edit-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
					                      <div class="col-sm-12 col-md-12 col-lg-12">
					                        <input type="text" class="form-control" id="sms-si-abov-edit-description-hs-code" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" value="${obj.result[i]['category'][x].cat_hs_code}" placeholder="HS Code" number="${x}">
					                        <div class="invalid-feedback" number="${x}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-description-hs-code"></div>
					                      </div>
					                    </div>
					                  </div>
					                </div>
					              </div>
					            </div>
					          </div>
					        </div>
						`;

						smsCloneDesc += sc;
					}

					let acord = `
						<div class="card">
	                        <div class="card-header py-4" id="heading-acording-abov-${i}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" data-toggle="collapse" role="button" data-target="#collapse-acording-abov-${i}" aria-expanded="false" aria-controls="collapse-acording-abov-${i}">
	                          <h6 class="mb-0 text-dark" id="title-heading-acording-abov" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}">${obj.result[i]['sms_number']}</h6>
	                        </div>
	                        <div id="collapse-acording-abov-${i}" class="collapse" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" aria-labelledby="heading-acording-abov-${i}" data-parent="#accordion-abov-release">
	                          <div class="card-body">

	                          	<div class="form-group row">
		                          <label for="sms-si-abov-edit-po-number-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">PO Number</label>
		                          <div class="col-sm-12 col-md-12 col-lg-10">
		                            <input type="text" class="form-control" id="sms-si-abov-edit-po-number-${i}" placeholder="PO Number" value="${obj.result[i]['po_number']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" disabled>
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-po-number-${i}"></div>
		                          </div>
		                        </div>

		                        <div class="form-group row">
		                          <label for="sms-si-abov-edit-coo-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">COO</label>
		                          <div class="col-sm-12 col-md-12 col-lg-10">
		                            <input type="text" class="form-control" id="sms-si-abov-edit-coo-${i}" placeholder="COO" value="${obj.result[i]['coo']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" disabled>
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-coo-${i}"></div>
		                          </div>
		                        </div>

		                        <div class="form-group row">
		                          <label for="sms-si-abov-edit-cust-name-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Customer Name</label>
		                          <div class="col-sm-12 col-md-12 col-lg-10">
		                            <input type="text" class="form-control" id="sms-si-abov-edit-cust-name-${i}" placeholder="Customer Name" value="${obj.result[i]['customer_name']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" disabled>
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-cust-name-${i}"></div>
		                          </div>
		                        </div>

		                        <div class="form-group row">
		                          <label for="sms-si-abov-edit-delivery-plan-date-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Delivery Plan Date</label>
		                          <div class="col-sm-12 col-md-12 col-lg-10">
		                            <input type="date" class="form-control" id="sms-si-abov-edit-delivery-plan-date-${i}" placeholder="Delivery Plan Date" value="${obj.result[i]['delivery_plan_date']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" disabled>
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-delivery-plan-date-${i}"></div>
		                          </div>
		                        </div>

		                        <div class="form-group row">
		                          <label for="sms-si-abov-edit-consignee-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Consignee</label>
		                          <div class="col-sm-12 col-md-12 col-lg-10">
		                            <input type="text" class="form-control" id="sms-si-abov-edit-consignee-${i}" placeholder="Consignee" value="${obj.result[i]['consignee']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" disabled>
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-consignee-${i}"></div>
		                          </div>
		                        </div>

		                        <div class="form-group row">
		                          <label for="sms-si-abov-edit-address-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Address</label>
		                          <div class="col-sm-12 col-md-12 col-lg-10">
		                            <textarea class="form-control" placeholder="Address" id="sms-si-abov-edit-address-${i}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" disabled>${obj.result[i]['address']}</textarea>
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-address-${i}"></div>
		                          </div>
		                        </div>

		                        <div class="form-group row">
		                          <label for="sms-si-abov-edit-eori-no-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">EORI No</label>
		                          <div class="col-sm-12 col-md-12 col-lg-10">
		                            <input type="text" class="form-control" id="sms-si-abov-edit-eori-no-${i}" placeholder="EORI No" value="${obj.result[i]['eori_no']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" disabled>
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-eori-no-${i}"></div>
		                          </div>
		                        </div>

		                        <div class="form-group row">
		                          <label for="sms-si-abov-edit-attention-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Attention</label>
		                          <div class="col-sm-12 col-md-12 col-lg-10">
		                            <input type="text" class="form-control" id="sms-si-abov-edit-attention-${i}" placeholder="Attention" value="${obj.result[i]['attention']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" disabled>
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-attention-${i}"></div>
		                          </div>
		                        </div>

		                        <div class="form-group row">
		                          <label for="sms-si-abov-edit-email-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Email</label>
		                          <div class="col-sm-12 col-md-12 col-lg-10">
		                            <input type="text" class="form-control" id="sms-si-abov-edit-email-${i}" placeholder="Email" value="${obj.result[i]['email']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" disabled>
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-email-${i}"></div>
		                          </div>
		                        </div>

		                        <div class="form-group row">
		                          <label for="sms-si-abov-edit-contact-number-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Contact Number</label>
		                          <div class="col-sm-12 col-md-12 col-lg-10">
		                            <input type="text" class="form-control" id="sms-si-abov-edit-contact-number-${i}" placeholder="Contact Number" value="${obj.result[i]['contact_number']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" disabled>
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-contact-number-${i}"></div>
		                          </div>
		                        </div>

		                        <div class="form-group row">
		                          <label for="sms-si-abov-edit-forwarder-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Forwarder / Courir</label>
		                          <div class="col-sm-12 col-md-12 col-lg-10">
		                            <input type="text" class="form-control" id="sms-si-abov-edit-forwarder-${i}" placeholder="Forwarder / Courir" value="${obj.result[i]['forwarder']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" disabled>
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-forwarder-${i}"></div>
		                          </div>
		                        </div>

		                        <div class="form-group row">
		                          <label for="sms-si-abov-edit-account-number-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Account Number Courir</label>
		                          <div class="col-sm-12 col-md-12 col-lg-10">
		                            <input type="text" class="form-control" id="sms-si-abov-edit-account-number-${i}" placeholder="Account Number Courir" value="${obj.result[i]['courir_number']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" disabled>
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-account-number-${i}"></div>
		                          </div>
		                        </div>

		                        <div class="form-group row">
		                          <label for="sms-si-abov-edit-remark-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Remark</label>
		                          <div class="col-sm-12 col-md-12 col-lg-10">
		                            <textarea class="form-control" placeholder="Remark" id="sms-si-abov-edit-remark-${i}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" disabled>${obj.result[i]['remark']}</textarea>
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-remark-${i}"></div>
		                          </div>
		                        </div>

		                        <div class="form-group row mb-0">
		                          <label for="sms-si-abov-edit-flight-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Flight</label>
		                          <div class="col-sm-12 col-md-12 col-lg-4">
		                            <input type="date" class="form-control" id="sms-si-abov-edit-flight-${i}" placeholder="Flight" value="${obj.result[i]['flight']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}">
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-flight-${i}"></div>
		                          </div>

		                          <div class="col-sm-12 col-md-12 col-lg-6">
		                            <div class="form-group row">
		                              <label for="sms-si-abov-edit-plan-pickup-${i}" class="col-sm-12 col-md-12 col-lg-3 col-form-label">Plan Pickup</label>
		                              <div class="col-sm-12 col-md-12 col-lg-9">
		                                <input type="date" class="form-control" id="sms-si-abov-edit-plan-pickup-${i}" placeholder="Plan Pickup" value="${obj.result[i]['plan_pickup']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}">
		                                <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-plan-pickup-${i}"></div>
		                              </div>
		                            </div>
		                          </div>
		                        </div>

		                        <div class="form-group row mb-0">
		                          <label for="sms-si-abov-edit-nett-weight-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Nett Weight</label>
		                          <div class="col-sm-12 col-md-12 col-lg-4">
		                            <input type="number" class="form-control" id="sms-si-abov-edit-nett-weight-${i}" placeholder="Nett Weight" value="${obj.result[i]['nett_weight']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}">
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-nett-weight-${i}"></div>
		                          </div>

		                          <div class="col-sm-12 col-md-12 col-lg-6">
		                            <div class="form-group row">
		                              <label for="sms-si-abov-edit-gross-weight-${i}" class="col-sm-12 col-md-12 col-lg-3 col-form-label">Gross Weight</label>
		                              <div class="col-sm-12 col-md-12 col-lg-9">
		                                <input type="number" class="form-control" id="sms-si-abov-edit-gross-weight-${i}" placeholder="Gross Weight" value="${obj.result[i]['gross_weight']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}">
		                                <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-gross-weight-${i}"></div>
		                              </div>
		                            </div>
		                          </div>
		                        </div>

		                        <div class="form-group row mb-0">
		                          <label for="sms-si-abov-edit-total-carton-${i}" class="col-sm-12 col-md-12 col-lg-2 col-form-label">Total Carton</label>
		                          <div class="col-sm-12 col-md-12 col-lg-4">
		                            <input type="number" class="form-control" id="sms-si-abov-edit-total-carton-${i}" placeholder="Total Carton" value="${obj.result[i]['total_carton']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}">
		                            <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-total-carton-${i}"></div>
		                          </div>

		                          <div class="col-sm-12 col-md-12 col-lg-6">
		                            <div class="form-group row">
		                              <label for="sms-si-abov-edit-carton-dimension-${i}" class="col-sm-12 col-md-12 col-lg-3 col-form-label">Carton Dimension</label>
		                              <div class="col-sm-12 col-md-12 col-lg-9">
		                                <input type="text" class="form-control" id="sms-si-abov-edit-carton-dimension-${i}" placeholder="Carton Dimension" value="${obj.result[i]['carton_dimension']}" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}">
		                                <div class="invalid-feedback" category="${obj.result[i]['cat_sms']}" data="${obj.result[i]['sms_number']}" id="msg-sms-si-abov-edit-carton-dimension-${i}"></div>
		                              </div>
		                            </div>
		                          </div>
		                        </div>

		                        <hr>

		                        <div class="d-none d-lg-block">
		                          <div class="form-group row">
		                            <label for="shp-date-total-carton" class="col-sm-12 col-md-12 col-lg-2 col-form-label"></label>
		                            <div class="col-sm-12 col-md-12 col-lg-10">
		                              <div class="form-row">
		                                <div class="col-lg-1">
		                                  <div class="form-group row">
		                                    <div class="col-sm-12 col-md-12 col-lg-12 mt-2">
		                                      <label class="form-check-label pt-1" for="description-checked">Checked :</label>
		                                    </div>
		                                  </div>
		                                </div>
		                                <div class="col-lg-11">
		                                  <div class="row">
		                                    <div class="col-lg-3">
		                                      <div class="form-group row">
		                                        <label for="shp-description-x-2" class="col-sm-12 col-md-12 col-form-label col-lg-12">Package :</label>
		                                      </div>
		                                    </div>
		                                    <div class="col-lg-3">
		                                      <div class="form-group row">
		                                        <label for="shp-description-x-2" class="col-sm-12 col-md-12 col-form-label col-lg-12">Device :</label>
		                                      </div>
		                                    </div>
		                                    <div class="col-lg-2">
		                                      <div class="form-group row">
		                                        <label for="shp-description-x-2" class="col-sm-12 col-md-12 col-form-label col-lg-12">Quantity :</label>
		                                      </div>
		                                    </div>
		                                    <div class="col-lg-2">
		                                      <div class="form-group row">
		                                        <label for="shp-description-x-2" class="col-sm-12 col-md-12 col-form-label col-lg-12">Invoice :</label>
		                                      </div>
		                                    </div>
		                                    <div class="col-lg-2">
		                                      <div class="form-group row">
		                                        <label for="shp-description-x-2" class="col-sm-12 col-md-12 col-form-label col-lg-12">HS Code :</label>
		                                      </div>
		                                    </div>
		                                  </div>
		                                </div>
		                              </div>
		                            </div>
		                          </div>
		                        </div>

		                        <div id="sms-si-abov-edit-clone-description" class="mt-n4">
		                          ${smsCloneDesc}
		                        </div>

	                          </div>
	                        </div>
						</div>
					`;

					abovAcording.append(acord);
				}

				$(".air-badge").html('');
				rowIndex1.addClass("d-none");
				rowIndex1.attr("flag", "false");

				rowIndex2.removeClass("d-none");
				rowIndex2.attr("flag", "true");
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
	
	// PENDING 
	$("#btn-sms-si-booking-delivery-lem-release").click(function () {
		const btnTarget = $("#btn-sms-si-booking-delivery-lem-release");

		const smsSiEditPoNumber = $("#sms-si-lem-edit-po-number");
		const smsSiEditCoo = $("#sms-si-lem-edit-coo");
		const smsSiEditCustName = $("#sms-si-lem-edit-cust-name");
		const smsSiEditDelPlanDate = $("#sms-si-lem-edit-delivery-plan-date");
		const smsSiEditConsignee = $("#sms-si-lem-edit-consignee");
		const smsSiEditAddress = $("#sms-si-lem-edit-address");
		const smsSiEditEoriNo = $("#sms-si-lem-edit-eori-no");
		const smsSiEditAttention = $("#sms-si-lem-edit-attention");
		const smsSiEditEmail = $("#sms-si-lem-edit-email");
		const smsSiEditContactNumber = $("#sms-si-lem-edit-contact-number");
		const smsSiEditForwarder = $("#sms-si-lem-edit-forwarder");
		const smsSiEditFlight = $("#sms-si-lem-edit-flight");
		const smsSiEditPlanPickup = $("#sms-si-lem-edit-plan-pickup");
		const smsSiEditNettWeight = $("#sms-si-lem-edit-nett-weight");
		const smsSiEditGrossWeight = $("#sms-si-lem-edit-gross-weight");
		const smsSiEditTotalCarton = $("#sms-si-lem-edit-total-carton");
		const smsSiEditCartonDimension = $("#sms-si-lem-edit-carton-dimension");


		const smsDesClone = $("#sms-si-lem-edit-clone-description");
		const smsSiEditDescriptionPackage = $('[id^="sms-si-lem-edit-description-package"]');
		const smsSiEditDescriptionDevice = $('[id^="sms-si-lem-edit-description-device"]');
		const smsSiEditDescriptionQuantity = $('[id^="sms-si-lem-edit-description-quantity"]');
		const smsSiEditDescriptionInvoice = $('[id^="sms-si-lem-edit-description-invoice"]');
		const smsSiEditDescriptionHsCode = $('[id^="sms-si-lem-edit-description-hs-code"]');

		let allow = true;

		if (!inputValidation("#"+smsSiEditFlight.attr("id"), "#msg-"+smsSiEditFlight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditPlanPickup.attr("id"), "#msg-"+smsSiEditPlanPickup.attr("id"))) allow = false;

		for (let i = 0; i < smsSiEditDescriptionPackage.length; i++) {
			if (!inputValidation("input[id$='"+smsSiEditDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionInvoice.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionInvoice.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiEditDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionHsCode.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionHsCode.eq(i).attr('number')+"']")) allow = false;
		}

		if (!allow) return false;
	    $(".air-badge").html(loadingBackdrop());


	    const params = {};
	    params[0] = {
	      "flight" : smsSiEditFlight.val(),
	      "plan-pickup" : smsSiEditPlanPickup.val(),
	      "nett-weight" : smsSiEditNettWeight.val(),
	      "gross-weight" : smsSiEditGrossWeight.val(),
	      "total-carton" : smsSiEditTotalCarton.val(),
	      "carton-dimension" : smsSiEditCartonDimension.val(),
	      "cat-sms" : [],
	      "release-target-desc" : btnTarget.attr('sms-desc'),
	      "release-target-info" : btnTarget.attr('sms-info'),
	    };

	    for (let i = 0; i < smsSiEditDescriptionPackage.length; i++) {
			params[0]['cat-sms'].push({
				"package": smsSiEditDescriptionPackage.eq(i).val(),
				"device": smsSiEditDescriptionDevice.eq(i).val(),
				"quantity": smsSiEditDescriptionQuantity.eq(i).val(),
				"invoice": smsSiEditDescriptionInvoice.eq(i).val(),
				"hs-code": smsSiEditDescriptionHsCode.eq(i).val(),
			});
		}

	    // const executePost = {
		// 	'data' : JEncrypt(JSON.stringify(params)),
		// }

	    const url = baseUrl("/auth/api/v21/release-sms-booking-delivery");

	    const execute = postField(url, 'POST', {'data' : JSON.stringify(params)}, false);

	    execute.done(function(result) {
	      let obj = JSON.parse(JSON.stringify(result));

	      if (obj.code == 200) {
	        $(".air-badge").html(airBadge(obj.msg , 'success'));
	        setTimeout(function() {
	          window.location = window.location.href;
	        }, 5000);
	      } else {
	        $(".air-badge").html(airBadge(obj.msg , 'danger'));
	      }
	    });

	    execute.fail(function() {
	      $(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
	    });
	});

	// PENDING 
	$("#btn-sms-si-booking-delivery-abov-release").click(function () {
		const btnTarget = $("#btn-sms-si-booking-delivery-abov-release");
	    
	    const smsSiEditPoNumber = $('[id^="sms-si-abov-edit-po-number"]');
		const smsSiEditCoo = $('[id^="sms-si-abov-edit-coo"]');
		const smsSiEditCustName = $('[id^="sms-si-abov-edit-cust-name"]');
		const smsSiEditDelPlanDate = $('[id^="sms-si-abov-edit-delivery-plan-date"]');
		const smsSiEditConsignee = $('[id^="sms-si-abov-edit-consignee"]');
		const smsSiEditAddress = $('[id^="sms-si-abov-edit-address"]');
		const smsSiEditEoriNo = $('[id^="sms-si-abov-edit-eori-no"]');
		const smsSiEditAttention = $('[id^="sms-si-abov-edit-attention"]');
		const smsSiEditEmail = $('[id^="sms-si-abov-edit-email"]');
		const smsSiEditContactNumber = $('[id^="sms-si-abov-edit-contact-number"]');
		const smsSiEditForwarder = $('[id^="sms-si-abov-edit-forwarder"]');
		const smsSiEditAccountNumber = $('[id^="sms-si-abov-account-number"]');
		const smsSiEditRemark = $('[id^="sms-si-abov-remark"]');

		const smsSiEditFlight = $('[id^="sms-si-abov-edit-flight"]');
		const smsSiEditPlanPickup = $('[id^="sms-si-abov-edit-plan-pickup"]');
		const smsSiEditNettWeight = $('[id^="sms-si-abov-edit-nett-weight"]');
		const smsSiEditGrossWeight = $('[id^="sms-si-abov-edit-gross-weight"]');
		const smsSiEditTotalCarton = $('[id^="sms-si-abov-edit-total-carton"]');
		const smsSiEditCartonDimension = $('[id^="sms-si-abov-edit-carton-dimension"]');

		const smsDesClone = $("#sms-si-abov-edit-clone-description");
		const smsSiEditDescriptionPackage = $('[id^="sms-si-abov-edit-description-package"]');
		const smsSiEditDescriptionDevice = $('[id^="sms-si-abov-edit-description-device"]');
		const smsSiEditDescriptionQuantity = $('[id^="sms-si-abov-edit-description-quantity"]');
		const smsSiEditDescriptionInvoice = $('[id^="sms-si-abov-edit-description-invoice"]');
		const smsSiEditDescriptionHsCode = $('[id^="sms-si-abov-edit-description-hs-code"]');

		const titleHeadingAcordingAbov = $('[id^="title-heading-acording-abov"]');
		const headingAcordingAbov = $('[id^="heading-acording-abov"]');
		const collapseAcordingAbov = $('[id^="collapse-acording-abov"]');

		let allow = true;
		let acordOpen = true;
		for (let i = 0; i < smsSiEditFlight.length; i++) {
			let pageOk = true;
			if (!inputValidation("input[id$='"+smsSiEditFlight.eq(i).attr('id')+"'][data='"+smsSiEditFlight.eq(i).attr('data')+"']", "div[id$='msg-"+smsSiEditFlight.eq(i).attr('id')+"'][data='"+smsSiEditFlight.eq(i).attr('data')+"']")) {
				allow = false;
				pageOk = false;
			}

			if (!inputValidation("input[id$='"+smsSiEditPlanPickup.eq(i).attr('id')+"'][data='"+smsSiEditPlanPickup.eq(i).attr('data')+"']", "div[id$='msg-"+smsSiEditPlanPickup.eq(i).attr('id')+"'][data='"+smsSiEditPlanPickup.eq(i).attr('data')+"']")) {
				allow = false;
				pageOk = false;
			}

			if (!inputValidation("input[id$='"+smsSiEditNettWeight.eq(i).attr('id')+"'][data='"+smsSiEditNettWeight.eq(i).attr('data')+"']", "div[id$='msg-"+smsSiEditNettWeight.eq(i).attr('id')+"'][data='"+smsSiEditNettWeight.eq(i).attr('data')+"']")) {
				allow = false;
				pageOk = false;
			}

			if (!inputValidation("input[id$='"+smsSiEditGrossWeight.eq(i).attr('id')+"'][data='"+smsSiEditGrossWeight.eq(i).attr('data')+"']", "div[id$='msg-"+smsSiEditGrossWeight.eq(i).attr('id')+"'][data='"+smsSiEditGrossWeight.eq(i).attr('data')+"']")) {
				allow = false;
				pageOk = false;
			}

			if (!inputValidation("input[id$='"+smsSiEditTotalCarton.eq(i).attr('id')+"'][data='"+smsSiEditTotalCarton.eq(i).attr('data')+"']", "div[id$='msg-"+smsSiEditTotalCarton.eq(i).attr('id')+"'][data='"+smsSiEditTotalCarton.eq(i).attr('data')+"']")) {
				allow = false;
				pageOk = false;
			}

			if (!inputValidation("input[id$='"+smsSiEditCartonDimension.eq(i).attr('id')+"'][data='"+smsSiEditCartonDimension.eq(i).attr('data')+"']", "div[id$='msg-"+smsSiEditCartonDimension.eq(i).attr('id')+"'][data='"+smsSiEditCartonDimension.eq(i).attr('data')+"']")) {
				allow = false;
				pageOk = false;
			}

			let smsSiEditDescriptionPackage = $('[id^="sms-si-abov-edit-description-package"][data="'+titleHeadingAcordingAbov.eq(i).attr('data')+'"]');
			let smsSiEditDescriptionDevice = $('[id^="sms-si-abov-edit-description-device"][data="'+titleHeadingAcordingAbov.eq(i).attr('data')+'"]');
			let smsSiEditDescriptionQuantity = $('[id^="sms-si-abov-edit-description-quantity"][data="'+titleHeadingAcordingAbov.eq(i).attr('data')+'"]');
			let smsSiEditDescriptionInvoice = $('[id^="sms-si-abov-edit-description-invoice"][data="'+titleHeadingAcordingAbov.eq(i).attr('data')+'"]');
			let smsSiEditDescriptionHsCode = $('[id^="sms-si-abov-edit-description-hs-code"][data="'+titleHeadingAcordingAbov.eq(i).attr('data')+'"]');

			for (let x = 0; x < smsSiEditDescriptionPackage.length; x++) {
				if (!inputValidation("input[id$='"+smsSiEditDescriptionInvoice.eq(x).attr('id')+"'][data='"+titleHeadingAcordingAbov.eq(i).attr('data')+"'][number='"+smsSiEditDescriptionInvoice.eq(x).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionInvoice.eq(x).attr('id')+"'][data='"+titleHeadingAcordingAbov.eq(i).attr('data')+"'][number='"+smsSiEditDescriptionInvoice.eq(x).attr('number')+"']")) {
					allow = false;
					pageOk = false;
				}

				if (!inputValidation("input[id$='"+smsSiEditDescriptionHsCode.eq(x).attr('id')+"'][data='"+titleHeadingAcordingAbov.eq(i).attr('data')+"'][number='"+smsSiEditDescriptionHsCode.eq(x).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionHsCode.eq(x).attr('id')+"'][data='"+titleHeadingAcordingAbov.eq(i).attr('data')+"'][number='"+smsSiEditDescriptionHsCode.eq(x).attr('number')+"']")) {
					allow = false;
					pageOk = false;
				}
			}

			if (pageOk) {
				$("h6[id$='"+titleHeadingAcordingAbov.eq(i).attr('id')+"'][data='"+titleHeadingAcordingAbov.eq(i).attr('data')+"']").removeClass('text-danger');
				$("h6[id$='"+titleHeadingAcordingAbov.eq(i).attr('id')+"'][data='"+titleHeadingAcordingAbov.eq(i).attr('data')+"']").addClass('text-dark');
			}
			if (!pageOk) {
				$("h6[id$='"+titleHeadingAcordingAbov.eq(i).attr('id')+"'][data='"+titleHeadingAcordingAbov.eq(i).attr('data')+"']").addClass('text-danger');
				$("h6[id$='"+titleHeadingAcordingAbov.eq(i).attr('id')+"'][data='"+titleHeadingAcordingAbov.eq(i).attr('data')+"']").removeClass('text-dark');

				if (acordOpen) {
					$("div[id$='"+headingAcordingAbov.eq(i).attr('id')+"'][data='"+headingAcordingAbov.eq(i).attr('data')+"']").attr('aria-expanded', true);
					$("div[id$='"+collapseAcordingAbov.eq(i).attr('id')+"'][data='"+collapseAcordingAbov.eq(i).attr('data')+"']").addClass('show');

					acordOpen = false;
				}
			}
		}

		if (!allow) return false;
	    $(".air-badge").html(loadingBackdrop());

	    const params = {};

	    for (let i = 0; i < smsSiEditFlight.length; i++) {
	    	params[i] = {
	    		"flight" : $("input[id$='"+smsSiEditFlight.eq(i).attr('id')+"'][data='"+smsSiEditFlight.eq(i).attr('data')+"']").val(),
	    		"plan-pickup" : $("input[id$='"+smsSiEditPlanPickup.eq(i).attr('id')+"'][data='"+smsSiEditPlanPickup.eq(i).attr('data')+"']").val(),
	    		"nett-weight" : $("input[id$='"+smsSiEditNettWeight.eq(i).attr('id')+"'][data='"+smsSiEditNettWeight.eq(i).attr('data')+"']").val(),
	    		"gross-weight" : $("input[id$='"+smsSiEditGrossWeight.eq(i).attr('id')+"'][data='"+smsSiEditGrossWeight.eq(i).attr('data')+"']").val(),
	    		"total-carton" : $("input[id$='"+smsSiEditTotalCarton.eq(i).attr('id')+"'][data='"+smsSiEditTotalCarton.eq(i).attr('data')+"']").val(),
	    		"carton-dimension" : $("input[id$='"+smsSiEditCartonDimension.eq(i).attr('id')+"'][data='"+smsSiEditCartonDimension.eq(i).attr('data')+"']").val(),
	    		"release-target-info" : $("input[id$='"+smsSiEditFlight.eq(i).attr('id')+"'][data='"+smsSiEditFlight.eq(i).attr('data')+"']").attr('data'),
	    		"release-target-desc" : $("input[id$='"+smsSiEditFlight.eq(i).attr('id')+"'][data='"+smsSiEditFlight.eq(i).attr('data')+"']").attr('category'),
	    		"cat-sms" : [],
	    	}

	    	let smsSiEditDescriptionPackage = $('[id^="sms-si-abov-edit-description-package"][data="'+smsSiEditFlight.eq(i).attr('data')+'"]');
			let smsSiEditDescriptionDevice = $('[id^="sms-si-abov-edit-description-device"][data="'+smsSiEditFlight.eq(i).attr('data')+'"]');
			let smsSiEditDescriptionQuantity = $('[id^="sms-si-abov-edit-description-quantity"][data="'+smsSiEditFlight.eq(i).attr('data')+'"]');
			let smsSiEditDescriptionInvoice = $('[id^="sms-si-abov-edit-description-invoice"][data="'+smsSiEditFlight.eq(i).attr('data')+'"]');
			let smsSiEditDescriptionHsCode = $('[id^="sms-si-abov-edit-description-hs-code"][data="'+smsSiEditFlight.eq(i).attr('data')+'"]');

			for (let x = 0; x < smsSiEditDescriptionPackage.length; x++) {
				params[i]['cat-sms'].push({
					"package": $("input[id$='"+smsSiEditDescriptionPackage.eq(x).attr('id')+"'][data='"+titleHeadingAcordingAbov.eq(i).attr('data')+"'][number='"+smsSiEditDescriptionPackage.eq(x).attr('number')+"']").val(),
					"device": $("input[id$='"+smsSiEditDescriptionDevice.eq(x).attr('id')+"'][data='"+titleHeadingAcordingAbov.eq(i).attr('data')+"'][number='"+smsSiEditDescriptionDevice.eq(x).attr('number')+"']").val(),
					"quantity": $("input[id$='"+smsSiEditDescriptionQuantity.eq(x).attr('id')+"'][data='"+titleHeadingAcordingAbov.eq(i).attr('data')+"'][number='"+smsSiEditDescriptionQuantity.eq(x).attr('number')+"']").val(),
					"invoice": $("input[id$='"+smsSiEditDescriptionInvoice.eq(x).attr('id')+"'][data='"+titleHeadingAcordingAbov.eq(i).attr('data')+"'][number='"+smsSiEditDescriptionInvoice.eq(x).attr('number')+"']").val(),
					"hs-code": $("input[id$='"+smsSiEditDescriptionHsCode.eq(x).attr('id')+"'][data='"+titleHeadingAcordingAbov.eq(i).attr('data')+"'][number='"+smsSiEditDescriptionHsCode.eq(x).attr('number')+"']").val(),
				});
			}
	    }
	    // const executePost = {
		// 	'data' : JEncrypt(JSON.stringify(params)),
		// }

	    const url = baseUrl("/auth/api/v21/release-sms-booking-delivery");

	    const execute = postField(url, 'POST', {'data' : JSON.stringify(params)}, false);

	    execute.done(function(result) {
	      let obj = JSON.parse(JSON.stringify(result));

	      if (obj.code == 200) {
	        $(".air-badge").html(airBadge(obj.msg , 'success'));
	        setTimeout(function() {
	          window.location = window.location.href;
	        }, 5000);
	      } else {
	        $(".air-badge").html(airBadge(obj.msg , 'danger'));
	      }
	    });

	    execute.fail(function() {
	      $(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
	    });
	});

	$("#btn-cancel-sms-booking-delivery-lem").click(function () {
		const modal = $("#modal-cancel-sms-si-booking-delivery-lem");
		const label = $(".info-cancel-sms-si-booking-delivery-lem");
		const btn = $("#btn-save-cancel-sms-si-booking-delivery-lem");

		let tables = $('[id^="select-sms-booking-delivery-lem-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(1).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	})

	$("#btn-save-cancel-sms-si-booking-delivery-lem").click(function () {
		const btn = $("#btn-save-cancel-sms-si-booking-delivery-lem");
		const txt = btn.attr("data");

		$("#modal-cancel-sms-si-booking-delivery-lem").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v21/cancel-sms-booking-delivery");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});

	$("#btn-cancel-sms-booking-delivery-abov").click(function () {
		const modal = $("#modal-cancel-sms-si-booking-delivery-abov");
		const label = $(".info-cancel-sms-si-booking-delivery-abov");
		const btn = $("#btn-save-cancel-sms-si-booking-delivery-abov");

		let tables = $('[id^="select-sms-booking-delivery-abov-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(1).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	})

	$("#btn-save-cancel-sms-si-booking-delivery-abov").click(function () {
		const btn = $("#btn-save-cancel-sms-si-booking-delivery-abov");
		const txt = btn.attr("data");

		$("#modal-cancel-sms-si-booking-delivery-abov").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v21/cancel-sms-booking-delivery");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});

	$("#btn-print-sms-booking-delivery-lem").click(function () {

		let tables = $('[id^="select-sms-booking-delivery-lem-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "LEM",
			'type': "print",
		};

		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-excel-sms-booking-delivery-lem").click(function () {

		let tables = $('[id^="select-sms-booking-delivery-lem-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "LEM",
			'type': "excel",
		};
		
		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-pdf-sms-booking-delivery-lem").click(function () {

		let tables = $('[id^="select-sms-booking-delivery-lem-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "LEM",
			'type': "pdf",
		};
		
		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-print-sms-booking-delivery-abov").click(function () {

		let tables = $('[id^="select-sms-booking-delivery-abov-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "ABOV",
			'type': "print",
		};

		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-excel-sms-booking-delivery-abov").click(function () {

		let tables = $('[id^="select-sms-booking-delivery-abov-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "ABOV",
			'type': "excel",
		};
		
		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-pdf-sms-booking-delivery-abov").click(function () {

		let tables = $('[id^="select-sms-booking-delivery-abov-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "ABOV",
			'type': "pdf",
		};
		
		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});
}

const smsShpConfirmation = () => {
	let deviceListTmp = false
	let lem_selectAll = false;
	let lem_ctrlPressed = false;
	let lem_shiftPressed = false;
	let lem_lastPressed_start = 0;
	let lem_lastPressed_end = 0;

	let abov_selectAll = false;
	let abov_ctrlPressed = false;
	let abov_shiftPressed = false;
	let abov_lastPressed_start = 0;
	let abov_lastPressed_end = 0;

	let lem_autocompleteRows = {
		"label": [],
		"data": {}
	};

	let abov_autocompleteRows = {
		"label": [],
		"data": {}
	};

	let lem_tableOptIndex = datatableOpt();
	let abov_tableOptIndex = datatableOpt();

	let lem_tableBtnIndex = [
		{	
			text : '<span class="mr-2">Release</span><i class="fas fa-fw fa-paper-plane"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-release-sms-shp-confirmation-lem');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Cancel</span><i class="fas fa-fw fa-ban"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-cancel-sms-shp-confirmation-lem');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format Print</span><i class="fas fa-fw fa-print"></i>', 
			className: 'btn btn-dark btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-print-sms-shp-confirmation-lem');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format Excel</span><i class="fas fa-fw fa-file-excel"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-excel-sms-shp-confirmation-lem');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format PDF</span><i class="fas fa-fw fa-file-pdf"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-pdf-sms-shp-confirmation-lem');
				$(node).attr('disabled', true);
			}
		}
	];

	let abov_tableBtnIndex = [
		{	
			text : '<span class="mr-2">Release</span><i class="fas fa-fw fa-paper-plane"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-release-sms-shp-confirmation-abov');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Cancel</span><i class="fas fa-fw fa-ban"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-cancel-sms-shp-confirmation-abov');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format Print</span><i class="fas fa-fw fa-print"></i>', 
			className: 'btn btn-dark btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-print-sms-shp-confirmation-abov');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format Excel</span><i class="fas fa-fw fa-file-excel"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-excel-sms-shp-confirmation-abov');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format PDF</span><i class="fas fa-fw fa-file-pdf"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-pdf-sms-shp-confirmation-abov');
				$(node).attr('disabled', true);
			}
		}
	];

	lem_tableOptIndex['buttons'] = arrayPrepend(lem_tableBtnIndex, selectionExportBtn());
	abov_tableOptIndex['buttons'] = arrayPrepend(abov_tableBtnIndex, selectionExportBtn());

	lem_tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Doc Number"},
		{data: "Delivery Plan Date"},
		{data: "PO Number"},
		{data: "Consignee"},
		{data: "address"},
		{data: "Package"},
		{data: "Device"},
		{data: "Quantity"},
		{data: "HS Code"},
		{data: "Flight"},
		{data: "Plan Pickup"},
	];

	abov_tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Doc Number"},
		{data: "Delivery Plan Date"},
		{data: "PO Number"},
		{data: "Consignee"},
		{data: "address"},
		{data: "Package"},
		{data: "Device"},
		{data: "Quantity"},
		{data: "HS Code"},
		{data: "Flight"},
		{data: "Plan Pickup"},
	];

	lem_tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-sms-shp-confirmation-lem-list');
		$(row).attr('data', data.data);
		$(row).attr('status', data.status);
		$(row).attr('stg', false);
	};

	abov_tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-sms-shp-confirmation-abov-list');
		$(row).attr('data', data.data);
		$(row).attr('status', data.status);
		$(row).attr('stg', false);
	};

	lem_tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 1, 2, 3],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		},
		{
			"targets": [4, 5, 6, 7, 8, 9, 10, 11],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		}
	];

	abov_tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 1, 2, 3],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		},
		{
			"targets": [4, 5, 6, 7, 8, 9, 10, 11],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		}
	];

	// ORDER TABLE COLUMN BY IS DISABLE
	lem_tableOptIndex['rowsGroup'] = [
		0, 1, 2, 3, 4, 5, 10, 11
	];

	abov_tableOptIndex['rowsGroup'] = [
		0, 1, 2, 3, 4, 5, 10, 11
	];

	let lem_dataTableIndex = $('#datatable-sms-shp-confirmation-lem').DataTable(lem_tableOptIndex);
	let abov_dataTableIndex = $('#datatable-sms-shp-confirmation-abov').DataTable(abov_tableOptIndex);

	const selectSmsShpConfiramtionListLem = (arr) => {
		const btnRelease = $("#btn-release-sms-shp-confirmation-lem");
		const btnCancel = $("#btn-cancel-sms-shp-confirmation-lem");
		const btnPrint = $("#btn-print-sms-shp-confirmation-lem");
		const btnExcel = $("#btn-excel-sms-shp-confirmation-lem");
		const btnPdf = $("#btn-pdf-sms-shp-confirmation-lem");

		let tables = $('[id^="select-sms-shp-confirmation-lem-list"]');
		let isOn = 0;
		let lem_shiftTable_start = 0;
		let lem_shiftTable_end = 0;
		let status = [];

		let x = 0;
		for (let i = 0; i < tables.length; i++) {
			if (lem_selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				status[x] = tables.eq(i).attr("status");
				isOn++;
				x++;
				lem_lastPressed_end = (i+1);
			} else {
				if (lem_ctrlPressed && !lem_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							lem_lastPressed_end = (i+1);
							// status[x] = tables.eq(i).attr("status");
							// x++;
						}
					}

					if (tables.eq(i).attr("stg") == "true") {
						status[x] = tables.eq(i).attr("status");
						x++;
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!lem_ctrlPressed && !lem_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							if (!status.includes(tables.eq(i).attr("status"))) {
								status[x] = tables.eq(i).attr("status");
								lem_lastPressed_start = (i+1);
								x++;
								isOn++;
							}
							lem_lastPressed_end = (i+1);
							lem_lastPressed_end = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (lem_shiftPressed && !lem_ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (!lem_shiftTable_start) lem_shiftTable_start = (i+1);
						lem_shiftTable_end = (i+1);
					}
				}

				if (!lem_shiftPressed) lem_shiftTable_start = 0;
				if (!lem_shiftPressed) lem_shiftTable_end = 0;
			}
		}

		// naik
		if (lem_lastPressed_end && lem_shiftTable_start && lem_lastPressed_end > lem_shiftTable_start) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (lem_lastPressed_end >= (i+1) && lem_shiftTable_start <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					status[x] = tables.eq(i).attr("status");
					x++;
					isOn++;
				}
			}
		}

		// turun
		if (lem_shiftTable_end > lem_lastPressed_start) {
			if (lem_lastPressed_start >= 1) lem_lastPressed_start --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= lem_lastPressed_start && i < lem_shiftTable_end) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					status[x] = tables.eq(i).attr("status");
					x++;
					isOn++;
				}
			}
		}

		let isOpen = status.filter(onlyUnique).includes('open')
		let isClose = status.filter(onlyUnique).includes('close')
		// console.log(status.filter(onlyUnique));
		// console.log("isOpen : "+ isOpen.toString());
		// console.log("isClose : "+ isClose.toString());
		// console.log("============================================");
		if (isOn == 0 || status.filter(onlyUnique).length == 0) {
			btnRelease.attr("disabled", true);
			btnCancel.attr("disabled", true);
			btnPrint.attr("disabled", true);
			btnExcel.attr("disabled", true);
			btnPdf.attr("disabled", true);

			lem_lastPressed_end = 0;
		}

		if (isOn == 1 && status.filter(onlyUnique).length == 1) {
			if (!status.includes('open')) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", false);
				btnPrint.attr("disabled", false);
				btnExcel.attr("disabled", false);
				btnPdf.attr("disabled", false);
			}
			if (status.includes('open')) {
				btnRelease.attr("disabled", false);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}	
		}

		if (isOn >= 2 || status.filter(onlyUnique).length >= 2) {
			if (isClose && !isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", false);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}

			if (!isClose && isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}

			if (isClose && isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}
		}
	}

	const selectSmsShpConfirmationListAbov = (arr) => {
		const btnRelease = $("#btn-release-sms-shp-confirmation-abov");
		const btnCancel = $("#btn-cancel-sms-shp-confirmation-abov");
		const btnPrint = $("#btn-print-sms-shp-confirmation-abov");
		const btnExcel = $("#btn-excel-sms-shp-confirmation-abov");
		const btnPdf = $("#btn-pdf-sms-shp-confirmation-abov");

		let tables = $('[id^="select-sms-shp-confirmation-abov-list"]');
		let isOn = 0;
		let abov_shiftTable_start = 0;
		let abov_shiftTable_end = 0;
		let status = [];

		let x = 0;
		for (let i = 0; i < tables.length; i++) {
			if (abov_selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				status[x] = tables.eq(i).attr("status");
				isOn++;
				x++;
				abov_lastPressed_end = (i+1);
			} else {
				if (abov_ctrlPressed && !abov_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							abov_lastPressed_end = (i+1);
							// status[x] = tables.eq(i).attr("status");
							// x++;
						}
					}

					if (tables.eq(i).attr("stg") == "true") {
						status[x] = tables.eq(i).attr("status");
						x++;
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!abov_ctrlPressed && !abov_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							if (!status.includes(tables.eq(i).attr("status"))) {
								status[x] = tables.eq(i).attr("status");
								abov_lastPressed_start = (i+1);
								x++;
								isOn++;
							}
							abov_lastPressed_end = (i+1);
							abov_lastPressed_end = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (abov_shiftPressed && !abov_ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (!abov_shiftTable_start) abov_shiftTable_start = (i+1);
						abov_shiftTable_end = (i+1);
					}
				}

				if (!abov_shiftPressed) abov_shiftTable_start = 0;
				if (!abov_shiftPressed) abov_shiftTable_end = 0;
			}
		}

		// naik
		if (abov_lastPressed_end && abov_shiftTable_start && abov_lastPressed_end > abov_shiftTable_start) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (abov_lastPressed_end >= (i+1) && abov_shiftTable_start <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					status[x] = tables.eq(i).attr("status");
					x++;
					isOn++;
				}
			}
		}

		// turun
		if (abov_shiftTable_end > abov_lastPressed_start) {
			if (abov_lastPressed_start >= 1) abov_lastPressed_start --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= abov_lastPressed_start && i < abov_shiftTable_end) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					status[x] = tables.eq(i).attr("status");
					x++;
					isOn++;
				}
			}
		}

		let isOpen = status.filter(onlyUnique).includes('open')
		let isClose = status.filter(onlyUnique).includes('close')
		// console.log(status.filter(onlyUnique));
		// console.log("isOpen : "+ isOpen.toString());
		// console.log("isClose : "+ isClose.toString());
		// console.log("============================================");
		if (isOn == 0 || status.filter(onlyUnique).length == 0) {
			btnRelease.attr("disabled", true);
			btnCancel.attr("disabled", true);
			btnPrint.attr("disabled", true);
			btnExcel.attr("disabled", true);
			btnPdf.attr("disabled", true);

			abov_lastPressed_end = 0;
		}

		if (isOn == 1 && status.filter(onlyUnique).length == 1) {
			if (!status.includes('open')) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", false);
				btnPrint.attr("disabled", false);
				btnExcel.attr("disabled", false);
				btnPdf.attr("disabled", false);
			}
			if (status.includes('open')) {
				btnRelease.attr("disabled", false);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}	
		}

		if (isOn >= 2 || status.filter(onlyUnique).length >= 2) {
			if (isClose && !isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", false);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}

			if (!isClose && isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}

			if (isClose && isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}
		}
	}

	$(document).keydown(function(event){
		const tabLem = $("#nav-lem-tab").attr("aria-selected");
		const tabAbov = $("#nav-abov-tab").attr("aria-selected");

		if(event.which == "17" && tabLem == "true") lem_ctrlPressed = true;
		if(event.which == "17" && tabAbov == "true") abov_ctrlPressed = true;

		if(event.which == "16" && tabLem == "true") lem_shiftPressed = true;
		if(event.which == "16" && tabAbov == "true") abov_shiftPressed = true;

		if(lem_ctrlPressed && event.which == "65" && tabLem == "true") lem_selectAll = true;
		if(abov_ctrlPressed && event.which == "65" && tabAbov == "true") abov_selectAll = true;

		if (tabLem == "true" && event.keyCode == 65 && event.ctrlKey && lem_selectAll && $("#row-index-lem-1").attr("flag") == "true") {
			textSelection('datatable-sms-shp-confirmation-lem');
			event.preventDefault();
			selectSmsShpConfiramtionListLem();
		}

		if (tabAbov == "true" && event.keyCode == 65 && event.ctrlKey && abov_selectAll && $("#row-index-abov-1").attr("flag") == "true") {
			textSelection('datatable-sms-shp-confirmation-abov');
			event.preventDefault();
			selectSmsShpConfirmationListAbov();
		}
	});

	$(document).keyup(function(){
		const tabLem = $("#nav-lem-tab").attr("aria-selected");
		const tabAbov = $("#nav-abov-tab").attr("aria-selected");

		if (tabLem == "true") {
			lem_ctrlPressed = false;
			lem_shiftPressed = false;
			lem_selectAll = false;
		}

		if (tabAbov == "true") {
			abov_ctrlPressed = false;
			abov_shiftPressed = false;
			abov_selectAll = false;
		}	
	});

	$(document).on('click', '[id^="select-sms-shp-confirmation-lem-list"]', function () {
		const myData = $(this);

		selectSmsShpConfiramtionListLem(myData);
	});

	$(document).on('click', '[id^="select-sms-shp-confirmation-abov-list"]', function () {
		const myData = $(this);

		selectSmsShpConfirmationListAbov(myData);
	});

	$(document).ready(function () {

		$(".air-badge").html(loadingBackdrop());

		const url = baseUrl("/auth/api/v22/info-sms-shp-confirmation");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc_lem = [];
				let sc_abov = [];

				let y = 0;
				let df = 0;
				let z = 0;
				let gf = 0;
				for (let i = 0; i < obj.result.length; i++) {
					lem_autocompleteRows['label'][i] = {value: obj.result[i].consignee, label: obj.result[i].consignee, data: obj.result[i].sms_number};
					lem_autocompleteRows['data'][obj.result[i].sms_number] = obj.result[i];

					abov_autocompleteRows['label'][i] = {value: obj.result[i].consignee, label: obj.result[i].consignee, data: obj.result[i].sms_number};
					abov_autocompleteRows['data'][obj.result[i].sms_number] = obj.result[i];
					for (let x = 0; x < obj.result[i]['category'].length; x++) {
						if (obj.result[i].type == "LEM") {
							sc_lem[y] = {
								"No": (df+1),
								"Doc Number": obj.result[i].sms_number,
								"Delivery Plan Date": obj.result[i].delivery_plan_date,
								"PO Number": obj.result[i].po_number,
								"Consignee": obj.result[i].consignee,
								"address": obj.result[i].address,
								"Package": obj.result[i]['category'][x]['cat_package'],
								"Device": obj.result[i]['category'][x]['cat_device'],
								"Quantity": obj.result[i]['category'][x]['cat_quantity'],
								"HS Code": obj.result[i]['category'][x]['cat_hs_code'],
								"Flight": obj.result[i].flight,
								"Plan Pickup": obj.result[i].plan_pickup,
								"data": obj.result[i].sms_number,
								"clr": (obj.result[i].act_proc_step == "Booking Delivery" && obj.result[i].next_proc_step == "Shipment Confirmation" ? "table-warning" : ""),
								"status": (obj.result[i].act_proc_step == "Booking Delivery" && obj.result[i].next_proc_step == "Shipment Confirmation" ? "open" : "close"),
							};
							y++;
						}

						if (obj.result[i].type == "ABOV") {
							sc_abov[z] = {
								"No": (gf+1),
								"Doc Number": obj.result[i].sms_number,
								"Delivery Plan Date": obj.result[i].delivery_plan_date,
								"PO Number": obj.result[i].po_number,
								"Consignee": obj.result[i].consignee,
								"address": obj.result[i].address,
								"Package": obj.result[i]['category'][x]['cat_package'],
								"Device": obj.result[i]['category'][x]['cat_device'],
								"Quantity": obj.result[i]['category'][x]['cat_quantity'],
								"HS Code": obj.result[i]['category'][x]['cat_hs_code'],
								"Flight": obj.result[i].flight,
								"Plan Pickup": obj.result[i].plan_pickup,
								"data": obj.result[i].sms_number,
								"clr": (obj.result[i].act_proc_step == "Booking Delivery" && obj.result[i].next_proc_step == "Shipment Confirmation" ? "table-warning" : ""),
								"status": (obj.result[i].act_proc_step == "Booking Delivery" && obj.result[i].next_proc_step == "Shipment Confirmation" ? "open" : "close"),
							};
							z++;
						}
					}
					if (obj.result[i].type == "LEM") df++;
					if (obj.result[i].type == "ABOV") gf++;
				}

				lem_dataTableIndex.rows().remove();
				lem_dataTableIndex.rows.add(sc_lem).draw();

				abov_dataTableIndex.rows().remove();
				abov_dataTableIndex.rows.add(sc_abov).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#sms-si-lem-edit-incoterm").select2({
		dropdownParent: $('#select2-sms-si-lem-edit-incoterm')
	});

	$("#sms-si-abov-edit-incoterm").select2({
		dropdownParent: $('#select2-sms-si-abov-edit-incoterm')
	});

	$("#btn-back-to-index-lem-1").click(function () {
		const rowIndex1 = $("#row-index-lem-1");
		const rowIndex2 = $("#row-index-lem-2");

		rowIndex1.removeClass("d-none");
		rowIndex1.attr("flag", "true");

		rowIndex2.addClass("d-none");
		rowIndex2.attr("flag", "false");
	});

	$("#btn-back-to-index-abov-1").click(function () {
		const rowIndex1 = $("#row-index-abov-1");
		const rowIndex2 = $("#row-index-abov-2");

		rowIndex1.removeClass("d-none");
		rowIndex1.attr("flag", "true");

		rowIndex2.addClass("d-none");
		rowIndex2.attr("flag", "false");
	});

	$("#btn-release-sms-shp-confirmation-lem").click(function () {
		const rowIndex1 = $("#row-index-lem-1");
		const rowIndex2 = $("#row-index-lem-2");

		const btnTarget = $("#btn-sms-si-shp-confirmation-lem-release");

		const smsSiEditPoNumber = $("#sms-si-lem-edit-po-number");
		const smsSiEditCoo = $("#sms-si-lem-edit-coo");
		const smsSiEditCustName = $("#sms-si-lem-edit-cust-name");
		const smsSiEditDelPlanDate = $("#sms-si-lem-edit-delivery-plan-date");
		const smsSiEditConsignee = $("#sms-si-lem-edit-consignee");
		const smsSiEditAddress = $("#sms-si-lem-edit-address");
		const smsSiEditEoriNo = $("#sms-si-lem-edit-eori-no");
		const smsSiEditAttention = $("#sms-si-lem-edit-attention");
		const smsSiEditEmail = $("#sms-si-lem-edit-email");
		const smsSiEditContactNumber = $("#sms-si-lem-edit-contact-number");
		const smsSiEditForwarder = $("#sms-si-lem-edit-forwarder");
		const smsSiEditAccountNumber = $("#sms-si-lem-edit-account-number");
		const smsSiEditRemark = $("#sms-si-lem-edit-remark");

		const smsSiEditFlight = $("#sms-si-lem-edit-flight");
		const smsSiEditPlanPickup = $("#sms-si-lem-edit-plan-pickup");
		const smsSiEditNettWeight = $("#sms-si-lem-edit-nett-weight");
		const smsSiEditGrossWeight = $("#sms-si-lem-edit-gross-weight");
		const smsSiEditTotalCarton = $("#sms-si-lem-edit-total-carton");
		const smsSiEditCartonDimension = $("#sms-si-lem-edit-carton-dimension");

		const smsSiEditNameFlight = $("#sms-si-lem-edit-name-flight");
		const smsSiEditMawb = $("#sms-si-lem-edit-mawb");
		const smsSiEditHawb = $("#sms-si-lem-edit-hawb");
		const smsSiEditIncoterm = $("#sms-si-lem-edit-incoterm");
		const smsSiEditExt = $("#sms-si-lem-edit-ext");

		const smsDesClone = $("#sms-si-lem-edit-clone-description");
		const smsSiEditDescriptionPackage = $('[id^="sms-si-lem-edit-description-package"]');
		const smsSiEditDescriptionDevice = $('[id^="sms-si-lem-edit-description-device"]');
		const smsSiEditDescriptionQuantity = $('[id^="sms-si-lem-edit-description-quantity"]');
		const smsSiEditDescriptionHsCode = $('[id^="sms-si-lem-edit-description-hs-code"]');

		let tables = $('[id^="select-sms-shp-confirmation-lem-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				x++;
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': JSON.stringify(id)
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v22/get-sms-booking-shp-instruction");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				// btnTarget.attr('data', obj.result['id']);
				btnTarget.attr('sms-desc', obj.result['info'][0]['cat_sms']);
				btnTarget.attr('sms-info', obj.result['info'][0]['sms_number']);

				smsSiEditPoNumber.val(obj.result['info'][0]['po_number']);
				smsSiEditCoo.val(obj.result['info'][0]['coo']);
				smsSiEditCustName.val(obj.result['info'][0]['customer_name']);
				smsSiEditDelPlanDate.val(obj.result['info'][0]['delivery_plan_date']);
				smsSiEditConsignee.val(obj.result['info'][0]['consignee']);
				smsSiEditAddress.val(obj.result['info'][0]['address']);
				smsSiEditEoriNo.val(obj.result['info'][0]['eori_no']);
				smsSiEditAttention.val(obj.result['info'][0]['attention']);
				smsSiEditEmail.val(obj.result['info'][0]['email']);
				smsSiEditContactNumber.val(obj.result['info'][0]['contact_number']);
				smsSiEditForwarder.val(obj.result['info'][0]['forwarder']);
				smsSiEditAccountNumber.val(obj.result['info'][0]['courir_number']);
				smsSiEditRemark.val(obj.result['info'][0]['remark']);

				smsSiEditFlight.val(obj.result['info'][0]['flight']);
				smsSiEditPlanPickup.val(obj.result['info'][0]['plan_pickup']);

				smsSiEditNettWeight.val(obj.result['info'][0]['nett_weight']);
				smsSiEditGrossWeight.val(obj.result['info'][0]['gross_weight']);
				smsSiEditTotalCarton.val(obj.result['info'][0]['total_carton']);
				smsSiEditCartonDimension.val(obj.result['info'][0]['carton_dimension']);

				smsSiEditNameFlight.val(obj.result['info'][0]['flight_name']);
				smsSiEditMawb.val(obj.result['info'][0]['mawb']);
				smsSiEditHawb.val(obj.result['info'][0]['hawb']);

				smsSiEditIncoterm.val(obj.result['info'][0]['incoterm']);
				smsSiEditExt.val(obj.result['info'][0]['extension']);

				smsDesClone.html('');
				for (var i = 0; i < obj.result['info'][0]['category'].length; i++) {

					let selectOption = '';

					for (var x = 0; x < obj.result['device'].length; x++) {
						selectOption += `<option value="${obj.result['device'][x]}"${(obj.result['device'][x] == obj.result['info'][0]['category'][i].cat_device ? " selected" : "")}>${obj.result['device'][x]}</option>`
					}

					let sc = `
						<div class="form-group row" number="${i+Date.now()}" id="sms-si-lem-edit-description-column">
				          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
				          <div class="col-sm-12 col-md-12 col-lg-10">
				            <div class="form-row">
				              <div class="col-lg-1">
				                <div class="form-group row">
				                  <div class="col-sm-12 col-md-12 col-lg-3">
				                    <div class="form-check mb-lg-0">
				                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-lem-edit-description-checked" number="${i+Date.now()}">
				                      <label class="form-check-label d-lg-none" for="sms-si-lem-edit-description-checked">Checked</label>
				                    </div>
				                  </div>
				                </div>
				              </div>
				              <div class="col-lg-11">
				                <div class="row">
				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-lem-edit-description-package" value="${obj.result['info'][0]['category'][i].cat_package}" placeholder="Package" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-lem-edit-description-package"></div>
				                      </div>
				                    </div>
				                  </div>

				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-device-${i+Date.now()}" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
				                      <select class="form-control" id="sms-si-lem-edit-description-device-${i+Date.now()}" title="Device" data-live-search="true" data-live-search-placeholder="Device" number="${i+Date.now()}">
				                        <option value="" disabled selected>Choose a Device</option>
				                        ${selectOption}
				                      </select>
				                      <div id="select2-sms-si-lem-edit-description-device-${i+Date.now()}" number="${i+Date.now()}"></div>
				                      <div class="invalid-feedback" id="msg-sms-si-lem-edit-description-device-${i+Date.now()}" number="${i+Date.now()}"></div>
				                    </div>
				                  </div>

				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-lem-edit-description-quantity" value="${obj.result['info'][0]['category'][i].cat_quantity}" placeholder="Quantity" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-lem-edit-description-quantity"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-lem-edit-description-invoice" value="${obj.result['info'][0]['category'][i].cat_invoice}" placeholder="Invoice" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-lem-edit-description-invoice"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-lem-edit-description-hs-code" value="${obj.result['info'][0]['category'][i].cat_hs_code}" placeholder="HS Code" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-lem-edit-description-hs-code"></div>
				                      </div>
				                    </div>
				                  </div>
				                </div>
				              </div>
				            </div>
				          </div>
				        </div>
					`;
					smsDesClone.append(sc);
				}

				deviceListTmp = obj.result['device'];

				let slect2 = $('select[id^="sms-si-lem-edit-description-device"]');
				let boxSlect2 = $('div[id^="select2-sms-si-lem-edit-description-device"]');
				for (var i = 0; i < slect2.length; i++) {
					if (slect2.eq(x).attr('aria-hidden') !== "true") {
						$("#"+slect2.eq(i).attr('id')).select2({
							dropdownParent: $("#"+boxSlect2.eq(i).attr('id'))
						});
					}
				}

				$(".air-badge").html('');
				rowIndex1.addClass("d-none");
				rowIndex1.attr("flag", "false");

				rowIndex2.removeClass("d-none");
				rowIndex2.attr("flag", "true");

			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
	
	$("#btn-sms-si-shp-confirmation-lem-release").click(function () {
		const btnTarget = $("#btn-sms-si-shp-confirmation-lem-release");

		const smsSiEditPoNumber = $("#sms-si-lem-edit-po-number");
		const smsSiEditCoo = $("#sms-si-lem-edit-coo");
		const smsSiEditCustName = $("#sms-si-lem-edit-cust-name");
		const smsSiEditDelPlanDate = $("#sms-si-lem-edit-delivery-plan-date");
		const smsSiEditConsignee = $("#sms-si-lem-edit-consignee");
		const smsSiEditAddress = $("#sms-si-lem-edit-address");
		const smsSiEditEoriNo = $("#sms-si-lem-edit-eori-no");
		const smsSiEditAttention = $("#sms-si-lem-edit-attention");
		const smsSiEditEmail = $("#sms-si-lem-edit-email");
		const smsSiEditContactNumber = $("#sms-si-lem-edit-contact-number");
		const smsSiEditForwarder = $("#sms-si-lem-edit-forwarder");

		const smsSiEditAccountNumber = $("#sms-si-lem-edit-account-number");
		const smsSiEditRemark = $("#sms-si-lem-edit-remark");

		const smsSiEditFlight = $("#sms-si-lem-edit-flight");
		const smsSiEditPlanPickup = $("#sms-si-lem-edit-plan-pickup");
		const smsSiEditNettWeight = $("#sms-si-lem-edit-nett-weight");
		const smsSiEditGrossWeight = $("#sms-si-lem-edit-gross-weight");
		const smsSiEditTotalCarton = $("#sms-si-lem-edit-total-carton");
		const smsSiEditCartonDimension = $("#sms-si-lem-edit-carton-dimension");

		const smsSiEditNameFlight = $("#sms-si-lem-edit-name-flight");
		const smsSiEditMawb = $("#sms-si-lem-edit-mawb");
		const smsSiEditHawb = $("#sms-si-lem-edit-hawb");

		const smsSiEditIncoterm = $("#sms-si-lem-edit-incoterm");
		const smsSiEditExt = $("#sms-si-lem-edit-ext");

		const smsDesClone = $("#sms-si-lem-edit-clone-description");
		const smsSiEditDescriptionPackage = $('[id^="sms-si-lem-edit-description-package"]');
		const smsSiEditDescriptionDevice = $('[id^="sms-si-lem-edit-description-device"]');
		const smsSiEditDescriptionQuantity = $('[id^="sms-si-lem-edit-description-quantity"]');
		const smsSiEditDescriptionInvoice = $('[id^="sms-si-lem-edit-description-invoice"]');
		const smsSiEditDescriptionHsCode = $('[id^="sms-si-lem-edit-description-hs-code"]');

		let allow = true;

		if (!inputValidation("#"+smsSiEditAddress.attr("id"), "#msg-"+smsSiEditAddress.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditEoriNo.attr("id"), "#msg-"+smsSiEditEoriNo.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditAttention.attr("id"), "#msg-"+smsSiEditAttention.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditEmail.attr("id"), "#msg-"+smsSiEditEmail.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditContactNumber.attr("id"), "#msg-"+smsSiEditContactNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditForwarder.attr("id"), "#msg-"+smsSiEditForwarder.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditAccountNumber.attr("id"), "#msg-"+smsSiEditAccountNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditRemark.attr("id"), "#msg-"+smsSiEditRemark.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditFlight.attr("id"), "#msg-"+smsSiEditFlight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditPlanPickup.attr("id"), "#msg-"+smsSiEditPlanPickup.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditNettWeight.attr("id"), "#msg-"+smsSiEditNettWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditGrossWeight.attr("id"), "#msg-"+smsSiEditGrossWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditTotalCarton.attr("id"), "#msg-"+smsSiEditTotalCarton.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditCartonDimension.attr("id"), "#msg-"+smsSiEditCartonDimension.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditNameFlight.attr("id"), "#msg-"+smsSiEditNameFlight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditMawb.attr("id"), "#msg-"+smsSiEditMawb.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditHawb.attr("id"), "#msg-"+smsSiEditHawb.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditIncoterm.attr("id"), "#msg-"+smsSiEditIncoterm.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditExt.attr("id"), "#msg-"+smsSiEditExt.attr("id"))) allow = false;

		for (let i = 0; i < smsSiEditDescriptionPackage.length; i++) {
			if (!inputValidation("input[id$='"+smsSiEditDescriptionPackage.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionPackage.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionPackage.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionPackage.eq(i).attr('number')+"']")) allow = false;
			if (!select2Validation("select[id$='"+smsSiEditDescriptionDevice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionDevice.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionDevice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionDevice.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiEditDescriptionQuantity.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionQuantity.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionQuantity.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionQuantity.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiEditDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionInvoice.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionInvoice.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiEditDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionHsCode.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionHsCode.eq(i).attr('number')+"']")) allow = false;
		}

		if (!allow) return false;
	    $(".air-badge").html(loadingBackdrop());

	    const params = {};
	    params[0] = {
	      "address" : smsSiEditAddress.val(),
	      "eorino" : smsSiEditEoriNo.val(),
	      "attention" : smsSiEditAttention.val(),
	      "email" : smsSiEditEmail.val(),
	      "contact-number" : smsSiEditContactNumber.val(),
	      "forwarder" : smsSiEditForwarder.val(),
	      "account-number" : smsSiEditAccountNumber.val(),
	      "remark" : smsSiEditRemark.val(),
	      "flight" : smsSiEditFlight.val(),
	      "plan-pickup" : smsSiEditPlanPickup.val(),
	      "nett-weight" : smsSiEditNettWeight.val(),
	      "gross-weight" : smsSiEditGrossWeight.val(),
	      "total-carton" : smsSiEditTotalCarton.val(),
	      "carton-dimension" : smsSiEditCartonDimension.val(),
	      "name-flight" : smsSiEditNameFlight.val(),
	      "mawb" : smsSiEditMawb.val(),
	      "hawb" : smsSiEditHawb.val(),
	      "incoterm" : smsSiEditIncoterm.val(),
	      "extension" : smsSiEditExt.val(),
	      "cat-sms" : [],

	      "release-target-desc" : btnTarget.attr('sms-desc'),
	      "release-target-info" : btnTarget.attr('sms-info'),
	    };

	    for (let i = 0; i < smsSiEditDescriptionPackage.length; i++) {
			params[0]['cat-sms'].push({
				"package": smsSiEditDescriptionPackage.eq(i).val(),
				"device": smsSiEditDescriptionDevice.eq(i).val(),
				"quantity": smsSiEditDescriptionQuantity.eq(i).val(),
				"invoice": smsSiEditDescriptionInvoice.eq(i).val(),
				"hs-code": smsSiEditDescriptionHsCode.eq(i).val(),
			});
		}

		const url = baseUrl("/auth/api/v22/release-sms-shp-confirmation");

	    const execute = postField(url, 'POST', {'data' : JSON.stringify(params)}, false);

	    execute.done(function(result) {
	      let obj = JSON.parse(JSON.stringify(result));

	      if (obj.code == 200) {
	        $(".air-badge").html(airBadge(obj.msg , 'success'));
	        setTimeout(function() {
	          window.location = window.location.href;
	        }, 5000);
	      } else {
	        $(".air-badge").html(airBadge(obj.msg , 'danger'));
	      }
	    });

	    execute.fail(function() {
	      $(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
	    });
	})

	$("#turn-colomn-sms-si-release-description-lem").click(function() {
		let clone = $("#sms-si-lem-edit-clone-description");
		let totalClone = $('[id^="sms-si-lem-edit-description-column"]');

		let sc = `
			<div class="form-group row" number="${totalClone.length+Date.now()}" id="sms-si-lem-edit-description-column">
	          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
	          <div class="col-sm-12 col-md-12 col-lg-10">
	            <div class="form-row">
	              <div class="col-lg-1">
	                <div class="form-group row">
	                  <div class="col-sm-12 col-md-12 col-lg-3">
	                    <div class="form-check mb-lg-0">
	                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-lem-edit-description-checked" number="${totalClone.length+Date.now()}">
	                      <label class="form-check-label d-lg-none" for="sms-si-lem-edit-description-checked">Checked</label>
	                    </div>
	                  </div>
	                </div>
	              </div>
	              <div class="col-lg-11">
	                <div class="row">
	                  <div class="col-lg-3">
	                    <div class="form-group row">
	                      <label for="sms-si-lem-edit-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-lem-edit-description-package" placeholder="Package" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-lem-edit-description-package"></div>
	                      </div>
	                    </div>
	                  </div>

	                  <div class="col-lg-3">
	                    <div class="form-group row">
	                      <label for="sms-si-lem-edit-description-device-${totalClone.length+Date.now()}" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
	                      <select class="form-control" id="sms-si-lem-edit-description-device-${totalClone.length+Date.now()}" title="Device" data-live-search="true" data-live-search-placeholder="Device" number="${totalClone.length+Date.now()}">
	                        <option value="" disabled selected>Choose a Device</option>
	                      </select>
	                      <div id="select2-sms-si-lem-edit-description-device-${totalClone.length+Date.now()}" number="${totalClone.length+Date.now()}"></div>
	                      <div class="invalid-feedback" id="msg-sms-si-lem-edit-description-device-${totalClone.length+Date.now()}" number="${totalClone.length+Date.now()}"></div>
	                    </div>
	                  </div>

	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-lem-edit-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-lem-edit-description-quantity" placeholder="Quantity" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-lem-edit-description-quantity"></div>
	                      </div>
	                    </div>
	                  </div>
	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-lem-edit-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-lem-edit-description-invoice" placeholder="Invoice" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-lem-edit-description-invoice"></div>
	                      </div>
	                    </div>
	                  </div>
	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-lem-edit-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-lem-edit-description-hs-code" placeholder="HS Code" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-lem-edit-description-hs-code"></div>
	                      </div>
	                    </div>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
		`;
		clone.append(sc);

		let slect2 = $('select[id^="sms-si-lem-edit-description-device"]');
		let boxSlect2 = $('div[id^="select2-sms-si-lem-edit-description-device"]');

		for (var x = 0; x < slect2.length; x++) {
			if (slect2.eq(x).attr('aria-hidden') !== "true") {
				if (deviceListTmp !== false) {
					for (var i = 0; i < deviceListTmp.length; i++) {
						slect2.eq(x).append(new Option(deviceListTmp[i], deviceListTmp[i]));
					}
				}
			}
		}

		for (var i = 0; i < slect2.length; i++) {
			if (slect2.eq(x).attr('aria-hidden') !== "true") {
				$("#"+slect2.eq(i).attr('id')).select2({
					dropdownParent: $("#"+boxSlect2.eq(i).attr('id'))
				});
			}
		}
	});

	$("#burn-colomn-sms-si-release-description-lem").click(function () {
		const dv = $('[id^="sms-si-lem-edit-description-column"]');
		const checkbox = $('[id^="sms-si-lem-edit-description-checked"]');

		let number = false;

		for (let i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				number = checkbox.eq(i).attr('number');
				dv.eq(i).remove();
			} else {
				checkbox.eq(i).attr("number", i);
				dv.eq(i).attr("number", i);
			}
		}

		if (!number) {
			$(".air-badge").html(airBadge("Please check the box", 'danger'));
		}
	});

	$("#btn-cancel-sms-shp-confirmation-lem").click(function () {
		const modal = $("#modal-cancel-sms-si-shp-confirmation-lem");
		const label = $(".info-cancel-sms-si-shp-confirmation-lem");
		const btn = $("#btn-save-cancel-sms-si-shp-confirmation-lem");

		let tables = $('[id^="select-sms-shp-confirmation-lem-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(1).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	})

	$("#btn-save-cancel-sms-si-shp-confirmation-lem").click(function () {
		const btn = $("#btn-save-cancel-sms-si-shp-confirmation-lem");
		const txt = btn.attr("data");

		$("#modal-cancel-sms-si-shp-confirmation-lem").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v22/cancel-sms-shp-confirmation");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});

	$("#btn-print-sms-shp-confirmation-lem").click(function () {

		let tables = $('[id^="select-sms-shp-confirmation-lem-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "LEM",
			'type': "print",
		};

		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-excel-sms-shp-confirmation-lem").click(function () {

		let tables = $('[id^="select-sms-shp-confirmation-lem-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "LEM",
			'type': "excel",
		};
		
		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-pdf-sms-shp-confirmation-lem").click(function () {

		let tables = $('[id^="select-sms-shp-confirmation-lem-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "LEM",
			'type': "pdf",
		};
		
		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	// ===================================================
	$("#btn-release-sms-shp-confirmation-abov").click(function () {
		const rowIndex1 = $("#row-index-abov-1");
		const rowIndex2 = $("#row-index-abov-2");

		const btnTarget = $("#btn-sms-si-shp-confirmation-abov-release");

		const smsSiEditPoNumber = $("#sms-si-abov-edit-po-number");
		const smsSiEditCoo = $("#sms-si-abov-edit-coo");
		const smsSiEditCustName = $("#sms-si-abov-edit-cust-name");
		const smsSiEditDelPlanDate = $("#sms-si-abov-edit-delivery-plan-date");
		const smsSiEditConsignee = $("#sms-si-abov-edit-consignee");
		const smsSiEditAddress = $("#sms-si-abov-edit-address");
		const smsSiEditEoriNo = $("#sms-si-abov-edit-eori-no");
		const smsSiEditAttention = $("#sms-si-abov-edit-attention");
		const smsSiEditEmail = $("#sms-si-abov-edit-email");
		const smsSiEditContactNumber = $("#sms-si-abov-edit-contact-number");
		const smsSiEditForwarder = $("#sms-si-abov-edit-forwarder");
		const smsSiEditAccountNumber = $("#sms-si-abov-edit-account-number");
		const smsSiEditRemark = $("#sms-si-abov-edit-remark");

		const smsSiEditFlight = $("#sms-si-abov-edit-flight");
		const smsSiEditPlanPickup = $("#sms-si-abov-edit-plan-pickup");
		const smsSiEditNettWeight = $("#sms-si-abov-edit-nett-weight");
		const smsSiEditGrossWeight = $("#sms-si-abov-edit-gross-weight");
		const smsSiEditTotalCarton = $("#sms-si-abov-edit-total-carton");
		const smsSiEditCartonDimension = $("#sms-si-abov-edit-carton-dimension");

		const smsSiEditNameFlight = $("#sms-si-abov-edit-name-flight");
		const smsSiEditMawb = $("#sms-si-abov-edit-mawb");
		const smsSiEditHawb = $("#sms-si-abov-edit-hawb");
		const smsSiEditIncoterm = $("#sms-si-abov-edit-incoterm");
		const smsSiEditExt = $("#sms-si-abov-edit-ext");

		const smsDesClone = $("#sms-si-abov-edit-clone-description");
		const smsSiEditDescriptionPackage = $('[id^="sms-si-abov-edit-description-package"]');
		const smsSiEditDescriptionDevice = $('[id^="sms-si-abov-edit-description-device"]');
		const smsSiEditDescriptionQuantity = $('[id^="sms-si-abov-edit-description-quantity"]');
		const smsSiEditDescriptionHsCode = $('[id^="sms-si-abov-edit-description-hs-code"]');

		let tables = $('[id^="select-sms-shp-confirmation-abov-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				x++;
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': JSON.stringify(id)
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v22/get-sms-booking-shp-instruction");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				// btnTarget.attr('data', obj.result['id']);
				btnTarget.attr('sms-desc', obj.result['info'][0]['cat_sms']);
				btnTarget.attr('sms-info', obj.result['info'][0]['sms_number']);

				smsSiEditPoNumber.val(obj.result['info'][0]['po_number']);
				smsSiEditCoo.val(obj.result['info'][0]['coo']);
				smsSiEditCustName.val(obj.result['info'][0]['customer_name']);
				smsSiEditDelPlanDate.val(obj.result['info'][0]['delivery_plan_date']);
				smsSiEditConsignee.val(obj.result['info'][0]['consignee']);
				smsSiEditAddress.val(obj.result['info'][0]['address']);
				smsSiEditEoriNo.val(obj.result['info'][0]['eori_no']);
				smsSiEditAttention.val(obj.result['info'][0]['attention']);
				smsSiEditEmail.val(obj.result['info'][0]['email']);
				smsSiEditContactNumber.val(obj.result['info'][0]['contact_number']);
				smsSiEditForwarder.val(obj.result['info'][0]['forwarder']);
				smsSiEditAccountNumber.val(obj.result['info'][0]['courir_number']);
				smsSiEditRemark.val(obj.result['info'][0]['remark']);

				smsSiEditFlight.val(obj.result['info'][0]['flight']);
				smsSiEditPlanPickup.val(obj.result['info'][0]['plan_pickup']);

				smsSiEditNettWeight.val(obj.result['info'][0]['nett_weight']);
				smsSiEditGrossWeight.val(obj.result['info'][0]['gross_weight']);
				smsSiEditTotalCarton.val(obj.result['info'][0]['total_carton']);
				smsSiEditCartonDimension.val(obj.result['info'][0]['carton_dimension']);

				smsSiEditNameFlight.val(obj.result['info'][0]['flight_name']);
				smsSiEditMawb.val(obj.result['info'][0]['mawb']);
				smsSiEditHawb.val(obj.result['info'][0]['hawb']);

				smsSiEditIncoterm.val(obj.result['info'][0]['incoterm']);
				smsSiEditExt.val(obj.result['info'][0]['extension']);

				smsDesClone.html('');
				for (var i = 0; i < obj.result['info'][0]['category'].length; i++) {

					let selectOption = '';

					for (var x = 0; x < obj.result['device'].length; x++) {
						selectOption += `<option value="${obj.result['device'][x]}"${(obj.result['device'][x] == obj.result['info'][0]['category'][i].cat_device ? " selected" : "")}>${obj.result['device'][x]}</option>`
					}

					let sc = `
						<div class="form-group row" number="${i+Date.now()}" id="sms-si-abov-edit-description-column">
				          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
				          <div class="col-sm-12 col-md-12 col-lg-10">
				            <div class="form-row">
				              <div class="col-lg-1">
				                <div class="form-group row">
				                  <div class="col-sm-12 col-md-12 col-lg-3">
				                    <div class="form-check mb-lg-0">
				                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-abov-edit-description-checked" number="${i+Date.now()}">
				                      <label class="form-check-label d-lg-none" for="sms-si-abov-edit-description-checked">Checked</label>
				                    </div>
				                  </div>
				                </div>
				              </div>
				              <div class="col-lg-11">
				                <div class="row">
				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-abov-edit-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-abov-edit-description-package" value="${obj.result['info'][0]['category'][i].cat_package}" placeholder="Package" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-abov-edit-description-package"></div>
				                      </div>
				                    </div>
				                  </div>

				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-abov-edit-description-device-${i+Date.now()}" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
				                      <select class="form-control" id="sms-si-abov-edit-description-device-${i+Date.now()}" title="Device" data-live-search="true" data-live-search-placeholder="Device" number="${i+Date.now()}">
				                        <option value="" disabled selected>Choose a Device</option>
				                        ${selectOption}
				                      </select>
				                      <div id="select2-sms-si-abov-edit-description-device-${i+Date.now()}" number="${i+Date.now()}"></div>
				                      <div class="invalid-feedback" id="msg-sms-si-abov-edit-description-device-${i+Date.now()}" number="${i+Date.now()}"></div>
				                    </div>
				                  </div>

				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-abov-edit-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-abov-edit-description-quantity" value="${obj.result['info'][0]['category'][i].cat_quantity}" placeholder="Quantity" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-abov-edit-description-quantity"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-abov-edit-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-abov-edit-description-invoice" value="${obj.result['info'][0]['category'][i].cat_invoice}" placeholder="Invoice" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-abov-edit-description-invoice"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-abov-edit-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-abov-edit-description-hs-code" value="${obj.result['info'][0]['category'][i].cat_hs_code}" placeholder="HS Code" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-abov-edit-description-hs-code"></div>
				                      </div>
				                    </div>
				                  </div>
				                </div>
				              </div>
				            </div>
				          </div>
				        </div>
					`;
					smsDesClone.append(sc);
				}

				deviceListTmp = obj.result['device'];

				let slect2 = $('select[id^="sms-si-abov-edit-description-device"]');
				let boxSlect2 = $('div[id^="select2-sms-si-abov-edit-description-device"]');
				for (var i = 0; i < slect2.length; i++) {
					if (slect2.eq(x).attr('aria-hidden') !== "true") {
						$("#"+slect2.eq(i).attr('id')).select2({
							dropdownParent: $("#"+boxSlect2.eq(i).attr('id'))
						});
					}
				}

				$(".air-badge").html('');
				rowIndex1.addClass("d-none");
				rowIndex1.attr("flag", "false");

				rowIndex2.removeClass("d-none");
				rowIndex2.attr("flag", "true");

			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
	
	$("#btn-sms-si-shp-confirmation-abov-release").click(function () {
		const btnTarget = $("#btn-sms-si-shp-confirmation-abov-release");

		const smsSiEditPoNumber = $("#sms-si-abov-edit-po-number");
		const smsSiEditCoo = $("#sms-si-abov-edit-coo");
		const smsSiEditCustName = $("#sms-si-abov-edit-cust-name");
		const smsSiEditDelPlanDate = $("#sms-si-abov-edit-delivery-plan-date");
		const smsSiEditConsignee = $("#sms-si-abov-edit-consignee");
		const smsSiEditAddress = $("#sms-si-abov-edit-address");
		const smsSiEditEoriNo = $("#sms-si-abov-edit-eori-no");
		const smsSiEditAttention = $("#sms-si-abov-edit-attention");
		const smsSiEditEmail = $("#sms-si-abov-edit-email");
		const smsSiEditContactNumber = $("#sms-si-abov-edit-contact-number");
		const smsSiEditForwarder = $("#sms-si-abov-edit-forwarder");

		const smsSiEditAccountNumber = $("#sms-si-abov-edit-account-number");
		const smsSiEditRemark = $("#sms-si-abov-edit-remark");

		const smsSiEditFlight = $("#sms-si-abov-edit-flight");
		const smsSiEditPlanPickup = $("#sms-si-abov-edit-plan-pickup");
		const smsSiEditNettWeight = $("#sms-si-abov-edit-nett-weight");
		const smsSiEditGrossWeight = $("#sms-si-abov-edit-gross-weight");
		const smsSiEditTotalCarton = $("#sms-si-abov-edit-total-carton");
		const smsSiEditCartonDimension = $("#sms-si-abov-edit-carton-dimension");

		const smsSiEditNameFlight = $("#sms-si-abov-edit-name-flight");
		const smsSiEditMawb = $("#sms-si-abov-edit-mawb");
		const smsSiEditHawb = $("#sms-si-abov-edit-hawb");

		const smsSiEditIncoterm = $("#sms-si-abov-edit-incoterm");
		const smsSiEditExt = $("#sms-si-abov-edit-ext");

		const smsDesClone = $("#sms-si-abov-edit-clone-description");
		const smsSiEditDescriptionPackage = $('[id^="sms-si-abov-edit-description-package"]');
		const smsSiEditDescriptionDevice = $('[id^="sms-si-abov-edit-description-device"]');
		const smsSiEditDescriptionQuantity = $('[id^="sms-si-abov-edit-description-quantity"]');
		const smsSiEditDescriptionInvoice = $('[id^="sms-si-abov-edit-description-invoice"]');
		const smsSiEditDescriptionHsCode = $('[id^="sms-si-abov-edit-description-hs-code"]');

		let allow = true;

		if (!inputValidation("#"+smsSiEditAddress.attr("id"), "#msg-"+smsSiEditAddress.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditEoriNo.attr("id"), "#msg-"+smsSiEditEoriNo.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditAttention.attr("id"), "#msg-"+smsSiEditAttention.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditEmail.attr("id"), "#msg-"+smsSiEditEmail.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditContactNumber.attr("id"), "#msg-"+smsSiEditContactNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditForwarder.attr("id"), "#msg-"+smsSiEditForwarder.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditAccountNumber.attr("id"), "#msg-"+smsSiEditAccountNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditRemark.attr("id"), "#msg-"+smsSiEditRemark.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditFlight.attr("id"), "#msg-"+smsSiEditFlight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditPlanPickup.attr("id"), "#msg-"+smsSiEditPlanPickup.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditNettWeight.attr("id"), "#msg-"+smsSiEditNettWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditGrossWeight.attr("id"), "#msg-"+smsSiEditGrossWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditTotalCarton.attr("id"), "#msg-"+smsSiEditTotalCarton.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditCartonDimension.attr("id"), "#msg-"+smsSiEditCartonDimension.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditNameFlight.attr("id"), "#msg-"+smsSiEditNameFlight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditMawb.attr("id"), "#msg-"+smsSiEditMawb.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditHawb.attr("id"), "#msg-"+smsSiEditHawb.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditIncoterm.attr("id"), "#msg-"+smsSiEditIncoterm.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditExt.attr("id"), "#msg-"+smsSiEditExt.attr("id"))) allow = false;

		for (let i = 0; i < smsSiEditDescriptionPackage.length; i++) {
			if (!inputValidation("input[id$='"+smsSiEditDescriptionPackage.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionPackage.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionPackage.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionPackage.eq(i).attr('number')+"']")) allow = false;
			if (!select2Validation("select[id$='"+smsSiEditDescriptionDevice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionDevice.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionDevice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionDevice.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiEditDescriptionQuantity.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionQuantity.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionQuantity.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionQuantity.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiEditDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionInvoice.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionInvoice.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiEditDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionHsCode.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionHsCode.eq(i).attr('number')+"']")) allow = false;
		}

		if (!allow) return false;
	    $(".air-badge").html(loadingBackdrop());

	    const params = {};
	    params[0] = {
	      "address" : smsSiEditAddress.val(),
	      "eorino" : smsSiEditEoriNo.val(),
	      "attention" : smsSiEditAttention.val(),
	      "email" : smsSiEditEmail.val(),
	      "contact-number" : smsSiEditContactNumber.val(),
	      "forwarder" : smsSiEditForwarder.val(),
	      "account-number" : smsSiEditAccountNumber.val(),
	      "remark" : smsSiEditRemark.val(),
	      "flight" : smsSiEditFlight.val(),
	      "plan-pickup" : smsSiEditPlanPickup.val(),
	      "nett-weight" : smsSiEditNettWeight.val(),
	      "gross-weight" : smsSiEditGrossWeight.val(),
	      "total-carton" : smsSiEditTotalCarton.val(),
	      "carton-dimension" : smsSiEditCartonDimension.val(),
	      "name-flight" : smsSiEditNameFlight.val(),
	      "mawb" : smsSiEditMawb.val(),
	      "hawb" : smsSiEditHawb.val(),
	      "incoterm" : smsSiEditIncoterm.val(),
	      "extension" : smsSiEditExt.val(),
	      "cat-sms" : [],

	      "release-target-desc" : btnTarget.attr('sms-desc'),
	      "release-target-info" : btnTarget.attr('sms-info'),
	    };

	    for (let i = 0; i < smsSiEditDescriptionPackage.length; i++) {
			params[0]['cat-sms'].push({
				"package": smsSiEditDescriptionPackage.eq(i).val(),
				"device": smsSiEditDescriptionDevice.eq(i).val(),
				"quantity": smsSiEditDescriptionQuantity.eq(i).val(),
				"invoice": smsSiEditDescriptionInvoice.eq(i).val(),
				"hs-code": smsSiEditDescriptionHsCode.eq(i).val(),
			});
		}

		const url = baseUrl("/auth/api/v22/release-sms-shp-confirmation");

	    const execute = postField(url, 'POST', {'data' : JSON.stringify(params)}, false);

	    execute.done(function(result) {
	      let obj = JSON.parse(JSON.stringify(result));

	      if (obj.code == 200) {
	        $(".air-badge").html(airBadge(obj.msg , 'success'));
	        setTimeout(function() {
	          window.location = window.location.href;
	        }, 5000);
	      } else {
	        $(".air-badge").html(airBadge(obj.msg , 'danger'));
	      }
	    });

	    execute.fail(function() {
	      $(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
	    });
	})

	$("#turn-colomn-sms-si-release-description-abov").click(function() {
		let clone = $("#sms-si-abov-edit-clone-description");
		let totalClone = $('[id^="sms-si-abov-edit-description-column"]');

		let sc = `
			<div class="form-group row" number="${totalClone.length+Date.now()}" id="sms-si-abov-edit-description-column">
	          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
	          <div class="col-sm-12 col-md-12 col-lg-10">
	            <div class="form-row">
	              <div class="col-lg-1">
	                <div class="form-group row">
	                  <div class="col-sm-12 col-md-12 col-lg-3">
	                    <div class="form-check mb-lg-0">
	                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-abov-edit-description-checked" number="${totalClone.length+Date.now()}">
	                      <label class="form-check-label d-lg-none" for="sms-si-abov-edit-description-checked">Checked</label>
	                    </div>
	                  </div>
	                </div>
	              </div>
	              <div class="col-lg-11">
	                <div class="row">
	                  <div class="col-lg-3">
	                    <div class="form-group row">
	                      <label for="sms-si-abov-edit-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-abov-edit-description-package" placeholder="Package" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-abov-edit-description-package"></div>
	                      </div>
	                    </div>
	                  </div>

	                  <div class="col-lg-3">
	                    <div class="form-group row">
	                      <label for="sms-si-abov-edit-description-device-${totalClone.length+Date.now()}" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
	                      <select class="form-control" id="sms-si-abov-edit-description-device-${totalClone.length+Date.now()}" title="Device" data-live-search="true" data-live-search-placeholder="Device" number="${totalClone.length+Date.now()}">
	                        <option value="" disabled selected>Choose a Device</option>
	                      </select>
	                      <div id="select2-sms-si-abov-edit-description-device-${totalClone.length+Date.now()}" number="${totalClone.length+Date.now()}"></div>
	                      <div class="invalid-feedback" id="msg-sms-si-abov-edit-description-device-${totalClone.length+Date.now()}" number="${totalClone.length+Date.now()}"></div>
	                    </div>
	                  </div>

	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-abov-edit-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-abov-edit-description-quantity" placeholder="Quantity" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-abov-edit-description-quantity"></div>
	                      </div>
	                    </div>
	                  </div>
	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-abov-edit-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-abov-edit-description-invoice" placeholder="Invoice" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-abov-edit-description-invoice"></div>
	                      </div>
	                    </div>
	                  </div>
	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-abov-edit-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-abov-edit-description-hs-code" placeholder="HS Code" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-abov-edit-description-hs-code"></div>
	                      </div>
	                    </div>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
		`;
		clone.append(sc);

		let slect2 = $('select[id^="sms-si-abov-edit-description-device"]');
		let boxSlect2 = $('div[id^="select2-sms-si-abov-edit-description-device"]');

		for (var x = 0; x < slect2.length; x++) {
			if (slect2.eq(x).attr('aria-hidden') !== "true") {
				if (deviceListTmp !== false) {
					for (var i = 0; i < deviceListTmp.length; i++) {
						slect2.eq(x).append(new Option(deviceListTmp[i], deviceListTmp[i]));
					}
				}
			}
		}

		for (var i = 0; i < slect2.length; i++) {
			if (slect2.eq(x).attr('aria-hidden') !== "true") {
				$("#"+slect2.eq(i).attr('id')).select2({
					dropdownParent: $("#"+boxSlect2.eq(i).attr('id'))
				});
			}
		}
	});

	$("#burn-colomn-sms-si-release-description-abov").click(function () {
		const dv = $('[id^="sms-si-abov-edit-description-column"]');
		const checkbox = $('[id^="sms-si-abov-edit-description-checked"]');

		let number = false;

		for (let i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				number = checkbox.eq(i).attr('number');
				dv.eq(i).remove();
			} else {
				checkbox.eq(i).attr("number", i);
				dv.eq(i).attr("number", i);
			}
		}

		if (!number) {
			$(".air-badge").html(airBadge("Please check the box", 'danger'));
		}
	});

	$("#btn-cancel-sms-shp-confirmation-abov").click(function () {
		const modal = $("#modal-cancel-sms-si-shp-confirmation-abov");
		const label = $(".info-cancel-sms-si-shp-confirmation-abov");
		const btn = $("#btn-save-cancel-sms-si-shp-confirmation-abov");

		let tables = $('[id^="select-sms-shp-confirmation-abov-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(1).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	})

	$("#btn-save-cancel-sms-si-shp-confirmation-abov").click(function () {
		const btn = $("#btn-save-cancel-sms-si-shp-confirmation-abov");
		const txt = btn.attr("data");

		$("#modal-cancel-sms-si-shp-confirmation-abov").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v22/cancel-sms-shp-confirmation");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});

	$("#btn-print-sms-shp-confirmation-abov").click(function () {

		let tables = $('[id^="select-sms-shp-confirmation-abov-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "ABOV",
			'type': "print",
		};

		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-excel-sms-shp-confirmation-abov").click(function () {

		let tables = $('[id^="select-sms-shp-confirmation-abov-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "ABOV",
			'type': "excel",
		};
		
		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-pdf-sms-shp-confirmation-abov").click(function () {

		let tables = $('[id^="select-sms-shp-confirmation-abov-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "ABOV",
			'type': "pdf",
		};
		
		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});
}

const smsFinalDelivery = () => {
	let deviceListTmp = false
	let lem_selectAll = false;
	let lem_ctrlPressed = false;
	let lem_shiftPressed = false;
	let lem_lastPressed = 0;

	let abov_selectAll = false;
	let abov_ctrlPressed = false;
	let abov_shiftPressed = false;
	let abov_lastPressed = 0;

	let lem_autocompleteRows = {
		"label": [],
		"data": {}
	};

	let abov_autocompleteRows = {
		"label": [],
		"data": {}
	};

	let lem_tableOptIndex = datatableOpt();
	let abov_tableOptIndex = datatableOpt();

	let lem_tableBtnIndex = [
		{	
			text : '<span class="mr-2">Release</span><i class="fas fa-fw fa-paper-plane"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-release-sms-final-delivery-lem');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Cancel</span><i class="fas fa-fw fa-ban"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-cancel-sms-final-delivery-lem');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format Print</span><i class="fas fa-fw fa-print"></i>', 
			className: 'btn btn-dark btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-print-sms-final-delivery-lem');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format Excel</span><i class="fas fa-fw fa-file-excel"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-excel-sms-final-delivery-lem');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format PDF</span><i class="fas fa-fw fa-file-pdf"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-pdf-sms-final-delivery-lem');
				$(node).attr('disabled', true);
			}
		}
	];

	let abov_tableBtnIndex = [
		{	
			text : '<span class="mr-2">Release</span><i class="fas fa-fw fa-paper-plane"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-release-sms-final-delivery-abov');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Cancel</span><i class="fas fa-fw fa-ban"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-cancel-sms-final-delivery-abov');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format Print</span><i class="fas fa-fw fa-print"></i>', 
			className: 'btn btn-dark btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-print-sms-final-delivery-abov');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format Excel</span><i class="fas fa-fw fa-file-excel"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-excel-sms-final-delivery-abov');
				$(node).attr('disabled', true);
			}
		},
		{	
			text : '<span class="mr-2">Format PDF</span><i class="fas fa-fw fa-file-pdf"></i>', 
			className: 'btn btn-danger btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-pdf-sms-final-delivery-abov');
				$(node).attr('disabled', true);
			}
		}
	];

	lem_tableOptIndex['buttons'] = arrayPrepend(lem_tableBtnIndex, selectionExportBtn());
	abov_tableOptIndex['buttons'] = arrayPrepend(abov_tableBtnIndex, selectionExportBtn());

	lem_tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Doc Number"},
		{data: "Delivery Plan Date"},
		{data: "PO Number"},
		{data: "Consignee"},
		{data: "address"},
		{data: "Package"},
		{data: "Device"},
		{data: "Quantity"},
		{data: "HS Code"},
		{data: "Flight"},
		{data: "Plan Pickup"},
	];

	abov_tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Doc Number"},
		{data: "Delivery Plan Date"},
		{data: "PO Number"},
		{data: "Consignee"},
		{data: "address"},
		{data: "Package"},
		{data: "Device"},
		{data: "Quantity"},
		{data: "HS Code"},
		{data: "Flight"},
		{data: "Plan Pickup"},
	];

	lem_tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-sms-final-delivery-lem-list');
		$(row).attr('data', data.data);
		$(row).attr('status', data.status);
		$(row).attr('stg', false);
	};

	abov_tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-sms-final-delivery-abov-list');
		$(row).attr('data', data.data);
		$(row).attr('status', data.status);
		$(row).attr('stg', false);
	};

	lem_tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 1, 2, 3],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		},
		{
			"targets": [4, 5, 6, 7, 8, 9, 10, 11],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		}
	];

	abov_tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 1, 2, 3],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		},
		{
			"targets": [4, 5, 6, 7, 8, 9, 10, 11],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
				$(td).addClass(rowData.clr);
			}
		}
	];

	// ORDER TABLE COLUMN BY IS DISABLE
	lem_tableOptIndex['rowsGroup'] = [
		0, 1, 2, 3, 4, 5, 10, 11
	];

	abov_tableOptIndex['rowsGroup'] = [
		0, 1, 2, 3, 4, 5, 10, 11
	];

	let lem_dataTableIndex = $('#datatable-sms-final-delivery-lem').DataTable(lem_tableOptIndex);
	let abov_dataTableIndex = $('#datatable-sms-final-delivery-abov').DataTable(abov_tableOptIndex);

	const selectSmsShpConfiramtionListLem = (arr) => {
		const btnRelease = $("#btn-release-sms-final-delivery-lem");
		const btnCancel = $("#btn-cancel-sms-final-delivery-lem");
		const btnPrint = $("#btn-print-sms-final-delivery-lem");
		const btnExcel = $("#btn-excel-sms-final-delivery-lem");
		const btnPdf = $("#btn-pdf-sms-final-delivery-lem");

		let tables = $('[id^="select-sms-final-delivery-lem-list"]');
		let isOn = 0;
		let shiftTable = 0;
		let status = [];

		let x = 0;
		for (let i = 0; i < tables.length; i++) {
			if (lem_selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				status[x] = tables.eq(i).attr("status");
				isOn++;
				x++;
				lem_lastPressed = (i+1);
			} else {
				if (lem_ctrlPressed && !lem_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							lem_lastPressed = (i+1);
							// status[x] = tables.eq(i).attr("status");
							// x++;
						}
					}

					if (tables.eq(i).attr("stg") == "true") {
						status[x] = tables.eq(i).attr("status");
						x++;
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!lem_ctrlPressed && !lem_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							if (!status.includes(tables.eq(i).attr("status"))) {
								status[x] = tables.eq(i).attr("status");
								x++;
								isOn++;
							}
							lem_lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (lem_shiftPressed && !lem_ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						shiftTable = (i+1);
					}
				}

				if (!lem_shiftPressed) shiftTable = 0;
			}
		}

		// naik
		if (lem_lastPressed && shiftTable && lem_lastPressed > shiftTable) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (lem_lastPressed >= (i+1) && shiftTable <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					status[x] = tables.eq(i).attr("status");
					x++;
					isOn++;
				}
			}
		}

		// turun
		if (shiftTable > lem_lastPressed) {
			if (lem_lastPressed >= 1) lem_lastPressed --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= lem_lastPressed && i < shiftTable) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					status[x] = tables.eq(i).attr("status");
					x++;
					isOn++;
				}
			}
		}

		let isOpen = status.filter(onlyUnique).includes('open')
		let isClose = status.filter(onlyUnique).includes('close')
		// console.log(status.filter(onlyUnique));
		// console.log("isOpen : "+ isOpen.toString());
		// console.log("isClose : "+ isClose.toString());
		// console.log("============================================");
		if (isOn == 0 || status.filter(onlyUnique).length == 0) {
			btnRelease.attr("disabled", true);
			btnCancel.attr("disabled", true);
			btnPrint.attr("disabled", true);
			btnExcel.attr("disabled", true);
			btnPdf.attr("disabled", true);

			lem_lastPressed = 0;
		}

		if (isOn == 1 && status.filter(onlyUnique).length == 1) {
			if (!status.includes('open')) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", false);
				btnPrint.attr("disabled", false);
				btnExcel.attr("disabled", false);
				btnPdf.attr("disabled", false);
			}
			if (status.includes('open')) {
				btnRelease.attr("disabled", false);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}	
		}

		if (isOn >= 2 || status.filter(onlyUnique).length >= 2) {
			if (isClose && !isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", false);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}

			if (!isClose && isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}

			if (isClose && isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}
		}
	}

	const selectSmsShpConfirmationListAbov = (arr) => {
		const btnRelease = $("#btn-release-sms-final-delivery-abov");
		const btnCancel = $("#btn-cancel-sms-final-delivery-abov");
		const btnPrint = $("#btn-print-sms-final-delivery-abov");
		const btnExcel = $("#btn-excel-sms-final-delivery-abov");
		const btnPdf = $("#btn-pdf-sms-final-delivery-abov");

		let tables = $('[id^="select-sms-final-delivery-abov-list"]');
		let isOn = 0;
		let shiftTable = 0;
		let status = [];

		let x = 0;
		for (let i = 0; i < tables.length; i++) {
			if (abov_selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				status[x] = tables.eq(i).attr("status");
				isOn++;
				x++;
				abov_lastPressed = (i+1);
			} else {
				if (abov_ctrlPressed && !abov_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							abov_lastPressed = (i+1);
							// status[x] = tables.eq(i).attr("status");
							// x++;
						}
					}

					if (tables.eq(i).attr("stg") == "true") {
						status[x] = tables.eq(i).attr("status");
						x++;
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!abov_ctrlPressed && !abov_shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							if (!status.includes(tables.eq(i).attr("status"))) {
								status[x] = tables.eq(i).attr("status");
								x++;
								isOn++;
							}
							abov_lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (abov_shiftPressed && !abov_ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						shiftTable = (i+1);
					}
				}

				if (!abov_shiftPressed) shiftTable = 0;
			}
		}

		// naik
		if (abov_lastPressed && shiftTable && abov_lastPressed > shiftTable) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (abov_lastPressed >= (i+1) && shiftTable <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					status[x] = tables.eq(i).attr("status");
					x++;
					isOn++;
				}
			}
		}

		// turun
		if (shiftTable > abov_lastPressed) {
			if (abov_lastPressed >= 1) abov_lastPressed --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= abov_lastPressed && i < shiftTable) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					status[x] = tables.eq(i).attr("status");
					x++;
					isOn++;
				}
			}
		}

		let isOpen = status.filter(onlyUnique).includes('open')
		let isClose = status.filter(onlyUnique).includes('close')
		// console.log(status.filter(onlyUnique));
		// console.log("isOpen : "+ isOpen.toString());
		// console.log("isClose : "+ isClose.toString());
		// console.log("============================================");
		if (isOn == 0 || status.filter(onlyUnique).length == 0) {
			btnRelease.attr("disabled", true);
			btnCancel.attr("disabled", true);
			btnPrint.attr("disabled", true);
			btnExcel.attr("disabled", true);
			btnPdf.attr("disabled", true);

			abov_lastPressed = 0;
		}

		if (isOn == 1 && status.filter(onlyUnique).length == 1) {
			if (!status.includes('open')) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", false);
				btnPrint.attr("disabled", false);
				btnExcel.attr("disabled", false);
				btnPdf.attr("disabled", false);
			}
			if (status.includes('open')) {
				btnRelease.attr("disabled", false);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}	
		}

		if (isOn >= 2 || status.filter(onlyUnique).length >= 2) {
			if (isClose && !isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", false);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}

			if (!isClose && isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}

			if (isClose && isOpen) {
				btnRelease.attr("disabled", true);
				btnCancel.attr("disabled", true);
				btnPrint.attr("disabled", true);
				btnExcel.attr("disabled", true);
				btnPdf.attr("disabled", true);
			}
		}
	}

	$(document).keydown(function(event){
		const tabLem = $("#nav-lem-tab").attr("aria-selected");
		const tabAbov = $("#nav-abov-tab").attr("aria-selected");

		if(event.which == "17" && tabLem == "true") lem_ctrlPressed = true;
		if(event.which == "17" && tabAbov == "true") abov_ctrlPressed = true;

		if(event.which == "16" && tabLem == "true") lem_shiftPressed = true;
		if(event.which == "16" && tabAbov == "true") abov_shiftPressed = true;

		if(lem_ctrlPressed && event.which == "65" && tabLem == "true") lem_selectAll = true;
		if(abov_ctrlPressed && event.which == "65" && tabAbov == "true") abov_selectAll = true;

		if (tabLem == "true" && event.keyCode == 65 && event.ctrlKey && lem_selectAll && $("#row-index-lem-1").attr("flag") == "true") {
			textSelection('datatable-sms-final-delivery-lem');
			event.preventDefault();
			selectSmsShpConfiramtionListLem();
		}

		if (tabAbov == "true" && event.keyCode == 65 && event.ctrlKey && abov_selectAll && $("#row-index-abov-1").attr("flag") == "true") {
			textSelection('datatable-sms-final-delivery-abov');
			event.preventDefault();
			selectSmsShpConfirmationListAbov();
		}
	});

	$(document).keyup(function(){
		const tabLem = $("#nav-lem-tab").attr("aria-selected");
		const tabAbov = $("#nav-abov-tab").attr("aria-selected");

		if (tabLem == "true") {
			lem_ctrlPressed = false;
			lem_shiftPressed = false;
			lem_selectAll = false;
		}

		if (tabAbov == "true") {
			abov_ctrlPressed = false;
			abov_shiftPressed = false;
			abov_selectAll = false;
		}	
	});

	$(document).on('click', '[id^="select-sms-final-delivery-lem-list"]', function () {
		const myData = $(this);

		selectSmsShpConfiramtionListLem(myData);
	});

	$(document).on('click', '[id^="select-sms-final-delivery-abov-list"]', function () {
		const myData = $(this);

		selectSmsShpConfirmationListAbov(myData);
	});

	$(document).ready(function () {

		$(".air-badge").html(loadingBackdrop());

		const url = baseUrl("/auth/api/v23/info-sms-final-delivery");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc_lem = [];
				let sc_abov = [];

				let y = 0;
				let df = 0;
				let z = 0;
				let gf = 0;
				for (let i = 0; i < obj.result.length; i++) {
					lem_autocompleteRows['label'][i] = {value: obj.result[i].consignee, label: obj.result[i].consignee, data: obj.result[i].sms_number};
					lem_autocompleteRows['data'][obj.result[i].sms_number] = obj.result[i];

					abov_autocompleteRows['label'][i] = {value: obj.result[i].consignee, label: obj.result[i].consignee, data: obj.result[i].sms_number};
					abov_autocompleteRows['data'][obj.result[i].sms_number] = obj.result[i];
					for (let x = 0; x < obj.result[i]['category'].length; x++) {
						if (obj.result[i].type == "LEM") {
							sc_lem[y] = {
								"No": (df+1),
								"Doc Number": obj.result[i].sms_number,
								"Delivery Plan Date": obj.result[i].delivery_plan_date,
								"PO Number": obj.result[i].po_number,
								"Consignee": obj.result[i].consignee,
								"address": obj.result[i].address,
								"Package": obj.result[i]['category'][x]['cat_package'],
								"Device": obj.result[i]['category'][x]['cat_device'],
								"Quantity": obj.result[i]['category'][x]['cat_quantity'],
								"HS Code": obj.result[i]['category'][x]['cat_hs_code'],
								"Flight": obj.result[i].flight,
								"Plan Pickup": obj.result[i].plan_pickup,
								"data": obj.result[i].sms_number,
								"clr": (obj.result[i].act_proc_step == "Shipment Confirmation" && obj.result[i].next_proc_step == "Final Delivery" ? "table-warning" : ""),
								"status": (obj.result[i].act_proc_step == "Shipment Confirmation" && obj.result[i].next_proc_step == "Final Delivery" ? "open" : "close"),
							};
							y++;
						}

						if (obj.result[i].type == "ABOV") {
							sc_abov[z] = {
								"No": (gf+1),
								"Doc Number": obj.result[i].sms_number,
								"Delivery Plan Date": obj.result[i].delivery_plan_date,
								"PO Number": obj.result[i].po_number,
								"Consignee": obj.result[i].consignee,
								"address": obj.result[i].address,
								"Package": obj.result[i]['category'][x]['cat_package'],
								"Device": obj.result[i]['category'][x]['cat_device'],
								"Quantity": obj.result[i]['category'][x]['cat_quantity'],
								"HS Code": obj.result[i]['category'][x]['cat_hs_code'],
								"Flight": obj.result[i].flight,
								"Plan Pickup": obj.result[i].plan_pickup,
								"data": obj.result[i].sms_number,
								"clr": (obj.result[i].act_proc_step == "Shipment Confirmation" && obj.result[i].next_proc_step == "Final Delivery" ? "table-warning" : ""),
								"status": (obj.result[i].act_proc_step == "Shipment Confirmation" && obj.result[i].next_proc_step == "Final Delivery" ? "open" : "close"),
							};
							z++;
						}
					}
					if (obj.result[i].type == "LEM") df++;
					if (obj.result[i].type == "ABOV") gf++;
				}

				lem_dataTableIndex.rows().remove();
				lem_dataTableIndex.rows.add(sc_lem).draw();

				abov_dataTableIndex.rows().remove();
				abov_dataTableIndex.rows.add(sc_abov).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#sms-si-lem-edit-incoterm").select2({
		dropdownParent: $('#select2-sms-si-lem-edit-incoterm')
	});

	$("#sms-si-abov-edit-incoterm").select2({
		dropdownParent: $('#select2-sms-si-abov-edit-incoterm')
	});

	$("#btn-back-to-index-lem-1").click(function () {
		const rowIndex1 = $("#row-index-lem-1");
		const rowIndex2 = $("#row-index-lem-2");

		rowIndex1.removeClass("d-none");
		rowIndex1.attr("flag", "true");

		rowIndex2.addClass("d-none");
		rowIndex2.attr("flag", "false");
	});

	$("#btn-back-to-index-abov-1").click(function () {
		const rowIndex1 = $("#row-index-abov-1");
		const rowIndex2 = $("#row-index-abov-2");

		rowIndex1.removeClass("d-none");
		rowIndex1.attr("flag", "true");

		rowIndex2.addClass("d-none");
		rowIndex2.attr("flag", "false");
	});

	$("#btn-release-sms-final-delivery-lem").click(function () {
		const rowIndex1 = $("#row-index-lem-1");
		const rowIndex2 = $("#row-index-lem-2");

		const btnTarget = $("#btn-sms-si-final-delivery-lem-release");

		const smsSiEditPoNumber = $("#sms-si-lem-edit-po-number");
		const smsSiEditCoo = $("#sms-si-lem-edit-coo");
		const smsSiEditCustName = $("#sms-si-lem-edit-cust-name");
		const smsSiEditDelPlanDate = $("#sms-si-lem-edit-delivery-plan-date");
		const smsSiEditConsignee = $("#sms-si-lem-edit-consignee");
		const smsSiEditAddress = $("#sms-si-lem-edit-address");
		const smsSiEditEoriNo = $("#sms-si-lem-edit-eori-no");
		const smsSiEditAttention = $("#sms-si-lem-edit-attention");
		const smsSiEditEmail = $("#sms-si-lem-edit-email");
		const smsSiEditContactNumber = $("#sms-si-lem-edit-contact-number");
		const smsSiEditForwarder = $("#sms-si-lem-edit-forwarder");
		const smsSiEditAccountNumber = $("#sms-si-lem-edit-account-number");
		const smsSiEditRemark = $("#sms-si-lem-edit-remark");

		const smsSiEditFlight = $("#sms-si-lem-edit-flight");
		const smsSiEditPlanPickup = $("#sms-si-lem-edit-plan-pickup");
		const smsSiEditNettWeight = $("#sms-si-lem-edit-nett-weight");
		const smsSiEditGrossWeight = $("#sms-si-lem-edit-gross-weight");
		const smsSiEditTotalCarton = $("#sms-si-lem-edit-total-carton");
		const smsSiEditCartonDimension = $("#sms-si-lem-edit-carton-dimension");

		const smsSiEditNameFlight = $("#sms-si-lem-edit-name-flight");
		const smsSiEditMawb = $("#sms-si-lem-edit-mawb");
		const smsSiEditHawb = $("#sms-si-lem-edit-hawb");
		const smsSiEditIncoterm = $("#sms-si-lem-edit-incoterm");
		const smsSiEditExt = $("#sms-si-lem-edit-ext");

		const smsDesClone = $("#sms-si-lem-edit-clone-description");
		const smsSiEditDescriptionPackage = $('[id^="sms-si-lem-edit-description-package"]');
		const smsSiEditDescriptionDevice = $('[id^="sms-si-lem-edit-description-device"]');
		const smsSiEditDescriptionQuantity = $('[id^="sms-si-lem-edit-description-quantity"]');
		const smsSiEditDescriptionHsCode = $('[id^="sms-si-lem-edit-description-hs-code"]');

		let tables = $('[id^="select-sms-final-delivery-lem-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				x++;
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': JSON.stringify(id)
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v23/get-sms-booking-shp-instruction");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				// btnTarget.attr('data', obj.result['id']);
				btnTarget.attr('sms-desc', obj.result['info'][0]['cat_sms']);
				btnTarget.attr('sms-info', obj.result['info'][0]['sms_number']);

				smsSiEditPoNumber.val(obj.result['info'][0]['po_number']);
				smsSiEditCoo.val(obj.result['info'][0]['coo']);
				smsSiEditCustName.val(obj.result['info'][0]['customer_name']);
				smsSiEditDelPlanDate.val(obj.result['info'][0]['delivery_plan_date']);
				smsSiEditConsignee.val(obj.result['info'][0]['consignee']);
				smsSiEditAddress.val(obj.result['info'][0]['address']);
				smsSiEditEoriNo.val(obj.result['info'][0]['eori_no']);
				smsSiEditAttention.val(obj.result['info'][0]['attention']);
				smsSiEditEmail.val(obj.result['info'][0]['email']);
				smsSiEditContactNumber.val(obj.result['info'][0]['contact_number']);
				smsSiEditForwarder.val(obj.result['info'][0]['forwarder']);
				smsSiEditAccountNumber.val(obj.result['info'][0]['courir_number']);
				smsSiEditRemark.val(obj.result['info'][0]['remark']);

				smsSiEditFlight.val(obj.result['info'][0]['flight']);
				smsSiEditPlanPickup.val(obj.result['info'][0]['plan_pickup']);

				smsSiEditNettWeight.val(obj.result['info'][0]['nett_weight']);
				smsSiEditGrossWeight.val(obj.result['info'][0]['gross_weight']);
				smsSiEditTotalCarton.val(obj.result['info'][0]['total_carton']);
				smsSiEditCartonDimension.val(obj.result['info'][0]['carton_dimension']);

				smsSiEditNameFlight.val(obj.result['info'][0]['flight_name']);
				smsSiEditMawb.val(obj.result['info'][0]['mawb']);
				smsSiEditHawb.val(obj.result['info'][0]['hawb']);

				smsSiEditIncoterm.val(obj.result['info'][0]['incoterm']);
				smsSiEditExt.val(obj.result['info'][0]['extension']);

				smsSiEditIncoterm.select2({
					dropdownParent: $('#select2-sms-si-lem-edit-incoterm'),
				}).val(obj.result['info'][0]['incoterm']).trigger('change');

				smsDesClone.html('');
				for (var i = 0; i < obj.result['info'][0]['category'].length; i++) {

					let selectOption = '';

					for (var x = 0; x < obj.result['device'].length; x++) {
						selectOption += `<option value="${obj.result['device'][x]}"${(obj.result['device'][x] == obj.result['info'][0]['category'][i].cat_device ? " selected" : "")}>${obj.result['device'][x]}</option>`
					}

					let sc = `
						<div class="form-group row" number="${i+Date.now()}" id="sms-si-lem-edit-description-column">
				          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
				          <div class="col-sm-12 col-md-12 col-lg-10">
				            <div class="form-row">
				              <div class="col-lg-1">
				                <div class="form-group row">
				                  <div class="col-sm-12 col-md-12 col-lg-3">
				                    <div class="form-check mb-lg-0">
				                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-lem-edit-description-checked" number="${i+Date.now()}">
				                      <label class="form-check-label d-lg-none" for="sms-si-lem-edit-description-checked">Checked</label>
				                    </div>
				                  </div>
				                </div>
				              </div>
				              <div class="col-lg-11">
				                <div class="row">
				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-lem-edit-description-package" value="${obj.result['info'][0]['category'][i].cat_package}" placeholder="Package" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-lem-edit-description-package"></div>
				                      </div>
				                    </div>
				                  </div>

				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-device-${i+Date.now()}" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
				                      <select class="form-control" id="sms-si-lem-edit-description-device-${i+Date.now()}" title="Device" data-live-search="true" data-live-search-placeholder="Device" number="${i+Date.now()}">
				                        <option value="" disabled selected>Choose a Device</option>
				                        ${selectOption}
				                      </select>
				                      <div id="select2-sms-si-lem-edit-description-device-${i+Date.now()}" number="${i+Date.now()}"></div>
				                      <div class="invalid-feedback" id="msg-sms-si-lem-edit-description-device-${i+Date.now()}" number="${i+Date.now()}"></div>
				                    </div>
				                  </div>

				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-lem-edit-description-quantity" value="${obj.result['info'][0]['category'][i].cat_quantity}" placeholder="Quantity" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-lem-edit-description-quantity"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-lem-edit-description-invoice" value="${obj.result['info'][0]['category'][i].cat_invoice}" placeholder="Invoice" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-lem-edit-description-invoice"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-lem-edit-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-lem-edit-description-hs-code" value="${obj.result['info'][0]['category'][i].cat_hs_code}" placeholder="HS Code" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-lem-edit-description-hs-code"></div>
				                      </div>
				                    </div>
				                  </div>
				                </div>
				              </div>
				            </div>
				          </div>
				        </div>
					`;
					smsDesClone.append(sc);
				}

				deviceListTmp = obj.result['device'];

				let slect2 = $('select[id^="sms-si-lem-edit-description-device"]');
				let boxSlect2 = $('div[id^="select2-sms-si-lem-edit-description-device"]');
				for (var i = 0; i < slect2.length; i++) {
					if (slect2.eq(x).attr('aria-hidden') !== "true") {
						$("#"+slect2.eq(i).attr('id')).select2({
							dropdownParent: $("#"+boxSlect2.eq(i).attr('id'))
						});
					}
				}

				$(".air-badge").html('');
				rowIndex1.addClass("d-none");
				rowIndex1.attr("flag", "false");

				rowIndex2.removeClass("d-none");
				rowIndex2.attr("flag", "true");

			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
	
	$("#btn-sms-si-final-delivery-lem-release").click(function () {
		const btnTarget = $("#btn-sms-si-final-delivery-lem-release");

		const smsSiEditPoNumber = $("#sms-si-lem-edit-po-number");
		const smsSiEditCoo = $("#sms-si-lem-edit-coo");
		const smsSiEditCustName = $("#sms-si-lem-edit-cust-name");
		const smsSiEditDelPlanDate = $("#sms-si-lem-edit-delivery-plan-date");
		const smsSiEditConsignee = $("#sms-si-lem-edit-consignee");
		const smsSiEditAddress = $("#sms-si-lem-edit-address");
		const smsSiEditEoriNo = $("#sms-si-lem-edit-eori-no");
		const smsSiEditAttention = $("#sms-si-lem-edit-attention");
		const smsSiEditEmail = $("#sms-si-lem-edit-email");
		const smsSiEditContactNumber = $("#sms-si-lem-edit-contact-number");
		const smsSiEditForwarder = $("#sms-si-lem-edit-forwarder");

		const smsSiEditAccountNumber = $("#sms-si-lem-edit-account-number");
		const smsSiEditRemark = $("#sms-si-lem-edit-remark");

		const smsSiEditFlight = $("#sms-si-lem-edit-flight");
		const smsSiEditPlanPickup = $("#sms-si-lem-edit-plan-pickup");
		const smsSiEditNettWeight = $("#sms-si-lem-edit-nett-weight");
		const smsSiEditGrossWeight = $("#sms-si-lem-edit-gross-weight");
		const smsSiEditTotalCarton = $("#sms-si-lem-edit-total-carton");
		const smsSiEditCartonDimension = $("#sms-si-lem-edit-carton-dimension");

		const smsSiEditNameFlight = $("#sms-si-lem-edit-name-flight");
		const smsSiEditMawb = $("#sms-si-lem-edit-mawb");
		const smsSiEditHawb = $("#sms-si-lem-edit-hawb");

		const smsSiEditIncoterm = $("#sms-si-lem-edit-incoterm");
		const smsSiEditExt = $("#sms-si-lem-edit-ext");

		const smsDesClone = $("#sms-si-lem-edit-clone-description");
		const smsSiEditDescriptionPackage = $('[id^="sms-si-lem-edit-description-package"]');
		const smsSiEditDescriptionDevice = $('[id^="sms-si-lem-edit-description-device"]');
		const smsSiEditDescriptionQuantity = $('[id^="sms-si-lem-edit-description-quantity"]');
		const smsSiEditDescriptionInvoice = $('[id^="sms-si-lem-edit-description-invoice"]');
		const smsSiEditDescriptionHsCode = $('[id^="sms-si-lem-edit-description-hs-code"]');

		let allow = true;

		if (!inputValidation("#"+smsSiEditAddress.attr("id"), "#msg-"+smsSiEditAddress.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditEoriNo.attr("id"), "#msg-"+smsSiEditEoriNo.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditAttention.attr("id"), "#msg-"+smsSiEditAttention.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditEmail.attr("id"), "#msg-"+smsSiEditEmail.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditContactNumber.attr("id"), "#msg-"+smsSiEditContactNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditForwarder.attr("id"), "#msg-"+smsSiEditForwarder.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditAccountNumber.attr("id"), "#msg-"+smsSiEditAccountNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditRemark.attr("id"), "#msg-"+smsSiEditRemark.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditFlight.attr("id"), "#msg-"+smsSiEditFlight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditPlanPickup.attr("id"), "#msg-"+smsSiEditPlanPickup.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditNettWeight.attr("id"), "#msg-"+smsSiEditNettWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditGrossWeight.attr("id"), "#msg-"+smsSiEditGrossWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditTotalCarton.attr("id"), "#msg-"+smsSiEditTotalCarton.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditCartonDimension.attr("id"), "#msg-"+smsSiEditCartonDimension.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditNameFlight.attr("id"), "#msg-"+smsSiEditNameFlight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditMawb.attr("id"), "#msg-"+smsSiEditMawb.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditHawb.attr("id"), "#msg-"+smsSiEditHawb.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditIncoterm.attr("id"), "#msg-"+smsSiEditIncoterm.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditExt.attr("id"), "#msg-"+smsSiEditExt.attr("id"))) allow = false;

		for (let i = 0; i < smsSiEditDescriptionPackage.length; i++) {
			if (!inputValidation("input[id$='"+smsSiEditDescriptionPackage.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionPackage.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionPackage.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionPackage.eq(i).attr('number')+"']")) allow = false;
			if (!select2Validation("select[id$='"+smsSiEditDescriptionDevice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionDevice.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionDevice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionDevice.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiEditDescriptionQuantity.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionQuantity.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionQuantity.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionQuantity.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiEditDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionInvoice.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionInvoice.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiEditDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionHsCode.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionHsCode.eq(i).attr('number')+"']")) allow = false;
		}

		if (!allow) return false;
	    $(".air-badge").html(loadingBackdrop());

	    const params = {};
	    params[0] = {
	      "address" : smsSiEditAddress.val(),
	      "eorino" : smsSiEditEoriNo.val(),
	      "attention" : smsSiEditAttention.val(),
	      "email" : smsSiEditEmail.val(),
	      "contact-number" : smsSiEditContactNumber.val(),
	      "forwarder" : smsSiEditForwarder.val(),
	      "account-number" : smsSiEditAccountNumber.val(),
	      "remark" : smsSiEditRemark.val(),
	      "flight" : smsSiEditFlight.val(),
	      "plan-pickup" : smsSiEditPlanPickup.val(),
	      "nett-weight" : smsSiEditNettWeight.val(),
	      "gross-weight" : smsSiEditGrossWeight.val(),
	      "total-carton" : smsSiEditTotalCarton.val(),
	      "carton-dimension" : smsSiEditCartonDimension.val(),
	      "name-flight" : smsSiEditNameFlight.val(),
	      "mawb" : smsSiEditMawb.val(),
	      "hawb" : smsSiEditHawb.val(),
	      "incoterm" : smsSiEditIncoterm.val(),
	      "extension" : smsSiEditExt.val(),
	      "cat-sms" : [],

	      "release-target-desc" : btnTarget.attr('sms-desc'),
	      "release-target-info" : btnTarget.attr('sms-info'),
	    };

	    for (let i = 0; i < smsSiEditDescriptionPackage.length; i++) {
			params[0]['cat-sms'].push({
				"package": smsSiEditDescriptionPackage.eq(i).val(),
				"device": smsSiEditDescriptionDevice.eq(i).val(),
				"quantity": smsSiEditDescriptionQuantity.eq(i).val(),
				"invoice": smsSiEditDescriptionInvoice.eq(i).val(),
				"hs-code": smsSiEditDescriptionHsCode.eq(i).val(),
			});
		}

		const url = baseUrl("/auth/api/v23/release-sms-final-delivery");

	    const execute = postField(url, 'POST', {'data' : JSON.stringify(params)}, false);

	    execute.done(function(result) {
	      let obj = JSON.parse(JSON.stringify(result));

	      if (obj.code == 200) {
	        $(".air-badge").html(airBadge(obj.msg , 'success'));
	        setTimeout(function() {
	          window.location = window.location.href;
	        }, 5000);
	      } else {
	        $(".air-badge").html(airBadge(obj.msg , 'danger'));
	      }
	    });

	    execute.fail(function() {
	      $(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
	    });
	})

	$("#turn-colomn-sms-si-release-description-lem").click(function() {
		let clone = $("#sms-si-lem-edit-clone-description");
		let totalClone = $('[id^="sms-si-lem-edit-description-column"]');

		let sc = `
			<div class="form-group row" number="${totalClone.length+Date.now()}" id="sms-si-lem-edit-description-column">
	          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
	          <div class="col-sm-12 col-md-12 col-lg-10">
	            <div class="form-row">
	              <div class="col-lg-1">
	                <div class="form-group row">
	                  <div class="col-sm-12 col-md-12 col-lg-3">
	                    <div class="form-check mb-lg-0">
	                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-lem-edit-description-checked" number="${totalClone.length+Date.now()}">
	                      <label class="form-check-label d-lg-none" for="sms-si-lem-edit-description-checked">Checked</label>
	                    </div>
	                  </div>
	                </div>
	              </div>
	              <div class="col-lg-11">
	                <div class="row">
	                  <div class="col-lg-3">
	                    <div class="form-group row">
	                      <label for="sms-si-lem-edit-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-lem-edit-description-package" placeholder="Package" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-lem-edit-description-package"></div>
	                      </div>
	                    </div>
	                  </div>

	                  <div class="col-lg-3">
	                    <div class="form-group row">
	                      <label for="sms-si-lem-edit-description-device-${totalClone.length+Date.now()}" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
	                      <select class="form-control" id="sms-si-lem-edit-description-device-${totalClone.length+Date.now()}" title="Device" data-live-search="true" data-live-search-placeholder="Device" number="${totalClone.length+Date.now()}">
	                        <option value="" disabled selected>Choose a Device</option>
	                      </select>
	                      <div id="select2-sms-si-lem-edit-description-device-${totalClone.length+Date.now()}" number="${totalClone.length+Date.now()}"></div>
	                      <div class="invalid-feedback" id="msg-sms-si-lem-edit-description-device-${totalClone.length+Date.now()}" number="${totalClone.length+Date.now()}"></div>
	                    </div>
	                  </div>

	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-lem-edit-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-lem-edit-description-quantity" placeholder="Quantity" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-lem-edit-description-quantity"></div>
	                      </div>
	                    </div>
	                  </div>
	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-lem-edit-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-lem-edit-description-invoice" placeholder="Invoice" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-lem-edit-description-invoice"></div>
	                      </div>
	                    </div>
	                  </div>
	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-lem-edit-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-lem-edit-description-hs-code" placeholder="HS Code" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-lem-edit-description-hs-code"></div>
	                      </div>
	                    </div>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
		`;
		clone.append(sc);

		let slect2 = $('select[id^="sms-si-lem-edit-description-device"]');
		let boxSlect2 = $('div[id^="select2-sms-si-lem-edit-description-device"]');

		for (var x = 0; x < slect2.length; x++) {
			if (slect2.eq(x).attr('aria-hidden') !== "true") {
				if (deviceListTmp !== false) {
					for (var i = 0; i < deviceListTmp.length; i++) {
						slect2.eq(x).append(new Option(deviceListTmp[i], deviceListTmp[i]));
					}
				}
			}
		}

		for (var i = 0; i < slect2.length; i++) {
			if (slect2.eq(x).attr('aria-hidden') !== "true") {
				$("#"+slect2.eq(i).attr('id')).select2({
					dropdownParent: $("#"+boxSlect2.eq(i).attr('id'))
				});
			}
		}
	});

	$("#burn-colomn-sms-si-release-description-lem").click(function () {
		const dv = $('[id^="sms-si-lem-edit-description-column"]');
		const checkbox = $('[id^="sms-si-lem-edit-description-checked"]');

		let number = false;

		for (let i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				number = checkbox.eq(i).attr('number');
				dv.eq(i).remove();
			} else {
				checkbox.eq(i).attr("number", i);
				dv.eq(i).attr("number", i);
			}
		}

		if (!number) {
			$(".air-badge").html(airBadge("Please check the box", 'danger'));
		}
	});

	$("#btn-cancel-sms-final-delivery-lem").click(function () {
		const modal = $("#modal-cancel-sms-si-final-delivery-lem");
		const label = $(".info-cancel-sms-si-final-delivery-lem");
		const btn = $("#btn-save-cancel-sms-si-final-delivery-lem");

		let tables = $('[id^="select-sms-final-delivery-lem-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(1).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	})

	$("#btn-save-cancel-sms-si-final-delivery-lem").click(function () {
		const btn = $("#btn-save-cancel-sms-si-final-delivery-lem");
		const txt = btn.attr("data");

		$("#modal-cancel-sms-si-final-delivery-lem").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v23/cancel-sms-final-delivery");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});

	$("#btn-print-sms-final-delivery-lem").click(function () {

		let tables = $('[id^="select-sms-final-delivery-lem-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "LEM",
			'type': "print",
		};

		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-excel-sms-final-delivery-lem").click(function () {

		let tables = $('[id^="select-sms-final-delivery-lem-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "LEM",
			'type': "excel",
		};
		
		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-pdf-sms-final-delivery-lem").click(function () {

		let tables = $('[id^="select-sms-final-delivery-lem-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "LEM",
			'type': "pdf",
		};
		
		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-release-sms-final-delivery-abov").click(function () {
		const rowIndex1 = $("#row-index-abov-1");
		const rowIndex2 = $("#row-index-abov-2");

		const btnTarget = $("#btn-sms-si-final-delivery-abov-release");

		const smsSiEditPoNumber = $("#sms-si-abov-edit-po-number");
		const smsSiEditCoo = $("#sms-si-abov-edit-coo");
		const smsSiEditCustName = $("#sms-si-abov-edit-cust-name");
		const smsSiEditDelPlanDate = $("#sms-si-abov-edit-delivery-plan-date");
		const smsSiEditConsignee = $("#sms-si-abov-edit-consignee");
		const smsSiEditAddress = $("#sms-si-abov-edit-address");
		const smsSiEditEoriNo = $("#sms-si-abov-edit-eori-no");
		const smsSiEditAttention = $("#sms-si-abov-edit-attention");
		const smsSiEditEmail = $("#sms-si-abov-edit-email");
		const smsSiEditContactNumber = $("#sms-si-abov-edit-contact-number");
		const smsSiEditForwarder = $("#sms-si-abov-edit-forwarder");
		const smsSiEditAccountNumber = $("#sms-si-abov-edit-account-number");
		const smsSiEditRemark = $("#sms-si-abov-edit-remark");

		const smsSiEditFlight = $("#sms-si-abov-edit-flight");
		const smsSiEditPlanPickup = $("#sms-si-abov-edit-plan-pickup");
		const smsSiEditNettWeight = $("#sms-si-abov-edit-nett-weight");
		const smsSiEditGrossWeight = $("#sms-si-abov-edit-gross-weight");
		const smsSiEditTotalCarton = $("#sms-si-abov-edit-total-carton");
		const smsSiEditCartonDimension = $("#sms-si-abov-edit-carton-dimension");

		const smsSiEditNameFlight = $("#sms-si-abov-edit-name-flight");
		const smsSiEditMawb = $("#sms-si-abov-edit-mawb");
		const smsSiEditHawb = $("#sms-si-abov-edit-hawb");
		const smsSiEditIncoterm = $("#sms-si-abov-edit-incoterm");
		const smsSiEditExt = $("#sms-si-abov-edit-ext");

		const smsDesClone = $("#sms-si-abov-edit-clone-description");
		const smsSiEditDescriptionPackage = $('[id^="sms-si-abov-edit-description-package"]');
		const smsSiEditDescriptionDevice = $('[id^="sms-si-abov-edit-description-device"]');
		const smsSiEditDescriptionQuantity = $('[id^="sms-si-abov-edit-description-quantity"]');
		const smsSiEditDescriptionHsCode = $('[id^="sms-si-abov-edit-description-hs-code"]');

		let tables = $('[id^="select-sms-final-delivery-abov-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				x++;
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': JSON.stringify(id)
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v23/get-sms-booking-shp-instruction");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				// btnTarget.attr('data', obj.result['id']);
				btnTarget.attr('sms-desc', obj.result['info'][0]['cat_sms']);
				btnTarget.attr('sms-info', obj.result['info'][0]['sms_number']);

				smsSiEditPoNumber.val(obj.result['info'][0]['po_number']);
				smsSiEditCoo.val(obj.result['info'][0]['coo']);
				smsSiEditCustName.val(obj.result['info'][0]['customer_name']);
				smsSiEditDelPlanDate.val(obj.result['info'][0]['delivery_plan_date']);
				smsSiEditConsignee.val(obj.result['info'][0]['consignee']);
				smsSiEditAddress.val(obj.result['info'][0]['address']);
				smsSiEditEoriNo.val(obj.result['info'][0]['eori_no']);
				smsSiEditAttention.val(obj.result['info'][0]['attention']);
				smsSiEditEmail.val(obj.result['info'][0]['email']);
				smsSiEditContactNumber.val(obj.result['info'][0]['contact_number']);
				smsSiEditForwarder.val(obj.result['info'][0]['forwarder']);
				smsSiEditAccountNumber.val(obj.result['info'][0]['courir_number']);
				smsSiEditRemark.val(obj.result['info'][0]['remark']);

				smsSiEditFlight.val(obj.result['info'][0]['flight']);
				smsSiEditPlanPickup.val(obj.result['info'][0]['plan_pickup']);

				smsSiEditNettWeight.val(obj.result['info'][0]['nett_weight']);
				smsSiEditGrossWeight.val(obj.result['info'][0]['gross_weight']);
				smsSiEditTotalCarton.val(obj.result['info'][0]['total_carton']);
				smsSiEditCartonDimension.val(obj.result['info'][0]['carton_dimension']);

				smsSiEditNameFlight.val(obj.result['info'][0]['flight_name']);
				smsSiEditMawb.val(obj.result['info'][0]['mawb']);
				smsSiEditHawb.val(obj.result['info'][0]['hawb']);

				smsSiEditIncoterm.val(obj.result['info'][0]['incoterm']);
				smsSiEditExt.val(obj.result['info'][0]['extension']);

				smsSiEditIncoterm.select2({
					dropdownParent: $('#select2-sms-si-abov-edit-incoterm'),
				}).val(obj.result['info'][0]['incoterm']).trigger('change');

				smsDesClone.html('');
				for (var i = 0; i < obj.result['info'][0]['category'].length; i++) {

					let selectOption = '';

					for (var x = 0; x < obj.result['device'].length; x++) {
						selectOption += `<option value="${obj.result['device'][x]}"${(obj.result['device'][x] == obj.result['info'][0]['category'][i].cat_device ? " selected" : "")}>${obj.result['device'][x]}</option>`
					}

					let sc = `
						<div class="form-group row" number="${i+Date.now()}" id="sms-si-abov-edit-description-column">
				          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
				          <div class="col-sm-12 col-md-12 col-lg-10">
				            <div class="form-row">
				              <div class="col-lg-1">
				                <div class="form-group row">
				                  <div class="col-sm-12 col-md-12 col-lg-3">
				                    <div class="form-check mb-lg-0">
				                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-abov-edit-description-checked" number="${i+Date.now()}">
				                      <label class="form-check-label d-lg-none" for="sms-si-abov-edit-description-checked">Checked</label>
				                    </div>
				                  </div>
				                </div>
				              </div>
				              <div class="col-lg-11">
				                <div class="row">
				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-abov-edit-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-abov-edit-description-package" value="${obj.result['info'][0]['category'][i].cat_package}" placeholder="Package" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-abov-edit-description-package"></div>
				                      </div>
				                    </div>
				                  </div>

				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-abov-edit-description-device-${i+Date.now()}" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
				                      <select class="form-control" id="sms-si-abov-edit-description-device-${i+Date.now()}" title="Device" data-live-search="true" data-live-search-placeholder="Device" number="${i+Date.now()}">
				                        <option value="" disabled selected>Choose a Device</option>
				                        ${selectOption}
				                      </select>
				                      <div id="select2-sms-si-abov-edit-description-device-${i+Date.now()}" number="${i+Date.now()}"></div>
				                      <div class="invalid-feedback" id="msg-sms-si-abov-edit-description-device-${i+Date.now()}" number="${i+Date.now()}"></div>
				                    </div>
				                  </div>

				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-abov-edit-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-abov-edit-description-quantity" value="${obj.result['info'][0]['category'][i].cat_quantity}" placeholder="Quantity" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-abov-edit-description-quantity"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-abov-edit-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-abov-edit-description-invoice" value="${obj.result['info'][0]['category'][i].cat_invoice}" placeholder="Invoice" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-abov-edit-description-invoice"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-abov-edit-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-abov-edit-description-hs-code" value="${obj.result['info'][0]['category'][i].cat_hs_code}" placeholder="HS Code" number="${i+Date.now()}">
				                        <div class="invalid-feedback" number="${i+Date.now()}" id="msg-sms-si-abov-edit-description-hs-code"></div>
				                      </div>
				                    </div>
				                  </div>
				                </div>
				              </div>
				            </div>
				          </div>
				        </div>
					`;
					smsDesClone.append(sc);
				}

				deviceListTmp = obj.result['device'];

				let slect2 = $('select[id^="sms-si-abov-edit-description-device"]');
				let boxSlect2 = $('div[id^="select2-sms-si-abov-edit-description-device"]');
				for (var i = 0; i < slect2.length; i++) {
					if (slect2.eq(x).attr('aria-hidden') !== "true") {
						$("#"+slect2.eq(i).attr('id')).select2({
							dropdownParent: $("#"+boxSlect2.eq(i).attr('id'))
						});
					}
				}

				$(".air-badge").html('');
				rowIndex1.addClass("d-none");
				rowIndex1.attr("flag", "false");

				rowIndex2.removeClass("d-none");
				rowIndex2.attr("flag", "true");

			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
	
	$("#btn-sms-si-final-delivery-abov-release").click(function () {
		const btnTarget = $("#btn-sms-si-final-delivery-abov-release");

		const smsSiEditPoNumber = $("#sms-si-abov-edit-po-number");
		const smsSiEditCoo = $("#sms-si-abov-edit-coo");
		const smsSiEditCustName = $("#sms-si-abov-edit-cust-name");
		const smsSiEditDelPlanDate = $("#sms-si-abov-edit-delivery-plan-date");
		const smsSiEditConsignee = $("#sms-si-abov-edit-consignee");
		const smsSiEditAddress = $("#sms-si-abov-edit-address");
		const smsSiEditEoriNo = $("#sms-si-abov-edit-eori-no");
		const smsSiEditAttention = $("#sms-si-abov-edit-attention");
		const smsSiEditEmail = $("#sms-si-abov-edit-email");
		const smsSiEditContactNumber = $("#sms-si-abov-edit-contact-number");
		const smsSiEditForwarder = $("#sms-si-abov-edit-forwarder");

		const smsSiEditAccountNumber = $("#sms-si-abov-edit-account-number");
		const smsSiEditRemark = $("#sms-si-abov-edit-remark");

		const smsSiEditFlight = $("#sms-si-abov-edit-flight");
		const smsSiEditPlanPickup = $("#sms-si-abov-edit-plan-pickup");
		const smsSiEditNettWeight = $("#sms-si-abov-edit-nett-weight");
		const smsSiEditGrossWeight = $("#sms-si-abov-edit-gross-weight");
		const smsSiEditTotalCarton = $("#sms-si-abov-edit-total-carton");
		const smsSiEditCartonDimension = $("#sms-si-abov-edit-carton-dimension");

		const smsSiEditNameFlight = $("#sms-si-abov-edit-name-flight");
		const smsSiEditMawb = $("#sms-si-abov-edit-mawb");
		const smsSiEditHawb = $("#sms-si-abov-edit-hawb");

		const smsSiEditIncoterm = $("#sms-si-abov-edit-incoterm");
		const smsSiEditExt = $("#sms-si-abov-edit-ext");

		const smsDesClone = $("#sms-si-abov-edit-clone-description");
		const smsSiEditDescriptionPackage = $('[id^="sms-si-abov-edit-description-package"]');
		const smsSiEditDescriptionDevice = $('[id^="sms-si-abov-edit-description-device"]');
		const smsSiEditDescriptionQuantity = $('[id^="sms-si-abov-edit-description-quantity"]');
		const smsSiEditDescriptionInvoice = $('[id^="sms-si-abov-edit-description-invoice"]');
		const smsSiEditDescriptionHsCode = $('[id^="sms-si-abov-edit-description-hs-code"]');

		let allow = true;

		if (!inputValidation("#"+smsSiEditAddress.attr("id"), "#msg-"+smsSiEditAddress.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditEoriNo.attr("id"), "#msg-"+smsSiEditEoriNo.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditAttention.attr("id"), "#msg-"+smsSiEditAttention.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditEmail.attr("id"), "#msg-"+smsSiEditEmail.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditContactNumber.attr("id"), "#msg-"+smsSiEditContactNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditForwarder.attr("id"), "#msg-"+smsSiEditForwarder.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditAccountNumber.attr("id"), "#msg-"+smsSiEditAccountNumber.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditRemark.attr("id"), "#msg-"+smsSiEditRemark.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditFlight.attr("id"), "#msg-"+smsSiEditFlight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditPlanPickup.attr("id"), "#msg-"+smsSiEditPlanPickup.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditNettWeight.attr("id"), "#msg-"+smsSiEditNettWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditGrossWeight.attr("id"), "#msg-"+smsSiEditGrossWeight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditTotalCarton.attr("id"), "#msg-"+smsSiEditTotalCarton.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditCartonDimension.attr("id"), "#msg-"+smsSiEditCartonDimension.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditNameFlight.attr("id"), "#msg-"+smsSiEditNameFlight.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditMawb.attr("id"), "#msg-"+smsSiEditMawb.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditHawb.attr("id"), "#msg-"+smsSiEditHawb.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditIncoterm.attr("id"), "#msg-"+smsSiEditIncoterm.attr("id"))) allow = false;
		if (!inputValidation("#"+smsSiEditExt.attr("id"), "#msg-"+smsSiEditExt.attr("id"))) allow = false;

		for (let i = 0; i < smsSiEditDescriptionPackage.length; i++) {
			if (!inputValidation("input[id$='"+smsSiEditDescriptionPackage.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionPackage.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionPackage.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionPackage.eq(i).attr('number')+"']")) allow = false;
			if (!select2Validation("select[id$='"+smsSiEditDescriptionDevice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionDevice.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionDevice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionDevice.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiEditDescriptionQuantity.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionQuantity.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionQuantity.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionQuantity.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiEditDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionInvoice.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionInvoice.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionInvoice.eq(i).attr('number')+"']")) allow = false;
			if (!inputValidation("input[id$='"+smsSiEditDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionHsCode.eq(i).attr('number')+"']", "div[id$='msg-"+smsSiEditDescriptionHsCode.eq(i).attr('id')+"'][number='"+smsSiEditDescriptionHsCode.eq(i).attr('number')+"']")) allow = false;
		}

		if (!allow) return false;
	    $(".air-badge").html(loadingBackdrop());

	    const params = {};
	    params[0] = {
	      "address" : smsSiEditAddress.val(),
	      "eorino" : smsSiEditEoriNo.val(),
	      "attention" : smsSiEditAttention.val(),
	      "email" : smsSiEditEmail.val(),
	      "contact-number" : smsSiEditContactNumber.val(),
	      "forwarder" : smsSiEditForwarder.val(),
	      "account-number" : smsSiEditAccountNumber.val(),
	      "remark" : smsSiEditRemark.val(),
	      "flight" : smsSiEditFlight.val(),
	      "plan-pickup" : smsSiEditPlanPickup.val(),
	      "nett-weight" : smsSiEditNettWeight.val(),
	      "gross-weight" : smsSiEditGrossWeight.val(),
	      "total-carton" : smsSiEditTotalCarton.val(),
	      "carton-dimension" : smsSiEditCartonDimension.val(),
	      "name-flight" : smsSiEditNameFlight.val(),
	      "mawb" : smsSiEditMawb.val(),
	      "hawb" : smsSiEditHawb.val(),
	      "incoterm" : smsSiEditIncoterm.val(),
	      "extension" : smsSiEditExt.val(),
	      "cat-sms" : [],

	      "release-target-desc" : btnTarget.attr('sms-desc'),
	      "release-target-info" : btnTarget.attr('sms-info'),
	    };

	    for (let i = 0; i < smsSiEditDescriptionPackage.length; i++) {
			params[0]['cat-sms'].push({
				"package": smsSiEditDescriptionPackage.eq(i).val(),
				"device": smsSiEditDescriptionDevice.eq(i).val(),
				"quantity": smsSiEditDescriptionQuantity.eq(i).val(),
				"invoice": smsSiEditDescriptionInvoice.eq(i).val(),
				"hs-code": smsSiEditDescriptionHsCode.eq(i).val(),
			});
		}

		const url = baseUrl("/auth/api/v23/release-sms-final-delivery");

	    const execute = postField(url, 'POST', {'data' : JSON.stringify(params)}, false);

	    execute.done(function(result) {
	      let obj = JSON.parse(JSON.stringify(result));

	      if (obj.code == 200) {
	        $(".air-badge").html(airBadge(obj.msg , 'success'));
	        setTimeout(function() {
	          window.location = window.location.href;
	        }, 5000);
	      } else {
	        $(".air-badge").html(airBadge(obj.msg , 'danger'));
	      }
	    });

	    execute.fail(function() {
	      $(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
	    });
	})

	$("#turn-colomn-sms-si-release-description-abov").click(function() {
		let clone = $("#sms-si-abov-edit-clone-description");
		let totalClone = $('[id^="sms-si-abov-edit-description-column"]');

		let sc = `
			<div class="form-group row" number="${totalClone.length+Date.now()}" id="sms-si-abov-edit-description-column">
	          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
	          <div class="col-sm-12 col-md-12 col-lg-10">
	            <div class="form-row">
	              <div class="col-lg-1">
	                <div class="form-group row">
	                  <div class="col-sm-12 col-md-12 col-lg-3">
	                    <div class="form-check mb-lg-0">
	                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-abov-edit-description-checked" number="${totalClone.length+Date.now()}">
	                      <label class="form-check-label d-lg-none" for="sms-si-abov-edit-description-checked">Checked</label>
	                    </div>
	                  </div>
	                </div>
	              </div>
	              <div class="col-lg-11">
	                <div class="row">
	                  <div class="col-lg-3">
	                    <div class="form-group row">
	                      <label for="sms-si-abov-edit-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-abov-edit-description-package" placeholder="Package" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-abov-edit-description-package"></div>
	                      </div>
	                    </div>
	                  </div>

	                  <div class="col-lg-3">
	                    <div class="form-group row">
	                      <label for="sms-si-abov-edit-description-device-${totalClone.length+Date.now()}" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
	                      <select class="form-control" id="sms-si-abov-edit-description-device-${totalClone.length+Date.now()}" title="Device" data-live-search="true" data-live-search-placeholder="Device" number="${totalClone.length+Date.now()}">
	                        <option value="" disabled selected>Choose a Device</option>
	                      </select>
	                      <div id="select2-sms-si-abov-edit-description-device-${totalClone.length+Date.now()}" number="${totalClone.length+Date.now()}"></div>
	                      <div class="invalid-feedback" id="msg-sms-si-abov-edit-description-device-${totalClone.length+Date.now()}" number="${totalClone.length+Date.now()}"></div>
	                    </div>
	                  </div>

	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-abov-edit-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-abov-edit-description-quantity" placeholder="Quantity" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-abov-edit-description-quantity"></div>
	                      </div>
	                    </div>
	                  </div>
	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-abov-edit-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-abov-edit-description-invoice" placeholder="Invoice" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-abov-edit-description-invoice"></div>
	                      </div>
	                    </div>
	                  </div>
	                  <div class="col-lg-2">
	                    <div class="form-group row">
	                      <label for="sms-si-abov-edit-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
	                      <div class="col-sm-12 col-md-12 col-lg-12">
	                        <input type="text" class="form-control" id="sms-si-abov-edit-description-hs-code" placeholder="HS Code" number="${totalClone.length+Date.now()}">
	                        <div class="invalid-feedback" number="${totalClone.length+Date.now()}" id="msg-sms-si-abov-edit-description-hs-code"></div>
	                      </div>
	                    </div>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
		`;
		clone.append(sc);

		let slect2 = $('select[id^="sms-si-abov-edit-description-device"]');
		let boxSlect2 = $('div[id^="select2-sms-si-abov-edit-description-device"]');

		for (var x = 0; x < slect2.length; x++) {
			if (slect2.eq(x).attr('aria-hidden') !== "true") {
				if (deviceListTmp !== false) {
					for (var i = 0; i < deviceListTmp.length; i++) {
						slect2.eq(x).append(new Option(deviceListTmp[i], deviceListTmp[i]));
					}
				}
			}
		}

		for (var i = 0; i < slect2.length; i++) {
			if (slect2.eq(x).attr('aria-hidden') !== "true") {
				$("#"+slect2.eq(i).attr('id')).select2({
					dropdownParent: $("#"+boxSlect2.eq(i).attr('id'))
				});
			}
		}
	});

	$("#burn-colomn-sms-si-release-description-abov").click(function () {
		const dv = $('[id^="sms-si-abov-edit-description-column"]');
		const checkbox = $('[id^="sms-si-abov-edit-description-checked"]');

		let number = false;

		for (let i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				number = checkbox.eq(i).attr('number');
				dv.eq(i).remove();
			} else {
				checkbox.eq(i).attr("number", i);
				dv.eq(i).attr("number", i);
			}
		}

		if (!number) {
			$(".air-badge").html(airBadge("Please check the box", 'danger'));
		}
	});

	$("#btn-cancel-sms-final-delivery-abov").click(function () {
		const modal = $("#modal-cancel-sms-si-final-delivery-abov");
		const label = $(".info-cancel-sms-si-final-delivery-abov");
		const btn = $("#btn-save-cancel-sms-si-final-delivery-abov");

		let tables = $('[id^="select-sms-final-delivery-abov-list"]');
		let data = [];
		let name = false;
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				name = tables.eq(i).find('td').eq(1).text();
				data[x] = tables.eq(i).attr("data");
				x++;
			}
		}

		if (x == 1) label.text(name);
		if (x >= 2) label.text(`${name} and ${x - 1} other`);

		let myJsonString = JSON.stringify(data);

		btn.attr("data", myJsonString);
		modal.modal('show');
	})

	$("#btn-save-cancel-sms-si-final-delivery-abov").click(function () {
		const btn = $("#btn-save-cancel-sms-si-final-delivery-abov");
		const txt = btn.attr("data");

		$("#modal-cancel-sms-si-final-delivery-abov").modal('hide');
		$(".air-badge").html(loadingBackdrop());

		const params = {
			'target': txt,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v23/cancel-sms-final-delivery");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				$(".air-badge").html(airBadge(obj.msg , 'success'));

				setTimeout(function() {
					window.location = window.location.href;
				}, 5000);
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});	
	});

	$("#btn-print-sms-final-delivery-abov").click(function () {

		let tables = $('[id^="select-sms-final-delivery-abov-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "ABOV",
			'type': "print",
			'note': "final",
		};

		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-excel-sms-final-delivery-abov").click(function () {

		let tables = $('[id^="select-sms-final-delivery-abov-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "ABOV",
			'type': "excel",
			'note': "final",
		};
		
		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});

	$("#btn-pdf-sms-final-delivery-abov").click(function () {

		let tables = $('[id^="select-sms-final-delivery-abov-list"]');
		let id = [];
		let x = 0;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id[x] = tables.eq(i).attr('data');
				// break;
				x++;
			}
		}

		const params = {
			'target': JSON.stringify(unique(id)),
			'const': "ABOV",
			'type': "pdf",
			'note': "final",
		};
		
		const executePost = btoa(JEncrypt(JSON.stringify(params)));
		openInNewTab(baseUrl("/"+menu()+'/export-booking/'+executePost));
	});
}

const smsShipmentCancel = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;

	let tableOptIndex = datatableOpt();

	let tableBtnIndex = [
		{	
			text : '<span class="mr-2">Review</span><i class="fas fa-fw fa-search"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-review-sms-shipment-cancel');
				$(node).attr('disabled', true);
			}
		}
	];

	tableOptIndex['buttons'] = arrayPrepend(tableBtnIndex, selectionExportBtn());

	tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Doc Number"},
		{data: "PO Number"},
		{data: "COO"},
		{data: "Customer Name"},
		{data: "Delivery Plan Date"},
		{data: "Consignee"},
		{data: "address"},
		{data: "EORI No."},
		{data: "Attention"},
		{data: "Email"},
		{data: "Contact Number"},
		{data: "Forwarder / Courier"},
		{data: "Package"},
		{data: "Device"},
		{data: "Quantity"},
		{data: "HS Code"}
	];

	tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-sms-shipment-cancel-list');
		$(row).attr('data', data.data);
		// $(row).attr('flag', data.flag);
		// $(row).attr('fwd', data.fwd);
		$(row).attr('stg', false);
	};

	tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 1, 2, 3, 5, 10, 11],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
				// $(td).addClass(rowData.clr);
			}
		},
		{
			"targets": [4, 6, 7, 8, 9],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
				// $(td).addClass(rowData.clr);
			}
		},
		{
			"targets": [12, 13, 14, 15],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
				// $(td).addClass(rowData.clr);
			}
		},
	];

	// ORDER TABLE COLUMN BY IS DISABLE
	tableOptIndex['rowsGroup'] = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
	];

	let dataTableIndex = $('#datatable-sms-shipment-cancel').DataTable(tableOptIndex);

	const selectSmsShpList = (arr) => {
		const btnPreview = $("#btn-review-sms-shipment-cancel");

		let tables = $('[id^="select-sms-shipment-cancel-list"]');
		let isOn = 0;
		let shiftTable = 0;
		let fwd = [];

		let x = 0;
		for (let i = 0; i < tables.length; i++) {
			if (selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				fwd[x] = tables.eq(i).attr("fwd");
				isOn++;
				x++;
				lastPressed = (i+1);
			} else {
				if (ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							lastPressed = (i+1);
							fwd[x] = tables.eq(i).attr("fwd");
							x++;
						}
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							if (!fwd.includes(tables.eq(i).attr("fwd"))) {
								fwd[x] = tables.eq(i).attr("fwd");
								x++;
								isOn++;
							}
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (shiftPressed && !ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						shiftTable = (i+1);
					}
				}

				if (!shiftPressed) shiftTable = 0;
			}
		}

		// naik
		if (lastPressed && shiftTable && lastPressed > shiftTable) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					fwd[x] = tables.eq(i).attr("fwd");
					x++;
					isOn++;
				}
			}
		}

		// turun
		if (shiftTable > lastPressed) {
			if (lastPressed >= 1) lastPressed --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= lastPressed && i < shiftTable) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					fwd[x] = tables.eq(i).attr("fwd");
					x++;
					isOn++;
				}
			}
		}

		 // console.log("fwd.length : "+ fwd.length +" || fwd.filter(onlyUnique).length : "+ fwd.filter(onlyUnique).length +" || isOn : "+ isOn);
		 // console.log(fwd.includes('FWD-00000003'));
		if (isOn == 0 || fwd.filter(onlyUnique).length == 0) {
			btnPreview.attr("disabled", true);
			lastPressed = 0;
		}

		if (isOn == 1 && fwd.filter(onlyUnique).length == 1) {
			btnPreview.attr("disabled", false);
		}

		if (isOn >= 2 || fwd.filter(onlyUnique).length >= 2) {
			btnPreview.attr("disabled", true);
		}
	}

	$(document).keydown(function(event){
		if(event.which == "17") ctrlPressed = true;
		if(event.which == "16") shiftPressed = true;
		if(ctrlPressed && event.which == "65") selectAll = true;

		if (event.keyCode == 65 && event.ctrlKey && selectAll && $("#row-index-1").attr("flag") == "true") {
			textSelection('datatable-sms-shipment-cancel');
			event.preventDefault();
			selectSmsShpList();
		}
	});

	$(document).keyup(function(){
		ctrlPressed = false;
		shiftPressed = false;
		selectAll = false;
	});

	$(document).on('click', '[id^="select-sms-shipment-cancel-list"]', function () {
		const myData = $(this);

		selectSmsShpList(myData);
	});

	$(document).ready(function () {
		$(".air-badge").html(loadingBackdrop());

		const url = baseUrl("/auth/api/v25/info-sms-shp-cancel");

		const execute = postField(url, 'GET', false, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				// shpNumb.val(obj.result.new['si_number']);


				let sc = [];

				let y = 0;
				for (let i = 0; i < obj.result.length; i++) {
					for (let x = 0; x < obj.result[i]['category'].length; x++) {
						sc[y] = {
							"No": (i+1),
							"Doc Number": obj.result[i].sms_number,
							"PO Number": obj.result[i].po_number,
							"COO": obj.result[i].coo,
							"Customer Name": obj.result[i].customer_name,
							"Delivery Plan Date": obj.result[i].delivery_plan_date,
							"Consignee": obj.result[i].consignee,
							"address": obj.result[i].address,
							"EORI No": obj.result[i].eori_no,
							"Attention": obj.result[i].attention,
							"Email": obj.result[i].email,
							"Contact Number": obj.result[i].contact_number,
							"Forwarder / Courier": obj.result[i].forwarder,
							"Package": obj.result[i]['category'][x]['cat_package'],
							"Device": obj.result[i]['category'][x]['cat_device'],
							"Quantity": obj.result[i]['category'][x]['cat_quantity'],
							"HS Code": obj.result[i]['category'][x]['cat_hs_code'],
							"data": obj.result[i].sms_number,
							// "data": obj.result[i].cat_sms,
						};

						y++;
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-review-sms-shipment-cancel").click(function () {
		const rowIndex1 = $("#row-index-1");
		const rowIndex2 = $("#row-index-2");

		const smsSiPreviewPoNumber = $("#sms-si-preview-po-number");
		const smsSiPreviewCoo = $("#sms-si-preview-coo");
		const smsSiPreviewCustName = $("#sms-si-preview-cust-name");
		const smsSiPreviewDelPlanDate = $("#sms-si-preview-delivery-plan-date");
		const smsSiPreviewConsignee = $("#sms-si-preview-consignee");
		const smsSiPreviewAddress = $("#sms-si-preview-address");
		const smsSiPreviewEoriNo = $("#sms-si-preview-eori-no");
		const smsSiPreviewAttention = $("#sms-si-preview-attention");
		const smsSiPreviewEmail = $("#sms-si-preview-email");
		const smsSiPreviewContactNumber = $("#sms-si-preview-contact-number");
		const smsSiPreviewForwarder = $("#sms-si-preview-forwarder");
		const smsSiPreviewCourirNumber = $("#sms-si-preview-account-number");
		const smsSiPreviewRemark = $("#sms-si-preview-remark");

		const smsSiPreviewFlight = $("#sms-si-preview-flight");
		const smsSiPreviewPlanPickup = $("#sms-si-preview-plan-pickup");
		const smsSiPreviewNettWeight = $("#sms-si-preview-nett-weight");
		const smsSiPreviewGrossWeight = $("#sms-si-preview-gross-weight");
		const smsSiPreviewTotalCarton = $("#sms-si-preview-total-carton");
		const smsSiPreviewCartonDimension = $("#sms-si-preview-carton-dimension");

		const smsSiPreviewNameFlight = $("#sms-si-preview-name-flight");
		const smsSiPreviewMawb = $("#sms-si-preview-mawb");
		const smsSiPreviewHawb = $("#sms-si-preview-hawb");
		const smsSiPreviewIncoterm = $("#sms-si-preview-incoterm");
		const smsSiPreviewExt = $("#sms-si-preview-ext");

		const smsDesClone = $("#sms-si-preview-clone-description");
		const smsSiPreviewDescriptionPackage = $('[id^="sms-si-preview-description-package"]');
		const smsSiPreviewDescriptionDevice = $('[id^="sms-si-preview-description-device"]');
		const smsSiPreviewDescriptionQuantity = $('[id^="sms-si-preview-description-quantity"]');
		const smsSiPreviewDescriptionInvoice = $('[id^="sms-si-preview-description-invoice"]');
		const smsSiPreviewDescriptionHsCode = $('[id^="sms-si-preview-description-hs-code"]');

		let tables = $('[id^="select-sms-shipment-cancel-list"]');
		let id = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id = tables.eq(i).attr('data');
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': id,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v25/get-sms-shp-cancel");
		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				smsSiPreviewPoNumber.val(obj.result['info']['po_number']);
				smsSiPreviewCoo.val(obj.result['info']['coo']);
				smsSiPreviewCustName.val(obj.result['info']['customer_name']);
				smsSiPreviewDelPlanDate.val(obj.result['info']['delivery_plan_date']);
				smsSiPreviewConsignee.val(obj.result['info']['consignee']);
				smsSiPreviewAddress.val(obj.result['info']['address']);
				smsSiPreviewEoriNo.val(obj.result['info']['eori_no']);
				smsSiPreviewAttention.val(obj.result['info']['attention']);
				smsSiPreviewEmail.val(obj.result['info']['email']);
				smsSiPreviewContactNumber.val(obj.result['info']['contact_number']);
				smsSiPreviewForwarder.val(obj.result['info']['forwarder']);
				smsSiPreviewCourirNumber.val(obj.result['info']['courir_number']);
				smsSiPreviewRemark.val(obj.result['info']['remark']);
				
				smsSiPreviewFlight.val(obj.result['info']['flight']);
				smsSiPreviewPlanPickup.val(obj.result['info']['plan_pickup']);
				smsSiPreviewNettWeight.val(obj.result['info']['nett_weight']);
				smsSiPreviewGrossWeight.val(obj.result['info']['gross_weight']);
				smsSiPreviewTotalCarton.val(obj.result['info']['total_carton']);
				smsSiPreviewCartonDimension.val(obj.result['info']['carton_dimension']);

				smsSiPreviewNameFlight.val(obj.result['info']['flight_name']);
				smsSiPreviewMawb.val(obj.result['info']['mawb']);
				smsSiPreviewHawb.val(obj.result['info']['hawb']);
				smsSiPreviewIncoterm.val(obj.result['info']['incoterm']);
				smsSiPreviewExt.val(obj.result['info']['extension']);

				smsDesClone.html('');
				for (var i = 0; i < obj.result['info']['category'].length; i++) {

					let sc = `
						<div class="form-group row" number="${i}" id="sms-si-preview-description-column">
				          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
				          <div class="col-sm-12 col-md-12 col-lg-10">
				            <div class="form-row">
				              <div class="col-lg-1">
				                <div class="form-group row">
				                  <div class="col-sm-12 col-md-12 col-lg-3">
				                    <div class="form-check mb-lg-0">
				                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-preview-description-checked" number="${i}" disabled>
				                      <label class="form-check-label d-lg-none" for="sms-si-preview-description-checked">Checked</label>
				                    </div>
				                  </div>
				                </div>
				              </div>
				              <div class="col-lg-11">
				                <div class="row">
				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-preview-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-preview-description-package" value="${obj.result['info']['category'][i].cat_package}" placeholder="Package" number="${i}" disabled>
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-preview-description-package"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-preview-description-device" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-preview-description-device" value="${obj.result['info']['category'][i].cat_device}" placeholder="Device" number="${i}" disabled>
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-preview-description-device"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-preview-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-preview-description-quantity" value="${obj.result['info']['category'][i].cat_quantity}" placeholder="Quantity" number="${i}" disabled>
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-preview-description-quantity"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-preview-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-preview-description-invoice" value="${obj.result['info']['category'][i].cat_invoice}" placeholder="Invoice" number="${i}" disabled>
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-preview-description-invoice"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-preview-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-preview-description-hs-code" value="${obj.result['info']['category'][i].cat_hs_code}" placeholder="HS Code" number="${i}" disabled>
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-preview-description-hs-code"></div>
				                      </div>
				                    </div>
				                  </div>
				                </div>
				              </div>
				            </div>
				          </div>
				        </div>
					`;
					smsDesClone.append(sc);
				}

				$(".air-badge").html('');
				rowIndex1.addClass("d-none");
				rowIndex1.attr("flag", "false");

				rowIndex2.removeClass("d-none");
				rowIndex2.attr("flag", "true");

			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-back-to-index-1").click(function () {
		const rowIndex1 = $("#row-index-1");
		const rowIndex2 = $("#row-index-2");

		rowIndex1.removeClass("d-none");
		rowIndex1.attr("flag", "true");

		rowIndex2.addClass("d-none");
		rowIndex2.attr("flag", "false");
	});
}

const smsShipmentFastAction = () => {
	let selectAll = false;
	let ctrlPressed = false;
	let shiftPressed = false;
	let lastPressed = 0;

	let tableOptIndex = datatableOpt();

	let tableBtnIndex = [
		{	
			text : '<span class="mr-2">Review</span><i class="fas fa-fw fa-search"></i>', 
			className: 'btn btn-primary btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-review-sms-shipment-fast-action');
				$(node).attr('disabled', true);
			}
		}
	];

	tableOptIndex['buttons'] = arrayPrepend(tableBtnIndex, selectionExportBtn());

	tableOptIndex['columns'] = [
		{data: "No"},
		{data: "Doc Number"},
		{data: "PO Number"},
		{data: "COO"},
		{data: "Customer Name"},
		{data: "Delivery Plan Date"},
		{data: "Consignee"},
		{data: "address"},
		{data: "EORI No."},
		{data: "Attention"},
		{data: "Email"},
		{data: "Contact Number"},
		{data: "Forwarder / Courier"},
		{data: "Package"},
		{data: "Device"},
		{data: "Quantity"},
		{data: "HS Code"}
	];

	tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-sms-shipment-fast-action-list');
		$(row).attr('data', data.data);
		$(row).attr('flag', data.flag);
		// $(row).attr('fwd', data.fwd);
		$(row).attr('stg', false);
	};

	tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 1, 2, 3, 5, 10, 11],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
				// $(td).addClass(rowData.clr);
			}
		},
		{
			"targets": [4, 6, 7, 8, 9],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
				// $(td).addClass(rowData.clr);
			}
		},
		{
			"targets": [12, 13, 14, 15],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
				// $(td).addClass(rowData.clr);
			}
		},
	];

	// ORDER TABLE COLUMN BY IS DISABLE
	tableOptIndex['rowsGroup'] = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
	];

	let dataTableIndex = $('#datatable-sms-shipment-fast-action').DataTable(tableOptIndex);

	const selectSmsShpList = (arr) => {
		const btnPreview = $("#btn-review-sms-shipment-fast-action");

		let tables = $('[id^="select-sms-shipment-fast-action-list"]');
		let isOn = 0;
		let shiftTable = 0;
		let fwd = [];

		let x = 0;
		for (let i = 0; i < tables.length; i++) {
			if (selectAll) {
				tables.eq(i).attr("stg", true);
				tables.eq(i).addClass("table-primary");
				fwd[x] = tables.eq(i).attr("fwd");
				isOn++;
				x++;
				lastPressed = (i+1);
			} else {
				if (ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							lastPressed = (i+1);
							fwd[x] = tables.eq(i).attr("fwd");
							x++;
						}
					}

					if (tables.eq(i).attr("stg") == "true") isOn++;
				}

				if (!ctrlPressed && !shiftPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						if (tables.eq(i).attr("stg") == "true") {
							tables.eq(i).attr("stg", false);
							tables.eq(i).removeClass("table-primary");
						} else {
							tables.eq(i).attr("stg", true);
							tables.eq(i).addClass("table-primary");
							if (!fwd.includes(tables.eq(i).attr("fwd"))) {
								fwd[x] = tables.eq(i).attr("fwd");
								x++;
								isOn++;
							}
							lastPressed = (i+1);
						}
					}

					if (tables.eq(i).attr('data') != arr.eq(0).attr('data')) {
						tables.eq(i).attr("stg", false);
						tables.eq(i).removeClass("table-primary");
					}
				}

				if (shiftPressed && !ctrlPressed) {
					if (tables.eq(i).attr('data') == arr.eq(0).attr('data')) {
						shiftTable = (i+1);
					}
				}

				if (!shiftPressed) shiftTable = 0;
			}
		}

		// naik
		if (lastPressed && shiftTable && lastPressed > shiftTable) {
			for (let i = (tables.length-1); i >= 0; i--) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (lastPressed >= (i+1) && shiftTable <= (i+1)) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					fwd[x] = tables.eq(i).attr("fwd");
					x++;
					isOn++;
				}
			}
		}

		// turun
		if (shiftTable > lastPressed) {
			if (lastPressed >= 1) lastPressed --;
			for (let i = 0; i < tables.length; i++) {
				tables.eq(i).attr("stg", false);
				tables.eq(i).removeClass("table-primary");

				if (i >= lastPressed && i < shiftTable) {
					tables.eq(i).attr("stg", true);
					tables.eq(i).addClass("table-primary");	
					fwd[x] = tables.eq(i).attr("fwd");
					x++;
					isOn++;
				}
			}
		}

		 // console.log("fwd.length : "+ fwd.length +" || fwd.filter(onlyUnique).length : "+ fwd.filter(onlyUnique).length +" || isOn : "+ isOn);
		 // console.log(fwd.includes('FWD-00000003'));
		if (isOn == 0 || fwd.filter(onlyUnique).length == 0) {
			btnPreview.attr("disabled", true);
			lastPressed = 0;
		}

		if (isOn == 1 && fwd.filter(onlyUnique).length == 1) {
			btnPreview.attr("disabled", false);
		}

		if (isOn >= 2 || fwd.filter(onlyUnique).length >= 2) {
			btnPreview.attr("disabled", true);
		}
	}

	$(document).keydown(function(event){
		if(event.which == "17") ctrlPressed = true;
		if(event.which == "16") shiftPressed = true;
		if(ctrlPressed && event.which == "65") selectAll = true;

		if (event.keyCode == 65 && event.ctrlKey && selectAll && $("#row-index-1").attr("flag") == "true") {
			textSelection('datatable-sms-shipment-fast-action');
			event.preventDefault();
			selectSmsShpList();
		}
	});

	$(document).keyup(function(){
		ctrlPressed = false;
		shiftPressed = false;
		selectAll = false;
	});

	$(document).on('click', '[id^="select-sms-shipment-fast-action-list"]', function () {
		const myData = $(this);

		selectSmsShpList(myData);
	});

	// $(document).ready(function () {
	// 	$(".air-badge").html(loadingBackdrop());

	// 	const url = baseUrl("/auth/api/v26/info-sms-shp-fast-action");

	// 	const execute = postField(url, 'GET', false, false);

	// 	execute.done(function(result) {
	// 		let obj = JSON.parse(JSON.stringify(result));

	// 		if (obj.code == 200) {
	// 			// shpNumb.val(obj.result.new['si_number']);

	// 			let sc = [];

	// 			let y = 0;
	// 			for (let i = 0; i < obj.result.length; i++) {
	// 				for (let x = 0; x < obj.result[i]['category'].length; x++) {
	// 					sc[y] = {
	// 						"No": (i+1),
	// 						"Doc Number": obj.result[i].sms_number,
	// 						"PO Number": obj.result[i].po_number,
	// 						"COO": obj.result[i].coo,
	// 						"Customer Name": obj.result[i].customer_name,
	// 						"Delivery Plan Date": obj.result[i].delivery_plan_date,
	// 						"Consignee": obj.result[i].consignee,
	// 						"address": obj.result[i].address,
	// 						"EORI No": obj.result[i].eori_no,
	// 						"Attention": obj.result[i].attention,
	// 						"Email": obj.result[i].email,
	// 						"Contact Number": obj.result[i].contact_number,
	// 						"Forwarder / Courier": obj.result[i].forwarder,
	// 						"Package": obj.result[i]['category'][x]['cat_package'],
	// 						"Device": obj.result[i]['category'][x]['cat_device'],
	// 						"Quantity": obj.result[i]['category'][x]['cat_quantity'],
	// 						"HS Code": obj.result[i]['category'][x]['cat_hs_code'],
	// 						"data": obj.result[i].sms_number,
	// 						// "data": obj.result[i].cat_sms,
	// 					};

	// 					y++;
	// 				}
	// 			}

	// 			dataTableIndex.rows().remove();
	// 			dataTableIndex.rows.add(sc).draw();

	// 			$(".air-badge").html('');
	// 		} else {
	// 			$(".air-badge").html(airBadge(obj.msg , 'danger'));
	// 		}
	// 	});

	// 	execute.fail(function() {
	// 		$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
	// 	});
	// });

	$("#btn-review-sms-shipment-fast-action").click(function () {
		const rowIndex1 = $("#row-index-1");
		const rowIndex2 = $("#row-index-2");

		const smsSiPreviewDocNo = $("#sms-si-preview-doc-no");
		const smsSiPreviewDocOwner = $("#sms-si-preview-doc-owner");
		const smsSiPreviewDocStatus = $("#sms-si-preview-doc-status");
		const smsSiPreviewDocProccess = $("#sms-si-preview-doc-proccess");
		const smsSiPreviewDocPending = $("#sms-si-preview-doc-pending");
		const smsSiPreviewDocRelease = $("#sms-si-preview-doc-release");

		const smsSiPreviewPoNumber = $("#sms-si-preview-po-number");
		const smsSiPreviewCoo = $("#sms-si-preview-coo");
		const smsSiPreviewCustName = $("#sms-si-preview-cust-name");
		const smsSiPreviewDelPlanDate = $("#sms-si-preview-delivery-plan-date");
		const smsSiPreviewConsignee = $("#sms-si-preview-consignee");
		const smsSiPreviewAddress = $("#sms-si-preview-address");
		const smsSiPreviewEoriNo = $("#sms-si-preview-eori-no");
		const smsSiPreviewAttention = $("#sms-si-preview-attention");
		const smsSiPreviewEmail = $("#sms-si-preview-email");
		const smsSiPreviewContactNumber = $("#sms-si-preview-contact-number");
		const smsSiPreviewForwarder = $("#sms-si-preview-forwarder");
		const smsSiPreviewCourirNumber = $("#sms-si-preview-account-number");
		const smsSiPreviewRemark = $("#sms-si-preview-remark");

		const smsSiPreviewFlight = $("#sms-si-preview-flight");
		const smsSiPreviewPlanPickup = $("#sms-si-preview-plan-pickup");
		const smsSiPreviewNettWeight = $("#sms-si-preview-nett-weight");
		const smsSiPreviewGrossWeight = $("#sms-si-preview-gross-weight");
		const smsSiPreviewTotalCarton = $("#sms-si-preview-total-carton");
		const smsSiPreviewCartonDimension = $("#sms-si-preview-carton-dimension");

		const smsSiPreviewNameFlight = $("#sms-si-preview-name-flight");
		const smsSiPreviewMawb = $("#sms-si-preview-mawb");
		const smsSiPreviewHawb = $("#sms-si-preview-hawb");
		const smsSiPreviewIncoterm = $("#sms-si-preview-incoterm");
		const smsSiPreviewExt = $("#sms-si-preview-ext");

		const smsDesClone = $("#sms-si-preview-clone-description");
		const smsSiPreviewDescriptionPackage = $('[id^="sms-si-preview-description-package"]');
		const smsSiPreviewDescriptionDevice = $('[id^="sms-si-preview-description-device"]');
		const smsSiPreviewDescriptionQuantity = $('[id^="sms-si-preview-description-quantity"]');
		const smsSiPreviewDescriptionInvoice = $('[id^="sms-si-preview-description-invoice"]');
		const smsSiPreviewDescriptionHsCode = $('[id^="sms-si-preview-description-hs-code"]');

		let tables = $('[id^="select-sms-shipment-fast-action-list"]');
		let id = false;
		let flag = false;

		for (let i = 0; i < tables.length; i++) {
			if (tables.eq(i).attr("stg") == "true") {
				id = tables.eq(i).attr('data');
				flag = tables.eq(i).attr('flag');
				break;
			}
		}

		$(".air-badge").html(loadingBackdrop());
		const params = {
			'id': id,
			'flag': flag,
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v26/get-sms-shp-fast-action");
		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				smsSiPreviewDocNo.val(obj.result['info']['sms_number']);
				smsSiPreviewDocOwner.val(obj.result['info']['owner']);
				smsSiPreviewDocStatus.val(obj.result['info']['flag']);
				smsSiPreviewDocProccess.val(obj.result['info']['act_proc_step']);
				smsSiPreviewDocPending.val(obj.result['info']['pending']);
				smsSiPreviewDocRelease.val(obj.result['info']['created_date']);

				smsSiPreviewPoNumber.val(obj.result['info']['po_number']);
				smsSiPreviewCoo.val(obj.result['info']['coo']);
				smsSiPreviewCustName.val(obj.result['info']['customer_name']);
				smsSiPreviewDelPlanDate.val(obj.result['info']['delivery_plan_date']);
				smsSiPreviewConsignee.val(obj.result['info']['consignee']);
				smsSiPreviewAddress.val(obj.result['info']['address']);
				smsSiPreviewEoriNo.val(obj.result['info']['eori_no']);
				smsSiPreviewAttention.val(obj.result['info']['attention']);
				smsSiPreviewEmail.val(obj.result['info']['email']);
				smsSiPreviewContactNumber.val(obj.result['info']['contact_number']);
				smsSiPreviewForwarder.val(obj.result['info']['forwarder']);
				smsSiPreviewCourirNumber.val(obj.result['info']['courir_number']);
				smsSiPreviewRemark.val(obj.result['info']['remark']);
				
				smsSiPreviewFlight.val(obj.result['info']['flight']);
				smsSiPreviewPlanPickup.val(obj.result['info']['plan_pickup']);
				smsSiPreviewNettWeight.val(obj.result['info']['nett_weight']);
				smsSiPreviewGrossWeight.val(obj.result['info']['gross_weight']);
				smsSiPreviewTotalCarton.val(obj.result['info']['total_carton']);
				smsSiPreviewCartonDimension.val(obj.result['info']['carton_dimension']);

				smsSiPreviewNameFlight.val(obj.result['info']['flight_name']);
				smsSiPreviewMawb.val(obj.result['info']['mawb']);
				smsSiPreviewHawb.val(obj.result['info']['hawb']);
				smsSiPreviewIncoterm.val(obj.result['info']['incoterm']);
				smsSiPreviewExt.val(obj.result['info']['extension']);

				smsDesClone.html('');
				for (var i = 0; i < obj.result['info']['category'].length; i++) {

					let sc = `
						<div class="form-group row" number="${i}" id="sms-si-preview-description-column">
				          <label class="col-sm-12 col-md-12 col-lg-2 col-form-label mb-4 font-weight-bolder">Description</label>
				          <div class="col-sm-12 col-md-12 col-lg-10">
				            <div class="form-row">
				              <div class="col-lg-1">
				                <div class="form-group row">
				                  <div class="col-sm-12 col-md-12 col-lg-3">
				                    <div class="form-check mb-lg-0">
				                      <input class="form-check-input mt-lg-3" type="checkbox" value="" id="sms-si-preview-description-checked" number="${i}" disabled>
				                      <label class="form-check-label d-lg-none" for="sms-si-preview-description-checked">Checked</label>
				                    </div>
				                  </div>
				                </div>
				              </div>
				              <div class="col-lg-11">
				                <div class="row">
				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-preview-description-package" class="col-sm-12 col-md-12 col-form-label d-lg-none">Package</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-preview-description-package" value="${obj.result['info']['category'][i].cat_package}" placeholder="Package" number="${i}" disabled>
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-preview-description-package"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-3">
				                    <div class="form-group row">
				                      <label for="sms-si-preview-description-device" class="col-sm-12 col-md-12 col-form-label d-lg-none">Device</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-preview-description-device" value="${obj.result['info']['category'][i].cat_device}" placeholder="Device" number="${i}" disabled>
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-preview-description-device"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-preview-description-quantity" class="col-sm-12 col-md-12 col-form-label d-lg-none">Quantity</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-preview-description-quantity" value="${obj.result['info']['category'][i].cat_quantity}" placeholder="Quantity" number="${i}" disabled>
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-preview-description-quantity"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-preview-description-invoice" class="col-sm-12 col-md-12 col-form-label d-lg-none">Invoice</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-preview-description-invoice" value="${obj.result['info']['category'][i].cat_invoice}" placeholder="Invoice" number="${i}" disabled>
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-preview-description-invoice"></div>
				                      </div>
				                    </div>
				                  </div>
				                  <div class="col-lg-2">
				                    <div class="form-group row">
				                      <label for="sms-si-preview-description-hs-code" class="col-sm-12 col-md-12 col-form-label d-lg-none">HS Code</label>
				                      <div class="col-sm-12 col-md-12 col-lg-12">
				                        <input type="text" class="form-control" id="sms-si-preview-description-hs-code" value="${obj.result['info']['category'][i].cat_hs_code}" placeholder="HS Code" number="${i}" disabled>
				                        <div class="invalid-feedback" number="${i}" id="msg-sms-si-preview-description-hs-code"></div>
				                      </div>
				                    </div>
				                  </div>
				                </div>
				              </div>
				            </div>
				          </div>
				        </div>
					`;
					smsDesClone.append(sc);
				}

				$(".air-badge").html('');
				rowIndex1.addClass("d-none");
				rowIndex1.attr("flag", "false");

				rowIndex2.removeClass("d-none");
				rowIndex2.attr("flag", "true");

			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});

	$("#btn-back-to-index-1").click(function () {
		const rowIndex1 = $("#row-index-1");
		const rowIndex2 = $("#row-index-2");

		rowIndex1.removeClass("d-none");
		rowIndex1.attr("flag", "true");

		rowIndex2.addClass("d-none");
		rowIndex2.attr("flag", "false");
	});

	$("#src-doc-flow").select2({
		dropdownParent: $('#select2-src-doc-flow')
	});

	$("#src-doc-status").select2({
		dropdownParent: $('#select2-src-doc-status')
	});

	$("#btn-search-docs").click(function () {
		const srcDocNo = $("#src-doc-no");
		const srcDocFlow = $("#src-doc-flow");
		const srcDocStatus = $("#src-doc-status");
		const srcDocOwn = $("#src-doc-own");
		const srcDocPending = $("#src-doc-pending");
		const srcDocStartPeriod = $("#src-doc-start-period");
		const srcDocEndPeriod = $("#src-doc-end-period");

		$(".air-badge").html(loadingBackdrop());

		const params = {
			'doc-no': srcDocNo.val(),
			'doc-flow': srcDocFlow.val(),
			'doc-status': srcDocStatus.val(),
			'doc-own': srcDocOwn.val(),
			'doc-pending': srcDocPending.val(),
			'start-period': srcDocStartPeriod.val(),
			'end-period': srcDocEndPeriod.val(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v26/src-info-sms-shp-fast-action");

		const execute = postField(url, 'POST', executePost, false);
		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				// shpNumb.val(obj.result.new['si_number']);

				let sc = [];

				let y = 0;
				for (let i = 0; i < obj.result.length; i++) {
					for (let x = 0; x < obj.result[i]['category'].length; x++) {
						sc[y] = {
							"No": (i+1),
							"Doc Number": obj.result[i].sms_number,
							"PO Number": obj.result[i].po_number,
							"COO": obj.result[i].coo,
							"Customer Name": obj.result[i].customer_name,
							"Delivery Plan Date": obj.result[i].delivery_plan_date,
							"Consignee": obj.result[i].consignee,
							"address": obj.result[i].address,
							"EORI No": obj.result[i].eori_no,
							"Attention": obj.result[i].attention,
							"Email": obj.result[i].email,
							"Contact Number": obj.result[i].contact_number,
							"Forwarder / Courier": obj.result[i].forwarder,
							"Package": obj.result[i]['category'][x]['cat_package'],
							"Device": obj.result[i]['category'][x]['cat_device'],
							"Quantity": obj.result[i]['category'][x]['cat_quantity'],
							"HS Code": obj.result[i]['category'][x]['cat_hs_code'],
							"data": obj.result[i].sms_number,
							"flag": obj.result[i].flag,
							// "data": obj.result[i].cat_sms,
						};

						y++;
					}
				}

				dataTableIndex.rows().remove();
				dataTableIndex.rows.add(sc).draw();

				$(".air-badge").html('');
			} else {
				$(".air-badge").html(airBadge(obj.msg , 'danger'));
			}
		});

		execute.fail(function() {
			$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
		});
	});
}

const main = (function() {
	const isOn = $(".main-js").attr("my-js") || false;

	if (isOn == "shipping-instructuion") shippingInstructuion();
	if (isOn == "invoice-forwarder") invoiceForwarder();
	if (isOn == "history-my-history-login") historyMyHistoryLogin();
	if (isOn == "history-user-activity") historyUserActivity();
	if (isOn == "profile") profilePage();
	if (isOn == "user-management") userManagement();
	if (isOn == "user-management-new-pass") userManagementNewPass();
	if (isOn == "menu-management") menuManagement();
	if (isOn == "web-settings") webSettings();
	if (isOn == "user-access-menu") userAccessMenu();
	if (isOn == "management-conversion-sms") managementConversionSms();
	if (isOn == "management-kategori-barang") managementKategoriBarang();

	if (isOn == "sms-shipment-instruction") smsShipmentInstruction();
	if (isOn == "sms-booking-delivery") smsBookingDelivery();
	if (isOn == "sms-shp-confirmation") smsShpConfirmation();
	if (isOn == "sms-final-delivery") smsFinalDelivery();
	// if (isOn == "sms-schedule-delivery") smsScheduleDelivery();
	if (isOn == "sms-shipment-cancel") smsShipmentCancel();
	if (isOn == "sms-shipment-fast-action") smsShipmentFastAction();

	if (isOn == "upload-bahan-baku") uploadBahanBaku();
	if (isOn == "upload-barang-jadi") uploadBarangJadi();
	if (isOn == "upload-mutasi-mesin") uploadMutasiMesin();
	if (isOn == "upload-pemasukan-barang") uploadPemasukanBarang();
	if (isOn == "upload-pengeluaran-barang") uploadPengeluaranBarang();
	if (isOn == "upload-reject-and-scrap") uploadRejectAndScrap();
	if (isOn == "upload-wip") uploadWip();

	if (isOn == "laporan-bahan-baku") laporanBahanBaku();
	if (isOn == "laporan-barang-jadi") laporanBarangJadi();
	if (isOn == "laporan-mutasi-mesin") laporanMutasiMesin();
	if (isOn == "laporan-pemasukan-barang") laporanPemasukanBarang();
	if (isOn == "laporan-pengeluaran-barang") laporanPengeluaranBarang();
	if (isOn == "laporan-reject-and-scrap") laporanRejectAndScrap();
	if (isOn == "laporan-wip") laporanWip();
	if (isOn == "laporan-cctv") laporanCctv();
})();