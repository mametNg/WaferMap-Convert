'use strict';
const passControl = (method1, method2, txt="Can't be empty!") => {
	const input = $(method1);
	const msg = $(method2);

	let filter = filterLength(method1, 1);
	if (filter !== true) {
		input.removeClass("is-valid");
		input.addClass("is-invalid");
		msg.text(txt);
		return false;
	} else {
		input.addClass("is-valid");
		input.removeClass("is-invalid");
		msg.text("");
		return true;
	}
}

const loginPage = () => {

	$("#turn-passwd").click(function () {
		showPasswd('input-password', 'turn-passwd');
	});

	$("#btn-login-page").click(function () {
		const username = $("#input-username");
		const password = $("#input-password");
		let allow = true;

		if (!passControl("#"+username.attr("id"), "#msg-"+username.attr("id"))) allow = false;
		if (!passControl("#"+password.attr("id"), "#msg-"+password.attr("id"))) allow = false;

		if (!allow) return false;

		$(".air-badge").html(loadingBackdrop());

		const params = {
			'username': username.val().trim(),
			'password': password.val().trim(),
		};

		const executePost = {
			'data' : JEncrypt(JSON.stringify(params)),
		}

		const url = baseUrl("/auth/api/v1/login");

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

const main = (function() {
	const isOn = $(".main-js").attr("my-js") || false;

	if (isOn == "login-page") loginPage();
})();