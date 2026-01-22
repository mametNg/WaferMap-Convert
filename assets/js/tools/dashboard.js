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

		const url = baseUrl("/auth/api/v2/change-profile");
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

const webSettingPage = () => {
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

		const url = baseUrl("/auth/api/v3/set-web-setting");
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

		const url = baseUrl("/auth/api/v3/set-maintenance");

		const execute = postField(url, 'POST', executePost, false);

		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
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

const managementUserManagementPage = () => {
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
		{data: "Station"},
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
			"targets": [0, 2, 6, 7, 8],
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

	$("#profile-new-station").select2({
		dropdownParent: $('#select2-profile-new-station')
	});

	$("#profile-edit-station").select2({
		dropdownParent: $('#select2-profile-edit-station')
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
		const url = baseUrl("/auth/api/v4/load-all-user");

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
						"Station": obj.result.users[i].station,
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
		const profileStation = $("#profile-new-station");
		const profilePassword = $("#profile-new-password");
		const profileConfirmPassword = $("#profile-new-confirm-password");
		let allow = true;

		if (!inputValidation("#"+profileUsername.attr('id'), "#msg-"+profileUsername.attr('id'))) allow =false;
		if (!inputValidation("#"+profileMail.attr('id'), "#msg-"+profileMail.attr('id'))) allow =false;
		if (!filterName("#"+profileName.attr('id'), "#msg-"+profileName.attr('id'))) allow =false;
		if (!select2Validation("#"+profileRole.attr("id"), "#msg-"+profileRole.attr("id"))) allow = false;
		if (!select2Validation("#"+profileDept.attr("id"), "#msg-"+profileDept.attr("id"))) allow = false;
		if (!select2Validation("#"+profileStation.attr("id"), "#msg-"+profileStation.attr("id"))) allow = false;
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
			'station': profileStation.val().trim(),
			'password': profilePassword.val().trim(),
			'confirm-password': profileConfirmPassword.val().trim(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v4/new-user");
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
		const profileStation = $("#profile-edit-station");
		const turnPass = $("#switch-pass");
		const profilePassword = $("#profile-edit-password");
		const profileConfirmPassword = $("#profile-edit-confirm-password");
		let allow = true;

		if (!inputValidation("#"+profileUsername.attr('id'), "#msg-"+profileUsername.attr('id'))) allow =false;
		if (!inputValidation("#"+profileMail.attr('id'), "#msg-"+profileMail.attr('id'))) allow =false;
		if (!filterName("#"+profileName.attr('id'), "#msg-"+profileName.attr('id'))) allow =false;
		if (!select2Validation("#"+profileRole.attr("id"), "#msg-"+profileRole.attr("id"))) allow = false;
		if (!select2Validation("#"+profileDept.attr("id"), "#msg-"+profileDept.attr("id"))) allow = false;
		if (!select2Validation("#"+profileStation.attr("id"), "#msg-"+profileStation.attr("id"))) allow = false;
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
			'station': profileStation.val().trim(),
			'new-password': turnPass.prop("checked"),
		};

		if (turnPass.prop("checked")) {
			params['password'] = profilePassword.val().trim();
			params['confirm-password'] = profileConfirmPassword.val().trim();
		}

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v4/edit-user");
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

		const url = baseUrl("/auth/api/v4/disable-user");

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

		const url = baseUrl("/auth/api/v4/enable-user");

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
		const profileStation = $("#profile-edit-station");
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

		const url = baseUrl("/auth/api/v4/get-user-by");

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

				profileStation.select2({
					dropdownParent: $('#select2-profile-edit-station')
				}).val(obj.result['station']).trigger('change');

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

		const url = baseUrl("/auth/api/v5/get-all-user-access-menu");

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

		const url = baseUrl("/auth/api/v5/get-user-access-menu-by");

		const execute = postField(url, 'POST', executePost, false);
		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				btn.attr('data', id);

				const menuList = $("#v-pills-tab");
				const menuContainList = $("#v-pills-tabContent");

				let scMenuList = "";
				let scContainMenuList = "";
				for (let i = 0; i < obj.result.length; i++) {
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

					if (obj.result[i]['is_submenu'] == 1) {
						containMenu = "<h3 class=\"text-dark mt-3\">"+obj.result[i]['name']+"</h3>"
						for (let x = 0; x < obj.result[i]['submenu'].length; x++) {
							containMenu += `
								<div class="custom-control custom-switch">
								  <input type="checkbox" ${(obj.result[i]['submenu'][x]['flag'] == "1" ? " checked" : "")} class="custom-control-input" id="submenu-custom-${obj.result[i]['path']}-${obj.result[i]['submenu'][x]['path']}" alt="${obj.result[i]['submenu'][x]['name']}" data="${obj.result[i]['submenu'][x]['submenu_id']}" menu="${obj.result[i]['menu_id']}">
								  <label class="custom-control-label" for="submenu-custom-${obj.result[i]['path']}-${obj.result[i]['submenu'][x]['path']}">${obj.result[i]['submenu'][x]['name']}</label>
								</div>
							`;
						}
					}

					if (obj.result[i]['is_submenu'] !== 1) {
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

		const url = baseUrl("/auth/api/v5/setup-user-access-menu");

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
						for (let x = 0; x < obj.result[i]['submenu'].length; x++) {
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

const pageInspectionOutgoing = () => {
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
				$(node).attr('id', 'btn-new-inspect-outgoing');
				$(node).attr('disabled', false);
			}
		},
		{	
			text : '<span class="mr-2">Edit</span><i class="fas fa-fw fa-edit"></i>', 
			className: 'btn btn-success btn-sm mb-1',
			init: function(api, node, config) {
				$(node).removeClass('dt-button');
				$(node).attr('id', 'btn-edit-inspect-outgoing');
				$(node).attr('disabled', true);
			}
		}
	];

	tableOptIndex['buttons'] = arrayPrepend(tableBtnIndex, selectionExportBtn());

	tableOptIndex['columns'] = [
		{data: "NO"},
		{data: "DATE"},
		{data: "OUTER #"},
		{data: "LOT ID"},
		{data: "CARTON CONDITION"},
		{data: "LABEL & SHIPPING MARK POSITION"},
		{data: "PRINTING CONDITION"},
		{data: "BARCODE CARTON SCANNABLE"},
		{data: "BARCODE LABEL READABLE"},
		{data: "REMARK"},
		{data: "QA INSPEC"},
	];

	tableOptIndex['createdRow'] = function (row, data, dataIndex) {
		$(row).attr('id', 'select-inspection-outgoing-list');
		$(row).attr('data', data.data);
		$(row).attr('stg', false);
	};

	tableOptIndex['columnDefs'] = [
		{
			"targets": [0, 1, 2, 4, 5, 6, 7, 8],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("text-center");
				$(td).addClass("align-middle");
			}
		},
		{
			"targets": [3, 9, 10],
			"createdCell": function (td, cellData, rowData, row, col) {
				$(td).addClass("align-middle");
			}
		}
	];

	let dataTableIndex = $('#datatable-inspection-outgoing').DataTable(tableOptIndex);

	const selectOutgoingInspectionList = (arr) => {
		const btnEdit = $("#btn-edit-inspect-outgoing");

		let tables = $('[id^="select-inspection-outgoing-list"]');
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

	$(document).ready(function () {
		$(".air-badge").html(loadingBackdrop());
		const url = baseUrl("/auth/api/v7/load-inspect");

		const execute = postField(url, 'GET', false, false);
		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {
				let sc = [];
				for (let i = 0; i < obj.result.length; i++) {
					sc[i] = {
						"NO": (i+1),
						"DATE": obj.result[i].inspect_date,
						"OUTER #": obj.result[i].outer_no,
						"LOT ID": obj.result[i].lot_id,
						"CARTON CONDITION": obj.result[i].carton_condition,
						"LABEL & SHIPPING MARK POSITION": obj.result[i].label_shp_condition,
						"PRINTING CONDITION": obj.result[i].print_condition,
						"BARCODE CARTON SCANNABLE": obj.result[i].barcode_carton_scan,
						"BARCODE LABEL READABLE": obj.result[i].barcode_label_read,
						"REMARK": obj.result[i].remark,
						"QA INSPEC": obj.result[i].inspect_qa,
						"data": obj.result[i].id
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

	$(document).keydown(function(event){
		if(event.which == "17") ctrlPressed = true;
		if(event.which == "16") shiftPressed = true;
		if(ctrlPressed && event.which == "65") selectAll = true;

		if (event.keyCode == 65 && event.ctrlKey && selectAll) {
			textSelection('datatable-inspection-outgoing');
			event.preventDefault();
			selectOutgoingInspectionList();
		}
	});

	$(document).keyup(function(){
		ctrlPressed = false;
		shiftPressed = false;
		selectAll = false;
	});

	$(document).on('click', '[id^="select-inspection-outgoing-list"]', function () {
		const myData = $(this);

		selectOutgoingInspectionList(myData);
	});

	$("#new-out-inspect-carton-condition").select2({
		dropdownParent: $('#select2-new-out-inspect-carton-condition')
	});

	$("#new-out-inspect-label-position").select2({
		dropdownParent: $('#select2-new-out-inspect-label-position')
	});

	$("#new-out-inspect-printing-condition").select2({
		dropdownParent: $('#select2-new-out-inspect-printing-condition')
	});

	$("#new-out-inspect-barcode-scan").select2({
		dropdownParent: $('#select2-new-out-inspect-barcode-scan')
	});

	$("#new-out-inspect-label-read").select2({
		dropdownParent: $('#select2-new-out-inspect-label-read')
	});

	$("#edit-out-inspect-carton-condition").select2({
		dropdownParent: $('#select2-edit-out-inspect-carton-condition')
	});

	$("#edit-out-inspect-label-position").select2({
		dropdownParent: $('#select2-edit-out-inspect-label-position')
	});

	$("#edit-out-inspect-printing-condition").select2({
		dropdownParent: $('#select2-edit-out-inspect-printing-condition')
	});

	$("#edit-out-inspect-barcode-scan").select2({
		dropdownParent: $('#select2-edit-out-inspect-barcode-scan')
	});

	$("#edit-out-inspect-label-read").select2({
		dropdownParent: $('#select2-edit-out-inspect-label-read')
	});

	$("#btn-new-inspect-outgoing").click(function () {
		const modal = $("#modal-new-inspection-outgoing");

		modal.modal('show');
	});

	$("#btn-edit-inspect-outgoing").click(function () {
		const modal = $("#modal-edit-inspection-outgoing");
		const inspectDate = $("#edit-out-inspect-date");
		const inspectOuter = $("#edit-out-inspect-outer");
		const inspectLot = $("#edit-out-inspect-lot");
		const inspectCartonCondition = $("#edit-out-inspect-carton-condition");
		const inspectLabelPosition = $("#edit-out-inspect-label-position");
		const inspectPrintingCondition = $("#edit-out-inspect-printing-condition");
		const inspectBarcodeScan = $("#edit-out-inspect-barcode-scan");
		const inspectLabelRead = $("#edit-out-inspect-label-read");
		const inspectRemark = $("#edit-out-inspect-remark");
		const inspectQa = $("#edit-out-inspect-qa");
		const btnSave = $("#btn-save-edit-inspection-outgoing");
		let tables = $('[id^="select-inspection-outgoing-list"]');
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

		const url = baseUrl("/auth/api/v7/get-inspect");
		const execute = postField(url, 'POST', executePost, false);
		execute.done(function(result) {
			let obj = JSON.parse(JSON.stringify(result));

			if (obj.code == 200) {

				inspectCartonCondition.select2({
					dropdownParent: $('#select2-edit-out-inspect-carton-condition')
				}).val(obj.result['carton_condition']).trigger('change');

				inspectLabelPosition.select2({
					dropdownParent: $('#select2-edit-out-inspect-label-position')
				}).val(obj.result['label_shp_condition']).trigger('change');

				inspectPrintingCondition.select2({
					dropdownParent: $('#select2-edit-out-inspect-printing-condition')
				}).val(obj.result['print_condition']).trigger('change');

				inspectBarcodeScan.select2({
					dropdownParent: $('#select2-edit-out-inspect-barcode-scan')
				}).val(obj.result['barcode_carton_scan']).trigger('change');

				inspectLabelRead.select2({
					dropdownParent: $('#select2-edit-out-inspect-label-read')
				}).val(obj.result['barcode_label_read']).trigger('change');

				inspectDate.val(obj.result['inspect_date']);
				inspectOuter.val(obj.result['outer_no']);
				inspectLot.val(obj.result['lot_id']);
				inspectRemark.val(obj.result['remark']);
				inspectQa.val(obj.result['inspect_qa']);

				btnSave.attr('target', id);
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

	$("#btn-save-new-inspection-outgoing").click(function () {
		const modal = $("#modal-new-inspection-outgoing");
		const inspectDate = $("#new-out-inspect-date");
		const inspectOuter = $("#new-out-inspect-outer");
		const inspectLot = $("#new-out-inspect-lot");
		const inspectCartonCondition = $("#new-out-inspect-carton-condition");
		const inspectLabelPosition = $("#new-out-inspect-label-position");
		const inspectPrintingCondition = $("#new-out-inspect-printing-condition");
		const inspectBarcodeScan = $("#new-out-inspect-barcode-scan");
		const inspectLabelRead = $("#new-out-inspect-label-read");
		const inspectRemark = $("#new-out-inspect-remark");
		const inspectQa = $("#new-out-inspect-qa");
		let allow = true;

		if (!inputValidation("#"+inspectDate.attr('id'), "#msg-"+inspectDate.attr('id'))) allow =false;
		if (!inputValidation("#"+inspectOuter.attr('id'), "#msg-"+inspectOuter.attr('id'))) allow =false;
		if (!inputValidation("#"+inspectLot.attr('id'), "#msg-"+inspectLot.attr('id'))) allow =false;
		if (!select2Validation("#"+inspectCartonCondition.attr("id"), "#msg-"+inspectCartonCondition.attr("id"))) allow = false;
		if (!select2Validation("#"+inspectLabelPosition.attr("id"), "#msg-"+inspectLabelPosition.attr("id"))) allow = false;
		if (!select2Validation("#"+inspectPrintingCondition.attr("id"), "#msg-"+inspectPrintingCondition.attr("id"))) allow = false;
		if (!select2Validation("#"+inspectBarcodeScan.attr("id"), "#msg-"+inspectBarcodeScan.attr("id"))) allow = false;
		if (!select2Validation("#"+inspectLabelRead.attr("id"), "#msg-"+inspectLabelRead.attr("id"))) allow = false;
		if (!inputValidation("#"+inspectRemark.attr('id'), "#msg-"+inspectRemark.attr('id'))) allow =false;
		if (!inputValidation("#"+inspectQa.attr('id'), "#msg-"+inspectQa.attr('id'))) allow =false;

		if (!allow) return false;
		modal.modal('hide');
		$(".air-badge").html(loadingBackdrop());

		let params = {
			'inspectDate': inspectDate.val().trim(),
			'inspectOuter': inspectOuter.val().trim(),
			'inspectLot': inspectLot.val().trim(),
			'inspectCartonCondition': inspectCartonCondition.val().trim(),
			'inspectLabelPosition': inspectLabelPosition.val().trim(),
			'inspectPrintingCondition': inspectPrintingCondition.val().trim(),
			'inspectBarcodeScan': inspectBarcodeScan.val().trim(),
			'inspectLabelRead': inspectLabelRead.val().trim(),
			'inspectRemark': inspectRemark.val().trim(),
			'inspectQa': inspectQa.val().trim(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v7/new-inspect");
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

	$("#btn-save-edit-inspection-outgoing").click(function () {
		const modal = $("#modal-edit-inspection-outgoing");
		const inspectDate = $("#edit-out-inspect-date");
		const inspectOuter = $("#edit-out-inspect-outer");
		const inspectLot = $("#edit-out-inspect-lot");
		const inspectCartonCondition = $("#edit-out-inspect-carton-condition");
		const inspectLabelPosition = $("#edit-out-inspect-label-position");
		const inspectPrintingCondition = $("#edit-out-inspect-printing-condition");
		const inspectBarcodeScan = $("#edit-out-inspect-barcode-scan");
		const inspectLabelRead = $("#edit-out-inspect-label-read");
		const inspectRemark = $("#edit-out-inspect-remark");
		const inspectQa = $("#edit-out-inspect-qa");
		const btnSave = $("#btn-save-edit-inspection-outgoing");
		let allow = true;

		if (!inputValidation("#"+inspectDate.attr('id'), "#msg-"+inspectDate.attr('id'))) allow =false;
		if (!inputValidation("#"+inspectOuter.attr('id'), "#msg-"+inspectOuter.attr('id'))) allow =false;
		if (!inputValidation("#"+inspectLot.attr('id'), "#msg-"+inspectLot.attr('id'))) allow =false;
		if (!select2Validation("#"+inspectCartonCondition.attr("id"), "#msg-"+inspectCartonCondition.attr("id"))) allow = false;
		if (!select2Validation("#"+inspectLabelPosition.attr("id"), "#msg-"+inspectLabelPosition.attr("id"))) allow = false;
		if (!select2Validation("#"+inspectPrintingCondition.attr("id"), "#msg-"+inspectPrintingCondition.attr("id"))) allow = false;
		if (!select2Validation("#"+inspectBarcodeScan.attr("id"), "#msg-"+inspectBarcodeScan.attr("id"))) allow = false;
		if (!select2Validation("#"+inspectLabelRead.attr("id"), "#msg-"+inspectLabelRead.attr("id"))) allow = false;
		if (!inputValidation("#"+inspectRemark.attr('id'), "#msg-"+inspectRemark.attr('id'))) allow =false;
		if (!inputValidation("#"+inspectQa.attr('id'), "#msg-"+inspectQa.attr('id'))) allow =false;

		if (!allow) return false;
		modal.modal('hide');
		$(".air-badge").html(loadingBackdrop());

		let params = {
			'inspectDate': inspectDate.val().trim(),
			'inspectOuter': inspectOuter.val().trim(),
			'inspectLot': inspectLot.val().trim(),
			'inspectCartonCondition': inspectCartonCondition.val().trim(),
			'inspectLabelPosition': inspectLabelPosition.val().trim(),
			'inspectPrintingCondition': inspectPrintingCondition.val().trim(),
			'inspectBarcodeScan': inspectBarcodeScan.val().trim(),
			'inspectLabelRead': inspectLabelRead.val().trim(),
			'inspectRemark': inspectRemark.val().trim(),
			'inspectQa': inspectQa.val().trim(),
			'target': btnSave.attr('target'),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v7/edit-inspect");
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

const pageMapConvertAbov = () => {
	let fileConvertResult = [];
	let fileListTmp = false;
	let formData = null;

	const handleFiles = (files) => {
		const fileList = $("#file-list-abov");
		const btnConvert = $("#btn-map-convert-abov");
		const btnDownload = $("#btn-map-download-abov");
		fileList.empty();
		fileListTmp = files;
		
		if (files.length > 0) {
			const ul = $('<ul class="list-group my-2"></ul>');

			let i = 0;
			$.each(files, function(i, file) {
				const fileSize = (file.size / 1024).toFixed(1) + ' KB';
				const li = $(`
					<li class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							${file.name}
							<span class="badge badge-primary text-center ml-auto pl-3 m-1" id="view-before-convert-abov" data="${i}">
								<i class="fas fa-eye"></i>
							</span>
							<span class="badge badge-primary text-center ml-auto pl-3 m-1 d-none" id="view-after-convert-abov" data="${i}">
								<i class="fas fa-eye"></i>
							</span>

							<span class="badge badge-success text-center pl-3 m-1 d-none" id="download-convert-abov" data="${i}">
								<i class="fas fa-download"></i>
							</span>
							<span class="badge badge-danger text-center pl-3 m-1" id="delete-before-convert-abov" data="${i}">
								<i class="fas fa-trash"></i>
							</span>
							<span class="badge bg-secondary rounded-pill">${fileSize}</span>
						</div>
						<div class="progress progress-md d-none" id="progress-convert-page-abov">
							<div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress-convert-abov" data="${i}">0%</div>
						</div>
					</li>
					`);
				ul.append(li);
				i++;
			});

			fileList.append(ul);
			btnConvert.removeClass("d-none");
			btnConvert.attr("disabled", false);
		}

		if (files.length <= 0) {
			btnConvert.addClass("d-none");
			btnConvert.attr("disabled", true);
		}
		btnDownload.addClass("d-none");
		btnDownload.attr("disabled", true);
	}

	const progressBar = (percentage, index, status) => {
		let progressTables = $('[id^="progress-convert-abov"]');
		let prog = progressTables.eq(index);

		if (percentage <= 99) {
			prog.removeClass("bg-success");
			prog.removeClass("bg-danger");
		}

		if (!status) {
			prog.attr("style", "width: 100%;");
			prog.text('Failed');
			prog.removeClass("bg-success");
			prog.addClass("bg-danger");
		}

		if (status) {
			prog.attr("style", "width: "+percentage+'%'+";");
			prog.text(percentage+'%');
			if (percentage == 100) {
				prog.removeClass("bg-danger");
				prog.addClass("bg-success");
			}
		}
	}

	$("#btn-file-input-abov").click(function(e) {
		$("#file-input-abov").click();
	});

	$("#file-input-abov").on('change', function() {
		handleFiles(this.files);
	});

	$(document).on('dragenter dragover dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$("#drop-zone-abov").on('dragenter dragover', function() {
		$(this).addClass('dragover');
	});

	$("#drop-zone-abov").on('dragleave drop', function() {
		$(this).removeClass('dragover');
	});

	$("#drop-zone-abov").on('drop', function(e) {
		const files = e.originalEvent.dataTransfer.files;
		handleFiles(files);
	});

	$(document).on('click', '[id^="view-before-convert-abov"]', async function () {
		const modal = $("#modal-map-before-convert-abov");
		const mapText = $("#text-map-before-convert-abov");
		const myData = $(this);
		const file = fileListTmp[myData.attr('data')];

		mapText.val(await openFile(file));
		modal.modal('show');
	});

	$(document).on('click', '[id^="view-after-convert-abov"]', async function () {
		const modal = $("#modal-map-after-convert-abov");
		const mapView = $("#map-container-after-convert-abov");
		const mapDesc = $("#map-decs-after-convert-abov");
		const myData = $(this);
		const mapText = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		const descMap = fileConvertResult[myData.attr('data')]['mapData']['desc'];
		const keys = Object.keys(descMap);
		const opt = fileConvertResult[myData.attr('data')]['mapData']['opt'];
		const csv = fileConvertResult[myData.attr('data')]['csv'];

		mapDesc.empty();
		$.each(keys, function(i, key) {
			const s = `<div class="mx-2"><span class="badge border border-dark ${descMap[key][1]}">${key}</span> ${descMap[key][0]} - ${descMap[key][2]}</div>`
			mapDesc.append(s);
		});

		renderWaferMap(mapView, mapText, opt);
		modal.modal('show');
	});

	$(document).on('click', '[id^="download-convert-abov"]', async function () {
		const myData = $(this);
		let wafermapData = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		let csvData = fileConvertResult[myData.attr('data')]['csv']['header']+"\n";
		csvData += fileConvertResult[myData.attr('data')]['csv']['container'];

		let mapFilename = fileConvertResult[myData.attr('data')]['mapData']['filename'];
		let csvFilename = fileConvertResult[myData.attr('data')]['csv']['filename'];

		saveAs(wafermapData, mapFilename);
		saveAs(csvData, csvFilename);
	});

	$(document).on('click', '[id^="delete-before-convert-abov"]', function () {
		const myData = $(this);
		const fileOrder = myData.attr('data');
		let fileArray = Array.from(fileListTmp);
		fileArray.splice(fileOrder, 1);

		const dataTransfer = new DataTransfer();
		fileArray.forEach(file => dataTransfer.items.add(file));
		fileListTmp = dataTransfer.files;
		handleFiles(fileListTmp);
	});

	$("#btn-map-convert-abov").click(async function () {
		const btnConvert = $("#btn-map-convert-abov");
		const btnDownload = $("#btn-map-download-abov");

		if (fileListTmp.length <= 0) {
			$(".air-badge").html(airBadge("Please choose a map file" , 'danger'));
			return false;
		}

		let progressFileTables = $('[id^="progress-convert-page-abov"]');
		let saveAsFileTables = $('[id^="download-convert-abov"]');

		let viewBeforeConvert = $('[id^="view-before-convert-abov"]');
		let viewAfterConvert = $('[id^="view-after-convert-abov"]');
		for (let i = 0; i < progressFileTables.length; i++) {
			progressFileTables.eq(i).removeClass("d-none");
		}

		let convertOK = 0;
		fileConvertResult = [];
		for (let i = 0; i < fileListTmp.length; i++) {
			formData = new FormData();
			formData.append('mapfile', fileListTmp[i]);
			const url = baseUrl("/auth/api/v80/wafermap-abov");
			const execute = await postField(url, 'POST', formData, false, true, progressBar, i);


			try {
				let obj = (typeof execute === "string") ? JSON.parse(execute) : execute;
				if (obj.code == 200) {
					saveAsFileTables.eq(i).removeClass("d-none");
					viewBeforeConvert.eq(i).addClass("d-none");
					viewAfterConvert.eq(i).removeClass("d-none");
					progressBar(100, i, true);

					btnConvert.addClass("d-none");
					btnConvert.attr("disabled", true);
					fileConvertResult.push(obj.result);
					fileListTmp[i]['convert'] = true;
					convertOK++;
				} else {
					fileConvertResult.push(
						{
							"convert": false,
						}
					);
					fileListTmp[i]['convert'] = false;
					progressBar(0, i, false);
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			} catch (error) {
				fileConvertResult.push(
					{
						"convert": false,
					}
				);
				fileListTmp[i]['convert'] = false;
				progressBar(0, i, false);
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			}
		}

		for (let i = 0; i < fileListTmp.length; i++) {
			if (fileListTmp[i]['convert']) progressFileTables.eq(i).addClass("d-none");
		}

		if (convertOK >= 1) {
			btnDownload.removeClass("d-none");
			btnDownload.attr("disabled", false);
		}
	});

	$("#btn-map-download-abov").click(async function () {
		const zip = new JSZip();

		let csvHeader = "";
		let csvData = "";
		for (let i = 0; i < fileConvertResult.length; i++) {
			if (fileConvertResult[i]['convert']) {
				await zip.file(fileConvertResult[i]['mapData']['filename'], fileConvertResult[i]['mapData']['wafermap']);

				if (csvHeader == "") {
					csvHeader = fileConvertResult[i]['csv']['header'];
				}

				if (csvHeader != "") {
					csvData += fileConvertResult[i]['csv']['container']+"\n";
				}
			}
		}

		if (csvHeader != "") {
			let CSV_DataFinish = csvHeader+"\n"+csvData;
			await zip.file("convert.csv", CSV_DataFinish);
		}

		zip.generateAsync({type:"blob"}).then(function(content) {
			const zipName = $(".main-js").attr("data-containt")+"_"+getTimestamp()+".zip";
		    saveAs(content, zipName);
		});
	});
}

const pageMapConvertAdvanide = () => {
	let fileConvertResult = [];
	let fileListTmp = false;
	let formData = null;

	const handleFiles = (files) => {
		const fileList = $("#file-list-advanide");
		const btnConvert = $("#btn-map-convert-advanide");
		const btnDownload = $("#btn-map-download-advanide");
		fileList.empty();
		fileListTmp = files;
		
		if (files.length > 0) {
			const ul = $('<ul class="list-group my-2"></ul>');

			let i = 0;
			$.each(files, function(i, file) {
				const fileSize = (file.size / 1024).toFixed(1) + ' KB';
				const li = $(`
					<li class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							${file.name}
							<span class="badge badge-primary text-center ml-auto pl-3 m-1" id="view-before-convert-advanide" data="${i}">
								<i class="fas fa-eye"></i>
							</span>
							<span class="badge badge-primary text-center ml-auto pl-3 m-1 d-none" id="view-after-convert-advanide" data="${i}">
								<i class="fas fa-eye"></i>
							</span>

							<span class="badge badge-success text-center pl-3 m-1 d-none" id="download-convert-advanide" data="${i}">
								<i class="fas fa-download"></i>
							</span>
							<span class="badge badge-danger text-center pl-3 m-1" id="delete-before-convert-advanide" data="${i}">
								<i class="fas fa-trash"></i>
							</span>
							<span class="badge bg-secondary rounded-pill">${fileSize}</span>
						</div>
						<div class="progress progress-md d-none" id="progress-convert-page-advanide">
							<div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress-convert-advanide" data="${i}">0%</div>
						</div>
					</li>
					`);
				ul.append(li);
				i++;
			});

			fileList.append(ul);
			btnConvert.removeClass("d-none");
			btnConvert.attr("disabled", false);
		}

		if (files.length <= 0) {
			btnConvert.addClass("d-none");
			btnConvert.attr("disabled", true);
		}
		btnDownload.addClass("d-none");
		btnDownload.attr("disabled", true);
	}

	const progressBar = (percentage, index, status) => {
		let progressTables = $('[id^="progress-convert-advanide"]');
		let prog = progressTables.eq(index);

		if (percentage <= 99) {
			prog.removeClass("bg-success");
			prog.removeClass("bg-danger");
		}

		if (!status) {
			prog.attr("style", "width: 100%;");
			prog.text('Failed');
			prog.removeClass("bg-success");
			prog.addClass("bg-danger");
		}

		if (status) {
			prog.attr("style", "width: "+percentage+'%'+";");
			prog.text(percentage+'%');
			if (percentage == 100) {
				prog.removeClass("bg-danger");
				prog.addClass("bg-success");
			}
		}
	}

	$("#btn-file-input-advanide").click(function(e) {
		$("#file-input-advanide").click();
	});

	$("#file-input-advanide").on('change', function() {
		handleFiles(this.files);
	});

	$(document).on('dragenter dragover dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$("#drop-zone-advanide").on('dragenter dragover', function() {
		$(this).addClass('dragover');
	});

	$("#drop-zone-advanide").on('dragleave drop', function() {
		$(this).removeClass('dragover');
	});

	$("#drop-zone-advanide").on('drop', function(e) {
		const files = e.originalEvent.dataTransfer.files;
		handleFiles(files);
	});

	$(document).on('click', '[id^="view-before-convert-advanide"]', async function () {
		const modal = $("#modal-map-before-convert-advanide");
		const mapText = $("#text-map-before-convert-advanide");
		const myData = $(this);
		const file = fileListTmp[myData.attr('data')];

		mapText.val(await openFile(file));
		modal.modal('show');
	});

	$(document).on('click', '[id^="view-after-convert-advanide"]', async function () {
		const modal = $("#modal-map-after-convert-advanide");
		const mapView = $("#map-container-after-convert-advanide");
		const mapDesc = $("#map-decs-after-convert-advanide");
		const myData = $(this);
		const mapText = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		const descMap = fileConvertResult[myData.attr('data')]['mapData']['desc'];
		const keys = Object.keys(descMap);
		const opt = fileConvertResult[myData.attr('data')]['mapData']['opt'];
		const csv = fileConvertResult[myData.attr('data')]['csv'];

		mapDesc.empty();
		$.each(keys, function(i, key) {
			const s = `<div class="mx-2"><span class="badge border border-dark ${descMap[key][1]}">${key}</span> ${descMap[key][0]} - ${descMap[key][2]}</div>`
			mapDesc.append(s);
		});

		renderWaferMap(mapView, mapText, opt);
		modal.modal('show');
	});

	$(document).on('click', '[id^="download-convert-advanide"]', async function () {
		const myData = $(this);
		let wafermapData = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		let csvData = fileConvertResult[myData.attr('data')]['csv']['header']+"\n";
		csvData += fileConvertResult[myData.attr('data')]['csv']['container'];

		let mapFilename = fileConvertResult[myData.attr('data')]['mapData']['filename'];
		let csvFilename = fileConvertResult[myData.attr('data')]['csv']['filename'];

		saveAs(wafermapData, mapFilename);
		saveAs(csvData, csvFilename);
	});

	$(document).on('click', '[id^="delete-before-convert-advanide"]', function () {
		const myData = $(this);
		const fileOrder = myData.attr('data');
		let fileArray = Array.from(fileListTmp);
		fileArray.splice(fileOrder, 1);

		const dataTransfer = new DataTransfer();
		fileArray.forEach(file => dataTransfer.items.add(file));
		fileListTmp = dataTransfer.files;
		handleFiles(fileListTmp);
	});

	$("#wafer-code-advanide").select2({
		dropdownParent: $('#select2-wafer-code-advanide')
	});

	$("#btn-map-convert-advanide").click(async function () {
		const btnConvert = $("#btn-map-convert-advanide");
		const btnDownload = $("#btn-map-download-advanide");
		const waferCode = $("#wafer-code-advanide");
		let allow = true;

		if (!select2Validation("#"+waferCode.attr("id"), "#msg-"+waferCode.attr("id"))) allow = false;
		if (!allow) return false;

		if (fileListTmp.length <= 0) {
			$(".air-badge").html(airBadge("Please choose a map file" , 'danger'));
			return false;
		}

		let progressFileTables = $('[id^="progress-convert-page-advanide"]');
		let saveAsFileTables = $('[id^="download-convert-advanide"]');

		let viewBeforeConvert = $('[id^="view-before-convert-advanide"]');
		let viewAfterConvert = $('[id^="view-after-convert-advanide"]');
		for (let i = 0; i < progressFileTables.length; i++) {
			progressFileTables.eq(i).removeClass("d-none");
		}

		let params = {
			'wafer-code': waferCode.val().trim(),
		};

		let convertOK = 0;
		fileConvertResult = [];
		for (let i = 0; i < fileListTmp.length; i++) {
			formData = new FormData();
			formData.append('data', JEncrypt(JSON.stringify(params)));
			formData.append('mapfile', fileListTmp[i]);
			const url = baseUrl("/auth/api/v80/wafermap-advanide");
			const execute = await postField(url, 'POST', formData, false, true, progressBar, i);


			try {
				let obj = (typeof execute === "string") ? JSON.parse(execute) : execute;
				if (obj.code == 200) {
					saveAsFileTables.eq(i).removeClass("d-none");
					viewBeforeConvert.eq(i).addClass("d-none");
					viewAfterConvert.eq(i).removeClass("d-none");
					progressBar(100, i, true);

					btnConvert.addClass("d-none");
					btnConvert.attr("disabled", true);
					fileConvertResult.push(obj.result);
					fileListTmp[i]['convert'] = true;
					convertOK++;
				} else {
					fileConvertResult.push(
						{
							"convert": false,
						}
					);
					fileListTmp[i]['convert'] = false;
					progressBar(0, i, false);
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			} catch (error) {
				fileConvertResult.push(
					{
						"convert": false,
					}
				);
				fileListTmp[i]['convert'] = false;
				progressBar(0, i, false);
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			}
		}

		for (let i = 0; i < fileListTmp.length; i++) {
			if (fileListTmp[i]['convert']) progressFileTables.eq(i).addClass("d-none");
		}

		if (convertOK >= 1) {
			btnDownload.removeClass("d-none");
			btnDownload.attr("disabled", false);
		}
	});

	$("#btn-map-download-advanide").click(async function () {
		const zip = new JSZip();

		let csvHeader = "";
		let csvData = "";
		for (let i = 0; i < fileConvertResult.length; i++) {
			if (fileConvertResult[i]['convert']) {
				await zip.file(fileConvertResult[i]['mapData']['filename'], fileConvertResult[i]['mapData']['wafermap']);

				if (csvHeader == "") {
					csvHeader = fileConvertResult[i]['csv']['header'];
				}

				if (csvHeader != "") {
					csvData += fileConvertResult[i]['csv']['container']+"\n";
				}
			}
		}

		if (csvHeader != "") {
			let CSV_DataFinish = csvHeader+"\n"+csvData;
			await zip.file("convert.csv", CSV_DataFinish);
		}

		zip.generateAsync({type:"blob"}).then(function(content) {
			const zipName = $(".main-js").attr("data-containt")+"_"+getTimestamp()+".zip";
		    saveAs(content, zipName);
		});
	});
}

const pageMapConvertAdvanideEU = () => {
	console.log("pageMapConvertAdvanideEU");
}

const pageMapConvertHid = () => {
	let fileConvertResult = [];
	let fileListTmp = false;
	let formData = null;

	const handleFiles = (files) => {
		const fileList = $("#file-list-hid");
		const btnConvert = $("#btn-map-convert-hid");
		const btnDownload = $("#btn-map-download-hid");
		fileList.empty();
		fileListTmp = files;
		
		if (files.length > 0) {
			const ul = $('<ul class="list-group my-2"></ul>');

			let i = 0;
			$.each(files, function(i, file) {
				const fileSize = (file.size / 1024).toFixed(1) + ' KB';
				const li = $(`
					<li class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							${file.name}
							<span class="badge badge-primary text-center ml-auto pl-3 m-1" id="view-before-convert-hid" data="${i}">
								<i class="fas fa-eye"></i>
							</span>
							<span class="badge badge-primary text-center ml-auto pl-3 m-1 d-none" id="view-after-convert-hid" data="${i}">
								<i class="fas fa-eye"></i>
							</span>

							<span class="badge badge-success text-center pl-3 m-1 d-none" id="download-convert-hid" data="${i}">
								<i class="fas fa-download"></i>
							</span>
							<span class="badge badge-danger text-center pl-3 m-1" id="delete-before-convert-hid" data="${i}">
								<i class="fas fa-trash"></i>
							</span>
							<span class="badge bg-secondary rounded-pill">${fileSize}</span>
						</div>
						<div class="progress progress-md d-none" id="progress-convert-page-hid">
							<div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress-convert-hid" data="${i}">0%</div>
						</div>
					</li>
					`);
				ul.append(li);
				i++;
			});

			fileList.append(ul);
			btnConvert.removeClass("d-none");
			btnConvert.attr("disabled", false);
		}

		if (files.length <= 0) {
			btnConvert.addClass("d-none");
			btnConvert.attr("disabled", true);
		}
		btnDownload.addClass("d-none");
		btnDownload.attr("disabled", true);
	}

	const progressBar = (percentage, index, status) => {
		let progressTables = $('[id^="progress-convert-hid"]');
		let prog = progressTables.eq(index);

		if (percentage <= 99) {
			prog.removeClass("bg-success");
			prog.removeClass("bg-danger");
		}

		if (!status) {
			prog.attr("style", "width: 100%;");
			prog.text('Failed');
			prog.removeClass("bg-success");
			prog.addClass("bg-danger");
		}

		if (status) {
			prog.attr("style", "width: "+percentage+'%'+";");
			prog.text(percentage+'%');
			if (percentage == 100) {
				prog.removeClass("bg-danger");
				prog.addClass("bg-success");
			}
		}
	}

	$("#btn-file-input-hid").click(function(e) {
		$("#file-input-hid").click();
	});

	$("#file-input-hid").on('change', function() {
		handleFiles(this.files);
	});

	$(document).on('dragenter dragover dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$("#drop-zone-hid").on('dragenter dragover', function() {
		$(this).addClass('dragover');
	});

	$("#drop-zone-hid").on('dragleave drop', function() {
		$(this).removeClass('dragover');
	});

	$("#drop-zone-hid").on('drop', function(e) {
		const files = e.originalEvent.dataTransfer.files;
		handleFiles(files);
	});

	$(document).on('click', '[id^="view-before-convert-hid"]', async function () {
		const modal = $("#modal-map-before-convert-hid");
		const mapText = $("#text-map-before-convert-hid");
		const myData = $(this);
		const file = fileListTmp[myData.attr('data')];

		mapText.val(await openFile(file));
		modal.modal('show');
	});

	$(document).on('click', '[id^="view-after-convert-hid"]', async function () {
		const modal = $("#modal-map-after-convert-hid");
		const mapView = $("#map-container-after-convert-hid");
		const mapDesc = $("#map-decs-after-convert-hid");
		const myData = $(this);
		const mapText = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		const descMap = fileConvertResult[myData.attr('data')]['mapData']['desc'];
		const keys = Object.keys(descMap);
		const opt = fileConvertResult[myData.attr('data')]['mapData']['opt'];
		const csv = fileConvertResult[myData.attr('data')]['csv'];

		mapDesc.empty();
		$.each(keys, function(i, key) {
			const s = `<div class="mx-2"><span class="badge border border-dark ${descMap[key][1]}">${key}</span> ${descMap[key][0]} - ${descMap[key][2]}</div>`
			mapDesc.append(s);
		});

		renderWaferMap(mapView, mapText, opt);
		modal.modal('show');
	});

	$(document).on('click', '[id^="download-convert-hid"]', async function () {
		const myData = $(this);
		let wafermapData = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		let csvData = fileConvertResult[myData.attr('data')]['csv']['header']+"\n";
		csvData += fileConvertResult[myData.attr('data')]['csv']['container'];

		let mapFilename = fileConvertResult[myData.attr('data')]['mapData']['filename'];
		let csvFilename = fileConvertResult[myData.attr('data')]['csv']['filename'];

		saveAs(wafermapData, mapFilename);
		saveAs(csvData, csvFilename);
	});

	$(document).on('click', '[id^="delete-before-convert-hid"]', function () {
		const myData = $(this);
		const fileOrder = myData.attr('data');
		let fileArray = Array.from(fileListTmp);
		fileArray.splice(fileOrder, 1);

		const dataTransfer = new DataTransfer();
		fileArray.forEach(file => dataTransfer.items.add(file));
		fileListTmp = dataTransfer.files;
		handleFiles(fileListTmp);
	});

	$("#btn-map-convert-hid").click(async function () {
		const btnConvert = $("#btn-map-convert-hid");
		const btnDownload = $("#btn-map-download-hid");

		if (fileListTmp.length <= 0) {
			$(".air-badge").html(airBadge("Please choose a map file" , 'danger'));
			return false;
		}

		let progressFileTables = $('[id^="progress-convert-page-hid"]');
		let saveAsFileTables = $('[id^="download-convert-hid"]');

		let viewBeforeConvert = $('[id^="view-before-convert-hid"]');
		let viewAfterConvert = $('[id^="view-after-convert-hid"]');
		for (let i = 0; i < progressFileTables.length; i++) {
			progressFileTables.eq(i).removeClass("d-none");
		}

		let convertOK = 0;
		fileConvertResult = [];
		for (let i = 0; i < fileListTmp.length; i++) {
			formData = new FormData();
			formData.append('mapfile', fileListTmp[i]);
			const url = baseUrl("/auth/api/v80/wafermap-hid");
			const execute = await postField(url, 'POST', formData, false, true, progressBar, i);


			try {
				let obj = (typeof execute === "string") ? JSON.parse(execute) : execute;
				if (obj.code == 200) {
					saveAsFileTables.eq(i).removeClass("d-none");
					viewBeforeConvert.eq(i).addClass("d-none");
					viewAfterConvert.eq(i).removeClass("d-none");
					progressBar(100, i, true);

					btnConvert.addClass("d-none");
					btnConvert.attr("disabled", true);
					fileConvertResult.push(obj.result);
					fileListTmp[i]['convert'] = true;
					convertOK++;
				} else {
					fileConvertResult.push(
						{
							"convert": false,
						}
					);
					fileListTmp[i]['convert'] = false;
					progressBar(0, i, false);
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			} catch (error) {
				fileConvertResult.push(
					{
						"convert": false,
					}
				);
				fileListTmp[i]['convert'] = false;
				progressBar(0, i, false);
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			}
		}

		for (let i = 0; i < fileListTmp.length; i++) {
			if (fileListTmp[i]['convert']) progressFileTables.eq(i).addClass("d-none");
		}

		if (convertOK >= 1) {
			btnDownload.removeClass("d-none");
			btnDownload.attr("disabled", false);
		}
	});

	$("#btn-map-download-hid").click(async function () {
		const zip = new JSZip();

		let csvHeader = "";
		let csvData = "";
		for (let i = 0; i < fileConvertResult.length; i++) {
			if (fileConvertResult[i]['convert']) {
				await zip.file(fileConvertResult[i]['mapData']['filename'], fileConvertResult[i]['mapData']['wafermap']);

				if (csvHeader == "") {
					csvHeader = fileConvertResult[i]['csv']['header'];
				}

				if (csvHeader != "") {
					csvData += fileConvertResult[i]['csv']['container']+"\n";
				}
			}
		}

		if (csvHeader != "") {
			let CSV_DataFinish = csvHeader+"\n"+csvData;
			await zip.file("convert.csv", CSV_DataFinish);
		}

		zip.generateAsync({type:"blob"}).then(function(content) {
			const zipName = $(".main-js").attr("data-containt")+"_"+getTimestamp()+".zip";
		    saveAs(content, zipName);
		});
	});
}

const pageMapConvertLegic = () => {
	let fileConvertResult = [];
	let fileListTmp = false;
	let formData = null;

	const handleFiles = (files) => {
		const fileList = $("#file-list-legic");
		const btnConvert = $("#btn-map-convert-legic");
		const btnDownload = $("#btn-map-download-legic");
		fileList.empty();
		fileListTmp = files;
		
		if (files.length > 0) {
			const ul = $('<ul class="list-group my-2"></ul>');

			let i = 0;
			$.each(files, function(i, file) {
				const fileSize = (file.size / 1024).toFixed(1) + ' KB';
				const li = $(`
					<li class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							${file.name}
							<span class="badge badge-primary text-center ml-auto pl-3 m-1" id="view-before-convert-legic" data="${i}">
								<i class="fas fa-eye"></i>
							</span>
							<span class="badge badge-primary text-center ml-auto pl-3 m-1 d-none" id="view-after-convert-legic" data="${i}">
								<i class="fas fa-eye"></i>
							</span>

							<span class="badge badge-success text-center pl-3 m-1 d-none" id="download-convert-legic" data="${i}">
								<i class="fas fa-download"></i>
							</span>
							<span class="badge badge-danger text-center pl-3 m-1" id="delete-before-convert-legic" data="${i}">
								<i class="fas fa-trash"></i>
							</span>
							<span class="badge bg-secondary rounded-pill">${fileSize}</span>
						</div>
						<div class="progress progress-md d-none" id="progress-convert-page-legic">
							<div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress-convert-legic" data="${i}">0%</div>
						</div>
					</li>
					`);
				ul.append(li);
				i++;
			});

			fileList.append(ul);
			btnConvert.removeClass("d-none");
			btnConvert.attr("disabled", false);
		}

		if (files.length <= 0) {
			btnConvert.addClass("d-none");
			btnConvert.attr("disabled", true);
		}
		btnDownload.addClass("d-none");
		btnDownload.attr("disabled", true);
	}

	const progressBar = (percentage, index, status) => {
		let progressTables = $('[id^="progress-convert-legic"]');
		let prog = progressTables.eq(index);

		if (percentage <= 99) {
			prog.removeClass("bg-success");
			prog.removeClass("bg-danger");
		}

		if (!status) {
			prog.attr("style", "width: 100%;");
			prog.text('Failed');
			prog.removeClass("bg-success");
			prog.addClass("bg-danger");
		}

		if (status) {
			prog.attr("style", "width: "+percentage+'%'+";");
			prog.text(percentage+'%');
			if (percentage == 100) {
				prog.removeClass("bg-danger");
				prog.addClass("bg-success");
			}
		}
	}

	$("#btn-file-input-legic").click(function(e) {
		$("#file-input-legic").click();
	});

	$("#file-input-legic").on('change', function() {
		handleFiles(this.files);
	});

	$(document).on('dragenter dragover dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$("#drop-zone-legic").on('dragenter dragover', function() {
		$(this).addClass('dragover');
	});

	$("#drop-zone-legic").on('dragleave drop', function() {
		$(this).removeClass('dragover');
	});

	$("#drop-zone-legic").on('drop', function(e) {
		const files = e.originalEvent.dataTransfer.files;
		handleFiles(files);
	});

	$(document).on('click', '[id^="view-before-convert-legic"]', async function () {
		const modal = $("#modal-map-before-convert-legic");
		const mapText = $("#text-map-before-convert-legic");
		const myData = $(this);
		const file = fileListTmp[myData.attr('data')];

		mapText.val(await openFile(file));
		modal.modal('show');
	});

	$(document).on('click', '[id^="view-after-convert-legic"]', async function () {
		const modal = $("#modal-map-after-convert-legic");
		const mapView = $("#map-container-after-convert-legic");
		const mapDesc = $("#map-decs-after-convert-legic");
		const myData = $(this);
		const mapText = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		const descMap = fileConvertResult[myData.attr('data')]['mapData']['desc'];
		const keys = Object.keys(descMap);
		const opt = fileConvertResult[myData.attr('data')]['mapData']['opt'];
		const csv = fileConvertResult[myData.attr('data')]['csv'];

		mapDesc.empty();
		$.each(keys, function(i, key) {
			const s = `<div class="mx-2"><span class="badge border border-dark ${descMap[key][1]}">${key}</span> ${descMap[key][0]} - ${descMap[key][2]}</div>`
			mapDesc.append(s);
		});

		renderWaferMap(mapView, mapText, opt);
		modal.modal('show');
	});

	$(document).on('click', '[id^="download-convert-legic"]', async function () {
		const myData = $(this);
		let wafermapData = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		let csvData = fileConvertResult[myData.attr('data')]['csv']['header']+"\n";
		csvData += fileConvertResult[myData.attr('data')]['csv']['container'];

		let mapFilename = fileConvertResult[myData.attr('data')]['mapData']['filename'];
		let csvFilename = fileConvertResult[myData.attr('data')]['csv']['filename'];

		saveAs(wafermapData, mapFilename);
		saveAs(csvData, csvFilename);
	});

	$(document).on('click', '[id^="delete-before-convert-legic"]', function () {
		const myData = $(this);
		const fileOrder = myData.attr('data');
		let fileArray = Array.from(fileListTmp);
		fileArray.splice(fileOrder, 1);

		const dataTransfer = new DataTransfer();
		fileArray.forEach(file => dataTransfer.items.add(file));
		fileListTmp = dataTransfer.files;
		handleFiles(fileListTmp);
	});

	$("#wafer-code-legic").select2({
		dropdownParent: $('#select2-wafer-code-legic')
	});

	$("#btn-map-convert-legic").click(async function () {
		const btnConvert = $("#btn-map-convert-legic");
		const btnDownload = $("#btn-map-download-legic");
		const waferCode = $("#wafer-code-legic");
		let allow = true;

		if (!select2Validation("#"+waferCode.attr("id"), "#msg-"+waferCode.attr("id"))) allow = false;
		if (!allow) return false;

		if (fileListTmp.length <= 0) {
			$(".air-badge").html(airBadge("Please choose a map file" , 'danger'));
			return false;
		}

		let progressFileTables = $('[id^="progress-convert-page-legic"]');
		let saveAsFileTables = $('[id^="download-convert-legic"]');

		let viewBeforeConvert = $('[id^="view-before-convert-legic"]');
		let viewAfterConvert = $('[id^="view-after-convert-legic"]');
		for (let i = 0; i < progressFileTables.length; i++) {
			progressFileTables.eq(i).removeClass("d-none");
		}

		let params = {
			'wafer-code': waferCode.val().trim(),
		};

		let convertOK = 0;
		fileConvertResult = [];
		for (let i = 0; i < fileListTmp.length; i++) {
			formData = new FormData();
			formData.append('data', JEncrypt(JSON.stringify(params)));
			formData.append('mapfile', fileListTmp[i]);
			const url = baseUrl("/auth/api/v80/wafermap-legic");
			const execute = await postField(url, 'POST', formData, false, true, progressBar, i);


			try {
				let obj = (typeof execute === "string") ? JSON.parse(execute) : execute;
				if (obj.code == 200) {
					saveAsFileTables.eq(i).removeClass("d-none");
					viewBeforeConvert.eq(i).addClass("d-none");
					viewAfterConvert.eq(i).removeClass("d-none");
					progressBar(100, i, true);

					btnConvert.addClass("d-none");
					btnConvert.attr("disabled", true);
					fileConvertResult.push(obj.result);
					fileListTmp[i]['convert'] = true;
					convertOK++;
				} else {
					fileConvertResult.push(
						{
							"convert": false,
						}
					);
					fileListTmp[i]['convert'] = false;
					progressBar(0, i, false);
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			} catch (error) {
				fileConvertResult.push(
					{
						"convert": false,
					}
				);
				fileListTmp[i]['convert'] = false;
				progressBar(0, i, false);
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			}
		}

		for (let i = 0; i < fileListTmp.length; i++) {
			if (fileListTmp[i]['convert']) progressFileTables.eq(i).addClass("d-none");
		}

		if (convertOK >= 1) {
			btnDownload.removeClass("d-none");
			btnDownload.attr("disabled", false);
		}
	});

	$("#btn-map-download-legic").click(async function () {
		const zip = new JSZip();

		let csvHeader = "";
		let csvData = "";
		for (let i = 0; i < fileConvertResult.length; i++) {
			if (fileConvertResult[i]['convert']) {
				await zip.file(fileConvertResult[i]['mapData']['filename'], fileConvertResult[i]['mapData']['wafermap']);

				if (csvHeader == "") {
					csvHeader = fileConvertResult[i]['csv']['header'];
				}

				if (csvHeader != "") {
					csvData += fileConvertResult[i]['csv']['container']+"\n";
				}
			}
		}

		if (csvHeader != "") {
			let CSV_DataFinish = csvHeader+"\n"+csvData;
			await zip.file("convert.csv", CSV_DataFinish);
		}

		zip.generateAsync({type:"blob"}).then(function(content) {
			const zipName = $(".main-js").attr("data-containt")+"_"+getTimestamp()+".zip";
		    saveAs(content, zipName);
		});
	});
}

const pageMapConvertLinxens = () => {
	let fileConvertResult = [];
	let fileListTmp = false;
	let formData = null;

	const handleFiles = (files) => {
		const fileList = $("#file-list-linxens");
		const btnConvert = $("#btn-map-convert-linxens");
		const btnDownload = $("#btn-map-download-linxens");
		fileList.empty();
		fileListTmp = files;
		
		if (files.length > 0) {
			const ul = $('<ul class="list-group my-2"></ul>');

			let i = 0;
			$.each(files, function(i, file) {
				const fileSize = (file.size / 1024).toFixed(1) + ' KB';
				const li = $(`
					<li class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							${file.name}
							<span class="badge badge-primary text-center ml-auto pl-3 m-1" id="view-before-convert-linxens" data="${i}">
								<i class="fas fa-eye"></i>
							</span>
							<span class="badge badge-primary text-center ml-auto pl-3 m-1 d-none" id="view-after-convert-linxens" data="${i}">
								<i class="fas fa-eye"></i>
							</span>

							<span class="badge badge-success text-center pl-3 m-1 d-none" id="download-convert-linxens" data="${i}">
								<i class="fas fa-download"></i>
							</span>
							<span class="badge badge-danger text-center pl-3 m-1" id="delete-before-convert-linxens" data="${i}">
								<i class="fas fa-trash"></i>
							</span>
							<span class="badge bg-secondary rounded-pill">${fileSize}</span>
						</div>
						<div class="progress progress-md d-none" id="progress-convert-page-linxens">
							<div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress-convert-linxens" data="${i}">0%</div>
						</div>
					</li>
					`);
				ul.append(li);
				i++;
			});

			fileList.append(ul);
			btnConvert.removeClass("d-none");
			btnConvert.attr("disabled", false);
		}

		if (files.length <= 0) {
			btnConvert.addClass("d-none");
			btnConvert.attr("disabled", true);
		}
		btnDownload.addClass("d-none");
		btnDownload.attr("disabled", true);
	}

	const progressBar = (percentage, index, status) => {
		let progressTables = $('[id^="progress-convert-linxens"]');
		let prog = progressTables.eq(index);

		if (percentage <= 99) {
			prog.removeClass("bg-success");
			prog.removeClass("bg-danger");
		}

		if (!status) {
			prog.attr("style", "width: 100%;");
			prog.text('Failed');
			prog.removeClass("bg-success");
			prog.addClass("bg-danger");
		}

		if (status) {
			prog.attr("style", "width: "+percentage+'%'+";");
			prog.text(percentage+'%');
			if (percentage == 100) {
				prog.removeClass("bg-danger");
				prog.addClass("bg-success");
			}
		}
	}

	$("#btn-file-input-linxens").click(function(e) {
		$("#file-input-linxens").click();
	});

	$("#file-input-linxens").on('change', function() {
		handleFiles(this.files);
	});

	$(document).on('dragenter dragover dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$("#drop-zone-linxens").on('dragenter dragover', function() {
		$(this).addClass('dragover');
	});

	$("#drop-zone-linxens").on('dragleave drop', function() {
		$(this).removeClass('dragover');
	});

	$("#drop-zone-linxens").on('drop', function(e) {
		const files = e.originalEvent.dataTransfer.files;
		handleFiles(files);
	});

	$(document).on('click', '[id^="view-before-convert-linxens"]', async function () {
		const modal = $("#modal-map-before-convert-linxens");
		const mapText = $("#text-map-before-convert-linxens");
		const myData = $(this);
		const file = fileListTmp[myData.attr('data')];

		mapText.val(await openFile(file));
		modal.modal('show');
	});

	$(document).on('click', '[id^="view-after-convert-linxens"]', async function () {
		const modal = $("#modal-map-after-convert-linxens");
		const mapView = $("#map-container-after-convert-linxens");
		const mapDesc = $("#map-decs-after-convert-linxens");
		const myData = $(this);
		const mapText = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		const descMap = fileConvertResult[myData.attr('data')]['mapData']['desc'];
		const keys = Object.keys(descMap);
		const opt = fileConvertResult[myData.attr('data')]['mapData']['opt'];
		const csv = fileConvertResult[myData.attr('data')]['csv'];

		mapDesc.empty();
		$.each(keys, function(i, key) {
			const s = `<div class="mx-2"><span class="badge border border-dark ${descMap[key][1]}">${key}</span> ${descMap[key][0]} - ${descMap[key][2]}</div>`
			mapDesc.append(s);
		});

		renderWaferMap(mapView, mapText, opt);
		modal.modal('show');
	});

	$(document).on('click', '[id^="download-convert-linxens"]', async function () {
		const myData = $(this);
		let wafermapData = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		let csvData = fileConvertResult[myData.attr('data')]['csv']['header']+"\n";
		csvData += fileConvertResult[myData.attr('data')]['csv']['container'];

		let mapFilename = fileConvertResult[myData.attr('data')]['mapData']['filename'];
		let csvFilename = fileConvertResult[myData.attr('data')]['csv']['filename'];

		saveAs(wafermapData, mapFilename);
		saveAs(csvData, csvFilename);
	});

	$(document).on('click', '[id^="delete-before-convert-linxens"]', function () {
		const myData = $(this);
		const fileOrder = myData.attr('data');
		let fileArray = Array.from(fileListTmp);
		fileArray.splice(fileOrder, 1);

		const dataTransfer = new DataTransfer();
		fileArray.forEach(file => dataTransfer.items.add(file));
		fileListTmp = dataTransfer.files;
		handleFiles(fileListTmp);
	});

	$("#btn-map-convert-linxens").click(async function () {
		const btnConvert = $("#btn-map-convert-linxens");
		const btnDownload = $("#btn-map-download-linxens");

		if (fileListTmp.length <= 0) {
			$(".air-badge").html(airBadge("Please choose a map file" , 'danger'));
			return false;
		}

		let progressFileTables = $('[id^="progress-convert-page-linxens"]');
		let saveAsFileTables = $('[id^="download-convert-linxens"]');

		let viewBeforeConvert = $('[id^="view-before-convert-linxens"]');
		let viewAfterConvert = $('[id^="view-after-convert-linxens"]');
		for (let i = 0; i < progressFileTables.length; i++) {
			progressFileTables.eq(i).removeClass("d-none");
		}

		let convertOK = 0;
		fileConvertResult = [];
		for (let i = 0; i < fileListTmp.length; i++) {
			formData = new FormData();
			formData.append('mapfile', fileListTmp[i]);
			const url = baseUrl("/auth/api/v80/wafermap-linxens");
			const execute = await postField(url, 'POST', formData, false, true, progressBar, i);


			try {
				let obj = (typeof execute === "string") ? JSON.parse(execute) : execute;
				if (obj.code == 200) {
					saveAsFileTables.eq(i).removeClass("d-none");
					viewBeforeConvert.eq(i).addClass("d-none");
					viewAfterConvert.eq(i).removeClass("d-none");
					progressBar(100, i, true);

					btnConvert.addClass("d-none");
					btnConvert.attr("disabled", true);
					fileConvertResult.push(obj.result);
					fileListTmp[i]['convert'] = true;
					convertOK++;
				} else {
					fileConvertResult.push(
						{
							"convert": false,
						}
					);
					fileListTmp[i]['convert'] = false;
					progressBar(0, i, false);
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			} catch (error) {
				fileConvertResult.push(
					{
						"convert": false,
					}
				);
				fileListTmp[i]['convert'] = false;
				progressBar(0, i, false);
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			}
		}

		for (let i = 0; i < fileListTmp.length; i++) {
			if (fileListTmp[i]['convert']) progressFileTables.eq(i).addClass("d-none");
		}

		if (convertOK >= 1) {
			btnDownload.removeClass("d-none");
			btnDownload.attr("disabled", false);
		}
	});

	$("#btn-map-download-linxens").click(async function () {
		const zip = new JSZip();

		let csvHeader = "";
		let csvData = "";
		for (let i = 0; i < fileConvertResult.length; i++) {
			if (fileConvertResult[i]['convert']) {
				await zip.file(fileConvertResult[i]['mapData']['filename'], fileConvertResult[i]['mapData']['wafermap']);

				if (csvHeader == "") {
					csvHeader = fileConvertResult[i]['csv']['header'];
				}

				if (csvHeader != "") {
					csvData += fileConvertResult[i]['csv']['container']+"\n";
				}
			}
		}

		if (csvHeader != "") {
			let CSV_DataFinish = csvHeader+"\n"+csvData;
			await zip.file("convert.csv", CSV_DataFinish);
		}

		zip.generateAsync({type:"blob"}).then(function(content) {
			const zipName = $(".main-js").attr("data-containt")+"_"+getTimestamp()+".zip";
		    saveAs(content, zipName);
		});
	});
}

const pageMapConvertNuvoton = () => {
	let fileConvertResult = [];
	let fileListTmp = false;
	let formData = null;

	const handleFiles = (files) => {
		const fileList = $("#file-list-nuvoton");
		const btnConvert = $("#btn-map-convert-nuvoton");
		const btnDownload = $("#btn-map-download-nuvoton");
		fileList.empty();
		fileListTmp = files;
		
		if (files.length > 0) {
			const ul = $('<ul class="list-group my-2"></ul>');

			let i = 0;
			$.each(files, function(i, file) {
				const fileSize = (file.size / 1024).toFixed(1) + ' KB';
				const li = $(`
					<li class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							${file.name}
							<span class="badge badge-primary text-center ml-auto pl-3 m-1" id="view-before-convert-nuvoton" data="${i}">
								<i class="fas fa-eye"></i>
							</span>
							<span class="badge badge-primary text-center ml-auto pl-3 m-1 d-none" id="view-after-convert-nuvoton" data="${i}">
								<i class="fas fa-eye"></i>
							</span>

							<span class="badge badge-success text-center pl-3 m-1 d-none" id="download-convert-nuvoton" data="${i}">
								<i class="fas fa-download"></i>
							</span>
							<span class="badge badge-danger text-center pl-3 m-1" id="delete-before-convert-nuvoton" data="${i}">
								<i class="fas fa-trash"></i>
							</span>
							<span class="badge bg-secondary rounded-pill">${fileSize}</span>
						</div>
						<div class="progress progress-md d-none" id="progress-convert-page-nuvoton">
							<div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress-convert-nuvoton" data="${i}">0%</div>
						</div>
					</li>
					`);
				ul.append(li);
				i++;
			});

			fileList.append(ul);
			btnConvert.removeClass("d-none");
			btnConvert.attr("disabled", false);
		}

		if (files.length <= 0) {
			btnConvert.addClass("d-none");
			btnConvert.attr("disabled", true);
		}
		btnDownload.addClass("d-none");
		btnDownload.attr("disabled", true);
	}

	const progressBar = (percentage, index, status) => {
		let progressTables = $('[id^="progress-convert-nuvoton"]');
		let prog = progressTables.eq(index);

		if (percentage <= 99) {
			prog.removeClass("bg-success");
			prog.removeClass("bg-danger");
		}

		if (!status) {
			prog.attr("style", "width: 100%;");
			prog.text('Failed');
			prog.removeClass("bg-success");
			prog.addClass("bg-danger");
		}

		if (status) {
			prog.attr("style", "width: "+percentage+'%'+";");
			prog.text(percentage+'%');
			if (percentage == 100) {
				prog.removeClass("bg-danger");
				prog.addClass("bg-success");
			}
		}
	}

	$("#btn-file-input-nuvoton").click(function(e) {
		$("#file-input-nuvoton").click();
	});

	$("#file-input-nuvoton").on('change', function() {
		handleFiles(this.files);
	});

	$(document).on('dragenter dragover dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$("#drop-zone-nuvoton").on('dragenter dragover', function() {
		$(this).addClass('dragover');
	});

	$("#drop-zone-nuvoton").on('dragleave drop', function() {
		$(this).removeClass('dragover');
	});

	$("#drop-zone-nuvoton").on('drop', function(e) {
		const files = e.originalEvent.dataTransfer.files;
		handleFiles(files);
	});

	$(document).on('click', '[id^="view-before-convert-nuvoton"]', async function () {
		const modal = $("#modal-map-before-convert-nuvoton");
		const mapText = $("#text-map-before-convert-nuvoton");
		const myData = $(this);
		const file = fileListTmp[myData.attr('data')];

		mapText.val(await openFile(file));
		modal.modal('show');
	});

	$(document).on('click', '[id^="view-after-convert-nuvoton"]', async function () {
		const modal = $("#modal-map-after-convert-nuvoton");
		const mapView = $("#map-container-after-convert-nuvoton");
		const mapDesc = $("#map-decs-after-convert-nuvoton");
		const myData = $(this);
		const mapText = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		const descMap = fileConvertResult[myData.attr('data')]['mapData']['desc'];
		const keys = Object.keys(descMap);
		const opt = fileConvertResult[myData.attr('data')]['mapData']['opt'];
		const csv = fileConvertResult[myData.attr('data')]['csv'];

		mapDesc.empty();
		$.each(keys, function(i, key) {
			const s = `<div class="mx-2"><span class="badge border border-dark ${descMap[key][1]}">${key}</span> ${descMap[key][0]} - ${descMap[key][2]}</div>`
			mapDesc.append(s);
		});

		renderWaferMap(mapView, mapText, opt);
		modal.modal('show');
	});

	$(document).on('click', '[id^="download-convert-nuvoton"]', async function () {
		const myData = $(this);
		let wafermapData = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		let csvData = fileConvertResult[myData.attr('data')]['csv']['header']+"\n";
		csvData += fileConvertResult[myData.attr('data')]['csv']['container'];

		let mapFilename = fileConvertResult[myData.attr('data')]['mapData']['filename'];
		let csvFilename = fileConvertResult[myData.attr('data')]['csv']['filename'];

		saveAs(wafermapData, mapFilename);
		saveAs(csvData, csvFilename);
	});

	$(document).on('click', '[id^="delete-before-convert-nuvoton"]', function () {
		const myData = $(this);
		const fileOrder = myData.attr('data');
		let fileArray = Array.from(fileListTmp);
		fileArray.splice(fileOrder, 1);

		const dataTransfer = new DataTransfer();
		fileArray.forEach(file => dataTransfer.items.add(file));
		fileListTmp = dataTransfer.files;
		handleFiles(fileListTmp);
	});

	$("#btn-map-convert-nuvoton").click(async function () {
		const btnConvert = $("#btn-map-convert-nuvoton");
		const btnDownload = $("#btn-map-download-nuvoton");

		if (fileListTmp.length <= 0) {
			$(".air-badge").html(airBadge("Please choose a map file" , 'danger'));
			return false;
		}

		let progressFileTables = $('[id^="progress-convert-page-nuvoton"]');
		let saveAsFileTables = $('[id^="download-convert-nuvoton"]');

		let viewBeforeConvert = $('[id^="view-before-convert-nuvoton"]');
		let viewAfterConvert = $('[id^="view-after-convert-nuvoton"]');
		for (let i = 0; i < progressFileTables.length; i++) {
			progressFileTables.eq(i).removeClass("d-none");
		}

		let convertOK = 0;
		fileConvertResult = [];
		for (let i = 0; i < fileListTmp.length; i++) {
			formData = new FormData();
			formData.append('mapfile', fileListTmp[i]);
			const url = baseUrl("/auth/api/v80/wafermap-nuvoton");
			const execute = await postField(url, 'POST', formData, false, true, progressBar, i);


			try {
				let obj = (typeof execute === "string") ? JSON.parse(execute) : execute;
				if (obj.code == 200) {
					saveAsFileTables.eq(i).removeClass("d-none");
					viewBeforeConvert.eq(i).addClass("d-none");
					viewAfterConvert.eq(i).removeClass("d-none");
					progressBar(100, i, true);

					btnConvert.addClass("d-none");
					btnConvert.attr("disabled", true);
					fileConvertResult.push(obj.result);
					fileListTmp[i]['convert'] = true;
					convertOK++;
				} else {
					fileConvertResult.push(
						{
							"convert": false,
						}
					);
					fileListTmp[i]['convert'] = false;
					progressBar(0, i, false);
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			} catch (error) {
				fileConvertResult.push(
					{
						"convert": false,
					}
				);
				fileListTmp[i]['convert'] = false;
				progressBar(0, i, false);
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			}
		}

		for (let i = 0; i < fileListTmp.length; i++) {
			if (fileListTmp[i]['convert']) progressFileTables.eq(i).addClass("d-none");
		}

		if (convertOK >= 1) {
			btnDownload.removeClass("d-none");
			btnDownload.attr("disabled", false);
		}
	});

	$("#btn-map-download-nuvoton").click(async function () {
		const zip = new JSZip();

		let csvHeader = "";
		let csvData = "";
		for (let i = 0; i < fileConvertResult.length; i++) {
			if (fileConvertResult[i]['convert']) {
				await zip.file(fileConvertResult[i]['mapData']['filename'], fileConvertResult[i]['mapData']['wafermap']);

				if (csvHeader == "") {
					csvHeader = fileConvertResult[i]['csv']['header'];
				}

				if (csvHeader != "") {
					csvData += fileConvertResult[i]['csv']['container']+"\n";
				}
			}
		}

		if (csvHeader != "") {
			let CSV_DataFinish = csvHeader+"\n"+csvData;
			await zip.file("convert.csv", CSV_DataFinish);
		}

		zip.generateAsync({type:"blob"}).then(function(content) {
			const zipName = $(".main-js").attr("data-containt")+"_"+getTimestamp()+".zip";
		    saveAs(content, zipName);
		});
	});
}

const pageMapConvertSony = () => {
	let fileConvertResult = [];
	let fileListTmp = false;
	let formData = null;

	const handleFiles = (files) => {
		const fileList = $("#file-list-sony");
		const btnConvert = $("#btn-map-convert-sony");
		const btnDownload = $("#btn-map-download-sony");
		fileList.empty();
		fileListTmp = files;
		
		if (files.length > 0) {
			const ul = $('<ul class="list-group my-2"></ul>');

			let i = 0;
			$.each(files, function(i, file) {
				const fileSize = (file.size / 1024).toFixed(1) + ' KB';
				const li = $(`
					<li class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							${file.name}
							<span class="badge badge-primary text-center ml-auto pl-3 m-1" id="view-before-convert-sony" data="${i}">
								<i class="fas fa-eye"></i>
							</span>
							<span class="badge badge-primary text-center ml-auto pl-3 m-1 d-none" id="view-after-convert-sony" data="${i}">
								<i class="fas fa-eye"></i>
							</span>

							<span class="badge badge-success text-center pl-3 m-1 d-none" id="download-convert-sony" data="${i}">
								<i class="fas fa-download"></i>
							</span>
							<span class="badge badge-danger text-center pl-3 m-1" id="delete-before-convert-sony" data="${i}">
								<i class="fas fa-trash"></i>
							</span>
							<span class="badge bg-secondary rounded-pill">${fileSize}</span>
						</div>
						<div class="progress progress-md d-none" id="progress-convert-page-sony">
							<div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress-convert-sony" data="${i}">0%</div>
						</div>
					</li>
					`);
				ul.append(li);
				i++;
			});

			fileList.append(ul);
			btnConvert.removeClass("d-none");
			btnConvert.attr("disabled", false);
		}

		if (files.length <= 0) {
			btnConvert.addClass("d-none");
			btnConvert.attr("disabled", true);
		}
		btnDownload.addClass("d-none");
		btnDownload.attr("disabled", true);
	}

	const progressBar = (percentage, index, status) => {
		let progressTables = $('[id^="progress-convert-sony"]');
		let prog = progressTables.eq(index);

		if (percentage <= 99) {
			prog.removeClass("bg-success");
			prog.removeClass("bg-danger");
		}

		if (!status) {
			prog.attr("style", "width: 100%;");
			prog.text('Failed');
			prog.removeClass("bg-success");
			prog.addClass("bg-danger");
		}

		if (status) {
			prog.attr("style", "width: "+percentage+'%'+";");
			prog.text(percentage+'%');
			if (percentage == 100) {
				prog.removeClass("bg-danger");
				prog.addClass("bg-success");
			}
		}
	}

	$("#btn-file-input-sony").click(function(e) {
		$("#file-input-sony").click();
	});

	$("#file-input-sony").on('change', function() {
		handleFiles(this.files);
	});

	$(document).on('dragenter dragover dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$("#drop-zone-sony").on('dragenter dragover', function() {
		$(this).addClass('dragover');
	});

	$("#drop-zone-sony").on('dragleave drop', function() {
		$(this).removeClass('dragover');
	});

	$("#drop-zone-sony").on('drop', function(e) {
		const files = e.originalEvent.dataTransfer.files;
		handleFiles(files);
	});

	$(document).on('click', '[id^="view-before-convert-sony"]', async function () {
		const modal = $("#modal-map-before-convert-sony");
		const mapText = $("#text-map-before-convert-sony");
		const myData = $(this);
		const file = fileListTmp[myData.attr('data')];

		mapText.val(await openFile(file));
		modal.modal('show');
	});

	$(document).on('click', '[id^="view-after-convert-sony"]', async function () {
		const modal = $("#modal-map-after-convert-sony");
		const mapView = $("#map-container-after-convert-sony");
		const mapDesc = $("#map-decs-after-convert-sony");
		const myData = $(this);
		const mapText = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		const descMap = fileConvertResult[myData.attr('data')]['mapData']['desc'];
		const keys = Object.keys(descMap);
		const opt = fileConvertResult[myData.attr('data')]['mapData']['opt'];
		const csv = fileConvertResult[myData.attr('data')]['csv'];

		mapDesc.empty();
		$.each(keys, function(i, key) {
			const s = `<div class="mx-2"><span class="badge border border-dark ${descMap[key][1]}">${key}</span> ${descMap[key][0]} - ${descMap[key][2]}</div>`
			mapDesc.append(s);
		});

		renderWaferMap(mapView, mapText, opt);
		modal.modal('show');
	});

	$(document).on('click', '[id^="download-convert-sony"]', async function () {
		const myData = $(this);
		let wafermapData = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		let csvData = fileConvertResult[myData.attr('data')]['csv']['header']+"\n";
		csvData += fileConvertResult[myData.attr('data')]['csv']['container'];

		let mapFilename = fileConvertResult[myData.attr('data')]['mapData']['filename'];
		let csvFilename = fileConvertResult[myData.attr('data')]['csv']['filename'];

		saveAs(wafermapData, mapFilename);
		saveAs(csvData, csvFilename);
	});

	$(document).on('click', '[id^="delete-before-convert-sony"]', function () {
		const myData = $(this);
		const fileOrder = myData.attr('data');
		let fileArray = Array.from(fileListTmp);
		fileArray.splice(fileOrder, 1);

		const dataTransfer = new DataTransfer();
		fileArray.forEach(file => dataTransfer.items.add(file));
		fileListTmp = dataTransfer.files;
		handleFiles(fileListTmp);
	});

	$("#btn-map-convert-sony").click(async function () {
		const btnConvert = $("#btn-map-convert-sony");
		const btnDownload = $("#btn-map-download-sony");

		if (fileListTmp.length <= 0) {
			$(".air-badge").html(airBadge("Please choose a map file" , 'danger'));
			return false;
		}

		let progressFileTables = $('[id^="progress-convert-page-sony"]');
		let saveAsFileTables = $('[id^="download-convert-sony"]');

		let viewBeforeConvert = $('[id^="view-before-convert-sony"]');
		let viewAfterConvert = $('[id^="view-after-convert-sony"]');
		for (let i = 0; i < progressFileTables.length; i++) {
			progressFileTables.eq(i).removeClass("d-none");
		}

		let convertOK = 0;
		fileConvertResult = [];
		for (let i = 0; i < fileListTmp.length; i++) {
			formData = new FormData();
			formData.append('mapfile', fileListTmp[i]);
			const url = baseUrl("/auth/api/v80/wafermap-sony");
			const execute = await postField(url, 'POST', formData, false, true, progressBar, i);


			try {
				let obj = (typeof execute === "string") ? JSON.parse(execute) : execute;
				if (obj.code == 200) {
					saveAsFileTables.eq(i).removeClass("d-none");
					viewBeforeConvert.eq(i).addClass("d-none");
					viewAfterConvert.eq(i).removeClass("d-none");
					progressBar(100, i, true);

					btnConvert.addClass("d-none");
					btnConvert.attr("disabled", true);
					fileConvertResult.push(obj.result);
					fileListTmp[i]['convert'] = true;
					convertOK++;
				} else {
					fileConvertResult.push(
						{
							"convert": false,
						}
					);
					fileListTmp[i]['convert'] = false;
					progressBar(0, i, false);
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			} catch (error) {
				fileConvertResult.push(
					{
						"convert": false,
					}
				);
				fileListTmp[i]['convert'] = false;
				progressBar(0, i, false);
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			}
		}

		for (let i = 0; i < fileListTmp.length; i++) {
			if (fileListTmp[i]['convert']) progressFileTables.eq(i).addClass("d-none");
		}

		if (convertOK >= 1) {
			btnDownload.removeClass("d-none");
			btnDownload.attr("disabled", false);
		}
	});

	$("#btn-map-download-sony").click(async function () {
		const zip = new JSZip();

		let csvHeader = "";
		let csvData = "";
		for (let i = 0; i < fileConvertResult.length; i++) {
			if (fileConvertResult[i]['convert']) {
				await zip.file(fileConvertResult[i]['mapData']['filename'], fileConvertResult[i]['mapData']['wafermap']);

				if (csvHeader == "") {
					csvHeader = fileConvertResult[i]['csv']['header'];
				}

				if (csvHeader != "") {
					csvData += fileConvertResult[i]['csv']['container']+"\n";
				}
			}
		}

		if (csvHeader != "") {
			let CSV_DataFinish = csvHeader+"\n"+csvData;
			await zip.file("convert.csv", CSV_DataFinish);
		}

		zip.generateAsync({type:"blob"}).then(function(content) {
			const zipName = $(".main-js").attr("data-containt")+"_"+getTimestamp()+".zip";
		    saveAs(content, zipName);
		});
	});
}

const pageMapConvertStm = () => {
	let fileConvertResult = [];
	let fileListTmp = false;
	let formData = null;

	const handleFiles = (files) => {
		const fileList = $("#file-list-stm");
		const btnConvert = $("#btn-map-convert-stm");
		const btnDownload = $("#btn-map-download-stm");
		fileList.empty();
		fileListTmp = files;
		
		if (files.length > 0) {
			const ul = $('<ul class="list-group my-2"></ul>');

			let i = 0;
			$.each(files, function(i, file) {
				const fileSize = (file.size / 1024).toFixed(1) + ' KB';
				const li = $(`
					<li class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							${file.name}
							<span class="badge badge-primary text-center ml-auto pl-3 m-1" id="view-before-convert-stm" data="${i}">
								<i class="fas fa-eye"></i>
							</span>
							<span class="badge badge-primary text-center ml-auto pl-3 m-1 d-none" id="view-after-convert-stm" data="${i}">
								<i class="fas fa-eye"></i>
							</span>

							<span class="badge badge-success text-center pl-3 m-1 d-none" id="download-convert-stm" data="${i}">
								<i class="fas fa-download"></i>
							</span>
							<span class="badge badge-danger text-center pl-3 m-1" id="delete-before-convert-stm" data="${i}">
								<i class="fas fa-trash"></i>
							</span>
							<span class="badge bg-secondary rounded-pill">${fileSize}</span>
						</div>
						<div class="progress progress-md d-none" id="progress-convert-page-stm">
							<div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress-convert-stm" data="${i}">0%</div>
						</div>
					</li>
					`);
				ul.append(li);
				i++;
			});

			fileList.append(ul);
			btnConvert.removeClass("d-none");
			btnConvert.attr("disabled", false);
		}

		if (files.length <= 0) {
			btnConvert.addClass("d-none");
			btnConvert.attr("disabled", true);
		}
		btnDownload.addClass("d-none");
		btnDownload.attr("disabled", true);
	}

	const progressBar = (percentage, index, status) => {
		let progressTables = $('[id^="progress-convert-stm"]');
		let prog = progressTables.eq(index);

		if (percentage <= 99) {
			prog.removeClass("bg-success");
			prog.removeClass("bg-danger");
		}

		if (!status) {
			prog.attr("style", "width: 100%;");
			prog.text('Failed');
			prog.removeClass("bg-success");
			prog.addClass("bg-danger");
		}

		if (status) {
			prog.attr("style", "width: "+percentage+'%'+";");
			prog.text(percentage+'%');
			if (percentage == 100) {
				prog.removeClass("bg-danger");
				prog.addClass("bg-success");
			}
		}
	}

	$("#btn-file-input-stm").click(function(e) {
		$("#file-input-stm").click();
	});

	$("#file-input-stm").on('change', function() {
		handleFiles(this.files);
	});

	$(document).on('dragenter dragover dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$("#drop-zone-stm").on('dragenter dragover', function() {
		$(this).addClass('dragover');
	});

	$("#drop-zone-stm").on('dragleave drop', function() {
		$(this).removeClass('dragover');
	});

	$("#drop-zone-stm").on('drop', function(e) {
		const files = e.originalEvent.dataTransfer.files;
		handleFiles(files);
	});

	$(document).on('click', '[id^="view-before-convert-stm"]', async function () {
		const modal = $("#modal-map-before-convert-stm");
		const mapText = $("#text-map-before-convert-stm");
		const myData = $(this);
		const file = fileListTmp[myData.attr('data')];

		mapText.val(await openFile(file));
		modal.modal('show');
	});

	$(document).on('click', '[id^="view-after-convert-stm"]', async function () {
		const modal = $("#modal-map-after-convert-stm");
		const mapView = $("#map-container-after-convert-stm");
		const mapDesc = $("#map-decs-after-convert-stm");
		const myData = $(this);
		const mapText = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		const descMap = fileConvertResult[myData.attr('data')]['mapData']['desc'];
		const keys = Object.keys(descMap);
		const opt = fileConvertResult[myData.attr('data')]['mapData']['opt'];
		const csv = fileConvertResult[myData.attr('data')]['csv'];

		mapDesc.empty();
		$.each(keys, function(i, key) {
			const s = `<div class="mx-2"><span class="badge border border-dark ${descMap[key][1]}">${key}</span> ${descMap[key][0]} - ${descMap[key][2]}</div>`
			mapDesc.append(s);
		});

		renderWaferMap(mapView, mapText, opt);
		modal.modal('show');
	});

	$(document).on('click', '[id^="download-convert-stm"]', async function () {
		const myData = $(this);
		let wafermapData = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		let csvData = fileConvertResult[myData.attr('data')]['csv']['header']+"\n";
		csvData += fileConvertResult[myData.attr('data')]['csv']['container'];

		let mapFilename = fileConvertResult[myData.attr('data')]['mapData']['filename'];
		let csvFilename = fileConvertResult[myData.attr('data')]['csv']['filename'];

		saveAs(wafermapData, mapFilename);
		saveAs(csvData, csvFilename);
	});

	$(document).on('click', '[id^="delete-before-convert-stm"]', function () {
		const myData = $(this);
		const fileOrder = myData.attr('data');
		let fileArray = Array.from(fileListTmp);
		fileArray.splice(fileOrder, 1);

		const dataTransfer = new DataTransfer();
		fileArray.forEach(file => dataTransfer.items.add(file));
		fileListTmp = dataTransfer.files;
		handleFiles(fileListTmp);
	});

	$("#btn-map-convert-stm").click(async function () {
		const btnConvert = $("#btn-map-convert-stm");
		const btnDownload = $("#btn-map-download-stm");

		if (fileListTmp.length <= 0) {
			$(".air-badge").html(airBadge("Please choose a map file" , 'danger'));
			return false;
		}

		let progressFileTables = $('[id^="progress-convert-page-stm"]');
		let saveAsFileTables = $('[id^="download-convert-stm"]');

		let viewBeforeConvert = $('[id^="view-before-convert-stm"]');
		let viewAfterConvert = $('[id^="view-after-convert-stm"]');
		for (let i = 0; i < progressFileTables.length; i++) {
			progressFileTables.eq(i).removeClass("d-none");
		}

		let convertOK = 0;
		fileConvertResult = [];
		for (let i = 0; i < fileListTmp.length; i++) {
			formData = new FormData();
			formData.append('mapfile', fileListTmp[i]);
			const url = baseUrl("/auth/api/v80/wafermap-stm");
			const execute = await postField(url, 'POST', formData, false, true, progressBar, i);


			try {
				let obj = (typeof execute === "string") ? JSON.parse(execute) : execute;
				if (obj.code == 200) {
					saveAsFileTables.eq(i).removeClass("d-none");
					viewBeforeConvert.eq(i).addClass("d-none");
					viewAfterConvert.eq(i).removeClass("d-none");
					progressBar(100, i, true);

					btnConvert.addClass("d-none");
					btnConvert.attr("disabled", true);
					fileConvertResult.push(obj.result);
					fileListTmp[i]['convert'] = true;
					convertOK++;
				} else {
					fileConvertResult.push(
						{
							"convert": false,
						}
					);
					fileListTmp[i]['convert'] = false;
					progressBar(0, i, false);
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			} catch (error) {
				fileConvertResult.push(
					{
						"convert": false,
					}
				);
				fileListTmp[i]['convert'] = false;
				progressBar(0, i, false);
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			}
		}

		for (let i = 0; i < fileListTmp.length; i++) {
			if (fileListTmp[i]['convert']) progressFileTables.eq(i).addClass("d-none");
		}

		if (convertOK >= 1) {
			btnDownload.removeClass("d-none");
			btnDownload.attr("disabled", false);
		}
	});

	$("#btn-map-download-stm").click(async function () {
		const zip = new JSZip();

		let csvHeader = "";
		let csvData = "";
		for (let i = 0; i < fileConvertResult.length; i++) {
			if (fileConvertResult[i]['convert']) {
				await zip.file(fileConvertResult[i]['mapData']['filename'], fileConvertResult[i]['mapData']['wafermap']);

				if (csvHeader == "") {
					csvHeader = fileConvertResult[i]['csv']['header'];
				}

				if (csvHeader != "") {
					csvData += fileConvertResult[i]['csv']['container']+"\n";
				}
			}
		}

		if (csvHeader != "") {
			let CSV_DataFinish = csvHeader+"\n"+csvData;
			await zip.file("convert.csv", CSV_DataFinish);
		}

		zip.generateAsync({type:"blob"}).then(function(content) {
			const zipName = $(".main-js").attr("data-containt")+"_"+getTimestamp()+".zip";
		    saveAs(content, zipName);
		});
	});
}

const pageMapConvertMlx = () => {
	let fileConvertResult = [];
	let fileListTmp = false;
	let formData = null;

	const handleFiles = (files) => {
		const fileList = $("#file-list-mlx");
		const btnConvert = $("#btn-map-convert-mlx");
		const btnDownload = $("#btn-map-download-mlx");
		fileList.empty();
		fileListTmp = files;
		
		if (files.length > 0) {
			const ul = $('<ul class="list-group my-2"></ul>');

			let i = 0;
			$.each(files, function(i, file) {
				const fileSize = (file.size / 1024).toFixed(1) + ' KB';
				const li = $(`
					<li class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							${file.name}
							<span class="badge badge-primary text-center ml-auto pl-3 m-1" id="view-before-convert-mlx" data="${i}">
								<i class="fas fa-eye"></i>
							</span>
							<span class="badge badge-primary text-center ml-auto pl-3 m-1 d-none" id="view-after-convert-mlx" data="${i}">
								<i class="fas fa-eye"></i>
							</span>

							<span class="badge badge-success text-center pl-3 m-1 d-none" id="download-convert-mlx" data="${i}">
								<i class="fas fa-download"></i>
							</span>
							<span class="badge badge-danger text-center pl-3 m-1" id="delete-before-convert-mlx" data="${i}">
								<i class="fas fa-trash"></i>
							</span>
							<span class="badge bg-secondary rounded-pill">${fileSize}</span>
						</div>
						<div class="progress progress-md d-none" id="progress-convert-page-mlx">
							<div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress-convert-mlx" data="${i}">0%</div>
						</div>
					</li>
					`);
				ul.append(li);
				i++;
			});

			fileList.append(ul);
			btnConvert.removeClass("d-none");
			btnConvert.attr("disabled", false);
		}

		if (files.length <= 0) {
			btnConvert.addClass("d-none");
			btnConvert.attr("disabled", true);
		}
		btnDownload.addClass("d-none");
		btnDownload.attr("disabled", true);
	}

	const progressBar = (percentage, index, status) => {
		let progressTables = $('[id^="progress-convert-mlx"]');
		let prog = progressTables.eq(index);

		if (percentage <= 99) {
			prog.removeClass("bg-success");
			prog.removeClass("bg-danger");
		}

		if (!status) {
			prog.attr("style", "width: 100%;");
			prog.text('Failed');
			prog.removeClass("bg-success");
			prog.addClass("bg-danger");
		}

		if (status) {
			prog.attr("style", "width: "+percentage+'%'+";");
			prog.text(percentage+'%');
			if (percentage == 100) {
				prog.removeClass("bg-danger");
				prog.addClass("bg-success");
			}
		}
	}

	$("#btn-file-input-mlx").click(function(e) {
		$("#file-input-mlx").click();
	});

	$("#file-input-mlx").on('change', function() {
		handleFiles(this.files);
	});

	$(document).on('dragenter dragover dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$("#drop-zone-mlx").on('dragenter dragover', function() {
		$(this).addClass('dragover');
	});

	$("#drop-zone-mlx").on('dragleave drop', function() {
		$(this).removeClass('dragover');
	});

	$("#drop-zone-mlx").on('drop', function(e) {
		const files = e.originalEvent.dataTransfer.files;
		handleFiles(files);
	});

	$(document).on('click', '[id^="view-before-convert-mlx"]', async function () {
		const modal = $("#modal-map-before-convert-mlx");
		const mapText = $("#text-map-before-convert-mlx");
		const myData = $(this);
		const file = fileListTmp[myData.attr('data')];

		mapText.val(await openFile(file));
		modal.modal('show');
	});

	$(document).on('click', '[id^="view-after-convert-mlx"]', async function () {
		const modal = $("#modal-map-after-convert-mlx");
		const mapView = $("#map-container-after-convert-mlx");
		const mapDesc = $("#map-decs-after-convert-mlx");
		const myData = $(this);
		const mapText = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		const descMap = fileConvertResult[myData.attr('data')]['mapData']['desc'];
		const keys = Object.keys(descMap);
		const opt = fileConvertResult[myData.attr('data')]['mapData']['opt'];
		const csv = fileConvertResult[myData.attr('data')]['csv'];

		mapDesc.empty();
		$.each(keys, function(i, key) {
			const s = `<div class="mx-2"><span class="badge border border-dark ${descMap[key][1]}">${key}</span> ${descMap[key][0]} - ${descMap[key][2]}</div>`
			mapDesc.append(s);
		});

		renderWaferMap(mapView, mapText, opt);
		modal.modal('show');
	});

	$(document).on('click', '[id^="download-convert-mlx"]', async function () {
		const myData = $(this);
		let wafermapData = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		let csvData = fileConvertResult[myData.attr('data')]['csv']['header']+"\n";
		csvData += fileConvertResult[myData.attr('data')]['csv']['container'];

		let mapFilename = fileConvertResult[myData.attr('data')]['mapData']['filename'];
		let csvFilename = fileConvertResult[myData.attr('data')]['csv']['filename'];

		saveAs(wafermapData, mapFilename);
		saveAs(csvData, csvFilename);
	});

	$(document).on('click', '[id^="delete-before-convert-mlx"]', function () {
		const myData = $(this);
		const fileOrder = myData.attr('data');
		let fileArray = Array.from(fileListTmp);
		fileArray.splice(fileOrder, 1);

		const dataTransfer = new DataTransfer();
		fileArray.forEach(file => dataTransfer.items.add(file));
		fileListTmp = dataTransfer.files;
		handleFiles(fileListTmp);
	});

	$("#btn-map-convert-mlx").click(async function () {
		const btnConvert = $("#btn-map-convert-mlx");
		const btnDownload = $("#btn-map-download-mlx");

		if (fileListTmp.length <= 0) {
			$(".air-badge").html(airBadge("Please choose a map file" , 'danger'));
			return false;
		}

		let progressFileTables = $('[id^="progress-convert-page-mlx"]');
		let saveAsFileTables = $('[id^="download-convert-mlx"]');

		let viewBeforeConvert = $('[id^="view-before-convert-mlx"]');
		let viewAfterConvert = $('[id^="view-after-convert-mlx"]');
		for (let i = 0; i < progressFileTables.length; i++) {
			progressFileTables.eq(i).removeClass("d-none");
		}

		let convertOK = 0;
		fileConvertResult = [];
		for (let i = 0; i < fileListTmp.length; i++) {
			formData = new FormData();
			formData.append('mapfile', fileListTmp[i]);
			const url = baseUrl("/auth/api/v80/wafermap-mlx");
			const execute = await postField(url, 'POST', formData, false, true, progressBar, i);


			try {
				let obj = (typeof execute === "string") ? JSON.parse(execute) : execute;
				if (obj.code == 200) {
					saveAsFileTables.eq(i).removeClass("d-none");
					viewBeforeConvert.eq(i).addClass("d-none");
					viewAfterConvert.eq(i).removeClass("d-none");
					progressBar(100, i, true);

					btnConvert.addClass("d-none");
					btnConvert.attr("disabled", true);
					fileConvertResult.push(obj.result);
					fileListTmp[i]['convert'] = true;
					convertOK++;
				} else {
					fileConvertResult.push(
						{
							"convert": false,
						}
					);
					fileListTmp[i]['convert'] = false;
					progressBar(0, i, false);
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			} catch (error) {
				fileConvertResult.push(
					{
						"convert": false,
					}
				);
				fileListTmp[i]['convert'] = false;
				progressBar(0, i, false);
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			}
		}

		for (let i = 0; i < fileListTmp.length; i++) {
			if (fileListTmp[i]['convert']) progressFileTables.eq(i).addClass("d-none");
		}

		if (convertOK >= 1) {
			btnDownload.removeClass("d-none");
			btnDownload.attr("disabled", false);
		}
	});

	$("#btn-map-download-mlx").click(async function () {
		const zip = new JSZip();

		let csvHeader = "";
		let csvData = "";
		for (let i = 0; i < fileConvertResult.length; i++) {
			if (fileConvertResult[i]['convert']) {
				await zip.file(fileConvertResult[i]['mapData']['filename'], fileConvertResult[i]['mapData']['wafermap']);

				if (csvHeader == "") {
					csvHeader = fileConvertResult[i]['csv']['header'];
				}

				if (csvHeader != "") {
					csvData += fileConvertResult[i]['csv']['container']+"\n";
				}
			}
		}

		if (csvHeader != "") {
			let CSV_DataFinish = csvHeader+"\n"+csvData;
			await zip.file("convert.csv", CSV_DataFinish);
		}

		zip.generateAsync({type:"blob"}).then(function(content) {
			const zipName = $(".main-js").attr("data-containt")+"_"+getTimestamp()+".zip";
		    saveAs(content, zipName);
		});
	});
}

const pageMapConvertMchp = () => {
	let fileConvertResult = [];
	let fileListTmp = false;
	let formData = null;

	const handleFiles = (files) => {
		const fileList = $("#file-list-mchp");
		const btnConvert = $("#btn-map-convert-mchp");
		const btnDownload = $("#btn-map-download-mchp");
		fileList.empty();
		fileListTmp = files;
		
		if (files.length > 0) {
			const ul = $('<ul class="list-group my-2"></ul>');

			let i = 0;
			$.each(files, function(i, file) {
				const fileSize = (file.size / 1024).toFixed(1) + ' KB';
				const li = $(`
					<li class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							${file.name}
							<span class="badge badge-primary text-center ml-auto pl-3 m-1" id="view-before-convert-mchp" data="${i}">
								<i class="fas fa-eye"></i>
							</span>
							<span class="badge badge-primary text-center ml-auto pl-3 m-1 d-none" id="view-after-convert-mchp" data="${i}">
								<i class="fas fa-eye"></i>
							</span>

							<span class="badge badge-success text-center pl-3 m-1 d-none" id="download-convert-mchp" data="${i}">
								<i class="fas fa-download"></i>
							</span>
							<span class="badge badge-danger text-center pl-3 m-1" id="delete-before-convert-mchp" data="${i}">
								<i class="fas fa-trash"></i>
							</span>
							<span class="badge bg-secondary rounded-pill">${fileSize}</span>
						</div>
						<div class="progress progress-md d-none" id="progress-convert-page-mchp">
							<div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress-convert-mchp" data="${i}">0%</div>
						</div>
					</li>
					`);
				ul.append(li);
				i++;
			});

			fileList.append(ul);
			btnConvert.removeClass("d-none");
			btnConvert.attr("disabled", false);
		}

		if (files.length <= 0) {
			btnConvert.addClass("d-none");
			btnConvert.attr("disabled", true);
		}
		btnDownload.addClass("d-none");
		btnDownload.attr("disabled", true);
	}

	const progressBar = (percentage, index, status) => {
		let progressTables = $('[id^="progress-convert-mchp"]');
		let prog = progressTables.eq(index);

		if (percentage <= 99) {
			prog.removeClass("bg-success");
			prog.removeClass("bg-danger");
		}

		if (!status) {
			prog.attr("style", "width: 100%;");
			prog.text('Failed');
			prog.removeClass("bg-success");
			prog.addClass("bg-danger");
		}

		if (status) {
			prog.attr("style", "width: "+percentage+'%'+";");
			prog.text(percentage+'%');
			if (percentage == 100) {
				prog.removeClass("bg-danger");
				prog.addClass("bg-success");
			}
		}
	}

	$("#btn-file-input-mchp").click(function(e) {
		$("#file-input-mchp").click();
	});

	$("#file-input-mchp").on('change', function() {
		handleFiles(this.files);
	});

	$(document).on('dragenter dragover dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$("#drop-zone-mchp").on('dragenter dragover', function() {
		$(this).addClass('dragover');
	});

	$("#drop-zone-mchp").on('dragleave drop', function() {
		$(this).removeClass('dragover');
	});

	$("#drop-zone-mchp").on('drop', function(e) {
		const files = e.originalEvent.dataTransfer.files;
		handleFiles(files);
	});

	$(document).on('click', '[id^="view-before-convert-mchp"]', async function () {
		const modal = $("#modal-map-before-convert-mchp");
		const mapText = $("#text-map-before-convert-mchp");
		const myData = $(this);
		const file = fileListTmp[myData.attr('data')];

		mapText.val(await openFile(file));
		modal.modal('show');
	});

	$(document).on('click', '[id^="view-after-convert-mchp"]', async function () {
		const modal = $("#modal-map-after-convert-mchp");
		const mapView = $("#map-container-after-convert-mchp");
		const mapDesc = $("#map-decs-after-convert-mchp");
		const myData = $(this);
		const mapText = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		const descMap = fileConvertResult[myData.attr('data')]['mapData']['desc'];
		const keys = Object.keys(descMap);
		const opt = fileConvertResult[myData.attr('data')]['mapData']['opt'];
		const csv = fileConvertResult[myData.attr('data')]['csv'];

		mapDesc.empty();
		$.each(keys, function(i, key) {
			const s = `<div class="mx-2"><span class="badge border border-dark ${descMap[key][1]}">${key}</span> ${descMap[key][0]} - ${descMap[key][2]}</div>`
			mapDesc.append(s);
		});

		renderWaferMap(mapView, mapText, opt);
		modal.modal('show');
	});

	$(document).on('click', '[id^="download-convert-mchp"]', async function () {
		const myData = $(this);
		let wafermapData = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		let csvData = fileConvertResult[myData.attr('data')]['csv']['header']+"\n";
		csvData += fileConvertResult[myData.attr('data')]['csv']['container'];

		let mapFilename = fileConvertResult[myData.attr('data')]['mapData']['filename'];
		let csvFilename = fileConvertResult[myData.attr('data')]['csv']['filename'];

		saveAs(wafermapData, mapFilename);
		saveAs(csvData, csvFilename);
	});

	$(document).on('click', '[id^="delete-before-convert-mchp"]', function () {
		const myData = $(this);
		const fileOrder = myData.attr('data');
		let fileArray = Array.from(fileListTmp);
		fileArray.splice(fileOrder, 1);

		const dataTransfer = new DataTransfer();
		fileArray.forEach(file => dataTransfer.items.add(file));
		fileListTmp = dataTransfer.files;
		handleFiles(fileListTmp);
	});

	$("#btn-map-convert-mchp").click(async function () {
		const btnConvert = $("#btn-map-convert-mchp");
		const btnDownload = $("#btn-map-download-mchp");

		if (fileListTmp.length <= 0) {
			$(".air-badge").html(airBadge("Please choose a map file" , 'danger'));
			return false;
		}

		let progressFileTables = $('[id^="progress-convert-page-mchp"]');
		let saveAsFileTables = $('[id^="download-convert-mchp"]');

		let viewBeforeConvert = $('[id^="view-before-convert-mchp"]');
		let viewAfterConvert = $('[id^="view-after-convert-mchp"]');
		for (let i = 0; i < progressFileTables.length; i++) {
			progressFileTables.eq(i).removeClass("d-none");
		}

		let convertOK = 0;
		fileConvertResult = [];
		for (let i = 0; i < fileListTmp.length; i++) {
			formData = new FormData();
			formData.append('mapfile', fileListTmp[i]);
			const url = baseUrl("/auth/api/v80/wafermap-mchp");
			const execute = await postField(url, 'POST', formData, false, true, progressBar, i);


			try {
				let obj = (typeof execute === "string") ? JSON.parse(execute) : execute;
				if (obj.code == 200) {
					saveAsFileTables.eq(i).removeClass("d-none");
					viewBeforeConvert.eq(i).addClass("d-none");
					viewAfterConvert.eq(i).removeClass("d-none");
					progressBar(100, i, true);

					btnConvert.addClass("d-none");
					btnConvert.attr("disabled", true);
					fileConvertResult.push(obj.result);
					fileListTmp[i]['convert'] = true;
					convertOK++;
				} else {
					fileConvertResult.push(
						{
							"convert": false,
						}
					);
					fileListTmp[i]['convert'] = false;
					progressBar(0, i, false);
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			} catch (error) {
				fileConvertResult.push(
					{
						"convert": false,
					}
				);
				fileListTmp[i]['convert'] = false;
				progressBar(0, i, false);
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			}
		}

		for (let i = 0; i < fileListTmp.length; i++) {
			if (fileListTmp[i]['convert']) progressFileTables.eq(i).addClass("d-none");
		}

		if (convertOK >= 1) {
			btnDownload.removeClass("d-none");
			btnDownload.attr("disabled", false);
		}
	});

	$("#btn-map-download-mchp").click(async function () {
		const zip = new JSZip();

		let csvHeader = "";
		let csvData = "";
		for (let i = 0; i < fileConvertResult.length; i++) {
			if (fileConvertResult[i]['convert']) {
				await zip.file(fileConvertResult[i]['mapData']['filename'], fileConvertResult[i]['mapData']['wafermap']);

				if (csvHeader == "") {
					csvHeader = fileConvertResult[i]['csv']['header'];
				}

				if (csvHeader != "") {
					csvData += fileConvertResult[i]['csv']['container']+"\n";
				}
			}
		}

		if (csvHeader != "") {
			let CSV_DataFinish = csvHeader+"\n"+csvData;
			await zip.file("convert.csv", CSV_DataFinish);
		}

		zip.generateAsync({type:"blob"}).then(function(content) {
			const zipName = $(".main-js").attr("data-containt")+"_"+getTimestamp()+".zip";
		    saveAs(content, zipName);
		});
	});
}

const pageMapConvertNxp = () => {
	let fileConvertResult = [];
	let fileListTmp = false;
	let formData = null;

	const handleFiles = (files) => {
		const fileList = $("#file-list-nxp");
		const btnConvert = $("#btn-map-convert-nxp");
		const btnDownload = $("#btn-map-download-nxp");
		fileList.empty();
		fileListTmp = files;
		
		if (files.length > 0) {
			const ul = $('<ul class="list-group my-2"></ul>');

			let i = 0;
			$.each(files, function(i, file) {
				const fileSize = (file.size / 1024).toFixed(1) + ' KB';
				const li = $(`
					<li class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							${file.name}
							<span class="badge badge-primary text-center ml-auto pl-3 m-1" id="view-before-convert-nxp" data="${i}">
								<i class="fas fa-eye"></i>
							</span>
							<span class="badge badge-primary text-center ml-auto pl-3 m-1 d-none" id="view-after-convert-nxp" data="${i}">
								<i class="fas fa-eye"></i>
							</span>

							<span class="badge badge-success text-center pl-3 m-1 d-none" id="download-convert-nxp" data="${i}">
								<i class="fas fa-download"></i>
							</span>
							<span class="badge badge-danger text-center pl-3 m-1" id="delete-before-convert-nxp" data="${i}">
								<i class="fas fa-trash"></i>
							</span>
							<span class="badge bg-secondary rounded-pill">${fileSize}</span>
						</div>
						<div class="progress progress-md d-none" id="progress-convert-page-nxp">
							<div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress-convert-nxp" data="${i}">0%</div>
						</div>
					</li>
					`);
				ul.append(li);
				i++;
			});

			fileList.append(ul);
			btnConvert.removeClass("d-none");
			btnConvert.attr("disabled", false);
		}

		if (files.length <= 0) {
			btnConvert.addClass("d-none");
			btnConvert.attr("disabled", true);
		}
		btnDownload.addClass("d-none");
		btnDownload.attr("disabled", true);
	}

	const progressBar = (percentage, index, status) => {
		let progressTables = $('[id^="progress-convert-nxp"]');
		let prog = progressTables.eq(index);

		if (percentage <= 99) {
			prog.removeClass("bg-success");
			prog.removeClass("bg-danger");
		}

		if (!status) {
			prog.attr("style", "width: 100%;");
			prog.text('Failed');
			prog.removeClass("bg-success");
			prog.addClass("bg-danger");
		}

		if (status) {
			prog.attr("style", "width: "+percentage+'%'+";");
			prog.text(percentage+'%');
			if (percentage == 100) {
				prog.removeClass("bg-danger");
				prog.addClass("bg-success");
			}
		}
	}

	$("#btn-file-input-nxp").click(function(e) {
		$("#file-input-nxp").click();
	});

	$("#file-input-nxp").on('change', function() {
		handleFiles(this.files);
	});

	$(document).on('dragenter dragover dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$("#drop-zone-nxp").on('dragenter dragover', function() {
		$(this).addClass('dragover');
	});

	$("#drop-zone-nxp").on('dragleave drop', function() {
		$(this).removeClass('dragover');
	});

	$("#drop-zone-nxp").on('drop', function(e) {
		const files = e.originalEvent.dataTransfer.files;
		handleFiles(files);
	});

	$(document).on('click', '[id^="view-before-convert-nxp"]', async function () {
		const modal = $("#modal-map-before-convert-nxp");
		const mapText = $("#text-map-before-convert-nxp");
		const myData = $(this);
		const file = fileListTmp[myData.attr('data')];

		mapText.val(await openFile(file));
		modal.modal('show');
	});

	$(document).on('click', '[id^="view-after-convert-nxp"]', async function () {
		const modal = $("#modal-map-after-convert-nxp");
		const mapView = $("#map-container-after-convert-nxp");
		const mapDesc = $("#map-decs-after-convert-nxp");
		const myData = $(this);
		const mapText = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		const descMap = fileConvertResult[myData.attr('data')]['mapData']['desc'];
		const keys = Object.keys(descMap);
		const opt = fileConvertResult[myData.attr('data')]['mapData']['opt'];
		const csv = fileConvertResult[myData.attr('data')]['csv'];

		mapDesc.empty();
		$.each(keys, function(i, key) {
			const s = `<div class="mx-2"><span class="badge border border-dark ${descMap[key][1]}">${key}</span> ${descMap[key][0]} - ${descMap[key][2]}</div>`
			mapDesc.append(s);
		});

		renderWaferMap(mapView, mapText, opt);
		modal.modal('show');
	});

	$(document).on('click', '[id^="download-convert-nxp"]', async function () {
		const myData = $(this);
		let wafermapData = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		let csvData = fileConvertResult[myData.attr('data')]['csv']['header']+"\n";
		csvData += fileConvertResult[myData.attr('data')]['csv']['container'];

		let mapFilename = fileConvertResult[myData.attr('data')]['mapData']['filename'];
		let csvFilename = fileConvertResult[myData.attr('data')]['csv']['filename'];

		saveAs(wafermapData, mapFilename);
		saveAs(csvData, csvFilename);
	});

	$(document).on('click', '[id^="delete-before-convert-nxp"]', function () {
		const myData = $(this);
		const fileOrder = myData.attr('data');
		let fileArray = Array.from(fileListTmp);
		fileArray.splice(fileOrder, 1);

		const dataTransfer = new DataTransfer();
		fileArray.forEach(file => dataTransfer.items.add(file));
		fileListTmp = dataTransfer.files;
		handleFiles(fileListTmp);
	});

	$("#btn-map-convert-nxp").click(async function () {
		const btnConvert = $("#btn-map-convert-nxp");
		const btnDownload = $("#btn-map-download-nxp");

		if (fileListTmp.length <= 0) {
			$(".air-badge").html(airBadge("Please choose a map file" , 'danger'));
			return false;
		}

		let progressFileTables = $('[id^="progress-convert-page-nxp"]');
		let saveAsFileTables = $('[id^="download-convert-nxp"]');

		let viewBeforeConvert = $('[id^="view-before-convert-nxp"]');
		let viewAfterConvert = $('[id^="view-after-convert-nxp"]');
		for (let i = 0; i < progressFileTables.length; i++) {
			progressFileTables.eq(i).removeClass("d-none");
		}

		let convertOK = 0;
		fileConvertResult = [];
		for (let i = 0; i < fileListTmp.length; i++) {
			formData = new FormData();
			formData.append('mapfile', fileListTmp[i]);
			const url = baseUrl("/auth/api/v80/wafermap-nxp");
			const execute = await postField(url, 'POST', formData, false, true, progressBar, i);


			try {
				let obj = (typeof execute === "string") ? JSON.parse(execute) : execute;
				if (obj.code == 200) {
					saveAsFileTables.eq(i).removeClass("d-none");
					viewBeforeConvert.eq(i).addClass("d-none");
					viewAfterConvert.eq(i).removeClass("d-none");
					progressBar(100, i, true);

					btnConvert.addClass("d-none");
					btnConvert.attr("disabled", true);
					fileConvertResult.push(obj.result);
					fileListTmp[i]['convert'] = true;
					convertOK++;
				} else {
					fileConvertResult.push(
						{
							"convert": false,
						}
					);
					fileListTmp[i]['convert'] = false;
					progressBar(0, i, false);
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			} catch (error) {
				fileConvertResult.push(
					{
						"convert": false,
					}
				);
				fileListTmp[i]['convert'] = false;
				progressBar(0, i, false);
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			}
		}

		for (let i = 0; i < fileListTmp.length; i++) {
			if (fileListTmp[i]['convert']) progressFileTables.eq(i).addClass("d-none");
		}

		if (convertOK >= 1) {
			btnDownload.removeClass("d-none");
			btnDownload.attr("disabled", false);
		}
	});

	$("#btn-map-download-nxp").click(async function () {
		const zip = new JSZip();

		let csvHeader = "";
		let csvData = "";
		for (let i = 0; i < fileConvertResult.length; i++) {
			if (fileConvertResult[i]['convert']) {
				await zip.file(fileConvertResult[i]['mapData']['filename'], fileConvertResult[i]['mapData']['wafermap']);

				if (csvHeader == "") {
					csvHeader = fileConvertResult[i]['csv']['header'];
				}

				if (csvHeader != "") {
					csvData += fileConvertResult[i]['csv']['container']+"\n";
				}
			}
		}

		if (csvHeader != "") {
			let CSV_DataFinish = csvHeader+"\n"+csvData;
			await zip.file("convert.csv", CSV_DataFinish);
		}

		zip.generateAsync({type:"blob"}).then(function(content) {
			const zipName = $(".main-js").attr("data-containt")+"_"+getTimestamp()+".zip";
		    saveAs(content, zipName);
		});
	});
}

const pageMapConvertTDK = () => {
		let fileConvertResult = [];
	let fileListTmp = false;
	let formData = null;

	const handleFiles = (files) => {
		const fileList = $("#file-list-tdk");
		const btnConvert = $("#btn-map-convert-tdk");
		const btnDownload = $("#btn-map-download-tdk");
		fileList.empty();
		fileListTmp = files;
		
		if (files.length > 0) {
			const ul = $('<ul class="list-group my-2"></ul>');

			let i = 0;
			$.each(files, function(i, file) {
				const fileSize = (file.size / 1024).toFixed(1) + ' KB';
				const li = $(`
					<li class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							${file.name}
							<span class="badge badge-primary text-center ml-auto pl-3 m-1" id="view-before-convert-tdk" data="${i}">
								<i class="fas fa-eye"></i>
							</span>
							<span class="badge badge-primary text-center ml-auto pl-3 m-1 d-none" id="view-after-convert-tdk" data="${i}">
								<i class="fas fa-eye"></i>
							</span>

							<span class="badge badge-success text-center pl-3 m-1 d-none" id="download-convert-tdk" data="${i}">
								<i class="fas fa-download"></i>
							</span>
							<span class="badge badge-danger text-center pl-3 m-1" id="delete-before-convert-tdk" data="${i}">
								<i class="fas fa-trash"></i>
							</span>
							<span class="badge bg-secondary rounded-pill">${fileSize}</span>
						</div>
						<div class="progress progress-md d-none" id="progress-convert-page-tdk">
							<div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress-convert-tdk" data="${i}">0%</div>
						</div>
					</li>
					`);
				ul.append(li);
				i++;
			});

			fileList.append(ul);
			btnConvert.removeClass("d-none");
			btnConvert.attr("disabled", false);
		}

		if (files.length <= 0) {
			btnConvert.addClass("d-none");
			btnConvert.attr("disabled", true);
		}
		btnDownload.addClass("d-none");
		btnDownload.attr("disabled", true);
	}

	const progressBar = (percentage, index, status) => {
		let progressTables = $('[id^="progress-convert-tdk"]');
		let prog = progressTables.eq(index);

		if (percentage <= 99) {
			prog.removeClass("bg-success");
			prog.removeClass("bg-danger");
		}

		if (!status) {
			prog.attr("style", "width: 100%;");
			prog.text('Failed');
			prog.removeClass("bg-success");
			prog.addClass("bg-danger");
		}

		if (status) {
			prog.attr("style", "width: "+percentage+'%'+";");
			prog.text(percentage+'%');
			if (percentage == 100) {
				prog.removeClass("bg-danger");
				prog.addClass("bg-success");
			}
		}
	}

	$("#btn-file-input-tdk").click(function(e) {
		$("#file-input-tdk").click();
	});

	$("#file-input-tdk").on('change', function() {
		handleFiles(this.files);
	});

	$(document).on('dragenter dragover dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$("#drop-zone-tdk").on('dragenter dragover', function() {
		$(this).addClass('dragover');
	});

	$("#drop-zone-tdk").on('dragleave drop', function() {
		$(this).removeClass('dragover');
	});

	$("#drop-zone-tdk").on('drop', function(e) {
		const files = e.originalEvent.dataTransfer.files;
		handleFiles(files);
	});

	$(document).on('click', '[id^="view-before-convert-tdk"]', async function () {
		const modal = $("#modal-map-before-convert-tdk");
		const mapText = $("#text-map-before-convert-tdk");
		const myData = $(this);
		const file = fileListTmp[myData.attr('data')];

		mapText.val(await openFile(file));
		modal.modal('show');
	});

	$(document).on('click', '[id^="view-after-convert-tdk"]', async function () {
		const modal = $("#modal-map-after-convert-tdk");
		const mapView = $("#map-container-after-convert-tdk");
		const mapDesc = $("#map-decs-after-convert-tdk");
		const myData = $(this);
		const mapText = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		const descMap = fileConvertResult[myData.attr('data')]['mapData']['desc'];
		const keys = Object.keys(descMap);
		const opt = fileConvertResult[myData.attr('data')]['mapData']['opt'];
		const csv = fileConvertResult[myData.attr('data')]['csv'];

		mapDesc.empty();
		$.each(keys, function(i, key) {
			const s = `<div class="mx-2"><span class="badge border border-dark ${descMap[key][1]}">${key}</span> ${descMap[key][0]} - ${descMap[key][2]}</div>`
			mapDesc.append(s);
		});

		renderWaferMap(mapView, mapText, opt);
		modal.modal('show');
	});

	$(document).on('click', '[id^="download-convert-tdk"]', async function () {
		const myData = $(this);
		let wafermapData = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		let csvData = fileConvertResult[myData.attr('data')]['csv']['header']+"\n";
		csvData += fileConvertResult[myData.attr('data')]['csv']['container'];

		let mapFilename = fileConvertResult[myData.attr('data')]['mapData']['filename'];
		let csvFilename = fileConvertResult[myData.attr('data')]['csv']['filename'];

		saveAs(wafermapData, mapFilename);
		saveAs(csvData, csvFilename);
	});

	$(document).on('click', '[id^="delete-before-convert-tdk"]', function () {
		const myData = $(this);
		const fileOrder = myData.attr('data');
		let fileArray = Array.from(fileListTmp);
		fileArray.splice(fileOrder, 1);

		const dataTransfer = new DataTransfer();
		fileArray.forEach(file => dataTransfer.items.add(file));
		fileListTmp = dataTransfer.files;
		handleFiles(fileListTmp);
	});

	$("#btn-map-convert-tdk").click(async function () {
		const btnConvert = $("#btn-map-convert-tdk");
		const btnDownload = $("#btn-map-download-tdk");

		if (fileListTmp.length <= 0) {
			$(".air-badge").html(airBadge("Please choose a map file" , 'danger'));
			return false;
		}

		let progressFileTables = $('[id^="progress-convert-page-tdk"]');
		let saveAsFileTables = $('[id^="download-convert-tdk"]');

		let viewBeforeConvert = $('[id^="view-before-convert-tdk"]');
		let viewAfterConvert = $('[id^="view-after-convert-tdk"]');
		for (let i = 0; i < progressFileTables.length; i++) {
			progressFileTables.eq(i).removeClass("d-none");
		}

		let convertOK = 0;
		fileConvertResult = [];
		for (let i = 0; i < fileListTmp.length; i++) {
			formData = new FormData();
			formData.append('mapfile', fileListTmp[i]);
			const url = baseUrl("/auth/api/v80/wafermap-tdk");
			const execute = await postField(url, 'POST', formData, false, true, progressBar, i);


			try {
				let obj = (typeof execute === "string") ? JSON.parse(execute) : execute;
				if (obj.code == 200) {
					saveAsFileTables.eq(i).removeClass("d-none");
					viewBeforeConvert.eq(i).addClass("d-none");
					viewAfterConvert.eq(i).removeClass("d-none");
					progressBar(100, i, true);

					btnConvert.addClass("d-none");
					btnConvert.attr("disabled", true);
					fileConvertResult.push(obj.result);
					fileListTmp[i]['convert'] = true;
					convertOK++;
				} else {
					fileConvertResult.push(
						{
							"convert": false,
						}
					);
					fileListTmp[i]['convert'] = false;
					progressBar(0, i, false);
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			} catch (error) {
				fileConvertResult.push(
					{
						"convert": false,
					}
				);
				fileListTmp[i]['convert'] = false;
				progressBar(0, i, false);
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			}
		}

		for (let i = 0; i < fileListTmp.length; i++) {
			if (fileListTmp[i]['convert']) progressFileTables.eq(i).addClass("d-none");
		}

		if (convertOK >= 1) {
			btnDownload.removeClass("d-none");
			btnDownload.attr("disabled", false);
		}
	});

	$("#btn-map-download-tdk").click(async function () {
		const zip = new JSZip();

		let csvHeader = "";
		let csvData = "";
		for (let i = 0; i < fileConvertResult.length; i++) {
			if (fileConvertResult[i]['convert']) {
				await zip.file(fileConvertResult[i]['mapData']['filename'], fileConvertResult[i]['mapData']['wafermap']);

				if (csvHeader == "") {
					csvHeader = fileConvertResult[i]['csv']['header'];
				}

				if (csvHeader != "") {
					csvData += fileConvertResult[i]['csv']['container']+"\n";
				}
			}
		}

		if (csvHeader != "") {
			let CSV_DataFinish = csvHeader+"\n"+csvData;
			await zip.file("convert.csv", CSV_DataFinish);
		}

		zip.generateAsync({type:"blob"}).then(function(content) {
			const zipName = $(".main-js").attr("data-containt")+"_"+getTimestamp()+".zip";
		    saveAs(content, zipName);
		});
	});
}

const pageMapConvertInfineon = () => {
	let fileConvertResult = [];
	let fileListTmp = false;
	let formData = null;

	const handleFiles = (files) => {
		const fileList = $("#file-list-infineon");
		const btnConvert = $("#btn-map-convert-infineon");
		const btnDownload = $("#btn-map-download-infineon");
		fileList.empty();
		fileListTmp = files;
		
		if (files.length > 0) {
			const ul = $('<ul class="list-group my-2"></ul>');

			let i = 0;
			$.each(files, function(i, file) {
				const fileSize = (file.size / 1024).toFixed(1) + ' KB';
				const li = $(`
					<li class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							${file.name}
							<span class="badge badge-primary text-center ml-auto pl-3 m-1" id="view-before-convert-infineon" data="${i}">
								<i class="fas fa-eye"></i>
							</span>
							<span class="badge badge-primary text-center ml-auto pl-3 m-1 d-none" id="view-after-convert-infineon" data="${i}">
								<i class="fas fa-eye"></i>
							</span>

							<span class="badge badge-success text-center pl-3 m-1 d-none" id="download-convert-infineon" data="${i}">
								<i class="fas fa-download"></i>
							</span>
							<span class="badge badge-danger text-center pl-3 m-1" id="delete-before-convert-infineon" data="${i}">
								<i class="fas fa-trash"></i>
							</span>
							<span class="badge bg-secondary rounded-pill">${fileSize}</span>
						</div>
						<div class="progress progress-md d-none" id="progress-convert-page-infineon">
							<div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progress-convert-infineon" data="${i}">0%</div>
						</div>
					</li>
					`);
				ul.append(li);
				i++;
			});

			fileList.append(ul);
			btnConvert.removeClass("d-none");
			btnConvert.attr("disabled", false);
		}

		if (files.length <= 0) {
			btnConvert.addClass("d-none");
			btnConvert.attr("disabled", true);
		}
		btnDownload.addClass("d-none");
		btnDownload.attr("disabled", true);
	}

	const progressBar = (percentage, index, status) => {
		let progressTables = $('[id^="progress-convert-infineon"]');
		let prog = progressTables.eq(index);

		if (percentage <= 99) {
			prog.removeClass("bg-success");
			prog.removeClass("bg-danger");
		}

		if (!status) {
			prog.attr("style", "width: 100%;");
			prog.text('Failed');
			prog.removeClass("bg-success");
			prog.addClass("bg-danger");
		}

		if (status) {
			prog.attr("style", "width: "+percentage+'%'+";");
			prog.text(percentage+'%');
			if (percentage == 100) {
				prog.removeClass("bg-danger");
				prog.addClass("bg-success");
			}
		}
	}

	$("#btn-file-input-infineon").click(function(e) {
		$("#file-input-infineon").click();
	});

	$("#file-input-infineon").on('change', function() {
		handleFiles(this.files);
	});

	$(document).on('dragenter dragover dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$("#drop-zone-infineon").on('dragenter dragover', function() {
		$(this).addClass('dragover');
	});

	$("#drop-zone-infineon").on('dragleave drop', function() {
		$(this).removeClass('dragover');
	});

	$("#drop-zone-infineon").on('drop', function(e) {
		const files = e.originalEvent.dataTransfer.files;
		handleFiles(files);
	});

	$(document).on('click', '[id^="view-before-convert-infineon"]', async function () {
		const modal = $("#modal-map-before-convert-infineon");
		const mapText = $("#text-map-before-convert-infineon");
		const myData = $(this);
		const file = fileListTmp[myData.attr('data')];

		mapText.val(await openFile(file));
		modal.modal('show');
	});

	$(document).on('click', '[id^="view-after-convert-infineon"]', async function () {
		const modal = $("#modal-map-after-convert-infineon");
		const mapView = $("#map-container-after-convert-infineon");
		const mapDesc = $("#map-decs-after-convert-infineon");
		const myData = $(this);
		const mapText = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		const descMap = fileConvertResult[myData.attr('data')]['mapData']['desc'];
		const keys = Object.keys(descMap);
		const opt = fileConvertResult[myData.attr('data')]['mapData']['opt'];
		const csv = fileConvertResult[myData.attr('data')]['csv'];

		mapDesc.empty();
		$.each(keys, function(i, key) {
			const s = `<div class="mx-2"><span class="badge border border-dark ${descMap[key][1]}">${key}</span> ${descMap[key][0]} - ${descMap[key][2]}</div>`
			mapDesc.append(s);
		});

		renderWaferMap(mapView, mapText, opt);
		modal.modal('show');
	});

	$(document).on('click', '[id^="download-convert-infineon"]', async function () {
		const myData = $(this);
		let wafermapData = fileConvertResult[myData.attr('data')]['mapData']['wafermap'];
		let csvData = fileConvertResult[myData.attr('data')]['csv']['header']+"\n";
		csvData += fileConvertResult[myData.attr('data')]['csv']['container'];

		let mapFilename = fileConvertResult[myData.attr('data')]['mapData']['filename'];
		let csvFilename = fileConvertResult[myData.attr('data')]['csv']['filename'];

		saveAs(wafermapData, mapFilename);
		saveAs(csvData, csvFilename);
	});

	$(document).on('click', '[id^="delete-before-convert-infineon"]', function () {
		const myData = $(this);
		const fileOrder = myData.attr('data');
		let fileArray = Array.from(fileListTmp);
		fileArray.splice(fileOrder, 1);

		const dataTransfer = new DataTransfer();
		fileArray.forEach(file => dataTransfer.items.add(file));
		fileListTmp = dataTransfer.files;
		handleFiles(fileListTmp);
	});

	$("#btn-map-convert-infineon").click(async function () {
		const btnConvert = $("#btn-map-convert-infineon");
		const btnDownload = $("#btn-map-download-infineon");

		if (fileListTmp.length <= 0) {
			$(".air-badge").html(airBadge("Please choose a map file" , 'danger'));
			return false;
		}

		let progressFileTables = $('[id^="progress-convert-page-infineon"]');
		let saveAsFileTables = $('[id^="download-convert-infineon"]');

		let viewBeforeConvert = $('[id^="view-before-convert-infineon"]');
		let viewAfterConvert = $('[id^="view-after-convert-infineon"]');
		for (let i = 0; i < progressFileTables.length; i++) {
			progressFileTables.eq(i).removeClass("d-none");
		}

		let convertOK = 0;
		fileConvertResult = [];
		for (let i = 0; i < fileListTmp.length; i++) {
			formData = new FormData();
			formData.append('mapfile', fileListTmp[i]);
			const url = baseUrl("/auth/api/v80/wafermap-infineon");
			const execute = await postField(url, 'POST', formData, false, true, progressBar, i);


			try {
				let obj = (typeof execute === "string") ? JSON.parse(execute) : execute;
				if (obj.code == 200) {
					saveAsFileTables.eq(i).removeClass("d-none");
					viewBeforeConvert.eq(i).addClass("d-none");
					viewAfterConvert.eq(i).removeClass("d-none");
					progressBar(100, i, true);

					btnConvert.addClass("d-none");
					btnConvert.attr("disabled", true);
					fileConvertResult.push(obj.result);
					fileListTmp[i]['convert'] = true;
					convertOK++;
				} else {
					fileConvertResult.push(
						{
							"convert": false,
						}
					);
					fileListTmp[i]['convert'] = false;
					progressBar(0, i, false);
					$(".air-badge").html(airBadge(obj.msg , 'danger'));
				}
			} catch (error) {
				fileConvertResult.push(
					{
						"convert": false,
					}
				);
				fileListTmp[i]['convert'] = false;
				progressBar(0, i, false);
				$(".air-badge").html(airBadge("Request Time Out. Please Try!" , 'danger'));
			}
		}

		for (let i = 0; i < fileListTmp.length; i++) {
			if (fileListTmp[i]['convert']) progressFileTables.eq(i).addClass("d-none");
		}

		if (convertOK >= 1) {
			btnDownload.removeClass("d-none");
			btnDownload.attr("disabled", false);
		}
	});

	$("#btn-map-download-infineon").click(async function () {
		const zip = new JSZip();

		let csvHeader = "";
		let csvData = "";
		for (let i = 0; i < fileConvertResult.length; i++) {
			if (fileConvertResult[i]['convert']) {
				await zip.file(fileConvertResult[i]['mapData']['filename'], fileConvertResult[i]['mapData']['wafermap']);

				if (csvHeader == "") {
					csvHeader = fileConvertResult[i]['csv']['header'];
				}

				if (csvHeader != "") {
					csvData += fileConvertResult[i]['csv']['container']+"\n";
				}
			}
		}

		if (csvHeader != "") {
			let CSV_DataFinish = csvHeader+"\n"+csvData;
			await zip.file("convert.csv", CSV_DataFinish);
		}

		zip.generateAsync({type:"blob"}).then(function(content) {
			const zipName = $(".main-js").attr("data-containt")+"_"+getTimestamp()+".zip";
		    saveAs(content, zipName);
		});
	});
}

const main = (function() {
	const isOn = $(".main-js").attr("my-js") || false;

	if (isOn == "profile-page") profilePage();
	if (isOn == "web-setting") webSettingPage();
	if (isOn == "management-user-management-page") managementUserManagementPage();
	if (isOn == "user-access-menu") userAccessMenu();
	if (isOn == "menu-management") menuManagement();

	if (isOn == "page-inspection-outgoing") pageInspectionOutgoing();

	if (isOn == "page-map-convert-abov") pageMapConvertAbov();
	if (isOn == "page-map-convert-advanide") pageMapConvertAdvanide();
	if (isOn == "page-map-convert-advanide-eu") pageMapConvertAdvanideEU();
	if (isOn == "page-map-convert-hid") pageMapConvertHid();
	if (isOn == "page-map-convert-legic") pageMapConvertLegic();
	if (isOn == "page-map-convert-linxens") pageMapConvertLinxens();
	if (isOn == "page-map-convert-nuvoton") pageMapConvertNuvoton();
	if (isOn == "page-map-convert-sony") pageMapConvertSony();
	if (isOn == "page-map-convert-stm") pageMapConvertStm();
	if (isOn == "page-map-convert-mlx") pageMapConvertMlx();
	if (isOn == "page-map-convert-mchp") pageMapConvertMchp();
	if (isOn == "page-map-convert-nxp") pageMapConvertNxp();
	if (isOn == "page-map-convert-tdk") pageMapConvertTDK();
	if (isOn == "page-map-convert-infineon") pageMapConvertInfineon();

})();